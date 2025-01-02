import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Drawer, Flex, List, Typography } from "antd";
import { Category, Product } from "../../types";
import { DeleteButton } from "@refinedev/antd";
import {
  BaseKey,
  HttpError,
  useGetToPath,
  useGo,
  useNavigation,
  useOne,
  useShow,
} from "@refinedev/core";

type Props = {
  id?: BaseKey;
  onClose?: () => void;
  onEdit?: () => void;
};

export const ProductShow = (props: Props) => {
  const go = useGo();
  const getToPath = useGetToPath();
  const { editUrl } = useNavigation();

  const { query: queryResult } = useShow<Product, HttpError>({
    resource: "products",
    id: props?.id, // when undefined, id will be read from the URL.
  });
  const product = queryResult.data?.data;

  const { data: categoryData } = useOne<Category, HttpError>({
    resource: "categories",
    id: product?.category?.id,
    queryOptions: {
      enabled: !!product?.category?.id,
    },
  });
  const category = categoryData?.data;

  const onDrawerCLose = () => {
    go({
      to: getToPath({
        action: "list",
      }),
    });
  };

  return (
    <Drawer zIndex={1001} open={true} onClose={onDrawerCLose}>
      <Flex vertical align="center" justify="center">
        <Avatar
          shape="square"
          style={{
            aspectRatio: 1,
            objectFit: "contain",
            width: "240px",
            height: "240px",
            margin: "16px auto",
            borderRadius: "8px",
          }}
          src={product?.images?.[0].url}
          alt={product?.images?.[0].name}
        />
      </Flex>

      <Flex
        vertical
        style={{
          padding: "16px",
        }}
      >
        <Typography.Title level={5}>{product?.name}</Typography.Title>
        <Typography.Text type="secondary">
          {product?.description}
        </Typography.Text>
        <List
          dataSource={[
            {
              label: (
                <Typography.Text type="secondary">Category</Typography.Text>
              ),
              value: <Typography.Text>{category?.title}</Typography.Text>,
            },
            {
              label: <Typography.Text type="secondary">Status</Typography.Text>,
              value: (
                <span>{product?.isActive ? "Available" : "Unavailable"}</span>
              ),
            },
          ]}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  style={{
                    padding: "0 16px",
                  }}
                  avatar={item.label}
                  title={item.value}
                />
              </List.Item>
            );
          }}
        />
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
              to: `${editUrl("products", product?.id || "")}`,
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
