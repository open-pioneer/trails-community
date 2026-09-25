// SPDX-FileCopyrightText: 2023-2025 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0

import { DeclaredService } from "@open-pioneer/runtime";

 /**
     * Use an OGC API Process and integrate it into an OPT Application.
     */

export interface JobStatusResponse {
    jobID?: string;
    status?: "accepted" | "running" | "successful" | "failed" | "dismissed"; // Status is optional for synchronous responses
    message?: string;
    outputs?: {
        [key: string]: {
            href: string; 
            title?: string;
            type?: string;
        };
    };
}

export interface ApiService extends DeclaredService<"app.ApiService"> {
    executeProcess(url: string, payload: Record<string, unknown>, sync?: boolean): Promise<OgcJob>;
    pollJobStatus(url: string, intervalMs?: number): Promise<JobStatusResponse>; 
}

export class OgcJob {
    private _resultPromise: Promise<JobStatusResponse>;
    public currentStatus: JobStatusResponse;

    constructor(
        public readonly url: string, 
        initialStatus: JobStatusResponse, 
        private service: ApiService
    ) {
        this.currentStatus = initialStatus;
        this._resultPromise = this.startInternalPolling();
    }

    private async startInternalPolling(): Promise<JobStatusResponse> {
        const finalStates = ["successful", "failed", "dismissed"];
        
        // If sync (already successful or completed), don't poll the server
        if (this.currentStatus.status && finalStates.includes(this.currentStatus.status)) {
            return this.currentStatus;
        }

        // If async, poll until done
        const finalStatus = await this.service.pollJobStatus(this.url);
        this.currentStatus = finalStatus; 
        return finalStatus;
    }

    async wait(): Promise<JobStatusResponse> {
        return this._resultPromise;
    }
}

export class ApiServiceImpl implements ApiService {
    // Executes a process and returns either result (sync) or an OgcJob wrapper (async)
    async executeProcess(url: string, payload: Record<string, unknown>, sync: boolean = true): Promise<OgcJob> {
        const headers: HeadersInit = { 
            "Content-Type": "application/json", 
            "Prefer": sync ? "respond-sync" : "respond-async", 
            "Accept": "application/json"
        };

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        // 1. Handle Async Execution (201 Created or 202 Accepted)
        if (response.status === 201 || response.status === 202) {
            const responseBody = await response.json().catch(() => ({}));
            const location = this.extractLocation(response, url, responseBody);
            
            if (!location) {
                throw new Error("Async job accepted, but 'Location' header is missing/blocked by CORS and no job ID was found in body.");
            }
            return new OgcJob(location, { status: "accepted" }, this);
        }

        // 2. Handle Synchronous Execution (200 OK)
        if (response.ok) {
            const resultData = await response.json();
            
            // Transform raw output into standard JobStatusResponse format
            const syncStatus: JobStatusResponse = {
                status: "successful",
                outputs: resultData.outputs ?? resultData,
                message: "Synchronous execution completed successfully."
            };

            return new OgcJob(url, syncStatus, this);
        }

        // 3. Handle Errors
        const errorText = await response.text();
        throw new Error(`Process execution failed (HTTP ${response.status}): ${errorText}`);
    }

    async pollJobStatus(jobStatusUrl: string, intervalMs = 5000): Promise<JobStatusResponse> {
        return new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                try {
                    const response = await fetch(jobStatusUrl);
                    if (!response.ok) throw new Error(`Status check failed: ${response.status}`);
                    const jobStatus: JobStatusResponse = await response.json();
    
                    if (jobStatus.status === "successful") {
                        clearInterval(interval);
                        try {
                            // Fetch the actual result data (Async only)
                            const resultsUrl = `${jobStatusUrl}/results`;
                            const resultsRes = await fetch(resultsUrl, { headers: { "Accept": "application/json" } });
                            const contentType = resultsRes.headers.get("content-type") || "";
    
                            if (resultsRes.ok && resultsRes.status !== 204 && contentType.includes("json")) {
                                const resultsData = await resultsRes.json() as Record<string, unknown>;
                                resolve({ ...jobStatus, ...resultsData });
                            } else {
                                resolve(jobStatus);
                            }
                        } catch (e) {
                            resolve(jobStatus);
                        }
                    } else if (jobStatus.status === "failed" || jobStatus.status === "dismissed") {
                        clearInterval(interval);
                        reject(new Error(jobStatus.message || "Job failed"));
                    }
                } catch (err) {
                    clearInterval(interval);
                    reject(err);
                }
            }, intervalMs);
        });
    }

    /**
     * Resolves the OGC API Job URL from HTTP headers or response body fallback.
     */
    private extractLocation(response: Response, originalUrl: string, body: Record<string, any>): string | null {
        let location = response.headers.get("Location");
        if (location) return location;

        const jobId = body.id || body.jobID || body.jobId;
        if (jobId) {
            const executionUrl = new URL(originalUrl);
            const pathParts = executionUrl.pathname.split("/");
            // Strip everything from 'processes' onward to build base /jobs URL
            const baseParts = pathParts.slice(0, pathParts.indexOf("processes"));
            return `${executionUrl.origin}${baseParts.join("/")}/jobs/${jobId}`;
        }

        return null;
    }
}