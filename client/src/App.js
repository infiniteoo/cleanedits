import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import tupacBG from './imgs/2pac.jpg'
import colorsBG from './imgs/colors.jpg'
import concert1BG from './imgs/concert1.jpg'
import graf1BG from './imgs/graf1.jpg'
import guitarBG from './imgs/guitar.jpg'


import FilesUpload from "./components/FilesUpload";

function App() {

  const randomBG = () => {

    const bgArray = [tupacBG, concert1BG, colorsBG, graf1BG, guitarBG]
    const bg = bgArray[Math.floor(Math.random() * bgArray.length)];
    return bg;

  }

  return (
    <div className="main-container" style={{backgroundImage: `url(${randomBG()})`}}>
      <div>
      <div className="inner-container">
          <h3>Clean Edits</h3>
          <h4>max file size 50mb</h4>
          <FilesUpload />
        </div>

      

      </div>
       
    </div>
  );
}

export default App;
