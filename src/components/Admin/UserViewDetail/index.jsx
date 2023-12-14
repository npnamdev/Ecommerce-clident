import { Drawer, Descriptions } from 'antd';
import moment from 'moment';

const UserViewDetail = (props) => {
    const { dataViewDetail, openViewDetail, setOpenViewDetail, } = props;
    return (
        <Drawer width={"400px"} title="Thông tin chi tiết người dùng" placement="right" onClose={() => setOpenViewDetail(false)} open={openViewDetail}>
            <Descriptions title="" bordered column={1} >
                <Descriptions.Item label="Id" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {dataViewDetail?._id}
                </Descriptions.Item>
                <Descriptions.Item label="Tên người dùng" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {dataViewDetail?.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Email" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {dataViewDetail?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {dataViewDetail?.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Vai trò" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {dataViewDetail?.role}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {dataViewDetail?.isActive ? 'Hoạt động' : 'Không hoạt động'}
                </Descriptions.Item>
                <Descriptions.Item label="Ảnh đại diện" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {dataViewDetail?.avatar}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {moment(dataViewDetail?.createdAt).format('lll')}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày sửa" style={{ padding: '12px 20px', fontWeight: '400' }}>
                    {moment(dataViewDetail?.updatedAt).format('lll')}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
}

export default UserViewDetail;
