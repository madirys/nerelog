import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";

const { Sider, Content } = Layout

const App = () => {
  return (
    <Layout>
      <Sider width={200}>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </Sider>
      <Content>
        <p>Content</p>
      </Content>
    </Layout>
  );
};

export default App;
