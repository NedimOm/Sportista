import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import "./Navbar&Footer.css";

function TopNavbar() {
    return (
        <Navbar className="navbar">
            <Container>
                <div className="col-4">
                    <a href="/">
                        <img src="/favicon.svg" alt="logo" className="small_logo"/>
                    </a>
                </div>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <div className="offset-4 col-4">
                        <div className="d-flex justify-content-end">
                            <a href="/login"><button className="scaler m-2 nav-btn">Login</button></a>
                            <a href="/register"><button className="scaler m-2 nav-btn">Register</button></a>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavbar;