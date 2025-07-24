---
"@open-pioneer-community/window": minor
---

add window packages

wrap your component in a draggable, resizable and closable window

```tsx
const [windowClosed, setWindowClosed] = useState(false);

{!windowClosed && (
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
)}
```
