import { Refine } from "@refinedev/core";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import {
  BrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import { PostList } from "./pages/List";
import routerProvider from "@refinedev/react-router";
import jsonServerDataProvider from "@refinedev/simple-rest";
import { DashboardOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ProductCreate, ProductList } from "./pages/products";
import { RefineKbarProvider, RefineKbar } from "@refinedev/kbar";

function App() {
  const API_URL = "https://api.finefoods.refine.dev";
  const dataProvider = jsonServerDataProvider(API_URL);
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider}
          routerProvider={routerProvider}
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
            <Route index element={<PostList />} />
            <Route
              path="/products"
              element={
                <ProductList>
                  <Outlet />
                </ProductList>
              }
            >
              <Route path="new" element={<ProductCreate />} />
              {/* 
          <Route path=":id" element={<ProductShow />} />
          <Route path=":id/edit" element={<ProductEdit />} /> */}
            </Route>
          </Routes>
          <RefineKbar />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
