import * as XLSX from 'xlsx';
import { Col, Table, Row, Button, Popconfirm, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { CallDeleteUser, CallFetchListUser } from '../../../services/api';
import { FiDownload, FiEdit, FiEye, FiPlus, FiRotateCw, FiTrash2, FiUpload } from "react-icons/fi";
import SearchInput from '../SearchInput';
import UserViewDetail from '../UserViewDetail';
import moment from 'moment';
import UserModalCreate from '../UserModalCreate';
import UserImport from '../UserImport';
import UserModalUpdate from '../UserModalUpdate';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState(false);
    const [sortQuery, setSortQuery] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(false);

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
                setListUser(res.data.result);
                setTotal(res.data.meta.total);
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
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
            render: (createdAt) => moment(createdAt).format('lll'),
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FiEdit
                            style={{ cursor: 'pointer', fontSize: '15px' }}
                            onClick={() => { setOpenModalUpdate(true); setDataUpdate(record) }}
                        />

                        <Popconfirm
                            placement='leftTop'
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này?"}
                            onConfirm={() => { handleDeleteUser(record._id) }}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <FiTrash2 style={{ cursor: 'pointer', fontSize: '15px' }} />
                        </Popconfirm>
                        <FiEye
                            style={{ cursor: 'pointer', fontSize: '15px' }}
                            onClick={() => {
                                setDataViewDetail(record);
                                setOpenViewDetail(true);
                            }} />
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

    const handleExportData = () => {
        if (listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportUser.csv");
        }
    }

    const handleDeleteUser = async (userId) => {
        const res = await CallDeleteUser(userId);
        if (res && res.data) {
            message.success('Xóa user thành công');
            fetchUser();
        } else {
            notification.error({
                message: 'Có lỗi sảy ra!',
                description: res.message
            })
        }
    }

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                Table list user
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button style={{ display: 'flex', alignItems: 'center', gap: '5px' }} type='primary' icon={<FiDownload />} onClick={() => setOpenModalImport(true)}>
                        Import
                    </Button>

                    <Button
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }} type='primary'
                        icon={<FiUpload />}
                        onClick={() => handleExportData()}
                    >
                        Export
                    </Button>

                    <Button
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        type='primary'
                        icon={<FiPlus />}
                        onClick={() => { setOpenModalCreate(true) }}>
                        Add user
                    </Button>

                    <Button style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleSearch()}>
                        <FiRotateCw />
                    </Button>
                </div>
            </div >
        )
    }

    return (
        <>
            <Row gutter={24} >
                <Col span={24}>
                    <SearchInput handleSearch={handleSearch} />
                </Col>

                <Col span={24}>
                    <Table
                        title={renderHeader}
                        columns={columns}
                        loading={isLoading}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={{ current: current, pageSize: pageSize, showSizeChanger: true, total: total, pageSizeOptions: [5, 10, 15, 20] }}
                    />
                </Col>
            </Row>

            <UserImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                fetchUser={fetchUser}
            />

            <UserViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
            />

            <UserModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchUser={fetchUser}
            />


            <UserModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchUser={fetchUser}
            />
        </>

    );
}

export default UserTable;
