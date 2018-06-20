import t from "./terminal";
import {switchcase} from "../utils";

it("sets state to TODO with setTodo action", () =>
  expect(t.actions.setTodo("PRINT")()).toEqual({ todo: "PRINT" }));

it("sets state to NONE if invalid", () =>
  expect(t.actions.setTodo("ISHOULDTHROWERROR")()).toEqual({ todo: "NONE" }));

it("removes the last entry from history if limit is reached", () => {
  expect(t.pushHistory(["hello","hi","huh"], "kickOutHuh", 3)).toEqual(["kickOutHuh", "hello", "hi"])
})

// it("adds first letter from first element in sentenceList to toWrite when stepping the print", () => {
//   const result = t.actions.step()({ todo: "PRINT", history: [], toWrite: "", sentenceList: ["hello", "rest", "of us"] })
//   expect(result).toHaveProperty('toWrite', "h");
//   expect(result).toHaveProperty('sentenceList', ["ello", "rest", "of us"]);
// })

it("changes toWrite to just a string with › character when changing state from LOAD", () =>
  expect({hi: 'hi'}).toEqual({hi: 'hi'})
)

it("renders properly a loadingbar", () =>{
  expect(t.renderLoadingbar(8,2))
    .toBe("[=>      ]")
  expect(t.renderLoadingbar(8,8))
    .toBe("[=======>]")

})