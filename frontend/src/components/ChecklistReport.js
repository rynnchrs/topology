import React, {useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import axios from "axios";

export default function ChecklistReport() {

    const jobDescriptionOptions = [{name: 'REPAIR', val: 're'}, {name: 'INSPECTION', val: 'in'}, {name: 'PMS', val: 'pm'}];

    const [inspectionNotCreatedList, setInspectionNotCreatedList] = useState([]);
    const [bodyNoList, setBodyNoList] = useState([]);
    const [suggestionsBodyNo, setSuggestionsBodyNo] = useState(null);
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
    const [bodyNoBattery, setBodyNoBattery] = useState(4);
    const [vehicleWeight, setVehicleWeight] = useState(null);
    const [vehicleStatus, setVehicleStatus] = useState('');
    const [remarks, setRemarks] = useState('');

    // const [checklistParts, setChecklistParts] = useState([
    //     {id: 0, name: "NS40 battery", quantity: 0},
    //     {id: 1, name: "NS60 battery", quantity: 0}
    // ]);
    const [checklistParts, setChecklistParts] = useState([]);
    const [partsName, setPartsName] = useState('');

    const refImageUpload = useRef(null);

    const toast = useRef(null);

    const [displayPartsName, setDisplayPartsName] = useState(false);

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
        setMake(value.make = value.make === 'L30' ? 'L300 Exceed 2.5D MT' : value.make === 'SUV' ? 'Super Carry UV' : value.make ===  'G15' ? 'Gratour midi truck 1.5L' : value.make ===  'G12' ? 'Gratour midi truck 1.2L' : '');
    }

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
        console.log(jobDescription)
        console.log(bodyNo)
        console.log(reportNo)

        if (email === '') {
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'EMAIL', life: 3000 });
        } if (email === '') {
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
        } else if (bodyNoBattery >= 4) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Battery marked with body number?', life: 3000 });
        } else if (vehicleWeight === null) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Correct vehicle weight & capacity labels?', life: 3000 });
        } else if (vehicleStatus === '') { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'Vehicle status', life: 3000 });
        } else if (remarks === '') { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'REMARKS', life: 3000 });
        } else if (checklistParts.length <= 0) { 
            toast.current.show({ severity: 'error', summary: 'REQUIRED FIELD', detail: 'checklistpasrts', life: 3000 });
        } else {
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };


            let partsSubmit = [];
            let partsIncluded = [];
            checklistParts.map((x) => {
                partsSubmit.push({quantity: x.quantity, check_list_parts: x.name});
                partsIncluded.push(x.partsId)
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
                body_no_batt: bodyNoBattery,
                vehicle_wt: vehicleWeight,
                remarks: remarks,
                status: vehicleStatus,
                job_order: reportNo.job_no,
                task: task,
                noted_by: null
            }, config)
            .then((res) => {
                toast.current.show({ severity: 'success', summary: 'CREATE', detail: 'Done', life: 3000 });
            })
            .catch((err) => {
                
            });
        }
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

    // const onChangeJobType = (value) => {
    //     setJobDescription(value);
    // }

    const onChangeReportNo = (value) => {
        console.log(value);
        setReportNo(value);
        setTask(value.task.task_id);
        setScheduleDate(value.task.schedule_date);
        setLocation(value.task.body_no.current_loc);
        setBodyNo(value.task.body_no.body_no);
        setMake(value.task.body_no.make);
    }

    const dialogFuncMap = {
        'displayPartsName': setDisplayPartsName,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    return(
        <div>
            <Toast ref={toast}/>
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
                                    {/* <Calendar placeholder="Select Date" value={scheduleDate} onChange={(e) => setScheduleDate(e.value)} showIcon readOnlyInput/> */}
                                    <InputText placeholder="Input Schedule Date" value={scheduleDate} disabled/>
                                </div>

                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>LOCATION:</b></h6>
                                    {/* <Dropdown value={location} options={locationList} optionLabel="location" placeholder="Select Location" onChange={event => setLocation(event.target.value)}/> */}
                                    <InputText placeholder="Input Location" value={location} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>BODY No.:</b></h6>
                                    {/* <AutoComplete forceSelection field="body_no" placeholder="Body No." suggestions={suggestionsBodyNo} completeMethod={searchListBodyNo} 
                                    value={bodyNo} onSelect={(e) => onSelectBodyNo(e.value)} onChange={(e) => setBodyNo(e.target.value)}/> */}
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

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>Reserve or spare tire marked with body number?</b></h6>
                                    <div className="p-formgroup-inline">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                            <label htmlFor="cewd3">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
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
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>PLEASE INCLUDE REMARKS:</b></h6>
                                    <small><i>*If upon inspection concern is not related or out of scope, kindly put "Unit is in good condition"</i></small>
                                    <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                        value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
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
                                    <InputText placeholder="Input Number" value={checklistParts.length} disabled/>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 image-upload">
                                    <h6><b>ACTUAL VEHICLE (include photos of interior and exterior defects, vehicle capacity sticker, EWD, tire marks):</b></h6>
                                    <FileUpload ref={refImageUpload} customUpload multiple accept="image/*" maxFileSize={1000000}
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
            </div>

        </div>
    )

}