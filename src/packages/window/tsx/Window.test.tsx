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
                data-testid="test-window"
            >
                <Box>test test test</Box>
            </Window>
        </PackageContextProvider>
    );

    const window = await screen.findAllByTestId("test-window");
    expect(window).toBeTruthy();
});
