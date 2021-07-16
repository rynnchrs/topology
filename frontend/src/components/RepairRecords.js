import React, {useState, useEffect, useRef } from 'react';
// import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import axios from "axios";
import { format } from 'date-fns';

export default function RepairRecords() {

    const searchJobTypeOptions = [{ name: 'SHOW ALL', val: '' }, { name: 'REPAIR', val: 'True' }, { name: 'INSPECTION', val: 'False' }];
    const [searchJobType, setSearchJobType] = useState([]);

    const [repairRecordList, setRepairRecordList] = useState([]);
    // const [repairRecordData, setRepairRecordData] = useState([]);

    const statusRepairOptions = [{ name: 'OPERATIONAL', val: "Operational" }, { name: 'NON-OPERATIONAL', val: "Non-Operational" }];

    let arrParts = useRef([]);
    let arrLabor = useRef([]);

    const [repairID, setRepairID] = useState('');
    const [jobType, setJobType] = useState([]);
    const [scheduleDate, setScheduleDate] = useState(null);
    const [bodyNo, setBodyNo] = useState('');
    const [make, setMake] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [CSNumber, setCSNumber] = useState('');
    const [chassisNumber, setChassisNumber] = useState('');

    //variables to be edit
    const [jobOrder, setJobOrder] = useState('');
    const [IRNumber, setIRNumber] = useState('');
    const [dateIncident, setDateIncident] = useState(null);
    const [dateReceive, setDateReceive] = useState(null);
    const [detailsIncident, setDetailsIncident] = useState('');
    const [sitePOC, setSitePOC] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [datePerformed, setDatePerformed] = useState(null);
    const [detailsActualFindings, setDetailsActualFindings] = useState('');
    const [detailsActualRemarks, setDetailsActualRemarks] = useState('');
    const initialPartsLabor = [
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""}, 
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""}
    ];
    const [parts, setParts] = useState([
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""}, 
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""}
    ]);
    const [totalPartsCost, setTotalPartsCost] = useState('0.00');
    const [labor, setLabor] = useState([
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""}, 
        {p: "", q: "", c: ""},
        {p: "", q: "", c: ""}
    ]);
    const [totalLaborCost, setTotalLaborCost] = useState('0.00');
    const [totalEstimateCost, setTotalEstimateCost] = useState('0.00');
    const [dateRepaired, setDateRepaired] = useState(null);
    const [detailsActionTaken, setDetailsActionTaken] = useState('');
    const [dateDone, setDateDone] = useState(null);
    const [statusRepair, setStatusRepair] = useState([]);
    const [remarks, setRemarks] = useState('');

    const dt = useRef(null);
    const toast = useRef(null);

    const [displayRepairRecordEdit, setDisplayRepairRecordEdit] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});

    useEffect(() => {
        let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'report/repair/', config)
            .then((res) => {
                setRepairRecordList(res.data);
            })
            .catch((err) => {
                
            });
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrParts = parts.slice();
    },[parts]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrLabor = labor.slice();
    },[labor]);

    const getRepairRecordData = (value) => {
        let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'report/repair/' + value.repair_id + '/', config)
            .then((res) => {
                assignRepairRecordEdit(res.data);
            })
            .catch((err) => {
                
            });
    }

    const assignRepairRecordEdit = (value) => {
        console.log(value);
        setRepairID(value.repair_id);
        let splitScheduleDate = value.job_order.task.schedule_date.split("-");
        let gmtScheduleDate = new Date(+splitScheduleDate[0], splitScheduleDate[1] - 1, +splitScheduleDate[2]);
        setScheduleDate(format(gmtScheduleDate, 'yyyy-MM-dd'));
        setBodyNo(value.job_order.task.body_no.body_no);
        setMake(value.job_order.task.body_no.make);
        setStatus(value.job_order.task.body_no.operational);
        setLocation(value.job_order.task.body_no.current_loc);
        setPlateNumber(value.job_order.task.body_no.plate_no);
        setCSNumber(value.job_order.task.body_no.vin_no);
        setChassisNumber(value.job_order.task.body_no.vin_no);

        setJobOrder(value.job_order.job_id);
        setIRNumber(value.ir_no);
        setDateIncident(convertDatetoGMT(value.incident_date));
        setDateReceive(convertDatetoGMT(value.date_receive));
        setDetailsIncident(value.incident_details);
        setSitePOC(value.site_poc);
        setContactNumber(value.contact_no);
        setDatePerformed(convertDatetoGMT(value.perform_date));
        setDetailsActualFindings(value.actual_findings);
        setDetailsActualRemarks(value.actual_remarks);
        if (typeof(value.parts) === "undefined") {

        } else {
            arrParts = parts.slice();
            for (let i = 0; i < 5; i++) {
                if (typeof(value.parts[i]) === "undefined") {
                    arrParts[i] = {...arrParts[i], p: "", q: "", c: ""};
                    setParts(arrParts);
                } else {
                    arrParts[i] = {...arrParts[i], p: value.parts[i].particulars === null ? "" : value.parts[i].particulars, q: String(value.parts[i].quantity), c: String(value.parts[i].cost)};
                    setParts(arrParts);
                }
            }
        }
        setTotalPartsCost(value.total_parts_cost.toFixed(2));
        if (typeof(value.labor) === "undefined") {

        } else {
            arrLabor = labor.slice();
            for (let i = 0; i < 5; i++) {
                if (typeof(value.labor[i]) === "undefined") {
                    arrLabor[i] = {...arrLabor[i], p: "", q: "", c: ""};
                    setLabor(arrLabor);
                } else {
                    arrLabor[i] = {...arrLabor[i], p: value.labor[i].particulars === null ? "" : value.labor[i].particulars, q: String(value.labor[i].quantity), c: String(value.labor[i].cost)};
                    setLabor(arrLabor);
                }
            }
        }
        setTotalLaborCost(value.total_labor_cost.toFixed(2));
        setTotalEstimateCost(value.total_estimate_cost.toFixed(2));
        setDateRepaired(convertDatetoGMT(value.repair_date));
        setDetailsActionTaken(value.action_taken);
        setDateDone(convertDatetoGMT(value.date_done));
        try {
            setStatusRepair(statusRepairOptions.find(x => x.name === value.status_repair.toUpperCase()));
        } catch(err){

        }
        setRemarks(value.remarks);
        onClick('displayRepairRecordEdit');
    }

    const convertDatetoGMT = (value) => {
        let theDate = value.split("-");
        theDate = new Date(+theDate[0], theDate[1] - 1, +theDate[2]);
        return theDate;
    }

    const partsData = (index, column, value) => {
        if (column === "p") {
            let arr = parts.slice();
            arr[index] = {...arr[index], p: value};
            setParts(arr);
        } else if (column === "q") {
            let arr = parts.slice();
            arr[index] = {...arr[index], q: value};
            setParts(arr);
        } else {
            let arr = parts.slice();
            arr[index] = {...arr[index], c: value};
            setParts(arr);
            let cost = 0;
            arr.filter(f => f.c !== "").map((x) =>
                cost += Number(x.c)
            )
            setTotalPartsCost(cost.toFixed(2));
            let estCost = cost + Number(totalLaborCost);
            setTotalEstimateCost(estCost.toFixed(2));
        }
    };

    const laborData = (index, column, value) => {
        if (column === "p") {
            let arr = labor.slice();
            arr[index] = {...arr[index], p: value};
            setLabor(arr);
        } else if (column === "q") {
            let arr = labor.slice();
            arr[index] = {...arr[index], q: value};
            setLabor(arr);
        } else {
            let arr = labor.slice();
            arr[index] = {...arr[index], c: value};
            setLabor(arr);
            let cost = 0;
            arr.filter(f => f.c !== "").map((x) =>
                cost += Number(x.c)
            )
            setTotalLaborCost(cost.toFixed(2));
            let estCost = cost + Number(totalPartsCost);
            setTotalEstimateCost(estCost.toFixed(2));
        }
    };

    const submitEditRepairRecord = () => {
        if (IRNumber === "") { 
            toast.current.show({ severity: 'error', summary: 'IR NUMBER', detail: 'This field is required.', life: 3000 });
        } else if (dateIncident === null) { 
            toast.current.show({ severity: 'error', summary: 'INCIDENT DATE', detail: 'This field is required.', life: 3000 });
        } else if (dateReceive === null) { 
            toast.current.show({ severity: 'error', summary: 'DATE RECEIVE', detail: 'This field is required.', life: 3000 });
        } else if (detailsIncident === "") { 
            toast.current.show({ severity: 'error', summary: 'INCIDENT DETAILS', detail: 'This field is required.', life: 3000 });
        } else if (sitePOC === "") { 
            toast.current.show({ severity: 'error', summary: 'SITE POC', detail: 'This field is required.', life: 3000 });
        } else if (contactNumber === "") { 
            toast.current.show({ severity: 'error', summary: 'CONTACT NUMBER', detail: 'This field is required.', life: 3000 });
        } else if (datePerformed === null) { 
            toast.current.show({ severity: 'error', summary: 'DATE PERFORMED', detail: 'This field is required.', life: 3000 });
        } else if (detailsActualFindings === "") { 
            toast.current.show({ severity: 'error', summary: 'ACTUAL FINDINDS', detail: 'This field is required.', life: 3000 });
        } else if (detailsActualRemarks === "") { 
            toast.current.show({ severity: 'error', summary: 'ACTUAL RECOMMENDATION', detail: 'This field is required.', life: 3000 });
        } else if (dateRepaired === null) { 
            toast.current.show({ severity: 'error', summary: 'REPAIR DATE', detail: 'This field is required.', life: 3000 });
        } else if (detailsActionTaken === "") { 
            toast.current.show({ severity: 'error', summary: 'ACTION TAKEN DETAILS', detail: 'This field is required.', life: 3000 });
        } else if (dateDone === null) { 
            toast.current.show({ severity: 'error', summary: 'DATE DONE', detail: 'This field is required.', life: 3000 });
        } else if (statusRepair.length === 0) { 
            toast.current.show({ severity: 'error', summary: 'STATUS AFTER REPAIR', detail: 'This field is required.', life: 3000 });
        } else if (remarks === "") { 
            toast.current.show({ severity: 'error', summary: 'ADDITIONAL REMARKS and/or RECOMMENDATIONS', detail: 'This field is required.', life: 3000 });
        } else {
            let submitParts = [];
            parts.filter(f => f.p !== "").map((x) =>
                submitParts.push({
                    cost_type: "P",
                    particulars: x.p,
                    cost: x.c,
                    quantity: x.q
                })
            )

            let submitLabor = [];
            labor.filter(f => f.p !== "").map((x) =>
                submitLabor.push({
                    cost_type: "L",
                    particulars: x.p,
                    cost: x.c,
                    quantity: x.q
                })
            )

            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            axios.put(process.env.REACT_APP_SERVER_NAME + 'report/repair/' + repairID + '/', {
                parts: submitParts,
                labor: submitLabor,
                ir_no: IRNumber,
                incident_date: format(dateIncident, 'yyyy-MM-dd'),
                date_receive: format(dateReceive, 'yyyy-MM-dd'),
                incident_details: detailsIncident,
                site_poc: sitePOC,
                contact_no: contactNumber,
                perform_date: format(datePerformed, 'yyyy-MM-dd'),
                actual_findings: detailsActualFindings,
                actual_remarks: detailsActualRemarks,
                repair_date: format(dateRepaired, 'yyyy-MM-dd'),
                action_taken: detailsActionTaken,
                date_done: format(dateDone, 'yyyy-MM-dd'),
                status_repair: statusRepair.val,
                remarks: remarks,
                job_order: jobOrder
                
            }, config)
            .then((res) => {
                setMessage({title:"EDIT", content:"Successfully updated."});
                onHide('displayRepairRecordEdit');
                onClick('displayMessage');
            })
            .catch((err) => {
                console.log(err.response);
                if (err.toJSON().message === 'Network Error'){
                    toast.current.show({ severity: 'error', summary: 'NETWEORK ERROR', detail: 'Please check internet connection.', life: 3000 });
                } else if (err.response.data.job_order) {
                    toast.current.show({ severity: 'error', summary: 'REPORT NO.', detail: 'The report no. had a report already.', life: 3000 });
                }
            })
        }
        

    }

    const dialogFuncMap = {
        'displayRepairRecordEdit': setDisplayRepairRecordEdit,
        'displayMessage': setDisplayMessage,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        setParts(initialPartsLabor);
        setLabor(initialPartsLabor);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="CLOSE" className="p-button-success" onClick={() => onHide(name)} autoFocus/>
            </div>
        );
    }

    const renderHeader = () => {
        return (
            <div style={{paddingTop:'1%'}}><h5><b>REPAIR RECORDS</b></h5></div>
        );
    }

    const actionBody = (rowData) => {
        return (
            <Button style={{width: '70%', maxWidth: '250px'}}label="Edit" icon="pi pi-pencil" onClick={() => getRepairRecordData(rowData)}/>
        );
    }
    

    return(
        <div>
            <Toast ref={toast}/>
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Report No."/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <Dropdown placeholder="Select Job Type" optionLabel="name"  value={searchJobType} options={searchJobTypeOptions} onChange={event => setSearchJobType(event.target.value)}/>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <Calendar placeholder="Select a Date" showIcon />
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <div className="p-d-flex">
                                    <div className="p-mr-3"><Button label="SEARCH" icon="pi pi-search"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <DataTable ref={dt} header={renderHeader()} value={repairRecordList} className="p-datatable-sm" 
                        resizableColumns columnResizeMode="expand" emptyMessage="No data found">
                        <Column field="repair_id" header="Repair No." style={{ paddingLeft: '3%' }}></Column>
                        <Column body={actionBody}></Column>
                    </DataTable>
                    {/* <Paginator first={first} rows={rows} totalRecords={totalCount} onPageChange={onPageChange}></Paginator> */}
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="dialog-display">
                    <Dialog header="EDIT REPAIR" visible={displayRepairRecordEdit} onHide={() => onHide('displayRepairRecordEdit')} blockScroll={true}>
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 repair-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                                    <h4>FIELD REPORT</h4>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" >
                                    <div className="card card-w-title" >
                                        <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>JOB TYPE:</b></h6>
                                                <InputText placeholder="Input Job Type" value={jobType} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>REPORT No.:</b></h6>
                                                <InputText placeholder="Input Report No." value={jobOrder} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>SCHEDULE DATE:</b></h6>
                                                <InputText placeholder="Input Date" value={scheduleDate} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>VEHICLE: </b><i>(Body No.)</i></h6>
                                                <InputText placeholder="Input Body No." value={bodyNo} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>MAKE:</b></h6>
                                                <InputText placeholder="Input Make" value={make} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>STATUS:</b></h6>
                                                <InputText placeholder="Input Make" value={status} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>LOCATION:</b></h6>
                                                <InputText placeholder="Input Location" value={location} disabled/>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 repair-title">
                                                <h5>VEHICLE INFORMATION</h5>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>IR NUMBER:</b></h6>
                                                <InputText placeholder="Input IR Number" value={IRNumber} onChange={(e) => setIRNumber(e.target.value)}/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>PLATE No.:</b></h6>
                                                <InputText placeholder="Input Plate Number" value={plateNumber} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>CS No.:</b></h6>
                                                <InputText placeholder="Input CS Number" value={CSNumber} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>INCIDENT DATE:</b></h6>
                                                <Calendar placeholder="Input Date" value={dateIncident} onChange={(e) => setDateIncident(e.value)} showIcon/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>DATE RECEIVE:</b></h6>
                                                <Calendar placeholder="Input Date" value={dateReceive} onChange={(e) => setDateReceive(e.value)} showIcon/>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 repair-title">
                                                <h5>INCIDENT DETAILS</h5>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                                <h6><b>DETAILS:</b></h6>
                                                <InputTextarea placeholder="Discuss details here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsIncident} onChange={(e) => setDetailsIncident(e.target.value)}/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>CHASSIS No.:</b></h6>
                                                <InputText placeholder="Input Chassis Number" value={chassisNumber} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>SITE POC:</b></h6>
                                                <InputText placeholder="Input SITE POC" value={sitePOC} onChange={(e) => setSitePOC(e.target.value)}/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>CONTACT No.:</b></h6>
                                                <InputText placeholder="Input Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 repair-title">
                                                <h5>ACTUAL FINDINGS</h5>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>REPAIR BY/DIAGNOSED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>DATE PERFORMED:</b></h6>
                                                <Calendar placeholder="Input Date" value={datePerformed} onChange={(e) => setDatePerformed(e.value)} showIcon/>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                                <h6><b>FINDINGS:</b></h6>
                                                <InputTextarea placeholder="Discuss findings here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActualFindings} onChange={(e) => setDetailsActualFindings(e.target.value)}/>
                                                <small><i>Note: Please provide a technical report together with this document for evaluation.</i></small>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                                <h6><b>RECOMMENDATIONS:</b></h6>
                                                <InputTextarea placeholder="Discuss recommendations here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActualRemarks} onChange={(e) => setDetailsActualRemarks(e.target.value)}/>
                                            </div>

                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 repair-title">
                                                <div className="p-grid p-fluid">
                                                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 repair-title">
                                                        <h5>PARTS</h5>
                                                    </div>
                                                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td><h6><b>PARTICULARS</b></h6></td>
                                                                    <td><h6><b>QTY</b></h6></td>
                                                                    <td><h6><b>COST</b></h6></td>
                                                                </tr>
                                                                {
                                                                    parts.map((x, index) =>
                                                                        <tr className="repair-table" key={index}>
                                                                            <td><InputText value={x.p} onChange={(e) => partsData(index, "p", e.target.value)}/></td>
                                                                            <td><InputText style={{textAlign: 'right'}} value={x.q} onChange={(e) => partsData(index, "q", e.target.value)}/></td>
                                                                            <td><InputText style={{textAlign: 'right'}} value={x.c} onChange={(e) => partsData(index, "c", e.target.value)}/></td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                <tr>
                                                                    <td colSpan="2"><h6><b>TOTAL PARTS COST:</b></h6></td>
                                                                    <td><InputText style={{textAlign: 'right', fontWeight: '600'}} value={totalPartsCost} disabled/></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 repair-title">
                                                <div className="p-grid p-fluid">
                                                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 repair-title">
                                                        <h5>LABOR</h5>
                                                    </div>
                                                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td><h6><b>PARTICULARS</b></h6></td>
                                                                    <td><h6><b>QTY</b></h6></td>
                                                                    <td><h6><b>COST</b></h6></td>
                                                                </tr>
                                                                {
                                                                    labor.map((x, index) =>
                                                                        <tr className="repair-table" key={index}>
                                                                            <td><InputText value={x.p} onChange={(e) => laborData(index, "p", e.target.value)}/></td>
                                                                            <td><InputText style={{textAlign: 'right'}} value={x.q} onChange={(e) => laborData(index, "q", e.target.value)}/></td>
                                                                            <td><InputText style={{textAlign: 'right'}} value={x.c} onChange={(e) => laborData(index, "c", e.target.value)}/></td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                <tr>
                                                                    <td colSpan="2"><h6><b>TOTAL LABOR COST:</b></h6></td>
                                                                    <td><InputText style={{textAlign: 'right', fontWeight: '600'}} value={totalLaborCost} disabled/></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>TOTAL COST ESTIMATE:</b></h6>
                                                <InputText style={{textAlign: 'right', fontWeight: '600'}} value={totalEstimateCost} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>GENERATED BY:</b></h6>
                                                <InputText placeholder="Input Name"/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>NOTED BY:</b></h6>
                                                <InputText placeholder="Input Name" disabled/>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 repair-title">
                                                <h5>ACTION TAKEN</h5>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>REPAIRED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>REPAIR DATE:</b></h6>
                                                <Calendar placeholder="Input Date" value={dateRepaired} onChange={(e) => setDateRepaired(e.value)} showIcon/>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                                <h6><b>ACTION TAKEN DETAILS:</b></h6>
                                                <InputTextarea placeholder="Discuss action taken here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActionTaken} onChange={(e) => setDetailsActionTaken(e.target.value)}/>
                                                <small><i>Note: Please provide a technical service report together with this document for repair/s done.</i></small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>DATE DONE:</b></h6>
                                                <Calendar placeholder="Input Date" value={dateDone} onChange={(e) => setDateDone(e.value)} showIcon/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>STATUS AFTER REPAIR:</b></h6>
                                                <Dropdown options={statusRepairOptions} optionLabel="name" placeholder="Select Status" 
                                                value={statusRepair} onChange={event => setStatusRepair(event.target.value)}/>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                                <h6><b>ADDITIONAL REMARKS and/or RECOMMENDATIONS:</b></h6>
                                                <InputTextarea placeholder="Discuss remarks/recommendation here or leave it blank." rows={5} cols={30} autoResize
                                                value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
                                            </div>
                                            <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <Button label="UPDATE" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitEditRepairRecord()}/>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>

                <div className="p-grid p-fluid">
                    <Dialog header={message.title} visible={displayMessage} style={{ width: '310px' }} footer={renderFooter('displayMessage')} onHide={() => onHide('displayMessage')} closable={false}>
                        <div className="p-grid">
                            <div className="p-col-2">
                                <i className="pi pi-exclamation-circle" style={{fontSize: '28px', color: 'gray'}}/>
                            </div>
                            <div className="p-col">
                                <div style={{fontSize: '16px'}}>{message.content}</div>
                            </div>
                        </div>
                    </Dialog>
                </div>

            </div>
        </div>


    )

}