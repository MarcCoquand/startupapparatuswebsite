import { h, app } from "hyperapp";
import terminal from "./ components/terminal";
import { switchcaseF, switchcase } from "./utils";
import "./css/main"
import logoImg1x from "./assets/logo.png"
import logoImg2x from "./assets/logo-2x.png"
import logoImg3x from "./assets/logo-3x.png"

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
  <main class="landing-page" style={{width: state.width, height: state.height}} >
    <img class="logo item-a" src={logoImg1x} srcset={logoImg1x + ' 1x,' + logoImg2x + ' 2x,' + logoImg3x + ' 3x' }/>
    <h1 class="item-b">Startup Apparatus</h1>
    <h2 class="item-c">Helping startups with tech and design</h2>

    <p class="quicklinks">Here's some paragraph text</p>
    <terminal.view class="terminalBody" state={state.terminal} />
    <a href="#" class="scroll-down"></a>
  </main>
);
