import { CloseOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  Segmented,
  Select,
  Spin,
  Typography,
  Upload,
} from "antd";
import { Category, Product } from "../../types";
import {
  DeleteButton,
  getValueFromEvent,
  SaveButton,
  useDrawerForm,
  useSelect,
} from "@refinedev/antd";
import {
  BaseKey,
  HttpError,
  useApiUrl,
  useGetToPath,
  useGo,
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
  const { query: queryResult } = useShow<Product, HttpError>({
    resource: "products",
    id: props?.id, // when undefined, id will be read from the URL.
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
        <DeleteButton resource="products" type="text" />
        <Button icon={<EditOutlined />}>Edit</Button>
      </Flex>
    </Drawer>
  );
};
