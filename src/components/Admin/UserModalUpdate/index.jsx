import { Form, Input, Modal, message, notification } from "antd";
import { useEffect, useState } from "react";
import { callUpdateUser } from "../../../services/api";

const UserModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, fetchUser, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        const { _id, fullName, phone } = values;
        setIsSubmit(true);
        const res = await callUpdateUser(_id, fullName, phone);
        if (res && res.data) {
            message.success('Cập nhật người dùng thành công!');
            setOpenModalUpdate(false);
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

    const handleCancelModal = () => {
        setIsSubmit(false);
        setOpenModalUpdate(false);
        setDataUpdate(null);
    }

    useEffect(() => {
        form.setFieldsValue(dataUpdate);
    }, [dataUpdate]);

    return (
        <Modal
            title="Thêm mới người dùng"
            open={openModalUpdate}
            onOk={() => { form.submit() }}
            onCancel={() => { handleCancelModal() }}
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
                    hidden
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '6px', fontWeight: '500' }}
                    label="ID"
                    name="_id"
                    rules={[{ required: true, message: 'Vui lòng nhập Id!' }]}
                >
                    <Input style={{ height: '36px' }} />
                </Form.Item>

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

export default UserModalUpdate;
