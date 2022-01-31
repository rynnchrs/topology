import React, { useEffect } from 'react';

export default function VehiclesGPS() {

    useEffect(() => {
        let url = "https://topo.ph/autohome/";
        window.open(url);
        // window.open(url, "_self");
    }, []);

    return(
        <div className="p-grid p-fluid">
            {/* <div className="p-col-12 p-lg-12 card"> */}
                {/* <iframe title= "GPS" src="http://128.199.92.107:59535/?page" style={{width: '100%', height: '85vh'}}></iframe> */}
            {/* </div> */}
        </div>
    )
}
