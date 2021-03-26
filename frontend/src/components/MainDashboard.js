import React, { useRef, useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import axios from "axios";


export const MainDashboard = () => {

    const [rcv, setRcv] = useState([]);
    const [totalTable, setTotalTable] = useState([]);
    const [withDate, setWithDate] = useState([]);
    const [nrc, setNrc] = useState([]);
    const [nyr, seNyr] = useState([]);
    const [na, setNa] = useState([]);
    const [dnr, setDnr] = useState([]);

    const [datas, setDatas] = useState([{ name: 'Plate Delivery No.', wd: '184', nyr: '99', nrc: '33' }, 
    { name: 'Modified Decals', wd: '102', nyr: '120', nrc: '45' },
    { name: 'EWD', wd: '102', nyr: '120', nrc: '45' },
    { name: 'Fan', wd: '102', nyr: '120', nrc: '45' },
    { name: 'Tools', wd: '102', nyr: '120', nrc: '45' },
    { name: "User's Manual", wd: '102', nyr: '120', nrc: '45' },
    { name: "Warranty Booklet", wd: '102', nyr: '120', nrc: '45' },
    { name: "Unit Key", wd: '102', nyr: '120', nrc: '45' },
    { name: "Body Key", wd: '102', nyr: '120', nrc: '45' },
    { name: "Cigarrtte Plug", wd: '102', nyr: '120', nrc: '45' },
    { name: "Keychain", wd: '102', nyr: '120', nrc: '45' },
    { name: "Jack", wd: '102', nyr: '120', nrc: '45' },
    { name: "Tire Wrench", wd: '102', nyr: '120', nrc: '45' },
    { name: "Fire Extinguisher", wd: '102', nyr: '120', nrc: '45' }
    ]);

    const [expiry1, setExpiry1] = useState([
        { month: 'January', or: '184', cr: '99', tpl: '33', compre: '33' }, 
        { month: 'February', or: '184', cr: '99', tpl: '33', compre: '33' },
        { month: 'March', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: 'April', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: 'May', or: '102', cr: '120', tpl: '45', compre: '33' },
        { month: "June", or: '102', cr: '120', tpl: '45', compre: '33' }
    ]);
    
    const items = [
        {label: '2019', icon: 'pi pi-fw pi-calendar'},
        {label: '2020', icon: 'pi pi-fw pi-calendar'},
        {label: '2021', icon: 'pi pi-fw pi-calendar'}
    ];

    const [activeIndex, setActiveIndex] = useState(1);

    const dt = useRef(null);

    useEffect(() => {
        getTotalTable();
        //sorted();
    }, []);

    // const sorted = () => { 
    //     setTotalTable(
    //         {name: "Body Key", "wd": rcv.bodyKey_with_date, "nrc": rcv.bodyKey_with_nrc, "nyr": rcv.bodyKey_with_nyr, "na": rcv.bodyKey_with_na, "dnr": rcv.bodyKey_with_dnr},
    //         {name: "Cigarette Plug", "wd": rcv.cigarettePlug_with_date, "nrc": rcv.cigarettePlug_with_nrc, "nyr": rcv.cigarettePlug_with_nyr, "na": rcv.bodyKey_with_na, "dnr": rcv.bodyKey_with_dnr},
    //         {name: "Body Key", "wd": rcv.bodyKey_with_date, "nrc": rcv.bodyKey_with_nrc, "nyr": rcv.bodyKey_with_nyr, na: rcv.bodyKey_with_na, dnr: rcv.bodyKey_with_dnr},
    //     );
    //     console.log("sorted");
    //     console.log(totalTable);
    // }

    const getTotalTable = () => {
        let token = localStorage.getItem("token");

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'api/total/', config)
            .then((res) => {
                console.log("total table:");
                console.log(res.data);
                setRcv(res.data);
            })
            .catch((err) => {
                console.log("getusers err:");
                console.log(err.response);
            });
    }

    return (
        <div className="p-grid p-fluid" >
            <div className="p-col-12">
                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 ">
                <h2>DATA</h2>
                    <div className="datatable-doc-demo">
                        <DataTable ref={dt} value={datas} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                            emptyMessage="No users found.">
                            <Column field="name" header="Name"></Column>
                            <Column field="wd" header="WITH DATE"></Column>
                            <Column field="nrc" header="NOT YET RELEASED"></Column>
                            <Column field="nyr" header="NO RECEIVING COPY"></Column>
                            {/* <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column> */}
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

export default MainDashboard;