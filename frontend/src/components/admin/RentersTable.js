import Table from "react-bootstrap/Table";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import "../../pages/admin/Admin.css";

import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// components
import DeleteConfirmationModalRenter from "./DeleteConfirmationModalRenter";
import {Navigate} from "react-router-dom";
import {Form, Modal} from "react-bootstrap";

function RentersTable(props) {
    const [renters, setRenters] = useState([]);
    const [counter, setCounter] =  useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [selectedRenter, setSelectedRenter] = useState(null);

    const openModal = (renter) => {
        setIsOpen(true);
        setSelectedRenter(renter);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedRenter(null);
        setWarningMessage("");
    };


    const sendWarningMessage = () => {

        const emailData = {
            sender_email: 'foul.official2305@outlook.com', // Naša adresa e-pošte
            recipient_email: selectedRenter.email,
            message: warningMessage,
        };

        axios
            .post('http://127.0.0.1:8000/admin/renters/send-email/', emailData)
            .then((response) => {
                console.log('Warning email sent successfully');
                closeModal();

            })
            .catch((error) => {
                console.error('Warning email sending failed:', error);
            });

        setIsOpen(false);

    };


    useEffect(() => {
        getRenters();
    }, []);

    function getRenters() {
        axios.get(`http://127.0.0.1:8000/admin/renters/getRenters/`)
            .then((response) => {
                setRenters(response.data);
            })
            .catch((error) => {
                console.error('Error fetching fields:', error);
            });
    }


    return (
        <div className="mt-5">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Phone number</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renters.map((renter, index) => (
                            <TableRow key={renter.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{renter.name}</TableCell>
                                <TableCell>{renter.email}</TableCell>
                                <TableCell>{renter.city}</TableCell>
                                <TableCell>{renter.phone}</TableCell>
                                <TableCell>
                                    <div>
                                        <Button variant="outlined" onClick={() => openModal(renter)}>WARNING</Button>
                                        <Modal show={isOpen} onHide={closeModal}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Send Warning Message</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group controlId="message">
                                                            <Form.Label>Message</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={4}
                                                                value={warningMessage}
                                                                onChange={(e) => setWarningMessage(e.target.value)}
                                                            />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={closeModal}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="primary" onClick={() => sendWarningMessage()} >
                                                        Send
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        <DeleteConfirmationModalRenter renter_id={renter.id} getR={getRenters} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RentersTable;
