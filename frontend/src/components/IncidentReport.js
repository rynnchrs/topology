import React, {useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/panel';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import axios from "axios";
import { format } from 'date-fns';

export default function IncidentReport() {

    const statusOperationalOptions = [{ name: 'YES', val: true }, { name: 'NO', val: false }];

    const [bodyNoList, setBodyNoList] = useState([]);
    const [suggestionsBodyNo, setSuggestionsBodyNo] = useState(null);
    
    //variables to be save
    const [IRNo, setIRNo] = useState('');
    const [dateIR, setDateIR] = useState(null);
    const [requestorName, setRequestorName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [subProject, setSubProject] = useState('');
    const [bodyNo, setBodyNo] = useState([]);
    const [CSNumber, setCSNumber] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [region, setRegion] = useState('');
    const [area, setArea] = useState('');
    const [exactLocation, setExactLocation] = useState('');
    const [vehicleSupplier, setVehicleSupplier] = useState('');
    const [vehicleTypeMake, setVehicleTypeMake] = useState('');
    const [operational, setOperational] = useState([]);
    const [odometer, setOdometer] = useState('');
    const [waiver, setWaiver] = useState(false);
    const [repairType, setRepairType] = useState([]);
    const [engineNumber, setEngineNumber] = useState('');
    const [chassisNumber, setChassisNumber] = useState('');
    const [damagedParts, setDamagedParts] = useState('');
    const [locationIncident, setLocationIncident] = useState('');
    const [dateDetails, setDateDetails] = useState(null);
    const [timeDetails, setTimeDetails] = useState(null);
    const [problemObserved, setProblemObserved] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [preparedBy, setPreparedBy] = useState('');
    const [adminName, setAdminName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [notedBy, setNotedBy] = useState('');
    const [approvedBy, setApprovedBy] = useState('');

    const toast = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
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

        axios.get(process.env.REACT_APP_SERVER_NAME + 'car/car-list/', config)
            .then((res) => {
                setBodyNoList(res.data.results);
                if (res.data.next === null) {
                
                } else {
                    nextPageBodyNo(res.data.next);
                }
            })
            .catch((err) => {
                
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const nextPageBodyNo = (valueURL) => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(valueURL, config)
            .then((res) => {
                appendBodyNo(res.data.results, res.data.next);
            })
            .catch((err) => {
                
            });
    };

    const appendBodyNo = (valueResults, valueURL) => {
        valueResults.map((i) => {
            return setBodyNoList(bodyNoList => [...bodyNoList, i]);
        });
        if (valueURL === null){
                
        } else {
            nextPageBodyNo(valueURL);
        }
    }

    const searchListBodyNo = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {

            } else {
                try {
                    setSuggestionsBodyNo(bodyNoList.filter(item => item.body_no.startsWith(event.query)));
                } catch (err){

                }
            }
        }, 100);
    };

    const onSelectBodyNo = (value) => {
        console.log(value)
        setPlateNumber(value.plate_no);
        setArea(value.permanent_loc);
        setExactLocation(value.current_loc);
        setVehicleTypeMake(value.make = value.make === 'L30' ? 'L300 Exceed 2.5D MT' : value.make === 'SUV' ? 'Super Carry UV' : value.make ===  'G15' ? 'Gratour midi truck 1.5L' : value.make ===  'G12' ? 'Gratour midi truck 1.2L' : '');
        setChassisNumber(value.vin_no);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'car/careta/' + value.body_no + '/', config)
            .then((res) => {
                setCSNumber(res.data.cs_no);
                setVehicleSupplier(res.data.dealer = res.data.dealer === 'DMC' ? 'Diamond Motor Corporation' : res.data.dealer === 'GCM' ? 'Grand Canyon Multi Holdings, INC.' : res.data.dealer ===  'CAC' ? 'Cebu Autocentrale Corporation' : res.data.dealer ===  'CAI' ? 'Cherub Autodealer Inc.' : '');
                // setOperational(res.data.operational = res.data.operational === false ? 'No' : res.data.operational === true ? 'Yes' : '');
                // let op = res.data.operational = res.data.operational === false ? 'No' : res.data.operational === true ? 'Yes' : '';
                // setOperational(statusOperationalOptions.find(x => x.name === op.toUpperCase()));
                setEngineNumber(res.data.engine_no);
            })
            .catch((err) => {
                
            });
    }

    const onChangeRepairType = (e) => {
        let selectedRepairType = [...repairType];
        if (e.checked) {
            selectedRepairType.push(e.value);
        } else {
            selectedRepairType.splice(selectedRepairType.indexOf(e.value), 1);
        }
        setRepairType(selectedRepairType);
    }

    const submitIncidentReport = () => {
        console.log(operational)
        if (IRNo === "") {
            toast.current.show({ severity: 'error', summary: 'IR NUMBER', detail: 'This field is required.', life: 3000 });
        } else if (dateIR === null) {
            toast.current.show({ severity: 'error', summary: 'DATE', detail: 'This field is required.', life: 3000 });
        } else if (requestorName === "") {
            toast.current.show({ severity: 'error', summary: `REQUESTOR'S NAME`, detail: 'This field is required.', life: 3000 });
        } else if (projectName === "") {
            toast.current.show({ severity: 'error', summary: 'PROJECT NAME', detail: 'This field is required.', life: 3000 });
        } else if (subProject === "") {
            toast.current.show({ severity: 'error', summary: 'SUB PROJECT', detail: 'This field is required.', life: 3000 });
        } else if (bodyNo === "" || bodyNo.length <= 0) {
            toast.current.show({ severity: 'error', summary: 'BODY NO.', detail: 'This field is required.', life: 3000 });
        } else if (region === "") {
            toast.current.show({ severity: 'error', summary: 'REGION', detail: 'This field is required.', life: 3000 });
        } else if (exactLocation === "") {
            toast.current.show({ severity: 'error', summary: 'EXACT LOCATION', detail: 'This field is required.', life: 3000 });
        } else if (vehicleSupplier === "") {
            toast.current.show({ severity: 'error', summary: 'VEHICLE SUPPLIER', detail: 'This field is required.', life: 3000 });
        } else if (operational.length <= 0) {
            toast.current.show({ severity: 'error', summary: 'OPERATIONAL', detail: 'This field is required.', life: 3000 });
        } else if (odometer === "") {
            toast.current.show({ severity: 'error', summary: 'ODOMETER', detail: 'This field is required.', life: 3000 });
        } else if (repairType.length <= 0) {
            toast.current.show({ severity: 'error', summary: 'REPAIR TYPE', detail: 'Select atleast one repair type.', life: 3000 });
        } else if (damagedParts === "") {
            toast.current.show({ severity: 'error', summary: 'DAMAGED PARTS', detail: 'This field is required.', life: 3000 });
        }  else if (locationIncident === "") {
            toast.current.show({ severity: 'error', summary: 'LOCATION OF INCIDENT', detail: 'This field is required.', life: 3000 });
        }  else if (dateDetails === null) {
            toast.current.show({ severity: 'error', summary: 'DATE', detail: 'This field is required.', life: 3000 });
        } 
        // else if (timeDetails === null) {
        //     toast.current.show({ severity: 'error', summary: 'TIME', detail: 'This field is required.', life: 3000 });
        // } 
        else if (problemObserved === "") {
            toast.current.show({ severity: 'error', summary: 'PROBLEM OBSERVED', detail: 'This field is required.', life: 3000 });
        } else if (recommendation === "") {
            toast.current.show({ severity: 'error', summary: 'RECOMMENDATION', detail: 'This field is required.', life: 3000 });
        } else if (preparedBy === "") {
            toast.current.show({ severity: 'error', summary: 'PREPARED BY', detail: 'This field is required.', life: 3000 });
        } else if (adminName === "") {
            toast.current.show({ severity: 'error', summary: 'ADMIN NAME', detail: 'This field is required.', life: 3000 });
        } else if (contactNumber === "") {
            toast.current.show({ severity: 'error', summary: 'CONTACT NUMBER', detail: 'This field is required.', life: 3000 });
        } else if (notedBy === "") {
            toast.current.show({ severity: 'error', summary: 'NOTED BY', detail: 'This field is required.', life: 3000 });
        } else if (approvedBy === "") {
            toast.current.show({ severity: 'error', summary: 'APPROVED BY', detail: 'This field is required.', life: 3000 });
        } else {
            setIsLoading(true);
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            // let newDateTimeGMT = new Date(dateDetails.getFullYear(), dateDetails.getMonth(), dateDetails.getDate(), timeDetails.getHours(), timeDetails.getMinutes(), timeDetails.getSeconds());
            let newDateTimeGMT = new Date(dateDetails.getFullYear(), dateDetails.getMonth(), dateDetails.getDate(), 0, 0, 0);
            console.log("op: ", operational.val);

            axios.post(process.env.REACT_APP_SERVER_NAME + 'task/ir-report/', {
                repair_type: repairType,
                body_no: bodyNo.body_no,
                ir_no: IRNo,
                date: format(dateIR, 'yyyy-MM-dd'),
                weiver: waiver,
                req_name: requestorName,
                project_name: projectName,
                sub_project: subProject,
                region: region,
                exact_loc: exactLocation,
                vehicle_supp: vehicleSupplier,
                operational: operational.val,
                odometer: odometer,
                damaged_parts: damagedParts,
                incedent_loc: locationIncident,
                problem_obs: problemObserved,
                recommendation: recommendation,
                date_time: newDateTimeGMT,
                // date_time: format(dateDetails, 'yyyy-MM-dd'),
                prepared_by: preparedBy,
                noted_by: notedBy,
                admin_name: adminName,
                approved_by: approvedBy,
                contact_number: contactNumber,
            }, config)
            .then((res) => {
                setIRNo('');
                setDateIR(null);
                setRequestorName('');
                setProjectName('');
                setSubProject('');
                setBodyNo([]);
                setCSNumber('');
                setPlateNumber('');
                setRegion('');
                setArea('');
                setExactLocation('');
                setVehicleSupplier('');
                setVehicleTypeMake('')
                setOperational({});
                setOdometer('');
                setWaiver(false);
                setRepairType([]);
                setEngineNumber('');
                setChassisNumber('');
                setDamagedParts('');
                setLocationIncident('');
                setDateDetails(null);
                setTimeDetails(null);
                setProblemObserved('');
                setRecommendation('');
                setPreparedBy('');
                setAdminName('');
                setContactNumber('');
                setNotedBy('');
                setApprovedBy('');
                window.scrollTo({top: 0, left: 0, behavior:'smooth'});
                setIsLoading(false);
                setMessage({title:"CREATE", content:"Successfully created."});
                onClick('displayMessage');
            })
            .catch((err) => {
                if (err.toJSON().message === 'Network Error'){
                    toast.current.show({ severity: 'error', summary: 'NETWEORK ERROR', detail: 'Please check internet connection.', life: 3000 });
                } else if (err.response.data.body_no) {
                    toast.current.show({ severity: 'error', summary: 'BODY No.', detail: `${err.response.data.body_no.join()}`, life: 3000 });
                } else if (err.response.data.repair_type) {
                    toast.current.show({ severity: 'error', summary: 'REPAIR TYPE', detail: `${err.response.data.repair_type.join()}`, life: 3000 });
                } else if (err.response.data.date_time) {
                    toast.current.show({ severity: 'error', summary: 'INVALID DATE', detail: `${err.response.data.date_time.join()}`, life: 3000 });
                } else if (err.response.data.incedent_loc) {
                    toast.current.show({ severity: 'error', summary: 'LOCATION OF INCIDENT', detail: `${err.response.data.incedent_loc.join()}`, life: 3000 });
                }
                setIsLoading(false);
            })
        }
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
            <Toast ref={toast}/>
            <div className="gray-out" style={{display: isLoading ? "flex" : "none"}}>
                <ProgressSpinner />
            </div>
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                        <h4>INCIDENT REPORT</h4>
                    </div>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <div className="card card-w-title">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>IR #:</b></h6>
                                    <InputText placeholder="Input IR No." value={IRNo} onChange={(e) => setIRNo(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>DATE CREATED:</b></h6>
                                    <Calendar placeholder="Select Date" value={dateIR} onChange={(e) => setDateIR(e.value)} showIcon readOnlyInput/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>REQUESTOR'S NAME:</b></h6>
                                    <InputText placeholder="Input Requestor's Name" value={requestorName} onChange={(e) => setRequestorName(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                            <h6><b>PROJECT NAME:</b></h6>
                                            <InputText placeholder="Input Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                                        </div>
                                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                            <h6><b>SUB PROJECT:</b></h6>
                                            <InputText placeholder="Input Sub Project" value={subProject} onChange={(e) => setSubProject(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>BODY No.:</b></h6>
                                    <AutoComplete forceSelection field="body_no" placeholder="Body No." suggestions={suggestionsBodyNo} completeMethod={searchListBodyNo} 
                                    value={bodyNo} onSelect={(e) => onSelectBodyNo(e.value)} onChange={(e) => setBodyNo(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <h6><b>CS NUMBER:</b></h6>
                                    <InputText placeholder="Input CS Number" value={CSNumber} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <h6><b>PLATE NUMBER:</b></h6>
                                    <InputText placeholder="Input Plate Number" value={plateNumber} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>REGION:</b></h6>
                                    <InputText placeholder="Input Region" value={region} onChange={(e) => setRegion(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>AREA:</b></h6>
                                    <InputText placeholder="Input Area" value={area} onChange={(e) => setArea(e.target.value)} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>EXACT LOCATION:</b></h6>
                                    <InputText placeholder="Input Location" value={exactLocation} onChange={(e) => setExactLocation(e.target.value)} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>VEHICLE SUPPLIER:</b></h6>
                                    <InputText placeholder="Input Vehicle Supplier" value={vehicleSupplier} onChange={(e) => setVehicleSupplier(e.target.value)} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <h6><b>VEHICLE TYPE/MAKE:</b></h6>
                                    <InputText placeholder="Input Type/Make" value={vehicleTypeMake} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>OPERATIONAL (YES/NO):</b></h6>
                                    <Dropdown value={operational} options={statusOperationalOptions} optionLabel="name" placeholder="Select" 
                                    onChange={event => setOperational(event.target.value)}/>
                                    {/* <InputText placeholder="Input Operational" value={operational} disabled/> */}
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>CURRENT ODOMETER:</b></h6>
                                    <InputText placeholder="Input Odometer" value={odometer} onChange={(e) => setOdometer(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk resize-label">
                                    <h6><b>WAIVER:</b></h6>
                                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-field-checkbox">
                                        <Checkbox inputId="cb" checked={waiver} onChange={e => setWaiver(e.checked)} />
                                        <label htmlFor="cb"><b>Check (<i className="pi pi-check"></i>) if under waiver</b></label>
                                    </div>
                                </div>

                                <Panel header="REPAIR TYPE" className="p-col-12 p-lg-12 p-md-12 p-sm-12 resize-label">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb" value="me" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('me') !== -1}/>
                                            <label htmlFor="cb"><b>MECHANICAL</b></label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb" value="el" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('el') !== -1}/>
                                            <label htmlFor="cb"><b>ELECTRICAL</b></label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb" value="ba" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ba') !== -1}/>
                                            <label htmlFor="cb"><b>BATTERY</b></label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb" value="ti" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ti') !== -1}/>
                                            <label htmlFor="cb"><b>TIRES</b></label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb" value="pm" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('pm') !== -1}/>
                                            <label htmlFor="cb"><b>PMS</b></label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb" value="ac" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ac') !== -1}/>
                                            <label htmlFor="cb"><b>ACCIDENT</b></label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb" value="ot" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ot') !== -1}/>
                                            <label htmlFor="cb"><b>OTHERS</b></label>
                                        </div>
                                    </div>
                                </Panel>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                    <h5>REPAIR/INCIDENT DETAILS</h5>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <h6><b><center>OBSERVATION (Problem encountered during use) / INCIDENT</center></b></h6>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <h6><b>ENGINE NUMBER:</b></h6>
                                    <InputText placeholder="Input Engine Number" value={engineNumber} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <h6><b>CHASSIS NUMBER:</b></h6>
                                    <InputText placeholder="Input Chassis Number" value={chassisNumber} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>DAMAGED PARTS:</b></h6>
                                    <InputText placeholder="Input Damaged Parts" value={damagedParts} onChange={(e) => setDamagedParts(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>LOCATION OF INCIDENT:</b></h6>
                                    <InputText placeholder="Input Location" value={locationIncident} onChange={(e) => setLocationIncident(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-8 p-md-8 p-sm-12 required-asterisk">
                                            <h6><b>INCIDENT DATE:</b></h6>
                                            <Calendar placeholder="Select Date" value={dateDetails} onChange={(e) => setDateDetails(e.value)} showIcon readOnlyInput/>
                                        </div>
                                        {/* <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                            <h6><b>TIME:</b></h6> */}
                                            {/* <Calendar placeholder="Select Time" value={timeDetails} onChange={(e) => setTimeDetails(e.value)} timeOnly hourFormat="12" showIcon readOnlyInput/> */}
                                            {/* <Calendar placeholder="Select Time" value={timeDetails} onChange={(e) => setTimeDetails(e.value)} timeOnly showIcon readOnlyInput/> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>PROBLEM OBSERVED:</b></h6>
                                    <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                        value={problemObserved} onChange={(e) => setProblemObserved(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>RECOMMENDATION/REQUEST:</b></h6>
                                    <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                        value={recommendation} onChange={(e) => setRecommendation(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>PREPARED BY: (Driver/Custodian/Dispatcher)</b></h6>
                                    <InputText placeholder="Input Name" value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>ADMIN NAME:</b></h6>
                                    <InputText placeholder="Input Name" value={adminName} onChange={(e) => setAdminName(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>CONTACT NUMBER:</b></h6>
                                    <InputText placeholder="Input Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>NOTED BY:</b></h6>
                                    <InputText placeholder="Input Name" value={notedBy} onChange={(e) => setNotedBy(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>APPROVED BY:</b></h6>
                                    <InputText placeholder="Input Name" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)}/>
                                </div>

                                <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                    <Button label="SUBMIT" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitIncidentReport()}/>
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