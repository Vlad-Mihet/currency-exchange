// Due to the fact that the central european bank's api free plan only
// allows exchange rates to be provided for an euro base, we'll use a set
// of functions in order to convert between various currencies using the euro base

/*

Formula:

  1 EURO = x USD

  1 EURO = y GBP

  1 USD = (1 / x) * y GBP

*/

const generateExchangeRate = (x, y) => {
  // We know that the base currency is always euro
  // So we only have to apply the formula above

  return (1 / x) * y;
};

module.exports = generateExchangeRate;
