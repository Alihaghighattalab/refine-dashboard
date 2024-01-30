import {
  Authenticated,
  ErrorComponent,
  GitHubBanner,
  Refine,
  WelcomePage,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { DashboardPage } from "./components/dashboard";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";
import { resources } from "./config/resources";
import { dataProvider, liveProvider } from "./providers";
import { Layout } from "./components/layout";
import {
  CompanyCreatePage,
  CompanyEditPage,
  CompanyListPage,
} from "@/components";
import {
  TasksCreatePage,
  TasksEditPage,
  TasksListPage,
} from "./components/tasks";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "zvb1wF-seEJ5T-HJ4SpE",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-layout"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<DashboardPage />} />

                    <Route
                      path="/tasks"
                      element={
                        <TasksListPage>
                          <Outlet />
                        </TasksListPage>
                      }
                    >
                      <Route path="new" element={<TasksCreatePage />} />
                      <Route path="edit/:id" element={<TasksEditPage />} />
                    </Route>

                    <Route path="/companies">
                      <Route index element={<CompanyListPage />} />
                      <Route path="new" element={<CompanyCreatePage />} />
                      <Route path="edit/:id" element={<CompanyEditPage />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>

                  <Route
                    element={
                      <Authenticated
                        key="authenticated-auth"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource resource="dashboard" />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
