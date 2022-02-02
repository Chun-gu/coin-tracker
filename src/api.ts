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
