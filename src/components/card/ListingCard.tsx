import { Avatar, Button, Card, Descriptions, Divider, Rate, Space, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Assignment {
  assignmentId: number;
  assignmentType: string;
  subjectLevel: string;
  subject: string;
  title: string;
  description: string;
  location: string;
  createdByUserId: string;
  byUser: string;
  tuitionDuration: string;
  tuitionFrequencies: string[];
  price: number;
  status: string;
  createdDateTime: string;
  updatedDateTime: string;
}

interface ListingCardProps {
  assignment: Assignment;
}

const ListingCard: React.FC<ListingCardProps> = ({ assignment }) => {
  const {
    title,
    assignmentId,
    byUser,
    description,
    price,
    tuitionFrequencies,
    // Add other properties as needed
  } = assignment;

  const navigate = useNavigate();
  

  const handleChatButtonClick = () => {
    // Use navigate to go to the chat page
    sessionStorage.setItem('chatId', 'zhenghui')
    navigate('/chat')
  };
  
  const handleProfileButtonClick = (assignmentId : any) =>{
    // navigate('/profile')
    localStorage.setItem('assignmentID', '2')
    navigate(`/profile/`);
  }

  return (
    <div>
      <Card style={{ marginBottom: '20px' }}>
        <Rate disabled defaultValue={4} />

        <div style={{ float: 'right' }}>
          Starting From:
          <p style={{ fontSize: '25px' }}>
            <b>${price}/hr</b>
          </p>
        </div>

        <Card.Meta
          style={{ paddingTop: '20px' }}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={byUser}
          description={description}
        />
        <Space style={{ paddingTop: '20px' }}>
          {tuitionFrequencies.map((frequency, index) => (
            <Tag color="green" key={index}>
              {frequency}
            </Tag>
          ))}
        </Space>
        <Divider />
        <Button type="primary"  onClick={() => handleProfileButtonClick(assignmentId)} style={{ float: 'right', marginLeft: '20px' }}>
          View Profile
        </Button>
        <Button onClick={handleChatButtonClick} style={{ float: 'right' }}>
          Let's Chat
        </Button>
      </Card>
    </div>
  );
};

export default ListingCard;
