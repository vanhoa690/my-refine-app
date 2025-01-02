import {
  CreateButton,
  List,
  NumberField,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { Avatar, Button, Table, Tag, Typography } from "antd";
import { PropsWithChildren } from "react";
import { Category, Product } from "../../types";
import {
  CheckCircleOutlined,
  EyeOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { spawn } from "child_process";
import { useGo, useNavigation } from "@refinedev/core";

export const ProductList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { createUrl } = useNavigation();
  const { showUrl } = useNavigation();

  const { tableProps } = useTable<Product>();
  const { selectProps: categorySelectProps, query: queryResult } =
    useSelect<Category>({
      resource: "categories",
      optionLabel: "title",
      optionValue: "id",
    });
  const categories = queryResult?.data?.data || [];

  return (
    <List
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
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" key="id" title="ID" />
        <Table.Column
          key="images"
          dataIndex="images"
          title="Images"
          render={(images: Product["images"]) => {
            return (
              <Avatar
                shape="square"
                src={images?.[0]?.thumbnailUrl || images?.[0]?.url}
                alt={images?.[0].name}
              />
            );
          }}
        />
        <Table.Column key="name" dataIndex="name" title="Name" />
        <Table.Column
          key="description"
          dataIndex="description"
          title="Description"
        />
        <Table.Column
          key="price"
          dataIndex="price"
          title="Price"
          render={(price: number) => {
            return (
              <NumberField
                value={price}
                style={{
                  width: "80px",
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
                options={{
                  style: "currency",
                  currency: "USD",
                }}
              />
            );
          }}
        />
        <Table.Column
          key="category"
          dataIndex={["category", "title"]}
          title="Category"
          render={(_, record) => {
            const category = categories.find(
              (category) => category?.id === record.category?.id
            );

            return <span>{category?.title || "-"}</span>;
          }}
        />
        <Table.Column
          key="isActive"
          dataIndex="isActive"
          title="Status"
          render={(isActive: boolean) => {
            return (
              <Tag
                color={isActive ? "green" : "default"}
                icon={isActive ? <CheckCircleOutlined /> : <StopOutlined />}
              >
                <Typography.Text
                  style={{
                    color: "#3C8618",
                  }}
                >
                  {isActive ? "Available" : "Unavailable"}
                </Typography.Text>
              </Tag>
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
                onClick={() => {
                  return go({
                    to: `${showUrl("products", record.id)}`,
                  });
                }}
              />
            );
          }}
        />
      </Table>
      {children}
    </List>
  );
};
