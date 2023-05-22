import React from 'react';

//components
import RenterSidebar from "../../components/navigation/RenterSidebar";
import Field from "../../components/renter/Field";
import AddFieldModal from '../../components/renter/AddFieldModal';
import 'boxicons';
import {ProSidebarProvider} from "react-pro-sidebar";
function Dashboard() {
    return (
        <div style={{ display: 'flex' }}>
            <RenterSidebar />
            <div style={{ marginLeft: '10px'}}>
                <h1>Dashboard</h1>
                <h3>ovdje mu treba prikazati tabelu idućih 10 zakazanih termina</h3>
            </div>

        </div>
    );
}

export default Dashboard;