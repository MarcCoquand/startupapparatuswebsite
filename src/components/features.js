import { h, app } from "hyperapp";
import "../css/features.scss";
import Stepper from "./stepper"

export default ({state, actions}) => (
  <div id="features" class="features">
    <div class="header-box">
      <h3>› Realize ideas that matter</h3>
    </div>
    <p>
      Start ups today can not afford the tech needed to build their product.
      Oftentimes they are also given the wrong prdouct. At Startup Apparatus we
      are proud to say that we will not just build what you tell us to build. We
      will ensure that the right product is developed first.
    </p>

    <h4 style={{marginBottom: "3rem"}}>How we work</h4>
    <Stepper state={state} actions={actions} />
  </div>
);
