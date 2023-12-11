import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { CallFetchListUser } from '../../../services/api';
import { FiEdit, FiTrash2 } from "react-icons/fi";

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const query = `current=${current}&pageSize=${pageSize}`;
                const res = await CallFetchListUser(query);
                console.log(res);
                if (res && res.data) {
                    setListUser(res.data.result);
                    setTotal(res.data.meta.total);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUser();
    }, [current, pageSize]);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Quyền',
            dataIndex: 'role',
            sorter: true
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FiEdit style={{ cursor: 'pointer' }} />
                        <FiTrash2 style={{ cursor: 'pointer' }} />
                    </div>
                )
            }
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }

        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
    };

    return (
        <Table
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            rowKey="_id"
            pagination={{ current: current, pageSize: pageSize, showSizeChanger: true, total: total, pageSizeOptions: [5, 10, 15, 20] }}
        />
    );
}

export default UserTable;