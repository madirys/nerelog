import React from "react";
import "antd/dist/antd.css";
import { Layout, List } from "antd";

import orders from './data/NeRelog_apps.json'
import clients from './data/NeRelog_clients.json'

const { Sider, Content } = Layout

const App = () => {
  function getClient(id) {
    return clients.find(el => el.id === id)
  }
  return (
    <Layout>
      <Sider width={250} theme="light">
        <List
          size="small"
          dataSource={orders}
          renderItem={item => <List.Item key={item.id}>
            <List.Item.Meta
              title={getClient(item.client_id).name}
              description={item.type}
            />
            <div>{item.price}₸</div>
          </List.Item>}
        />
      </Sider>
      <Content>
        <p>Content</p>
      </Content>
    </Layout>
  );
};

export default App;
