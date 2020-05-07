// eslint-disable-next-line import/no-extraneous-dependencies
import { expectType } from "tsd";

import { actionCreator, Action, ActionCreator, AnyAction, ActionOf } from "./actionCreator";

interface TestPayload {
    foo: string;
    bar: number;
}

interface TestMeta {
    hello: string;
    world: number;
}

const placeholder = {} as any;

/**
 * Type Action should work correctly
 */
type Action1 = Action<"foo/bar/1">;
type Action2 = Action<"foo/bar/2", TestPayload>;
type Action3 = Action<"foo/bar/3", undefined, TestMeta>;
type Action4 = Action<"foo/bar/4", TestPayload, TestMeta>;

expectType<{ type: "foo/bar/1" }>(placeholder as Action1);
expectType<{ type: "foo/bar/2"; payload: TestPayload }>(placeholder as Action2);
expectType<{ type: "foo/bar/3"; meta: TestMeta }>(placeholder as Action3);
expectType<{ type: "foo/bar/4"; payload: TestPayload; meta: TestMeta }>(placeholder as Action4);

/**
 * Type AnyAction should work correctly
 */
expectType<Action<string> | Action<string, any> | Action<string, any, any> | Action<string, undefined, any>>(
    placeholder as AnyAction
);

/**
 * Type ActionCreator should work correctly
 */
type ActionCreator1 = ActionCreator<"foo/bar/1", Action1, []>;
type ActionCreator2 = ActionCreator<"foo/bar/2", Action2, [string, number]>;
type ActionCreator3 = ActionCreator<"foo/bar/3", Action3, [string, number]>;
type ActionCreator4 = ActionCreator<"foo/bar/4", Action4, [string, number]>;

expectType<{ type: "foo/bar/1" } & (() => Action1)>(placeholder as ActionCreator1);
expectType<{ type: "foo/bar/2" } & ((x: string, y: number) => Action2)>(placeholder as ActionCreator2);
expectType<{ type: "foo/bar/3" } & ((x: string, y: number) => Action3)>(placeholder as ActionCreator3);
expectType<{ type: "foo/bar/4" } & ((x: string, y: number) => Action4)>(placeholder as ActionCreator4);

/**
 * Type ActionOf should work correctly
 */
expectType<Action1>(placeholder as ActionOf<ActionCreator1>);
expectType<Action2>(placeholder as ActionOf<ActionCreator2>);
expectType<Action3>(placeholder as ActionOf<ActionCreator3>);
expectType<Action4>(placeholder as ActionOf<ActionCreator4>);

/**
 * Function actionCreator should work
 */
const actionCreator1 = actionCreator("foo/bar/1");
const actionCreator2 = actionCreator("foo/bar/2", (foo: string, bar: number) => ({ foo, bar }));
const actionCreator3 = actionCreator("foo/bar/3", undefined, (hello: string, world: number) => ({ hello, world }));
const actionCreator4 = actionCreator(
    "foo/bar/4",
    (foo: string, bar: number) => ({ foo, bar }),
    (hello: string, world: number) => ({ hello, world })
);

/**
 * Should return the correct action creator type
 */
expectType<ActionCreator1>(actionCreator1);
expectType<ActionCreator2>(actionCreator2);
expectType<ActionCreator3>(actionCreator3);
expectType<ActionCreator4>(actionCreator4);

/**
 * Action creators should have a type property
 */
expectType<"foo/bar/1">(actionCreator1.type);
expectType<"foo/bar/2">(actionCreator2.type);
expectType<"foo/bar/3">(actionCreator3.type);
expectType<"foo/bar/4">(actionCreator4.type);

/**
 * Action creators should return correct action type when called
 */
expectType<Action1>(actionCreator1());
expectType<Action2>(actionCreator2("foo", 13));
expectType<Action3>(actionCreator3("bar", 12));
expectType<Action4>(actionCreator4("2k", 11));
