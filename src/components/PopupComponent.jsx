import icon from "../images/light-bulb.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PopupComponent = () => {
  return (
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
        This is a comment sentiment analysis app, which gives you a sentiment
        score and a general sentiment of the 100 initial comments on a YouTube
        video, just by giving your desired Video-Id.
        <h2>What is Video-Id?</h2>
        <p>
          "https://www.youtube.com/watch?v=UKdQjQX1Pko", in the YouTube Link
          provided the part UKdQjQX1Pko is the Video-Id and it is different for
          every video.
        </p>
      </p>
    </Popup>
  );
};

export default PopupComponent;
