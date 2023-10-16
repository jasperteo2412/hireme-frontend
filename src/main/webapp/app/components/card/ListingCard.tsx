import { Avatar, Button, Card, Descriptions, Divider, Rate, Space, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';

const ListingCard = () => {
  return (
    <div>
      <Card style={{ marginBottom: '20px' }}>
        <Rate disabled defaultValue={4} />

        <div style={{ float: 'right' }}>
          Starting From:
          <p style={{fontSize: '25px'}}>
            <b>$20/hr</b>
          </p>
        </div>

        <Meta 
        style ={{paddingTop: '20px' }}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title="Person A"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dictum fringilla erat sed dictum. Etiam efficitur massa tortor, vel laoreet ante luctus nec. Cras convallis auctor lectus, a placerat mi commodo ac. Sed non vestibulum augue, ultrices consequat mi. In luctus ut mi egestas pretium. Vivamus aliquam velit ut dignissim vulputate. Nulla nisi eros, sollicitudin ac est id, pellentesque malesuada dui. Nulla eu euismod purus."
        />
        <Space style={{ paddingTop: '20px' }}>
          <Tag color="blue">blue</Tag>
          <Tag color="green">Green</Tag>
        </Space>
        <Divider></Divider>

        <Button type="primary" style={{ float: 'right', marginLeft: '20px' }}>
          View Profile
        </Button>
        <Button style={{ float: 'right' }}>Let's Chat</Button>
      </Card>
    </div>
  );
};

export default ListingCard;
