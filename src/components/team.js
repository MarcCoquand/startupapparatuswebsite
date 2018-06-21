import { h, app } from "hyperapp";
import "../css/team.scss";
import marcImg from "../assets/marc.png"
import tobiasImg from "../assets/tobias.png"

const Member = ({name, profileImg}) => 
  (
    <div class="profile-container">
      <div class="profile-text-container">
        <div class="profile-text">
          {name}
        </div>
      </div>
      <div style={{margin: "auto", width: "100%"}}>
        <img class="profile-img" src={profileImg} />
      </div>
    </div>
  );

export default ({state, actions}) => (
  <div id="team" class="team">
    <div class="header-box" style={{marginTop: "9rem"}}>
      <h3>› Meet the team</h3>
    </div>
    <p>
    We are a diverse team from all over the world with skills in design,
    entrepreneurship, business managaement, marketing, IT development. We are
    all very passionate about entrepreneurship and all it entails.
    </p>

    <div class="members">
      <Member name="Marc Coquand" profileImg={marcImg}/>
      <Member name="Tobias Gruffman" profileImg={tobiasImg}/>
      <Member name="Bala" profileImg={marcImg}/>
    </div>
  </div>
);
