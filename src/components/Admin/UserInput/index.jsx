import './UserInput.scss';

const UserInput = (props) => {
    return (
        <div className="input-container">
            <div className="input-left">
                <input type="text" placeholder="Nhập tên hiển thị..." />
                <input type="text" placeholder="Nhập email..." />
                <input type="text" placeholder="Nhập số điện thoại..." />
            </div>
            <div className="input-right">
                <button className='btn-search'>Lọc</button>
                <button className='btn-clear'>Reset</button>
            </div>
        </div>
    );
}

export default UserInput;
