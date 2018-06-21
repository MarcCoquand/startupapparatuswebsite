import { h, app } from "hyperapp";
import terminal from "./components/terminal";
import { switchcaseF, switchcase } from "./utils";
import "./css/main";
import Features from "./components/features";
import Team from "./components/team";
import Contact from "./components/contact";
import logoImg1x from "./assets/logo.png";
import logoImg2x from "./assets/logo-2x.png";
import logoImg3x from "./assets/logo-3x.png";

export const state = {
  width: window.innerWidth,
  height: window.innerHeight,
  mode: "MOBILE",
  terminal: terminal.state,
  stepperPage: 1,
  stepperMax: 5
};

export const actions = {
  updateWindowWidth: width => state => {
    return width > 760
      ? { width: width, mode: "DESKTOP" }
      : { width: width, mode: "MOBILE" };
  },
  updateWindowHeight: height => state => ({ height: height }),
  stepperNext: () => state => ({stepperPage: (state.stepperPage % state.stepperMax)+1}),
  stepperPrev: () => state => ({stepperPage: (state.stepperPage-1) % state.stepperMax}),
  terminal: terminal.actions
};

const TopLeftImg = () => (
  <svg
    width="66"
    height="66"
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 64V0H64"
      transform="translate(2 2)"
      stroke="white"
      stroke-opacity="0.6"
      stroke-width="3"
    />
  </svg>
);

const TopRightImg = () => (
  <svg
    class="top-right-icon"
    width="66"
    height="66"
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 64V0H64"
      transform="translate(64 2) scale(-1 1)"
      stroke="white"
      stroke-opacity="0.6"
      stroke-width="3"
    />
  </svg>
);

const BottomLeftImg = () => (
  <svg
    width="66"
    height="66"
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 64V0H64"
      transform="translate(2 64) scale(1 -1)"
      stroke="white"
      stroke-opacity="0.6"
      stroke-width="3"
    />
  </svg>
);

const BottomRightImg = () => (
  <svg
    width="66"
    height="66"
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 64V0H64"
      transform="translate(64 64) rotate(-180)"
      stroke="white"
      stroke-opacity="0.6"
      stroke-width="3"
    />
  </svg>
);

export const view = (state, actions) => (
  <main>
    <div class="bg" style={{ width: state.width, height: state.height }}>
      <div
        class="landing-page"
        style={{ width: state.width, height: state.height }}
      >
        <img
          class="logo item-a"
          src={logoImg1x}
          srcset={logoImg1x + " 1x," + logoImg2x + " 2x," + logoImg3x + " 3x"}
        />
        <h1 class="item-b">Startup Apparatus</h1>
        <h2 class="item-c">Helping startups with tech and design</h2>

        <a class="quicklink-a" href="#team">» The team</a>
        {state.mode === "DESKTOP" ? (
          <p class="item-e">
            You can think of us as an incubator. A way to ignite your startup
            journey. We teach you how to design a valuable startups for free.
            This way you can validate and raise the capital needed to make your
            idea a reality. We help you build it.
          </p>
        ) : (
          ""
        )}
        {state.mode === "DESKTOP" ? (
          <div class="item-f">
            <a class="button-style">» Contact us</a>
          </div>
        ) : (
          ""
        )}

        {state.mode === "DESKTOP" ? <TopRightImg class="top-right-icon" /> : ""}

        <terminal.view class="terminalBody" state={state.terminal} />
        <p class="item-d">Scroll to learn how we work</p>
        <a href="#features" class="scroll-down" />
      </div>
    </div>
    <Features state={state} actions={actions}/>
    <Team state={state} actions={actions}/>
    <Contact.view state={state} actions={actions}/>
  </main>
);
