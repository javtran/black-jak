import React from "react";
import { StyledCard } from "../pages/styles";

export default function Card({ face, suit, back }) {
  return !back ? (
    <StyledCard
      color={["diamond", "heart"].includes(suit) ? "#bc1e24" : "black"}
    >
      <div id="top">
        <p>{face}</p>
        <img src={`./${suit}.png`} />
      </div>
      <img src={`./${suit}.png`} id="center" />
      <div id="bottom">
        <p>{face}</p>
        <img src={`./${suit}.png`} />
      </div>
    </StyledCard>
  ) : (
    <StyledCard>
      <img id="back" src="./cardback.png" />
    </StyledCard>
  );
}
