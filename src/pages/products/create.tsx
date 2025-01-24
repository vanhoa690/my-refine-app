import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  Spin,
  Typography,
} from "antd";
import { Product } from "types/Product";
import { SaveButton, useDrawerForm } from "@refinedev/antd";
import { useGetToPath, useGo } from "@refinedev/core";

export const ProductCreate = () => {
  const go = useGo();
  const getToPath = useGetToPath();

  const { drawerProps, formProps, close, saveButtonProps, formLoading } =
    useDrawerForm<Product>({
      resource: "products",
      action: "create",
      redirect: false,
      onMutationSuccess: () => {
        go({
          to: getToPath({
            action: "list",
          }),
        });
      },
    });
  const onDrawerCLose = () => {
    close();
    go({
      to: getToPath({
        action: "list",
      }),
    });
  };

  return (
    <Drawer
      {...drawerProps}
      zIndex={1001}
      open={true}
      onClose={onDrawerCLose}
      styles={{
        header: {
          display: "none",
        },
      }}
    >
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography.Title level={5}>Add new product</Typography.Title>
        <Button
          onClick={onDrawerCLose}
          type="text"
          icon={<CloseOutlined />}
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "16px",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        />
      </div>
      <Spin spinning={formLoading}>
        <Form {...formProps} layout="vertical">
          <Flex vertical>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Flex>

          <Flex vertical>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber prefix={"VND"} style={{ width: "150px" }} />
            </Form.Item>
          </Flex>
          <Flex align="center" justify="space-between">
            <Button onClick={onDrawerCLose}>Cancel</Button>
            <SaveButton
              {...saveButtonProps}
              htmlType="submit"
              type="primary"
              icon={null}
            >
              Save
            </SaveButton>
          </Flex>
        </Form>
      </Spin>
    </Drawer>
  );
};
