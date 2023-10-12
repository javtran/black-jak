import styled from "styled-components";

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
    display: grid;
    justify-content: center;
    justify-items: center;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 15% 1fr;
    position: relative;
    /* padding-bottom: 100px; */
    /* margin-bottom: 100px; */
    .bets {
      width: 100%;
    }
  }

  .playfield {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    flex: 1;
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, 20%);
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
  user-select: none;
  gap: 1rem;

  #bets {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #bets > div {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    justify-items: center;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fit, 5%);
  }

  img {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.25);
  }

  p {
    font-weight: 900;
    font-size: 1.5rem;
    margin: 0;
    margin-top: 1rem;
  }

  .buttons {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  button {
    background: #862b0d;
    width: 8rem;
    height: 4rem;
    color: inherit;
    font-size: x-large;
    font-weight: bold;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    #bets {
      flex-shrink: 2;
      flex-basis: auto;
      flex-grow: 0;
      img {
        /* width: 4rem; */
        width: auto;
        height: 17vw;
      }
    }

    button {
      width: 17vw;
      height: 8vw;
      font-size: 3vw;
    }
  }
`;

export const StyledCard = styled.div`
  position: relative;
  background: white;
  padding: 0.4rem;
  border-radius: 10px;
  color: ${(props) => props.color};
  width: 7rem;
  height: 10rem;
  display: grid;
  grid-template-rows: repeat(10, minmax(0, 1fr));
  grid-template-columns: repeat(10, minmax(0, 1fr));
  box-shadow: 0px 4px 8px 0px #000;
  align-items: center;
  justify-items: center;
  user-select: none;

  p {
    margin: 0;
    font-size: medium;
    text-align: center;
  }
  img {
    width: 100%;
  }
  #top {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
  }
  #bottom {
    grid-column-start: 10;
    grid-column-end: 11;
    grid-row-start: 9;
    grid-row-end: 11;
    transform: scale(-1, -1);
  }

  div {
    display: flex;
    flex-direction: column;
  }

  #center {
    grid-column-start: 4;
    grid-column-end: 8;
    grid-row-start: 4;
    grid-row-end: 8;
    border: 1px;
  }

  #back {
    grid-row: span 10;
    grid-column: span 10;
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 14vw;
    height: 22vw;
    p {
      font-size: 0.75em;
    }
  }
`;

export const FlipCard = styled.div`
  position: relative;
  width: 7.8rem;
  height: 10.8rem;
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
    width: calc(14vw + 0.8rem);
    height: calc(22vw + 0.8rem);
  }
`;

export const Result = styled.div`
  div {
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
    font-weight: bold;
    width: 100%;
    height: 100%;
  }
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  user-select: none;
`;
