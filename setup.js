/** 
 * Hyperapp initialization. Things like logger, redux-tools
 * and other middleware goes here and exported
 */
import { state, actions, view } from "./src/app";
import { h, app } from "hyperapp";

// Effect manager that allows for easier testing
import { withFx } from "@hyperapp/fx";

// redux devtools if in dev mode
const devtools =
  process.env.NODE_ENV !== "production"
    ? require("hyperapp-redux-devtools")
    : null;

/**
 * Our app invoked with a default state, some actions and a view.
 * To start tap simply tap like the example
 * @example
 * import intializeMain from "./main"
 * const main = initializeMain()
 */
export default () =>
  devtools
    ? devtools(app)(state, actions, view, document.body)
    : app(state, actions, view, document.body);
