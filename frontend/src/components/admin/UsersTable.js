import React, {useEffect, useState} from "react";
import axios from "axios";
import DeleteConfirmationModalUser from "./DeleteConfirmationModalUser";

import Button from '@material-ui/core/Button';
import {Form, Modal} from "react-bootstrap";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [counter, setCounter] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
        setIsOpen(true);
        setSelectedUser(user);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedUser(null);
        setWarningMessage("");
    };


    const sendWarningMessage = () => {

        const emailData = {
            sender_email: 'foul.official2305@outlook.com', // Naša adresa e-pošte
            recipient_email: selectedUser.email,
            message: warningMessage,
        };

        axios
            .post('http://127.0.0.1:8000/admin/users/send-email/', emailData)
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
        getUsers();
    }, []);

    function getUsers() {
        axios.get(`http://127.0.0.1:8000/admin/users/getUsers/`)
            .then((response) => {
                setUsers(response.data);

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
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Email address</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.gender ? 'male' : 'female'}</TableCell>
                                <TableCell>{user.city}</TableCell>
                                <TableCell>
                                    <div>
                                        <Button variant="outlined" onClick={() => openModal(user)}>WARNING</Button>
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
                                        <DeleteConfirmationModalUser user_id={user.id} getU={getUsers}/>
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

export default UsersTable;
