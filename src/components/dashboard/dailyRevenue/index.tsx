import { Area, type AreaConfig } from "@ant-design/plots";
import { Suspense } from "react";
import dayjs from "dayjs";

type Props = {
  data: AreaConfig["data"];
  height: number;
};

export const DailyRevenue = ({ data, height }: Props) => {
  const config: AreaConfig = {
    isStack: false,
    data: data,
    xField: "timeText",
    yField: "value",
    seriesField: "state",
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: false,
    xAxis: {
      range: [0, 1],
      label: {
        formatter: (v) => {
          if (data.length > 7) {
            return dayjs(v).format("MM/DD");
          }

          return dayjs(v).format("ddd");
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v) => {
          return `$${Number(v) / 1000}k`;
        },
      },
    },
  };

  return (
    <Suspense>
      <Area {...config} height={height} />
    </Suspense>
  );
};
