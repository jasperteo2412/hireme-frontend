import {
  Avatar,
  Button,
  Card,
  Divider,
  Input,
  List,
  Modal,
  Rate,
  Space,
  Tag,
  Form,
} from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ListingCard from "../../components/card/ListingCard";
import { useNavigate, useParams } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { apis } from "../../apis/apiConfig";
import RecommendationList from "../../components/card/RecommendationList";
import { loadStripe } from "@stripe/stripe-js";

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
  expirationDate : string;
}

interface ListingCardProps {
  assignment: Assignment;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const APIConfig = apis();

const dummyData : Assignment[]= [
  {
    "assignmentId": 2,
    "assignmentType": "PROVIDING_TUITION",
    "subjectLevel": "PRIMARY",
    "subject": "PRIMARY_SCIENCE",
    "title": "English",
    "description": "Primary 1 Math Tuition, 2 time a week",
    "location": "Bukit Sembawang",
    "createdByUserId": "5545",
    "byUser": "KKKKKKKKK",
    "tuitionDuration": "45min",
    "tuitionFrequencies": [
        "MONDAY",
        "SUNDAY"
    ],
    "price": 90.00,
    "status": "OPEN",
    "createdDateTime": "2023-10-16 13:30:27",
    "updatedDateTime": "2023-10-16 13:30:27",
    "expirationDate": "2024-01-14 13:30:27"
}
]

const profile: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState({});

  const handleRatingChange = (value: number) => {
    setRating(value);
  };
  const [jsonData, setJsonData] = useState<Assignment[]>([]); // State to store JSON data
  const [reviewData , setReviewData] = useState()

  const stripePromise = loadStripe('pk_test_51NwEzzEjdrK5a8M75E48GFdH7AZQ4LftPzaLr1yoB22N6gsXtKeLPOS0KyEkBWrTqs5VENFM0PhvVVd6pqat7Hqw000XTDRHlE')

  const [form] = Form.useForm(); // Create a form instance

  const storedData = localStorage.getItem('assignmentID');
  if (storedData !== null) {
    const parsedData  = JSON.parse(storedData);
    // Now, 'parsedData' contains the data from localStorage
  }


  useEffect(() => {
    setJsonData(dummyData);
    getAssignmentsById
    console.log("assignmentID: ", localStorage.getItem('assignmentID'))
  })

  const handleReviewTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReviewText(event.target.value);
  };

  const handleSubmitReview = () => {
    // Here, you can submit the review to your backend or perform any other necessary actions.
    // You can send the `rating` and `reviewText` to your server using an API request.

    // Optionally, you can clear the input fields or provide feedback to the user.
    setRating(0);
    setReviewText("");
  };

  const navigate = useNavigate();

  // Function to generate random ratings between 0 and 5
  function generateRandomRating() {
    return Number((Math.random() * 5).toFixed(2));
  }

  const reviews = [
    {
      reviewId: 2,
      review: "oaskok la",
      name: "veli good teacher",
    },
    {
      reviewId: 3,
      review: "okok la",
      name: "worst teacher",
    },
    {
      reviewId: 4,
      review: "test review",
      name: "tutor tan",
    },
  ];

  const handleChatButtonClick = () => {
    // Use navigate to go to the chat page
    navigate("/chat");
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();

  };
  const getPayment = async () => {
    console.log("payment here")
    const stripe = await stripePromise;
    const requestBody ={
      "productName" : "product",
      "currency" : "sgd",
      "successUrl" : "http://localhost:9000/success",
      "cancelUrl" : "http://localhost:9000/cancel",
      "amt" : "1000",
      "assignmentId" : '2',
      
    }
    await axios
      // .post('http://localhost:8081/assignments/' + storedData)  
      .post(APIConfig!.API.paymentsUrl + '/payment', requestBody, {   headers: {"USER-ID" : "zhenghui"}}) 
      .then((response : any) => {
        console.log(response);
        console.log(response.data.id);
        stripe?.redirectToCheckout({sessionId: response.data.id})
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const getRecommendation = async () => {
    await axios
      // .post('http://localhost:8081/assignments/' + storedData)  
      .post(APIConfig!.API.recommendationsUrl + storedData) 
      .then(response => {
        const fetchedData: Assignment[] = response.data;
        setJsonData(fetchedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const getAssignmentsById = async () => {
    console.log("ID: ",storedData)
    await axios
      // .post('http://localhost:8081/assignments/' + storedData)  
      .post(APIConfig!.API.assignmentUrl + storedData) 
      .then(response => {
        const fetchedData: Assignment[] = response.data;
        setJsonData(fetchedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const onFinish = () => {
    form
    .validateFields()
    .then((values: any) => {
      console.log('Form Values:', values); // Log the form values
      const jsonData = JSON.stringify(values);
        // Send a POST request with Axios
    axios
    .post(APIConfig!.API.userReviewUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // Handle the response as needed
      console.log('Review created:', response.data);
      form.resetFields();
    })
    .catch((error) => {
      // Handle errors
      console.error('Error creating review:', error);
    });
      // onCreate(values);
      form.resetFields();
    });
    
  };

  return (
    <div>
      <Card style={{ marginBottom: "20px" }}>
        <Rate disabled defaultValue={4} />
        <div style={{ float: "right" }}>
          Starting From:
          <p style={{ fontSize: "25px" }}>
            <b>$20/hr</b>
          </p>
        </div>
 
        <h1>Assignment Details</h1>
        {jsonData.map(assignment => (
          <div>
                  <Card.Meta
          style={{ paddingTop: '20px' }}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={assignment.byUser}
          description={assignment.description}
        />
        <Space style={{ paddingTop: '20px' }}>
          {assignment.tuitionFrequencies.map((frequency, index) => (
            <Tag color="green" key={index}>
              {frequency}
            </Tag>
          ))}
        </Space>
          </div>
       
            ))}

       

        <Divider />
        <Button  onClick={getPayment} type="primary" style={{ float: "right", marginLeft: "20px" }}>
          Book Tutor
        </Button>
        <Button onClick={handleChatButtonClick} style={{ float: "right" }}>
          Let's Chat
        </Button>
      </Card>

      <Card style={{ width: "100%" }}>
        <Button
          type="primary"
          style={{ float: "right", marginLeft: "20px" }}
          onClick={showModal}
        >
          Add Review
        </Button>
        <div>
          <h2>Reviews</h2>
          <List
            // grid={{ gutter: 16, xs: 1, sm: 24, md: 24, lg: 12 }}
            dataSource={reviews}
            renderItem={(review) => (
              <List.Item>
                <Card hoverable style={{ width: "100%" }}>
                  <Rate allowHalf defaultValue={generateRandomRating()} disabled />
                  <Meta
                    avatar={
                      <Avatar
                        size={64}
                        icon={<UserOutlined />}
                        // src={`https://avatars.dicebear.com/v2/avataaars/${review.name}.svg`}
                        src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                      />
                    }
                    title={review.name}
                    description={review.review}
                  />
                </Card>
              </List.Item>
            )}
          />
          <div>
          </div>
        </div>
      </Card>

      <Modal
        title="Add Review"
        open={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
      >
        <Form {...layout} name="reviewForm" form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
          name="rating"
          label="Rating">
            <Rate value={rating} onChange={handleRatingChange} />
          </Form.Item>
          <Form.Item
            name="review"
            label="Review"
            rules={[{ required: true, message: "Please enter your review" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      
    </div>
  );
};

export default profile;
