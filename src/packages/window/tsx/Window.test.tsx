// SPDX-FileCopyrightText: 2023-2025 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0

import { PackageContextProvider } from "@open-pioneer/test-utils/react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Window } from "./Window";
import { Box } from "@chakra-ui/react";

it("renders a window", async () => {
    render(
        <PackageContextProvider>
            <Box data-testid="test-wrapper">
                <Window
                    title="A Window!"
                    identifier="window"
                    top={10}
                    left={10}
                    width={280}
                    height={280}
                    minWidth={250}
                    minHeight={250}
                    closable={true}
                    resizable={true}
                >
                    <Box>test test test</Box>
                </Window>
            </Box>
        </PackageContextProvider>
    );

    const window = await waitForWindow();
    expect(window).toBeTruthy();
});

it("renders children inside the window", async () => {
    render(
        <PackageContextProvider>
            <Box data-testid="test-wrapper">
                <Window
                    title="A Window!"
                    identifier="window"
                    top={10}
                    left={10}
                    width={280}
                    height={280}
                    minWidth={250}
                    minHeight={250}
                    closable={true}
                    resizable={true}
                >
                    <Box className="test-class">test test test</Box>
                </Window>
            </Box>
        </PackageContextProvider>
    );

    const window = await waitForWindow();
    const child = window.querySelector(".test-class");
    expect(child).toBeTruthy();
    expect(child?.innerHTML).toBe("test test test");
});

async function waitForWindow(): Promise<Element> {
    const wrapper = await screen.findByTestId("test-wrapper");
    const windowElem = wrapper.querySelector(".react-draggable");

    if (!windowElem) {
        throw "window element not found";
    } else {
        return windowElem;
    }
}
