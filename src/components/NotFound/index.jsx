import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    const navigate = useNavigate();
    return (
        <Result
            style={style}
            status="404"
            title="404"
            subTitle="Xin lỗi, bạn đang truy cập trang không tồn tại"
            extra={<Button type="primary" onClick={() => navigate('/')}>Trở lại</Button>}
        />
    );
}

export default NotFound;
