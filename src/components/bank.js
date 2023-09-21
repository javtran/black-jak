import React, { useState } from "react";
import styled from "styled-components";

export default function Bank({ bank, bet, setBet }) {
  const Bank = styled.div`
    user-select: none;
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    background: #263a29;
    width: 80%;
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
      width: 8rem;
    }
    p {
      display: inline;
      font-weight: 800;
    }

    .chips {
      max-height: 0;
      /* width: 80%; */
      width: 100%;
      margin-left: auto;
      margin-right: auto;
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
      }

      img {
        max-width: 120%;
        height: auto;
      }
    }
  `;

  return (
    <Bank>
      <input
        // checked={openBank}
        type="checkbox"
        // onChange={() => setOpenBank(!openBank)}
      />
      <div className="wrapper">
        <div className="balance">
          Balance:
          <p> ${bank - bet}</p>
        </div>

        <div className="chips">
          {bank - bet >= 1 && (
            <img
              src="./chip1.png"
              alt="chip1"
              onClick={() => setBet(bet + 1)}
            />
          )}
          {bank - bet >= 10 && (
            <img
              src="./chip10.png"
              alt="chip10"
              onClick={() => setBet(bet + 10)}
            />
          )}
          {bank - bet >= 50 && (
            <img
              src="./chip50.png"
              alt="chip50"
              onClick={() => setBet(bet + 50)}
            />
          )}
          {bank - bet >= 100 && (
            <img
              src="./chip100.png"
              alt="chip100"
              onClick={() => setBet(bet + 100)}
            />
          )}
          {bank - bet >= 500 && (
            <img
              src="./chip500.png"
              alt="chip500"
              onClick={() => setBet(bet + 500)}
            />
          )}
          {bank - bet >= 1000 && (
            <img
              src="./chip1000.png"
              alt="chip1000"
              onClick={() => setBet(bet + 1000)}
            />
          )}
        </div>
      </div>
    </Bank>
  );
}
