import React from "react";
import { List } from "antd";
import VirtualList from "rc-virtual-list";

const windowHeight = window.innerHeight;

const OrderList = ({ orders, client }) => {
  return (
    <List>
      <VirtualList data={orders} itemHeight={69} height={windowHeight} itemKey="id">
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
  );
};

export default OrderList;
