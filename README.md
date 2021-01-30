# Deprecated

**WARNING:** This project has moved to [@react-nano/tsrux](https://github.com/lusito/react-nano)

## tsrux

[![Build Status](https://flat.badgen.net/travis/lusito/tsrux/master?icon=travis&label=tests)](https://travis-ci.org/Lusito/tsrux)
[![Code Coverage](https://flat.badgen.net/coveralls/c/github/Lusito/tsrux/master?icon=codecov)](https://coveralls.io/github/Lusito/tsrux)
[![License](https://flat.badgen.net/github/license/lusito/tsrux?icon=github)](https://github.com/lusito/tsrux/blob/master/LICENSE)
[![Minified + gzipped size](https://flat.badgen.net/bundlephobia/minzip/tsrux?icon=dockbit)](https://bundlephobia.com/result?p=tsrux)
[![NPM version](https://flat.badgen.net/npm/v/tsrux?icon=npm)](https://www.npmjs.com/package/tsrux)
[![Stars](https://flat.badgen.net/github/stars/lusito/tsrux?icon=github)](https://github.com/lusito/tsrux)
[![Watchers](https://flat.badgen.net/github/watchers/lusito/tsrux?icon=github)](https://github.com/lusito/tsrux)

tsrux enables you to reduce the [redux](https://redux.js.org/) boilerplate code you usually write to define your action creators, reducers, etc. and even gain type-safety in the process!

The name stands for typesafe [redux](https://redux.js.org/), aside from the bloody obvious: TypeScript Rocks!

#### Why use tsrux

- Extremely lightweight: 300 byte vs 7.7 kilobyte for [deox](https://bundlephobia.com/result?p=deox).
- Deadsimple to use
- No dependencies!
- [Fully documented](https://lusito.github.io/tsrux/)
- Automated [unit- and type tests](https://travis-ci.org/Lusito/tsrux) with 100% [code coverage](https://coveralls.io/github/Lusito/tsrux)
- Liberal license: [zlib/libpng](https://github.com/Lusito/tsrux/blob/master/LICENSE)

### Installation via NPM

```
npm i tsrux
```

This library is shipped as es2015 modules. To use them in browsers, you'll have to transpile them using webpack or similar, which you probably already do.

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

### Similar Projects
This package is heavily inspired by [deox](https://github.com/thebrodmann/deox), but uses a more lightweight approach.

Aside from that, there are [redux-actions](https://github.com/redux-utilities/redux-actions) and [typesafe-actions](https://github.com/piotrwitek/typesafe-actions).



### Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/tsrux/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

### Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

### License

tsrux has been released under the [zlib/libpng](https://github.com/Lusito/tsrux/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
