import { Breadcrumb, Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import AppHeader from "../AppHeader";
import AppFooter from "../Footer";
import Home from "../../modules/Home";
import "./styles.scss";
import Org from "../../modules/Org";
const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <AppHeader />
      <Content
        style={{
          padding: "0 1rem",
        }}
      >
        <Breadcrumb
          style={{
            margin: "0.75rem 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ minHeight: "72vh" }}>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/org">
              <Org />
            </Route>
            <Route path="/employee">
              <h2>Nhan vien</h2>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
