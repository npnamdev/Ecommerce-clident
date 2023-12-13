import { Form, Input, Modal, message, notification } from "antd";
import { callCreateAUser } from "../../../services/api";
import { useState } from "react";

const UserModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate, fetchUser } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsSubmit(true);
        const res = await callCreateAUser(fullName, email, password, phone);

        if (res && res.data) {
            message.success('Tạo mới người dùng thành công!');
            form.resetFields();
            setOpenModalCreate(false);
            await fetchUser();
        } else {
            notification.error({
                message: 'Có lỗi sảy ra!',
                description: res.message && res.message.length > 0 ? res.message[0] : res.message,
                duration: 5
            })
        }
        setIsSubmit(false);
    };

    const handleCancelModalCreate = () => {
        form.resetFields();
        setIsSubmit(false);
        setOpenModalCreate(false);
    }



    return (
        <Modal
            title="Thêm mới người dùng"
            open={openModalCreate}
            onOk={() => { form.submit() }}
            onCancel={() => { handleCancelModalCreate() }}
            confirmLoading={isSubmit}
            width={450}
        >
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '6px', fontWeight: '500' }}
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập fullName!' }]}
                >
                    <Input style={{ height: '36px' }} />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '6px', fontWeight: '500' }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input style={{ height: '36px' }} />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '6px', fontWeight: '500' }}
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                >
                    <Input.Password style={{ height: '38px' }} />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '6px', fontWeight: '500' }}
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập phone!' }]}
                >
                    <Input style={{ height: '36px' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UserModalCreate;
