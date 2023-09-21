import React, { useState } from "react";
import styled from "styled-components";

export default function Bank({ bank }) {
  const [active, setActive] = useState(false);

  const Bank = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    box-sizing: border-box;
    bottom: -11rem;
    background: #263a29;
    padding: 1.25rem;
    width: 90%;
    height: 14rem;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px 0px 12px 6px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease-in-out;
    &:hover {
      transform: translateY(-11rem);
    }
    /* transform: ${(props) =>
      props.active ? "translateY(-11rem)" : "none"}; */
    img {
      height: 8rem;
    }
    p {
      display: inline;
      font-weight: 800;
    }

    .chips {
      flex: 1;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      justify-content: center;
      justify-items: center;
      align-items: center;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10px, max-content));
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
      left: 0;
      bottom: -9rem;
      height: 12rem;
      &:hover {
        transform: translateY(-9rem);
      }

      .chips {
        width: 95%;
      }

      img {
        max-width: 120%;
        height: auto;
      }
    }
  `;

  return (
    <Bank
      active={active}
      onClick={() => {
        setActive(true);
      }}
    >
      <div>
        Balance:
        <p> ${bank}</p>
      </div>

      <div className="chips">
        <img src="./chip1.png" alt="chip1" />
        <img src="./chip10.png" alt="chip10" />
        <img src="./chip50.png" alt="chip50" />
        <img src="./chip100.png" alt="chip100" />
        <img src="./chip500.png" alt="chip500" />
        <img src="./chip1000.png" alt="chip1000" />
      </div>
    </Bank>
  );
}
