# Changelog @open-pioneer-community/window

## 0.1.0

### Minor Changes

- aaf54bc: Initial release.

    Wrap your component in a draggable, resizable and closable window

    ```tsx
    import { Window } from "@open-pioneer-community/window";

    const [windowClosed, setWindowClosed] = useState(false);

    {
        !windowClosed && (
            <Window
                title="my window header"
                identifier="window"
                top={500}
                left={500}
                width={280}
                height={280}
                minWidth={250}
                minHeight={250}
                closable={true}
                resizable={true}
                onClose={() => setWindowClosed(true)}
            >
                <MyComponent />
            </Window>
        );
    }
    ```
