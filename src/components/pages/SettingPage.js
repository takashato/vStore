import React, {useEffect, useState} from "react";
import {PageHeader, message, Form, Input, Button, Checkbox} from "antd";
import axios from "../../libs/axios";

const SettingPage = ({description, groupId}) => {

    const path = window.location.pathname;
    const [settings, setSettings] = useState([]);

    useEffect(() => {
        async function getSettings() {
            try {
                let res = await axios.get(path, {
                    params: {
                        groupId: groupId
                    }
                });
                setSettings(res.data.settings);
            } catch (err) {
                message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi lấy dữ liệu.');
            }
        }
        getSettings();
    }, [path, groupId]);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
      <div>
          <PageHeader
              style={{
                  border: '1px solid rgb(235, 237, 240)',
              }}
              title={description}
          />
          <div className="container">
              <Form
                  {...layout}
              >
                  {settings.map((setting) => {
                      switch (setting.formatter) {
                          case 'Input':
                              return (
                                  <Form.Item
                                      label={setting.name}
                                      name={setting.varname}
                                  >
                                      <Input value={setting.value === null ? setting.default_value : setting.value}/>
                                  </Form.Item>
                              );
                          case 'Checkbox':
                              return (
                                  <Form.Item
                                      label={setting.name}
                                      name={setting.varname}
                                  >
                                      <Checkbox>{setting.value === null ? setting.default_value : setting.value}</Checkbox>
                                  </Form.Item>
                              );
                          default:
                              return (
                                  <span>Default</span>
                              );
                      }
                  })}
                  <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                          Lưu lại
                      </Button>
                  </Form.Item>
              </Form>
          </div>
      </div>
    );

};

export default SettingPage;