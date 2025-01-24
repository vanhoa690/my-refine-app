import { EditOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Flex, Typography } from "antd";
import { Product } from "types/Product";
import { DeleteButton } from "@refinedev/antd";
import {
  HttpError,
  useGetToPath,
  useGo,
  useNavigation,
  useShow,
} from "@refinedev/core";

export const ProductShow = () => {
  const go = useGo();
  const getToPath = useGetToPath();
  const { editUrl } = useNavigation();

  const { query: queryResult } = useShow<Product, HttpError>({
    resource: "products",
  });
  const product = queryResult.data?.data;

  const onDrawerCLose = () => {
    go({
      to: getToPath({
        action: "list",
      }),
    });
  };

  return (
    <Drawer zIndex={1001} open={true} onClose={onDrawerCLose}>
      <Flex
        vertical
        style={{
          padding: "16px",
        }}
      >
        <Typography.Title level={5}>ID: {product?._id}</Typography.Title>
        <Typography.Title level={5}>Name: {product?.name}</Typography.Title>
        <Typography.Title level={5}>Price: {product?.price}</Typography.Title>
      </Flex>
      <Divider
        style={{
          margin: 0,
          padding: 0,
        }}
      />
      <Flex
        align="center"
        justify="space-between"
        style={{
          padding: "16px 16px 16px 0",
        }}
      >
        <DeleteButton
          resource="products"
          onSuccess={onDrawerCLose}
          type="text"
        />
        <Button
          onClick={() => {
            return go({
              to: `${editUrl("products", product?._id || "")}`,
            });
          }}
          icon={<EditOutlined />}
        >
          Edit
        </Button>
      </Flex>
    </Drawer>
  );
};
