import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalCreateUser.scss'
import { BsImageFill } from 'react-icons/bs'
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiUpdateUser } from '../../../Service/apiService'
import { useEffect } from 'react';
import _ from 'lodash'
const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");

    };
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            //updateState
            setId(dataView.id);
            setUsername(dataView.username);
            setEmail(dataView.email)
            setRole(dataView.role)
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
            }

        }
    }, [props.dataView])
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-create-user'>
                <Modal.Header closeButton>
                    <Modal.Title>View a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                disabled
                                className="form-control"
                                value={password}
                                placeholder='*********'
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label
                                className="form-label"
                            >Rule</label>
                            <select className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                disabled
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor="labelUpload">
                                <BsImageFill />   User image
                            </label>

                        </div>
                        <div className='col-md-12 img-preview' >
                            {
                                previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span className='form-label'>Preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;