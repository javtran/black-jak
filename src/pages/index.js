import * as React from "react";
import "../styles/global.css";
import { useCollapse } from "react-collapsed";
import { Bank, Bet, Main } from "./styles";

const SUITS = { 0: "Diamond", 1: "Clover", 2: "Heart", 3: "Spade" };
const FACES = {
  0: 2,
  1: 3,
  2: 4,
  3: 5,
  4: 6,
  5: 7,
  6: 8,
  7: 9,
  8: 10,
  9: "Jack",
  10: "Queen",
  11: "King",
  12: "Ace",
};
export default function Home() {
  const [bank, setBank] = React.useState(2000);
  const [bet, setBet] = React.useState(0);
  const [betList, setBetList] = React.useState([]);
  const [state, setState] = React.useState("bet");
  const [userHand, setUserHand] = React.useState([]);
  const [userTotal, setUserTotal] = React.useState(0);
  const [dealerHand, setDealerHand] = React.useState([]);
  const [dealerTotal, setDealerTotal] = React.useState(0);
  const [deck, setDeck] = React.useState([]);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  React.useEffect(() => {
    const localDeck = JSON.parse(window.localStorage.getItem("deck"));
    if (localDeck) {
      setDeck(localDeck);
    } else {
      shuffle();
    }
    const localBank = window.localStorage.getItem("bank");
    if (localBank) {
      setBank(localBank);
    }
  }, []);
  React.useEffect(() => {
    const total = calculateHand(userHand);
    setUserTotal(total);
  }, [userHand]);

  React.useEffect(() => {
    if (userTotal > 21) {
      setState("bust");
    }

    if (userTotal === 21) {
      if (userHand.length == 2) {
        console.log("blackjack");
        setState("blackjack");
        return;
      }
      setState("dealer");
    }
  }, [userTotal]);

  React.useEffect(() => {
    const hand =
      state === "dealer"
        ? dealerHand
        : dealerHand.filter((card) => card != dealerHand[0]);
    const total = calculateHand(hand);
    setDealerTotal(total);
  }, [dealerHand]);

  React.useEffect(() => {
    switch (state) {
      case "dealer":
        if (dealerTotal < 17) {
          setTimeout(() => {
            hit();
          }, 1000);
          return;
        } else {
          switch (true) {
            case dealerTotal > 21:
            case dealerTotal < userTotal:
              console.log("user wins");
              setBank(bank + bet);
              break;

            case dealerTotal > userTotal:
            case dealerTotal === 21 && dealerHand.length === 2:
              console.log("dealer wins");
              setBank(bank - bet);
              break;

            default:
              console.log("push");
              break;
          }
        }
        break;
      case "blackjack":
        if (dealerTotal === 21) {
          console.log("push");
        } else {
          console.log("user wins");
          setBank(bank + Math.round(bet * 1.5));
        }
        break;
      case "bust":
        if (state === "bust") {
          console.log("dealer wins");
          setBank(bank - bet);
        }
        break;
      default:
        return;
    }
    const prevBet = bet;
    setBet(0);
    setTimeout(() => {
      setState("bet");
      setBet(prevBet);
    }, 2000);
  }, [dealerTotal]);

  /**
   * Reacts to each state change
   * 1. Bet: user places bet
   * 2. Deal: deal user and dealer cards. ?? maybe include insurance and splitting here?
   * 3. Insurance: checks if dealer has natural blackjack. if not user loses insurance and goes back to deal incase splitting is possible
   * 4. Split: ??
   * 4. User: user turn
   * 5. Dealer: dealer turn
   * 5.
   */
  React.useEffect(() => {
    console.log("current state: ", state);
    switch (state) {
      case "bet":
        setDealerHand([]);
        setUserHand([]);
        if (deck.length != 0 && deck.length < 52) {
          shuffle();
        }
        break;
      case "deal":
      case "user":
      case "insurance":
        break;
      default:
        const total = calculateHand(dealerHand);
        setDealerTotal(total);
        break;
    }
  }, [state]);

  React.useEffect(() => {
    window.localStorage.setItem("deck", JSON.stringify(deck));
  }, [deck]);

  React.useEffect(() => {
    window.localStorage.setItem("bank", bank);
  }, [bank]);

  const shuffle = () => {
    const unshuffled = Object.keys(FACES).flatMap((f) =>
      Object.keys(SUITS).map((s) => {
        return { suit: s, face: f };
      })
    );
    unshuffled.push(...unshuffled);
    //change local storage
    setDeck(
      unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
  };

  const calculateHand = (hand) => {
    let ace = false;
    let total = 0;
    hand.forEach((card) => {
      if (Number(card.face) < 9) {
        total += FACES[card.face];
      } else if (Number(card.face) === 12) {
        if (ace) {
          total += 1;
        } else {
          ace = true;
        }
      } else {
        total += 10;
      }
    });
    if (ace) {
      total += total > 10 ? 1 : 11;
    }
    return total;
  };

  const deal = () => {
    setUserHand([deck[0], deck[2]]);
    setDealerHand([deck[1], deck[3]]);
    //change local storage
    setDeck((deck) => deck.filter((c, i) => i > 3));
    setState("deal");
  };

  const stand = () => {
    setState("dealer");
  };

  const insurance = () => {
    setState("insurance");
  };

  const hit = () => {
    const card = deck[0];
    // change local storage
    setDeck((deck) => deck.filter((c, i) => i !== 0));

    switch (state) {
      case "user":
        setUserHand([...userHand, card]);
        break;
      case "deal":
        setUserHand([...userHand, card]);
        setState("user");
        break;
      default:
        setDealerHand([...dealerHand, card]);
        break;
    }
  };

  const onBet = (amount) => {
    setBet(bet + amount);
    setBetList([...betList, amount]);
  };

  const removeBet = () => {
    setBet(bet - betList[betList.length - 1]);
    setBetList(betList.slice(0, -1));
  };

  return (
    // <div>
    //   {deck.length}
    //   <div>
    //     User[{userTotal}]:{" "}
    //     {userHand.map((card) => `{${FACES[card.face]} ${SUITS[card.suit]}}`)}
    //   </div>
    //   <div>
    //     Dealer[{dealerTotal}]:{" "}
    //     {dealerHand.map((card, i) =>
    //       i == 0 && ["deal", "user", "split"].includes(state)
    //         ? "{x}"
    //         : `{${FACES[card.face]} ${SUITS[card.suit]}}`
    //     )}
    //   </div>

    //   <div>
    //     {state === "bet" && bet != 0 && <button onClick={deal}>Deal</button>}
    //     {["deal", "user", "split"].includes(state) && (
    //       <button onClick={hit}>Hit</button>
    //     )}
    //     {["deal", "user", "split"].includes(state) && (
    //       <button onClick={stand}>Stand</button>
    //     )}
    //     {state === "deal" &&
    //       dealerHand[1].face === "12" &&
    //       userHand.length === 2 && (
    //         <button onClick={insurance}>Insurance</button>
    //       )}
    //   </div>
    //   <hr />
    //   <div>bank: {bank - bet}</div>
    //   <div>bet: {bet}</div>
    //   {bank - bet >= 1 && <button onClick={() => setBet(bet + 1)}>1</button>}
    //   {bank - bet >= 10 && <button onClick={() => setBet(bet + 10)}>10</button>}
    //   {bank - bet >= 50 && <button onClick={() => setBet(bet + 50)}>50</button>}
    //   {bank - bet >= 100 && (
    //     <button onClick={() => setBet(bet + 100)}>100</button>
    //   )}
    //   {bank - bet >= 500 && (
    //     <button onClick={() => setBet(bet + 500)}>500</button>
    //   )}
    // </div>
    <Main>
      {bet > 0 && (
        <Bet>
          <div onClick={() => removeBet()}>
            {betList.slice(-3).map((amount) => (
              <img src={`./chip${amount}.png`} alt={`chip${amount}`} />
            ))}
          </div>
          <p>${bet}</p>
        </Bet>
      )}

      <Bank>
        <div className="toggle" {...getToggleProps()} />
        <div className="wrapper">
          <div className="balance">
            Balance:
            <p> ${bank - bet}</p>
          </div>
          <div {...getCollapseProps()}>
            <div className="chips">
              {bank - bet >= 1 && (
                <img src="./chip1.png" alt="chip1" onClick={() => onBet(1)} />
              )}
              {bank - bet >= 10 && (
                <img
                  src="./chip10.png"
                  alt="chip10"
                  onClick={() => onBet(10)}
                />
              )}
              {bank - bet >= 50 && (
                <img
                  src="./chip50.png"
                  alt="chip50"
                  onClick={() => onBet(50)}
                />
              )}
              {bank - bet >= 100 && (
                <img
                  src="./chip100.png"
                  alt="chip100"
                  onClick={() => onBet(100)}
                />
              )}
              {bank - bet >= 500 && (
                <img
                  src="./chip500.png"
                  alt="chip500"
                  onClick={() => onBet(500)}
                />
              )}
              {bank - bet >= 1000 && (
                <img
                  src="./chip1000.png"
                  alt="chip1000"
                  onClick={() => onBet(1000)}
                />
              )}
            </div>
          </div>
        </div>
      </Bank>
    </Main>
  );
}
