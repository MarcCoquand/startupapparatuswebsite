export const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase

// switch case but for cases with functions, for example
// switchcaseF({increment: () => increment(state)}))({type: throwError(state)})(myKey)
export const switchcaseF = cases => defaultCase => key =>
  switchcase(cases)(defaultCase)(key)()
