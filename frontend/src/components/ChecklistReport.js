import React, {useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import axios from "axios";

export default function ChecklistReport() {

    const jobDescriptionOptions = [{name: 'REPAIR', val: 're'}, {name: 'INSPECTION', val: 'in'}, {name: 'PMS', val: 'pm'}];

    const [inspectionNotCreatedList, setInspectionNotCreatedList] = useState([]);
    const [locationList, setLocationList] = useState([]);

    //variables to be save
    const [reportNo, setReportNo] =  useState('');
    const [task, setTask] =  useState('');
    const [email, setEmail] =  useState('');
    const [scheduleDate, setScheduleDate] =  useState('');
    const [location, setLocation] =  useState('');
    const [bodyNo, setBodyNo] =  useState('');
    const [make, setMake] =  useState('');
    const [actualOdometer, setActualOdometer] =  useState('');
    const [jobDescription, setJobDescription] =  useState('');
    const [pairEWD, setPairEWD] = useState(null);
    const [colorEWD, setColorEWD] = useState('');
    const [bodyNoEWD, setBodyNoEWD] = useState(null);
    const [bodyNoFLTire, setBodyNoFLTire] = useState(null);
    const [bodyNoFRTire, setBodyNoFRTire] = useState(null);
    const [bodyNoRLTire, setBodyNoRLTire] = useState(null);
    const [bodyNoRRTire, setBodyNoRRTire] = useState(null);
    const [spareTire, setSpareTire] = useState(null);
    const [bodyNoSpareTire, setBodyNoSpareTire] = useState(null);
    const [bodyNoBattery, setBodyNoBattery] = useState(4);
    const [vehicleWeight, setVehicleWeight] = useState(null);
    const [vehicleStatus, setVehicleStatus] = useState('');
    const [partsIncluded, setPartsIncluded] = useState([]);
    const [checklistParts, setChecklistParts] = useState([]);
    const [partsName, setPartsName] = useState('');
    const refImageUpload = useRef(null);

    const toast = useRef(null);

    const [displayPartsName, setDisplayPartsName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});

    useEffect(() => {
        getInspectionNotCreated();
    }, []);

    useEffect(() => {
        let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'task/location-list/', config)
            .then((res) => {
                let loc = [...locationList];
                for (var i = 0; i < Object.keys(res.data).length; i++) {
                    loc.push({"location": res.data[i]})
                }
                setLocationList(loc);
            })
            .catch((err) => {
                
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getChecklistParts();
    }, []); 

    const getInspectionNotCreated = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'task/job-order/inspection_not_created/', config)
            .then((res) => {
                setInspectionNotCreatedList(res.data);
            })
            .catch((err) => {
                
            });
    }

    const getChecklistParts = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'report/checklist-parts/', config)
            .then((res) => {
                let p = [];
                res.data.map((i) => {
                    p.push({partsId: i.id, name: i.name, quantity: 0});
                })
                setChecklistParts(p);
            })
            .catch((err) => {
                
            });
    }

    const updateChecklistParts = () => {
        let chck = checklistParts.filter(item => item.name === partsName);

        if (chck.length <= 0) {
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            let partsAdd = [];
            partsAdd.push({name: partsName})

            axios.post(process.env.REACT_APP_SERVER_NAME + 'report/checklist-parts/', partsAdd, config)
            .then((res) => {
                setPartsName('');
                onHide('displayPartsName');
                setChecklistParts(checklistParts => [...checklistParts, {partsId: 0, name: res.data[0].name, quantity: 0}]);
                toast.current.show({ severity: 'success', summary: 'ADDED', detail: 'Add succesfully.', life: 3000 });
            })
            .catch((err) => {
                setPartsName('');
                onHide('displayPartsName');
                toast.current.show({ severity: 'error', summary: 'ERROR', detail: 'Something went wrong.', life: 3000 });
            });
        } else {
            setPartsName('');
            onHide('displayPartsName');
            toast.current.show({ severity: 'error', summary: 'FAILED', detail: 'Parts name already exist.', life: 3000 });
        }
    }

    const updateChecklistPartsQuantity = (index, i, n, q) => {
        let tempArr = checklistParts.slice();
        tempArr[index] = {partsId: i, name: n, quantity: q};
        setChecklistParts(tempArr);
    }

    const submitChecklist = () => {
        // console.log(jobDescription)
        // console.log(bodyNo)
        console.log(reportNo)
        // console.log(partsIncluded)

        if (reportNo === '') {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'REPORT No.', life: 3000 });
        } else if (email === '') {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'EMAIL', life: 3000 });
        } else if (scheduleDate === null) {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'SCHEDULE DATE', life: 3000 });
        } else if (location === '') {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'LOCATION', life: 3000 });
        } else if (bodyNo === "" || bodyNo.length <= 0) {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'BODY No.', life: 3000 });
        } else if (actualOdometer === '') {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'ACTUAL ODOMETER READING', life: 3000 });
        } else if (jobDescription <= 0) {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'JOB DESCRIPTION', life: 3000 });
        } else if (pairEWD === null) {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Is there a pair of Early Warning Device?', life: 3000 });
        } else if (colorEWD === '') { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'What color of Early Warning Device is available?', life: 3000 });
        } else if (bodyNoEWD === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Early Warning Device marked with body number?', life: 3000 });
        } else if (bodyNoFLTire === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Front left hand tire marked with body number?', life: 3000 });
        } else if (bodyNoFRTire === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Front right hand tire marked with body number?', life: 3000 });
        } else if (bodyNoRRTire === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Rear right hand tire marked with body number?', life: 3000 });
        } else if (bodyNoRLTire === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Rear left hand tire marked with body number?', life: 3000 });
        } else if (spareTire === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Is there a reserve or spare tire?', life: 3000 });
        } else if (bodyNoSpareTire === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Reserve or spare tire marked with body number?', life: 3000 });
        } else if (bodyNoBattery >= 4) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Battery marked with body number?', life: 3000 });
        } else if (vehicleWeight === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Correct vehicle weight & capacity labels?', life: 3000 });
        } else if (vehicleStatus === '') { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Vehicle status', life: 3000 });
        } else if (partsIncluded.length <= 0) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'PLEASE INCLUDE REMARKS', life: 3000 });
        } else if (checklistParts.length <= 0) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'checklistpasrts', life: 3000 });
        } else {
            setIsLoading(true);
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            let partsSubmit = [];
            checklistParts.map((x) => {
                partsSubmit.push({quantity: x.quantity, check_list_parts: x.name});
            })
            
            axios.post(process.env.REACT_APP_SERVER_NAME + 'report/checklist/', {
                body_no: bodyNo,
                parts: partsSubmit,
                parts_included: partsIncluded,
                email: email,
                odometer: actualOdometer,
                job_desc: jobDescription.val,
                pair_ewd: pairEWD,
                color_ewd: colorEWD,
                body_no_ewd: bodyNoEWD,
                body_no_fl_tire: bodyNoFLTire,
                body_no_fr_tire: bodyNoFRTire,
                body_no_rl_tire: bodyNoRLTire,
                body_no_rr_tire: bodyNoRRTire,
                spare_tire: spareTire,
                body_no_spare: bodyNoSpareTire,
                body_no_batt: bodyNoBattery,
                vehicle_wt: vehicleWeight,
                remarks: "",
                status: vehicleStatus,
                job_order: reportNo.job_no,
                task: task,
                noted_by: null
            }, config)
            .then((res) => {
                console.log(res.data)
                if (refImageUpload.current.state.files.length <= 0) {
                    submitChecklistAfter();
                } else {
                    let formData = new FormData();
                    refImageUpload.current.state.files.map((f, index) => {
                        formData.append("images[" + index + "]image", f);
                        formData.append("images[" + index + "]mode", "cl");
                        formData.append("images[" + index + "]image_name", res.data.check_list_id);
                        return null;
                    })
                    axios.post(process.env.REACT_APP_SERVER_NAME + 'image/report-image/', formData, config)
                    .then((res) => {
                        submitChecklistAfter();
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong.', life: 3000 });
                    });
                }
            })
            .catch((err) => {
                
            });
        }
    }

    const submitChecklistAfter = () => {
        setIsLoading(false);
        setReportNo('');
        setTask('');
        setEmail('');
        setScheduleDate('');
        setLocation('');
        setBodyNo('');
        setMake('');
        setActualOdometer('');
        setJobDescription('');
        setPairEWD(null);
        setColorEWD('');
        setBodyNoEWD(null);
        setBodyNoFLTire(null);
        setBodyNoFRTire(null);
        setBodyNoRLTire(null);
        setBodyNoRRTire(null);
        setSpareTire(null);
        setBodyNoSpareTire(null);
        setBodyNoBattery(4);
        setVehicleWeight(null);
        setVehicleStatus('');
        setPartsIncluded([]);
        setChecklistParts([]);
        setPartsName('');
        window.scrollTo({top: 0, left: 0, behavior:'smooth'});
        refImageUpload.current.clear();
        setIsLoading(false);
        setMessage({title:"CREATE", content:"Successfully created."});
        onClick('displayMessage');
        getInspectionNotCreated();
        getChecklistParts();
    }

    const deleteChecklistParts = (value) => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.delete(process.env.REACT_APP_SERVER_NAME + 'report/checklist-parts/' + value + '/', config)
            .then((res) => {
                toast.current.show({ severity: 'success', summary: 'DELETED', detail: 'Delete succesfully.', life: 3000 });
                getChecklistParts();
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Delete Task Error', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const onChangeReportNo = (value) => {
        setReportNo(value);
        setTask(value.task.task_id);
        setScheduleDate(value.task.schedule_date);
        setLocation(value.body_no.current_loc);
        setBodyNo(value.body_no.body_no);
        setMake(value.body_no.make);
    }

    const onChangePartsIncluded = (e) => {
        let selectedPartsIncluded = [...partsIncluded];
        if (e.checked) {
            selectedPartsIncluded.push(e.value);
        } else {
            selectedPartsIncluded.splice(selectedPartsIncluded.indexOf(e.value), 1);
        }
        setPartsIncluded(selectedPartsIncluded);
    }

    const dialogFuncMap = {
        'displayPartsName': setDisplayPartsName,
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

    const onClearImageFile = () => {
        //empty
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
                        <h4>CHECKLIST REPORT</h4>
                    </div>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <div className="card card-w-title">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>REPORT No.:</b></h6>
                                    <Dropdown value={reportNo} options={inspectionNotCreatedList} optionLabel="job_id" placeholder="Select Job Number" 
                                    onChange={event => onChangeReportNo(event.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>YOUR EMAIL:</b></h6>
                                    <InputText placeholder="Input Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>SCHEDULE DATE:</b></h6>
                                    <InputText placeholder="Input Schedule Date" value={scheduleDate} disabled/>
                                </div>

                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>LOCATION:</b></h6>
                                    <InputText placeholder="Input Location" value={location} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>BODY No.:</b></h6>
                                    <InputText placeholder="Input Body No." value={bodyNo} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>MAKE/MODEL:</b></h6>
                                    <InputText placeholder="Input Make/Model" value={make} disabled/>
                                </div>

                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>ACTUAL ODOMETER READING:</b></h6>
                                    <InputText placeholder="Input Reading" value={actualOdometer} onChange={(e) => setActualOdometer(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>JOB DESCRIPTION:</b></h6>
                                    <Dropdown value={jobDescription} options={jobDescriptionOptions} optionLabel="name" placeholder="Select Job Description" 
                                    onChange={event => setJobDescription(event.target.value)} />
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Is there a pair of Early Warning Device?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="ewd1" onChange={(e) => setPairEWD(true)} checked={pairEWD === true}/>
                                            <label htmlFor="ewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="ewd2" onChange={(e) => setPairEWD(false)} checked={pairEWD === false}/>
                                            <label htmlFor="ewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>What color of Early Warning Device is available?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setColorEWD('yo')} checked={colorEWD === 'yo'}/>
                                            <label htmlFor="cewd1">Yellow Only</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setColorEWD('ro')} checked={colorEWD === 'ro'}/>
                                            <label htmlFor="cewd2">Red Only</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd3" onChange={(e) => setColorEWD('bo')} checked={colorEWD === 'bo'}/>
                                            <label htmlFor="cewd3">Both</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Early Warning Device marked with body number?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setBodyNoEWD(true)} checked={bodyNoEWD === true}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setBodyNoEWD(false)} checked={bodyNoEWD === false}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Front left hand tire marked with body number?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setBodyNoFLTire(true)} checked={bodyNoFLTire === true}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setBodyNoFLTire(false)} checked={bodyNoFLTire === false}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Front right hand tire marked with body number?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setBodyNoFRTire(true)} checked={bodyNoFRTire === true}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setBodyNoFRTire(false)} checked={bodyNoFRTire === false}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Rear right hand tire marked with body number?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setBodyNoRRTire(true)} checked={bodyNoRRTire === true}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setBodyNoRRTire(false)} checked={bodyNoRRTire === false}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Rear left hand tire marked with body number?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setBodyNoRLTire(true)} checked={bodyNoRLTire === true}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setBodyNoRLTire(false)} checked={bodyNoRLTire === false}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Is there a reserve or spare tire?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setSpareTire(true)} checked={spareTire === true}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setSpareTire(false)} checked={spareTire === false}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Reserve or spare tire marked with body number?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setBodyNoSpareTire(true)} checked={bodyNoSpareTire === true}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setBodyNoSpareTire(false)} checked={bodyNoSpareTire === false}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Battery marked with body number?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setBodyNoBattery(0)} checked={bodyNoBattery === 0}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setBodyNoBattery(1)} checked={bodyNoBattery === 1}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd3" onChange={(e) => setBodyNoBattery(2)} checked={bodyNoBattery === 2}/>
                                            <label htmlFor="cewd3">Other</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Correct vehicle weight & capacity labels?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setVehicleWeight(true)} checked={vehicleWeight === true}/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setVehicleWeight(false)} checked={vehicleWeight === false}/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>Vehicle status</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" onChange={(e) => setVehicleStatus('Operational')} checked={vehicleStatus === 'Operational'}/>
                                            <label htmlFor="cewd1">Operational</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" onChange={(e) => setVehicleStatus('noperational')} checked={vehicleStatus === 'noperational'}/>
                                            <label htmlFor="cewd2">Non operational</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                    <h6><b>PLEASE INCLUDE REMARKS:</b></h6>
                                    <small><i>*If upon inspection concern is not related or out of scope, kindly put "Unit is in good condition"</i></small>
                                    <div className="p-field-checkbox" style={{paddingTop:'10px'}}>
                                        <Checkbox inputId="cb1" value={0} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(0) !== -1}/>
                                        <label htmlFor="cb1">Unit is in good condition, no concern and defect found.</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={1} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(1) !== -1}/>
                                        <label htmlFor="cb1">For pullout to check with the dealership</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={2} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(2) !== -1}/>
                                        <label htmlFor="cb1">For warranty checking with the dealership</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={3} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(3) !== -1}/>
                                        <label htmlFor="cb1">For body repair and insurance claim</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={4} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(4) !== -1}/>
                                        <label htmlFor="cb1">For further technical diagnosis</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={5} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(5) !== -1}/>
                                        <label htmlFor="cb1">Not onsite</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={6} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(6) !== -1}/>
                                        <label htmlFor="cb1">Keys not available</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={7} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(7) !== -1}/>
                                        <label htmlFor="cb1">Cracked windshield</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={8} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(8) !== -1}/>
                                        <label htmlFor="cb1">Rough idling, Cleaned and adjust throttle valve</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={9} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(9) !== -1}/>
                                        <label htmlFor="cb1">Worn out brake pads</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={10} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(10) !== -1}/>
                                        <label htmlFor="cb1">Worn out brake shoe</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={11} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(11) !== -1}/>
                                        <label htmlFor="cb1">Low engine oil</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={12} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(12) !== -1}/>
                                        <label htmlFor="cb1">Worn out drive belt component</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={13} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(13) !== -1}/>
                                        <label htmlFor="cb1">Concern out of scope</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb1" value={14} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(14) !== -1}/>
                                        <label htmlFor="cb1">Other</label>
                                    </div>
                                    
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>WHERE THERE PARTS REPLACED?</b></h6>
                                    <small><i>*If yes, KINDLY INDICATE the PARTS REPLACED and the QUANTITY. If no, kindly tick NA.</i></small>
                                    <div style={{paddingBottom:'10px'}}></div>
                                    {
                                        checklistParts.map((x, index) =>
                                            <div className="p-grid p-fluid" key={index}>
                                                <div className="p-field p-col-12">
                                                    <label htmlFor={"cb" + index}>{x.name}</label><br></br>
                                                    <InputNumber style={{width:'120px'}} inputId={"cb" + index} value={x.quantity} onChange={(e) => updateChecklistPartsQuantity(index, x.partsId, x.name, e.value)} showButtons buttonLayout="horizontal" step={1}
                                                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" min={0}/>
                                                    <Button style={{width: '37px', height: '37px'}} icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => deleteChecklistParts(x.partsId)} /* disabled={checklistParts.length === 1} *//>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <Button icon="pi pi-plus" onClick={() => onClick('displayPartsName')} style={{width: '50px'}}/>
                                </div>

                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>HOW MANY PARTS WERE REPLACED?</b></h6>
                                    <small><i>*Kindly indicate the variety of replaced parts. If none, kindly type NA</i></small>
                                    <InputText placeholder="Input Number" value={checklistParts.reduce((prev,next) => prev + next.quantity,0)} disabled/>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 image-upload">
                                    <h6><b>ACTUAL VEHICLE (include photos of interior and exterior defects, vehicle capacity sticker, EWD, tire marks):</b></h6>
                                    <FileUpload ref={refImageUpload} customUpload multiple accept="image/*" maxFileSize={1000000} onClear={onClearImageFile}
                                        emptyTemplate={<p className="p-m-0">Click Choose and select image files to upload.</p>} />
                                </div>
                                <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                    <Button label="SUBMIT" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitChecklist()}/>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <Dialog header="PARTS" visible={displayPartsName} style={{ width: '310px' }} onHide={() => onHide('displayPartsName')} blockScroll={true}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{paddingTop: '20px'}}>
                            <h6><b>PARTS NAME:</b></h6>
                            <InputText placeholder="Input Parts Name" value={partsName} onChange={(e) => setPartsName(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                            <Button label="ADD" onClick={() => updateChecklistParts()}/>
                        </div>
                    </div>
                </Dialog>

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
    )

}