// SPDX-FileCopyrightText: 2023-2025 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0

import { Flex } from "@chakra-ui/react";
import { CoordinateViewer } from "@open-pioneer/coordinate-viewer";
import { DefaultMapProvider, MapContainer, useMapModel, MapAnchor } from "@open-pioneer/map";
import { ScaleBar } from "@open-pioneer/scale-bar";
import { ScaleViewer } from "@open-pioneer/scale-viewer";
import { Toc } from "@open-pioneer/toc";
import { MAP_ID } from "./MainMapProvider";
import { Window } from "window";
import { useState } from "react";
import { ToolButton } from "@open-pioneer/map-ui-components";
import { LuAlignJustify } from "react-icons/lu";
import { useIntl } from "open-pioneer:react-hooks";

export function AppUI() {
    const intl = useIntl();
    const { map } = useMapModel(MAP_ID);
    const [windowClosed, setWindowClosed] = useState(false);

    return (
        map && (
            <Flex direction="column" height="full" overflow="hidden">
                <DefaultMapProvider map={map}>
                    <Flex direction="column" flex={1}>
                        <MapContainer>
                            <Window
                                title={intl.formatMessage({ id: "toc.title" })}
                                identifier="toc"
                                top={10}
                                left={10}
                                width={280}
                                height={450}
                                minWidth={250}
                                minHeight={250}
                                closable={false}
                                resizable={false}
                                draggable={true}
                            >
                                <Toc />
                            </Window>
                            {!windowClosed && (
                                <Window
                                    title={intl.formatMessage({ id: "window.title" })}
                                    identifier="window"
                                    top={10}
                                    left={10}
                                    width={280}
                                    height={280}
                                    minWidth={250}
                                    minHeight={250}
                                    closable={true}
                                    resizable={true}
                                    onClose={() => setWindowClosed(true)}
                                >
                                    {intl.formatMessage({ id: "window.content" })}
                                </Window>
                            )}
                            <MapAnchor position="bottom-right" horizontalGap={10} verticalGap={45}>
                                <ToolButton
                                    label="test"
                                    icon={<LuAlignJustify />}
                                    active={!windowClosed}
                                    onClick={() => setWindowClosed(!windowClosed)}
                                />
                            </MapAnchor>
                        </MapContainer>
                    </Flex>
                    <Flex direction="row" gap={3} alignItems="center" justifyContent="center">
                        <CoordinateViewer precision={0} />
                        <ScaleBar />
                        <ScaleViewer />
                    </Flex>
                </DefaultMapProvider>
            </Flex>
        )
    );
}
