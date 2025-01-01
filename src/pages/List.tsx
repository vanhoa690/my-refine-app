import { List } from "@refinedev/antd";
import { Table } from "antd/lib";

export const PostList: React.FC = () => {
  // const { tableProps } = useTable();

  return (
    <List>
      <h1>Post List</h1>
      <Table rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="body" title="Body" />
      </Table>
    </List>
  );
};
