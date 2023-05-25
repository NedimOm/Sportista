import React, {useEffect} from 'react';


//components
import RenterSidebar from "../../components/navigation/RenterSidebar";
import PokaznaStranica from "../../components/renter/PokaznaStranica";
import Field from "../../components/renter/Field";
import AddFieldModal from "../../components/renter/AddFieldModal";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

function MyFields({user,isAuthenticated}) {
    console.log(isAuthenticated)
    if(!isAuthenticated && user == null)
        return (<Navigate to={"/"}/>)
    return (
        <div style={{ display: 'flex' }}>
            <RenterSidebar />
            <div style={{ marginLeft: '10px'}}>
                <Field user={user}/>
            </div>
            <AddFieldModal props={user}/>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(MyFields);