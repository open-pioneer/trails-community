// SPDX-FileCopyrightText: 2023-2025 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0

import { PackageContextProvider } from "@open-pioneer/test-utils/react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Window, WindowProps } from "./Window";
import { Box } from "@chakra-ui/react";
import { LocalStorageService } from "@open-pioneer/local-storage";
import { ReactNode } from "react";

const MOCK_STORAGE_MAP = new Map<string, unknown>();

const MOCK_STORAGE_SERVICE: Partial<LocalStorageService> = {
    get(key) {
        MOCK_STORAGE_MAP.get(key);
    },
    set(key, value) {
        MOCK_STORAGE_MAP.set(key, value);
    }
};

it("renders a window", async () => {
    const windowProps = {
        title: "A Window!",
        identifier: "window",
        top: 10,
        left: 10,
        width: 280,
        height: 280,
        minWidth: 250,
        minHeight: 250,
        closable: true,
        resizable: true
    };
    const windowContent = <Box>test test test</Box>;

    setupWindow(windowProps, windowContent);
    const window = await waitForWindow();

    expect(window).toBeTruthy();
});

it("renders children inside the window", async () => {
    const windowProps = {
        title: "A Window!",
        identifier: "window",
        top: 10,
        left: 10,
        width: 280,
        height: 280,
        minWidth: 250,
        minHeight: 250,
        closable: true,
        resizable: true
    };
    const windowContent = <Box className="test-class">test test test</Box>;

    setupWindow(windowProps, windowContent);
    const window = await waitForWindow();
    const child = window.querySelector(".test-class");
    expect(child).toBeTruthy();
    expect(child?.innerHTML).toBe("test test test");
});

function setupWindow(props: WindowProps, children: ReactNode): void {
    const injectedServices = {
        "local-storage.LocalStorageService": MOCK_STORAGE_SERVICE
    };

    render(
        <PackageContextProvider services={injectedServices}>
            <Box data-testid="test-wrapper">
                <Window {...props}>{children}</Window>
            </Box>
        </PackageContextProvider>
    );
}

async function waitForWindow(): Promise<Element> {
    const wrapper = await screen.findByTestId("test-wrapper");
    const windowElem = wrapper.querySelector(".react-draggable");

    if (!windowElem) {
        throw "window element not found";
    } else {
        return windowElem;
    }
}
