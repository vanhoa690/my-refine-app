import { Authenticated, Refine } from "@refinedev/core";

import { ThemedLayoutV2, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import jsonServerDataProvider from "@refinedev/simple-rest";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  ProductCreate,
  ProductList,
  ProductEdit,
  ProductShow,
} from "@/pages/products";
import { RefineKbarProvider, RefineKbar } from "@refinedev/kbar";
import { AuthPage } from "./pages/auth";
import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";
import { UserList, UserShow } from "@/pages/users";

function App() {
  // const API_URL = "https://api.finefoods.refine.dev";
  const API_URL = "http://localhost:3000";
  const dataProvider = jsonServerDataProvider(API_URL);
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider}
          routerProvider={routerProvider}
          authProvider={authProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "dashboard",
              list: "/",
              meta: {
                label: "Dashboard",
                icon: <DashboardOutlined />,
              },
            },
            {
              name: "users",
              list: "/users",
              show: "/users/:id",
              meta: {
                icon: <UserOutlined />,
              },
            },
            {
              name: "products",
              list: "/products",
              create: "/products/new",
              edit: "/products/:id/edit",
              show: "/products/:id",
              meta: {
                icon: <UnorderedListOutlined />,
              },
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="dashboard" />
                </Authenticated>
              }
            >
              <Route
                path="/register"
                element={
                  <AuthPage
                    type="register"
                    formProps={{
                      initialValues: {
                        email: "demo@refine.dev",
                        password: "demodemo",
                      },
                    }}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      initialValues: {
                        email: "demo@refine.dev",
                        password: "demodemo",
                      },
                    }}
                  />
                }
              />
            </Route>
            <Route
              element={
                // <Authenticated
                //   key="authenticated-routes"
                //   fallback={<CatchAllNavigate to="/login" />}
                // >
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
                // </Authenticated>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route
                path="/users"
                element={
                  <UserList>
                    <Outlet />
                  </UserList>
                }
              >
                <Route path=":id" element={<UserShow />} />
              </Route>
              <Route
                path="/products"
                element={
                  <ProductList>
                    <Outlet />
                  </ProductList>
                }
              >
                <Route path="new" element={<ProductCreate />} />

                <Route path=":id" element={<ProductShow />} />
                <Route path=":id/edit" element={<ProductEdit />} />
              </Route>
            </Route>
          </Routes>
          <RefineKbar />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
