import React, { useEffect, useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CustomCard from '../../components/card/CustomCard';
import ListingCard from '../../components/card/ListingCard';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

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

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const homePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [jsonData, setJsonData] = useState<Assignment[]>([]); // State to store JSON data

  const fetchData = async () => {
    await axios
      .get('API_ENDPOINT')
      .then(response => {
        const fetchedData: Assignment[] = response.data;
        setJsonData(fetchedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Replace this with your actual JSON data
  const dummyData: Assignment[] = [
    // ... your JSON data here
    {
      assignmentId: 1,
      assignmentType: 'LOOKING_FOR_TUITION',
      subjectLevel: 'PRIMARY',
      subject: 'PRIMARY_MATHEMATICS',
      title: 'Math Tuition and HOMEWORK',
      description: 'Primary 1 Math Tuition, 2 time a week',
      location: 'Bukit Merah',
      createdByUserId: '5545',
      byUser: 'ANTHONY',
      tuitionDuration: '45min',
      tuitionFrequencies: ['SUNDAY', 'FRIDAY'],
      price: 45.0,
      status: 'OPEN',
      createdDateTime: '2023-10-15 15:03:59',
      updatedDateTime: '2023-10-15 15:03:59',
    },
    {
      assignmentId: 2,
      assignmentType: 'LOOKING_FOR_TUITION',
      subjectLevel: 'PRIMARY',
      subject: 'PRIMARY_MATHEMATICS',
      title: 'Math test',
      description: 'Primary 1 Math Tuition, 2 time a week',
      location: 'Bukit Merah',
      createdByUserId: '5545',
      byUser: 'ANTHONY',
      tuitionDuration: '45min',
      tuitionFrequencies: ['SUNDAY', 'FRIDAY'],
      price: 90.0,
      status: 'OPEN',
      createdDateTime: '2023-10-15 15:04:42',
      updatedDateTime: '2023-10-15 15:04:42',
    },
    {
      assignmentId: 3,
      assignmentType: 'LOOKING_FOR_TUITION',
      subjectLevel: 'PRIMARY',
      subject: 'PRIMARY_MATHEMATICS',
      title: 'Math Tuition and HOMEWORK',
      description: 'Primary 1 Math Tuition, 7 time a week',
      location: 'Bukit BATOK',
      createdByUserId: '5545',
      byUser: 'ANTHONY',
      tuitionDuration: '100min',
      tuitionFrequencies: ['MONDAY', 'SATURDAY'],
      price: 90.0,
      status: 'OPEN',
      createdDateTime: '2023-10-13 11:32:58',
      updatedDateTime: '2023-10-15 16:40:08',
    },
    {
      assignmentId: 4,
      assignmentType: 'LOOKING_FOR_TUITION',
      subjectLevel: 'PRIMARY',
      subject: 'PRIMARY_MATHEMATICS',
      title: 'English',
      description: 'Primary 1 Math Tuition, 2 time a week',
      location: 'Bukit Merah',
      createdByUserId: '5545',
      byUser: 'tommy',
      tuitionDuration: '45min',
      tuitionFrequencies: ['SUNDAY', 'MONDAY'],
      price: 80.0,
      status: 'OPEN',
      createdDateTime: '2023-10-16 10:29:11',
      updatedDateTime: '2023-10-16 10:29:11',
    },
    {
      assignmentId: 5,
      assignmentType: 'LOOKING_FOR_TUITION',
      subjectLevel: 'PRIMARY',
      subject: 'PRIMARY_MATHEMATICS',
      title: 'Math Tuition and HOMEWORK',
      description: 'Primary 1 Math Tuition, 2 time a week',
      location: 'Bukit Merah',
      createdByUserId: '5545',
      byUser: 'ANTHONY',
      tuitionDuration: '45min',
      tuitionFrequencies: ['SUNDAY', 'FRIDAY'],
      price: 90.0,
      status: 'OPEN',
      createdDateTime: '2023-10-16 11:10:50',
      updatedDateTime: '2023-10-16 11:10:50',
    },
  ];

  useEffect(() => {
    setJsonData(dummyData); // Set the JSON data in the state
    fetchData();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {jsonData.map(assignment => (
              <ListingCard key={assignment.assignmentId} assignment={assignment} />
            ))}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default homePage;
