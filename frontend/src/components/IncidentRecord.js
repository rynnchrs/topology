import React, {useState, useEffect, useRef } from 'react';
// import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import axios from "axios";
import { format } from 'date-fns';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function RepairRecords() {

    //search fields
    const [searchIRNumber, setSearchIRNumber] = useState('');
    const [searchBodyNo, setSearchBodyNo] = useState('');
    const [searchDateCreated, setSearchDateCreated] = useState(null);

    const statusOperationalOptions = [{ name: 'YES', val: true }, { name: 'NO', val: false }];
    
    const [bodyNoList, setBodyNoList] = useState([]);
    const [suggestionsBodyNo, setSuggestionsBodyNo] = useState(null);
    const [IRRecordList, setIRRecordList] = useState([]);
    const [IRRecordDetails, setIRRecordDetails] = useState({});
    const [flagIRRecordDetails, setFlagIRRecordDetails] = useState(false);
    const [IRRecordID, setIRRecordID] = useState('');
    const [IRRecordNo, setIRRecordNo] = useState('');
    const [flagIRRecordMethod, setFlagIRRecordMethod] = useState('');

    const [reviseColor, setReviseColor] = useState(Array(29).fill(""));
    const [reviseText, setReviseText] = useState(Array(29).fill(""));
    const [reviseColorRT, setReviseColorRT] = useState(Array(8).fill(""));

    //variables to be edit
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
    const [operational, setOperational] = useState('');
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


    //pagination
    const [first, setFirst] = useState(0);
    const rows = 10;
    const [flagPages, setFlagPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const dt = useRef(null);
    const toast = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [displayIncidentRecordEdit, setDisplayIncidentRecordEdit] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});
    const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);
    const [displayPDF, setDisplayPDF] = useState(false);

    useEffect(() => {
        /* eslint-disable no-unused-expressions */
        flagIRRecordDetails ? assignIncidentRecordDetails(IRRecordDetails) : '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flagIRRecordDetails]);

    //pagination
    useEffect(() => {
        try {
            // const sentPage = (first / rows) + 1;
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            let sIRNumber = searchIRNumber;
            let sBodyNo = searchBodyNo;
            let sDateCreated = searchDateCreated === null ? "" : format(searchDateCreated, 'yyyy-MM-dd');

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'task/ir-report/?ir_no=' + sIRNumber 
                + '&body_no=' + sBodyNo
                + '&date=' + sDateCreated, config)
                .then((res) => {
                    console.log(res.data)
                    setTotalCount(res.data.count);
                    setIRRecordList(res.data.results);
                })
                .catch((err) => {
                    
                });
        } catch(err) {

        }
    }, [flagPages]); // eslint-disable-line react-hooks/exhaustive-deps

    //pagination
    const onPageChange = (event) =>  {
        setFirst(event.first);
        if (event.first > first) {
            setFlagPages(flagPages + 1);
        } else if (event.first < first) {
            setFlagPages(flagPages - 1);
        } else {

        }          
    }

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
        setPlateNumber(value.plate_no);
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
                onChangeValue('f7', res.data.dealer = res.data.dealer === 'DMC' ? 'Diamond Motor Corporation' : res.data.dealer === 'GCM' ? 'Grand Canyon Multi Holdings, INC.' : res.data.dealer ===  'CAC' ? 'Cebu Autocentrale Corporation' : res.data.dealer ===  'CAI' ? 'Cherub Autodealer Inc.' : '');
                setOperational(res.data.operational = res.data.operational === false ? 'No' : res.data.operational === true ? 'Yes' : '');
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
        onChangeValue('f10', selectedRepairType);
    }

    const getIncidentRecordDetails = (value) => {
        setIsLoading(true);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'task/ir-report/' + value + '/', config)
            .then((res) => {
                setIRRecordDetails(res.data);
                setFlagIRRecordDetails(true);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }

    const assignIncidentRecordDetails = (value) => {
        setIRNo(value.ir_no);
        onChangeValue('f0', convertDatetoGMT(value.date));
        onChangeValue('f1', value.req_name);
        onChangeValue('f2', value.project_name);
        onChangeValue('f3', value.sub_project);
        onChangeValue('f4', value.body_no.body_no);
        setPlateNumber(value.body_no.plate_no);
        setVehicleTypeMake(value.body_no.make);
        setChassisNumber(value.body_no.vin_no);
        onChangeValue('f5', value.region);
        setArea(value.body_no.permanent_loc);
        setExactLocation(value.body_no.current_loc);
        // onChangeValue('f6', value.exact_loc);
        onChangeValue('f8', value.odometer);
        onChangeValue('f9', value.weiver);

        let getRepairType = [...repairType];
        for (var i = 0; i < value.repair_type.length; i++) {
            if (value.repair_type[i] === "Mehcanical") {
                getRepairType.push("me"); 
            } else if (value.repair_type[i] === "Electrical") {
                getRepairType.push("el")
            } else if (value.repair_type[i] === "Battery") {
                getRepairType.push("ba")
            } else if (value.repair_type[i] === "Tires") {
                getRepairType.push("ti")
            } else if (value.repair_type[i] === "PMS") {
                getRepairType.push("pm")
            } else if (value.repair_type[i] === "Accident") {
                getRepairType.push("ac")
            } else if (value.repair_type[i] === "Others") {
                getRepairType.push("ot")
            }
        }
        onChangeValue('f10', getRepairType);

        onChangeValue('f11', value.damaged_parts);
        onChangeValue('f12', value.incedent_loc);
        let valueDateTime = new Date(value.date_time);
        let valueDate = new Date(valueDateTime.getFullYear(), valueDateTime.getMonth(), valueDateTime.getDate());
        let valueTime = new Date(valueDateTime.getFullYear(), valueDateTime.getMonth(), valueDateTime.getDate(), valueDateTime.getHours(), valueDateTime.getMinutes(), valueDateTime.getSeconds());
        onChangeValue('f13', valueDate);
        onChangeValue('f14', valueTime);
        onChangeValue('f15', value.problem_obs);
        onChangeValue('f16', value.recommendation);
        onChangeValue('f17', value.prepared_by);
        onChangeValue('f18', value.admin_name);
        onChangeValue('f19', value.contact_number)
        onChangeValue('f20', value.noted_by);
        onChangeValue('f21', value.approved_by);

        setCSNumber(value.body_no.cs_no);
        setVehicleSupplier(value.body_no.dealer);
        let op = value.operational = value.operational === false ? 'No' : value.operational === true ? 'Yes' : '';
        onChangeValue('f7', statusOperationalOptions.find(x => x.name === op.toUpperCase()));
        setEngineNumber(value.body_no.engine_no);


        setTimeout(() => {
            if (flagIRRecordMethod === 'pdf') {
                onClick('displayPDF');
                convertPDF();
            } else {
                setIsLoading(false);
                onClick('displayIncidentRecordEdit');
            }
        }, 1500);
    }

    const convertDatetoGMT = (value) => {
        let theDate = value.split("-");
        theDate = new Date(+theDate[0], theDate[1] - 1, +theDate[2]);
        return theDate;
    }

    const [timeOutId, setTimeOutId] = useState(null);
    useEffect(() => {
        clearTimeout(timeOutId);
        setTimeOutId(setTimeout(() => {
            submitSearch();
        }, 1000));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchIRNumber]);

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

        let sIRNumber = searchIRNumber;
        let sBodyNo = searchBodyNo;
        let sDateCreated = searchDateCreated === null ? "" : format(searchDateCreated, 'yyyy-MM-dd');

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'task/ir-report/?ir_no=' + sIRNumber 
            + '&body_no=' + sBodyNo
            + '&date=' + sDateCreated, config)
            .then((res) => {
                setTotalCount(res.data.count);
                setIRRecordList(res.data.results);
            })
            .catch((err) => {
                
            });
    }

    const submitIncidentReportEdit = () => {
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
        } else if (timeDetails === null) {
            toast.current.show({ severity: 'error', summary: 'TIME', detail: 'This field is required.', life: 3000 });
        } else if (problemObserved === "") {
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

            let bodyNumber = bodyNo.body_no === undefined ? bodyNo : bodyNo.body_no;
            let newDateTime = new Date(dateDetails.getFullYear(), dateDetails.getMonth(), dateDetails.getDate(), timeDetails.getHours(), timeDetails.getMinutes(), timeDetails.getSeconds());

            axios.put(process.env.REACT_APP_SERVER_NAME + 'task/ir-report/' + IRRecordDetails.ir_id + '/', {
                repair_type: repairType,
                body_no: bodyNumber,
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
                date_time: newDateTime,
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
                setIsLoading(false);
                setMessage({title:"UPDATE", content:"Successfully updated."});
                onHide('displayIncidentRecordEdit');
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
                }
                setIsLoading(false);
            })
        }
    }

    const submitIncidentReportDelete = () => {
        setIsLoading(true);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        axios
            .delete(process.env.REACT_APP_SERVER_NAME + 'task/ir-report/' + IRRecordID + '/', config)
            .then((res) => {
                if (res.data === `Can't delete this because it's being use by Task Scheduling`) {
                    setIsLoading(false);
                    setMessage({title:"DELETE FAILED", content:"Can't delete this because it's being use by Task Scheduling."});
                    onHide('displayConfirmDelete');
                    onClick('displayMessage');
                } else {
                    getIncidentRecord();
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

    const convertPDF = () => {
        try {
            const input = document.getElementById('toPdf');
            html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                const pdf = new jsPDF();

                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();

                pdf.addImage(imgData, 'JPEG', 16, 8, width-36, height-18);
                window.open(pdf.output('bloburl'));
                onHide('displayPDF');
                setIsLoading(false);
            });
        } catch (err){

        }
    }

    const getIncidentRecord = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'task/ir-report/', config)
            .then((res) => {
                setTotalCount(res.data.count);
                setIRRecordList(res.data.results);
            })
            .catch((err) => {
                
            });
    }

    const updateRevise = (index, color, text) => {
        reviseColor[index] = color;
        reviseText[index] = text;
    }

    const updateReviseRT = (index, color) => {
        reviseColorRT[index] = color
    }

    const reviseFormatDate = (value) => {
        let gmt = convertDatetoGMT(value);
        gmt = format(gmt, 'MM/dd/yyyy');
        return gmt;
    }

    const onChangeValue = (id, value) => {
        let ird = IRRecordDetails;
        let arrIndex = id.substring(1);
        let r = "red";
        let e = "";
        let dt = "";
        switch (id) {
            case 'f0':
                setDateIR(value);
                dt = format(value, 'yyyy-MM-dd');
                if (typeof(ird.revised.date) === "undefined") {
                    dt !== ird.date ? updateRevise(arrIndex, r, reviseFormatDate(ird.date)) : updateRevise(arrIndex, e, e);
                } else {
                    dt !== ird.revised.date ? updateRevise(arrIndex, r, reviseFormatDate(ird.revised.date)) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f1':
                setRequestorName(value);
                if (typeof(ird.revised.req_name) === "undefined") {
                    value !== ird.req_name ? updateRevise(arrIndex, r, ird.req_name) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.req_name ? updateRevise(arrIndex, r, ird.revised.req_name) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f2':
                setProjectName(value);
                if (typeof(ird.revised.project_name) === "undefined") {
                    value !== ird.project_name ? updateRevise(arrIndex, r, ird.project_name) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.project_name ? updateRevise(arrIndex, r, ird.revised.project_name) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f3':
                setSubProject(value);
                if (typeof(ird.revised.sub_project) === "undefined") {
                    value !== ird.sub_project ? updateRevise(arrIndex, r, ird.sub_project) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.sub_project ? updateRevise(arrIndex, r, ird.revised.sub_project) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f4':
                setBodyNo(value);
                // if (typeof(ird.revised.body_no.body_no) === "undefined") {
                //     value !== ird.sub_project ? updateRevise(arrIndex, r, ird.body_no.body_no) : updateRevise(arrIndex, e, e);
                // } else {
                //     value !== ird.revised.sub_project ? updateRevise(arrIndex, r, ird.revised.body_no.body_no) : updateRevise(arrIndex, e, e);
                // }
                break;
            case 'f5':
                setRegion(value);
                if (typeof(ird.revised.region) === "undefined") {
                    value !== ird.region ? updateRevise(arrIndex, r, ird.region) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.region ? updateRevise(arrIndex, r, ird.revised.region) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f6':
                setExactLocation(value);
                if (typeof(ird.revised.exact_loc) === "undefined") {
                    value !== ird.exact_loc ? updateRevise(arrIndex, r, ird.exact_loc) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.exact_loc ? updateRevise(arrIndex, r, ird.revised.exact_loc) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f7':
                setOperational(value);
                // if (typeof(ird.revised.vehicle_supp) === "undefined") {
                //     value !== ird.vehicle_supp ? updateRevise(arrIndex, r, ird.vehicle_supp) : updateRevise(arrIndex, e, e);
                // } else {
                //     value !== ird.revised.vehicle_supp ? updateRevise(arrIndex, r, ird.revised.vehicle_supp) : updateRevise(arrIndex, e, e);
                // }
                break;
            case 'f8':
                setOdometer(value);
                if (typeof(ird.revised.odometer) === "undefined") {
                    value !== ird.odometer ? updateRevise(arrIndex, r, ird.odometer) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.odometer ? updateRevise(arrIndex, r, ird.revised.odometer) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f9':
                setWaiver(value);
                if (typeof(ird.revised.weiver) === "undefined") {
                    value !== ird.weiver ? updateRevise(arrIndex, r, ird.weiver) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.weiver ? updateRevise(arrIndex, r, ird.revised.weiver) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f10':
                setRepairType(value);
                let repairTypeOptions1 = ["me", "el", "ba", "ti", "pm", "ac", "ot"];
                let repairTypeOptions2 = ["Mehcanical", "Electrical", "Battery", "Tires", "PMS", "Accident", "Others"];
                let i;
                if (typeof(ird.revised.repair_type) === "undefined") {
                    for (i = 0; i < repairTypeOptions1.length; i++) {
                        let vi = value.includes(repairTypeOptions1[i]);
                        let ii = ird.repair_type.includes(repairTypeOptions2[i]);
                        vi !== ii ? updateReviseRT(i, r) : updateReviseRT(i, e);
                    }
                } else {
                    for (i = 0; i < repairTypeOptions1.length; i++) {
                        let vi = value.includes(repairTypeOptions1[i]);
                        let ii = ird.revised.repair_type.includes(repairTypeOptions2[i]);
                        vi !== ii ? updateReviseRT(i, r) : updateReviseRT(i, e);
                    }
                }
                break;
            case 'f11':
                setDamagedParts(value);
                if (typeof(ird.revised.damaged_parts) === "undefined") {
                    value !== ird.damaged_parts ? updateRevise(arrIndex, r, ird.damaged_parts) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.damaged_parts ? updateRevise(arrIndex, r, ird.revised.damaged_parts) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f12':
                setLocationIncident(value);
                if (typeof(ird.revised.incedent_loc) === "undefined") {
                    value !== ird.incedent_loc ? updateRevise(arrIndex, r, ird.incedent_loc) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.incedent_loc ? updateRevise(arrIndex, r, ird.revised.incedent_loc) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f13':
                setDateDetails(value);
                dt = format(value, 'yyyy-MM-dd');
                if (typeof(ird.revised.date_time) === "undefined") {
                    let valueDateTime = new Date(ird.date_time);
                    let valueDate = new Date(valueDateTime.getFullYear(), valueDateTime.getMonth(), valueDateTime.getDate());
                    dt !== format(valueDate, 'yyyy-MM-dd') ? updateRevise(arrIndex, r, reviseFormatDate(format(valueDate, 'yyyy-MM-dd'))) : updateRevise(arrIndex, e, e);
                } else {
                    let valueDateTime = new Date(ird.revised.date_time);
                    let valueDate = new Date(valueDateTime.getFullYear(), valueDateTime.getMonth(), valueDateTime.getDate());
                    dt !== format(valueDate, 'yyyy-MM-dd') ? updateRevise(arrIndex, r, reviseFormatDate(format(valueDate, 'yyyy-MM-dd'))) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f14':
                setTimeDetails(value);
                dt = format(value, 'HH:mm');
                if (typeof(ird.revised.date_time) === "undefined") {
                    let valueDateTime = new Date(ird.date_time);
                    let valueTime = new Date(valueDateTime.getFullYear(), valueDateTime.getMonth(), valueDateTime.getDate(), valueDateTime.getHours(), valueDateTime.getMinutes(), valueDateTime.getSeconds());
                    dt !== format(valueTime, 'HH:mm') ? updateRevise(arrIndex, r, format(valueTime, 'HH:mm')) : updateRevise(arrIndex, e, e);
                } else {
                    let valueDateTime = new Date(ird.revised.date_time);
                    let valueTime = new Date(valueDateTime.getFullYear(), valueDateTime.getMonth(), valueDateTime.getDate(), valueDateTime.getHours(), valueDateTime.getMinutes(), valueDateTime.getSeconds());
                    dt !== format(valueTime, 'HH:mm') ? updateRevise(arrIndex, r, format(valueTime, 'HH:mm')) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f15':
                setProblemObserved(value);
                if (typeof(ird.revised.problem_obs) === "undefined") {
                    value !== ird.problem_obs ? updateRevise(arrIndex, r, ird.problem_obs) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.problem_obs ? updateRevise(arrIndex, r, ird.revised.problem_obs) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f16':
                setRecommendation(value);
                if (typeof(ird.revised.recommendation) === "undefined") {
                    value !== ird.recommendation ? updateRevise(arrIndex, r, ird.recommendation) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.recommendation ? updateRevise(arrIndex, r, ird.revised.recommendation) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f17':
                setPreparedBy(value);
                if (typeof(ird.revised.prepared_by) === "undefined") {
                    value !== ird.prepared_by ? updateRevise(arrIndex, r, ird.prepared_by) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.prepared_by ? updateRevise(arrIndex, r, ird.revised.prepared_by) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f18':
                setAdminName(value);
                if (typeof(ird.revised.admin_name) === "undefined") {
                    value !== ird.admin_name ? updateRevise(arrIndex, r, ird.admin_name) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.admin_name ? updateRevise(arrIndex, r, ird.revised.admin_name) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f19':
                setContactNumber(value);
                if (typeof(ird.revised.contact_number) === "undefined") {
                    value !== ird.contact_number ? updateRevise(arrIndex, r, ird.contact_number) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.contact_number ? updateRevise(arrIndex, r, ird.revised.contact_number) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f20':
                setNotedBy(value);
                if (typeof(ird.revised.noted_by) === "undefined") {
                    value !== ird.noted_by ? updateRevise(arrIndex, r, ird.noted_by) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.noted_by ? updateRevise(arrIndex, r, ird.revised.noted_by) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f21':
                setApprovedBy(value);
                if (typeof(ird.revised.approved_by) === "undefined") {
                    value !== ird.approved_by ? updateRevise(arrIndex, r, ird.approved_by) : updateRevise(arrIndex, e, e);
                } else {
                    value !== ird.revised.approved_by ? updateRevise(arrIndex, r, ird.revised.approved_by) : updateRevise(arrIndex, e, e);
                }
                break;
            default:
                break;
        }
    }

    const dialogFuncMap = {
        'displayIncidentRecordEdit': setDisplayIncidentRecordEdit,
        'displayMessage': setDisplayMessage,
        'displayConfirmDelete': setDisplayConfirmDelete,
        'displayPDF': setDisplayPDF,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        setFlagIRRecordDetails(false);
        setFlagIRRecordMethod('');
        setIRRecordID('');
        setIRRecordNo('');
        setReviseColor(Array(29).fill(""));
        setReviseText(Array(29).fill(""));
        setReviseColorRT(Array(8).fill(""));

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
    }

    const renderFooter = (name) => {
        if (name === 'displayMessage') {
            return (
                <div>
                    <Button label="CLOSE" className="p-button-success" onClick={() => onHide(name)} autoFocus/>
                </div>
            );
        } else if (name === 'displayConfirmDelete') {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} autoFocus/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-success" onClick={() => submitIncidentReportDelete()}/>
                </div>
            );
        } 
    }

    const renderHeader = () => {
        return (
            <div style={{paddingTop:'1%'}}><h5><b>INCIDENT RECORDS</b></h5></div>
        );
    }

    const actionBody = (rowData) => {
        return (
            <div>
                <center>
                    <Button style={{marginRight: '3%'}} icon="pi pi-pencil" className="p-button-rounded" onClick={() => getIncidentRecordDetails(rowData.ir_id)}/>
                    <Button style={{marginRight: '3%'}} icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => {setIRRecordID(rowData.ir_id); setIRRecordNo(rowData.ir_no); onClick('displayConfirmDelete')}}/>
                    <Button icon="pi pi-download" className="p-button-rounded p-button-success" onClick={() => {setFlagIRRecordMethod('pdf'); getIncidentRecordDetails(rowData.ir_id)}}/>
                </center>
            </div>
        );
    }

    const convertDatetoWords = (rowData) => {
        let monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.","Jun.","Jul.", "Aug.", "Sep.", "Oct.", "Nov.","Dec."];
        let splitStartDate = rowData.date.split("-");
        let gmtStartDate = new Date(+splitStartDate[0], splitStartDate[1] - 1, +splitStartDate[2]);
        return (
            <div>
                {monthNames[gmtStartDate.getUTCMonth()] + " " + (gmtStartDate.getUTCDate()) + "," + gmtStartDate.getUTCFullYear() + "-" + rowData.body_no + "-"}
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
                                    <InputText placeholder="Search Incident No." value={searchIRNumber} onChange={(event) => setSearchIRNumber(event.target.value)}/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Body No." value={searchBodyNo} onChange={(event) => setSearchBodyNo(event.target.value)}/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <Calendar placeholder="Select Date" value={searchDateCreated} onChange={(e) => setSearchDateCreated(e.value)} showIcon />
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <div className="p-d-flex">
                                    <div className="p-mr-3"><Button label="SEARCH" icon="pi pi-search" onClick={() => submitSearch()}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <DataTable ref={dt} header={renderHeader()} value={IRRecordList} className="p-datatable-sm" 
                        resizableColumns columnResizeMode="expand" emptyMessage="No records found">
                        <Column field={convertDatetoWords} header="Incident Report No." style={{paddingLeft: '3%'}}></Column>
                        <Column body={actionBody}></Column>
                    </DataTable>
                    <Paginator first={first} rows={rows} totalRecords={totalCount} onPageChange={onPageChange}></Paginator>
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="dialog-display">
                    <Dialog header="EDIT INCIDENT" visible={displayIncidentRecordEdit} onHide={() => onHide('displayIncidentRecordEdit')} blockScroll={true}>
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                                    <h4>INCIDENT REPORT</h4>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="card card-w-title red-field">
                                        <div className="p-grid p-fluid">
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>IR #:</b></h6>
                                                <InputText placeholder="Input IR No." value={IRNo} onChange={(e) => setIRNo(e.target.value)} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[0]}>
                                                <h6><b>DATE:</b></h6>
                                                <Calendar placeholder="Select Date" value={dateIR} onChange={(e) => onChangeValue('f0', e.value)} showIcon readOnlyInput/>
                                                <small className="p-invalid p-d-block">{reviseText[0]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[1]}>
                                                <h6><b>REQUESTOR'S NAME:</b></h6>
                                                <InputText placeholder="Input Requestor's Name" value={requestorName} onChange={(e) => onChangeValue('f1', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[1]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                                <div className="p-grid p-fluid">
                                                    <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[2]}>
                                                        <h6><b>PROJECT NAME:</b></h6>
                                                        <InputText placeholder="Input Project Name" value={projectName} onChange={(e) => onChangeValue('f2', e.target.value)}/>
                                                        <small className="p-invalid p-d-block">{reviseText[2]}</small>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[3]}>
                                                        <h6><b>SUB PROJECT:</b></h6>
                                                        <InputText placeholder="Input Sub Project" value={subProject} onChange={(e) => onChangeValue('f3', e.target.value)}/>
                                                        <small className="p-invalid p-d-block">{reviseText[3]}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[4]}>
                                                <h6><b>BODY No.:</b></h6>
                                                <AutoComplete forceSelection field="body_no" placeholder="Body No." suggestions={suggestionsBodyNo} completeMethod={searchListBodyNo} 
                                                value={bodyNo} onSelect={(e) => onSelectBodyNo(e.value)} onChange={(e) => onChangeValue('f4', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[4]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>CS NUMBER:</b></h6>
                                                <InputText placeholder="Input CS Number" value={CSNumber} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>PLATE NUMBER:</b></h6>
                                                <InputText placeholder="Input Plate Number" value={plateNumber} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[5]}>
                                                <h6><b>REGION:</b></h6>
                                                <InputText placeholder="Input Region" value={region} onChange={(e) => onChangeValue('f5', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[5]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>AREA:</b></h6>
                                                <InputText placeholder="Input Area" value={area} onChange={(e) => setArea(e.target.value)} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[6]}>
                                                <h6><b>EXACT LOCATION:</b></h6>
                                                <InputText placeholder="Input Location" value={exactLocation} onChange={(e) => onChangeValue('f6', e.target.value)} disabled/>
                                                <small className="p-invalid p-d-block">{reviseText[6]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>VEHICLE SUPPLIER:</b></h6>
                                                <InputText placeholder="Input Vehicle Supplier" value={vehicleSupplier} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>VEHICLE TYPE/MAKE:</b></h6>
                                                <InputText placeholder="Input Type/Make" value={vehicleTypeMake} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[7]}>
                                                <h6><b>OPERATIONAL (YES/NO):</b></h6>
                                                <Dropdown value={operational} options={statusOperationalOptions} optionLabel="name" placeholder="Select" 
                                                onChange={event => onChangeValue('f7', event.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[7]}</small>
                                                {/* <InputText placeholder="Input Operational" value={operational} disabled/> */}
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[8]}>
                                                <h6><b>CURRENT ODOMETER:</b></h6>
                                                <InputText placeholder="Input Odometer" value={odometer} onChange={(e) => onChangeValue('f8', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[8]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk resize-label " + reviseColor[9]}>
                                                <h6><b>WAIVER:</b></h6>
                                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-field-checkbox">
                                                    <Checkbox inputId="cb" checked={waiver} onChange={e => onChangeValue('f9', e.checked)} />
                                                    <label htmlFor="cb"><b>Check (<i className="pi pi-check"></i>) if under waiver</b></label>
                                                </div>
                                            </div>
                                            
                                            <Panel header="REPAIR TYPE" className="p-col-12 p-lg-12 p-md-12 p-sm-12 resize-label">
                                                <div className="p-grid p-fluid">
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[0]}>
                                                        <Checkbox inputId="cb" value="me" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('me') !== -1}/>
                                                        <label htmlFor="cb">MECHANICAL</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[1]}>
                                                        <Checkbox inputId="cb" value="el" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('el') !== -1}/>
                                                        <label htmlFor="cb">ELECTRICAL</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[2]}>
                                                        <Checkbox inputId="cb" value="ba" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ba') !== -1}/>
                                                        <label htmlFor="cb">BATTERY</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[3]}>
                                                        <Checkbox inputId="cb" value="ti" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ti') !== -1}/>
                                                        <label htmlFor="cb">TIRES</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[4]}>
                                                        <Checkbox inputId="cb" value="pm" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('pm') !== -1}/>
                                                        <label htmlFor="cb">PMS</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[5]}>
                                                        <Checkbox inputId="cb" value="ac" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ac') !== -1}/>
                                                        <label htmlFor="cb">ACCIDENT</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[6]}>
                                                        <Checkbox inputId="cb" value="ot" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ot') !== -1}/>
                                                        <label htmlFor="cb">OTHERS</label>
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
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[11]}>
                                                <h6><b>DAMAGED PARTS:</b></h6>
                                                <InputText placeholder="Input Damaged Parts" value={damagedParts} onChange={(e) => onChangeValue('f11', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[11]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[12]}>
                                                <h6><b>LOCATION OF INCIDENT:</b></h6>
                                                <InputText placeholder="Input Location" value={locationIncident} onChange={(e) => onChangeValue('f12', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[12]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <div className="p-grid p-fluid">
                                                    <div className={"p-col-12 p-lg-8 p-md-8 p-sm-12 required-asterisk " + reviseColor[13]}>
                                                        <h6><b>INCIDENT DATE:</b></h6>
                                                        <Calendar placeholder="Select Date" value={dateDetails} onChange={(e) => onChangeValue('f13', e.value)} showIcon readOnlyInput/>
                                                        <small className="p-invalid p-d-block">{reviseText[13]}</small>
                                                    </div>
                                                    {/* <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[14]}>
                                                        <h6><b>TIME:</b></h6> */}
                                                        {/* <Calendar placeholder="Select Time" value={timeDetails} onChange={(e) => setTimeDetails(e.value)} timeOnly hourFormat="12" showIcon readOnlyInput/> */}
                                                        {/* <Calendar placeholder="Select Time" value={timeDetails} onChange={(e) => onChangeValue('f14', e.value)} timeOnly showIcon readOnlyInput/>
                                                        <small className="p-invalid p-d-block">{reviseText[14]}</small>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + reviseColor[15]}>
                                                <h6><b>PROBLEM OBSERVED:</b></h6>
                                                <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                                    value={problemObserved} onChange={(e) => onChangeValue('f15', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[15]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + reviseColor[16]}>
                                                <h6><b>RECOMMENDATION/REQUEST:</b></h6>
                                                <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                                    value={recommendation} onChange={(e) => onChangeValue('f16', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[16]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                                <h6><b>ADDITIONAL REMARKS:</b></h6>
                                                <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                                    /* value={recommendation} onChange={(e) => setRecommendation(e.target.value)} *//>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[17]}>
                                                <h6><b>PREPARED BY: (Driver/Custodian/Dispatcher)</b></h6>
                                                <InputText placeholder="Input Name" value={preparedBy} onChange={(e) => onChangeValue('f17', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[17]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[18]}>
                                                <h6><b>ADMIN NAME:</b></h6>
                                                <InputText placeholder="Input Name" value={adminName} onChange={(e) => onChangeValue('f18', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[18]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[19]}>
                                                <h6><b>CONTACT NUMBER:</b></h6>
                                                <InputText placeholder="Input Contact Number" value={contactNumber} onChange={(e) => onChangeValue('f19', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[19]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[20]}>
                                                <h6><b>NOTED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={notedBy} onChange={(e) => onChangeValue('f20', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[20]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[21]}>
                                                <h6><b>APPROVED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={approvedBy} onChange={(e) => onChangeValue('f21', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[21]}</small>
                                            </div>

                                            <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <Button label="SUBMIT" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitIncidentReportEdit()}/>
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
                                    <h4>INCIDENT REPORT</h4>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="card card-w-title red-field">
                                        <div className="p-grid p-fluid">
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>IR #:</b></h6>
                                                <InputText placeholder="Input IR No." value={IRNo} onChange={(e) => setIRNo(e.target.value)} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[0]}>
                                                <h6><b>DATE:</b></h6>
                                                <Calendar placeholder="Select Date" value={dateIR} onChange={(e) => onChangeValue('f0', e.value)} showIcon readOnlyInput/>
                                                <small className="p-invalid p-d-block">{reviseText[0]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[1]}>
                                                <h6><b>REQUESTOR'S NAME:</b></h6>
                                                <InputText placeholder="Input Requestor's Name" value={requestorName} onChange={(e) => onChangeValue('f1', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[1]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                                <div className="p-grid p-fluid">
                                                    <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[2]}>
                                                        <h6><b>PROJECT NAME:</b></h6>
                                                        <InputText placeholder="Input Project Name" value={projectName} onChange={(e) => onChangeValue('f2', e.target.value)}/>
                                                        <small className="p-invalid p-d-block">{reviseText[2]}</small>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[3]}>
                                                        <h6><b>SUB PROJECT:</b></h6>
                                                        <InputText placeholder="Input Sub Project" value={subProject} onChange={(e) => onChangeValue('f3', e.target.value)}/>
                                                        <small className="p-invalid p-d-block">{reviseText[3]}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[4]}>
                                                <h6><b>BODY No.:</b></h6>
                                                <AutoComplete forceSelection field="body_no" placeholder="Body No." suggestions={suggestionsBodyNo} completeMethod={searchListBodyNo} 
                                                value={bodyNo} onSelect={(e) => onSelectBodyNo(e.value)} onChange={(e) => onChangeValue('f4', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[4]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>CS NUMBER:</b></h6>
                                                <InputText placeholder="Input CS Number" value={CSNumber} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>PLATE NUMBER:</b></h6>
                                                <InputText placeholder="Input Plate Number" value={plateNumber} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[5]}>
                                                <h6><b>REGION:</b></h6>
                                                <InputText placeholder="Input Region" value={region} onChange={(e) => onChangeValue('f5', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[5]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                                <h6><b>AREA:</b></h6>
                                                <InputText placeholder="Input Area" value={area} onChange={(e) => setArea(e.target.value)} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[6]}>
                                                <h6><b>EXACT LOCATION:</b></h6>
                                                <InputText placeholder="Input Location" value={exactLocation} onChange={(e) => onChangeValue('f6', e.target.value)} disabled/>
                                                <small className="p-invalid p-d-block">{reviseText[6]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>VEHICLE SUPPLIER:</b></h6>
                                                <InputText placeholder="Input Vehicle Supplier" value={vehicleSupplier} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>VEHICLE TYPE/MAKE:</b></h6>
                                                <InputText placeholder="Input Type/Make" value={vehicleTypeMake} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[7]}>
                                                <h6><b>OPERATIONAL (YES/NO):</b></h6>
                                                <Dropdown value={operational} options={statusOperationalOptions} optionLabel="name" placeholder="Select" 
                                                onChange={event => onChangeValue('f7', event.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[7]}</small>
                                                {/* <InputText placeholder="Input Operational" value={operational} disabled/> */}
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[8]}>
                                                <h6><b>CURRENT ODOMETER:</b></h6>
                                                <InputText placeholder="Input Odometer" value={odometer} onChange={(e) => onChangeValue('f8', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[8]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk resize-label " + reviseColor[9]}>
                                                <h6><b>WAIVER:</b></h6>
                                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-field-checkbox">
                                                    <Checkbox inputId="cb" checked={waiver} onChange={e => onChangeValue('f9', e.checked)} />
                                                    <label htmlFor="cb"><b>Check (<i className="pi pi-check"></i>) if under waiver</b></label>
                                                </div>
                                            </div>
                                            
                                            <Panel header="REPAIR TYPE" className="p-col-12 p-lg-12 p-md-12 p-sm-12 resize-label">
                                                <div className="p-grid p-fluid">
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[0]}>
                                                        <Checkbox inputId="cb" value="me" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('me') !== -1}/>
                                                        <label htmlFor="cb">MECHANICAL</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[1]}>
                                                        <Checkbox inputId="cb" value="el" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('el') !== -1}/>
                                                        <label htmlFor="cb">ELECTRICAL</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[2]}>
                                                        <Checkbox inputId="cb" value="ba" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ba') !== -1}/>
                                                        <label htmlFor="cb">BATTERY</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[3]}>
                                                        <Checkbox inputId="cb" value="ti" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ti') !== -1}/>
                                                        <label htmlFor="cb">TIRES</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[4]}>
                                                        <Checkbox inputId="cb" value="pm" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('pm') !== -1}/>
                                                        <label htmlFor="cb">PMS</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[5]}>
                                                        <Checkbox inputId="cb" value="ac" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ac') !== -1}/>
                                                        <label htmlFor="cb">ACCIDENT</label>
                                                    </div>
                                                    <div className={"p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox " + reviseColorRT[6]}>
                                                        <Checkbox inputId="cb" value="ot" onChange={(e) => onChangeRepairType(e)} checked={repairType.indexOf('ot') !== -1}/>
                                                        <label htmlFor="cb">OTHERS</label>
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
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[11]}>
                                                <h6><b>DAMAGED PARTS:</b></h6>
                                                <InputText placeholder="Input Damaged Parts" value={damagedParts} onChange={(e) => onChangeValue('f11', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[11]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + reviseColor[12]}>
                                                <h6><b>LOCATION OF INCIDENT:</b></h6>
                                                <InputText placeholder="Input Location" value={locationIncident} onChange={(e) => onChangeValue('f12', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[12]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <div className="p-grid p-fluid">
                                                    <div className={"p-col-12 p-lg-8 p-md-8 p-sm-12 required-asterisk " + reviseColor[13]}>
                                                        <h6><b>INCIDENT DATE:</b></h6>
                                                        <Calendar placeholder="Select Date" value={dateDetails} onChange={(e) => onChangeValue('f13', e.value)} showIcon readOnlyInput/>
                                                        <small className="p-invalid p-d-block">{reviseText[13]}</small>
                                                    </div>
                                                    {/* <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[14]}>
                                                        <h6><b>TIME:</b></h6> */}
                                                        {/* <Calendar placeholder="Select Time" value={timeDetails} onChange={(e) => setTimeDetails(e.value)} timeOnly hourFormat="12" showIcon readOnlyInput/> */}
                                                        {/* <Calendar placeholder="Select Time" value={timeDetails} onChange={(e) => onChangeValue('f14', e.value)} timeOnly showIcon readOnlyInput/>
                                                        <small className="p-invalid p-d-block">{reviseText[14]}</small>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + reviseColor[15]}>
                                                <h6><b>PROBLEM OBSERVED:</b></h6>
                                                <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                                    value={problemObserved} onChange={(e) => onChangeValue('f15', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[15]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + reviseColor[16]}>
                                                <h6><b>RECOMMENDATION/REQUEST:</b></h6>
                                                <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                                    value={recommendation} onChange={(e) => onChangeValue('f16', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[16]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                                <h6><b>ADDITIONAL REMARKS:</b></h6>
                                                <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                                    /* value={recommendation} onChange={(e) => setRecommendation(e.target.value)} *//>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[17]}>
                                                <h6><b>PREPARED BY: (Driver/Custodian/Dispatcher)</b></h6>
                                                <InputText placeholder="Input Name" value={preparedBy} onChange={(e) => onChangeValue('f17', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[17]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[18]}>
                                                <h6><b>ADMIN NAME:</b></h6>
                                                <InputText placeholder="Input Name" value={adminName} onChange={(e) => onChangeValue('f18', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[18]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[19]}>
                                                <h6><b>CONTACT NUMBER:</b></h6>
                                                <InputText placeholder="Input Contact Number" value={contactNumber} onChange={(e) => onChangeValue('f19', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[19]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[20]}>
                                                <h6><b>NOTED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={notedBy} onChange={(e) => onChangeValue('f20', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[20]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[21]}>
                                                <h6><b>APPROVED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={approvedBy} onChange={(e) => onChangeValue('f21', e.target.value)}/>
                                                <small className="p-invalid p-d-block">{reviseText[21]}</small>
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

                <Dialog header="CONFIRMATION" visible={displayConfirmDelete} style={{ width: '310px' }} footer={renderFooter('displayConfirmDelete')} onHide={() => onHide('displayConfirmDelete')}>
                    <div className="p-grid">
                        <div className="p-col-2">
                            <i className="pi pi-trash" style={{fontSize: '25px', color: 'red'}}/>
                        </div>
                        <div className="p-col">
                            <h5><b>Delete Record</b></h5>
                            <div style={{fontSize: '16px'}}>Are you sure to delete this record no. {IRRecordNo}?</div>
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