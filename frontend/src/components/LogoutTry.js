import React from 'react';
import { Button } from 'primereact/button';



const LogoutTry = () => {

    function logout() {
        alert("logoout");
    }
    
    return (
        <div className="p-grid p-fluid" style={{ marginTop: '5%' }}>
            <div className="p-col-12 p-lg-6 p-md-6">
                <div className="card card-w-title">
                    <Button label="LOGOUT" onClick={logout}> </Button>
                </div>
            </div>
        </div>

    );

}

export default LogoutTry;
