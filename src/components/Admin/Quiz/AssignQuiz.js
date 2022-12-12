import './AssignQuiz.scss'
import Select from 'react-select';
import { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai"
import { RiImageAddFill } from "react-icons/ri"
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { apiGetAllUsers, apiGetQuizAllForAdmin, apiAssignQuiztoUser } from "../../../Service/apiService";
import { toast } from 'react-toastify';

const AssignQuiz = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    const [selectedUser, setSelectedUser] = useState({})
    const [listUser, setListUser] = useState([])
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
    const fetchQuiz = async () => {
        let res = await apiGetQuizAllForAdmin();
        if (res && res.EC === 0) {
            let newListQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                }
            })

            setListQuiz(newListQuiz);
        }
    }
    const fetchUser = async () => {
        let res = await apiGetAllUsers();

        if (res && res.EC === 0) {
            let newListUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.username} - ${item.email}`,
                }
            })

            setListUser(newListUser);
        }
    }
    const handleAssign = async () => {
        const res = await apiAssignQuiztoUser(+selectedQuiz.value, +selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
        else {
            toast.error(res.EM);
        }
    }
    return (
        <div className='questions-container'>
            <div className='add-new-question row'>
                <div className='col-6'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaltValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='col-6'>
                    <label className='mb-2'>Select User:</label>
                    <Select
                        defaltValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                    />
                </div>
            </div>
            <button
                className='btn btn-warning mt-3'
                onClick={() => handleAssign()}
            >Assign</button>
        </div>
    )
}

export default AssignQuiz;