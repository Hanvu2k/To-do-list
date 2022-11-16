import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './AddGroupTask.scss'

function AddGroupTask({ handleAddGroupTask }) {
    const [show, setShow] = useState(false)
    const [groupTask, setGroupTask] = useState({
        group_name: ''
    })
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleInputGroupTask = event => setGroupTask({ ...groupTask, [event.target.name]: event.target.value })

    return (
        <div className="AddGroupTask">
            <AiFillPlusCircle onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Nhóm nhiệm vụ</InputGroup.Text>
                        <Form.Control
                            placeholder="Nhóm nhiệm vụ"
                            aria-label="Nhóm nhiệm vụ"
                            aria-describedby="basic-addon1"
                            name="group_name"
                            onChange={handleInputGroupTask}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Quay lại
                    </Button>
                    <Button variant="primary" onClick={() => handleAddGroupTask(groupTask) && handleClose()}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddGroupTask;
