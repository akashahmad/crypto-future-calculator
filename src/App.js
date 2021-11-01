import "./App.css";
import { useState } from "react";

const App = () => {
  const [entryPriceOfCoin, setEntryPriceOfCoin] = useState();
  const [totalMargin, setTotalMargin] = useState();
  const [leverage, setLeverage] = useState();
  const [percentages, setPercntages] = useState();

  const convertFloatDec5 = (floatingValue) => {
    return parseFloat(floatingValue.toFixed(5));
  };

  const percentageToRequired = (percentage) => {
    return 1 + percentage / 100;
  };

  const percentageCal = (entryprice, margin, lev, percentageValue) => {
    percentageValue = percentageToRequired(percentageValue);
    const size = convertFloatDec5(margin * lev),
      holdingCoins = convertFloatDec5(size / entryprice),
      percent = size - margin + margin * percentageValue,
      coinProfitPrice = convertFloatDec5(percent / holdingCoins),
      liqDif = convertFloatDec5(coinProfitPrice - entryprice),
      coinLiqPrice = entryprice - liqDif;
    return {
      coinProfitPrice,
      coinLiqPrice,
      size,
      holdingCoins,
    };
  };

  const submit = (e) => {
    e.preventDefault();
    const _100 = percentageCal(entryPriceOfCoin, totalMargin, leverage, 100);
    const _50 = percentageCal(entryPriceOfCoin, totalMargin, leverage, 50);
    const _75 = percentageCal(entryPriceOfCoin, totalMargin, leverage, 75);
    const _25 = percentageCal(entryPriceOfCoin, totalMargin, leverage, 25);
    const _10 = percentageCal(entryPriceOfCoin, totalMargin, leverage, 10);
    setPercntages({
      _100,
      _75,
      _50,
      _25,
      _10,
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
            <label>
              Entry Price <span>*</span>
            </label>
            <input
              type="number"
              min="0"
              step="any"
              onChange={(e) => setEntryPriceOfCoin(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>
              Margin <span>*</span>
            </label>
            <input
              type="number"
              min="0"
              step="any"
              onChange={(e) => setTotalMargin(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>
              Leverage <span>*</span>
            </label>
            <input
              type="number"
              min="0"
              max="125"
              step="any"
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
              <label>Size (Coin)</label>
              <p>{percentages?._100?.holdingCoins}</p>
            </div>
            <div className="field">
              <label>Size (USDT)</label>
              <p>{percentages?._100?.size}</p>
            </div>
            <div className="percent">
              <div>
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
            <div className="percent">
              <div>
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
            <div className="percent">
              <div>
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
            <div className="percent">
              <div>
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
            <div className="percent">
              <div>
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
