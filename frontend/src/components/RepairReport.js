import React, {useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

import axios from "axios";
import { format } from 'date-fns';

export default function RepairReport() {

    const jobTypeOptions = [{ name: 'REPAIR', val: 'Repair' }, { name: 'INSPECTION', val: 'Inspection' }];
    const statusRepairOptions = [{ name: 'OPERATIONAL', val: "Operational" }, { name: 'NON-OPERATIONAL', val: "Non-Operational" }];
    const [jobNotCreatedList, setJobNotCreatedList] = useState([]);
    // const [suggestionsJobNotCreatedList, setSuggestionsJobNotCreatedList] = useState(null);

    // const [reportDetails, setReportDetails] = useState([]);
    const [jobType, setJobType] = useState([]);
    const [scheduleDate, setScheduleDate] = useState('');
    const [bodyNo, setBodyNo] = useState('');
    const [make, setMake] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [CSNumber, setCSNumber] = useState('');
    const [chassisNumber, setChassisNumber] = useState('');

    //variables to be saved
    const [jobID, setJobID] = useState([]);
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
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0}, 
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0}
    ];
    const [parts, setParts] = useState([
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0}, 
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0}
    ]);
    const [totalPartsCost, setTotalPartsCost] = useState('0.00');
    const [labor, setLabor] = useState([
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0}, 
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0}
    ]);
    const [totalLaborCost, setTotalLaborCost] = useState('0.00');
    const [totalEstimateCost, setTotalEstimateCost] = useState('0.00');
    const [dateRepaired, setDateRepaired] = useState(null);
    const [detailsActionTaken, setDetailsActionTaken] = useState('');
    const [dateDone, setDateDone] = useState(null);
    const [statusRepair, setStatusRepair] = useState([]);
    const [remarks, setRemarks] = useState('');
    const refImageUpload = useRef(null);

    const toast = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});

    // const searchListJobNotCreated = (event) => {
    //     setTimeout(() => {
    //         if (!event.query.trim().length) {

    //         } else {
    //             try {
    //                 setSuggestionsJobNotCreatedList(jobNotCreatedList.filter(item => item.job_id.toString().startsWith(event.query)));
    //             } catch (err){

    //             }
    //         }
    //     }, 100);
    // };

    const partsData = (index, column, value) => {
        if (column === "p") {
            let arr = parts.slice();
            arr[index] = {...arr[index], p: value};
            setParts(arr);
        } else if (column === "q") {
            let arr = parts.slice();
            arr[index] = {...arr[index], q: Number(value)};
            setParts(arr);
            let cost = 0;
            arr.filter(f => f.c !== "").map((x) =>
                cost += Number(x.c) * Number(x.q)
            )
            setTotalPartsCost(cost.toFixed(2));
            let estCost = cost + Number(totalLaborCost);
            setTotalEstimateCost(estCost.toFixed(2));
        } else {
            let arr = parts.slice();
            arr[index] = {...arr[index], c: Number(value)};
            setParts(arr);
            let cost = 0;
            arr.filter(f => f.c !== "").map((x) =>
                cost += Number(x.c) * Number(x.q)
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
            arr[index] = {...arr[index], q: Number(value)};
            setLabor(arr);
            let cost = 0;
            arr.filter(f => f.c !== "").map((x) =>
                cost += Number(x.c) * Number(x.q)
            )
            setTotalLaborCost(cost.toFixed(2));
            let estCost = cost + Number(totalPartsCost);
            setTotalEstimateCost(estCost.toFixed(2));
        } else {
            let arr = labor.slice();
            arr[index] = {...arr[index], c: Number(value)};
            setLabor(arr);
            let cost = 0;
            arr.filter(f => f.c !== "").map((x) =>
                cost += Number(x.c) * Number(x.q)
            )
            setTotalLaborCost(cost.toFixed(2));
            let estCost = cost + Number(totalPartsCost);
            setTotalEstimateCost(estCost.toFixed(2));
        }
    };

    const submitRepairReport = () => {
        if (typeof(jobID.job_id) === "undefined") {
            toast.current.show({ severity: 'error', summary: 'REPORT NO.', detail: 'Please select report no. first.', life: 3000 });
        } else if (IRNumber === "") { 
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
            setIsLoading(true);
            let submitParts = [];
            parts.filter(x => x.p !== "").map((x) =>
                submitParts.push({
                    cost_type: "P",
                    particulars: x.p,
                    cost: x.c,
                    quantity:  x.q
                })
            )

            let submitLabor = [];
            labor.filter(x => x.p !== "").map((x) =>
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

            axios.post(process.env.REACT_APP_SERVER_NAME + 'report/repair/', {
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
                job_order: jobID.job_id
            }, config)
            .then((res) => {
                if (refImageUpload.current.state.files.length <= 0) {
                    submitRepairReportAfter();
                } else {
                    let formData = new FormData();
                    refImageUpload.current.state.files.map((f, index) => {
                        formData.append("images[" + index + "]image", f);
                        formData.append("images[" + index + "]mode", "ci");
                        formData.append("images[" + index + "]image_name", res.data.repair_id);
                        return null;
                    })
                    axios.post(process.env.REACT_APP_SERVER_NAME + 'image/report-image/', formData, config)
                    .then((res) => {
                        submitRepairReportAfter();
                    })
                    .catch((err) => {

                    });
                }
            })
            .catch((err) => {
                if (err.toJSON().message === 'Network Error'){
                    toast.current.show({ severity: 'error', summary: 'NETWEORK ERROR', detail: 'Please check internet connection.', life: 3000 });
                } else if (err.response.data.job_order) {
                    toast.current.show({ severity: 'error', summary: 'REPORT NO.', detail: 'The report no. had a report already.', life: 3000 });
                } else if (err.response.data.contact_no) {
                    toast.current.show({ severity: 'error', summary: 'CONTACT NO.', detail: `${err.response.data.contact_no.join()}`, life: 3000 });
                } else if (err.response.data.cost) {
                    toast.current.show({ severity: 'error', summary: 'PARTS', detail: 'Invalid Cost', life: 3000 });
                } else if (err.response.data.quantity) {
                    toast.current.show({ severity: 'error', summary: 'PARTS', detail: 'Invalid Quantity', life: 3000 });
                }
                setIsLoading(false);
            })
        }
    }

    const submitRepairReportAfter = () => {
        setMessage({title:"CREATE", content:"Successfully created."});
        setScheduleDate('');
        setJobType([]);
        setBodyNo('');
        setMake('');
        setStatus('');
        setLocation('');
        setPlateNumber('');
        setCSNumber('');
        setChassisNumber('');

        setJobID([]);
        setIRNumber('');
        setDateIncident(null);
        setDateReceive(null);
        setDetailsIncident('');
        setSitePOC('');
        setContactNumber('');
        setDatePerformed(null);
        setDetailsActualFindings('');
        setDetailsActualRemarks('');
        setParts(initialPartsLabor);
        setTotalPartsCost('0.00');
        setLabor(initialPartsLabor);
        setTotalLaborCost('0.00');
        setTotalEstimateCost('0.00');
        setDateRepaired(null);
        setDetailsActionTaken('');
        setDateDone(null);
        setStatusRepair([]);
        setRemarks('');
        window.scrollTo({top: 0, left: 0, behavior:'smooth'});
        setIsLoading(false);
        onClick('displayMessage');
    }

    const handleChangeJobType = (value) => {
        setJobType(value);
        let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'task/job-order/' + value.val.toLowerCase() + '_not_created/', config)
            .then((res) => {
                setJobNotCreatedList(res.data);
                // setBodyNoList(res.data.results);
                // if (res.data.next === null){
                
                // } else {
                //     nextPageBodyNo(res.data.next);
                // }
            })
            .catch((err) => {
                
            });
    }

    const handleSelectReportNo = (value) =>{
        let splitScheduleDate = value.value.task.schedule_date.split("-");
        let gmtScheduleDate = new Date(+splitScheduleDate[0], splitScheduleDate[1] - 1, +splitScheduleDate[2]);
        setScheduleDate(format(gmtScheduleDate, 'yyyy-MM-dd'));
        setBodyNo(value.value.task.body_no.body_no);
        setMake(value.value.task.body_no.make);
        setStatus(value.value.task.body_no.operational);
        setLocation(value.value.task.body_no.current_loc);
        setPlateNumber(value.value.task.body_no.plate_no);
        setCSNumber(value.value.task.body_no.vin_no);
        setChassisNumber(value.value.task.body_no.vin_no);
    }

    const dialogFuncMap = {
        'displayMessage': setDisplayMessage,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="CLOSE" className="p-button-success" onClick={() => onHide(name)} autoFocus/>
            </div>
        );
    }

    return(
        <div>
            <Toast ref={toast} />
            <div className="gray-out" style={{display: isLoading ? "flex" : "none"}}>
                <ProgressSpinner />
            </div>
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                        <h4>FIELD REPORT</h4>
                    </div>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <div className="card card-w-title">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>JOB TYPE:</b></h6>
                                    <Dropdown value={jobType} options={jobTypeOptions} optionLabel="name" placeholder="Select Job Type" 
                                    onChange={event => handleChangeJobType(event.target.value)} />
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>REPORT No.:</b></h6>
                                    <Dropdown value={jobID} options={jobNotCreatedList} optionLabel="job_id" placeholder="Select Job Number" 
                                    onChange={event => {setJobID(event.target.value); handleSelectReportNo(event)}} disabled={jobType.length === 0}/>
                                    {/* <AutoComplete forceSelection field="job_id" placeholder="Input Report No." suggestions={suggestionsJobNotCreatedList} 
                                    value={jobOrder} completeMethod={searchListJobNotCreated} onSelect={event => handleSelectReportNo(event)} onChange={(e) => setJobOrder(e.target.value)} disabled={jobType.length === 0}/> */}
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
                                    <InputText placeholder="Input Status" value={status} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <h6><b>LOCATION:</b></h6>
                                    <InputText placeholder="Input Location" value={location} disabled/>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
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
                                    <Calendar placeholder="Select Date" value={dateIncident} onChange={(e) => setDateIncident(e.value)} showIcon/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>DATE RECEIVE:</b></h6>
                                    <Calendar placeholder="Select Date" value={dateReceive} onChange={(e) => setDateReceive(e.value)} showIcon/>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
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
                                    <InputText placeholder="Input Contact Number" keyfilter="int" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                    <h5>ACTUAL FINDINGS</h5>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <h6><b>REPAIR BY/DIAGNOSED BY:</b></h6>
                                    <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>DATE PERFORMED:</b></h6>
                                    <Calendar placeholder="Select Date" value={datePerformed} onChange={(e) => setDatePerformed(e.value)} showIcon/>
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

                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 report-title">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
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

                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 report-title">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
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
                                    <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                    <h6><b>NOTED BY:</b></h6>
                                    <InputText placeholder="Input Name" disabled/>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                    <h5>ACTION TAKEN</h5>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <h6><b>REPAIRED BY:</b></h6>
                                    <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>REPAIR DATE:</b></h6>
                                    <Calendar placeholder="Select Date" value={dateRepaired} onChange={(e) => setDateRepaired(e.value)} showIcon/>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>ACTION TAKEN DETAILS:</b></h6>
                                    <InputTextarea placeholder="Discuss action taken here or leave it blank." rows={5} cols={30} autoResize
                                    value={detailsActionTaken} onChange={(e) => setDetailsActionTaken(e.target.value)}/>
                                    <small><i>Note: Please provide a technical service report together with this document for repair/s done.</i></small>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>DATE DONE:</b></h6>
                                    <Calendar placeholder="Select Date" value={dateDone} onChange={(e) => setDateDone(e.value)} showIcon/>
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 image-upload">
                                    <h6><b>IMAGE UPLOAD:</b></h6>
                                    <FileUpload ref={refImageUpload} customUpload multiple accept="image/*" maxFileSize={1000000}
                                        emptyTemplate={<p className="p-m-0">Click Choose and select image files to upload.</p>} />
                                </div>
                                <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                    <Button label="SUBMIT" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitRepairReport()}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

    )

}