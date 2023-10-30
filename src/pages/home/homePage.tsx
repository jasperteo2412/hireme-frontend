import React, { useEffect, useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps, RadioChangeEvent } from 'antd';
import { Breadcrumb, Button, Checkbox, DatePicker, Form, Input, Layout, Menu, Modal, Radio, Select, Space, theme } from 'antd';
import CustomCard from '../../components/card/CustomCard';
import ListingCard from '../../components/card/ListingCard';
import axios from 'axios';
import { apis } from '../../apis/apiConfig';


const APIConfig = apis();

const { Header, Content, Footer, Sider } = Layout;


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

const homePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [jsonData, setJsonData] = useState<Assignment[]>([]); // State to store JSON data
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Create a form instance
  const [value, setValue] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();

  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const fetchData = async () => {
    console.log("URL : ", APIConfig?.API.assignmentUrl)
    await axios
      .post(APIConfig!.API.assignmentUrl + '/get-all', null, {
        headers: {"USER-ID" : "zhenghui"}
        // headers :  sessionStorage.getItem("USER-ID") 
      })
      .then(response => {
        const fetchedData: Assignment[] = response.data;
        console.log("DATA :",fetchData)
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

  const handleCreate = () => {
    form
      .validateFields()
      .then((values: Assignment) => {
        console.log('Form Values:', values); // Log the form values
        const jsonData = JSON.stringify(values);
          // Send a POST request with Axios
      axios
      .post(APIConfig!.API.assignmentUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle the response as needed
        console.log('Assignment created:', response.data);
        form.resetFields();
      })
      .catch((error) => {
        // Handle errors
        console.error('Error creating assignment:', error);
      });
        // onCreate(values);
        form.resetFields();
      });
  };

  useEffect(() => {
    // setJsonData(dummyData); // Set the JSON data in the state
    fetchData();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="demo-logo-vertical" />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} >
        <Button
          type="primary"
          style={{ float: "right", margin: "20px"}}
          onClick={showModal}
        >
          Post Assignment
        </Button>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {jsonData.map(assignment => (
              <ListingCard key={assignment.assignmentId} assignment={assignment} />
            ))}
          </div>
          <Modal
        title="Add Review"
        open={isModalVisible}
        onOk={handleCreate}
        onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="assignmentType" label="Assignment Type">
          <Select
            defaultValue="PROVIDING_TUITION"
            options={[
              { value: 'PROVIDING_TUITION', label: 'Providing Tuition' },
              { value: 'LOOKING_FOR_TUITION', label: 'Looking for Tuition' },
            ]}>

          </Select>
        </Form.Item>
        <Form.Item name="subjectLevel" label="Subject Level">
          <Input />
        </Form.Item>
        <Form.Item name="subject" label="Subject">
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input />
        </Form.Item>
        <Form.Item name="tuitionDuration" label="Tuition Duration">
          <Input />
        </Form.Item>
        <Form.Item name="tuitionFrequencies" label="Tuition Frequencies">
        <Checkbox.Group>
            <Checkbox value="MONDAY">Monday</Checkbox>
            <Checkbox value="TUESDAY">Tuesday</Checkbox>
            <Checkbox value="WEDNESDAY">Wednesday</Checkbox>
            <Checkbox value="THURSDAY">Thursday</Checkbox>
            <Checkbox value="FRIDAY">Friday</Checkbox>
            <Checkbox value="SATURDAY">Saturday</Checkbox>
            <Checkbox value="SUNDAY">Sunday</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        
        <Form.Item name="price" label="Price">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="createdDateTime" label="Created Date and Time">
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </Modal>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>

    
  );
};

export default homePage;
