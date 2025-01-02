import {
  DollarCircleOutlined,
  DownOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { List } from "@refinedev/antd";
import { Button, Col, Dropdown, Row } from "antd";
import { CardWithPlot } from "../../components/card";
import { DailyRevenue } from "../../components/dashboard/dailyRevenue";
import { useApiUrl, useCustom } from "@refinedev/core";
import { ISalesChart } from "../../types";
import dayjs from "dayjs";
import { useMemo } from "react";

export const DashboardPage = () => {
  const now = dayjs();

  const API_URL = useApiUrl();

  const { data: dailyRevenueData } = useCustom<{
    data: ISalesChart[];
    total: number;
    trend: number;
  }>({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query: {
        start: now.subtract(6, "days").startOf("day").format(),
        end: now.endOf("day").format(),
      },
    },
  });
  const revenue = useMemo(() => {
    const data = dailyRevenueData?.data?.data;
    if (!data)
      return {
        data: [],
        trend: 0,
      };

    const plotData = data.map((revenue) => {
      const date = dayjs(revenue.date);
      return {
        timeUnix: date.unix(),
        timeText: date.format("DD MMM YYYY"),
        value: revenue.value,
        state: "Daily Revenue",
      };
    });

    return {
      data: plotData,
      trend: dailyRevenueData?.data?.trend || 0,
    };
  }, [dailyRevenueData]);
  console.log({ revenue });

  return (
    <List
      title="Overview"
      headerButtons={() => (
        <Dropdown
          menu={{
            items: [
              { key: "lastweek", label: " Last Week" },
              { key: "lastmonth", label: " Last Month" },
            ],
          }}
        >
          <Button>
            Last Week
            <DownOutlined />
          </Button>
        </Dropdown>
      )}
    >
      <Row gutter={[16, 16]}>
        <Col md={24}>
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 10 }} lg={24} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <DollarCircleOutlined
                    style={{
                      fontSize: 14,
                    }}
                  />
                }
                title="Daily Revenue"
              >
                <DailyRevenue height={170} data={revenue.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <ShoppingOutlined
                    style={{
                      fontSize: 14,
                    }}
                  />
                }
                title="Daily Orders"
              />
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <UserOutlined
                    style={{
                      fontSize: 14,
                    }}
                  />
                }
                title="New Customers"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </List>
  );
};
