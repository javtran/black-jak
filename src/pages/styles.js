import styled from "styled-components";

export const Main = styled.div`
  height: 100vh;
  background: #004225;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

export const Bank = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  div {
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
  }
  @media screen and (max-width: 768px) {
    div {
    width: 100%;
    width: 100%;
    border-radius: 0;
    .chips {
      width: 100%;
      height: auto;
      width: 100%;
    border-radius: 0;
    .chips {
      width: 100%;
      height: auto;
    }
    img {
      width: 500%;
      height: auto;
    }
  }
`;
