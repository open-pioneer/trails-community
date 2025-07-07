// SPDX-FileCopyrightText: 2023-2025 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from "react";
import { isRndFrame, normalize, type RndFrame } from "./frame";
import { useService } from "open-pioneer:react-hooks";
import { LocalStorageService } from "@open-pioneer/local-storage";

//ToDo use localStorage service
export function useLocalStorageFrame(identifier: string | undefined): LocalStorageFrameState {
    const storageService = useLocalStorageService();

    return useMemo(
        () => [
            getFrame(identifier, storageService),
            (frame) => setFrame(identifier, frame, storageService)
        ],
        [identifier, storageService]
    );
}

function useLocalStorageService() {
    const localStorageService = useService<LocalStorageService>(
        "local-storage.LocalStorageService"
    );
    return localStorageService;
}

function getFrame(
    identifier: string | undefined,
    storageService: LocalStorageService
): RndFrame | undefined {
    if (!storageService.isSupported) {
        //local storage not supported, cannot get frame state
        return undefined;
    }

    try {
        if (identifier != null) {
            const key = getLocalStorageKey(identifier);
            const frame = storageService.get(key);
            if (frame != null) {
                if (isRndFrame(frame)) {
                    return normalize(frame);
                }
            }
        }
        return undefined;
    } catch {
        return undefined;
    }
}

function setFrame(
    identifier: string | undefined,
    frame: RndFrame,
    storageService: LocalStorageService
): void {
    if (!storageService.isSupported) {
        //local storage not supported, do not safe frame state
        return;
    }

    try {
        if (identifier != null) {
            const key = getLocalStorageKey(identifier);
            storageService.set(key, frame);
        }
    } catch {
        /* ignore */
    }
}

function getLocalStorageKey(identifier: string): string {
    return `${LOCAL_STORAGE_KEY_PREFIX}-${identifier}`;
}

const LOCAL_STORAGE_KEY_PREFIX = "window-frame";

type LocalStorageFrameState = [RndFrame | undefined, (frame: RndFrame) => void];
