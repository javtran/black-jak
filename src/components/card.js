import React from "react";
import { StyledCard } from "../styles/styles";

const PIP_POSITIONS = {
  2:  [{t:22, l:50}, {t:78, l:50, r:true}],
  3:  [{t:22, l:50}, {t:50, l:50}, {t:78, l:50, r:true}],
  4:  [{t:22, l:30}, {t:22, l:70}, {t:78, l:30, r:true}, {t:78, l:70, r:true}],
  5:  [{t:22, l:30}, {t:22, l:70}, {t:50, l:50}, {t:78, l:30, r:true}, {t:78, l:70, r:true}],
  6:  [{t:22, l:30}, {t:22, l:70}, {t:50, l:30}, {t:50, l:70}, {t:78, l:30, r:true}, {t:78, l:70, r:true}],
  7:  [{t:22, l:30}, {t:22, l:70}, {t:36, l:50}, {t:50, l:30}, {t:50, l:70}, {t:78, l:30, r:true}, {t:78, l:70, r:true}],
  8:  [{t:22, l:30}, {t:22, l:70}, {t:36, l:50}, {t:50, l:30}, {t:50, l:70}, {t:64, l:50, r:true}, {t:78, l:30, r:true}, {t:78, l:70, r:true}],
  9:  [{t:22, l:30}, {t:22, l:70}, {t:38, l:30}, {t:38, l:70}, {t:50, l:50}, {t:62, l:30, r:true}, {t:62, l:70, r:true}, {t:78, l:30, r:true}, {t:78, l:70, r:true}],
  10: [{t:22, l:30}, {t:22, l:70}, {t:34, l:50}, {t:38, l:30}, {t:38, l:70}, {t:62, l:30, r:true}, {t:62, l:70, r:true}, {t:66, l:50, r:true}, {t:78, l:30, r:true}, {t:78, l:70, r:true}],
};

export default function Card({ face, suit, back }) {
  if (back) {
    return (
      <StyledCard>
        <img id="back" src="./cardback.png" alt="card back" />
      </StyledCard>
    );
  }

  const color = ["diamond", "heart"].includes(suit) ? "#bc1e24" : "black";
  const pips = PIP_POSITIONS[face];
  const isFaceCard = ["J", "Q", "K"].includes(face);
  const isAce = face === "A";

  return (
    <StyledCard color={color}>
      <div className="corner corner-top">
        <p>{face}</p>
        <img src={`./${suit}.png`} alt={suit} />
      </div>

      {pips && pips.map((pip, i) => (
        <img
          key={i}
          className={pip.r ? "pip pip-flipped" : "pip"}
          src={`./${suit}.png`}
          alt={suit}
          style={{ top: `${pip.t}%`, left: `${pip.l}%` }}
        />
      ))}

      {isFaceCard && <span className="center-face">{face}</span>}

      {isAce && <img className="center-ace" src={`./${suit}.png`} alt={suit} />}

      <div className="corner corner-bot">
        <p>{face}</p>
        <img src={`./${suit}.png`} alt={suit} />
      </div>
    </StyledCard>
  );
}
