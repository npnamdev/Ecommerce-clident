import React, { useState } from 'react';
import {
    AppstoreOutlined,
    MailOutlined,
    MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, message } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;
import { Dropdown, Space } from 'antd';
import { doLogoutAction } from '../redux/account/accountSlice';
import { callLogout } from '../services/api';

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
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
            label: <Link to='/'>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label style={{ cursor: 'pointer' }}>
                Quản lý tài khoản
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

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

    return (
        <Layout style={{ height: '100vh' }} >
            {isAdminRoute && userRole === 'ADMIN' &&
                <Sider trigger={null} collapsible collapsed={collapsed} theme="light" style={{ borderRight: '1px solid #f7f3f3' }}>
                    <h1 style={{ height: '60px', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Admin</h1>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ borderRight: 'none' }}
                        items={[
                            {
                                key: 'dashboard',
                                icon: <AppstoreOutlined />,
                                label: <Link to='/admin'>Dashboard</Link>,
                            },
                            {
                                icon: <VideoCameraOutlined />,
                                label: <span>Manage Users</span>,
                                children: [
                                    {
                                        key: 'crud',
                                        icon: <UserOutlined />,
                                        label: <Link to='/admin/user'>CRUD</Link>,
                                    },
                                ]
                            },
                            {
                                key: 'book',
                                icon: <UploadOutlined />,
                                label: <Link to='/admin/book'>Manage Book</Link>,
                            },
                            {
                                key: 'order',
                                icon: <MailOutlined />,
                                label: <Link to='/admin/order'>Manage Orders</Link>,
                            },
                        ]}
                    />
                </Sider>
            }
            <Layout>
                {isAdminRoute && userRole === 'ADMIN' &&
                    <Header style={{ padding: 0, background: '#fff', borderBottom: '1px solid #f7f3f3', display: 'flex', justifyContent: 'space-between', height: '60px', alignItems: 'center' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: '16px', width: 64, height: 64, }}
                        />

                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()} style={{ marginRight: '20px', color: 'black' }}>
                                <Space>
                                    <Avatar src={urlAvatar} />
                                    {user.fullName}
                                </Space>
                            </a>
                        </Dropdown>
                    </Header>
                }
                <Content className='admin-content' style={{ padding: '15px 20px', background: '#fefbfb', height: 'calc(100vh - 64px)', overflow: 'auto' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;