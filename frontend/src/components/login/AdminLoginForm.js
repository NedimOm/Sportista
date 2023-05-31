import React, { useState } from 'react';
import "./LoginForm.css";
import {connect} from "react-redux";
import {login} from "../../auth/Auth";

/* TODO:
   povezati da ide na /admin kad se loguje
*/

function AdminLoginForm({login}) {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');


    const loginAdmin = (event) => {
        event.preventDefault()
        login(adminEmail, adminPassword, false, false, false)
    }

    return (
        <div className="admin-login-form">
            <form action="#">
                <h1 className="m-3">ADMIN LOGIN</h1>
                <input className="custom-input" type="email" id="email" placeholder="Email address"  onChange={(event)=>{setAdminEmail(event.target.value)}} />

                <input className="custom-input" type="password" id="password" placeholder="Password" onChange={(event)=>{setAdminPassword(event.target.value)}}/>

                <button className="custom-register-button" type="submit" onClick={loginAdmin}>Login</button>
            </form>
        </div>
    );
}

export default connect(null, {login})(AdminLoginForm);