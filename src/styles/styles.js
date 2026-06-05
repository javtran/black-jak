import styled from "styled-components";
import { motion } from "framer-motion";

export const Main = styled.div`
  height: 100vh;
  background: #004225;
  position: relative;
  display: flex;
  justify-content: center;
  color: white;
  overflow: hidden;
  .main {
    height: calc(100% - 4rem);
    width: 100%;
    max-width: 600px;
    display: grid;
    justify-content: center;
    justify-items: center;
    grid-template-columns: 100%;
    grid-template-rows: 1fr auto 1fr;
    position: relative;
    padding: 1rem 0;
    box-sizing: border-box;
    .bets {
      width: 100%;
    }
  }

  .playfield {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    flex: 1;
    padding: 1.5rem 1rem;

  &.dealer-field { justify-content: flex-end; }
  &.player-field { justify-content: flex-start; }

    .hand-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.35rem;
    }
    .cards {
      display: flex;
      flex-direction: row;

      & > * + * {
        margin-left: -3.5rem;
      }
    }
  }
`;

export const StyledBank = styled.div`
  user-select: none;
  position: fixed;
  box-sizing: border-box;
  bottom: 0;
  background: #263a29;
  width: 80%;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 12px 6px rgba(0, 0, 0, 0.25);

  .toggle {
    position: absolute;
    height: 2.5rem;
    width: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .wrapper {
    padding: 1.25rem;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
  }

  img {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    z-index: 1000;
    transition: opacity 0.2s ease;
    opacity: ${(props) => props.$disabled ? 0.4 : 1};
    pointer-events: ${(props) => props.$disabled ? "none" : "auto"};
  }

  .balance {
    margin-bottom: 1.25rem;
  }

  p {
    display: inline;
    font-weight: 800;
  }

  .chips {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.25rem;
    justify-content: center;
    justify-items: center;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fit, 14%);
    transition: all 0.2s ease-in;
  }

  @media screen and (min-width: 1024px) {
    width: 50rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;

    img {
      max-width: 120%;
      height: auto;
    }
  }
`;

export const Bet = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  gap: 1.5rem;

  #bets {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 7.5rem;
  }

  #bets > div {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    justify-items: center;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fit, 5%);
    min-height: 5rem;
  }

  img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.25);
  }

  p {
    font-weight: 900;
    font-size: 1.25rem;
    margin: 0;
    margin-top: 0.5rem;
  }

  .buttons {
    display: flex;
    justify-content: center;
    width: 9rem;
    flex-shrink: 0;
  }

  @media screen and (max-width: 768px) {
    #bets {
      flex-shrink: 2;
      flex-basis: auto;
      flex-grow: 0;
      img {
        width: auto;
        height: 12vw;
      }
    }

  }
`;

export const StyledCard = styled.div`
  position: relative;
  background: white;
  border-radius: 10px;
  color: ${(props) => props.color};
  width: 7rem;
  height: 10rem;
  box-shadow: 0px 4px 8px 0px #000;
  user-select: none;
  overflow: hidden;

  .corner {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    padding: 0.25rem;
    p { margin: 0; font-size: 0.8rem; font-weight: bold; }
    img { width: 0.65rem; margin-top: 0.1rem; }
  }
  .corner-top { top: 0; left: 0; }
  .corner-bot { bottom: 0; right: 0; transform: rotate(180deg); }

  .pip {
    position: absolute;
    width: 1rem;
    height: 1rem;
    transform: translate(-50%, -50%);
  }
  .pip-flipped {
    transform: translate(-50%, -50%) rotate(180deg);
  }

  .center-face {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.8rem;
    font-weight: 900;
    line-height: 1;
  }

  .center-ace {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.5rem;
  }

  #back {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 14vw;
    height: 22vw;

    .corner p { font-size: 2vw; }
    .corner img { width: 1.6vw; }
    .pip { width: 2.5vw; height: 2.5vw; }
    .center-face { font-size: 6vw; }
    .center-ace { width: 5vw; }
  }
`;

export const FlipCard = styled.div`
  position: relative;
  width: 7rem;
  height: 10rem;
  transition: transform 0.5s;
  transform-style: preserve-3d;

  &.is-flipped {
    transform: rotateY(180deg);
  }

  & > div {
    position: absolute;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .front {
    transform: rotateY(180deg);
  }

  @media screen and (max-width: 768px) {
    width: 14vw;
    height: 22vw;
  }
`;

export const GameButton = styled(motion.button)`
  width: 8rem;
  height: 4rem;
  color: white;
  font-size: x-large;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.35);
  background: ${(props) =>
    props.$variant === "hit" ? "#1a7a3a" :
    props.$variant === "stand" ? "#8b1a1a" :
    "#862b0d"};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:not(:disabled):hover {
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.45);
  }

  @media screen and (max-width: 768px) {
    width: 17vw;
    height: 8vw;
    font-size: 3vw;
    border-radius: 2vw;
  }
`;

export const ScoreBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  backdrop-filter: blur(4px);

  .label {
    opacity: 0.75;
    font-weight: 500;
  }

  .value {
    font-size: 1.15rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 3vw;
    .value { font-size: 3.5vw; }
  }
`;

export const ResultOverlay = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

export const ResultCard = styled.div`
  background: #1a3a24;
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.25rem;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  min-width: 16rem;

  .result-label {
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 0.03em;
    color: white;
  }

  .result-delta {
    font-size: 2.5rem;
    font-weight: 900;
    color: ${(props) =>
      props.$win > 0 ? "#4ade80" : props.$win < 0 ? "#f87171" : "#facc15"};
  }

  button {
    margin-top: 0.5rem;
    background: #862b0d;
    color: white;
    border: none;
    border-radius: 0.6rem;
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    transition: background 0.15s ease, transform 0.1s ease;

    &:hover {
      background: #a33610;
    }

    &:active {
      transform: translateY(2px);
    }
  }

  @media screen and (max-width: 768px) {
    padding: 2rem;
    min-width: 12rem;

    .result-label { font-size: 1.5rem; }
    .result-delta { font-size: 2rem; }
  }
`;
