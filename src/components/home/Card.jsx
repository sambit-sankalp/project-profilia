import React from 'react';
import { Card, Avatar } from 'antd';
import {
  DislikeOutlined,
  LikeOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const CardComponent = () => {
  return (
    <Card
      style={{ width: 300, margin: '20px 10px', backgroundColor: '#e6f7ff' }}
      actions={[
        <LikeOutlined style={{ color: '#0044ff' }} key="like" />,
        <HeartOutlined style={{ color: '#ff0000' }} key="heart" />,
        <DislikeOutlined style={{ color: '#000000' }} key="dislike" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://randomuser.me/api/portraits/men/58.jpg" />}
        title="Juan Velasco"
        description="Hi there I am using this app"
      />
    </Card>
  );
};

export default CardComponent;
