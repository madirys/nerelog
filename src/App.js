import React from "react";
import "antd/dist/antd.css";
import { Layout, List } from "antd";
import "./styles.css";
import Map from "./components/Map";
import VirtualList from 'rc-virtual-list';

import orders from "./data/NeRelog_apps.json";
import clients from "./data/NeRelog_clients.json";

const { Sider, Content } = Layout;
const windowHeight = window.innerHeight;

const App = () => {
  const client = (id) => clients.find((el) => el.id === id);

  return (
    <Layout>
      <Sider width={280} theme="light">
        <List>
          <VirtualList
            data={orders}
            height={windowHeight}
            itemKey="id"
          >
            {(item) => (
              <List.Item key={item.id} className="list--item">
              <List.Item.Meta
                title={`${client(item.client_id).name}`}
                description={item.type}
              />
              <div>{item.price} ₸</div>
            </List.Item>
            )}
          </VirtualList>
        </List>
      </Sider>
      <Content>
        <Map orders={orders} getClient={client} />
      </Content>
    </Layout>
  );
};

export default App;
