import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import tupacBG from "./imgs/2pac.jpg";
import colorsBG from "./imgs/colors.jpg";
import concert1BG from "./imgs/concert1.jpg";
import graf1BG from "./imgs/graf1.jpg";
import guitarBG from "./imgs/guitar.jpg";
import InputForm from "./components/InputForm";
import Payment from "./components/Payment";
import { Button } from "@material-ui/core";

import FilesUpload from "./components/FilesUpload";

function App() {
  const randomBG = () => {
    const bgArray = [tupacBG, concert1BG, colorsBG, graf1BG, guitarBG];
    const bg = bgArray[Math.floor(Math.random() * bgArray.length)];
    return bg;
  };

  const [uploaded, setUploaded] = useState(false);
  const [infoEntered, setInfoEntered] = useState(false);

  const initialOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
};

  return (
    
      
    <div
      className="main-container"
      style={{ backgroundImage: `url(${randomBG()})` }}
    >
      {!uploaded && (
        
        <div>
          <div className="inner-container">
            <p style={{ fontSize: "105px" }}>Clean Edits</p>
            <h4>radio friendly edits for your project</h4>
            <FilesUpload />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "10px" }}
              onClick={()=>setUploaded(true)}
            >
              Submit
             
            </Button>
          </div>
        </div>
      )}
      {uploaded && !infoEntered && (
        <div>
        <InputForm setInfoEntered={setInfoEntered}/>
        
      </div>
      )}
       {uploaded && infoEntered && (
        <div>
        <Payment />
        
      </div>
      )}

      <div></div>
      
    </div>
    
  );
}

export default App;
