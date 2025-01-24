import { Drawer, Flex, Typography } from "antd";
import { Booking } from "types/Booking";
import { HttpError, useNavigation, useShow } from "@refinedev/core";

export const BookingShow = () => {
  const { list } = useNavigation();

  const { query: queryResult } = useShow<Booking, HttpError>({
    resource: "bookings",
  });
  const booking = queryResult.data?.data;

  return (
    <Drawer zIndex={1001} open={true} onClose={() => list("bookings")}>
      <Flex
        vertical
        style={{
          padding: "16px",
        }}
      >
        <Typography.Title level={5}>ID: {booking?._id}</Typography.Title>
        <Typography.Title level={5}>Name: {booking?.name}</Typography.Title>
        <Typography.Title level={5}>Price: {booking?.price}</Typography.Title>
      </Flex>
    </Drawer>
  );
};
