import { h, app } from "hyperapp";
import "../css/contact.scss";
import Textfield from "./textfield"

const sendMessageToFireStore = (name, mail, description, firestore) =>
  new Promise((resolve, reject) =>
    firestore
      .collection("messages")
      .add({
        email: mail,
        name: name,
        message: description
      })
      .then(resolve)
      .catch(reject)
  );


// At the moment we only do front end validation  
const isValidName = name => name.length >= 2 && name.length <= 50;

const isValidEmail = email =>
  email.includes("@") && email.length >= 2 && email.length <= 50;

const isValidDescription = description =>
  description.length >= 5 && description.length <= 500;

const formIsComplete = (name, email, description) =>
  isValidName(name) &&
  isValidEmail(email) &&
  isValidDescription(description);

export const actions = {
  onSubmit: e => state => {
    if (formIsComplete(state.name,state.email,state.description)) {
      sendMessageToFireStore(
        state.name,
        state.email,
        state.description,
        state.db
      )
        .then(() => ({
            name: "",
            email: "",
            description: "",
            messageStatus: "SENT"
          
        }))
        .catch(e => {
          console.log(e);
          return ({ messageStatus: "FAILED" });
        });
      return ({messageStatus: "SENDING"})
    }
  }
}

export const state = {
    displayErrorName: false,
    name: "",
    displayErrorEmail: false,
    email: "",
    displayErrorDescription: false,
    description: "",
    messageStatus: "NOTSENT" // valid messageStatuses: SENDING, NOTSENT and FAILED
}

export const view = ({state, actions}) => (
  <div id="contact" class="contact">
    <div class="header-box" style={{marginTop: "9rem"}}>
      <h3>› Time for lift off</h3>
    </div>
    <p>
      If you are ready to get started, reach out to us
      and book your first meeting for free. We are all over the globe so the meeting can be
      done on whichever platform you prefer (Skype, Google Hangouts, Whatsapp). 
    </p>

    <h4>Contact us!</h4>

    <div>
      <Textfield id="test" title="test" value="test" disabled={state.messageStatus === "SENDING"} />
    </div>

  </div>
);

export default {
  view: view,
  state: state,
  actions: actions,
}
