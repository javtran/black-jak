import React, { useState } from "react";
import styled from "styled-components";

export default function Bank({ bank }) {
  const [active, setActive] = useState(false);

  const Bank = styled.div`
    user-select: none;
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    background: #263a29;
    width: 90%;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px 0px 12px 6px rgba(0, 0, 0, 0.25);

    input {
      position: absolute;
      height: 2rem;
      width: 100%;
      opacity: 0;
      top: 0;
      left: 0;
      cursor: pointer;
    }

    input:checked ~ div > .chips {
      max-height: 8rem;
      margin-bottom: 1.25rem;
    }

    & > div {
      padding: 1.25rem;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    img {
      height: 8rem;
    }
    p {
      display: inline;
      font-weight: 800;
    }

    .chips {
      max-height: 0;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      justify-content: center;
      justify-items: center;
      align-items: center;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10px, max-content));
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
      <input type="checkbox" />
      <div className="wrapper">
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
      </div>
    </Bank>
  );
}
