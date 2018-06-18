import { h, app } from "hyperapp";
import { switchcaseF, switchcase } from "../utils";
import { reduce } from "ramda";

// CONFIGURATION
const historyLimit = 8;
const loadingbarLength = 20;
const sentenceList = [
  { sentence: "› Help me with design", mode: "TEXTINPUT" },
  { sentence: "A suggestion for how to work with the design has been sent to you", mode: "INSTANT" },
  { sentence: "› Build a prototype for me", mode: "TEXTINPUT" },
  { sentence: "A prototype has been sent to your email", mode: "INSTANT" },
  { sentence: "› Help me with building a website", mode: "TEXTINPUT" },
  { sentence: "Your website has launched 🚀", mode: "INSTANT" },
];

const state = {
  todo: "PRINT",
  sentenceList: sentenceList,
  toWrite: "",
  history: [],
  waitTimer: 0
};

const invalidTodo = () => {
  console.log("ERROR: INVALID STATE. TERMINAL WILL STOP");
  // Handle
  return { todo: "NONE" };
};

const pushHistory = (historyArray, newEntry, limit) =>
  historyArray.length >= limit
    ? historyArray.slice(1).concat(newEntry) // Remove last element with slice
    : historyArray.concat(newEntry);

// Instantly push a line to history
const stepInstant = ({ sentence, mode }, historyArray, nextSentences) => ({
  toWrite: "",
  history: pushHistory(historyArray, sentence, historyLimit),
  waitTimer: 40,
  todo: "WAIT",
  sentenceList: nextSentences.concat({ sentence, mode })
});

const stepLetter = (toWrite, sentence, nextSentences, historyArray) => {
  // There may be performance optimizations here that can be done in the future
  const [letter, ...sentenceTail] = sentence; // "hell" => sentencetail = ['e','l','l'].
  return letter
    ? {
        toWrite: toWrite + letter,
        // retransform sentenceTail from Array -> string by using join("")
        sentenceList: [
          { sentence: sentenceTail.join(""), mode: "TEXTINPUT" },
          ...nextSentences
        ]
      }
    : {
        history: pushHistory(historyArray, toWrite, historyLimit),
        sentenceList: nextSentences.concat({
          sentence: toWrite,
          mode: "TEXTINPUT"
        }),
        toWrite: "",
        waitTimer: 20,
        todo: "WAIT"
      };
};

const renderLoadingbar = (limit, position) =>
  position
    ? "[" + "=".repeat(position - 1) + "›" + " ".repeat(limit - position) + "]"
    : "[" + "=".repeat(position) + "›" + " ".repeat(limit - position) + "]";

const renderLoadingbarComplete = limit => "[" + "=".repeat(limit) + "]";

const stepLoadingbar = (length, position, historyArray, nextSentences) =>
  length === position
    ? {
        toWrite: "",
        waitTimer: 40,
        todo: "WAIT",
        sentenceList: nextSentences.concat({
          length: loadingbarLength,
          position: 0,
          mode: "LOADINGBAR"
        }),
        history: pushHistory(historyArray, renderLoadingbarComplete(length))
      }
    : {
        toWrite: renderLoadingbar(length, position),
        sentenceList: [
          {
            length: loadingbarLength,
            position: position + 1,
            mode: "LOADINGBAR"
          },
          ...nextSentences
        ]
      };

const stepPrint = (toWrite, sentenceList, historyArray) => {
  // console.log(sentenceList)
  const [next, ...nextSentences] = sentenceList;
  // If printing a new word which is an input we want to add an indicator first
  return switchcaseF({
    INSTANT: () => 
      stepInstant(next, historyArray, nextSentences),
    LOADINGBAR: () =>
      stepLoadingbar(next.length, next.position, historyArray, nextSentences),
    TEXTINPUT: () =>
      stepLetter(toWrite, next.sentence, nextSentences, historyArray)
  })(() => {
    todo: "NONE";
  })(next.mode);
};

const stepLoad = () => ({ todo: "PRINT" });

const stepWait = timer =>
  timer <= 0 ? { todo: "PRINT" } : { waitTimer: timer - 1 };

const actions = {
  setTodo: newTodo => () =>
    switchcase({
      PRINT: { todo: "PRINT" },
      WAIT: { todo: "WAIT" }
    })({ todo: "NONE" })(newTodo),

  step: () => state =>
    switchcase({
      PRINT: stepPrint(state.toWrite, state.sentenceList, state.history),
      WAIT: stepWait(state.waitTimer)
    })(invalidTodo)(state.todo)
};

const RenderSingleItem = ({ item, opacity }) => <p style={{opacity: opacity}}>{item}</p>;
const RenderHistory = ({ history }) => {
  return history.map((it, index) => <RenderSingleItem item={it} opacity={(index+2)/(history.length+1)} />);
};

const view = ({ state }) => (
  <div class="terminalBody" style={{padding: "1rem", maxWidth: state.width}}>
    <RenderHistory history={state.history} />
    <RenderSingleItem item={state.toWrite} />
  </div>
);

export default (process.env.NODE_ENV !== "test"
  ? {
      state: state,
      actions: actions,
      view: view
    }
  : {
      state: state,
      actions: actions,
      view: view,
      pushHistory: pushHistory,
      stepInstant: stepInstant,
      stepLetter: stepLetter,
      renderLoadingbar: renderLoadingbar
    });
