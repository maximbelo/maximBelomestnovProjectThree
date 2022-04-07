import "./App.css";
import Typewriter from "typewriter-effect";
import { RiQuillPenLine } from "react-icons/ri";

const Header = () => {
  return (
    <header>
      <h1>The Rookie Poet.</h1>
      <div className="iconContainer">
        <RiQuillPenLine />
      </div>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(50)
            .typeString("Having a tough time finding the right rhyme?")
            .pauseFor(2000)
            .typeString(" Let the rookie poet, save you some time!")
            .start();
        }}
      />
    </header>
  );
};

export default Header;
