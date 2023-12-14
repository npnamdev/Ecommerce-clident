import * as XLSX from 'xlsx';
import { useState } from 'react';
import { Modal, message, Upload, Table, notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
import { callBulkCreateUser } from '../../../services/api';
import templateFile from '../../../assets/teamplate.xlsx?url';

const UserImport = (props) => {
    const { openModalImport, setOpenModalImport, fetchUser } = props;
    const [dataExcel, setDataExcel] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    }

    const propUploads = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        customRequest: dummyRequest,

        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    const render = new FileReader();
                    render.readAsArrayBuffer(file);
                    render.onload = function (e) {
                        const data = new Uint8Array(render.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheet = workbook.Sheets[workbook.SheetNames[0]];
                        const jsonData = XLSX.utils.sheet_to_json(sheet, {
                            header: ["fullName", "email", "phone"],
                            range: 1
                        });

                        if (jsonData && jsonData.length > 0) {
                            setDataExcel(jsonData);
                        }
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmit = async () => {
        setIsSubmit(true);

        const data = dataExcel.map(item => {
            item.password = 'abc123';
            return item;
        })

        const res = await callBulkCreateUser(data);
        if (res.data) {
            notification.success({
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
                message: "Upload thành công"
            })
            setIsSubmit(false);
            handleCancel();
            fetchUser();
        } else {
            notification.error({
                description: res.message,
                message: "Đã có lỗi sảy ra!"
            })
        }
    };

    const handleCancel = () => {
        setOpenModalImport(false);
        setDataExcel([]);
    };

    return (
        <Modal
            title="Import data user"
            open={openModalImport}
            onOk={() => handleSubmit()}
            confirmLoading={isSubmit}
            onCancel={handleCancel}
            width={550}
            okText="Import data"
            okButtonProps={{
                disabled: dataExcel.length < 1
            }}
        >
            <Dragger {...propUploads}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single upload. Only accept .csv, .xls, .xlsx. or
                    <br />
                    <a onClick={e => e.stopPropagation()} href={templateFile} download>
                        Download Sample File
                    </a>
                </p>
            </Dragger>

            <div style={{ paddingTop: '10px' }}>
                <Table
                    dataSource={dataExcel}
                    pagination={{
                        pageSize: 2,
                        total: dataExcel.length,
                        showSizeChanger: false
                    }}
                    columns={[
                        { dataIndex: 'fullName', title: 'Tên người dùng' },
                        { dataIndex: 'email', title: 'Email' },
                        { dataIndex: 'phone', title: 'Số điện thoại' },
                    ]}
                />
            </div>

        </Modal>
    );
}

export default UserImport;
