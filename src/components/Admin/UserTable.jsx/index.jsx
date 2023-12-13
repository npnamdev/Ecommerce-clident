import { Checkbox, Col, Table, Row } from 'antd';

import { useEffect, useState } from 'react';
import { CallFetchListUser } from '../../../services/api';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import SearchInput from '../SearchInput';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState(false);
    const [sortQuery, setSortQuery] = useState(false);

    function formatDateTime(inputString) {
        var inputDateTime = new Date(inputString);
        var options = { month: 'short', day: 'numeric', year: 'numeric' };
        var outputDate = inputDateTime.toLocaleDateString('en-US', options);
        return outputDate;
    }

    useEffect(() => {
        fetchUser();
    }, [current, pageSize, selectAll, filter, sortQuery]);

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            let query = `current=${current}&pageSize=${pageSize}`;

            if (filter) {
                query += `&${filter}`;
            }

            if (sortQuery) {
                query += `&${sortQuery}`;
            }

            const res = await CallFetchListUser(query);

            if (res && res.data) {
                const updatedList = res.data.result.map(user => ({
                    ...user,
                    checked: selectAll,
                }));
                setListUser(updatedList);
                setTotal(res.data.meta.total);
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelectAllChange = (e) => {
        setSelectAll(e.target.checked);
    };

    const handleCheckboxChange = (record) => {
        const updatedList = listUser.map((user) => {
            if (user._id === record._id) {
                return {
                    ...user,
                    checked: !user.checked,
                };
            }
            return user;
        });

        setListUser(updatedList);
        setSelectAll(updatedList.every((user) => user.checked));
    };

    const columns = [
        {
            title: <Checkbox checked={selectAll} onChange={handleSelectAllChange} />,
            render: (text, record, index) => (
                <Checkbox checked={record.checked} onChange={() => handleCheckboxChange(record)} />
            ),
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (text, record, index) => (
                <a href='#' onClick={() => {
                    setDataViewDetail(record);
                    setOpenViewDetail(true);
                }}>{record._id}</a>
            ),
        },
        {
            title: 'Tên người dùng',
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
            title: 'Vai trò',
            dataIndex: 'role',
            sorter: true
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            sorter: true,
            render: (createdAt) => formatDateTime(createdAt),
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

        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);
        }
    };

    const handleSearch = (query) => {
        setFilter(query);
    }

    return (
        <>
            <Row gutter={24} >
                <Col span={24}>
                    <SearchInput handleSearch={handleSearch} />
                </Col>

                <Col span={24}>
                    <Table
                        columns={columns}
                        loading={isLoading}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={{ current: current, pageSize: pageSize, showSizeChanger: true, total: total, pageSizeOptions: [5, 10, 15, 20] }}
                    />
                </Col>
            </Row>
        </>

    );
}

export default UserTable;
