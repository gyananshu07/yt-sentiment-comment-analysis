import React from "react";

const Score = ({ sentimentScore, generalSentiment }) => {
  return (
    <>
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
    </>
  );
};

export default Score;
