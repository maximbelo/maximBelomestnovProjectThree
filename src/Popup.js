import React from "react";
import logo from "./assets/ws.png";
import { AiOutlineClose } from "react-icons/ai";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popupInner">
        <img src={logo} alt="William Shakespeare sketch" />
        <p>Without entering a word, using this app, is absurd!</p>
        <button
          className="closeBtn"
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  ) : null;
}

export default Popup;
