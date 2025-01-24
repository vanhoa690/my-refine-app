import { Card, Drawer, Grid, List, Typography } from "antd";
import { User } from "types/User";
import { HttpError, useNavigation, useShow } from "@refinedev/core";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const UserShow = () => {
  const { list } = useNavigation();
  const { query: queryResult } = useShow<User, HttpError>({
    resource: "users",
  });
  const user = queryResult.data?.data;
  const breakpoint = Grid.useBreakpoint();

  return (
    <Drawer
      zIndex={1001}
      open={true}
      onClose={() => list("users")}
      width={breakpoint.sm ? "736px" : "100%"}
    >
      <Card
        bordered={false}
        styles={{
          body: {
            padding: "0 16px 0 16px",
          },
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              title: "Email",
              icon: <EnvironmentOutlined />,
              value: <Typography.Text>{user?.email}</Typography.Text>,
            },
            {
              title: "Created At",
              icon: <CalendarOutlined />,
              value: (
                <Typography.Text>
                  {dayjs(user?.createdAt).format("MMMM, YYYY HH:mm A")}
                </Typography.Text>
              ),
            },
          ]}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={item.icon}
                  title={
                    <Typography.Text type="secondary">
                      {item.title}
                    </Typography.Text>
                  }
                  description={item.value}
                />
              </List.Item>
            );
          }}
        />
      </Card>
    </Drawer>
  );
};
