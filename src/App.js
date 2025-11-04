import "./App.css"
import { useState } from "react"

const App = () => {
  const [entryPriceOfCoin, setEntryPriceOfCoin] = useState("")
  const [totalMargin, setTotalMargin] = useState("")
  const [leverage, setLeverage] = useState("")
  const [results, setResults] = useState(null)
  const [position, setPosition] = useState("")

  // Helper to format numbers with up to 5 decimal places
  const formatNumber = (num) => {
    return parseFloat(num.toFixed(8))
  }

  // Calculate profit price and coin percentage change
  const calculateProfitLevel = (
    entryPrice,
    margin,
    lev,
    profitPercent,
    positionType
  ) => {
    // Calculate the profit in USDT
    const profitInUSDT = margin * (profitPercent / 100)

    // Calculate position size
    const positionSize = margin * lev
    const holdingCoins = positionSize / entryPrice

    // Calculate price difference needed for this profit
    const priceDifference = profitInUSDT / holdingCoins

    // Calculate profit price based on position type
    let profitPrice
    if (positionType === "long") {
      profitPrice = entryPrice + priceDifference
    } else {
      profitPrice = entryPrice - priceDifference
    }

    // Calculate coin price percentage change
    const coinPriceChangePercent =
      ((profitPrice - entryPrice) / entryPrice) * 100

    return {
      profitPrice: formatNumber(profitPrice),
      coinPriceChangePercent: formatNumber(Math.abs(coinPriceChangePercent)),
      profitInUSDT: formatNumber(profitInUSDT),
    }
  }

  // Calculate liquidation price
  const calculateLiquidation = (entryPrice, margin, lev, positionType) => {
    const positionSize = margin * lev
    const holdingCoins = positionSize / entryPrice

    // At liquidation, you lose all your margin
    const lossInUSDT = margin
    const priceDifference = lossInUSDT / holdingCoins

    let liqPrice
    if (positionType === "long") {
      liqPrice = entryPrice - priceDifference
    } else {
      liqPrice = entryPrice + priceDifference
    }

    return formatNumber(liqPrice)
  }

  const submit = (e) => {
    e.preventDefault()

    // Convert string inputs to numbers
    const entryPrice = parseFloat(entryPriceOfCoin)
    const margin = parseFloat(totalMargin)
    const lev = parseFloat(leverage)

    // Calculate position info
    const positionSize = formatNumber(margin * lev)
    const holdingCoins = formatNumber(positionSize / entryPrice)
    const liqPrice = calculateLiquidation(entryPrice, margin, lev, position)

    // Calculate profit levels
    const profitLevels = [100, 75, 50, 25, 10].map((percent) => ({
      percent,
      ...calculateProfitLevel(entryPrice, margin, lev, percent, position),
    }))

    setResults({
      entryPrice,
      positionSize,
      holdingCoins,
      liqPrice,
      profitLevels,
      position,
    })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>🚀 Crypto Futures Calculator</h1>
          <p className="subtitle">
            Calculate your profit targets and liquidation price
          </p>
        </div>

        <form className="calculator-form" onSubmit={submit}>
          <div className="input-grid">
            <div className="input-group">
              <label>Entry Price (USDT)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={entryPriceOfCoin}
                onChange={(e) => setEntryPriceOfCoin(e.target.value)}
                placeholder="Enter price..."
                required
              />
            </div>

            <div className="input-group">
              <label>Margin (USDT)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={totalMargin}
                onChange={(e) => setTotalMargin(e.target.value)}
                placeholder="Enter margin..."
                required
              />
            </div>

            <div className="input-group">
              <label>Leverage (1-125x)</label>
              <input
                type="number"
                min="1"
                max="125"
                step="1"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                placeholder="Enter leverage..."
                required
              />
            </div>

            <div className="input-group">
              <label>Position Type</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="">Select position...</option>
                <option value="long">🟢 Long (Buy)</option>
                <option value="short">🔴 Short (Sell)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="calculate-btn">
            Calculate Profit Targets
          </button>
        </form>

        {results && (
          <div className="results-section">
            <h2 className="results-title">📊 Trading Results</h2>

            <div className="summary-cards">
              <div className="summary-card">
                <div className="card-label">Position Size</div>
                <div className="card-value">{results.positionSize} USDT</div>
              </div>

              <div className="summary-card">
                <div className="card-label">Holding Coins</div>
                <div className="card-value">{results.holdingCoins}</div>
              </div>

              <div className="summary-card liquidation-card">
                <div className="card-label">⚠️ Liquidation Price</div>
                <div className="card-value danger">${results.liqPrice}</div>
              </div>
            </div>

            <div className="profit-levels-title">
              <h3>
                🎯 Take Profit Targets (
                {results.position === "long" ? "Long" : "Short"})
              </h3>
              <p className="helper-text">
                Target prices for different profit levels on your margin
              </p>
            </div>

            <div className="profit-levels">
              {results.profitLevels.map((level, index) => (
                <div
                  key={index}
                  className={`profit-card profit-${level.percent}`}
                >
                  <div className="profit-header">
                    <div className="profit-percentage">{level.percent}%</div>
                    <div className="profit-badge">+${level.profitInUSDT}</div>
                  </div>

                  <div className="profit-details">
                    <div className="detail-row">
                      <span className="detail-label">Target Price</span>
                      <span className="detail-value price">
                        ${level.profitPrice}
                      </span>
                    </div>

                    <div className="detail-row highlight">
                      <span className="detail-label">Coin Price Change</span>
                      <span className="detail-value change">
                        {results.position === "long" ? "▲" : "▼"}{" "}
                        {level.coinPriceChangePercent}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
