import { React, useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  // Setting up the initial states using react hook 'useState'
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [error, setError] = useState(null);

  // Function to fetch information on button click, and set the data or error accordingly
  function getMeaning() {
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
      .then((response) => {
        setData(response.data[0]);
        setError(null); // Reset error state if request is successful
      })
      .catch((error) => {
        setError("Failed to fetch data"); // Set error state if request fails
      });
  }

  // Function to play and listen the phonetics of the searched word
  function playAudio() {
    if (data.phonetics && data.phonetics.length > 0 && data.phonetics[0].audio) {
      let audio = new Audio(data.phonetics[0].audio);
      audio.play();
    } else {
      setError("Audio is unavailable");
    }
  }

  function EnterKey(event){
    if(event.key === "Enter"){
      getMeaning();
    }
  }

  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        {/* Taking user input */}
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}onKeyDown={EnterKey}

        />
        <button
          onClick={() => {
            getMeaning();
          }}
        >
          <FaSearch size="20px" />
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <button
              onClick={() => {
                playAudio();
              }}
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4>Parts of speech:</h4>
          <p>{data.meanings && data.meanings[0].partOfSpeech}</p>
          <h4>Definition:</h4>
          <p>{data.meanings && data.meanings[0].definitions[0].definition}</p>
          <h4>Example:</h4>
          <p>{data.meanings && data.meanings[0].definitions[0].example ? data.meanings[0].definitions[0].example : "No example available"}</p>        </div>
      )}
    </div>
  );
}

export default App;
