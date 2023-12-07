import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotPermitted = () => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    const navigate = useNavigate();
    return (
        <Result
            style={style}
            status="403"
            title="403"
            subTitle="Xin lỗi, bạn không có quyền truy cập trang này"
            extra={<Button type="primary" onClick={() => navigate('/')}>Trở lại</Button>}
        />
    );
}

export default NotPermitted;
