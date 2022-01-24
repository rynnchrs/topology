import React, { useRef, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';

import axios from "axios";
import { format } from 'date-fns';


export const Dashboard = () => {

    const modeOptions = [{name: 'DAY', val: 'day'}, {name: 'WEEK', val: 'week'}, {name: 'MONTH', val: 'month'}];
    const yearOptions = [{name: '2019', val: '2019'}, {name: '2020', val: '2020'}, {name: '2021', val: '2021'}];

    const [totalTable, setTotalTable] = useState([]);
    const [totalInspection, setTotalInspection] = useState([]);
    const [totalReceiveItem, setTotalReceiveItem] = useState([]);
    const [totalExpiry, setTotalExpiry] = useState([]);

    const [searchTotalInspectionMode, setSearchTotalInspectionMode] = useState([]);
    const [searchTotalInspectionDate, setSearchTotalInspectionDate] = useState(null);
    const [searchExpiryYear, setSearchExpiryYear] = useState([]);

    const expiry1 = ([
        { month: 'January', or: '184', cr: '99', tpl: '33', compre: '33' }, 
        { month: 'February', or: '184', cr: '99', tpl: '33', compre: '33' },
        { month: 'March', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: 'April', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: 'May', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: "June", or: '102', cr: '120', tpl: '45', compre: '33' }
    ]);
    
    const dt = useRef(null);
    const toast = useRef(null);

    // useEffect(() => {
    
    //     setTotalTable([]);
    // }, []);

    useEffect(() => {
        if (localStorage.getItem("username") !== 'admin') {
            getTotalInspection();
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("username") !== 'admin') {
            getTotalReceiveItem();
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("username") !== 'admin') {
            getTotalExpiry();
        }
    }, []); 

    const getTotalInspection = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        let getTDate = new Date();
        let tDate = new Date(getTDate.getFullYear(), getTDate.getMonth(), getTDate.getDate());
        let dt = format(tDate, 'yyyy-MM-dd');

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'dashboard/total-inspection/?date=' + dt
            + '&mode=day', config)
            .then((res) => {
                let tempData = []
                Object.entries(res.data).map(([key, val]) =>
                    tempData.push({"field": key, "val": val})
                )
                setTotalInspection(tempData);
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'SEARCH ERROR', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const getTotalReceiveItem = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        
        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'dashboard/total/', config)
            .then((res) => {
                let tempData = []
                Object.entries(res.data.results[0]).map(([key, val]) =>
                    tempData.push({"field": key, "val": val})
                )
                setTotalReceiveItem(tempData);
            })
            .catch((err) => {
                
            });
    }

    const getTotalExpiry = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        
        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'dashboard/expiry/?year=2019', config)
            .then((res) => {
                let tempData = [{MONTHS: "", OR: "", CR: "", TPL: "", COM: ""}]
                Object.entries(res.data).map(([key, val]) =>
                    Object.entries(val).map(([key1, val1], index) => {
                        if (key === "OR") {
                            tempData[index] = {...tempData[index], MONTHS: key1};
                            tempData[index] = {...tempData[index], OR: val1};
                        } else if (key === "CR") {
                            tempData[index] = {...tempData[index], CR: val1};
                        } else if (key === "TPL") {
                            tempData[index] = {...tempData[index], TPL: val1};
                        } else if (key === "Com") {
                            tempData[index] = {...tempData[index], COM: val1};
                        }
                    })
                )
                setTotalExpiry(tempData);
            })
            .catch((err) => {
                
            });
    }

    const [timeOutId, setTimeOutId] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("username") !== 'admin') {
            clearTimeout(timeOutId);
            setTimeOutId(setTimeout(() => {
                searchTotalInspection();
            }, 1000));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchTotalInspectionMode]);

    useEffect(() => {
        if (localStorage.getItem("username") !== 'admin') {
            clearTimeout(timeOutId);
            setTimeOutId(setTimeout(() => {
                searchTotalInspection();
            }, 1000));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchTotalInspectionDate]);

    const searchTotalInspection = () => {
        let getTDate = new Date();
        let tDate = new Date(getTDate.getFullYear(), getTDate.getMonth(), getTDate.getDate());
        let dt = format(tDate, 'yyyy-MM-dd');

        let sMode = searchTotalInspectionMode.length <= 0 ? "day" : searchTotalInspectionMode.val;
        let sDate = searchTotalInspectionDate === null ? dt : format(searchTotalInspectionDate, 'yyyy-MM-dd');

        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'dashboard/total-inspection/?date=' + sDate
            + '&mode=' + sMode, config)
            .then((res) => {
                let tempData = []
                Object.entries(res.data).map(([key, val]) =>
                    tempData.push({"field": key, "val": val})
                )
                setTotalInspection(tempData);
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'SEARCH ERROR', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const onChangeExpiryYear = (value) => {
        setSearchExpiryYear(value);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        
        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'dashboard/expiry/?year=' + value.val, config)
            .then((res) => {
                let tempData = [{MONTHS: "", OR: "", CR: "", TPL: "", COM: ""}]
                Object.entries(res.data).map(([key, val]) =>
                    Object.entries(val).map(([key1, val1], index) => {
                        if (key === "OR") {
                            tempData[index] = {...tempData[index], MONTHS: key1};
                            tempData[index] = {...tempData[index], OR: val1};
                        } else if (key === "CR") {
                            tempData[index] = {...tempData[index], CR: val1};
                        } else if (key === "TPL") {
                            tempData[index] = {...tempData[index], TPL: val1};
                        } else if (key === "Com") {
                            tempData[index] = {...tempData[index], COM: val1};
                        }
                    })
                )
                setTotalExpiry(tempData);
            })
            .catch((err) => {
                
            });
    }

    return (
        <div className="p-grid p-fluid">
            <Toast ref={toast} />
            <div className="p-col-12 p-lg-6 p-md-12 p-sm-12">
                <div className="card card-w-title" style={{borderTop: '5px solid blue', minWidth:'450px'}}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-xl-7 p-lg-6 p-md-5 p-sm-12">
                                    <div style={{float: 'left'}}>
                                        <b style={{fontSize: '20px', color:'gray'}}>Total Inspection</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                            <Dropdown value={searchTotalInspectionMode} options={modeOptions} optionLabel="name" placeholder="Select Mode" onChange={event => setSearchTotalInspectionMode(event.target.value)}/>
                            {/* <Dropdown value={searchExpiryYear} options={yearOptions} optionLabel="name" placeholder="Select Year" onChange={event => onChangeExpiryYear(event.target.value)}/> */}
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                            <Calendar id="icon" placeholder="Select Date" value={searchTotalInspectionDate} onChange={(e) => setSearchTotalInspectionDate(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 twocolumn-table">
                            <DataTable ref={dt} value={totalInspection} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                scrollable scrollHeight="325px" emptyMessage="No records found">
                                <Column field="field" header="PARTS" style={{ paddingLeft: '3%' }}></Column>
                                <Column field="val" header="QTY" style={{ paddingLeft: '3%' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <div className="p-col-12 p-lg-6 p-md-12 p-sm-12">
                <div className="card card-w-title" style={{borderTop: '5px solid blue', minWidth:'450px'}}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-xl-7 p-lg-6 p-md-5 p-sm-12">
                                    <div style={{float: 'left'}}>
                                        <b style={{fontSize: '20px', color:'gray'}}>Total Inspection</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12"> */}
                            {/* <Dropdown /* value={searchJobType} */ /* options={modeOptions} optionLabel="name" placeholder="Select Mode" */ /* onChange={event => setSearchJobType(event.target.value)} *//* /> */}
                        {/* </div> */}
                        {/* <div className="p-col-12 p-lg-6 p-md-6 p-sm-12"> */}
                            {/* <Calendar id="icon" placeholder="Select Date" /* value={searchEndDate} */ /* onChange={(e) => setSearchEndDate(e.value)} */ /* showIcon /> */}
                        {/* </div> */}
                        {/* <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 twocolumn-table"> */}
                                {/* <table>
                                    <thead>
                                        <tr>
                                            <th>PARTS</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.entries(totalInspection).map(([key, val], index) =>
                                                <tr key={index}>
                                                    <td>{key}</td>
                                                    <td>{val}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table> */}
                        {/* </div>
                    </div>
                </div>
            </div> */}

            <div className="p-col-12 p-lg-6 p-md-12 p-sm-12">
                <div className="card card-w-title" style={{borderTop: '5px solid blue', minWidth:'450px'}}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-xl-7 p-lg-6 p-md-5 p-sm-12">
                                    <div style={{float: 'left'}}>
                                        <b style={{fontSize: '20px', color:'gray'}}>Recieve Item</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 twocolumn-table">
                            <DataTable ref={dt} value={totalReceiveItem} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                scrollable scrollHeight="374px" emptyMessage="No records found">
                                <Column field="field" header="PARTS" style={{ paddingLeft: '3%' }}></Column>
                                <Column field="val" header="QTY" style={{ paddingLeft: '3%' }}></Column>
                            </DataTable>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{minWidth:'450px'}}>
                <div className="card card-w-title" style={{borderTop: '5px solid blue'}}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-xl-7 p-lg-6 p-md-5 p-sm-12">
                                    <div style={{float: 'left'}}>
                                        <b style={{fontSize: '20px', color:'gray'}}>Expiry</b>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-4 p-md-12 p-sm-12">
                            <Dropdown value={searchExpiryYear} options={yearOptions} optionLabel="name" placeholder="Select Year" onChange={event => onChangeExpiryYear(event.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 twocolumn-table">
                            <DataTable ref={dt} value={totalExpiry} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                scrollable scrollHeight="374px" emptyMessage="No records found">
                                <Column field="MONTHS" header="MONTHS" style={{ paddingLeft: '3%' }}></Column>
                                <Column field="OR" header="OR"></Column>
                                <Column field="CR" header="CR"></Column>
                                <Column field="TPL" header="TPL Insurance"></Column>
                                <Column field="COM" header="Comprehensive Insurance"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>

        </div>
               

    )

}

export default Dashboard;