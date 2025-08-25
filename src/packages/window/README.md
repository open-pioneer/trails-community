# @open-pioneer-community/window

This package provides windowing system for draggable, resizable and closable UI widgets in Open-Pioneer Trails.
This package uses [react-rnd](https://github.com/bokuweb/react-rnd) internally.

## Usage

Wrap a UI widget with the `Window` component to activate the window functionalities.

```tsx
const [windowClosed, setWindowClosed] = useState(false);

{
    !windowClosed && (
        <Window
            title="A Window"
            identifier="window1"
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
            <Box>A draggable, resizable and closable Window</Box>
        </Window>
    );
}
```
## Dependencies and Compatibility

This package has been tested with the following dependencies:

| Dependency    | Version |
| -------- | ------- |
| React  | 19.1.6    |
| OPT Core Packages | 4.0.0     |
| @chakra-ui/react    | 3.21.0 |
| react-rnd    | 10.5.2   |

## License

Apache-2.0 (see `LICENSE` file)

## Author

This work was originally contributed by [m-elseberg](https://github.com/m-elseberg).
