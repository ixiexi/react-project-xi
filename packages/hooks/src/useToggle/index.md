# useToggle

用于在两个状态值之间进行切换的hook

## 代码演示
### 基础用法

<code src="./demo/demo.tsx" />

### 高级用法

<code src="./demo/demo2.tsx" />

## API

```typescript

const [state, { toggle, set, setLeft, setRight }] = useToggle(defaultValue?: boolean)

const [state, { toggle: toggleState, set: setState }] = useToggle<T>(defaultValue: T)

const [state, { toggle: toggleState, set: setState, setLeft, setRight }] = useToggle<T, U>(defaultValue: T,  reverseValue: U)

```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | --- |
| defaultValue | 默认值 | `T` | `false` |
| reverseValue | 反向值 | `U` | - |

### Result

| 参数 | 说明 | 类型 |
| --- | --- | ---  |
| state | 当前状态 | `T` |
| actions | 操作集合 | `Actions<T>` |

### Actions

| 参数 | 说明 | 类型 |
| --- | --- | ---  |
| toggle | 切换状态 | `() => void` |
| set | 设置状态 | `(value: T) => void` |
| setLeft | 设置默认值 | `() => void` |
| setRight | 如果传入了 reverseValue，则设置为 reverseValue，否则设置为 defaultValue的反向值 | `() => void` |
