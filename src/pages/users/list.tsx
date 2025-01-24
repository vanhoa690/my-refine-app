import { DateField, ExportButton, List, useTable } from "@refinedev/antd";
import { Button, Table } from "antd";
import { PropsWithChildren } from "react";
import { User } from "types/User";
import { EyeOutlined } from "@ant-design/icons";
import { useGo, useNavigation } from "@refinedev/core";

export const UserList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { showUrl } = useNavigation();

  const { tableProps } = useTable<User>({
    hasPagination: false,
    resource: "users",
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
        <Table.Column key="email" dataIndex="email" title="Email" />
        <Table.Column
          key="createdAt"
          dataIndex="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
        />
        <Table.Column
          key="actions"
          title="Actions"
          render={(_, record: User) => {
            return (
              <Button
                icon={<EyeOutlined />}
                onClick={() =>
                  go({
                    to: `${showUrl("users", record._id)}`,
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
