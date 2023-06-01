import React, { useState } from 'react';
import "./Admin.css";

//components
import AdminSidebar from "../../components/navigation/AdminSidebar";
import RentersTable from "../../components/admin/RentersTable";
import {connect} from "react-redux";

function Renters({isAuthenticated, user}) {
    return (
        <div style={{display: 'flex'}}>
            <AdminSidebar/>
            <div className="admin-page">
                <h1>Renters</h1>
                <h5>Table of registered renters.</h5>
                <RentersTable user={user} isAuthenticated={isAuthenticated}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user: state.auth.user});


export default connect(mapStateToProps,null)(Renters);

