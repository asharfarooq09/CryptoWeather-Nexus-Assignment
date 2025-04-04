const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchWeather = async (city) => {
  const res = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf5a7cb7f3313d15acae4907c850cfcd&units=metric
  `);
  return await res.json();
};

export const fetchCryptos = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana"
  );
  return await res.json();
};

export const fetchCryptoDetail = async (id) => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  return await res.json();
};

export const fetchNews = async () => {
  const res = await fetch(`
    https://newsdata.io/api/1/news?apikey=pub_782862898ffc46513053bba6aadb4c8539f7d&q=cryptocurrency&language=en
  `);
  const json = await res.json();
  return json.results.slice(0, 6);
};
