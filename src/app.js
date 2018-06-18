import { h, app } from "hyperapp";
import terminal from "./ components/terminal";
import { switchcaseF, switchcase } from "./utils";
import "./css/main"

export const state = {
  width: window.innerWidth,
  height: window.innerHeight,
  mode: "MOBILE",
  terminal: terminal.state
};

export const actions = {
  updateWindowWidth: width => state =>
    width < 760
      ? { maxWidth: width, mode: "MOBILE" }
      : { maxWidth: width, mode: "DESKTOP" },
  updateWindowHeight: height => state => ({ maxHeight: height }),
  terminal: terminal.actions
};

export const view = (state, actions) => (
  <main>
    <h1>This is a heading</h1>
    <h2>Helping startups with tech and design</h2>
    <p>Here's some paragraph text</p>
    <terminal.view class="terminalBody" state={state.terminal} />
  </main>
);
