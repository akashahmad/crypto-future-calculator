import "./App.css";
import { useState } from "react";

const App = () => {
  const [entryPriceOfCoin, setEntryPriceOfCoin] = useState();
  const [totalBudget, setTotalBudget] = useState();
  const [leverage, setLeverage] = useState();
  const [percentages, setPercntages] = useState();

  const convertFloatDec5 = (floatingValue) => {
    return parseFloat(floatingValue.toFixed(5));
  };

  const percentageToRequired = (percentage) => {
    return 1 + percentage / 100;
  };

  const percentageCal = (entryprice, budget, lev, percentageValue) => {
    percentageValue = percentageToRequired(percentageValue);
    const margin = convertFloatDec5(budget * lev),
      holdingCoins = convertFloatDec5(margin / entryprice),
      percent = margin - budget + budget * percentageValue,
      coinProfitPrice = convertFloatDec5(percent / holdingCoins),
      liqDif = convertFloatDec5(coinProfitPrice - entryprice),
      coinLiqPrice = entryprice - liqDif;
    return {
      coinProfitPrice,
      coinLiqPrice,
      margin,
      holdingCoins,
    };
  };

  const submit = (e) => {
    e.preventDefault();
    const _100 = percentageCal(entryPriceOfCoin, totalBudget, leverage, 100);
    const _50 = percentageCal(entryPriceOfCoin, totalBudget, leverage, 50);
    const _75 = percentageCal(entryPriceOfCoin, totalBudget, leverage, 75);
    const _25 = percentageCal(entryPriceOfCoin, totalBudget, leverage, 25);
    const _10 = percentageCal(entryPriceOfCoin, totalBudget, leverage, 10);
    setPercntages({
      _100,
      _75,
      _50,
      _25,
      _10
    });
  };

  return (
    <div className="App">
      <div className="heading">
        <h4>Future Trade Calculator</h4>
      </div>
      <form className="form" onSubmit={submit}>
        <div>
          <div className="field">
            <label>Entry Price *</label>
            <input
              type="number"
              min="0"
              onChange={(e) => setEntryPriceOfCoin(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Budget *</label>
            <input
              type="number"
              min="0"
              onChange={(e) => setTotalBudget(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Leverage *</label>
            <input
              type="number"
              onChange={(e) => setLeverage(e.target.value)}
              required
            />
          </div>
          {/* <div className="field">
            <label>Liquidation %</label>
            <input type="number" required />
          </div> */}
          <div className="buttonContainer">
            <button type="submit">Calculate</button>
          </div>
        </div>
      </form>
      {percentages && (
        <div>
          <h4>Cal Results</h4>

          <div className="form">
            <div className="field">
              <label>Coins</label>
              <p>{percentages?._100?.holdingCoins}</p>
            </div>
            <div className="field">
              <label>Margin</label>
              <p>{percentages?._100?.margin}</p>
            </div>
            <div>
              <div className="percent">
                <h5>100 %</h5>
              </div>
              <div>
                <div className="field">
                  <label>Liquidation</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._100?.coinLiqPrice}
                  />
                </div>
                <div className="field">
                  <label>Profit</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._100?.coinProfitPrice}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="percent">
                <h5>75 %</h5>
              </div>
              <div>
                <div className="field">
                  <label>Liquidation</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._75?.coinLiqPrice}
                  />
                </div>
                <div className="field">
                  <label>Profit</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._75?.coinProfitPrice}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="percent">
                <h5>50 %</h5>
              </div>
              <div>
                <div className="field">
                  <label>Liquidation</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._50?.coinLiqPrice}
                  />
                </div>
                <div className="field">
                  <label>Profit</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._50?.coinProfitPrice}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="percent">
                <h5>25 %</h5>
              </div>
              <div>
                <div className="field">
                  <label>Liquidation</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._25?.coinLiqPrice}
                  />
                </div>
                <div className="field">
                  <label>Profit</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._25?.coinProfitPrice}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="percent">
                <h5>10 %</h5>
              </div>
              <div>
                <div className="field">
                  <label>Liquidation</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._10?.coinLiqPrice}
                  />
                </div>
                <div className="field">
                  <label>Profit</label>
                  <input
                    disabled
                    type="number"
                    value={percentages?._10?.coinProfitPrice}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
