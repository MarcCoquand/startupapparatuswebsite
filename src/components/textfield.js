import { h } from 'hyperapp'

export default ({ id, title, value, disabled, style, render, onChange }) =>(
    <div class="form-group" key={id}>
      <label >{title}</label>
      <input class="form-control" 
             type="text" 
             id={id} 
             value={value} 
             oninput={onChange} 
             onblur={() => console.log("I am triggered")}
             style={style}
             disabled={disabled ? 'disabled' : ''} />
    </div>
) 

