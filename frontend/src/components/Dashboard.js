import React, { useRef, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
// import axios from "axios";


export const Dashboard = () => {

    const [totalTable, setTotalTable] = useState([]);

    const expiry1 = ([
        { month: 'January', or: '184', cr: '99', tpl: '33', compre: '33' }, 
        { month: 'February', or: '184', cr: '99', tpl: '33', compre: '33' },
        { month: 'March', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: 'April', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: 'May', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: "June", or: '102', cr: '120', tpl: '45', compre: '33' }
    ]);
    
    const dt = useRef(null);

    useEffect(() => {
        getTotalTable();
        setTotalTable([]);
    }, []);

    const getTotalTable = () => {
        // let token = localStorage.getItem("token");

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //     },
        // };

        // axios
        //     .get(process.env.REACT_APP_SERVER_NAME + 'car/total/', config)
        //     .then(res => {
        //         // console.log("total table:");
        //         // console.log(res.data);
        //         const reply = res.data.results[0];
        //         setTotalTable([
        //             {name: "Body Key", "wd": reply.bodyKey_with_date, "nrc": reply.bodyKey_with_nrc, "nyr": reply.bodyKey_with_nyr, "na": reply.bodyKey_with_na, "dnr": reply.bodyKey_with_dnr},
        //             {name: "Cigarette Plug", "wd": reply.cigarettePlug_with_date, "nrc": reply.cigarettePlug_with_nrc, "nyr": reply.cigarettePlug_with_nyr, "na": reply.cigarettePlug_with_na, "dnr": reply.cigarettePlug_with_dnr},
        //             {name: "Modified Decals", "wd": reply.decals_with_date, "nrc": reply.decals_with_nrc, "nyr": reply.decals_with_nyr, "na":reply.decals_with_na, "dnr": reply.decals_with_dnr},
        //             {name: "Early Warning Device", "wd": reply.ewd_date_with_date, "nrc": reply.ewd_date_with_nrc, "nyr": reply.ewd_date_with_nyr, "na":reply.ewd_date_with_na, "dnr": reply.ewd_date_with_dnr},
        //             {name: "Fan", "wd": reply.fan_date_with_date, "nrc": reply.fan_date_with_nrc, "nyr": reply.fan_date_with_nyr, "na":reply.fan_date_with_na, "dnr": reply.fan_date_with_dnr},
        //             {name: "Plate No. Delivery", "wd": reply.plate_with_date, "nrc": reply.plate_with_nrc, "nyr": reply.plate_with_nyr, "na":reply.plate_with_na, "dnr": reply.plate_with_dnr},
        //             {name: "Tools", "wd": reply.tools_with_date, "nrc": reply.tools_with_nrc, "nyr": reply.tools_with_nyr, "na":reply.tools_with_na, "dnr": reply.tools_with_dnr},
        //             {name: "Unit Key", "wd": reply.unitKey_with_date, "nrc": reply.unitKey_with_nrc, "nyr": reply.unitKey_with_nyr, "na":reply.unitKey_with_na, "dnr": reply.unitKey_with_dnr},
        //             {name: "User's Manual", "wd": reply.userManual_with_date, "nrc": reply.userManual_with_nrc, "nyr": reply.userManual_with_nyr, "na":reply.userManual_with_na, "dnr": reply.userManual_with_dnr},
        //             {name: "Warranty Booklet", "wd": reply.warrantyBook_with_date, "nrc": reply.warrantyBook_with_nrc, "nyr": reply.warrantyBook_with_nyr, "na":reply.warrantyBook_with_na, "dnr": reply.warrantyBook_with_dnr}
        //         ]);
        //     })
        //     .catch((err) => {
        //         console.log("totaltable err:");
        //         console.log(err);
        //     });
    }

    return (
        <div className="p-grid p-fluid" >
            <div className="p-col-12">
                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 ">
                <h2>DATA</h2>
                    <div className="datatable-doc-demo">
                        <DataTable ref={dt} value={totalTable} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                            emptyMessage="No data found.">
                            <Column field="name" header="NAME"></Column>
                            <Column field="wd" header="WITH DATE"></Column>
                            <Column field="nrc" header="NOT YET RELEASED"></Column>
                            <Column field="nyr" header="NO RECEIVING COPY"></Column>
                            <Column field="na" header="N/A"></Column>
                            <Column field="dnr" header="DID NOT RECEIVE"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
                
            <div className="p-col-12">
                <div className="p-col-12 p-lg-8 p-md-8 p-sm-8">
                <h2>EXPIRY</h2>
                    <div className="p-grid">
                        <div className="p-col-12">
                            <div className="card">
                                <TabView>
                                    <TabPanel header="2019">
                                        <DataTable ref={dt} value={expiry1} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                            emptyMessage="No users found.">
                                            <Column field="month" header="Month" style={{ paddingLeft: '2%' }}></Column>
                                            <Column field="or" header="OR"></Column>
                                            <Column field="cr" header="CR"></Column>
                                            <Column field="tpl" header="TPL Insurance"></Column>
                                            <Column field="tpl" header="Comprehensive Insurance"></Column>
                                            {/* <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column> */}
                                        </DataTable>
                                    </TabPanel>
                                    <TabPanel header="2020">
                                        <DataTable ref={dt} value={expiry1} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                            emptyMessage="No users found.">
                                            <Column field="month" header="Month" style={{ paddingLeft: '2%' }}></Column>
                                            <Column field="or" header="OR"></Column>
                                            <Column field="cr" header="CR"></Column>
                                            <Column field="tpl" header="TPL Insurance"></Column>
                                            <Column field="tpl" header="Comprehensive Insurance"></Column>
                                            {/* <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column> */}
                                        </DataTable>
                                    </TabPanel>
                                    <TabPanel header="2021">
                                        <DataTable ref={dt} value={expiry1} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                            emptyMessage="No users found.">
                                            <Column field="month" header="Month" style={{ paddingLeft: '2%' }}></Column>
                                            <Column field="or" header="OR"></Column>
                                            <Column field="cr" header="CR"></Column>
                                            <Column field="tpl" header="TPL Insurance"></Column>
                                            <Column field="tpl" header="Comprehensive Insurance"></Column>
                                            {/* <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column> */}
                                        </DataTable>
                                    </TabPanel>
                                </TabView>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
               

    )

}

export default Dashboard;