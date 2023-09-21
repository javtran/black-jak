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
  }

  .balance {
    margin-bottom: 1.25rem;
  }

  p {
    display: inline;
    font-weight: 800;
  }

  .chips {
    height: 8rem;
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

    img {
      height: 8rem;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    .chips {
      width: 100%;
      height: auto;
    }

    img {
      max-width: 120%;
      height: auto;
    }
  }
`;
