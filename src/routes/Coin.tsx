import styled from "styled-components";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
// import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { coinInfoFetcher, coinTickersFetcher } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  max-width: 480px;
  padding: 0 20px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  display: block;
  text-align: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
interface LinkState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface USD {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

interface Quotes {
  USD: USD;
}

interface ITickerData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

export const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation() as LinkState;
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: isInfoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => coinInfoFetcher(coinId),
    {
      refetchInterval: 3000,
    }
  );
  const { isLoading: isTickersLoading, data: tickersData } =
    useQuery<ITickerData>(["tickers", coinId], () =>
      coinTickersFetcher(coinId)
    );

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`http://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`http://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  const isLoading = isInfoLoading || isTickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
};
