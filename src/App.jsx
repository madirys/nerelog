import React from "react";

import { Layout } from "antd";
import "./styles.css";

const Map = React.lazy(() =>
  import(/* webpackChunkName: "Map" */ "./components/Map")
);
const OrderList = React.lazy(() =>
  import(/* webpackChunkName: "OrderList" */ "./components/OrderList")
);

import orders from "./data/NeRelog_apps.json";
import clients from "./data/NeRelog_clients.json";

const { Sider, Content } = Layout;

const App = () => {
  const client = (id) => clients.find((el) => el.id === id);

  return (
    <Layout>
      <Sider width={280} theme="light">
        <OrderList orders={orders} client={client} />
      </Sider>
      <Content>
        <Map orders={orders} client={client} />
      </Content>
    </Layout>
  );
};

export default App;
