import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './AddJob.scss';

function AddJob({ onAdd, group_id }) {
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    name: '',
    content: '',
    image_url: '',
    group_id: group_id,
  })

  const handleClose = () => setShowForm(false);
  const handleShow = () => setShowForm(true);

  const handleOnChangeInputAdd = event => setNewJob({ ...newJob, [event.target.name]: event.target.value });


  return (
    <div className="add-job">
      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Tên công việc</InputGroup.Text>
            <Form.Control
              placeholder="Tên công việc"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="name"
              onChange={handleOnChangeInputAdd}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Nội dung</InputGroup.Text>
            <Form.Control
              placeholder="Nội dung"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="content"
              onChange={handleOnChangeInputAdd}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Hình ảnh</InputGroup.Text>
            <Form.Control
              placeholder="Hình ảnh"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="image_url"
              onChange={handleOnChangeInputAdd}
            />
          </InputGroup>
          <img src={newJob.image_url} alt={newJob.name} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Quay lại</Button>
          <Button variant="primary" onClick={() => onAdd(newJob) && handleClose()}>Thêm</Button>
        </Modal.Footer>
      </Modal>

      <AiFillPlusCircle className="plus-btn" onClick={handleShow} />
    </div>
  );
}

export default AddJob;
