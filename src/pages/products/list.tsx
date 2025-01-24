import { CreateButton, List, NumberField, useTable } from "@refinedev/antd";
import { Button, Table } from "antd";
import { PropsWithChildren } from "react";
import { Product } from "types/Product";
import { EyeOutlined } from "@ant-design/icons";
import { useGo, useNavigation } from "@refinedev/core";

export const ProductList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { createUrl } = useNavigation();
  const { showUrl } = useNavigation();

  const { tableProps } = useTable<Product>({
    hasPagination: false,
  });

  return (
    <List
      breadcrumb={false}
      headerButtons={(props) => [
        <CreateButton
          onClick={() => {
            return go({
              to: `${createUrl("products")}`,
              type: "replace",
            });
          }}
          {...props.createButtonProps}
          key="create"
          size="large"
        >
          Add Product
        </CreateButton>,
      ]}
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
          render={(_, record: Product) => {
            return (
              <Button
                icon={<EyeOutlined />}
                onClick={() =>
                  go({
                    to: `${showUrl("products", record._id)}`,
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
