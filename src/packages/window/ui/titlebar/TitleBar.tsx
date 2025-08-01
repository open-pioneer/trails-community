// SPDX-FileCopyrightText: 2023-2025 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0
import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { LuX } from "react-icons/lu";
import { useCallback, useMemo, type MouseEventHandler, type ReactElement } from "react";

export function TitleBar({ title, closeable, onClose }: TitleBarProps): ReactElement {
    const { formatMessage } = useIntl();
    const ariaLabel = useMemo(() => formatMessage({ id: "ariaLabel.close" }), [formatMessage]);

    const preventFocus = useCallback<MouseEventHandler>((event) => {
        event.preventDefault();
    }, []);

    return (
        <Box
            className={DRAG_HANDLE_CLASS_NAME}
            bg="trails.500"
            color="white"
            padding="8px 5px 8px 12px"
            cursor="move"
            userSelect="none"
            onMouseDown={preventFocus}
        >
            <Flex direction="row" justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="md">
                    {title}
                </Text>
                {closeable && (
                    <IconButton
                        size="sm"
                        variant="ghost"
                        color="white"
                        aria-label={ariaLabel}
                        style={STYLES.closeButton}
                        _hover={STYLES.hoveredCloseButton}
                        _active={STYLES.activeCloseButton}
                        onClick={onClose}
                    >
                        <Icon>
                            <LuX />
                        </Icon>
                    </IconButton>
                )}
            </Flex>
        </Box>
    );
}

export const DRAG_HANDLE_CLASS_NAME = "window-title-bar-drag-handle";

const STYLES = {
    closeButton: { background: "transparent" },
    hoveredCloseButton: { color: "gray.300" },
    activeCloseButton: { color: "gray.500" }
};

interface TitleBarProps {
    readonly title: string | undefined;
    readonly closeable: boolean;
    readonly onClose: (() => void) | undefined;
}
