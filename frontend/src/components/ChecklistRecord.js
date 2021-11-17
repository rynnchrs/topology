import React, {useState, useEffect, useRef } from 'react';
// import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { format } from 'date-fns';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QrReader from 'react-qr-reader'

export default function ChecklistRecord() {

    //search fields
    const [searchChecklistNumber, setSearchChecklistNumber] = useState('');
    const [searchBodyNo, setSearchBodyNo] = useState('');
    const [searchDateCreated, setSearchDateCreated] = useState(null);

    const jobDescriptionOptions = [{name: 'REPAIR', val: 're'}, {name: 'INSPECTION', val: 'in'}, {name: 'PMS', val: 'pm'}];

    const [checklistRecordList, setChecklistRecordList] = useState([]);
    const [flagChecklistRecordList, setFlagChecklistRecordList] = useState(false);
    const [checklistRecordDetails, setCheckListRecordDetails] = useState([]);
    const [delChecklistID, setDelChecklistID] = useState('');
    const [flagChecklistRecordMethod, setFlagChecklistRecordMethod] = useState('');
    const [qrResult, setQrResult] = useState('No Result');

    const [reviseColor, setReviseColor] = useState(Array(30).fill(""));
    const [reviseText, setReviseText] = useState(Array(30).fill(""));
    const [reviseColorPI, setReviseColorPI] = useState(Array(12).fill(""));

    //variables to be save
    const [checklistID, setChecklistID] =  useState('');
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
    const [saveChecklistParts, setSaveChecklistParts] = useState([]);
    const [partsName, setPartsName] = useState('');
    const refImageUpload = useRef(null);
    const [reportImage, setReportImage] = useState([{ id: "", image: "" }]);
    const [holdImageID, setHoldImageID] = useState("");

    //paginator
    const [first, setFirst] = useState(0);
    const rows = 10;
    const [flagPages, setFlagPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const dt = useRef(null);
    const toast = useRef(null);

    const [displayChecklistRecordEdit, setDisplayChecklistRecordEdit] = useState(false);
    const [displayPartsName, setDisplayPartsName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});
    const [displayConfirmDeleteImage, setDisplayConfirmDeleteImage] = useState(false);
    const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);
    const [displayPDF, setDisplayPDF] = useState(false);
    const [displayQR, setDisplayQR] = useState(false);

    useEffect(() => {
        /* eslint-disable no-unused-expressions */
        flagChecklistRecordList ? assignChecklistRecordEdit(checklistRecordDetails) : '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flagChecklistRecordList]);

    //for pagination
    useEffect(() => {
        try {
            const sentPage = (first / rows) + 1;

            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            let sIRNumber = searchChecklistNumber;
            let sBodyNo = searchBodyNo;
            let sDateCreated = searchDateCreated === null ? "" : format(searchDateCreated, 'yyyy-MM-dd');

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'report/checklist/?check_list_id=' + sIRNumber 
                + '&body_no=' + sBodyNo
                + '&date_created=' + sDateCreated, config)
                .then((res) => {
                    setTotalCount(res.data.count);
                    setChecklistRecordList(res.data.results);
                })
                .catch((err) => {
                    
                });
        } catch(err) {

        }
    }, [flagPages]); // eslint-disable-line react-hooks/exhaustive-deps

    //for pagination
    const onPageChange = (event) =>  {
        setFirst(event.first);
        if (event.first > first) {
            setFlagPages(flagPages + 1);
        } else if (event.first < first) {
            setFlagPages(flagPages - 1);
        } else {

        }          
    }

    const getChecklistParts = (value) => {
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
                    let chck = value.filter(item => item.name === i.name);
                    if (chck.length <= 0) {
                        p.push({partsId: i.id, name: i.name, quantity: 0});
                    } else {
                        p.push({partsId: i.id, name: i.name, quantity: chck[0].quantity});
                    }
                })
                setChecklistParts(p);
                setTimeout(() => {
                    if (flagChecklistRecordMethod === 'pdf') {
                        onClick('displayPDF');
                        convertPDF();
                    } else {
                        setIsLoading(false);
                        onClick('displayChecklistRecordEdit');
                    }
                }, 1500);
            })
            .catch((err) => {
                
            });
    }

    const getCheckListRecordDetails = (value) => {
        setIsLoading(true);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'report/checklist/' + value + '/', config)
            .then((res) => {
                setCheckListRecordDetails(res.data);
                axios.get(process.env.REACT_APP_SERVER_NAME + 'image/report-image/' + res.data.check_list_id +'/?mode=cl', config)
                    .then((res) => {
                        setReportImage(res.data);
                        setFlagChecklistRecordList(true);
                        flagChecklistRecordList ? setIsLoading(false) : '';
                    })
                    .catch((err) => {
                        setIsLoading(false);
                    });
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }

    const assignChecklistRecordEdit = (value) => {
        console.log("chk: ",value)
        setChecklistID(value.check_list_id)
        setReportNo(value.job_order.job_id);
        setTask(value.job_order.task.task_id);
        onChangeValue('f0', value.email);
        let splitScheduleDate = value.job_order.task.schedule_date.split("-");
        let gmtScheduleDate = new Date(+splitScheduleDate[0], splitScheduleDate[1] - 1, +splitScheduleDate[2]);
        setScheduleDate(format(gmtScheduleDate, 'yyyy-MM-dd'));
        setLocation(value.job_order.body_no.current_loc);
        setBodyNo(value.job_order.body_no.body_no);
        setMake(value.job_order.body_no.make = value.job_order.body_no.make === 'L30' ? 'L300 Exceed 2.5D MT' : value.job_order.body_no.make === 'SUV' ? 'Super Carry UV' : value.job_order.body_no.make ===  'G15' ? 'Gratour midi truck 1.5L' : value.job_order.body_no.make ===  'G12' ? 'Gratour midi truck 1.2L' : '');
        onChangeValue('f1', value.odometer);
        onChangeValue('f2', jobDescriptionOptions.find(x => x.name === value.job_desc.toUpperCase()));
        onChangeValue('f3', value.pair_ewd);
        onChangeValue('f5', value.color_ewd = value.color_ewd === 'Yellow only' ? 'yo' : value.color_ewd === 'Red only' ? 'ro' : value.color_ewd ===  'both' ? 'bo' : '');
        onChangeValue('f8', value.body_no_ewd);
        onChangeValue('f10', value.body_no_fl_tire);
        onChangeValue('f12', value.body_no_fr_tire);
        onChangeValue('f14', value.body_no_rr_tire);
        onChangeValue('f16', value.body_no_rl_tire);
        onChangeValue('f18', value.spare_tire);
        onChangeValue('f20', value.body_no_spare);
        onChangeValue('f22', value.body_no_batt);
        onChangeValue('f25', value.vehicle_wt);
        onChangeValue('f27', value.status);

        let getPartsIncluded = [...partsIncluded];
        if (value.parts_included.includes('Unit is in good condition')) {
            getPartsIncluded.push(0);
        }
        if (value.parts_included.includes('Cracked windshield')) {
            getPartsIncluded.push(1);
        }
        if (value.parts_included.includes('Rough idling. Cleaned and adjust throttle valve')) {
            getPartsIncluded.push(2);
        }
        if (value.parts_included.includes('For warranty')) {
            getPartsIncluded.push(3);
        }
        if (value.parts_included.includes('For body repair')) {
            getPartsIncluded.push(4);
        }
        if (value.parts_included.includes('Concern out of scope')) {
            getPartsIncluded.push(5);
        }
        if (value.parts_included.includes('Worn out brake pads')) {
            getPartsIncluded.push(6);
        }
        if (value.parts_included.includes('Worn out brake shoe')) {
            getPartsIncluded.push(7);
        }
        if (value.parts_included.includes('Low engine oil')) {
            getPartsIncluded.push(8);
        }
        if (value.parts_included.includes('Worn out drive belt')) {
            getPartsIncluded.push(9);
        }
        if (value.parts_included.includes('Others')) {
            getPartsIncluded.push(10);
        }
        
        // setPartsIncluded(getPartsIncluded);
        onChangeValue('f29', getPartsIncluded);

        let getParts = [];
        value.parts.map((i) => {
            getParts.push({partsId: i.id, name: i.check_list_parts, quantity: i.quantity});
        })
        setSaveChecklistParts(getParts);
        getChecklistParts(getParts);
    }

    const reportImageTemplate = (reportImage) => {
        return (
            <div>
                <center>
                    <img src={process.env.REACT_APP_SERVER_NAME + reportImage.image.substring(1)} alt="" style={{maxWidth:'100%', maxHeight: '100%'}}/>
                </center>
                <center>
                    <Button style={{width: '37px', height: '37px'}} icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={(e) => {setHoldImageID(reportImage.id); onClick('displayConfirmDeleteImage');}}/>
                </center>
            </div>
        );
    }

    const submitDeleteImage = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        axios
            .delete(process.env.REACT_APP_SERVER_NAME + 'image/report-image/'+ checklistID +'/?mode=cl&id=' + holdImageID, config)
            .then((res) => {
                getCheckListRecordDetails(checklistID);
                setMessage({title:"DELETE", content:"Successfully deleted."});
                onHide('displayConfirmDeleteImage');
                onClick('displayMessage');
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Delete Image Error', detail: 'Something went wrong.', life: 5000 });
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
                setChecklistParts(checklistParts => [...checklistParts, {partsId: res.data[0].id, name: res.data[0].name, quantity: 0}]);
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

    const [timeOutId, setTimeOutId] = useState(null);
    useEffect(() => {
        clearTimeout(timeOutId);
        setTimeOutId(setTimeout(() => {
            submitSearch();
        }, 1000));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchChecklistNumber]);

    useEffect(() => {
        clearTimeout(timeOutId);
        setTimeOutId(setTimeout(() => {
            submitSearch();
        }, 1000));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchBodyNo]);

    const submitSearch = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        let sChecklistNumber = searchChecklistNumber;
        let sBodyNo = searchBodyNo;
        let sDateCreated = searchDateCreated === null ? "" : format(searchDateCreated, 'yyyy-MM-dd');

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'report/checklist/?check_list_id=' + sChecklistNumber 
            + '&body_no=' + sBodyNo
            + '&date_created=' + sDateCreated, config)
            .then((res) => {
                setTotalCount(res.data.count);
                setChecklistRecordList(res.data.results);
                onHide('displayQR');
                setQrResult('No Result');
            })
            .catch((err) => {
                onHide('displayQR');
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const submitEditChecklist = () => {
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
            checklistParts.filter(f => f.quantity !== 0).map((x) => {
                partsSubmit.push({quantity: x.quantity, check_list_parts: x.name});
            })

            // console.log("bsp: ",bodyNoSpareTire )
            // console.log("partsInc: ",partsIncluded )

            axios.put(process.env.REACT_APP_SERVER_NAME + 'report/checklist/' + checklistID + '/', {
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
                job_order: reportNo,
                task: task,
                noted_by: null
            }, config)
            .then((res) => {
                if (refImageUpload.current.state.files.length <= 0) {
                    submitEditChecklistAfter();
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
                        submitEditChecklistAfter();
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong.', life: 3000 });
                    });
                }
            })
            .catch((err) => {
                if (err.toJSON().message === 'Network Error'){
                    toast.current.show({ severity: 'error', summary: 'NETWEORK ERROR', detail: 'Please check internet connection.', life: 3000 });
                } else if (err.response.data.errors[0].email) {
                    toast.current.show({ severity: 'error', summary: 'YOUR EMAIL', detail: 'Invalid Email', life: 3000 });
                }
                setIsLoading(false);
            });
        }
    }

    const submitEditChecklistAfter = () => {
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
        onHide('displayChecklistRecordEdit');
        setMessage({title:"UPDATE", content:"Successfully updated."});
        onClick('displayMessage');
        // getInspectionNotCreated();
        // getChecklistParts();
    }

    const submitDeleteChecklist = () => {
        setIsLoading(true);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        axios
            .delete(process.env.REACT_APP_SERVER_NAME + 'report/checklist/' + delChecklistID + '/', config)
            .then((res) => {
                if (res.data === `Can't delete this because it's being use by Task Scheduling`) {
                    setIsLoading(false);
                    setMessage({title:"DELETE FAILED", content:"Can't delete this because it's being use by Task Scheduling."});
                    onHide('displayConfirmDelete');
                    onClick('displayMessage');
                } else {
                    getChecklistRecord();
                    setIsLoading(false);
                    setMessage({title:"DELETE", content:"Successfully deleted."});
                    onHide('displayConfirmDelete');
                    onClick('displayMessage');
                }
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Delete Record Error', detail: 'Something went wrong.', life: 5000 });
                setIsLoading(false);
            });
    }

    const getChecklistRecord = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'report/checklist/', config)
            .then((res) => {
                setTotalCount(res.data.count);
                setChecklistRecordList(res.data.results);
            })
            .catch((err) => {
                
            });
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
                getChecklistParts(checklistParts);
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Delete Task Error', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const onChangePartsIncluded = (e) => {
        let selectedPartsIncluded = [...partsIncluded];
        if (e.checked) {
            selectedPartsIncluded.push(e.value);
        } else {
            selectedPartsIncluded.splice(selectedPartsIncluded.indexOf(e.value), 1);
        }
        // setPartsIncluded(selectedPartsIncluded);
        onChangeValue('f29', selectedPartsIncluded);
    }

    const convertPDF = () => {
        try {
            const input = document.getElementById('toPdf');

            html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                // console.log("imageW: ", imgData)

                let imgWidth = 210;
                let imgHeight = (canvas.height * imgWidth) / canvas.width;
                // let imgHeight = ((canvas.height * imgWidth) / 2454)*1.24;
                console.log("cw: ", canvas.width)
                console.log("ch: ", canvas.height)
                console.log("ih: ", imgHeight)


                var img1 = new Image();
                img1.src = imgData;
                img1.height = 250;
                

                let pageheight = 297;

                // var pdf = new jsPDF();
                var pdf = new jsPDF('p', 'mm', 'a4');
                // var pdf = new jsPDF('p', 'mm', [210,280]);

                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();

                console.log("h: ", height)
                console.log("w: ", width)

                // const pdf = new jsPDF({
                //     orientation: "p",
                //     unit: "mm",
                //     format: [210, 297],
                // });

                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();

                let position = 10;
                var heightLeft = imgHeight;
                var appendHeight = pageheight;

                pdf.addImage(imgData, 'PNG', 14, position, imgWidth-32, imgHeight);
                // pdf.addImage(imgData, 'PNG', 14, position, imgWidth-32, appendHeight);

                heightLeft -= pageheight;
                console.log("HL: ", heightLeft)

                while (heightLeft >= 0) {
                    width = pdf.internal.pageSize.getWidth();
                    height = pdf.internal.pageSize.getHeight();


                    
                    
                    position = heightLeft - imgHeight;
                    console.log("pos: ", position)
                    appendHeight = position + 280;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 14, position, imgWidth-32, imgHeight);
                    heightLeft -= pageheight;
                    console.log("HL: ", heightLeft)
                    
                }

                // // pdf.addImage(imgData, 'JPEG', 18, 8, width-40, height-18);\
                window.open(pdf.output('bloburl'));
                console.log(pdf.output('bloburl'));
                onHide('displayPDF');
                setIsLoading(false);
            });
        } catch (err){
            console.log(err)
        }
    }

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "https://cdnjs.cloudflare.com/ajax/libs/react/16.6.1/umd/react.production.min.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //       document.body.removeChild(script);
    //     }
    //   }, []);
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.6.1/umd/react-dom.production.min.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //       document.body.removeChild(script);
    //     }
    //   }, []);
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.min.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //       document.body.removeChild(script);
    //     }
    //   }, []);

    

    // const convertPDF = () => {
    //     try {
    //         const rawHTML = document.getElementById('toPdf');

    //         html2canvas(rawHTML)
    //         .then((canvas) => {
    //             const imageData = canvas.toDataURL('image/png');
    //             var image = new Image();
    //             image = Canvas2Image.convertToJPEG(canvas);

    //             const pdf = new jsPDF();

    //             pdf.addImage(imageData, 'PNG', 12, 10);

    //             var croppingYPosition = 1095;
    //             count = (image.height) / 1095;

    //             console.log("imgH: ", image.height);
    //             console.log("cnt: ", count);

                
    //         })
            
    //     } catch (err){
    //         console.log(err)
    //     }
    // }

    const handleScan = data => {
        if (data) {
            setQrResult(data);
            setTimeout(() => {
                setSearchBodyNo(data);
            }, 50);
        }
    }

    const handleError = data => {
        
    }

    const updateRevise = (index, color, text) => {
        reviseColor[index] = color;
        reviseText[index] = text;
    }

    const updateRevisePI = (index, color) => {
        reviseColorPI[index] = color
    }

    const onChangeValue = (id, value) => {
        /* eslint-disable no-unused-expressions */
        let chkd = checklistRecordDetails;
        let arrIndex = id.substring(1);
        let r = "red";
        let e = "";
        let dt = "";
        switch (id) {
            case 'f0':
                setEmail(value);
                if (typeof(chkd.revised.email) === "undefined") {
                    value !== chkd.email ? updateRevise(arrIndex, r, chkd.email) : updateRevise(arrIndex, e, e);
                } else {
                    value !== chkd.revised.email ? updateRevise(arrIndex, r, chkd.revised.email) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f1':
                setActualOdometer(value);
                if (typeof(chkd.revised.odometer) === "undefined") {
                    parseInt(value) !== chkd.odometer ? updateRevise(arrIndex, r, chkd.odometer) : updateRevise(arrIndex, e, e);
                } else {
                    parseInt(value) !== chkd.revised.odometer ? updateRevise(arrIndex, r, chkd.revised.odometer) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f2':
                setJobDescription(value);
                if (typeof(chkd.revised.job_desc) === "undefined") {
                    value.name !== chkd.job_desc.toUpperCase() ? updateRevise(arrIndex, r, chkd.job_desc.toUpperCase()) : updateRevise(arrIndex, e, e);
                } else {
                    value.name !== chkd.revised.job_desc[0].toUpperCase() ? updateRevise(arrIndex, r, chkd.revised.job_desc[0].toUpperCase()) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f3':
                setPairEWD(value);
                if (typeof(chkd.revised.pair_ewd) === "undefined") {
                    if (value !== chkd.pair_ewd) {
                        value ? (updateRevise('3', r, e), updateRevise('4', e, e)) : (updateRevise('3', e, e), updateRevise('4', r, e));
                    } else {
                        updateRevise('3', e, e); updateRevise('4', e, e);
                    }
                } else {
                    if (value !== chkd.revised.pair_ewd) {
                        value ? (updateRevise('3', r, e), updateRevise('4', e, e)) : (updateRevise('3', e, e), updateRevise('4', r, e));
                    } else {
                        updateRevise('3', e, e); updateRevise('4', e, e);
                    }
                }
                break;
            case 'f5':
                setColorEWD(value);
                if (typeof(chkd.revised.color_ewd) === "undefined") {
                    if (value !== chkd.color_ewd) {
                        if (value === 'yo') {
                            updateRevise('5', r, e); updateRevise('6', e, e); updateRevise('7', e, e);
                        } else if (value === 'ro') {
                            updateRevise('5', e, e); updateRevise('6', r, e); updateRevise('7', e, e);
                        } else {
                            updateRevise('5', e, e); updateRevise('6', e, e); updateRevise('7', r, e);
                        }
                    } else {
                        updateRevise('5', e, e); updateRevise('6', e, e); updateRevise('7', e, e);
                    }
                } else {
                    if (value !== chkd.revised.color_ewd) {
                        if (value === 'yo') {
                            updateRevise('5', r, e); updateRevise('6', e, e); updateRevise('7', e, e);
                        } else if (value === 'ro') {
                            updateRevise('5', e, e); updateRevise('6', r, e); updateRevise('7', e, e);
                        } else {
                            updateRevise('5', e, e); updateRevise('6', e, e); updateRevise('7', r, e);
                        }
                    } else {
                        updateRevise('5', e, e); updateRevise('6', e, e); updateRevise('7', e, e);
                    }
                }
                break;
            case 'f8':
                setBodyNoEWD(value);
                if (typeof(chkd.revised.body_no_ewd) === "undefined") {
                    if (value !== chkd.body_no_ewd) {
                        value ? (updateRevise('8', r, e), updateRevise('9', e, e)) : (updateRevise('8', e, e), updateRevise('9', r, e));
                    } else {
                        updateRevise('8', e, e); updateRevise('9', e, e);
                    }
                } else {
                    if (value !== chkd.revised.body_no_ewd) {
                        value ? (updateRevise('8', r, e), updateRevise('9', e, e)) :  (updateRevise('8', e, e), updateRevise('9', r, e));
                    } else {
                        updateRevise('8', e, e); updateRevise('9', e, e);
                    }
                }
                break;
            case 'f10':
                setBodyNoFLTire(value);
                if (typeof(chkd.revised.body_no_fl_tire) === "undefined") {
                    if (value !== chkd.body_no_fl_tire) {
                        value ? (updateRevise('10', r, e), updateRevise('11', e, e)) : (updateRevise('10', e, e), updateRevise('11', r, e));
                    } else {
                        updateRevise('10', e, e); updateRevise('11', e, e);
                    }
                } else {
                    if (value !== chkd.revised.body_no_fl_tire) {
                        value ? (updateRevise('10', r, e), updateRevise('11', e, e)) : (updateRevise('10', e, e), updateRevise('11', r, e));
                    } else {
                        updateRevise('10', e, e); updateRevise('11', e, e);
                    }
                }
                break;
            case 'f12':
                setBodyNoFRTire(value);
                if (typeof(chkd.revised.body_no_fr_tire) === "undefined") {
                    if (value !== chkd.body_no_fr_tire) {
                        value ? (updateRevise('12', r, e), updateRevise('13', e, e)) : (updateRevise('12', e, e), updateRevise('13', r, e));
                    } else {
                        updateRevise('12', e, e); updateRevise('13', e, e);
                    }
                } else {
                    if (value !== chkd.revised.body_no_fr_tire) {
                        value ? (updateRevise('12', r, e), updateRevise('13', e, e)) : (updateRevise('12', e, e), updateRevise('13', r, e));
                    } else {
                        updateRevise('12', e, e); updateRevise('13', e, e);
                    }
                }
                break;
            case 'f14':
                setBodyNoRRTire(value);
                if (typeof(chkd.revised.body_no_rr_tire) === "undefined") {
                    if (value !== chkd.body_no_rr_tire) {
                        value ? (updateRevise('14', r, e), updateRevise('15', e, e)) : (updateRevise('15', e, e), updateRevise('15', r, e));
                    } else {
                        updateRevise('14', e, e); updateRevise('15', e, e);
                    }
                } else {
                    if (value !== chkd.revised.body_no_rr_tire) {
                        value ? (updateRevise('14', r, e), updateRevise('15', e, e)) : (updateRevise('14', e, e), updateRevise('15', r, e));
                    } else {
                        updateRevise('14', e, e); updateRevise('15', e, e);
                    }
                }
                break;
            case 'f16':
                setBodyNoRLTire(value);
                if (typeof(chkd.revised.body_no_rl_tire) === "undefined") {
                    if (value !== chkd.body_no_rl_tire) {
                        value ? (updateRevise('16', r, e), updateRevise('17', e, e)) : (updateRevise('16', e, e), updateRevise('17', r, e));
                    } else {
                        updateRevise('16', e, e); updateRevise('17', e, e);
                    }
                } else {
                    if (value !== chkd.revised.body_no_rl_tire) {
                        value ? (updateRevise('16', r, e), updateRevise('17', e, e)) : (updateRevise('16', e, e), updateRevise('17', r, e));
                    } else {
                        updateRevise('16', e, e); updateRevise('17', e, e);
                    }
                }
                break;
            case 'f18':
                setSpareTire(value);
                if (typeof(chkd.revised.spare_tire) === "undefined") {
                    if (value !== chkd.spare_tire) {
                        value ? (updateRevise('18', r, e), updateRevise('19', e, e)) : (updateRevise('18', e, e), updateRevise('19', r, e));
                    } else {
                        updateRevise('18', e, e); updateRevise('19', e, e);
                    }
                } else {
                    if (value !== chkd.revised.spare_tire) {
                        value ? (updateRevise('18', r, e), updateRevise('19', e, e)) : (updateRevise('18', e, e), updateRevise('19', r, e));
                    } else {
                        updateRevise('18', e, e); updateRevise('19', e, e);
                    }
                }
                break;
            case 'f20':
                setBodyNoSpareTire(value);
                if (typeof(chkd.revised.body_no_spare) === "undefined") {
                    if (value !== chkd.body_no_spare) {
                        value ? (updateRevise('20', r, e), updateRevise('21', e, e)) : (updateRevise('20', e, e), updateRevise('21', r, e));
                    } else {
                        updateRevise('20', e, e); updateRevise('21', e, e);
                    }
                } else {
                    if (value !== chkd.revised.body_no_spare) {
                        value ? (updateRevise('20', r, e), updateRevise('21', e, e)) : (updateRevise('20', e, e), updateRevise('21', r, e));
                    } else {
                        updateRevise('20', e, e); updateRevise('21', e, e);
                    }
                }
                break;
            case 'f22':
                setBodyNoBattery(value);
                if (typeof(chkd.revised.body_no_batt) === "undefined") {
                    if (value !== chkd.body_no_batt) {
                        if (value === 0) {
                            updateRevise('22', r, e); updateRevise('23', e, e); updateRevise('24', e, e);
                        } else if (value === 1) {
                            updateRevise('22', e, e); updateRevise('23', r, e); updateRevise('24', e, e);
                        } else {
                            updateRevise('22', e, e); updateRevise('23', e, e); updateRevise('24', r, e);
                        }
                    } else {
                        updateRevise('22', e, e); updateRevise('23', e, e); updateRevise('24', e, e);
                    }
                } else {
                    if (value !== chkd.revised.body_no_batt) {
                        if (value === 0) {
                            updateRevise('22', r, e); updateRevise('23', e, e); updateRevise('24', e, e);
                        } else if (value === 1) {
                            updateRevise('22', e, e); updateRevise('23', r, e); updateRevise('24', e, e);
                        } else {
                            updateRevise('22', e, e); updateRevise('23', e, e); updateRevise('24', r, e);
                        }
                    } else {
                        updateRevise('22', e, e); updateRevise('23', e, e); updateRevise('24', e, e);
                    }
                }
                break;
            case 'f25':
                setVehicleWeight(value);
                if (typeof(chkd.revised.vehicle_wt) === "undefined") {
                    if (value !== chkd.vehicle_wt) {
                        value ? (updateRevise('25', r, e), updateRevise('26', e, e)) : (updateRevise('25', e, e), updateRevise('26', r, e));
                    } else {
                        updateRevise('25', e, e); updateRevise('26', e, e);
                    }
                } else {
                    if (value !== chkd.revised.vehicle_wt) {
                        value ? (updateRevise('25', r, e), updateRevise('26', e, e)) : (updateRevise('25', e, e), updateRevise('26', r, e));
                    } else {
                        updateRevise('25', e, e); updateRevise('26', e, e);
                    }
                }
                break;
            case 'f27':
                value === 'Operational' ? setVehicleStatus('Operational') : setVehicleStatus('noperational');
                if (typeof(chkd.revised.status) === "undefined") {
                    if (value !== chkd.status) {
                        value === 'Operational' ? (updateRevise('27', r, e), updateRevise('28', e, e)) : (updateRevise('27', e, e), updateRevise('28', r, e));
                    } else {
                        updateRevise('27', e, e); updateRevise('28', e, e);
                    }
                } else {
                    if (value !== chkd.revised.status) {
                        value === 'Operational' ? (updateRevise('27', r, e), updateRevise('28', e, e)) : (updateRevise('27', e, e), updateRevise('28', r, e));
                    } else {
                        updateRevise('27', e, e); updateRevise('28', e, e);
                    }
                }
                break;
            case 'f29':
                setPartsIncluded(value);
                let partsIncludedOptions = [
                    "Unit is in good condition",
                    "Cracked windshield",
                    "Rough idling. Cleaned and adjust throttle valve",
                    "For warranty",
                    "For body repair",
                    "Concern out of scope",
                    "Worn out brake pads",
                    "Worn out brake shoe",
                    "Low engine oil",
                    "Worn out drive belt",
                    "Others",
                ];
                let i;
                if (typeof(chkd.revised.parts_included) === "undefined") {
                    for (i = 0; i < 11; i++) {
                        let boolPI1 = value.includes(i);
                        let boolPI2 = chkd.parts_included.includes(partsIncludedOptions[i]);
                        boolPI1 !== boolPI2 ? updateRevisePI(i, r) : updateRevisePI(i, e);
                    }
                } else {
                    for (i = 0; i < 11; i++) {
                        let boolPI1 = value.includes(i);
                        let boolPI2 = chkd.revised.parts_included.includes(partsIncludedOptions[i]);
                        boolPI1 !== boolPI2 ? updateRevisePI(i, r) : updateRevisePI(i, e);
                    }
                }
                break;
            default:
                break;
        }

    }

    const dialogFuncMap = {
        'displayChecklistRecordEdit': setDisplayChecklistRecordEdit,
        'displayPartsName': setDisplayPartsName,
        'displayMessage': setDisplayMessage,
        'displayConfirmDeleteImage': setDisplayConfirmDeleteImage,
        'displayConfirmDelete': setDisplayConfirmDelete,
        'displayPDF': setDisplayPDF,
        'displayQR': setDisplayQR,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        if (name === 'displayConfirmDeleteImage') {
            setHoldImageID("");
        } else if (name === 'displayChecklistRecordEdit') {
            setFlagChecklistRecordList(false);
            setPartsIncluded([]);
            setReviseColor(Array(30).fill(""));
            setReviseText(Array(30).fill(""));
            setReviseColorPI(Array(12).fill(""));
        } else if (name === 'displayPDF') {
            setFlagChecklistRecordList(false);
            setFlagChecklistRecordMethod('');
            setPartsIncluded([]);
            setReviseColor(Array(30).fill(""));
            setReviseText(Array(30).fill(""));
            setReviseColorPI(Array(12).fill(""));
        }
    }

    const renderFooter = (name) => {
        if (name === 'displayMessage') {
            return (
                <div>
                    <Button label="CLOSE" className="p-button-success" onClick={() => onHide(name)} autoFocus/>
                </div>
            );
        } else if (name === 'displayConfirmDeleteImage') {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} autoFocus/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-success" onClick={() => submitDeleteImage()}/>
                </div>
            );
        } else if (name === 'displayConfirmDelete') {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} autoFocus/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-success" onClick={() => submitDeleteChecklist()}/>
                </div>
            );
        }
    }

    const renderHeader = () => {
        return (
            <div style={{paddingTop:'1%'}}><h5><b>CHECKLIST RECORDS</b></h5></div>
        );
    }

    const actionBody = (rowData) => {
        return (
            <div>
                <center>
                <Button style={{marginRight: '3%'}} icon="pi pi-pencil" className="p-button-rounded" onClick={() => getCheckListRecordDetails(rowData.check_list_id)}/>
                <Button style={{marginRight: '3%'}} icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => {setDelChecklistID(rowData.check_list_id); onClick('displayConfirmDelete')}}/>
                <Button icon="pi pi-download" className="p-button-rounded p-button-success" onClick={() => {setFlagChecklistRecordMethod('pdf'); getCheckListRecordDetails(rowData.check_list_id)}}/>
                </center>
            </div>
        );
    }
    
    return(
        <div>
            <div className="gray-out" style={{display: isLoading ? "flex" : "none"}}>
                <ProgressSpinner />
            </div>
            <Toast ref={toast}/>
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Report No." value={searchChecklistNumber} onChange={(event) => setSearchChecklistNumber(event.target.value)}/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Body No." value={searchBodyNo} onChange={(event) => setSearchBodyNo(event.target.value)}/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <Calendar placeholder="Select Date" value={searchDateCreated} onChange={(e) => setSearchDateCreated(e.value)} showIcon/>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <div className="p-d-flex">
                                    <div className="p-mr-3"><Button label="SEARCH" icon="pi pi-search" onClick={() => submitSearch()}/></div>
                                    <div className="p-mr-3"><Button label="SCAN QR" icon="pi pi-th-large" onClick={() => onClick('displayQR')}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <DataTable ref={dt} header={renderHeader()} value={checklistRecordList} className="p-datatable-sm" 
                        resizableColumns columnResizeMode="expand" emptyMessage="No records found">
                        <Column field="check_list_id" header="Checklist No." style={{ paddingLeft: '3%' }}></Column>
                        <Column body={actionBody}></Column>
                    </DataTable>
                    <Paginator first={first} rows={rows} totalRecords={totalCount} onPageChange={onPageChange}></Paginator>
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="dialog-display">
                    <Dialog header="EDIT CHECKLIST" visible={displayChecklistRecordEdit} onHide={() => onHide('displayChecklistRecordEdit')} blockScroll={true}>
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                                    <h4>CHECKLIST REPORT</h4>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="card card-w-title red-field">
                                        <div className="p-grid p-fluid">
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>REPORT No.:</b></h6>
                                                {/* <Dropdown value={reportNo} options={inspectionNotCreatedList} optionLabel="job_id" placeholder="Select Job Number" 
                                                onChange={event => onChangeReportNo(event.target.value)}/> */}
                                                <InputText placeholder="Input Report No." value={reportNo} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[0]}>
                                                <h6><b>YOUR EMAIL:</b></h6>
                                                <InputText placeholder="Input Email" value={email} onChange={(e) => onChangeValue('f0', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[0]}</small>
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

                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[1]}>
                                                <h6><b>ACTUAL ODOMETER READING:</b></h6>
                                                <InputText placeholder="Input Reading" value={actualOdometer} onChange={(e) => onChangeValue('f1', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[1]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[2]}>
                                                <h6><b>JOB DESCRIPTION:</b></h6>
                                                <Dropdown value={jobDescription} options={jobDescriptionOptions} optionLabel="name" placeholder="Select Job Description" 
                                                onChange={event => onChangeValue('f2', event.target.value)} />
                                                <small className="p-invalid p-d-block">{reviseText[2]}</small>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Is there a pair of Early Warning Device?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[3]}>
                                                        <RadioButton inputId="ewd1" onChange={(e) => onChangeValue('f3', true)} checked={pairEWD === true}/>
                                                        <label htmlFor="ewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[4]}>
                                                        <RadioButton inputId="ewd2" onChange={(e) => onChangeValue('f3', false)} checked={pairEWD === false}/>
                                                        <label htmlFor="ewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>What color of Early Warning Device is available?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[5]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f5', 'yo')} checked={colorEWD === 'yo'}/>
                                                        <label htmlFor="cewd1">Yellow Only</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[6]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f5', 'ro')} checked={colorEWD === 'ro'}/>
                                                        <label htmlFor="cewd2">Red Only</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[7]}>
                                                        <RadioButton inputId="cewd3" onChange={(e) => onChangeValue('f5', 'bo')} checked={colorEWD === 'bo'}/>
                                                        <label htmlFor="cewd3">Both</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Early Warning Device marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[8]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f8', true)} checked={bodyNoEWD === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[9]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f8', false)} checked={bodyNoEWD === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Front left hand tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[10]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f10', true)} checked={bodyNoFLTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[11]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f10', false)} checked={bodyNoFLTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Front right hand tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[12]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f12', true)} checked={bodyNoFRTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[13]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f12', false)} checked={bodyNoFRTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Rear right hand tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[14]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f14', true)} checked={bodyNoRRTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[15]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f14', false)} checked={bodyNoRRTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Rear left hand tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[16]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f16', true)} checked={bodyNoRLTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[17]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f16', false)} checked={bodyNoRLTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Is there a reserve or spare tire?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[18]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f18', true)} checked={spareTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[19]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f18', false)} checked={spareTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Reserve or spare tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[20]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f20', true)} checked={bodyNoSpareTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[21]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f20', false)} checked={bodyNoSpareTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Battery marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[22]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f22', 0)} checked={bodyNoBattery === 0}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[23]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f22', 1)} checked={bodyNoBattery === 1}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[24]}>
                                                        <RadioButton inputId="cewd3" onChange={(e) => onChangeValue('f22', 2)} checked={bodyNoBattery === 2}/>
                                                        <label htmlFor="cewd3">Other</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Correct vehicle weight & capacity labels?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[25]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f25', true)} checked={vehicleWeight === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[26]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f25', false)} checked={vehicleWeight === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Vehicle status</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[27]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f27', 'Operational')} checked={vehicleStatus === 'Operational'}/>
                                                        <label htmlFor="cewd1">Operational</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[28]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f27', 'noperational')} checked={vehicleStatus === 'noperational'}/>
                                                        <label htmlFor="cewd2">Non operational</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>PLEASE INCLUDE REMARKS:</b></h6>
                                                <small><i>*If upon inspection concern is not related or out of scope, kindly put "Unit is in good condition"</i></small>
                                                <div className={"p-field-checkbox " + reviseColorPI[0]} style={{paddingTop:'10px'}}>
                                                    <Checkbox inputId="cb1" value={0} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(0) !== -1}/>
                                                    <label htmlFor="cb1">Unit is in good condition, no concern and defect found.</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[1]}>
                                                    <Checkbox inputId="cb1" value={1} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(1) !== -1}/>
                                                    <label htmlFor="cb1">Cracked windshield</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[2]}>
                                                    <Checkbox inputId="cb1" value={2} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(2) !== -1}/>
                                                    <label htmlFor="cb1">Rough idling, Cleaned and adjust throttle valve</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[3]}>
                                                    <Checkbox inputId="cb1" value={3} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(3) !== -1}/>
                                                    <label htmlFor="cb1">For warranty checking with the dealership</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[4]}>
                                                    <Checkbox inputId="cb1" value={4} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(4) !== -1}/>
                                                    <label htmlFor="cb1">For body repair and insurance claim</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[5]}>
                                                    <Checkbox inputId="cb1" value={5} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(5) !== -1}/>
                                                    <label htmlFor="cb1">Concern out of scope</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[6]}>
                                                    <Checkbox inputId="cb1" value={6} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(6) !== -1}/>
                                                    <label htmlFor="cb1">Worn out brake pads</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[7]}>
                                                    <Checkbox inputId="cb1" value={7} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(7) !== -1}/>
                                                    <label htmlFor="cb1">Worn out brake shoe</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[8]}>
                                                    <Checkbox inputId="cb1" value={8} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(8) !== -1}/>
                                                    <label htmlFor="cb1">Low engine oil</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[9]}>
                                                    <Checkbox inputId="cb1" value={9} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(9) !== -1}/>
                                                    <label htmlFor="cb1">Worn out drive belt component</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[10]}>
                                                    <Checkbox inputId="cb1" value={10} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(10) !== -1}/>
                                                    <label htmlFor="cb1">Other</label>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
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
                                                {/* <Button label="CURR" onClick={() => showCurr()} style={{width: '50px'}}/> */}
                                            </div>

                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>HOW MANY PARTS WERE REPLACED?</b></h6>
                                                <small><i>*Kindly indicate the variety of replaced parts. If none, kindly type NA</i></small>
                                                <InputText placeholder="Input Number" value={checklistParts.reduce((prev,next) => prev + next.quantity,0)} disabled/>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 image-upload">
                                                <h6><b>ACTUAL VEHICLE (include photos of interior and exterior defects, vehicle capacity sticker, EWD, tire marks):</b></h6>
                                                <FileUpload ref={refImageUpload} customUpload multiple accept="image/*" maxFileSize={1000000}
                                                    emptyTemplate={<p className="p-m-0">Click Choose and select image files to upload.</p>} />
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                                <h6><b>REPORT IMAGES:</b></h6>
                                                <Carousel style={{paddingTop:'5px', border:"1px solid lightgrey"}} value={reportImage} numVisible={1} numScroll={1} itemTemplate={reportImageTemplate}/>
                                            </div>
                                            <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <Button label="SUBMIT" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitEditChecklist()}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gray-out" style={{display: isLoading ? "flex" : "none"}}>
                            <ProgressSpinner />
                        </div>
                    </Dialog>
                </div>

                <div className="dialog-display">
                    <Dialog header="GENERATING PDF..." visible={displayPDF} onHide={() => onHide('displayPDF')} blockScroll={true}>
                        <div id="toPdf" className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                                    <h4>CHECKLIST REPORT</h4>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="card card-w-title red-field">
                                        <div className="p-grid p-fluid">
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>REPORT No.:</b></h6>
                                                {/* <Dropdown value={reportNo} options={inspectionNotCreatedList} optionLabel="job_id" placeholder="Select Job Number" 
                                                onChange={event => onChangeReportNo(event.target.value)}/> */}
                                                <InputText placeholder="Input Report No." value={reportNo} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[0]}>
                                                <h6><b>YOUR EMAIL:</b></h6>
                                                <InputText placeholder="Input Email" value={email} onChange={(e) => onChangeValue('f0', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[0]}</small>
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

                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[1]}>
                                                <h6><b>ACTUAL ODOMETER READING:</b></h6>
                                                <InputText placeholder="Input Reading" value={actualOdometer} onChange={(e) => onChangeValue('f1', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[1]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[2]}>
                                                <h6><b>JOB DESCRIPTION:</b></h6>
                                                <Dropdown value={jobDescription} options={jobDescriptionOptions} optionLabel="name" placeholder="Select Job Description" 
                                                onChange={event => onChangeValue('f2', event.target.value)} />
                                                <small className="p-invalid p-d-block">{reviseText[2]}</small>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Is there a pair of Early Warning Device?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[3]}>
                                                        <RadioButton inputId="ewd1" onChange={(e) => onChangeValue('f3', true)} checked={pairEWD === true}/>
                                                        <label htmlFor="ewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[4]}>
                                                        <RadioButton inputId="ewd2" onChange={(e) => onChangeValue('f3', false)} checked={pairEWD === false}/>
                                                        <label htmlFor="ewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>What color of Early Warning Device is available?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[5]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f5', 'yo')} checked={colorEWD === 'yo'}/>
                                                        <label htmlFor="cewd1">Yellow Only</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[6]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f5', 'ro')} checked={colorEWD === 'ro'}/>
                                                        <label htmlFor="cewd2">Red Only</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[7]}>
                                                        <RadioButton inputId="cewd3" onChange={(e) => onChangeValue('f5', 'bo')} checked={colorEWD === 'bo'}/>
                                                        <label htmlFor="cewd3">Both</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Early Warning Device marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[8]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f8', true)} checked={bodyNoEWD === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[9]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f8', false)} checked={bodyNoEWD === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Front left hand tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[10]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f10', true)} checked={bodyNoFLTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[11]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f10', false)} checked={bodyNoFLTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Front right hand tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[12]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f12', true)} checked={bodyNoFRTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[13]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f12', false)} checked={bodyNoFRTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Rear right hand tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[14]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f14', true)} checked={bodyNoRRTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[15]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f14', false)} checked={bodyNoRRTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Rear left hand tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[16]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f16', true)} checked={bodyNoRLTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[17]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f16', false)} checked={bodyNoRLTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Is there a reserve or spare tire?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[18]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f18', true)} checked={spareTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[19]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f18', false)} checked={spareTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Reserve or spare tire marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[20]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f20', true)} checked={bodyNoSpareTire === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[21]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f20', false)} checked={bodyNoSpareTire === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Battery marked with body number?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[22]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f22', 0)} checked={bodyNoBattery === 0}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[23]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f22', 1)} checked={bodyNoBattery === 1}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[24]}>
                                                        <RadioButton inputId="cewd3" onChange={(e) => onChangeValue('f22', 2)} checked={bodyNoBattery === 2}/>
                                                        <label htmlFor="cewd3">Other</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Correct vehicle weight & capacity labels?</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[25]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f25', true)} checked={vehicleWeight === true}/>
                                                        <label htmlFor="cewd1">Yes</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[26]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f25', false)} checked={vehicleWeight === false}/>
                                                        <label htmlFor="cewd2">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>Vehicle status</b></h6>
                                                <div className="p-formgroup-inline">
                                                    <div className={"p-field-radiobutton " + reviseColor[27]}>
                                                        <RadioButton inputId="cewd1" onChange={(e) => onChangeValue('f27', 'Operational')} checked={vehicleStatus === 'Operational'}/>
                                                        <label htmlFor="cewd1">Operational</label>
                                                    </div>
                                                    <div className={"p-field-radiobutton " + reviseColor[28]}>
                                                        <RadioButton inputId="cewd2" onChange={(e) => onChangeValue('f27', 'noperational')} checked={vehicleStatus === 'noperational'}/>
                                                        <label htmlFor="cewd2">Non operational</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
                                                <h6><b>PLEASE INCLUDE REMARKS:</b></h6>
                                                <small><i>*If upon inspection concern is not related or out of scope, kindly put "Unit is in good condition"</i></small>
                                                <div className={"p-field-checkbox " + reviseColorPI[0]} style={{paddingTop:'10px'}}>
                                                    <Checkbox inputId="cb1" value={0} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(0) !== -1}/>
                                                    <label htmlFor="cb1">Unit is in good condition, no concern and defect found.</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[1]}>
                                                    <Checkbox inputId="cb1" value={1} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(1) !== -1}/>
                                                    <label htmlFor="cb1">Cracked windshield</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[2]}>
                                                    <Checkbox inputId="cb1" value={2} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(2) !== -1}/>
                                                    <label htmlFor="cb1">Rough idling, Cleaned and adjust throttle valve</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[3]}>
                                                    <Checkbox inputId="cb1" value={3} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(3) !== -1}/>
                                                    <label htmlFor="cb1">For warranty checking with the dealership</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[4]}>
                                                    <Checkbox inputId="cb1" value={4} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(4) !== -1}/>
                                                    <label htmlFor="cb1">For body repair and insurance claim</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[5]}>
                                                    <Checkbox inputId="cb1" value={5} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(5) !== -1}/>
                                                    <label htmlFor="cb1">Concern out of scope</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[6]}>
                                                    <Checkbox inputId="cb1" value={6} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(6) !== -1}/>
                                                    <label htmlFor="cb1">Worn out brake pads</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[7]}>
                                                    <Checkbox inputId="cb1" value={7} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(7) !== -1}/>
                                                    <label htmlFor="cb1">Worn out brake shoe</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[8]}>
                                                    <Checkbox inputId="cb1" value={8} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(8) !== -1}/>
                                                    <label htmlFor="cb1">Low engine oil</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[9]}>
                                                    <Checkbox inputId="cb1" value={9} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(9) !== -1}/>
                                                    <label htmlFor="cb1">Worn out drive belt component</label>
                                                </div>
                                                <div className={"p-field-checkbox " + reviseColorPI[10]}>
                                                    <Checkbox inputId="cb1" value={10} onChange={(e) => onChangePartsIncluded(e)} checked={partsIncluded.indexOf(10) !== -1}/>
                                                    <label htmlFor="cb1">Other</label>
                                                </div>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk resize-label">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gray-out" style={{display: isLoading ? "flex" : "none"}}>
                            <ProgressSpinner />
                        </div>
                    </Dialog>
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

                <Dialog header="CONFIRMATION" visible={displayConfirmDeleteImage} style={{ width: '310px' }} footer={renderFooter('displayConfirmDeleteImage')} onHide={() => onHide('displayConfirmDeleteImage')}>
                    <div className="p-grid">
                        <div className="p-col-2">
                            <i className="pi pi-trash" style={{fontSize: '25px', color: 'red'}}/>
                        </div>
                        <div className="p-col">
                            <h5><b>Delete Image</b></h5>
                            <div style={{fontSize: '16px'}}>Are you sure to delete this image ?</div>
                        </div>
                    </div>
                </Dialog>

                <Dialog header="CONFIRMATION" visible={displayConfirmDelete} style={{ width: '310px' }} footer={renderFooter('displayConfirmDelete')} onHide={() => onHide('displayConfirmDelete')}>
                    <div className="p-grid">
                        <div className="p-col-2">
                            <i className="pi pi-trash" style={{fontSize: '25px', color: 'red'}}/>
                        </div>
                        <div className="p-col">
                            <h5><b>Delete Record</b></h5>
                            <div style={{fontSize: '16px'}}>Are you sure to delete this record no. {delChecklistID}?</div>
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

                <Dialog header="SCAN QR" style={{width: '310px' }} visible={displayQR} onHide={() => onHide('displayQR')} blockScroll={true}>
                    <center>
                        <h5><b>{qrResult}</b></h5>
                        <QrReader
                            delay={300}
                            onScan={handleScan}
                            onError={handleError}
                            style={{height: '260px', width: '260px'}}
                        />
                    </center>
                </Dialog>

            </div>

        </div>
    )

}