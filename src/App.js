import React, { useState } from "react";
import Sentiment from "sentiment";
import logo from "./images/YouTube_Logo_2017.svg";
import Score from "./components/Score";
import PopupComponent from "./components/PopupComponent";
const sentiment = new Sentiment();
const API_KEY = "AIzaSyCOwY8388De03qcCZr_vMOPCaRtEvDI7eo";

const App = () => {
  const [sentimentScore, setSentimentScore] = useState(0);
  const [generalSentiment, setGeneralSentiment] = useState("Neutral");
  const [videoId, setVideoId] = useState("");
  const [text, setText] = useState("");

  const fetchEvents = async () => {
    if (videoId && videoId.length === 11) {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=100`
      );
      const data = await res.json(toString());
      setText(data);
      console.log(data);
    } else {
      alert("Please enter a valid Video-Id!");
    }
  };

  var comment = "";
  if (text) {
    comment = text.items.map((e) => {
      return e.snippet.topLevelComment.snippet.textDisplay;
    });
  } else {
    <h1>Loading!...</h1>;
  }

  function handleScore(e) {
    const result = sentiment.analyze(e.target.value);
    setSentimentScore(result.score);
    if (result.score < 0) {
      setGeneralSentiment("Negative");
    }
    if (result.score > 0) {
      setGeneralSentiment("Positive");
    }
    if (result.score === 0) {
      setGeneralSentiment("Neutral");
    }
  }

  return (
    <div className="app">
      <img src={logo} alt="YouTube Logo" className="yt-logo" />
      <div className="pop-up">
        <PopupComponent />
      </div>
      <p>Enter Video-Id to get the real-time sentiment analysis:</p>
      <input
        onChange={(e) => setVideoId(e.target.value)}
        className="input"
        placeholder="Enter the Video-Id"
      ></input>
      <button type="button" onClick={fetchEvents}>
        Get Analysis
      </button>
      <p className="click">
        Click on the text to get the real-time sentiment analysis:
      </p>
      <textarea value={comment} onClick={handleScore}></textarea>
      <Score
        sentimentScore={sentimentScore}
        generalSentiment={generalSentiment}
      />
    </div>
  );
};

export default App;
