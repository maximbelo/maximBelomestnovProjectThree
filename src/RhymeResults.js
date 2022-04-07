import { useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import NoResults from "./NoResults";
import Popup from "./Popup";
import axios from "axios";

function RhymeResults() {
  // Store user input value in State
  const [userInput, setUserInput] = useState("");
  //  Build State to store our rhymes
  const [rhymes, setRhymes] = useState([]);
  // State to store error message if user does not enter anything in the input
  const [emptySubmission, setEmptySumbission] = useState(false);
  // State to store error handler if no results are found based on the user submitted word
  const [noResults, setNoResults] = useState(false);

  // Function to take the user back to the top of the page
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (userInput === "") {
      setRhymes([]);
      setEmptySumbission(true);
      setNoResults(false);
    } else {
      axios({
        method: "GET",
        url: `https://wordsapiv1.p.rapidapi.com/words/${userInput}/rhymes`,
        dataResponse: "json",
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }).then((res) => {
        const allRhymes = res.data.rhymes.all;
        // Logic to select 20 random rhymes from the array total
        if (allRhymes) {
          let uniqueRandRhymes = [];
          // length variable prevents inf. loop in our do while loop if the results from the API call are less than 20
          let length = allRhymes.length < 20 ? allRhymes.length : 20;
          do {
            // Randomizer to get a random rhyme from the array total
            const randomizer =
              allRhymes[Math.floor(Math.random() * allRhymes.length)];
            // Prevents duplicates from getting pushed to uniqueRandRhymes
            if (!uniqueRandRhymes.includes(randomizer)) {
              // Push unique rhyme into the uniqueRandRhymes array
              uniqueRandRhymes.push(randomizer);
            }
          } while (uniqueRandRhymes.length < length);
          setRhymes(uniqueRandRhymes);
          // Clear userInput
          setUserInput("");
          // Change state to hide errorMessage
          setEmptySumbission(false);
          setNoResults(false);
        } else {
          setUserInput("");
          setNoResults(true);
          setEmptySumbission(false);
          setRhymes([]);
        }
      });
    }
  }

  return (
    <main>
      <section className="resultsContainer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="wordToRhyme">
            <input
              type="text"
              name="wordToRhyme"
              onChange={(e) =>
                // Using regular expressions to get rid of empty spaces and special characters that the user enters, and replacing them with an empty string
                setUserInput(e.target.value.replace(/[^\w]/gi, ""))
              }
              value={userInput}
            />
          </label>
          <button type="submit">Let's get rhyming!</button>
        </form>

        <div className="results">
          <div className="pattern">
            {emptySubmission === true ? (
              <Popup trigger={true} setTrigger={setEmptySumbission} />
            ) : null}

            {noResults === true ? <NoResults /> : null}

            {rhymes.map((rhyme, index) => {
              return <p key={`rhymeKey-${index}`}> {rhyme}</p>;
            })}

            {rhymes.length !== 0 ? (
              <button className="takeMeUp" onClick={goToTop}>
                <AiFillCaretUp />
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

export default RhymeResults;
