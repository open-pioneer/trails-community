# @open-pioneer-community/ogc-api-service

This package provides a service for executing and monitoring [OGC API - Processes](https://ogcapi.ogc.org/processes/) within an Open Pioneer Trails (OPT) application. It takes both synchronous and asynchronous process executions, location resolution (including CORS fallbacks), and status polling.

## Usage

### 1. Registering the Service

Include the package in your application's package dependencies and list it in your `package.json`:

```json
{
  "packages": [
    "@open-pioneer-community/processclient"
  ]
}
```

### 2. Executing a Process

Inject the service using `useService` from `@open-pioneer/runtime` to execute synchronous or asynchronous processes.

```tsx
import { useService } from "@open-pioneer/runtime";
import type { ApiService } from "@open-pioneer-community/processclient";

export function ProcessRunner() {
  const apiService = useService<ApiService>("app.ApiService");

  // Asynchronous Execution
  const handleAsyncExecute = async () => {
    const processUrl = "https://example.com/ogc/processes/buffer-process/execution";
    const payload = {
      inputs: {
        distance: 150,
        geometry: { type: "Point", coordinates: [7.62, 51.96] }
      }
    };

    try {
      // Pass sync = false for asynchronous execution (Prefer: respond-async)
      const job = await apiService.executeProcess(processUrl, payload, false);
      console.log(`Job created at URL: ${job.url}`);

      // Wait for the job to complete polling and return final output
      const result = await job.wait();
      console.log("Job completed successfully:", result);
    } catch (error) {
      console.error("Execution or polling failed:", error);
    }
  };

  // Synchronous Execution
  const handleSyncExecute = async () => {
    const processUrl = "https://example.com/ogc/processes/calc-process/execution";
    const payload = { inputs: { a: 5, b: 10 } };

    try {
      const job = await apiService.executeProcess(processUrl, payload, true);
      const result = await job.wait(); // Resolves immediately for synchronous results
      console.log("Result:", result.outputs);
    } catch (error) {
      console.error("Synchronous execution failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleAsyncExecute}>Run Async Process</button>
      <button onClick={handleSyncExecute}>Run Sync Process</button>
    </div>
  );
}
```

## API Reference

### `ApiService`

The main service interface provided as `"app.ApiService"`.

- **`executeProcess(url: string, payload: Record<string, unknown>, sync?: boolean): Promise<OgcJob>`**
  Executes an OGC API process endpoint. Sends either `Prefer: respond-sync` or `Prefer: respond-async`. Returns an `OgcJob` wrapper instance.
  
- **`pollJobStatus(url: string, intervalMs?: number): Promise<JobStatusResponse>`**
  Polls an active job status URL until the job enters a final state (`successful`, `failed`, or `dismissed`). Once successful, fetches and merges result data from `${url}/results`.

### `OgcJob`

A helper class representing an execution instance.

- **`url`** (`string`): The resolved location URL for the job status.
- **`currentStatus`** (`JobStatusResponse`): The latest known status response.
- **`wait(): Promise<JobStatusResponse>`**: Returns a promise that resolves when the job completes polling or rejects if execution fails.

## Dependencies and Compatibility

This package has been tested with the following dependencies:

| Dependency | Version |
| --- | --- |
| React | ^18.0.0 \|\| ^19.0.0 |
| OPT Core Packages (`@open-pioneer/runtime`) | ^4.0.0 |

## License

Apache-2.0 (see `LICENSE` file)

## Author

This work was originally contributed by [juliakrtz](https://github.com/juliakrtz).