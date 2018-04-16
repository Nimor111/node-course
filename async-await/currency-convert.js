// USD CAD 23 - canadian equivalent of 23 dollars
// 23 USD is worth 28 CAD. You can spend these in the following countries: ...

const axios = require('axios');
// when the old api gets deprecated june 2018
// const fixer_access_key = process.env.FIXER_KEY;

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];

    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
  }
};

const getCountries = async currencyCode => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${currencyCode}`,
    );
    return response.data.map(country => country.name);
  } catch (err) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to)
    .then(tempCountries => {
      countries = tempCountries;
      return getExchangeRate(from, to);
    })
    .then(rate => {
      const exchangeAmount = amount * rate;

      return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries}`;
    })
    .catch(err => console.log(err));
};

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const exchangeRate = await getExchangeRate(from, to);

  const exchangeAmount = amount * exchangeRate;

  return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries}`;
};

convertCurrencyAlt('USD', 'EUR', 1)
  .then(status => console.log(status))
  .catch(err => console.log(err.message));
