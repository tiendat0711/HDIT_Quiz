import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiDeleteUser } from '../../../Service/apiService'
import { toast } from 'react-toastify';
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUser } = props;
    const handleClose = () => {
        setShow(false)
    };
    const handleSubmitDeleteUser = async () => {

        let data = await apiDeleteUser(dataDelete.id)

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fetchListUser();
            props.setCurrentPage(1)
            await props.fetchListUserWithPaginate(1)

        } else {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete user : {
                    dataDelete && dataDelete.email ? <b>{dataDelete.email}</b> : ''
                }</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;