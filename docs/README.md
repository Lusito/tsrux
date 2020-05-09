---
home: true
heroText: tsrux
tagline: Typesafe and painless action creators and reducers for redux.
actionText: Get Started →
actionLink: /setup
features:
- title: Painless
  details: Writing redux code should be simple and fun. With tsrux you can skip writing boilerplate code and focus on the task.
- title: Typesafe
  details: You use TypeScript to have code-completion and type-safety? Great! tsrux detects all the types for you, so you don't have to write them!
- title: Lightweight
  details: Tired of packages having lots of dependencies making your project huge? tsrux only weighs 300 Bytes and has no dependencies.
footer: Zlib/Libpng License | Copyright © 2020 Santo Pfingsten
---

### Example: Actions Creators

```typescript
// No payload:
export const fetchTodos = actionCreator("TODOS/FETCH");
// With payload:
export const addTodo = actionCreator("TODOS/ADD", (label: string) => ({ label }));
// With payload and metadata:
export const removeTodo = actionCreator(
    "TODOS/REMOVE",
    (id: number) => ({ id }),
    (id: number) => ({ metaId: id, foo: "bar" }),
);

```

[find out more](./action-creators.md)

### Example: Reducers

```typescript
export const todosReducer = mapReducers(initialState, (handle) => [
    handle(addTodo, (state, action) => ({
        ...state,
        list: [...state.list, { id: state.nextId, label: action.payload.label, checked: false }],
        nextId: state.nextId + 1,
    })),
    ...
]);
```

[find out more](./reducers.md)
