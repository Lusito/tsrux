# tsrux

[![Build Status](https://flat.badgen.net/travis/lusito/tsrux/master?icon=travis&label=tests)](https://travis-ci.org/Lusito/tsrux)
[![Code Coverage](https://flat.badgen.net/coveralls/c/github/Lusito/tsrux/master?icon=codecov)](https://coveralls.io/github/Lusito/tsrux)
[![License](https://flat.badgen.net/github/license/lusito/tsrux?icon=github)](https://github.com/lusito/tsrux/blob/master/LICENSE)
[![Minified + gzipped size](https://flat.badgen.net/bundlephobia/minzip/tsrux?icon=dockbit)](https://bundlephobia.com/result?p=tsrux)
[![NPM version](https://flat.badgen.net/npm/v/tsrux?icon=npm)](https://www.npmjs.com/package/tsrux)
[![Stars](https://flat.badgen.net/github/stars/lusito/tsrux?icon=github)](https://github.com/lusito/tsrux)
[![Watchers](https://flat.badgen.net/github/watchers/lusito/tsrux?icon=github)](https://github.com/lusito/tsrux)

tsrux enables you to reduce the boilerplate code you usually write to define your action creators, reducers, etc. and even gain type-safety in the process!

The name stands for typesafe [redux](https://redux.js.org/), aside from the bloody obvious: TypeScript Rocks!

#### Why use tsrux

- Extremely lightweight: 300 byte vs 7.7 kilobyte for [deox](https://bundlephobia.com/result?p=deox).
- Deadsimple to use
- No dependencies!
- Automated [unit- and type tests](https://travis-ci.org/Lusito/tsrux) with 100% [code coverage](https://coveralls.io/github/Lusito/tsrux)
- Liberal license: [zlib/libpng](https://github.com/Lusito/tsrux/blob/master/LICENSE)

### Installation via NPM

```
npm i tsrux
```

This library is shipped as es2015 modules. To use them in browsers, you'll have to transpile them using webpack or similar, which you probably already do.

### Examples

#### Creating an Action Creator

```typescript
import { actionCreator } from "tsrux";

// No payload:
export const fetchTodos = actionCreator("TODOS/FETCH");
// With payload:
export const addTodo = actionCreator("TODOS/ADD", (label: string) => ({ label }));
export const setTodoChecked = actionCreator("TODOS/SET_CHECKED", (id: number, checked: boolean) => ({ id, checked }));
// With payload and metadata:
export const removeTodo = actionCreator("TODOS/REMOVE", (id: number) => ({ id }), (id: number) => ({ metaId: id, foo: "bar" }));

```

#### Creating Reducers

```typescript
import { mapReducers } from "tsrux";

// Some types, you obviously still need
interface TodoEntry {
    id: number;
    label: string;
    checked: boolean;
}

const initialState = {
    list: [] as TodoEntry[],
    nextId: 0,
};

// Some types you can infer from a variable
export type TodoState = typeof initialState;

/**
 * When using mapReducers(), you don't need to type your reducers!
 * 
 * This function is used to create a reducer for multiple actions.
 * It receives the initial state and a callback.
 * The callback is used to set up action handlers, returned an array of action handlers.
 */
export const todosReducer = mapReducers(initialState, (handle) => [
    /**
     * handle(actionCreator, reducer) helps you define a reducer responsible for one single action.
     * 
     * The benefit:
     * Both state and action types are known without needing to type them down!
     */
    handle(addTodo, (state, action) => ({
        ...state,
        list: [...state.list, { id: state.nextId, label: action.payload.label, checked: false }],
        nextId: state.nextId + 1,
    })),
    handle(setTodoChecked, (state, action) => ({
        ...state,
        list: state.list.map((todo) => {
            if (todo.id === action.payload.id)
                return { ...todo, checked: action.payload.checked };
            return todo;
        })
    })),
    handle(removeTodo, (state, action) => ({
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload.wrong), // Boom: payload does not have an attribute named "wrong"
    }))
]);
```

### Types

Some convenience types are included for the rare case where you do need to write types:

- `Action<TType, TPayload, TMeta>`
- `AnyAction`
- `ActionCreator<TType, TAction, TParams>`
- `ActionOf<TActionCreator>`

`ActionOf` determines the `Action` type by inspecting an action-creator.

```typescript
type AddTodoAction = ActionOf<typeof addTodo>;
```

### Questions

- Why don't you supply a `configureStore` method like `deox`?
  - It only adds weight, which is already carried by other libraries.
  - If you still need it, take a look at:
    - [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) (formerly known as [redux-starter-kit](https://www.npmjs.com/package/redux-starter-kit))
    - [redux-dynamic-modules](https://www.npmjs.com/package/redux-dynamic-modules), an awesome library if you are planning to modularize your code.
- That's it?
  - Yup, there is nothing more to it.

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
