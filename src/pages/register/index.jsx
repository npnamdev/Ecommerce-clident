import { Button, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsSubmit(true);
        const res = await callRegister(fullName, email, password, phone);
        setIsSubmit(false);

        if (res?.data?._id) {
            message.success('Đăng ký tài khoản thành công!');
            navigate('/login');
        } else {
            notification.error({
                message: 'Có lỗi sảy ra!',
                description: res.message && res.message.length > 0 ? res.message[0] : res.message,
                duration: 5
            })
        }
    };

    return (
        <div className='register-page' style={{ padding: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Form đăng ký người dùng</h2>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                style={{ maxWidth: 400, margin: '0 auto' }}
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

                <Form.Item style={{ marginTop: '25px' }} >
                    <Button type="primary" htmlType="submit" loading={isSubmit} style={{ width: '100%', height: '38px' }}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <p style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '500' }}>
                Bạn đã có tài khoản?
                <NavLink to="/login" style={{ marginLeft: '5px' }}>
                    Đăng nhập
                </NavLink>;
            </p>
        </div>
    );
}

export default RegisterPage;
