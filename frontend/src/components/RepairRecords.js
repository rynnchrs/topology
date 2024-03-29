import React, {useState, useEffect, useRef } from 'react';
// import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Carousel } from 'primereact/carousel';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { format } from 'date-fns';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QrReader from 'react-qr-reader'

export default function RepairRecords() {

    //search fields
    const [searchJobNumber, setSearchJobNumber] = useState("");
    const [searchBodyNo, setSearchBodyNo] = useState('');
    const searchJobTypeOptions = [{ name: "SHOW ALL", val: "" }, { name: "REPAIR", val: "True" }, { name: "INSPECTION", val: "False" }];
    const [searchJobType, setSearchJobType] = useState([]);
    const [searchDateCreated, setSearchDateCreated] = useState(null);

    const [repairRecordList, setRepairRecordList] = useState([]);
    const [repairRecordDetails, setRepairRecordDetails] = useState([]);
    const [flagRepairRecordDetails, setFlagRepairRecordDetails] = useState(false);
    const [qrResult, setQrResult] = useState('No Result');

    const [redField, setRedField] = useState(Array(14).fill(""));
    const [redFieldRevise, setRedFieldRevise] = useState(Array(14).fill(""));

    const [redFieldPartsP, setRedFieldPartsP] = useState(Array(15).fill(""));
    const [redFieldRevisePartsP, setRedFieldRevisePartsP] = useState(Array(15).fill(""));
    const [redFieldPartsQ, setRedFieldPartsQ] = useState(Array(15).fill(""));
    const [redFieldRevisePartsQ, setRedFieldRevisePartsQ] = useState(Array(15).fill(""));
    const [redFieldPartsC, setRedFieldPartsC] = useState(Array(15).fill(""));
    const [redFieldRevisePartsC, setRedFieldRevisePartsC] = useState(Array(15).fill(""));

    const [redFieldLaborP, setRedFieldLaborP] = useState(Array(15).fill(""));
    const [redFieldReviseLaborP, setRedFieldReviseLaborP] = useState(Array(15).fill(""));
    const [redFieldLaborQ, setRedFieldLaborQ] = useState(Array(15).fill(""));
    const [redFieldReviseLaborQ, setRedFieldReviseLaborQ] = useState(Array(15).fill(""));
    const [redFieldLaborC, setRedFieldLaborC] = useState(Array(15).fill(""));
    const [redFieldReviseLaborC, setRedFieldReviseLaborC] = useState(Array(15).fill(""));

    let arrParts = useRef([]);
    let arrLabor = useRef([]);

    const [repairID, setRepairID] = useState("");
    const [jobOrder, setJobOrder] = useState("");
    const [reportNo, setReportNo] = useState("");
    const [taskID, setTaskID] = useState('');
    const [jobType, setJobType] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [bodyNo, setBodyNo] = useState("");
    const [make, setMake] = useState("");
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [CSNumber, setCSNumber] = useState("");
    const [chassisNumber, setChassisNumber] = useState("");
    const [flagRepairRecordMethod, setFlagRepairRecordMethod] = useState('');
    const [reportType, setReportType] = useState('');

    //variables to be edit
    const [IRNumber, setIRNumber] = useState("");
    const [checklistNumber, setChecklistNumber] = useState('');
    const [dateIncident, setDateIncident] = useState(null);
    const [dateReceive, setDateReceive] = useState(null);
    const [detailsIncident, setDetailsIncident] = useState("");
    const [sitePOC, setSitePOC] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [datePerformed, setDatePerformed] = useState(null);
    const [detailsActualFindings, setDetailsActualFindings] = useState("");
    const [detailsActualRemarks, setDetailsActualRemarks] = useState("");
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
    const [totalPartsCost, setTotalPartsCost] = useState("0.00");
    const [labor, setLabor] = useState([
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0}, 
        {p: "", q: 0, c: 0},
        {p: "", q: 0, c: 0}
    ]);
    const [totalLaborCost, setTotalLaborCost] = useState("0.00");
    const [totalEstimateCost, setTotalEstimateCost] = useState("0.00");
    const [newNotedBy, setNewNotedBy] = useState("");
    const [dateRepaired, setDateRepaired] = useState(null);
    const [detailsActionTaken, setDetailsActionTaken] = useState("");
    const [dateDone, setDateDone] = useState(null);
    const statusRepairOptions = [{ name: "OPERATIONAL", val: "Operational" }, { name: "NON-OPERATIONAL", val: "Non-Operational" }];
    const [statusRepair, setStatusRepair] = useState([]);
    const [remarks, setRemarks] = useState("");
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

    const [displayRepairRecordEdit, setDisplayRepairRecordEdit] = useState(false);
    const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});
    const [displayConfirmDeleteImage, setDisplayConfirmDeleteImage] = useState(false);
    const [displayPDF, setDisplayPDF] = useState(false);
    const [displayQR, setDisplayQR] = useState(false);

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
                setTotalCount(res.data.count);
                setRepairRecordList(res.data.results);
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

    useEffect(() => {
        /* eslint-disable no-unused-expressions */
        flagRepairRecordDetails ? assignRepairRecordEdit(repairRecordDetails) : '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flagRepairRecordDetails]);

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

            let sjobNumber = searchJobNumber;
            let sBodyNo = searchBodyNo;
            let sDateCreated = searchDateCreated === null ? "" : format(searchDateCreated, 'yyyy-MM-dd');
            let sJobType = searchJobType.length <= 0 ? "" : searchJobType.val;

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'report/repair/?job_no=' + sjobNumber 
                + '&body_no=' + sBodyNo
                + '&type=' + sJobType
                + '&date_created=' + sDateCreated
                + '&page=' + sentPage, config)
                .then((res) => {
                    setTotalCount(res.data.count);
                    setRepairRecordList(res.data.results);
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

    const getRepairRecordData = (value) => {
        setIsLoading(true);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'report/repair/' + value + '/', config)
            .then((res) => {
                setRepairRecordDetails(res.data);
                axios.get(process.env.REACT_APP_SERVER_NAME + 'image/report-image/' + res.data.repair_id +'/?mode=cr', config)
                    .then((res) => {
                        setReportImage(res.data);
                        setFlagRepairRecordDetails(true);
                        flagRepairRecordDetails ? setIsLoading(false) : '';
                    })
                    .catch((err) => {
                        setIsLoading(false);
                    });
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }

    const assignRepairRecordEdit = (value) => {
        /* eslint-disable no-unused-expressions */
        console.log("val: ", value)
        setRepairID(value.repair_id);
        setJobType(value.job_order.type.toUpperCase());
        setJobOrder(value.job_order.job_id);
        setReportNo(value.job_order.job_no);
        setTaskID(value.job_order.task.task_id);
        // let splitScheduleDate = value.job_order.task.schedule_date.split("-");
        // let gmtScheduleDate = new Date(+splitScheduleDate[0], splitScheduleDate[1] - 1, +splitScheduleDate[2]);
        // setScheduleDate(format(gmtScheduleDate, 'yyyy-MM-dd'));
        setScheduleDate(format(convertDatetoGMT(value.job_order.task.schedule_date), 'yyyy-MM-dd'));
        setBodyNo(value.job_order.body_no.body_no);
        setMake(value.job_order.body_no.make);
        setStatus(value.job_order.body_no.operational);
        setLocation(value.job_order.body_no.current_loc);
        setPlateNumber(value.job_order.body_no.plate_no);
        setCSNumber(value.job_order.body_no.vin_no);
        setChassisNumber(value.job_order.body_no.vin_no);

        // setTotalPartsCost(value.total_parts_cost.toFixed(2));
        // setTotalLaborCost(value.total_labor_cost.toFixed(2));
        // setTotalEstimateCost(value.total_estimate_cost.toFixed(2));
        
        try {
            if (value.job_order.ir_no !== null) {
                setReportType('incident');
                handleChange("f0", value.job_order.ir_no.ir_no);
                let valueDateTime = new Date(value.job_order.ir_no.date_time);
                let valueDate = new Date(valueDateTime.getFullYear(), valueDateTime.getMonth(), valueDateTime.getDate());
                handleChange("f1", valueDate);
                handleChange("f2", convertDatetoGMT(value.job_order.ir_no.date));
                handleChange("f3", value.job_order.ir_no.problem_obs);
                handleChange("f4", value.job_order.ir_no.admin_name);
                handleChange("f5", value.job_order.ir_no.contact_number);

                setChecklistNumber('');
            } else {
                setReportType('checklist');
                setChecklistNumber(value.job_order.check_list);

                setIRNumber('');
                setChecklistNumber('');
                setDateIncident(null);
                setDateReceive(null);
                setDetailsIncident('');
                setSitePOC('');
                setContactNumber('');
            }

            handleChange("f6", convertDatetoGMT(value.perform_date));
            handleChange("f7", value.actual_findings);
            handleChange("f8", value.actual_remarks);
            handleChange("f14", value.noted_by);
            handleChange("f9", convertDatetoGMT(value.repair_date));
            handleChange("f10", value.action_taken);
            handleChange("f11", convertDatetoGMT(value.date_done));
            handleChange("f12", statusRepairOptions.find(x => x.name === value.status_repair.toUpperCase()));
            handleChange("f13", value.remarks);

            if (typeof(value.parts) === "undefined") {

            } else {
                arrParts = parts.slice();
                for (let i = 0; i < 5; i++) {
                    let r = "red";
                    let e = "";

                    if (typeof(value.revised.parts[i].particulars) === "undefined") {
                        arrParts[i] = {...arrParts[i], p: value.parts[i].particulars === null ? "" : value.parts[i].particulars};
                        setParts(arrParts);
                    } else {
                        if (typeof(value.revised.parts[i]) === "undefined") {
                            arrParts[i] = {...arrParts[i], p: "", q: "", c: ""};
                        } else {
                            arrParts[i] = {...arrParts[i], p: value.parts[i].particulars === null ? "" : value.parts[i].particulars};
                            value.parts[i].particulars !== value.revised.parts[i].particulars ? updateRedFieldsPartsP(i, r, value.revised.parts[i].particulars) : updateRedFieldsPartsP(i, e, e);
                        }
                        setParts(arrParts);
                    }

                    if (typeof(value.revised.parts[i].quantity) === "undefined") {
                        arrParts[i] = {...arrParts[i], q: String(value.parts[i].quantity)};
                        setParts(arrParts);
                    } else {
                        if (typeof(value.revised.parts[i]) === "undefined") {
                            arrParts[i] = {...arrParts[i], p: "", q: "", c: ""};
                        } else {
                            arrParts[i] = {...arrParts[i], q: String(value.parts[i].quantity)};
                            value.parts[i].quantity !== value.revised.parts[i].quantity ? updateRedFieldsPartsQ(i, r, value.revised.parts[i].quantity) : updateRedFieldsPartsQ(i, e, e);
                        }
                        setParts(arrParts);
                    }

                    if (typeof(value.revised.parts[i].cost) === "undefined") {
                        arrParts[i] = {...arrParts[i], c: String(value.parts[i].cost)};
                        setParts(arrParts);
                    } else {
                        if (typeof(value.revised.parts[i]) === "undefined") {
                            arrParts[i] = {...arrParts[i], p: "", q: "", c: ""};
                        } else {
                            arrParts[i] = {...arrParts[i], c: String(value.parts[i].cost)};
                            value.parts[i].cost !== value.revised.parts[i].cost ? updateRedFieldsPartsC(i, r, value.revised.parts[i].cost) : updateRedFieldsPartsC(i, e, e);
                        }
                        setParts(arrParts);
                    }
                }

            }

            if (typeof(value.labor) === "undefined") {

            } else {
                arrLabor = labor.slice();
                for (let i = 0; i < 5; i++) {
                    let r = "red";
                    let e = "";

                    if (typeof(value.revised.labor[i].particulars) === "undefined") {
                        arrLabor[i] = {...arrLabor[i], p: value.labor[i].particulars === null ? "" : value.labor[i].particulars};
                        setLabor(arrLabor);
                    } else {
                        if (typeof(value.revised.labor[i]) === "undefined") {
                            arrLabor[i] = {...arrLabor[i], p: "", q: "", c: ""};
                        } else {
                            arrLabor[i] = {...arrLabor[i], p: value.labor[i].particulars === null ? "" : value.labor[i].particulars};
                            value.labor[i].particulars !== value.revised.labor[i].particulars ? updateRedFieldsLaborP(i, r, value.revised.labor[i].particulars) : updateRedFieldsLaborP(i, e, e);
                        }
                        setLabor(arrLabor);
                    }

                    if (typeof(value.revised.labor[i].quantity) === "undefined") {
                        arrLabor[i] = {...arrLabor[i], q: String(value.labor[i].quantity)};
                        setLabor(arrLabor);
                    } else {
                        if (typeof(value.revised.labor[i]) === "undefined") {
                            arrLabor[i] = {...arrLabor[i], p: "", q: "", c: ""};
                        } else {
                            arrLabor[i] = {...arrLabor[i], q: String(value.labor[i].quantity)};
                            value.labor[i].quantity !== value.revised.labor[i].quantity ? updateRedFieldsLaborQ(i, r, value.revised.labor[i].quantity) : updateRedFieldsLaborQ(i, e, e);
                        }
                        setLabor(arrLabor);
                    }

                    if (typeof(value.revised.labor[i].cost) === "undefined") {
                        arrLabor[i] = {...arrLabor[i], c: String(value.labor[i].cost)};
                        setLabor(arrLabor);
                    } else {
                        if (typeof(value.revised.labor[i]) === "undefined") {
                            arrLabor[i] = {...arrLabor[i], p: "", q: "", c: ""};
                        } else {
                            arrLabor[i] = {...arrLabor[i], c: String(value.labor[i].cost)};
                            value.labor[i].cost !== value.revised.labor[i].cost ? updateRedFieldsLaborC(i, r, value.revised.labor[i].cost) : updateRedFieldsLaborC(i, e, e);
                        }
                        setLabor(arrLabor);
                    }
                }


            }
        } catch(err) {

        }

        setTimeout(() => {
            if (flagRepairRecordMethod === 'pdf') {
                onClick('displayPDF');
                convertPDF();
            } else {
                setIsLoading(false);
                onClick('displayRepairRecordEdit');
            }
        }, 1500);
        
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
        } catch (err) {

        }
    }

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
            .delete(process.env.REACT_APP_SERVER_NAME + 'image/report-image/'+ repairID +'/?mode=cr&id=' + holdImageID, config)
            .then((res) => {
                getRepairRecordData(repairID);
                setMessage({title:"DELETE", content:"Successfully deleted."});
                onHide('displayConfirmDeleteImage');
                onClick('displayMessage');
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Delete Image Error', detail: 'Something went wrong.', life: 5000 });
            });
    }

    const updateRedFieldsPartsP = (index, color, revise) => {
        redFieldPartsP[index] = color;
        redFieldRevisePartsP[index] = revise;
    }
    const updateRedFieldsPartsQ = (index, color, revise) => {
        redFieldPartsQ[index] = color;
        redFieldRevisePartsQ[index] = revise;
    }
    const updateRedFieldsPartsC = (index, color, revise) => {
        redFieldPartsC[index] = color;
        redFieldRevisePartsC[index] = revise;
    }

    const updateRedFieldsLaborP = (index, color, revise) => {
        redFieldLaborP[index] = color;
        redFieldReviseLaborP[index] = revise;
    }
    const updateRedFieldsLaborQ = (index, color, revise) => {
        redFieldLaborQ[index] = color;
        redFieldReviseLaborQ[index] = revise;
    }
    const updateRedFieldsLaborC = (index, color, revise) => {
        redFieldLaborC[index] = color;
        redFieldReviseLaborC[index] = revise;
    }

    const convertDatetoGMT = (value) => {
        let theDate = value.split("-");
        theDate = new Date(+theDate[0], theDate[1] - 1, +theDate[2]);
        return theDate;
    }

    const partsData = (index, column, value) => {
        let rrd = repairRecordDetails;
        let r = "red";
        let e = "";
        if (column === "p") {
            let arr = parts.slice();
            arr[index] = {...arr[index], p: value};
            setParts(arr);
            if (value === "") value = null;
            if (typeof(rrd.revised.parts[index].particulars) === "undefined") {
                value !== rrd.parts[index].particulars ? updateRedFieldsPartsP(index, r, rrd.parts[index].particulars) : updateRedFieldsPartsP(index, e, e);
            } else {
                value !== rrd.revised.parts[index].particulars ? updateRedFieldsPartsP(index, r, rrd.revised.parts[index].particulars) : updateRedFieldsPartsP(index, e, e);
            }
        } else if (column === "q") {
            let arr = parts.slice();
            arr[index] = {...arr[index], q: Number(value)};
            setParts(arr);
            if (typeof(rrd.revised.parts[index].quantity) === "undefined") {
                Number(value) !== rrd.parts[index].quantity ? updateRedFieldsPartsQ(index, r, rrd.parts[index].quantity) : updateRedFieldsPartsQ(index, e, e);
            } else {
                Number(value) !== rrd.revised.parts[index].quantity ? updateRedFieldsPartsQ(index, r, rrd.revised.parts[index].quantity) : updateRedFieldsPartsQ(index, e, e);
            }
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
            if (typeof(rrd.revised.parts[index].cost) === "undefined") {
                Number(value) !== rrd.parts[index].cost ? updateRedFieldsPartsC(index, r, rrd.parts[index].cost) : updateRedFieldsPartsC(index, e, e);
            } else {
                Number(value) !== rrd.revised.parts[index].cost ? updateRedFieldsPartsC(index, r, rrd.revised.parts[index].cost) : updateRedFieldsPartsC(index, e, e);
            }
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
        let rrd = repairRecordDetails;
        let r = "red";
        let e = "";
        if (column === "p") {
            let arr = labor.slice();
            arr[index] = {...arr[index], p: value};
            setLabor(arr);
            if (value === "") value = null;
            if (typeof(rrd.revised.labor[index].particulars) === "undefined") {
                value !== rrd.labor[index].particulars ? updateRedFieldsLaborP(index, r, rrd.labor[index].particulars) : updateRedFieldsLaborP(index, e, e);
            } else {
                value !== rrd.revised.labor[index].particulars ? updateRedFieldsLaborP(index, r, rrd.revised.labor[index].particulars) : updateRedFieldsLaborP(index, e, e);
            }
        } else if (column === "q") {
            let arr = labor.slice();
            arr[index] = {...arr[index], q: Number(value)};
            setLabor(arr);
            if (typeof(rrd.revised.labor[index].quantity) === "undefined") {
                Number(value) !== rrd.labor[index].quantity ? updateRedFieldsLaborQ(index, r, rrd.labor[index].quantity) : updateRedFieldsLaborQ(index, e, e);
            } else {
                Number(value) !== rrd.revised.labor[index].quantity ? updateRedFieldsLaborQ(index, r, rrd.revised.labor[index].quantity) : updateRedFieldsLaborQ(index, e, e);
            }
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
            if (typeof(rrd.revised.labor[index].cost) === "undefined") {
                Number(value) !== rrd.labor[index].cost ? updateRedFieldsLaborC(index, r, rrd.labor[index].cost) : updateRedFieldsLaborC(index, e, e);
            } else {
                Number(value) !== rrd.revised.labor[index].cost ? updateRedFieldsLaborC(index, r, rrd.revised.labor[index].cost) : updateRedFieldsLaborC(index, e, e);
            }
            let cost = 0;
            arr.filter(f => f.c !== "").map((x) =>
                cost += Number(x.c) * Number(x.q)
            )
            setTotalLaborCost(cost.toFixed(2));
            let estCost = cost + Number(totalPartsCost);
            setTotalEstimateCost(estCost.toFixed(2));
        }
    };

    const [timeOutId, setTimeOutId] = useState(null);
    useEffect(() => {
        clearTimeout(timeOutId);
        setTimeOutId(setTimeout(() => {
            submitSearch();
        }, 1000));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchJobNumber]);

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

        let sjobNumber = searchJobNumber;
        let sBodyNo = searchBodyNo;
        let sDateCreated = searchDateCreated === null ? "" : format(searchDateCreated, 'yyyy-MM-dd');
        let sJobType = searchJobType.length <= 0 ? "" : searchJobType.val;

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'report/repair/?job_no=' + sjobNumber
            + '&body_no=' + sBodyNo
            + '&type=' + sJobType
            + '&date_created=' + sDateCreated
            + '&page=1', config)
            .then((res) => {
                setTotalCount(res.data.count);
                setRepairRecordList(res.data.results);
                onHide('displayQR');
                setQrResult('No Result');
            })
            .catch((err) => {
                onHide('displayQR');
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const submitEditRepairRecord = () => {
        // if (IRNumber === "") { 
        //     toast.current.show({ severity: 'error', summary: 'IR NUMBER', detail: 'This field is required.', life: 3000 });
        // } else if (dateIncident === null) { 
        //     toast.current.show({ severity: 'error', summary: 'INCIDENT DATE', detail: 'This field is required.', life: 3000 });
        // } else if (dateReceive === null) { 
        //     toast.current.show({ severity: 'error', summary: 'DATE RECEIVE', detail: 'This field is required.', life: 3000 });
        // } else if (detailsIncident === "") { 
        //     toast.current.show({ severity: 'error', summary: 'INCIDENT DETAILS', detail: 'This field is required.', life: 3000 });
        // } else if (sitePOC === "") { 
        //     toast.current.show({ severity: 'error', summary: 'SITE POC', detail: 'This field is required.', life: 3000 });
        // } else if (contactNumber === "") { 
        //     toast.current.show({ severity: 'error', summary: 'CONTACT NUMBER', detail: 'This field is required.', life: 3000 });
        // } else 
        if (datePerformed === null) { 
            toast.current.show({ severity: 'error', summary: 'DATE PERFORMED', detail: 'This field is required.', life: 3000 });
        } else if (detailsActualFindings === "") { 
            toast.current.show({ severity: 'error', summary: 'ACTUAL FINDINDS', detail: 'This field is required.', life: 3000 });
        } else if (detailsActualRemarks === "") { 
            toast.current.show({ severity: 'error', summary: 'ACTUAL RECOMMENDATION', detail: 'This field is required.', life: 3000 });
        } else if (newNotedBy === null || newNotedBy === "") { 
            toast.current.show({ severity: 'error', summary: 'NOTED BY', detail: 'This field is required.', life: 3000 });
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
                body_no: bodyNo,
                parts: submitParts,
                labor: submitLabor,
                ir_no: reportType === "incident" ? IRNumber : "",
                check_list: reportType === "checklist" ? checklistNumber : "",
                // incident_date: format(dateIncident, 'yyyy-MM-dd'),
                // date_receive: format(dateReceive, 'yyyy-MM-dd'),
                // incident_details: detailsIncident,
                // site_poc: sitePOC,
                // contact_no: contactNumber,
                perform_date: format(datePerformed, 'yyyy-MM-dd'),
                actual_findings: detailsActualFindings,
                actual_remarks: detailsActualRemarks,
                noted_by: newNotedBy,
                repair_date: format(dateRepaired, 'yyyy-MM-dd'),
                action_taken: detailsActionTaken,
                date_done: format(dateDone, 'yyyy-MM-dd'),
                status_repair: statusRepair.val,
                remarks: remarks,
                job_order: jobOrder,
                task: taskID,
            }, config)
            .then((res) => {
                if (refImageUpload.current.state.files.length <= 0) {
                    submitEditRepairRecordAfter();
                } else {
                    let formData = new FormData();
                    refImageUpload.current.state.files.map((f, index) => {
                        formData.append("images[" + index + "]image", f);
                        formData.append("images[" + index + "]mode", "cr");
                        formData.append("images[" + index + "]image_name", res.data.repair_id);
                        return null;
                    })
                    axios.post(process.env.REACT_APP_SERVER_NAME + 'image/report-image/', formData, config)
                    .then((res) => {
                        submitEditRepairRecordAfter();
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
                }
                setIsLoading(false);
            })
        }
    }

    const submitEditRepairRecordAfter = () => {
        setIsLoading(false);
        setMessage({title:"EDIT", content:"Successfully updated."});
        onHide('displayRepairRecordEdit');
        onClick('displayMessage');

    }

    const submitDeleteRepairRecord = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        axios
            .delete(process.env.REACT_APP_SERVER_NAME + 'report/repair/' + repairID + '/', config)
            .then((res) => {
                getRepairRecord();
                setMessage({title:"DELETE", content:"Successfully deleted."});
                onHide('displayConfirmDelete');
                onClick('displayMessage');
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Delete Record Error', detail: 'Something went wrong.', life: 5000 });
            });
    }

    const getRepairRecord = () => {
        const sentPage = (first / rows) + 1;
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        let sjobNumber = searchJobNumber;
        let sDateCreated = searchDateCreated === null ? "" : format(searchDateCreated, 'yyyy-MM-dd');
        let sJobType = searchJobType.length <= 0 ? "" : searchJobType.val;

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'report/repair/?job_no=' + sjobNumber
            + '&type=' + sJobType
            + '&date_created=' + sDateCreated
            + '&page=' + sentPage, config)
            .then((res) => {
                setTotalCount(res.data.count);
                setRepairRecordList(res.data.results);
            })
            .catch((err) => {
                axios
                    .get(process.env.REACT_APP_SERVER_NAME + 'report/repair/?job_no=' + sjobNumber
                    + '&type=' + sJobType
                    + '&date_created=' + sDateCreated
                    + '&page=1', config)
                    .then((res) => {
                        setTotalCount(res.data.count);
                        setRepairRecordList(res.data.results);
                        setFirst(0);
                        setFlagPages(1);
                    })
                    .catch((err) => {
                        
                    });
            });
    }

    const updateRedFields = (index, color, revise) => {
        redField[index] = color;
        redFieldRevise[index] = revise;
    }

    const reviseFormatDate = (value) => {
        let gmt = convertDatetoGMT(value);
        gmt = format(gmt, 'MM/dd/yyyy');
        return gmt;
    }

    const handleChange = (id, value) => {
        let rrd = repairRecordDetails;
        let arrIndex = id.substring(1);
        let r = "red";
        let e = "";
        let dt;
        switch (id) {
            case "f0":
                setIRNumber(value);
                // if (typeof(rrd.revised.ir_no) === "undefined") {
                //     value !== rrd.job_order.ir_no.ir_no ? updateRedFields(arrIndex, r, rrd.job_order.ir_no.ir_no) : updateRedFields(arrIndex, e, e);
                // } else {
                //     value !== rrd.revised.ir_no ? updateRedFields(arrIndex, r, rrd.revised.ir_no) : updateRedFields(arrIndex, e, e);
                // }
                break;
            case "f1":
                try {
                    setDateIncident(value);
                    // dt = format(value, 'yyyy-MM-dd');
                    // let valueDateTime = new Date(rrd.job_order.ir_no.date_time);
                    // let valueDate = new Date(valueDateTime.getFullYear(), valueDateTime.getMonth(), valueDateTime.getDate());
                    // if (typeof(rrd.revised.incident_date) === "undefined") {
                    //     dt !== format(valueDate, 'yyyy-MM-dd') ? updateRedFields(arrIndex, r, reviseFormatDate(format(valueDate, 'yyyy-MM-dd'))) : updateRedFields(arrIndex, e, e);
                    // } else {
                    //     dt !== rrd.revised.incident_date ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.revised.incident_date)) : updateRedFields(arrIndex, e, e);
                    // }
                } catch(err){}
                break;
            case "f2":
                try {
                    setDateReceive(value);
                    // dt = format(value, 'yyyy-MM-dd');
                    // if (typeof(rrd.revised.date_receive) === "undefined") {
                    //     dt !== rrd.job_order.ir_no.date ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.job_order.ir_no.date)) : updateRedFields(arrIndex, e, e);
                    // } else {
                    //     dt !== rrd.revised.date_receive ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.revised.date_receive)) : updateRedFields(arrIndex, e, e);
                    // }
                } catch(err){}
                break;
            case "f3":
                setDetailsIncident(value);
                // if (typeof(rrd.revised.incident_details) === "undefined") {
                //     value !== rrd.job_order.ir_no.problem_obs ? updateRedFields(arrIndex, r, rrd.job_order.ir_no.problem_obs) : updateRedFields(arrIndex, e, e);
                // } else {
                //     value !== rrd.revised.incident_details ? updateRedFields(arrIndex, r, rrd.revised.incident_details) : updateRedFields(arrIndex, e, e);
                // }
                break;
            case "f4":
                setSitePOC(value);
                // if (typeof(rrd.revised.site_poc) === "undefined") {
                //     value !== rrd.job_order.ir_no.admin_name ? updateRedFields(arrIndex, r, rrd.job_order.ir_no.admin_name) : updateRedFields(arrIndex, e, e);
                // } else {
                //     value !== rrd.revised.site_poc ? updateRedFields(arrIndex, r, rrd.revised.site_poc) : updateRedFields(arrIndex, e, e);
                // }
                break;
            case "f5":
                setContactNumber(value);
                // if (typeof(rrd.revised.contact_no) === "undefined") {
                //     value !== rrd.job_order.ir_no.contact_number ? updateRedFields(arrIndex, r, rrd.job_order.ir_no.contact_number) : updateRedFields(arrIndex, e, e);
                // } else {
                //     value !== rrd.revised.contact_no ? updateRedFields(arrIndex, r, rrd.revised.contact_no) : updateRedFields(arrIndex, e, e);
                // }
                break;
            case "f6":
                try {
                    setDatePerformed(value);
                    dt = format(value, 'yyyy-MM-dd');
                    if (typeof(rrd.revised.perform_date) === "undefined") {
                        dt !== rrd.perform_date ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.perform_date)) : updateRedFields(arrIndex, e, e);
                    } else {
                        dt !== rrd.revised.perform_date ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.revised.perform_date)) : updateRedFields(arrIndex, e, e);
                    }
                } catch(err){}
                break;
            case "f7":
                setDetailsActualFindings(value);
                if (typeof(rrd.revised.actual_findings) === "undefined") {
                    value !== rrd.actual_findings ? updateRedFields(arrIndex, r, rrd.actual_findings) : updateRedFields(arrIndex, e, e);
                } else {
                    value !== rrd.revised.actual_findings ? updateRedFields(arrIndex, r, rrd.revised.actual_findings) : updateRedFields(arrIndex, e, e);
                }
                break;
            case "f8":
                setDetailsActualRemarks(value);
                if (typeof(rrd.revised.actual_remarks) === "undefined") {
                    value !== rrd.actual_remarks ? updateRedFields(arrIndex, r, rrd.actual_remarks) : updateRedFields(arrIndex, e, e);
                } else {
                    value !== rrd.revised.actual_remarks ? updateRedFields(arrIndex, r, rrd.revised.actual_remarks) : updateRedFields(arrIndex, e, e);
                }
                break;
            case "f9":
                try {
                    setDateRepaired(value);
                    dt = format(value, 'yyyy-MM-dd');
                    if (typeof(rrd.revised.repair_date) === "undefined") {
                        dt !== rrd.repair_date ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.repair_date)) : updateRedFields(arrIndex, e, e);
                    } else {
                        dt !== rrd.revised.repair_date ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.revised.repair_date)) : updateRedFields(arrIndex, e, e);
                    }
                } catch(err){}
                break;
            case "f10":
                setDetailsActionTaken(value);
                if (typeof(rrd.revised.action_taken) === "undefined") {
                    value !== rrd.action_taken ? updateRedFields(arrIndex, r, rrd.action_taken) : updateRedFields(arrIndex, e, e);
                } else {
                    value !== rrd.revised.action_taken ? updateRedFields(arrIndex, r, rrd.revised.action_taken) : updateRedFields(arrIndex, e, e);
                }
                break;
            case "f11":
                try {
                    setDateDone(value);
                    dt = format(value, 'yyyy-MM-dd');
                    if (typeof(rrd.revised.date_done) === "undefined") {
                        dt !== rrd.date_done ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.date_done)) : updateRedFields(arrIndex, e, e);
                    } else {
                        dt !== rrd.revised.date_done ? updateRedFields(arrIndex, r, reviseFormatDate(rrd.revised.date_done)) : updateRedFields(arrIndex, e, e);
                    }
                } catch(err){}
                break;
            case "f12":
                setStatusRepair(value);
                if (typeof(rrd.revised.status_repair) === "undefined") {
                    value.val !== rrd.status_repair ? updateRedFields(arrIndex, r, rrd.status_repair.toUpperCase()) : updateRedFields(arrIndex, e, e);
                } else {
                    value.val !== rrd.revised.status_repair ? updateRedFields(arrIndex, r, rrd.revised.status_repair.toUpperCase()) : updateRedFields(arrIndex, e, e);
                }
                break;
            case "f13":
                setRemarks(value);
                if (typeof(rrd.revised.remarks) === "undefined") {
                    value !== rrd.remarks ? updateRedFields(arrIndex, r, rrd.remarks) : updateRedFields(arrIndex, e, e);
                } else {
                    value !== rrd.revised.remarks ? updateRedFields(arrIndex, r, rrd.revised.remarks) : updateRedFields(arrIndex, e, e);
                }
                break;
            case "f14":
                setNewNotedBy(value);
                // if (typeof(rrd.revised.remarks) === "undefined") {
                //     value !== rrd.remarks ? updateRedFields(arrIndex, r, rrd.remarks) : updateRedFields(arrIndex, e, e);
                // } else {
                //     value !== rrd.revised.remarks ? updateRedFields(arrIndex, r, rrd.revised.remarks) : updateRedFields(arrIndex, e, e);
                // }
                break;
            case "p0":
                if (typeof(value) === "undefined") {
                    arrParts[0] = {...arrParts[0], p: "", q: "", c: ""};
                    setParts(arrParts);
                } else {
                    arrParts[0] = {...arrParts[0], p: value.parts[0].particulars === null ? "" : value.parts[0].particulars, q: String(value.parts[0].quantity), c: String(value.parts[0].cost)};
                    setParts(arrParts);
                }
                break;
            default:
                break;
        }
    }

    const dialogFuncMap = {
        'displayRepairRecordEdit': setDisplayRepairRecordEdit,
        'displayConfirmDelete': setDisplayConfirmDelete,
        'displayMessage': setDisplayMessage,
        'displayConfirmDeleteImage': setDisplayConfirmDeleteImage,
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
        } else if (name === 'displayRepairRecordEdit' || name === 'displayPDF') {
            setParts(initialPartsLabor);
            setLabor(initialPartsLabor);
            setFlagRepairRecordDetails(false);
            setRedField(Array(14).fill(""));
            setRedFieldRevise(Array(14).fill(""));
            setRedFieldPartsP(Array(15).fill(""));
            setRedFieldRevisePartsP(Array(15).fill(""));
            setRedFieldPartsQ(Array(15).fill(""));
            setRedFieldRevisePartsQ(Array(15).fill(""));
            setRedFieldPartsC(Array(15).fill(""));
            setRedFieldRevisePartsC(Array(15).fill(""));
            setRedFieldLaborP(Array(15).fill(""));
            setRedFieldReviseLaborP(Array(15).fill(""));
            setRedFieldLaborQ(Array(15).fill(""));
            setRedFieldReviseLaborQ(Array(15).fill(""));
            setRedFieldLaborC(Array(15).fill(""));
            setRedFieldReviseLaborC(Array(15).fill(""));
            setFlagRepairRecordMethod('');
        }
    }

    const renderFooter = (name) => {
        if (name === 'displayConfirmDelete') {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} autoFocus/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-success" onClick={() => submitDeleteRepairRecord()}/>
                </div>
            );
        } else if (name === 'displayMessage') {
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
        }
    }

    const renderHeader = () => {
        return (
            <div style={{paddingTop:'1%'}}><h5><b>REPAIR RECORDS</b></h5></div>
        );
    }

    const actionBody = (rowData) => {
        return (
            <div>
                <center>
                <Button style={{marginRight: '3%'}} icon="pi pi-pencil" className="p-button-rounded" onClick={() => getRepairRecordData(rowData.repair_id)}/>
                <Button style={{marginRight: '3%'}} icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => {setRepairID(rowData.repair_id); onClick('displayConfirmDelete'); }}/>
                <Button icon="pi pi-download" className="p-button-rounded p-button-success" onClick={() => {setFlagRepairRecordMethod('pdf'); getRepairRecordData(rowData.repair_id)}}/>
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
                            <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Report No." value={searchJobNumber} onChange={(event) => setSearchJobNumber(event.target.value)}/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Body No." value={searchBodyNo} onChange={(event) => setSearchBodyNo(event.target.value)}/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-2 p-md-2p-sm-12">
                                <Dropdown placeholder="Select Job Type" optionLabel="name"  value={searchJobType} options={searchJobTypeOptions} onChange={event => setSearchJobType(event.target.value)}/>
                            </div>
                            <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                                <Calendar placeholder="Select Date" value={searchDateCreated} onChange={(e) => setSearchDateCreated(e.value)} showIcon />
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
                    <DataTable ref={dt} header={renderHeader()} value={repairRecordList} className="p-datatable-sm" 
                        resizableColumns columnResizeMode="expand" emptyMessage="No records found">
                        <Column field="job_order" header="Repair No." style={{ paddingLeft: '3%' }}></Column>
                        <Column body={actionBody}></Column>
                    </DataTable>
                    <Paginator first={first} rows={rows} totalRecords={totalCount} onPageChange={onPageChange}></Paginator>
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="dialog-display">
                    <Dialog header="EDIT REPAIR" visible={displayRepairRecordEdit} onHide={() => onHide('displayRepairRecordEdit')} blockScroll={true}>
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                                    <h4>FIELD REPORT</h4>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="card card-w-title red-field">
                                        <div className="p-grid p-fluid">
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>REPORT No.:</b></h6>
                                                <InputText placeholder="Input Report No." value={reportNo} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>REPORT TYPE:</b></h6>
                                                <InputText placeholder="Input Report Type" value={reportType.toUpperCase()} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>JOB TYPE:</b></h6>
                                                <InputText placeholder="Input Job Type" value={jobType} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>CHECKLIST No.:</b></h6>
                                                <InputText placeholder="Input Checklist No." value={checklistNumber} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>VEHICLE: </b><i>(Body No.)</i></h6>
                                                <InputText placeholder="Input Body No." value={bodyNo} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>SCHEDULE DATE:</b></h6>
                                                <InputText placeholder="Input Date" value={scheduleDate} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>MAKE:</b></h6>
                                                <InputText placeholder="Input Make" value={make} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>STATUS:</b></h6>
                                                <InputText placeholder="Input Make" value={status} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>LOCATION:</b></h6>
                                                <InputText placeholder="Input Location" value={location} disabled/>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                                <h5>VEHICLE INFORMATION</h5>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[0]}>
                                                <h6><b>IR NUMBER:</b></h6>
                                                <InputText id="f0" placeholder="Input IR Number" value={IRNumber} onChange={(e) => handleChange(e.target.id, e.target.value)} disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[0]}</small> */}
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>PLATE No.:</b></h6>
                                                <InputText placeholder="Input Plate Number" value={plateNumber} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>CS No.:</b></h6>
                                                <InputText placeholder="Input CS Number" value={CSNumber} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[1]}>
                                                <h6><b>INCIDENT DATE:</b></h6>
                                                <Calendar id="f1" placeholder="Select Date" value={dateIncident} onChange={(e) => handleChange(e.target.id, e.value)} showIcon disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[1]}</small> */}
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[2]}>
                                                <h6><b>DATE RECEIVE:</b></h6>
                                                <Calendar id="f2" placeholder="Select Date" value={dateReceive} onChange={(e) => handleChange(e.target.id, e.value)} showIcon disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[2]}</small> */}
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                                <h5>INCIDENT DETAILS</h5>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[3]}>
                                                <h6><b>DETAILS:</b></h6>
                                                <InputTextarea id="f3" placeholder="Discuss details here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsIncident} onChange={(e) => handleChange(e.target.id, e.target.value)} disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[3]}</small> */}
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>CHASSIS No.:</b></h6>
                                                <InputText placeholder="Input Chassis Number" value={chassisNumber} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[4]}>
                                                <h6><b>SITE POC:</b></h6>
                                                <InputText id="f4" placeholder="Input SITE POC" value={sitePOC} onChange={(e) => handleChange(e.target.id, e.target.value)} disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[4]}</small> */}
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[5]}>
                                                <h6><b>CONTACT No.:</b></h6>
                                                <InputText id="f5" placeholder="Input Contact Number" value={contactNumber} onChange={(e) => handleChange(e.target.id, e.target.value)} disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[5]}</small> */}
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                                <h5>ACTUAL FINDINGS</h5>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>REPAIR BY/DIAGNOSED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + redField[6]}>
                                                <h6><b>DATE PERFORMED:</b></h6>
                                                <Calendar id="f6" placeholder="Select Date" value={datePerformed} onChange={(e) => handleChange(e.target.id, e.value)} showIcon/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[6]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[7]}>
                                                <h6><b>FINDINGS:</b></h6>
                                                <InputTextarea id="f7" placeholder="Discuss findings here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActualFindings} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[7]}</small>
                                                <small><i>Note: Please provide a technical report together with this document for evaluation.</i></small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[8]}>
                                                <h6><b>RECOMMENDATIONS:</b></h6>
                                                <InputTextarea id="f8" placeholder="Discuss recommendations here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActualRemarks} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[8]}</small>
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
                                                                            <td className={redFieldPartsP[index]}>
                                                                                <InputText value={x.p} onChange={(e) => partsData(index, "p", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldRevisePartsP[index]}</small></div>
                                                                            </td>
                                                                            <td className={redFieldPartsQ[index]}>
                                                                                <InputText style={{textAlign: 'right'}} value={x.q} onChange={(e) => partsData(index, "q", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldRevisePartsQ[index]}</small></div>
                                                                            </td>
                                                                            <td className={redFieldPartsC[index]}>
                                                                                <InputText style={{textAlign: 'right'}} value={x.c} onChange={(e) => partsData(index, "c", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldRevisePartsC[index]}</small></div>
                                                                            </td>
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
                                                                            <td className={redFieldLaborP[index]}>
                                                                                <InputText value={x.p} onChange={(e) => laborData(index, "p", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldReviseLaborP[index]}</small></div>
                                                                            </td>
                                                                            <td className={redFieldLaborQ[index]}>
                                                                                <InputText style={{textAlign: 'right'}} value={x.q} onChange={(e) => laborData(index, "q", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldReviseLaborQ[index]}</small></div>
                                                                            </td>
                                                                            <td className={redFieldLaborC[index]}>
                                                                                <InputText style={{textAlign: 'right'}} value={x.c} onChange={(e) => laborData(index, "c", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldReviseLaborC[index]}</small></div>
                                                                            </td>
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

                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <h6><b>TOTAL COST ESTIMATE:</b></h6>
                                                <InputText style={{textAlign: 'right', fontWeight: '600'}} value={totalEstimateCost} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <h6><b>GENERATED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={repairRecordDetails.generated_by} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <h6><b>APPROVED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={repairRecordDetails.approved_by === null ? "" : repairRecordDetails.approved_by} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <h6><b>NOTED BY:</b></h6>
                                                <InputText id="f14" placeholder="Input Name" value={newNotedBy} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                                <h5>ACTION TAKEN</h5>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>REPAIRED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + redField[9]}>
                                                <h6><b>REPAIR DATE:</b></h6>
                                                <Calendar id="f9" placeholder="Select Date" value={dateRepaired} onChange={(e) => handleChange(e.target.id, e.value)} showIcon/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[9]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[10]}>
                                                <h6><b>ACTION TAKEN DETAILS:</b></h6>
                                                <InputTextarea id="f10" placeholder="Discuss action taken here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActionTaken} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[10]}</small>
                                                <small><i>Note: Please provide a technical service report together with this document for repair/s done.</i></small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + redField[11]}>
                                                <h6><b>DATE DONE:</b></h6>
                                                <Calendar id="f11" placeholder="Select Date" value={dateDone} onChange={(e) => handleChange(e.target.id, e.value)} showIcon/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[11]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + redField[12]}>
                                                <h6><b>STATUS AFTER REPAIR:</b></h6>
                                                <Dropdown id="f12" options={statusRepairOptions} optionLabel="name" placeholder="Select Status" 
                                                value={statusRepair} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[12]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[13]}>
                                                <h6><b>ADDITIONAL REMARKS and/or RECOMMENDATIONS:</b></h6>
                                                <InputTextarea id="f13" placeholder="Discuss remarks/recommendation here or leave it blank." rows={5} cols={30} autoResize
                                                value={remarks} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[13]}</small>
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk image-upload">
                                                <h6><b>IMAGE UPLOAD:</b></h6>
                                                <FileUpload ref={refImageUpload} customUpload multiple accept="image/*" maxFileSize={1000000}
                                                    emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>} />
                                            </div>
                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                                <h6><b>REPORT IMAGES:</b></h6>
                                                <Carousel style={{paddingTop:'5px', border:"1px solid lightgrey"}} value={reportImage} numVisible={1} numScroll={1} itemTemplate={reportImageTemplate}/>
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
                                    <h4>FIELD REPORT</h4>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="card card-w-title red-field">
                                        <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>JOB TYPE:</b></h6>
                                                <InputText placeholder="Input Job Type" value={jobType} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                                <h6><b>REPORT No.:</b></h6>
                                                <InputText placeholder="Input Report No." value={reportNo} disabled/>
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

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                                <h5>VEHICLE INFORMATION</h5>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[0]}>
                                                <h6><b>IR NUMBER:</b></h6>
                                                <InputText id="f0" placeholder="Input IR Number" value={IRNumber} onChange={(e) => handleChange(e.target.id, e.target.value)} disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[0]}</small> */}
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>PLATE No.:</b></h6>
                                                <InputText placeholder="Input Plate Number" value={plateNumber} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>CS No.:</b></h6>
                                                <InputText placeholder="Input CS Number" value={CSNumber} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[1]}>
                                                <h6><b>INCIDENT DATE:</b></h6>
                                                <Calendar id="f1" placeholder="Select Date" value={dateIncident} onChange={(e) => handleChange(e.target.id, e.value)} showIcon disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[1]}</small> */}
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[2]}>
                                                <h6><b>DATE RECEIVE:</b></h6>
                                                <Calendar id="f2" placeholder="Select Date" value={dateReceive} onChange={(e) => handleChange(e.target.id, e.value)} showIcon disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[2]}</small> */}
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                                <h5>INCIDENT DETAILS</h5>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[3]}>
                                                <h6><b>DETAILS:</b></h6>
                                                <InputTextarea id="f3" placeholder="Discuss details here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsIncident} onChange={(e) => handleChange(e.target.id, e.target.value)} disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[3]}</small> */}
                                            </div>
                                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                                <h6><b>CHASSIS No.:</b></h6>
                                                <InputText placeholder="Input Chassis Number" value={chassisNumber} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[4]}>
                                                <h6><b>SITE POC:</b></h6>
                                                <InputText id="f4" placeholder="Input SITE POC" value={sitePOC} onChange={(e) => handleChange(e.target.id, e.target.value)} disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[4]}</small> */}
                                            </div>
                                            <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + redField[5]}>
                                                <h6><b>CONTACT No.:</b></h6>
                                                <InputText id="f5" placeholder="Input Contact Number" value={contactNumber} onChange={(e) => handleChange(e.target.id, e.target.value)} disabled/>
                                                {/* <small className="p-invalid p-d-block">{redFieldRevise[5]}</small> */}
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                                <h5>ACTUAL FINDINGS</h5>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>REPAIR BY/DIAGNOSED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + redField[6]}>
                                                <h6><b>DATE PERFORMED:</b></h6>
                                                <Calendar id="f6" placeholder="Select Date" value={datePerformed} onChange={(e) => handleChange(e.target.id, e.value)} showIcon/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[6]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[7]}>
                                                <h6><b>FINDINGS:</b></h6>
                                                <InputTextarea id="f7" placeholder="Discuss findings here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActualFindings} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[7]}</small>
                                                <small><i>Note: Please provide a technical report together with this document for evaluation.</i></small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[8]}>
                                                <h6><b>RECOMMENDATIONS:</b></h6>
                                                <InputTextarea id="f8" placeholder="Discuss recommendations here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActualRemarks} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[8]}</small>
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
                                                                            <td className={redFieldPartsP[index]}>
                                                                                <InputText value={x.p} onChange={(e) => partsData(index, "p", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldRevisePartsP[index]}</small></div>
                                                                            </td>
                                                                            <td className={redFieldPartsQ[index]}>
                                                                                <InputText style={{textAlign: 'right'}} value={x.q} onChange={(e) => partsData(index, "q", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldRevisePartsQ[index]}</small></div>
                                                                            </td>
                                                                            <td className={redFieldPartsC[index]}>
                                                                                <InputText style={{textAlign: 'right'}} value={x.c} onChange={(e) => partsData(index, "c", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldRevisePartsC[index]}</small></div>
                                                                            </td>
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
                                                                            <td className={redFieldLaborP[index]}>
                                                                                <InputText value={x.p} onChange={(e) => laborData(index, "p", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldReviseLaborP[index]}</small></div>
                                                                            </td>
                                                                            <td className={redFieldLaborQ[index]}>
                                                                                <InputText style={{textAlign: 'right'}} value={x.q} onChange={(e) => laborData(index, "q", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldReviseLaborQ[index]}</small></div>
                                                                            </td>
                                                                            <td className={redFieldLaborC[index]}>
                                                                                <InputText style={{textAlign: 'right'}} value={x.c} onChange={(e) => laborData(index, "c", e.target.value)}/>
                                                                                <div style={{height:'15px'}}><small className="p-invalid p-d-block">{redFieldReviseLaborC[index]}</small></div>
                                                                            </td>
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

                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <h6><b>TOTAL COST ESTIMATE:</b></h6>
                                                <InputText style={{textAlign: 'right', fontWeight: '600'}} value={totalEstimateCost} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <h6><b>GENERATED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={repairRecordDetails.generated_by} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <h6><b>APPROVED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={repairRecordDetails.approved_by === null ? "" : repairRecordDetails.approved_by} disabled/>
                                            </div>
                                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                                <h6><b>NOTED BY:</b></h6>
                                                <InputText id="f14" placeholder="Input Name" value={newNotedBy} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                            </div>

                                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                                <h5>ACTION TAKEN</h5>
                                            </div>
                                            <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                                <h6><b>REPAIRED BY:</b></h6>
                                                <InputText placeholder="Input Name" value={localStorage.getItem("myfirst")} disabled/>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + redField[9]}>
                                                <h6><b>REPAIR DATE:</b></h6>
                                                <Calendar id="f9" placeholder="Select Date" value={dateRepaired} onChange={(e) => handleChange(e.target.id, e.value)} showIcon/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[9]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[10]}>
                                                <h6><b>ACTION TAKEN DETAILS:</b></h6>
                                                <InputTextarea id="f10" placeholder="Discuss action taken here or leave it blank." rows={5} cols={30} autoResize
                                                value={detailsActionTaken} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[10]}</small>
                                                <small><i>Note: Please provide a technical service report together with this document for repair/s done.</i></small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + redField[11]}>
                                                <h6><b>DATE DONE:</b></h6>
                                                <Calendar id="f11" placeholder="Select Date" value={dateDone} onChange={(e) => handleChange(e.target.id, e.value)} showIcon/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[11]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk " + redField[12]}>
                                                <h6><b>STATUS AFTER REPAIR:</b></h6>
                                                <Dropdown id="f12" options={statusRepairOptions} optionLabel="name" placeholder="Select Status" 
                                                value={statusRepair} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[12]}</small>
                                            </div>
                                            <div className={"p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk " + redField[13]}>
                                                <h6><b>ADDITIONAL REMARKS and/or RECOMMENDATIONS:</b></h6>
                                                <InputTextarea id="f13" placeholder="Discuss remarks/recommendation here or leave it blank." rows={5} cols={30} autoResize
                                                value={remarks} onChange={(e) => handleChange(e.target.id, e.target.value)}/>
                                                <small className="p-invalid p-d-block">{redFieldRevise[13]}</small>
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
                            <div style={{fontSize: '16px'}}>Are you sure to delete this record no. {repairID}?</div>
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

                {/* <div className="p-grid p-fluid"> */}
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
                {/* </div> */}

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