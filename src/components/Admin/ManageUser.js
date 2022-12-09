import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";
import ModalUpdateUser from "./ModalCreateUser/ModalUpdateUser";
import '../Admin/ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { apiGetAllUsers, apiGetAllUsersWithPaginate } from "../../Service/apiService"
import ModalViewUser from "./ModalCreateUser/ModalViewUser";
import ModalDeleteUser from "./ModalCreateUser/ModalDeleteUser";
import TableUserPaginate from "./TableUSerPaginate";

const ManageUser = (props) => {
    const [isShowModalCreateUser, setShowModalCreateUser] = useState(false)
    const [isShowModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [isShowModalViewUser, setShowModalViewUser] = useState(false)
    const [isShowModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [pageCount, setPageCount] = useState(0);
    const LIMIT_USER = 3;
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchListUserWithPaginate(1);
    }
        , [])

    const fetchListUser = async () => {
        let res = await apiGetAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    const fetchListUserWithPaginate = async (page) => {
        let res = await apiGetAllUsersWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            console.log('res.dt=', res.DT)
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    const resetUpdateUser = () => {
        setDataUpdate({});
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus /> Add new user
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <ModalCreateUser
                        show={isShowModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage} />
                    <ModalUpdateUser
                        show={isShowModalUpdateUser}
                        setShow={setShowModalUpdateUser}
                        dataUpdate={dataUpdate}
                        fetchListUser={fetchListUser}
                        resetUpdateUser={resetUpdateUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <ModalViewUser

                        show={isShowModalViewUser}
                        setShow={setShowModalViewUser}
                        dataView={dataView}
                    />
                    <ModalDeleteUser
                        show={isShowModalDeleteUser}
                        setShow={setShowModalDeleteUser}
                        dataDelete={dataDelete}
                        fetchListUser={fetchListUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageUser;