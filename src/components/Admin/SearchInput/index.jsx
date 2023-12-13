import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';

const SearchInput = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let query = "";

        Object.keys(values).forEach((key) => {
            if (values[key]) {
                query += `&${key}=/${values[key]}/i`;
            }
        });

        if (query) {
            props.handleSearch(query);
        }
    };

    const handleClear = () => {
        form.resetFields();
        let query = "";
        props.handleSearch(query);
    };

    return (
        <div className="input-container">
            <Form
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 15px', paddingBottom: '0px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Col span={12} style={{ padding: '0px' }}>
                            <Form.Item name="fullName" >
                                <Input placeholder="Fullname" style={{ height: '36px' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: '0px' }}>
                            <Form.Item name="email" >
                                <Input placeholder="Email" style={{ height: '36px' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: '0px' }}>
                            <Form.Item name="phone">
                                <Input placeholder="Phone" style={{ height: '36px' }} />
                            </Form.Item>
                        </Col>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Col style={{ padding: '0px' }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ height: '36px' }}>
                                    Search
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col style={{ padding: '0px' }}>
                            <Form.Item>
                                <Button type="default" htmlType="submit" style={{ height: '36px' }} onClick={handleClear}>
                                    Clear
                                </Button>
                            </Form.Item>
                        </Col>
                    </div>
                </Row>
            </Form>
        </div>
    );
};

export default SearchInput;
