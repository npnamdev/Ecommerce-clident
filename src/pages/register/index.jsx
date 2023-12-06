import { Button, Form, Input } from 'antd';

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <div className='register-layout' style={{ padding: '50px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Form đăng ký người dùng</h2>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                style={{ maxWidth: 450, margin: '0 auto' }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '10px', fontWeight: '500' }}
                    label="Họ và tên"
                    name="fullname"
                    rules={[{ required: true, message: 'Vui lòng nhập fullname!' }]}
                >
                    <Input style={{ height: '38px' }} />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '10px', fontWeight: '500' }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input style={{ height: '38px' }} />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '10px', fontWeight: '500' }}
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                >
                    <Input.Password style={{ height: '38px' }} />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: '10px', fontWeight: '500' }}
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập phone!' }]}
                >
                    <Input style={{ height: '38px' }} />
                </Form.Item>

                <Form.Item style={{ marginTop: '25px' }} >
                    <Button type="primary" htmlType="submit" loading={true} style={{ width: '100%', height: '40px' }}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegisterPage;
