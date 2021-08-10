import React, { useState } from "react";
import Sentiment from "sentiment";
import logo from "./images/YouTube_Logo_2017.svg";
import icon from "./images/light-bulb.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const sentiment = new Sentiment();
const API_KEY = "AIzaSyCOwY8388De03qcCZr_vMOPCaRtEvDI7eo";

const App = () => {
  const [sentimentScore, setSentimentScore] = useState(0);
  const [generalSentiment, setGeneralSentiment] = useState("Neutral");
  const [videoId, setVideoId] = useState("");
  const [text, setText] = useState("");

  const fetchEvents = async () => {
    if (videoId) {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=100`
      );
      const data = await res.json(toString());
      setText(data);
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

  return (
    <div className="app">
      <img src={logo} alt="YouTube Logo" className="yt-logo" />
      <div className="pop-up">
        <Popup
          trigger={
            <div className="head">
              <img src={icon} alt="Know More" id="popup1" />
              <h1>Comment Sentiment Analysis</h1>
              <img src={icon} alt="Know More" id="popup2" />
            </div>
          }
          position="bottom center"
        >
          <p contentStyle="popup-content" arrowStyle="popup-arrow">
            This is a comment sentiment analysis app, which gives you a
            sentiment score and a general sentiment of the 100 initial comments
            on a YouTube video, just by giving your desired Video-Id.
            <h2>What is Video-Id?</h2>
            <p>
              "https://www.youtube.com/watch?v=UKdQjQX1Pko", in the YouTube Link
              provided the part UKdQjQX1Pko is the Video-Id and it is different
              for every video.
            </p>
          </p>
        </Popup>
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
      <textarea
        value={comment}
        onClick={(e) => {
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
        }}
      ></textarea>
      <div className="score-part">
        <p className="score-p">
          <span className="left">Sentiment Score: </span>
          <span className="score">{sentimentScore}</span>
        </p>
        <p className="score-p">
          <span className="left">General Sentiment: </span>
          <span className="score">{generalSentiment}</span>
        </p>
      </div>
      <div className="footer">
        <h2>
          Developed with love by <span>Gyananshu Kashyap</span>
        </h2>
      </div>
    </div>
  );
};

export default App;
