import { h, app } from "hyperapp";
import "../css/team.scss";
import Stepper from "./stepper"

export default ({state, actions}) => (
  <div class="team">
    <div class="header-box" style={{marginTop: "9rem"}}>
      <h3>› Meet the team</h3>
    </div>
    <p>
    We are a diverse team from all over the world with skills in design,
    entrepreneurship, business managaement, marketing, IT development. We are
    all very passionate about entrepreneurship and all it entails.
    </p>
  </div>
);
