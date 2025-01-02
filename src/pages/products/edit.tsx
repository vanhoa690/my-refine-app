import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
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
  getValueFromEvent,
  SaveButton,
  useDrawerForm,
  useSelect,
} from "@refinedev/antd";
import { BaseKey, useApiUrl, useGetToPath, useGo } from "@refinedev/core";

export const ProductEdit = () => {
  const go = useGo();
  const getToPath = useGetToPath();
  const { selectProps: categorySelectProps } = useSelect<Category>({
    resource: "categories",
  });
  const apiUrl = useApiUrl();

  const { drawerProps, formProps, saveButtonProps, formLoading } =
    useDrawerForm<Product>({
      resource: "products",
      action: "edit",
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
    go({
      to: getToPath({
        action: "list",
      }),
    });
  };

  const images = Form.useWatch("images", formProps.form);
  const image = images?.[0] || null;
  const previewImageURL = image?.url || image?.response?.url;
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
              label="Images"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload.Dragger
                name="file"
                action={`${apiUrl}/media/upload`}
                maxCount={1}
                accept=".png,.jpg,.jpeg"
                showUploadList={false}
              >
                <Flex vertical align="center" justify="center">
                  <Avatar
                    shape="square"
                    src={previewImageURL || "/images/product-default-img.png"}
                    alt="Product Image"
                    style={{
                      aspectRatio: 1,
                      objectFit: "contain",
                      width: "48px",
                      height: "48px",
                    }}
                  />
                </Flex>

                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload.Dragger>
            </Form.Item>
          </Flex>
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
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={6} />
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
              <InputNumber prefix={"$"} style={{ width: "150px" }} />
            </Form.Item>
          </Flex>
          <Flex vertical>
            <Form.Item
              label="Category"
              name={["category", "id"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...categorySelectProps} />
            </Form.Item>
          </Flex>
          <Flex vertical>
            <Form.Item label="Status" name="isActive" initialValue={true}>
              <Segmented
                block
                size="large"
                options={[
                  {
                    label: "Available",
                    value: true,
                  },
                  {
                    label: "Unavailable",
                    value: false,
                  },
                ]}
              />
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
