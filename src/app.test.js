import { state, actions, view } from "./app";

it("updates inner width", () =>
  expect(actions.updateWindowWidth(5)({ maxWidth: 2 })).toEqual({ maxWidth: 5 }));
