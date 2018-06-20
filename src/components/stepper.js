import { h, app } from "hyperapp";
import "../css/stepper.scss"

const EntryContentLast = ({ text,clickBackward, sideImg, isActive}) => 
  isActive ?
    <div class="content-wrapper last">
        <p class="content-text">{text}</p>
        <div class="button-style">
            <a onclick={clickBackward} style={{marginRight: "2rem", cursor: "pointer"}}>‹ Previous</a>
        </div>
    </div>
    :
    ''

const EntryContent = ({ isFirst, text, clickForward, clickBackward, sideImg, isActive}) => (
    <div class="content-wrapper">
        <p class="content-text" style={{display: isActive ? "block" : "none"}} >{text}</p>
        {isActive ?
        <div class="button-style">
            {isFirst ? '' :
            <a onclick={clickBackward} style={{marginRight: "2rem", cursor: "pointer"}} class="url">‹ Previous</a>}
            <a onclick={clickForward} style={{cursor: "pointer"}}>Next ›</a>
        </div> : <p class="content-text" />}
    </div>);

const EntryHeader = ({title, isActive}) => 
    isActive ?
        <div class="header-text">
            <div class="dot-active"/> 
            {title}
        </div>
        :
        <div class="header-text">
            <div class="dot"/> 
            {title}
        </div>


const EntryLast = ({
  text,
  title,
  clickForward,
  clickBackward,
  sideImg,
  isActive
}) => (
  <div class="stepper content-wrapper">
    <EntryHeader title={title} isActive={isActive}/>
    <EntryContentLast
        text={text}
        clickBackward={clickBackward}
        sideImg={sideImg}
        isActive={isActive}
    />
  </div>
);

const Entry = ({
  text,
  title,
  clickForward,
  clickBackward,
  sideImg,
  isFirst,
  isActive
}) => (
  <div class="stepper content-wrapper">
    <EntryHeader title={title} isActive={isActive}/>
    <EntryContent
        isFirst={isFirst}
        text={text}
        clickForward={clickForward}
        clickBackward={clickBackward}
        sideImg={sideImg}
        isActive={isActive}
    />
  </div>
);

const entryText = `
First meeting with us is to help you figure out what kind of research you
need to do to validate your product. Since tech is expensive it’s important
to, in a cost efficient matter, test your idea to make sure that we build the
right product for you. If you have already done this research we can of
course continue to the next steps.`;

const repeatText = `
Building a startup is an iterative process. This means you will repeatedly
have to validate, raise capital and build iteratively to always ensure that
you are on the right track.
`

const validationText= `
Since technology is expensive to build, it is important that you first
validate the idea before you build. We help giving you guidelines you can use
to validate the idea.
`
const buildText = `
After the idea is validated and we have raised capital we can start building the idea and make it a reality.
`

const raiseCapitalText =`
At this point it is time to raise capital. Not neccesarily to build your
product however. It can also be prototypes for further testing. You will find
with the validation you have done prior that it will be quite easy to raise
money at investors.
`
export default ({ state, actions }) => (
  <div>
    <Entry
      text={entryText}
      isFirst={true}
      title="The first meeting: figure it out"
      clickForward={actions.stepperNext}
      clickBackward={actions.stepperPrev}
      sideImg="src/first.png"
      isActive={state.stepperPage === 1 ? true : false}
    />
    <Entry
      text={validationText}
      title="Validation"
      clickForward={actions.stepperNext}
      clickBackward={actions.stepperPrev}
      sideImg="src/first.png"
      isActive={state.stepperPage === 2 ? true : false}
    />
    <Entry
      text={raiseCapitalText}
      title="Raise capital"
      clickForward={actions.stepperNext}
      clickBackward={actions.stepperPrev}
      sideImg="src/first.png"
      isActive={state.stepperPage === 3 ? true : false}
    />
    <Entry
      text={buildText}
      title="Build"
      clickForward={actions.stepperNext}
      clickBackward={actions.stepperPrev}
      sideImg="src/first.png"
      isActive={state.stepperPage === 4 ? true : false}
    />
    <EntryLast
      text={repeatText}
      title="Repeat"
      clickBackward={actions.stepperPrev}
      sideImg="src/first.png"
      isActive={state.stepperPage === 5 ? true : false}
    />
  </div>
);
