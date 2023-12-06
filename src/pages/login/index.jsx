import { Button, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { callLogin } from '../../services/api';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin(username, password);
        setIsSubmit(false);
        if (res?.data) {
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(doLoginAction(res.data.user));
            message.success('Đăng nhập tài khoản thành công!');
            navigate('/');
        } else {
            notification.error({
                message: 'Có lỗi sảy ra!',
                description: res.message && Array.isArray(res.message) > 0 ? res.message[0] : res.message,
                duration: 5
            })
        }
    };

    return (
        <div className='register-page' style={{ padding: '50px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Form đăng nhập người dùng
            </h2>
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
                    label="Email"
                    name="username"
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

                <Form.Item style={{ marginTop: '25px' }} >
                    <Button type="primary" htmlType="submit" loading={isSubmit} style={{ width: '100%', height: '38px' }}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <p style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '500' }}>
                Bạn chưa có tài khoản?
                <NavLink to="/register" style={{ marginLeft: '5px' }}>
                    Đăng ký
                </NavLink>;
            </p>
        </div>
    );
}

export default LoginPage;
