import { Badge, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FiSearch } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import { FaAws } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';
import './header.scss';

const Header = () => {
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công!');
            navigate('/');
        }
    }

    const items = [
        {
            label: <label style={{ cursor: 'pointer' }} onClick={() => navigate('/admin')}>
                Trang quản trị
            </label>,
            key: 'account',
        },
        {
            label: <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
                Đăng xuất
            </label>,
            key: 'logout',
        },
    ];

    return (
        <div className='header-container'>
            <div className="logo-container">
                <FaAws style={{ fontSize: '45px', marginTop: '6px' }} />
            </div>
            <div className="search-container">
                <FiSearch className='search-icon' />
                <input type="text" placeholder='Bạn cần tìm gì hôm nay?' className='input-search' />
            </div>
            <a href="#" style={{ marginTop: '7px' }}    >
                <Badge count={5} size="small" >
                    <FaCartShopping className='icon-cart' />
                </Badge>
            </a>
            {
                user && user.fullName ?
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                            <Space>
                                {user.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    :
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Tài khoản</span>
            }
        </div>
    );
}

export default Header;
