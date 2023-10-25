import { AutoComplete, Col, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
import { getSearchUsers } from "../../apis/UserAPIs";

export default function ChatUserSearch(props: any) {
  const { 
    isOpen, 
    setIsOpen,
    setNewUser,
    messageApi,
    currentUser
} = props;

  const [form] = Form.useForm();
  const [options, setOptions] = useState<any>([]);

  function addUser() {}

  function searchUser(value: string) {
    getSearchUsers(value).then((data: any) => {
      if (data.status === 200) {
        const processedResults = data.res.filter((item: any) => item.userName !== currentUser).map((item: any, index: any)=>{
            return{
                value: item.userName,
                label: item.userName
            }
        });
        setOptions(processedResults);
      } else {
        messageApi.error({ content: data.resError + ": " + data.res });
      }
    });
  }

  const handleSearch = (value: string) => {
    if(value.length > 0){
        searchUser(value);
    }
    else{
        setOptions([]);
    }
  };

  const onSelect = (value: string) => {
    setNewUser(value);
    setIsOpen(false);
    console.log('onSelect', value);
  };

  return (
    <Modal 
        title={"Start New Chat"}
        open={isOpen}
        onOk={addUser} 
        width={400}
        footer={null}
        onCancel={()=>setIsOpen(false)}
        destroyOnClose={true}
    >
      <Form form={form} name="searchUser">
        <Form.Item>
          <AutoComplete
            popupMatchSelectWidth={300}
            style={{
              width: 350,
            }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            size="large"
          >
            <Input.Search size="large" placeholder="input here"/>
          </AutoComplete>
        </Form.Item>
      </Form>
    </Modal>
  );
}
