import React, {useEffect, useState, useRef} from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import axios from "axios";
import { format } from 'date-fns';


export const JobScheduling = () => {

    const [jobList, setJobList] = useState([]);
    const [fullCalendarList, setFullCalendarList] = useState([]);
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

    const [makeData, setMakeData] = useState('');

    const [fieldman, setFieldman] = useState('');
    const [manager, setManager] = useState('');
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [bodyNo, setBodyNo] = useState('');
    const [remarks, setRemarks] = useState('none');

    //edit task form
    const [editJobNo, setEditJobNo] = useState('');
    const [editFieldman, setEditFieldman] = useState('');
    const [editManager, setEditManager] = useState('');
    const [editDateStart, setEditDateStart] = useState(null);
    const [editDateEnd, setEditDateEnd] = useState(null);
    const [editDateStartActual, setEditDateStartActual] = useState(null);
    const [editDateEndActual, setEditDateEndActual] = useState(null);
    const [editBodyNo, setEditBodyNo] = useState('');
    const [editRemarks, setEditRemarks] = useState('');


    const dt = useRef(null);
    const toast = useRef(null);

    const [displayJobDetails, setDisplayJobDetails] = useState(false);
    const [displayJobCreate, setDisplayJobCreate] = useState(false);
    const [displayJobEdit, setDisplayJobEdit] = useState(false);
    

    useEffect(() => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/', config)
            .then((res) => {
                setJobList(res.data);
                fullCalendarDisplay(res.data)
            })
            .catch((err) => {
                
            });
    }, []);

    const getTaskList = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/', config)
            .then((res) => {
                setJobList(res.data);
                fullCalendarDisplay(res.data)
            })
            .catch((err) => {
                
            });
    }

    const fullCalendarDisplay = (value) => {
        setFullCalendarList([]);
        value.map((v) => {
            return setFullCalendarList(fullCalendarList => [...fullCalendarList, {"title": v.task_id + " " + v.fieldman[0].field_man,
            "start": v.start_date, "end": v.end_date}]);
        });
    }

    const actionBody = (jobList) => {
        return (
            <div className="job-btn">
                <Button className="p-shadow-2" onClick={() => btnJobData(jobList)}>
                    <div className="p-fluid p-grid">
                        <div className="p-col-12 p-lg-12">
                            <div className="p-grid">
                                <div className="p-col">
                                <p style={{fontSize: '18px'}}><b>Job No. {jobList.job_order.job_no}</b></p>
                                </div>
                                <div className="p-col" style={{textAlign:'right'}}>
                                    <p><i className="pi pi-circle-on" style={{'color': 'orange'}}></i> PENDING</p>
                                </div>
                            </div>
                            <p><i className="pi pi-user"></i> {jobList.fieldman[0].field_man} <br></br>
                            <i className="pi pi-calendar"></i> {jobList.start_date} <br></br>
                            <i className="pi pi-calendar-times"></i> {jobList.end_date}</p>
                        </div>
                    </div>
                </Button>
            </div>
        );
    }

    const btnJobData = (value) => {
        if (value !== null) {
            setJobData(value);
            let m = value.body_no.make === "L30" ? 'L300 Exceed 2.5D MT': value.body_no.make === "SUV" ? 'Super Carry UV': value.body_no.make ===  'G15'? 'Gratour midi truck 1.5L': value.body_no.make ===  'G12'? 'Gratour midi truck 1.2L' : ''; 
            setMakeData(m);
            onClick('displayJobDetails')
        } else {
            onHide('displayJobDetails')
        }
    }

    const submitTask = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.post(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/', {
            job_order: {
                type: true
            },
            fieldman: [
                {field_man: fieldman},
                {field_man: fieldman}
            ],
            manager: manager,
            body_no: bodyNo,
            start_date: format(dateStart, 'yyyy-MM-dd'),
            end_date: format(dateEnd, 'yyyy-MM-dd'),
            remarks: remarks
        }, config)
        .then((res) => {
            console.log(res.data);
            getTaskList();
            
            toast.current.show({ severity: 'success', summary: 'Create Successful', detail: 'New task created.', life: 3000 });
            onHide('displayJobCreate');
        })
        .catch((err) => {
            console.log(err.response);
            if (err.toJSON().message === 'Network Error'){
                // setErrorMessage({title:"NETWEORK ERROR:", content:"Please check internet connection."});
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

    const editAssignData = () => {
        
        let splitDateStart = jobData.start_date.split("-");
        let splitDateEnd = jobData.end_date.split("-");
        let splitDateStartActual = jobData.start_date_actual.split("-");
        let splitDateEndActual = jobData.end_date_actual.split("-");
        let gmtDateStart = new Date(+splitDateStart[0], splitDateStart[1] - 1, +splitDateStart[2]);
        let gmtDateEnd = new Date(+splitDateEnd[0], splitDateEnd[1] - 1, +splitDateEnd[2]);
        let gmtDateStartActual = new Date(+splitDateStartActual[0], splitDateStartActual[1] - 1, +splitDateStartActual[2]);
        let gmtDateEndACtual = new Date(+splitDateEndActual[0], splitDateEndActual[1] - 1, +splitDateEndActual[2]);

        setEditJobNo(jobData.job_order.job_no);
        setEditFieldman(jobData.fieldman[0].field_man);
        setEditManager(jobData.manager);
        setEditDateStart(gmtDateStart);
        setEditDateEnd(gmtDateEnd);
        setEditDateStartActual(gmtDateStartActual);
        setEditDateEndActual(gmtDateEndACtual);
        setEditBodyNo(jobData.body_no.body_no);
        setEditRemarks(jobData.remarks);
        onHide('displayJobDetails'); 
        onClick('displayJobEdit');

    }

    const editTask = () => {
        console.log(editDateStart);
        console.log(editDateEnd);
        console.log(editDateStartActual);
        console.log(editDateEndActual);

        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.put(process.env.REACT_APP_SERVER_NAME + 'task/task-scheduling/' + editJobNo + '/', {
            job_order: {
                type: true
            },
            fieldman: [
                {field_man: editFieldman},
                {field_man: editFieldman}
            ],
            manager: editManager,
            body_no: editBodyNo,
            start_date: format(editDateStart, 'yyyy-MM-dd'),
            end_date: format(editDateEnd, 'yyyy-MM-dd'),
            start_date_actual: format(editDateStartActual, 'yyyy-MM-dd'),
            end_date_actual: format(editDateEndActual, 'yyyy-MM-dd'),
            remarks: editRemarks
        }, config)
        .then((res) => {
            getTaskList();
            toast.current.show({ severity: 'success', summary: 'Save successfully', detail: 'Task updated.', life: 3000 });
            onHide('displayJobEdit');
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

    const optionsFullCalendar = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultView: 'dayGridMonth',
        defaultDate: '2021-05-01',
        header: {
            left: '',
            center: 'title',
            right: 'prev,next'
        },
        editable: false
    };

    const dialogFuncMap = {
        'displayJobDetails': setDisplayJobDetails,
        'displayJobCreate': setDisplayJobCreate,
        'displayJobEdit': setDisplayJobEdit
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    return (
        <div className="p-grid p-fluid" >
            <Toast ref={toast} />
            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                <div className="card card-w-title">
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText placeholder="Search Task"/>
                            </span>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                            <Dropdown placeholder="Select Status" />
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                            <Calendar placeholder="Select Date"/>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                            
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="p-col-12 p-lg-4 p-md-5 p-sm-12">
                <div className="card" style={{paddingLeft:'1px', paddingRight:'1px', minWidth:'265px'}}>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <div className="p-grid">
                            <div className="p-col">
                                <h4>Task List</h4>
                            </div>
                            <div className="p-col">
                                <Button label="CREATE" icon="pi pi-pencil" onClick={() => onClick('displayJobCreate')}/>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <DataTable ref={dt} value={jobList} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                            scrollable scrollHeight="600px" emptyMessage="No data found">
                            <Column body={actionBody}  style={{ textAlign: 'center' }}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
            <div className="p-col-12 p-lg-8 p-md-7 p-sm-12">
                <div className="card">
                    <FullCalendar events={fullCalendarList} options={optionsFullCalendar} />
                </div>
            </div>

            <div className="dialog-display">
                <Dialog header="CREATE TASK" visible={displayJobCreate} onHide={() => onHide('displayJobCreate')}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>FIELDMAN:</b></h6>
                            <InputText placeholder="Input Name" value={fieldman} onChange={(e) => setFieldman(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>MANAGER:</b></h6>
                            <InputText placeholder="Input Name" value={manager} onChange={(e) => setManager(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>START DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={dateStart} onChange={(e) => setDateStart(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>END DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={dateEnd} onChange={(e) => setDateEnd(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>VEHICLE: </b><i>(Body No.)</i></h6>
                            <InputText placeholder="Input Vehicle(Body No.)" value={bodyNo} onChange={(e) => setBodyNo(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>REMARKS:</b></h6>
                            <InputText placeholder="Add other remarks here" value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
                        </div>

                        <div className="p-col-12 p-md-9"> </div>
                        <div className="p-col-12 p-md-3" style={{ marginTop: '2%', paddingRight: '5%' }}>
                            <Button label="CREATE" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitTask()}/>
                        </div>
                           
                    </div>
                </Dialog>

                <Dialog header="EDIT TASK" visible={displayJobEdit} onHide={() => onHide('displayJobEdit')}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>JOB NO.:</b></h6>
                            <InputText placeholder="Input Job No" value={editJobNo} disabled/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>FIELDMAN:</b></h6>
                            <InputText placeholder="Input Name" value={editFieldman} onChange={(e) => setEditFieldman(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>MANAGER:</b></h6>
                            <InputText placeholder="Input Name" value={editManager} onChange={(e) => setEditManager(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>START DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editDateStart} onChange={(e) => setEditDateStart(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>END DATE:</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editDateEnd} onChange={(e) => setEditDateEnd(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>START DATE(ACTUAL):</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editDateStartActual} onChange={(e) => setEditDateStartActual(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>END DATE(ACTUAL):</b></h6>
                            <Calendar id="icon" placeholder="Input Date" value={editDateEndActual} onChange={(e) => setEditDateEndActual(e.value)} showIcon />
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>VEHICLE: </b><i>(Body No.)</i></h6>
                            <InputText placeholder="Input Vehicle(Body No.)" value={editBodyNo} onChange={(e) => setEditBodyNo(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{ paddingLeft: '5%', paddingRight: '5%', marginTop: '2%' }}>
                            <h6><b>REMARKS:</b></h6>
                            <InputText placeholder="Add other remarks here" value={editRemarks} onChange={(e) => setEditRemarks(e.target.value)}/>
                        </div>

                        <div className="p-col-12 p-md-9"> </div>
                        <div className="p-col-12 p-md-3" style={{ marginTop: '2%', paddingRight: '5%' }}>
                            <Button label="SAVE CHANGES" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => editTask()}/>
                        </div>
                           
                    </div>
                </Dialog>
            </div>

            <Dialog header="JOB DETAILS" visible={displayJobDetails} style={{ width: '310px' }} onHide={() => onHide('displayJobDetails')}>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-lg-12" style={{paddingTop:'5%'}}>
                        <div className="p-grid">
                            <div className="p-col" style={{color:'blue'}}>
                                <h3><b>Job No. {jobData.job_order.job_no}</b></h3>
                            </div>
                            <div className="p-col" style={{textAlign:'right'}}>
                                <p><i className="pi pi-circle-on" style={{'color': 'orange'}}></i> PENDING</p>
                            </div>
                            
                        </div>
                    </div>

                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        <label>FIELDMAN: </label><b>{jobData.fieldman[0].field_man}</b>
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
                                <i className="pi pi-calendar-times"></i><b>{jobData.end_date_actual}</b>
                            </div>
                        </div>
                    </div>

                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-grid">
                            <div className="p-col-12 p-lg-4">
                                BODY NO.: <br></br>
                                VIN NO.: <br></br>
                                PLATE NO.: <br></br>
                                MAKE: <br></br>
                                LOCATION: 
                            </div>
                            <div className="p-col-12 p-lg-8">
                                <b>
                                    {jobData.body_no.body_no}<br></br>
                                    {jobData.body_no.vin_no}<br></br>
                                    {jobData.body_no.plate_no}<br></br>
                                    {makeData}<br></br>
                                    {jobData.body_no.current_loc}
                                </b>
                            </div>
                        </div>
                    </div>

                    <div className="p-col-12 p-lg-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-grid">
                            <div className="p-col-12 p-lg-4">REMARKS:</div>
                            <div className="p-col-12 p-lg-8"><b>{jobData.remarks}</b></div>
                        </div>
                    </div>

                    <div className="p-col-12 p-lg-7"> </div>
                    <div className="p-col-12 p-lg-5">
                        <Button label="EDIT" className="p-button-md p-button-rounded" onClick={() => editAssignData()}/>
                    </div>

                </div>
            </Dialog>



        </div>

    );

}

export default JobScheduling;