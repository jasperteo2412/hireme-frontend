/* eslint-disable no-console */
// import ChatInterface from 'app/components/chat/ChatInterface';
import '../../chat.css'
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Input, Button, List, message, Alert, Divider, Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { postMessages, getMessages, updateMessageIndicator } from '../../apis/CommunicationAPIs';
import { transformChatHistory } from '../../components/chat/utils/ChatDataFunctions';
import ChatUserSearch from '../../components/chat/ChatUserSearch';

const ChatPage = () => {
  const [currentUser] = useState(sessionStorage.getItem("USER-ID"));
  const [chatMessage, setChatMessage] = useState('');
  // const [chatHistory, setChatHistory] = useState<{ [key: string]: string[] }>({});
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState(false);
  const [rawData, setRawData] = useState<any>([]);
  const [chats, setChats] = useState<any>([]);
  const [updateChats, setUpdateChats] = useState<any>([]);

  const [unreadCount, setUnreadCount] = useState([]);
  const [people, setPeople] = useState<any>([]);
  const [refreshChat, setRefreshChat] = useState(false);

  const handleSendMessage = () => {
    if(chatMessage.length > 0){
      const requestBody = {
        messageBody: chatMessage,
        sentFrom: currentUser,
        sentTo: selectedPerson,
      };
  
      postMessages(requestBody).then((data: any) => {
        if (data.status === 200) {
          messageApi.info({ content: 'Message successfully sent!' });
          setChatMessage('');
          setRefreshChat(true);
        } else {
          messageApi.error({ content: 'An error has occurred, unable to send message' });
        }
      });
    }
    else{
      messageApi.error({ content: 'Message is empty!' });
    }
  };

  const renderMessages = () => {
    if (selectedPerson) {
      const tempChats = chats.sort(function (a: any, b: any) {
        const aDate = new Date(a.sentDateTime).getTime();
        const bDate = new Date(b.sentDateTime).getTime();
        return aDate - bDate;
      });
      console.log('filtered, ', tempChats);
      return tempChats.map((item: any, index: number) => {
        if(item.sentFrom === selectedPerson || item.sentTo === selectedPerson){
          if(item.sentFrom === currentUser){
            return <div data-time={Moment(item.sentDateTime).format('DD/MM/YYYY, hh:mm A')} className={"msg sent"} key={index}>{item.messageBody}</div>
          }
          else{
            return <div data-time={Moment(item.sentDateTime).format('DD/MM/YYYY, hh:mm A')} className={"msg rcvd"} key={index}>{item.messageBody}</div>
          }
        }
      });
    }
    return <div>Select a person to start chatting.</div>;
  };

  function getChats() {
    getMessages().then((data: any) => {
      if (data.status === 200) {
        console.log(data.res);
        const args = [data.res];
        const processedData = transformChatHistory(...args);

        setRawData(data.res);
        setChats(processedData);
      } else {
        setError(true);
      }
    });
  }

  function createChat(){
    //CALL USER API
    setIsOpen(true);
  }

  function updateReadIndicator(){
    const requestBody = updateChats;

    updateMessageIndicator(requestBody).then((data: any) => {
      if (data.status === 200) {
        setUpdateChats([]);
        setUnreadCount([]);
        setRefreshChat(true);
      } else {
        messageApi.error({ content: 'An error has occurred, please try again later' });
      }
    });
  }

  useEffect(() => {
    getChats();
    setInterval(() => {
      getChats();
      setUpdateChats([]);
      setUnreadCount([]);
    }, 5000);
  }, []);

  useEffect(() => {
    if(refreshChat){
      getChats();
      setRefreshChat(false);
    }
  }, [refreshChat]);

  useEffect(()=>{
    if(newUser.length > 0){
      const tempPeople: any = [...people, newUser];
      setPeople(tempPeople);

      //set delay for setState
      setTimeout(()=>{
        setSelectedPerson(newUser);
      }, 1000);
    }
  }, [newUser]);

  useEffect(() => {
    if (chats !== undefined && chats !== null) {
      
      const tempPeople: any = [...people];
      const tempUnread: any = [...unreadCount];

      chats.forEach((item: any) => {
        if (!tempPeople.includes(item.sentTo) && item.sentTo !== currentUser) {
          console.log("item.sentTo: ",item.sentTo)
          tempPeople.push(item.sentTo);
        }

        if (!tempPeople.includes(item.sentFrom) && item.sentFrom !== currentUser) {
          console.log("item.sentFrom: ",item.sentFrom)
          tempPeople.push(item.sentFrom);
        }
        
        if(item.sentFrom !== currentUser){

          let count = 0;

          if(!item.readIndicator){
            count += 1;
          }

          if(tempUnread.length > 0){
            tempUnread.map((object: any, index: number) => {
              if(item.sentFrom in object){
                count = object[item.sentFrom];
    
                if(!item.readIndicator){
                  count += 1;
                }
    
                object[item.sentFrom] = count;
                console.log("Update OBJ ", object[item.sentFrom]);
              }
              else{
                object[item.sentFrom] = count;
                console.log("Create OBJ ",object[item.sentFrom]);
              }
            });
          }
          else{
            tempUnread.push(
              {
                [item.sentFrom]: count,
              }
            )
          }

          console.log("COUNT "+item.messageBody+": ", count);
        }
        console.log("READD: ", tempUnread);
      });

      setPeople(tempPeople); 
      setUnreadCount(tempUnread);
    }
  }, [chats]);

  useEffect(() => {
    if(selectedPerson !== null){
      console.log("selectedPerson: ", selectedPerson)
      const tempUpdateChats = [...updateChats];
      unreadCount.map((object) => {
        if(object[selectedPerson] > 0){
          rawData.filter((item: any) => {
            if(item.sentFrom === selectedPerson && item.sentFrom !== currentUser && item.readIndicator === 'N'){
              tempUpdateChats.push({
                ...item,
                readIndicator: 'Y'
              });
            }
          });
          console.log("tempUpdateChats: ",tempUpdateChats);
          setUpdateChats(tempUpdateChats);
        }
      })
      
    }
  }, [selectedPerson])

  useEffect(()=>{
    if(updateChats.length > 0){
      updateReadIndicator();
    }
  }, [updateChats])

  return (
    <div className="chat-container">
      {contextHolder}
      <ChatUserSearch
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setNewUser={setNewUser}
        messageApi={messageApi}
      />
      <div className="people-list" style={{ width: '20%', borderRight: '1px solid #e8e8e8', padding: '16px' }}>
        <Row>
          <Col xs={20}>
            <h3>Users</h3>
          </Col>
          <Col xs={4}>
            <PlusCircleOutlined onClick={createChat} style={{ fontSize: '24px' }}/>
          </Col>
        </Row>
        <Divider/>
        <List
          dataSource={people}
          renderItem={(person: any) => (
            <List.Item
              onClick={() => setSelectedPerson(person)}
              style={{ cursor: 'pointer', backgroundColor: person === selectedPerson ? '#f0f0f0' : 'white', padding: '10px' }}
            >
              <Row style={{width: '100%', alignItems: 'center'}}>
                <Col xs={20}>
                  {person}
                </Col>
                <Col xs={4}>
                  {
                    unreadCount.map((object, index) => {
                      return(
                        <div key={index} className={'notification-circle'} style={{display: object[person] > 0? undefined: 'none'}}>
                          {object[person]}
                        </div>
                      );
                    })
                  }
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
      <div className="chat-content chat" style={{ width: '80%', padding: '16px' }}>
        {error ? (
          <Alert
            type="error"
            message={'Unable to retrieve messages'}
            description={'An error has ocurred while trying to retrieve messages, please try again later.'}
            showIcon
          />
        ) : undefined}
        <h2 style={{marginTop: '10px'}}>Chats</h2>
        <Divider />
        {renderMessages()}
        <div className="chat-input" style={{display: selectedPerson? undefined: 'none'}}>
          <Input
            placeholder="Type your message..."
            style={{ margin: '5px' }}
            value={chatMessage}
            onChange={e => setChatMessage(e.target.value)}
          />
          <Button type="primary" onClick={handleSendMessage} style={{ margin: '5px' }}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
