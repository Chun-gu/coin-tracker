import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { coinHistoryFetcher } from "../api";
import ApexChart from "react-apexcharts";

interface ICoinId {
  coinId: string;
}

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const { coinId } = useOutletContext<ICoinId>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => coinHistoryFetcher(coinId)
  );
  console.log(coinId);
  return (
    <div>
      {isLoading ? (
        "Loading Charts..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            colors: ["#0fbcf9"],
            fill: {
              type: "gradient",
              gradient: {
                type: "horizontal",
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
