import React from "react";
import "./Mollecules.scss"; // Asegúrate de importar el archivo CSS correspondiente

const GamePadController = () => {
  return (
    <div className="gamePadController" aria-label="Open login">
      <div className="cable">
        <div className="cablePlug"></div>
      </div>
      <div className="controller">
        <div className="controllerShine"></div>
        <div className="centerBlue" 
                    id="modalButton"
                    data-toggle="modal"
                    data-target="#myModal"
                   >
                    START
        </div>
        <div className="centerStart">
          <div className="SLeft"></div>
          <div className="SRight"></div>
        </div>
        <div className="centerSelect">
          <div className="SLeft"></div>
          <div className="SRight"></div>
        </div>

        <div className="controllerLeft">
          <div className="circle"></div>
          <div className="crossCenter">
            <div className="crossTop"></div>
            <div className="crossBottom"></div>
            <div className="crossLeft"></div>
            <div className="crossRight"></div>
            <div className="crossCircle"></div>
          </div>
        </div>
        <div className="controllerRight">
          <div className="backButton1Center">
            <div className="cornerLeft1"></div>
            <div className="cornerRight1"></div>
          </div>
          <div className="backButton2Center">
            <div className="cornerLeft2"></div>
            <div className="cornerRight2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePadController;
