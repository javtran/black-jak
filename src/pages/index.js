import * as React from "react";
import "../styles/global.css";
import { useCollapse } from "react-collapsed";
import { Bet, FlipCard, GameButton, Main, ResultOverlay, ResultCard, ScoreBadge, StyledBank } from "../styles/styles";
import Card from "../components/card";
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from "framer-motion";

const SUITS = { 0: "diamond", 1: "clover", 2: "heart", 3: "spade" };
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
  9: "J",
  10: "Q",
  11: "K",
  12: "A",
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
  const [result, setResult] = React.useState(null);
  const [win, setWin] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const betMotionValue = useMotionValue(0);
  const displayBet = useTransform(betMotionValue, (v) => `$${Math.round(v)}`);
  const { getCollapseProps, setExpanded } = useCollapse();

  const variants = {
    exit: (result) => {
      console.log(result);
      return { y: result === "Dealer Wins!" ? "-50vh" : "50vh" };
    },
  };

  React.useEffect(() => {
    const localDeck = JSON.parse(window.localStorage.getItem("deck"));
    if (localDeck && localDeck.length >= 52) {
      setDeck(localDeck);
    } else {
      shuffle();
    }
    const localBank = window.localStorage.getItem("bank");
    if (localBank) {
      setBank(Number(localBank));
    }
  }, []);

  React.useEffect(() => {
    const total = calculateHand(userHand);
    setTimeout(() => {
      setUserTotal(total);
    }, 300);
  }, [userHand]);

  React.useEffect(() => {
    if (userTotal > 21) {
      setState("bust");
    }

    if (userTotal === 21) {
      if (userHand.length === 2) {
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
    setTimeout(() => {
      setDealerTotal(total);
    }, 300);

    // Subsequent dealer hits: fires on every card addition (even same-total cases
    // like A+A=12 then A+A+Q=12 where dealerTotal effect won't re-fire).
    if (state === "dealer" && total < 17) {
      setTimeout(() => {
        hit();
      }, 700);
    }
  }, [dealerHand]);

  React.useEffect(() => {
    // Result determination only — no hit triggers here.
    switch (state) {
      case "dealer":
        if (dealerTotal >= 17) {
          switch (true) {
            case dealerTotal > 21:
            case dealerTotal < userTotal:
              setResult("You Win!");
              setWin(bet);
              break;

            case dealerTotal > userTotal:
            case dealerTotal === 21 && dealerHand.length === 2:
              setResult("Dealer Wins!");
              setWin(-1 * bet);
              break;

            default:
              setResult("Push");
              break;
          }
        }
        break;
      case "blackjack":
        if (dealerTotal === 21) {
          setResult("Push");
        } else {
          setResult("You Win!");
          setWin(Math.round(bet * 1.5));
        }
        break;
      case "bust":
        setResult("Dealer Wins!");
        setWin(-1 * bet);
        break;
      default:
        return;
    }
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
        setDealerTotal(0);
        setUserTotal(0);
        setWin(0);
        setIsFlipped(false);
        setExpanded(true);
        if (deck.length != 0 && deck.length < 52) {
          shuffle();
        }
        break;
      case "deal":
      case "user":
      case "insurance":
        setExpanded(false);
        break;
      default:
        const total = calculateHand(dealerHand);
        setIsFlipped(true);
        setTimeout(() => {
          setDealerTotal(total);
          // First hit: fires when state just became "dealer" (dealerHand unchanged,
          // so the dealerHand effect won't fire for this card reveal).
          if (state === "dealer" && total < 17) {
            setTimeout(() => hit(), 400);
          }
        }, 200);
        break;
    }
  }, [state]);

  React.useEffect(() => {
    const controls = animate(betMotionValue, bet, { duration: 0.3, ease: "easeOut" });
    return controls.stop;
  }, [bet]);

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
    setIsAnimating(true);
    setExpanded(false);
    setDeck((deck) => deck.filter((c, i) => i > 3));
    setUserHand([deck[0]]);
    setTimeout(() => {
      setDealerHand([deck[1]]);
    }, 400);
    setTimeout(() => {
      setUserHand([deck[0], deck[2]]);
    }, 800);
    setTimeout(() => {
      setDealerHand([deck[1], deck[3]]);
      setState((current) => current === "bet" ? "deal" : current);
    }, 1200);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1800);
  };

  const stand = () => {
    setState("dealer");
  };

  const insurance = () => {
    setState("insurance");
  };

  const hit = () => {
    const card = deck[0];
    setDeck((deck) => deck.filter((c, i) => i !== 0));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);

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
    if (state !== "bet") return;
    setBet(bet - betList[betList.length - 1]);
    setBetList(betList.slice(0, -1));
  };

  const reset = () => {
    const prevBet = bet;
    const prevBetList = betList;
    const newBank = bank + win;
    setBet(0);
    setBetList([]);
    setBank(newBank);
    setTimeout(() => {
      setResult(null);
      setState("bet");
      if (newBank >= prevBet) {
        setBet(prevBet);
        setBetList(prevBetList);
      }
    }, 800);
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
      <div className="main">
        <AnimatePresence>
          {result && (
            <ResultOverlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              >
                <ResultCard $win={win}>
                  <span className="result-label">{result}</span>
                  <span className="result-delta">
                    {win > 0 ? `+$${win}` : win < 0 ? `-$${Math.abs(win)}` : "Push"}
                  </span>
                  <button onClick={reset}>Play Again</button>
                </ResultCard>
              </motion.div>
            </ResultOverlay>
          )}
        </AnimatePresence>

        <div className="playfield dealer-field">
          <div className="hand-group">
            <AnimatePresence>
              {dealerHand.length !== 0 && (
                <ScoreBadge
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="label">Dealer</span>
                  <span className="value">
                    {["deal", "user"].includes(state) ? `${dealerTotal} + ?` : dealerTotal}
                  </span>
                  <AnimatePresence>
                    {state === "dealer" && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        exit={{ opacity: 0 }}
                        style={{ letterSpacing: "0.1em" }}
                      >
                        ...
                      </motion.span>
                    )}
                  </AnimatePresence>
                </ScoreBadge>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {dealerHand.length !== 0 && (
                <motion.div
                  className="cards"
                  animate={state === "dealer" ? {
                    filter: ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 8px rgba(255,255,255,0.6))", "drop-shadow(0 0 0px rgba(255,255,255,0))"],
                  } : { filter: "drop-shadow(0 0 0px rgba(255,255,255,0))" }}
                  transition={{ filter: { duration: 1.2, repeat: state === "dealer" ? Infinity : 0, ease: "easeInOut" }, x: { duration: 0.4, ease: "easeIn", bounce: 0 } }}
                  exit={{ x: "-90vw" }}
                >
                  {dealerHand.map((card, i) =>
                    i == 0 ? (
                      <motion.div
                        key={i}
                        initial={{ x: "-100vw", y: "-30vh" }}
                        animate={{ x: 0, y: 0 }}
                        transition={{
                          bounce: 0,
                        }}
                      >
                        <FlipCard
                          className={isFlipped ? "flip is-flipped" : "flip"}
                        >
                          <div>
                            <Card back={true} />
                          </div>
                          <div className="front">
                            <Card
                              face={FACES[card.face]}
                              suit={SUITS[card.suit]}
                            />
                          </div>
                        </FlipCard>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={i}
                        initial={{ x: "-100vw", y: "-30vh" }}
                        animate={{ x: 0, y: 0 }}
                        transition={{
                          bounce: 0,
                        }}
                      >
                        <Card face={FACES[card.face]} suit={SUITS[card.suit]} />
                      </motion.div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="bets">
          <Bet>
            <div className="buttons">
              {["deal", "user", "split"].includes(state) && (
                <GameButton
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: isAnimating ? 1 : 1.08 }}
                  whileTap={{ scale: isAnimating ? 1 : 0.95 }}
                  onClick={hit}
                  disabled={isAnimating}
                  $variant="hit"
                >
                  Hit
                </GameButton>
              )}
            </div>

            <div id="bets">
              <div style={{ cursor: state === "bet" ? "pointer" : "default" }}>
                <AnimatePresence initial={false}>
                  {betList.map((amount, i) => (
                    <motion.img
                      key={i}
                      src={`./chip${amount}.png`}
                      alt={`chip${amount}`}
                      initial={{ y: "50vh" }}
                      animate={{ y: 0 }}
                      exit={"exit"}
                      custom={result}
                      variants={variants}
                      transition={{ bounce: 0, duration: 0.2 }}
                      onClick={() => removeBet()}
                    />
                  ))}
                </AnimatePresence>
              </div>
              {bet > 0 && <motion.p>{displayBet}</motion.p>}
            </div>
            <div className="buttons">
              {state === "bet" && bet != 0 && (
                <GameButton
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: isAnimating ? 1 : 1.08 }}
                  whileTap={{ scale: isAnimating ? 1 : 0.95 }}
                  onClick={deal}
                  disabled={isAnimating}
                  $variant="deal"
                >
                  Deal
                </GameButton>
              )}
              <AnimatePresence>
                {["deal", "user", "split"].includes(state) && (
                  <GameButton
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: isAnimating ? 1 : 1.08 }}
                    whileTap={{ scale: isAnimating ? 1 : 0.95 }}
                    onClick={stand}
                    disabled={isAnimating}
                    $variant="stand"
                  >
                    Stand
                  </GameButton>
                )}
              </AnimatePresence>
            </div>
          </Bet>
        </div>

        <div className="playfield player-field">
          <div className="hand-group">
            <AnimatePresence>
              {userHand.length !== 0 && (
                <ScoreBadge
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="label">Player</span>
                  <span className="value">{userTotal}</span>
                </ScoreBadge>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {userHand.length !== 0 && (
                <motion.div
                  className="cards"
                  exit={{ x: "-90vw" }}
                  transition={{ x: { duration: 0.4, ease: "easeIn", bounce: 0, delay: 0.15 } }}
                >
                  {userHand.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: "-100vw", y: "-30vh" }}
                      animate={{ x: 0, y: 0 }}
                      transition={{ bounce: 0 }}
                    >
                      <Card face={FACES[card.face]} suit={SUITS[card.suit]} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <StyledBank $disabled={isAnimating}>
        <div className="wrapper">
          <div className="balance">
            Bank:
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
      </StyledBank>
    </Main>
  );
}
