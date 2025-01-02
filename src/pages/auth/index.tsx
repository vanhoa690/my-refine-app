import { AuthPage as AntdAuthPage, AuthProps } from "@refinedev/antd";

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  return <AntdAuthPage type={type} formProps={formProps} />;
};
