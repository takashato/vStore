import React, {useEffect, useState} from "react";
import {useApolloClient} from "@apollo/react-hooks";
import {useHistory, useParams} from "react-router-dom";
import {Checkbox, Form, Input, message, Modal, Select} from "antd";
import {GET_STAFF_QUERY} from "../../../graphql/query";
import {CREATE_UPDATE_STAFF_MUTATION} from "../../../graphql/mutation";
import {processGraphqlError} from "../../../libs/process_graphql_error";
import {userGroupIDMap} from "../../../constants/userGroupIDMap";

const StaffModal = () => {
    const client = useApolloClient();
    const history = useHistory();

    const [form] = Form.useForm();

    const {id} = useParams();
    const [isCreate, setCreate] = useState(id === "new");
    const [isVisible, setVisible] = useState(false);
    const [title, setTitle] = useState("Thêm nhân viên");

    const getData = async (id) => {
        message.loading('Đang tải dữ liệu...');
        try {
            const {data} = await client.query({
                query: GET_STAFF_QUERY,
                variables: {
                    id: id,
                }
            });
            console.log(data);
            // Put to state
            await form.setFieldsValue(data.staff);
            await setVisible(true);
            await setTitle(`Sửa nhân viên ${data.staff.username}`);
            message.destroy();
        } catch (err) {
            message.error("Không thể lấy thông tin nhân viên!");
            console.log(err);
        }
    };

    const handleCancel = () => {
        history.push('/staff');
    };

    const handleOk = async () => {
        try {
            const values = form.getFieldsValue();
            values.active = !values.active ? 0 : 1;
            const {data} = await client.mutate({
                mutation: CREATE_UPDATE_STAFF_MUTATION,
                variables: {
                    staff: values
                },
                refetchQueries: ['StaffList'],
            });
            message.success("Lưu thông tin nhân viên thành công");
            // reload();
            history.push('/staff');
        } catch (error) {
            console.log(error.extensions);
            processGraphqlError(error, form);
            console.log(error);
        }
    };

    useEffect(() => {
        form.resetFields();
        if (id !== 'new') {
            getData(id);
            return;
        }
        setVisible(true);
    }, [id]);

    return (
        <StaffModalComponent form={form} title={title} visible={isVisible} onCancel={handleCancel} onOk={handleOk}
                             isCreate={isCreate}/>
    );
};

const StaffModalComponent = ({form, title, visible, onCancel, onOk, isCreate,}) => (
    <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
    >
        <Form
            layout="vertical"
            form={form}
        >
            <Form.Item
                name="id"
                noStyle
            >
                <Input type="hidden"/>
            </Form.Item>
            <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[{required: true, message: 'Vui lòng nhập tên đăng nhập.'}]}
            >
                <Input disabled={!isCreate}/>
            </Form.Item>
            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={isCreate ? [{required: true, message: 'Vui lòng nhập mật khẩu.'}] : []}
            >
                <Input.Password autocomplete="new-password"/>
            </Form.Item>
            <Form.Item
                name="full_name"
                label="Họ tên"
                rules={[{required: true, message: 'Vui lòng nhập họ tên.'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{type: 'email', message: 'Vui lòng nhập email hợp lệ. VD: admin@gmail.com'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="group_id"
                label="Loại tài khoản"
                rules={[{required: true, message: 'Vui lòng chọn loại tài khoản.'}]}
            >
                <Select placeholder="Chọn loại tài khoản">
                    {userGroupIDMap.map((ele) => (
                        <Select.Option value={ele.value} key={ele.value}>{ele.text}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item
                name="active"
                valuePropName="checked"
                rules={[{type: "boolean", message: 'Giá trị không hợp lệ.'}]}
            >
                <Checkbox>Kích hoạt tài khoản</Checkbox>
            </Form.Item>
        </Form>
    </Modal>
);

export default StaffModal;
