import React, {useEffect, useState, useRef} from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { FullCalendar } from 'primereact/fullcalendar';
import { Paginator } from 'primereact/paginator';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import axios from "axios";
import { format } from 'date-fns';
import jwt_decode from "jwt-decode";


export const JobScheduling = () => {

    const [jobList, setJobList] = useState([]);
    const [jobData, setJobData] = useState({
        "task_id": null,
        "job_order": {
            "job_id": null,
            "job_no": null,
            "type": true
        },
        "fieldman": [
            {
                "field_man": ""
            },
            {
                "field_man": ""
            }
        ],
        "body_no": {
            "vin_no": "",
            "body_no": "",
            "plate_no": "",
            "make": "",
            "current_loc": ""
        },
        "manager": "",
        "desc": "",
        "remarks": "",
        "start_date": "",
        "end_date": "",
        "start_date_actual": "",
        "end_date_actual": "",
        "actual_days": null,
        "task_status_fm": null,
        "task_status_mn": null,
        "date_updated": "",
        "date_created": ""
    });

    const [holdData, setHoldData] = useState([]);
    const jobTypeOptions = [{ name: 'REPAIR', val: true }, { name: 'INSPECTION', val: false }];
    const [disabledData, setDisabledData] = useState(false);
    const [fieldmanList, setFieldmanList] = useState([]);
    const [bodyNoList, setBodyNoList] = useState([]);
    const [suggestions, setSuggestions] = useState(null);
    const [suggestionsBodyNo, setSuggestionsBodyNo] = useState(null);

    const [searchFieldman, setSearchFieldman] = useState("");
    const [searchStartDate, setSearchStartDate] = useState(null);
    const [searchEndDate, setSearchEndDate] = useState(null);
    const searchStatusOptions = [{ name: 'SHOW ALL', val: '' }, { name: 'FOR APPROVAL', val: 'fa' }, { name: 'APPROVE', val: 'a' }];
    const [searchStatus, setSearchStatus] = useState([]);
    const searchJobTypeOptions = [{ name: 'SHOW ALL', val: '' }, { name: 'REPAIR', val: 'True' }, { name: 'INSPECTION', val: 'False' }];
    const [searchJobType, setSearchJobType] = useState([]);

    //paginator
    const [first, setFirst] = useState(0);
    const rows = 10;
    const [flagPages, setFlagPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    //create task form
    const [fieldman, setFieldman] = useState([{id: 0 , val: "", fullname: ""}]);
    const [bodyNo, setBodyNo] = useState([]);
    const [jobType, setJobType] = useState([]);
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [scheduleDate, setScheduleDate] = useState(null);
    const [remarks, setRemarks] = useState('none');

    //edit task form
    const [editJobNo, setEditJobNo] = useState('');
    const [editFieldman, setEditFieldman] = useState([]);
    const [editBodyNo, setEditBodyNo] = useState([]);
    const [editJobType, setEditJobType] = useState([]);
    const [editDateStart, setEditDateStart] = useState(null);
    const [editDateEnd, setEditDateEnd] = useState(null);
    const [editDateStartActual, setEditDateStartActual] = useState(null);
    const [editDateEndActual, setEditDateEndActual] = useState(null);
    const [editScheduleDate, setEditScheduleDate] = useState(null);
    const [editRemarks, setEditRemarks] = useState('');

    //job details dialog
    const [status, setStatus] = useState('');
    const [statusColor, setStatusColor] = useState('');
    const [jobTypeColor, setJobTypeColor] = useState('');

    const [fullCalendarList, setFullCalendarList] = useState([]);

    const dt = useRef(null);
    const toast = useRef(null);

    const [displayJobDetails, setDisplayJobDetails] = useState(false);
    const [displayJobCreate, setDisplayJobCreate] = useState(false);
    const [displayJobEdit, setDisplayJobEdit] = useState(false);
    const [displayConfirmFM, setDisplayConfirmFM] = useState(false);
    const [displayConfirmMN, setDisplayConfirmMN] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});

    useEffect(() => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        Promise.all([
            axios.get(process.env.REACT_APP_SERVER_NAME + 'task/task-list/', config),
            localStorage.getItem("viewUsers") === "true" ? axios.get(process.env.REACT_APP_SERVER_NAME + 'task/fieldman-list/', config) : '',
        ]).then(([res1, res2]) => {
            setTotalCount(res1.data.count);
            setJobList(res1.data.results);
            setFieldmanList(res2.data.results);
            if (res2.data.next === null){
                
            } else {
                nextPageFieldman(res2.data.next);
            }
        }).catch((err) => {

        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                if (res.data.next === null){
                
                } else {
                    nextPageBodyNo(res.data.next);
                }
            })
            .catch((err) => {
                
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

            let sf = searchFieldman; //search fieldman data 
            let sd = searchStartDate === null ? '' : format(searchStartDate, 'yyyy-MM-dd');
            let ed = searchEndDate === null ? '' : format(searchEndDate, 'yyyy-MM-dd');

            let fm = "";
            let mn = "";
            if (searchStatus.val === "fa") {
                fm = "True"; mn = "False";
            } else if (searchStatus.val === "a") {
                fm = "True"; mn = "True";
            } else {
                fm = ""; mn = "";
            }

            let jt = searchJobType.length <= 0 ? '' : searchJobType.val;

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'task/task-list/?fieldman=' + sf 
                + '&start_date=' + sd
                + '&end_date=' + ed
                + '&status_fm=' + fm + '&status_mn=' + mn
                + '&job_type=' + jt
                + '&page=' + sentPage, config)
                .then((res) => {
                    setTotalCount(res.data.count);
                    setJobList(res.data.results);
                    fullCalendarDisplay(res.data.results);
                })
                .catch((err) => {
                    
                });
        } catch(err) {
            console.log("pages error")
            console.log(err)
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

    const nextPageFieldman = (value) => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(value, config)
            .then((res) => {
                appendFieldmanList(res.data.results, res.data.next);
            })
            .catch((err) => {
                
            });
    };

    const appendFieldmanList = (value1, value2) => {
        value1.map((i) => {
            return setFieldmanList(fieldmanList => [...fieldmanList, i]);
        });
        if (value2 === null){
                
        } else {
            nextPageFieldman(value2);
        }
    }

    const nextPageBodyNo = (value) => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(value, config)
            .then((res) => {
                appendBodyNo(res.data.results, res.data.next);
            })
            .catch((err) => {
                
            });
    };

    const appendBodyNo = (value1, value2) => {
        value1.map((i) => {
            return setBodyNoList(bodyNoList => [...bodyNoList, i]);
        });
        if (value2 === null){
                
        } else {
            nextPageBodyNo(value2);
        }
    }

    const searchList = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {

            } else {
                try {
                    setSuggestions(fieldmanList.filter(item => item.username.startsWith(event.query)));
                } catch (err){

                }
            }
        }, 100);
    };

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

    const autoCompleteSelect = (id, event) => {
        updateFieldman(id, event.value.username, event.value.full_name);
    }

    const autoCompleteSelectEdit = (id, event) => {
        updateEditFieldman(id, event.value.full_name);
    }

    const getTaskList = () => {
        const sentPage = (first / rows) + 1;
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        let sf = searchFieldman; //search fieldman data 
        let sd = searchStartDate === null ? '' : format(searchStartDate, 'yyyy-MM-dd');
        let ed = searchEndDate === null ? '' : format(searchEndDate, 'yyyy-MM-dd');

        let fm = "";
        let mn = "";
        if (searchStatus.val === "fa") {
            fm = "True"; mn = "False";
        } else if (searchStatus.val === "a") {
            fm = "True"; mn = "True";
        } else {
            fm = ""; mn = "";
        }

        let jt = searchJobType.length <= 0 ? '' : searchJobType.val;

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'task/task-list/?fieldman=' + sf 
            + '&start_date=' + sd
            + '&end_date=' + ed
            + '&status_fm=' + fm + '&status_mn=' + mn
            + '&job_type=' + jt
            + '&page=' + sentPage, config)
            .then((res) => {
                setTotalCount(res.data.count);
                setJobList(res.data.results);
                fullCalendarDisplay(res.data.results);
            })
            .catch((err) => {
                axios
                    .get(process.env.REACT_APP_SERVER_NAME + 'task/task-list/?fieldman=' + sf 
                    + '&start_date=' + sd
                    + '&end_date=' + ed
                    + '&status_fm=' + fm + '&status_mn=' + mn
                    + '&job_type=' + jt
                    + '&page=1', config)
                    .then((res) => {
                        setTotalCount(res.data.count);
                        setJobList(res.data.results);
                        fullCalendarDisplay(res.data.results);
                        setFirst(0);
                        setFlagPages(1);
                    })
                    .catch((err) => {
                        
                    });
            });
    }
    
    const optionsFullCalendar = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultView: 'dayGridMonth',
        header: {
            left: '',
            center: 'title',
            right: 'prev,next'
        },
        editable: false
    };

    const fullCalendarDisplay = (value) => {
        setFullCalendarList([]);
        value.filter(v => v.task_status_fm !== true || v.task_status_mn !== true).map((v) => {
            let splitDate = v.end_date.split("-");
            let gmtDate = new Date(+splitDate[0], splitDate[1] - 1, +splitDate[2] + 1);
            let endDate = format(gmtDate, 'yyyy-MM-dd');
            let f = v.fieldman.map((x) =>
                x.field_man
            )
            return setFullCalendarList(fullCalendarList => [...fullCalendarList, {"title": "ID: " + v.job_order.job_id + "\nFieldman: " + f,
            "start": v.start_date, "end": String(endDate)}]);
        });
    }

    const menu = useRef(null);
    const items = [
        {
            items: [
                {
                    label: 'Edit', icon: 'pi pi-pencil',
                    command: () => {
                        editAssignData();
                    }
                },
                {
                    label: 'Delete', icon: 'pi pi-trash',
                    command: () => {
                        onClick('displayConfirmDelete');
                    }
                }
            ]
        }
    ];

    const itemsFieldman = [
        {
            items: [
                {
                    label: 'Edit', icon: 'pi pi-pencil',
                    command: () => {
                        editAssignData();
                    }
                } 
            ]
        }
    ];

    const actionBody = (jobList) => {
        let monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
        let splitScheduleDate = jobList.schedule_date.split("-");
        let gmtScheduleDate = new Date(+splitScheduleDate[0], splitScheduleDate[1] - 1, +splitScheduleDate[2] + 1);
        let splitStartDate = jobList.start_date.split("-");
        let gmtStartDate = new Date(+splitStartDate[0], splitStartDate[1] - 1, +splitStartDate[2] + 1);
        let splitEndDate = jobList.end_date.split("-");
        let gmtEndDate = new Date(+splitEndDate[0], splitEndDate[1] - 1, +splitEndDate[2] + 1);
        let status1 = "";
        let statusColor1 = "";
        if (jobList.task_status_fm === false && jobList.task_status_mn === false) {
            status1 = "PENDING";
            statusColor1 = "red";
        } else if (jobList.task_status_fm === true && jobList.task_status_mn === false) {
            status1 = "FOR APPROVAL";
            statusColor1 = "orange";
        } else {
            status1 = "DONE";
            statusColor1 = "green";
        }
        let jobTypeColor = jobList.job_order.type === "Repair" ? 'blue' : jobList.job_order.type === "Inspection" ? 'green' : ''; 

        return (
            <div className="p-grid p-fluid p-nogutter" role="button" style={{cursor: 'pointer'}} onClick={(event) => getTaskScheduling(jobList.job_order.job_id)}>
                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                    <div className="job-datatable-item" style={{borderLeft: '5px solid ' + jobTypeColor}}>
                        <div className="p-grid p-fluid p-nogutter">
                            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                <div className="p-grid p-fluid p-nogutter">
                                    <div className="p-col" style={{maxWidth: '70px'}}>
                                        <p style={{fontSize: '14px'}}><b>{jobList.job_order.job_id}</b></p>
                                    </div>
                                    <div className="p-col">
                                        <p style={{fontSize: '14px'}}><i className="pi pi-user"></i>
                                            {
                                                jobList.fieldman.map((x, index) =>
                                                    <b key={index}> {x.field_man + ","}</b>
                                                )
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-col-12 p-lg-8 p-md-8 p-sm-12">
                                <div className="p-grid p-fluid p-nogutter">
                                    <div className="p-col" style={{minWidth:'150px'}}>
                                        <p style={{fontSize: '14px'}}>
                                            <i className="pi pi-calendar"></i> {monthNames[gmtScheduleDate.getUTCMonth()] + " " + (gmtScheduleDate.getUTCDate()) + ", " + gmtScheduleDate.getUTCFullYear()} <br></br>
                                            <i style={{color: 'lightgreen'}} className="pi pi-calendar-plus"></i> {monthNames[gmtStartDate.getUTCMonth()] + " " + (gmtStartDate.getUTCDate()) + ", " + gmtStartDate.getUTCFullYear()} <br></br>
                                            <i style={{color: 'red'}} className="pi pi-calendar-times"></i> {monthNames[gmtEndDate.getUTCMonth()] + " " + (gmtEndDate.getUTCDate()) + ", " + gmtEndDate.getUTCFullYear()} 
                                        </p>
                                    </div>
                                    <div className="p-col" style={{minWidth:'115px'}}>
                                        <small style={{fontSize: '13px', backgroundColor: statusColor1, color: 'white', padding:'2px 5px 3px', borderRadius: '5px'}}>{status1} </small>
                                    </div>
                                    <div className="p-col" style={{minWidth:'75px'}}>
                                        <b style={{fontSize: '14px', color: jobTypeColor, textTransform: 'uppercase'}}>{jobList.job_order.type} </b>
                                    </div>
                                    <div className="p-col">
                                        <Button icon="pi pi-cog" className="p-shadow-1 p-button-text" style={{width: '35px', height: '27px', color: 'black'}}
                                        onClick={(event) => holdJobData(event, jobList.job_order.job_id)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const holdJobData = (event, value) => {
        menu.current.toggle(event);
        event.stopPropagation();
        setHoldData(value);
        getTaskScheduling1(value);
    }

    const getTaskScheduling = (value) => {
        if (value !== null) {
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/' + value + '/', config)
                .then((res) => {
                    btnJobData(res.data);
                })
                .catch((err) => {
                    
                });
        } else {
            
        }
    }

    const getTaskScheduling1 = (value) => {
        if (value !== null) {
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/' + value + '/', config)
                .then((res) => {
                    setJobData(res.data);
                })
                .catch((err) => {
                    
                });
        } else {
            
        }
    }

    const btnJobData = (value) => {
        if (value !== null) {
            setJobData(value);
            if (value.task_status_fm === false && value.task_status_mn === false) {
                setStatus("PENDING")
                setStatusColor("red");
            } else if (value.task_status_fm === true && value.task_status_mn === false) {
                setStatus("FOR APPROVAL");
                setStatusColor("orange");
            } else {
                setStatus("DONE");
                setStatusColor("green");
            }
            let jobTypeColor = value.job_order.type === "Repair" ? 'blue' : value.job_order.type === "Inspection" ? 'green' : '';
            setJobTypeColor(jobTypeColor);
            onClick('displayJobDetails')
        } else {
            onHide('displayJobDetails')
        }
    }

    const [timeOutId, setTimeOutId] = useState(null);
    const bodySearch = (event) => {
        setSearchFieldman(event.target.value);
        clearTimeout(timeOutId);
        setTimeOutId(setTimeout(() => {
            submitSearch(event.target.value);
        }, 1000));
    }

    const submitSearch = (value) => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        let sf = value; //search fieldman data 
        let sd = searchStartDate === null ? '' : format(searchStartDate, 'yyyy-MM-dd');
        let ed = searchEndDate === null ? '' : format(searchEndDate, 'yyyy-MM-dd');

        let fm = "";
        let mn = "";
        if (searchStatus.val === "fa") {
            fm = "True"; mn = "False";
        } else if (searchStatus.val === "a") {
            fm = "True"; mn = "True";
        } else {
            fm = ""; mn = "";
        }

        let jt = searchJobType.length <= 0 ? '' : searchJobType.val;

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'task/task-list/?fieldman=' + sf 
            + '&start_date=' + sd
            + '&end_date=' + ed
            + '&status_fm=' + fm + '&status_mn=' + mn
            + '&job_type=' + jt
            + '&page=1', config)
            .then((res) => {
                console.log("cnt:", res.data.count);
                setTotalCount(res.data.count);
                setJobList(res.data.results);
                fullCalendarDisplay(res.data.results);
                setFirst(0);
                setFlagPages(1);
            })
            .catch((err) => {
                
            });
    }

    const taskWarningList = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        if (dateStart === null) {
            toast.current.show({ severity: 'error', summary: 'START DATE', detail: 'This field is required.', life: 3000 });
        } else if (dateEnd === null) {
            toast.current.show({ severity: 'error', summary: 'END DATE', detail: 'This field is required.', life: 3000 });
        } else {

            let fieldmanData = "";
            fieldman.map((x) =>
                fieldmanData += x.val + ","
            )

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/warning_list/?start_date=' + format(dateStart, 'yyyy-MM-dd')
                + '&end_date=' + format(dateEnd, 'yyyy-MM-dd') + '&fieldman=' + fieldmanData, config)
                .then((res) => {
                    if (res.data.length <= 0){
                        submitTask();
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Task', detail: 'Already have task.', life: 3000 });
                    }
                })
                .catch((err) => {
                    
                });
        }
    }

    const submitTask = () => {
        if (fieldman[0].val === "") { 
            toast.current.show({ severity: 'error', summary: 'FIELDMAN', detail: 'This field is required.', life: 3000 });
        } else if (bodyNo === "" || bodyNo.length <= 0) {
            toast.current.show({ severity: 'error', summary: 'BODY NO.', detail: 'This field is required.', life: 3000 });
        } else if (jobType.length === 0) {
            toast.current.show({ severity: 'error', summary: 'JOB TYPE', detail: 'This field is required.', life: 3000 });
        } else if (dateStart === null) {
            toast.current.show({ severity: 'error', summary: 'START DATE', detail: 'This field is required.', life: 3000 });
        } else if (dateEnd === null) {
            toast.current.show({ severity: 'error', summary: 'END DATE', detail: 'This field is required.', life: 3000 });
        } else if (scheduleDate === null) {
            toast.current.show({ severity: 'error', summary: 'SCHEDULE DATE', detail: 'This field is required.', life: 3000 });
        } else {
            let fieldmanData = [];
            fieldman.map((x) =>
                fieldmanData.push({field_man: x.fullname})
            )

            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            axios.post(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/', {
                job_order: {
                    type: jobType.val
                },
                fieldman: fieldmanData,
                desc:"",
                body_no: bodyNo.body_no,
                start_date: format(dateStart, 'yyyy-MM-dd'),
                end_date: format(dateEnd, 'yyyy-MM-dd'),
                schedule_date: format(scheduleDate, 'yyyy-MM-dd'),
                remarks: remarks
            }, config)
            .then((res) => {
                getTaskList();
                onHide('displayJobCreate');
                setMessage({title:"CREATE", content:"Successfully created."});
                onClick('displayMessage');
            })
            .catch((err) => {
                if (err.toJSON().message === 'Network Error'){
                    toast.current.show({ severity: 'error', summary: 'NETWEORK ERROR', detail: 'Please check internet connection.', life: 3000 });
                } else if (err.response.data.fieldman) {
                    toast.current.show({ severity: 'error', summary: 'Fieldman', detail: 'No Fielman found.', life: 3000 });
                } else if (err.response.data.body_no) {
                    toast.current.show({ severity: 'error', summary: 'Vehicle Body No.', detail: 'Body No. is required.', life: 3000 });
                } else if (err.response.data.start_date) {
                    toast.current.show({ severity: 'error', summary: 'Start Date', detail: 'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.', life: 3000 });
                } else if (err.response.data.end_date) {
                    toast.current.show({ severity: 'error', summary: 'End Date', detail: 'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.', life: 3000 });
                } else if (err.response.data.errors) {
                    if (err.response.data.errors[0].body_no) {
                        toast.current.show({ severity: 'error', summary: 'Vehicle Body No.', detail: 'Invalid Body No.', life: 3000 });
                    } else if (err.response.data.errors[0].manager) {
                        toast.current.show({ severity: 'error', summary: 'Manager', detail: 'No Manager found.', life: 3000 });
                    } else if (err.response.data.errors[0].field_man) {
                        toast.current.show({ severity: 'error', summary: 'Duplicate Fieldman', detail: 'Please check fieldman input.', life: 3000 });
                    }
                }
            })
        }
    }

    const editAssignData = (value) => {
        setEditFieldman([]);
        jobData.fieldman.map((x, index) =>
            setEditFieldman(editFieldman => [...editFieldman, {id: index, fullname: x.field_man}])
        )

        localStorage.getItem("viewUsers") === "true" ? setDisabledData(false) : setDisabledData(true);
        let splitDateStart = jobData.start_date.split("-");
        let splitDateEnd = jobData.end_date.split("-");
        let splitScheduleDate = jobData.schedule_date.split("-");
        let gmtDateStart = new Date(+splitDateStart[0], splitDateStart[1] - 1, +splitDateStart[2]);
        let gmtDateEnd = new Date(+splitDateEnd[0], splitDateEnd[1] - 1, +splitDateEnd[2]);
        let gmtScheduleDate = new Date(+splitScheduleDate[0], splitScheduleDate[1] - 1, +splitScheduleDate[2]);

        let parseDateStartActual = null;
        let parseDateEndActual = null;
        if (jobData.start_date_actual === null) {

        } else {
            parseDateStartActual = jobData.start_date_actual.split("-");
            parseDateStartActual = new Date(+parseDateStartActual[0], parseDateStartActual[1] - 1, +parseDateStartActual[2]);
        }
        if (jobData.end_date_actual === null) {

        } else {
            parseDateEndActual = jobData.end_date_actual.split("-");
            parseDateEndActual = new Date(+parseDateEndActual[0], parseDateEndActual[1] - 1, +parseDateEndActual[2]);
        }

        setEditJobNo(jobData.task_id);
        setEditBodyNo(jobData.body_no.body_no);
        try {
            setEditJobType(jobTypeOptions.find(x => x.name === jobData.job_order.type.toUpperCase()));
        } catch(err){
            console.log("err jobtype: ", err)
        }
        setEditDateStart(gmtDateStart);
        setEditDateEnd(gmtDateEnd);
        setEditDateStartActual(parseDateStartActual);
        setEditDateEndActual(parseDateEndActual);
        setEditScheduleDate(gmtScheduleDate);
        setEditRemarks(jobData.remarks);
        onHide('displayJobDetails'); 
        onClick('displayJobEdit');

    }

    const editTask = () => {
        let fieldmanData = [];
        editFieldman.map((x) => 
            fieldmanData.push({field_man: x.fullname})
        )

        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.put(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/' + editJobNo + '/', {
            job_order: {
                type: editJobType.val
            },
            fieldman: fieldmanData,
            desc: "",
            body_no: editBodyNo,
            start_date: format(editDateStart, 'yyyy-MM-dd'),
            end_date: format(editDateEnd, 'yyyy-MM-dd'),
            schedule_date: format(editScheduleDate, 'yyyy-MM-dd'),
            remarks: editRemarks
        }, config)
        .then((res) => {
            getTaskList();
            onHide('displayJobEdit');
            setMessage({title:"UPDATE", content:"Successfully update."});
            onClick('displayMessage');
        })
        .catch((err) => {
            console.log(err.response);
            if (err.toJSON().message === 'Network Error'){
                toast.current.show({ severity: 'error', summary: 'Network Error', detail: 'Please check internet connection.', life: 3000 });
            } else if (err.response.data.fieldman) {
                toast.current.show({ severity: 'error', summary: 'Fieldman', detail: 'No Fielman found.', life: 3000 });
            } else if (err.response.data.body_no) {
                toast.current.show({ severity: 'error', summary: 'Vehicle Body No.', detail: 'Body No. is required.', life: 3000 });
            } else if (err.response.data.start_date) {
                toast.current.show({ severity: 'error', summary: 'Start Date', detail: 'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.', life: 3000 });
            } else if (err.response.data.end_date) {
                toast.current.show({ severity: 'error', summary: 'End Date', detail: 'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.', life: 3000 });
            } else if (err.response.data.errors) {
                if (err.response.data.errors[0].body_no) {
                    toast.current.show({ severity: 'error', summary: 'Vehicle Body No.', detail: 'Invalid Body No.', life: 3000 });
                } else if (err.response.data.errors[0].manager) {
                    toast.current.show({ severity: 'error', summary: 'Manager', detail: 'No Manager found.', life: 3000 });
                }
            }
        })
    }

    const editTaskFieldman = () => {
        let actualStart = editDateStartActual === null ? null : format(editDateStartActual, 'yyyy-MM-dd');
        let actualEnd = editDateEndActual === null ? null : format(editDateEndActual, 'yyyy-MM-dd');
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.put(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/' + editJobNo + '/date_update/', {
            start_date_actual: actualStart,
            end_date_actual: actualEnd
        }, config)
        .then((res) => {
            getTaskList();
            onHide('displayJobEdit');
            setMessage({title:"UPDATE", content:"Successfully update."});
            onClick('displayMessage');
        })
        .catch((err) => {
            console.log(err.response);
            if (err.toJSON().message === 'Network Error'){
                toast.current.show({ severity: 'error', summary: 'Network Error', detail: 'Please check internet connection.', life: 3000 });
            } else if (err.response.data === "Already Updated") {
                toast.current.show({ severity: 'error', summary: 'Update Error', detail: 'Already Updated.', life: 3000 });
            } else if (err.response.data.fieldman) {
                toast.current.show({ severity: 'error', summary: 'Fieldman', detail: 'No Fielman found.', life: 3000 });
            } else if (err.response.data.body_no) {
                toast.current.show({ severity: 'error', summary: 'Vehicle Body No.', detail: 'Body No. is required.', life: 3000 });
            } else if (err.response.data.start_date) {
                toast.current.show({ severity: 'error', summary: 'Start Date', detail: 'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.', life: 3000 });
            } else if (err.response.data.end_date) {
                toast.current.show({ severity: 'error', summary: 'End Date', detail: 'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.', life: 3000 });
            } else if (err.response.data.errors) {
                if (err.response.data.errors[0].body_no) {
                    toast.current.show({ severity: 'error', summary: 'Vehicle Body No.', detail: 'Invalid Body No.', life: 3000 });
                } else if (err.response.data.errors[0].manager) {
                    toast.current.show({ severity: 'error', summary: 'Manager', detail: 'No Manager found.', life: 3000 });
                }
            }
        })
    }

    const deleteTask = (value) => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.delete(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/' + value + '/', config)
        .then((res) => {;
            getTaskList();
            onHide('displayConfirmDelete');
            onHide('displayJobEdit');
            setMessage({title:"DELETE", content:"Successfully delete."});
            onClick('displayMessage');
        })
        .catch((err) => {
            console.log(err.response)
            toast.current.show({ severity: 'error', summary: 'Delete Task Error', detail: 'Something went wrong.', life: 3000 });
        });
    }

    const statusFieldman = (value) => {
        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);
        console.log("dcd: ",decoded)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.put(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/' + value + '/status_fm/', "", config)
        .then((res) => {
            getTaskList();
            onHide('displayJobDetails');
            onHide('displayConfirmFM');
            setMessage({title:"APPROVAL", content:"Task approval sent."});
            onClick('displayMessage');
        })
        .catch((err) => {
            console.log(err.response)
            toast.current.show({ severity: 'error', summary: 'Status Update Error', detail: 'Something went wrong.', life: 3000 });
        });
    }

    const statusManager = (value) => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.put(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/' + value + '/status_mn/', "", config)
        .then((res) => {
            getTaskList();
            onHide('displayJobDetails');
            onHide('displayConfirmMN');
            setMessage({title:"APPROVE", content:"Task approve."});
            onClick('displayMessage');
        })
        .catch((err) => {
            console.log(err.response)
            toast.current.show({ severity: 'error', summary: 'Status Update Error', detail: 'Something went wrong.', life: 3000 });
        });
    }

    const addFieldman = () => {
        setFieldman(fieldman => [...fieldman, {id: fieldman.length, val: ""}]);
    }

    const removeFieldman = () => {
        let cols = fieldman.slice();
        cols.pop();
        setFieldman(cols);
    }

    const updateFieldman = (index, value, fn) => {
        let arr = fieldman.slice();
        arr[index] = {id: index, val: value, fullname: fn};
        setFieldman(arr);
    }

    const editAddFieldman = () => {
        setEditFieldman(editFieldman => [...editFieldman, {id: editFieldman.length, fullname: ""}]);
    }

    const editRemoveFieldman = () => {
        let cols = editFieldman.slice();
        cols.pop();
        setEditFieldman(cols);
    }

    const updateEditFieldman = (index, fn) => {
        let arr = editFieldman.slice();
        arr[index] = {id: index, fullname: fn};
        setEditFieldman(arr);
    }

    const dialogFuncMap = {
        'displayJobDetails': setDisplayJobDetails,
        'displayJobCreate': setDisplayJobCreate,
        'displayJobEdit': setDisplayJobEdit,
        'displayConfirmFM': setDisplayConfirmFM,
        'displayConfirmMN': setDisplayConfirmMN,
        'displayMessage': setDisplayMessage,
        'displayConfirmDelete': setDisplayConfirmDelete,

    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        if (name === 'displayConfirmFM') {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} autoFocus/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-success" onClick={() => statusFieldman(jobData.task_id)}/>
                </div>
            );
        } else if (name === 'displayConfirmMN') {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} autoFocus/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-success" onClick={() => statusManager(jobData.task_id)}/>
                </div>
            );
        } else if (name === 'displayMessage') {
            return (
                <div>
                    <Button label="CLOSE" className="p-button-success" onClick={() => onHide(name)} autoFocus/>
                </div>
            );
        } else if (name === 'displayConfirmDelete') {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} autoFocus/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-success" onClick={() => deleteTask(holdData)}/>
                </div>
            );
        }
    }

    return (
        <div className="p-grid p-fluid" >
            <Toast ref={toast} />
            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                <div className="card card-w-title">
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                            <div className="p-grid p-fluid">
                                <div className="p-col">
                                    <b style={{fontSize: '20px', color:'gray'}}>Task List</b>
                                </div>
                                <div className="p-col">
                                {
                                    localStorage.getItem("viewUsers") === "true" ? <Button label="CREATE" icon="pi pi-plus" onClick={() => onClick('displayJobCreate')} style={{ float: 'right', width:'130px'}}/> : ''
                                }
                                </div>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText placeholder="Search" value={searchFieldman} onChange={(event) => bodySearch(event)}/>
                            </span>
                        </div>
                        <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                            <Dropdown value={searchStatus} options={searchStatusOptions} optionLabel="name" placeholder="Select Status"
                            onChange={event => setSearchStatus(event.target.value)} />
                        </div>
                        <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                            <Calendar id="icon" placeholder="Start Date" value={searchStartDate} onChange={(e) => setSearchStartDate(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                            <Calendar id="icon" placeholder="End Date" value={searchEndDate} onChange={(e) => setSearchEndDate(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                            <Dropdown value={searchJobType} options={searchJobTypeOptions} optionLabel="name" placeholder="Select Job Type" onChange={event => setSearchJobType(event.target.value)} />
                        </div>
                        <div className="p-col-12 p-lg-2 p-md-2 p-sm-12">
                            <Button label="SEARCH" onClick={() => submitSearch(searchFieldman)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 job-datatable">
                            {
                                localStorage.getItem("viewUsers") === "true" ? 
                                <Menu model={items} popup ref={menu} id="popup_menu" /> :
                                <Menu model={itemsFieldman} popup ref={menu} id="popup_menu" />
                            }
                            <DataTable ref={dt} value={jobList} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                scrollable scrollHeight="325px" emptyMessage="No records found">
                                <Column body={actionBody}></Column>
                            </DataTable>
                            <Paginator first={first} rows={rows} totalRecords={totalCount} onPageChange={onPageChange}></Paginator>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                <div className="card">
                    <FullCalendar events={fullCalendarList} options={optionsFullCalendar} />
                </div>
            </div>

            <div className="dialog-display">
                <Dialog header="CREATE TASK" visible={displayJobCreate} onHide={() => onHide('displayJobCreate')} blockScroll={true}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>FIELDMAN:</b></h6>
                            <div className="p-grid p-fluid">
                                {
                                    fieldman.map((x, index) =>
                                        <div className="p-col-12 p-lg-12" key={index}>
                                            <AutoComplete forceSelection field="full_name" placeholder="Input Fieldman" suggestions={suggestions} completeMethod={searchList} 
                                            value={x.fullname} onSelect={event => autoCompleteSelect(x.id, event)} onChange={(e) => updateFieldman(x.id, e.target.value, e.target.value)}/>
                                        </div>
                                    )
                                }
                            </div>
                            <Button label="+" onClick={() => addFieldman()} style={{ width: '50px', marginRight: '10px'}}/> 
                            <Button label="-" onClick={() => removeFieldman()} style={{ width: '50px' }} disabled={fieldman.length === 1}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>VEHICLE: </b><i>(Body No.)</i></h6>
                            <AutoComplete forceSelection field="body_no" placeholder="Body No." suggestions={suggestionsBodyNo} completeMethod={searchListBodyNo} 
                            value={bodyNo} onChange={(e) => setBodyNo(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>JOB TYPE: </b></h6>
                            <Dropdown value={jobType} options={jobTypeOptions} optionLabel="name" placeholder="Select Job Type" onChange={event => setJobType(event.target.value)} />
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>START DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={dateStart} onChange={(e) => setDateStart(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>END DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={dateEnd} onChange={(e) => setDateEnd(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>SCHEDULE DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={scheduleDate} onChange={(e) => setScheduleDate(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>REMARKS:</b></h6>
                            <InputText placeholder="Add other remarks here" value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
                        </div>

                        <div className="p-col-12 p-md-9"> </div>
                        <div className="p-col-12 p-md-3" style={{ marginTop: '2%', paddingRight: '5%' }}>
                            <Button label="CREATE" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => taskWarningList()}/>
                        </div>
                    </div>
                </Dialog>

                <Dialog header="EDIT TASK" visible={displayJobEdit} onHide={() => onHide('displayJobEdit')} blockScroll={true}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>JOB NO.:</b></h6>
                            <InputText placeholder="Input Job No" value={editJobNo} disabled/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>FIELDMAN:</b></h6>
                            <div className="p-grid p-fluid">
                                {
                                    editFieldman.map((x, index) =>
                                        <div className="p-col-12 p-lg-12" key={index}>
                                            <AutoComplete forceSelection field="full_name" placeholder="Input Fieldman" suggestions={suggestions} completeMethod={searchList} 
                                            value={x.fullname} onSelect={event => autoCompleteSelectEdit(x.id, event)} onChange={(e) => updateEditFieldman(x.id, e.target.value)} disabled={disabledData}/>
                                        </div>
                                    )
                                }
                            </div>
                            <Button label="+" onClick={() => editAddFieldman()} style={{ width: '50px', marginRight: '10px'}} disabled={disabledData}/> 
                            <Button label="-" onClick={() => editRemoveFieldman()} style={{ width: '50px' }} disabled={editFieldman.length === 1 || disabledData}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>VEHICLE: </b><i>(Body No.)</i></h6>
                            <AutoComplete forceSelection field="body_no" placeholder="Input Vehicle(Body No.)" suggestions={suggestionsBodyNo} completeMethod={searchListBodyNo} 
                            value={editBodyNo} onChange={(e) => setEditBodyNo(e.target.value)} disabled={disabledData}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>JOB TYPE: </b></h6>
                            <Dropdown value={editJobType} options={jobTypeOptions} optionLabel="name" placeholder="Select Job Type" onChange={event => setEditJobType(event.target.value)} disabled/>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>START DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editDateStart} onChange={(e) => setEditDateStart(e.value)} showIcon disabled={disabledData}/>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>END DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editDateEnd} onChange={(e) => setEditDateEnd(e.value)} showIcon disabled={disabledData}/>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>START DATE(ACTUAL):</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editDateStartActual} onChange={(e) => setEditDateStartActual(e.value)} showIcon disabled={localStorage.getItem("viewUsers") === "true"}/>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>END DATE(ACTUAL):</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editDateEndActual} onChange={(e) => setEditDateEndActual(e.value)} showIcon disabled={localStorage.getItem("viewUsers") === "true"}/>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>SCHEDULE DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editScheduleDate} onChange={(e) => setEditScheduleDate(e.value)} showIcon disabled={disabledData}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>REMARKS:</b></h6>
                            <InputText placeholder="Add other remarks here" value={editRemarks} onChange={(e) => setEditRemarks(e.target.value)} disabled={disabledData}/>
                        </div>

                        <div className="p-col-12 p-md-9"> </div>
                        <div className="p-col-12 p-md-3" style={{ marginTop: '2%', paddingRight: '5%' }}>
                            {
                                localStorage.getItem("viewUsers") === "true" ? 
                                <Button label="SAVE CHANGES" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => editTask()}/> :
                                <Button label="SAVE CHANGES" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => editTaskFieldman()}/>
                            }
                        </div>
                    </div>
                </Dialog>
            </div>

            <Dialog header="JOB DETAILS" visible={displayJobDetails} style={{ width: '310px' }} onHide={() => onHide('displayJobDetails')} blockScroll={true}>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-lg-12" style={{paddingTop:'5%'}}>
                        <div className="p-grid p-nogutter">
                            <div className="p-col" style={{color: jobTypeColor}}>
                                <h3><b>Job No. {jobData.task_id}</b></h3>
                                <b style={{fontSize: '14px', color: jobTypeColor, textTransform: 'uppercase'}}>{jobData.job_order.type}</b>
                            </div>
                            <div className="p-col" style={{textAlign:'right'}}>
                                <small style={{fontSize: '13px', backgroundColor: statusColor, color: 'white', padding:'2px 5px 3px', borderRadius: '5px'}}>{status}</small>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        {
                            jobData.fieldman.map((x,index) =>
                                <div key={index}>
                                    <label>FIELDMAN: </label><b>{x.field_man}</b>
                                </div>
                            )
                        }
                    </div>
                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        <label>MANAGER: </label><b>{jobData.manager}</b>
                    </div>

                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-grid">
                            <div className="p-col">
                                <label>START DATE: </label><br></br>
                                <i className="pi pi-calendar"></i> <b>{jobData.start_date}</b>
                            </div>
                            <div className="p-col" >
                                <label>END DATE: </label><br></br>
                                <i className="pi pi-calendar-times"></i> <b>{jobData.end_date}</b>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-grid">
                            <div className="p-col">
                                <label>START DATE (ACTUAL): </label><br></br>
                                <i className="pi pi-calendar"></i> <b>{jobData.start_date_actual}</b>
                            </div>
                            <div className="p-col" >
                                <label>END DATE (ACTUAL): </label><br></br>
                                <i className="pi pi-calendar-times"></i> <b>{jobData.end_date_actual}</b>
                            </div>
                        </div>
                    </div>

                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-grid">
                            <div className="p-col">
                                BODY NO.: <br></br>
                                VIN NO.: <br></br>
                                PLATE NO.: <br></br>
                                MAKE: <br></br>
                                LOCATION: 
                            </div>
                            <div className="p-col">
                                <b>
                                    {jobData.body_no.body_no}<br></br>
                                    {jobData.body_no.vin_no}<br></br>
                                    {jobData.body_no.plate_no}<br></br>
                                    {jobData.body_no.make}<br></br>
                                    {jobData.body_no.current_loc}
                                </b>
                            </div>
                        </div>
                    </div>

                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-grid">
                            <div className="p-col">REMARKS:</div>
                            <div className="p-col"><b>{jobData.remarks}</b></div>
                        </div>
                    </div>

                    <div className="p-col-12 p-lg-6"> 
                        {
                            localStorage.getItem("viewUsers") === "true" ? 
                            <Button icon="pi pi-check" label="APPROVE" className="p-button-rounded p-button-success"
                            onClick={() => onClick('displayConfirmMN')} disabled={status !== "FOR APPROVAL"}/> 
                            :
                            <Button icon="pi pi-check-circle" label="APPROVAL" className="p-button-rounded p-button-warning"
                            onClick={() => onClick('displayConfirmFM')} disabled={status !== "PENDING"}/>
                        }
                    </div>
                    <div className="p-col-12 p-lg-6">
                        <Button icon="pi pi-pencil" label="EDIT" className="p-button-rounded" onClick={() => editAssignData()}/>
                    </div>
                </div>
            </Dialog>

            <Dialog header="CONFIRM" visible={displayConfirmFM} style={{ width: '280px' }} footer={renderFooter('displayConfirmFM')} onHide={() => onHide('displayConfirmFM')}>
                <div className="p-grid">
                    <div className="p-col-2">
                        <i className="pi pi-check-circle" style={{fontSize: '25px', color: 'orange'}}/>
                    </div>
                    <div className="p-col">
                        <h5><b>Approval Request</b></h5>
                        <div style={{fontSize: '16px'}}>Are you sure to submit approval? </div>
                    </div>
                </div>
            </Dialog>

            <Dialog header="CONFIRM" visible={displayConfirmMN} style={{ width: '280px' }} footer={renderFooter('displayConfirmMN')} onHide={() => onHide('displayConfirmMN')}>
                <div className="p-grid">
                    <div className="p-col-2">
                        <i className="pi pi-check" style={{fontSize: '25px', color: 'green'}}/>
                    </div>
                    <div className="p-col">
                        <h5><b>Approve Task</b></h5>
                        <div style={{fontSize: '16px'}}>Are you sure to approve this? </div>
                    </div>
                </div>
            </Dialog>

            <Dialog header="CONFIRM" visible={displayConfirmDelete} style={{ width: '280px' }} footer={renderFooter('displayConfirmDelete')} onHide={() => onHide('displayConfirmDelete')}>
                <div className="p-grid">
                    <div className="p-col-2">
                        <i className="pi pi-times" style={{fontSize: '25px', color: 'red'}}/>
                    </div>
                    <div className="p-col">
                        <h5><b>Delete Task</b></h5>
                        <div style={{fontSize: '16px'}}>Are you sure to delete this? </div>
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
    );
}

export default JobScheduling;