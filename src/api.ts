const BASE_URL = "https://api.coinpaprika.com/v1";

export async function coinsFetcher() {
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function coinInfoFetcher(coinId: string | undefined) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function coinTickersFetcher(coinId: string | undefined) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export async function coinHistoryFetcher(coinId: string | undefined) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return await (
    await fetch(
      `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    )
  ).json();
}
