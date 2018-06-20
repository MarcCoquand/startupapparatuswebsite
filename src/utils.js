export const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase

// switch case but for cases with functions, for example
// switchcaseF({increment: () => increment(state)}))({type: throwError(state)})(myKey)
// switchcaseF({
// INSTANT: () => 
//   stepInstant(next, historyArray, nextSentences),
// LOADINGBAR: () =>
//   stepLoadingbar(next.length, next.position, historyArray, nextSentences),
// TEXTINPUT: () =>
//   stepLetter(toWrite, next.sentence, nextSentences, historyArray)
// })(() => {
// todo: "NONE";
// })(next.mode);
export const switchcaseF = cases => defaultCase => key =>
  switchcase(cases)(defaultCase)(key)()
