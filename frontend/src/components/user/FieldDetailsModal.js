import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class App extends Component {
    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {
        return (
            <>
                <Button className="float-end" variant="primary" onClick={this.openModal}>Details</Button>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Teren 1</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Adresa: ...</p>
                        <p>Detalji: ...</p>
                        <p>Posto u bazi nemamo vise podataka o terenu, ovdje mozemo dodati jos kad je koji dostupan</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary">
                            Book
                        </Button>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default App;