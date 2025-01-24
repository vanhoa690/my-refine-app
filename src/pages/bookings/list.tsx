import { ExportButton, List, NumberField, useTable } from "@refinedev/antd";
import { Button, Table } from "antd";
import { PropsWithChildren } from "react";
import { Booking } from "types/Booking";
import { EyeOutlined } from "@ant-design/icons";
import { useGo, useNavigation } from "@refinedev/core";

export const BookingList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { showUrl } = useNavigation();

  const { tableProps } = useTable<Booking>({
    hasPagination: false,
  });

  return (
    <List
      breadcrumb={false}
      headerProps={{
        extra: <ExportButton />,
      }}
    >
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="_id" key="_id" title="ID" />
        <Table.Column key="name" dataIndex="name" title="Name" />
        <Table.Column
          key="price"
          dataIndex="price"
          title="Price"
          render={(price: number) => {
            return (
              <NumberField
                value={price}
                options={{
                  style: "currency",
                  currency: "VND",
                }}
              />
            );
          }}
        />
        <Table.Column
          key="actions"
          title="Actions"
          render={(_, record: Booking) => {
            return (
              <Button
                icon={<EyeOutlined />}
                onClick={() =>
                  go({
                    to: `${showUrl("bookings", record._id)}`,
                  })
                }
              />
            );
          }}
        />
      </Table>
      {children}
    </List>
  );
};
