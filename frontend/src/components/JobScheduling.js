import React, {useEffect} from 'react';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';


export const JobScheduling = () => {

    const samples = {
        id : 0, manager : 'admin', car : '18-1654', job_order : '2021-A', job_desc : '0',
        job_remarks : 'ongoing', job_startdate : '2021-05-11', job_enddate : '2021-05-20', 
        job_startdate_actual : '2021-05-12', job_enddate_actual : '2021-05-21', job_actual_days : '11',
        job_task_status_fm : true, job_task_status_mn : true,
    };

    const schedules = [
        {id : 0, manager : 'admin', car : '18-1654', job_order : '2021-A', job_desc : '0',
        job_remarks : 'ongoing', job_startdate : '2021-05-11', job_enddate : '2021-05-20', 
        job_startdate_actual : '2021-05-12', job_enddate_actual : '2021-05-21', job_actual_days : '11',
        job_task_status_fm : true, job_task_status_mn : true, 
        title: 'Admin Task', start: '2021-05-11', end: '2021-05-20'},

        {id : 1, manager : 'fieldman', car : '18-1654', job_order : '2021-B', job_desc : '0',
        job_remarks : 'ongoing', job_startdate : '2021-05-12', job_enddate : '2021-05-15', 
        job_startdate_actual : '2021-05-12', job_enddate_actual : '2021-05-21', job_actual_days : '11',
        job_task_status_fm : true, job_task_status_mn : true, 
        title: 'Fieldman Task', start: '2021-05-12', end: '2021-05-15'}
    ];

    const schedules1 = [{0:
        {id : 0, manager : 'admin', car : '18-1654', job_order : '2021-A', job_desc : '0',
        job_remarks : 'ongoing', job_startdate : '2021-05-11', job_enddate : '2021-05-20', 
        job_startdate_actual : '2021-05-12', job_enddate_actual : '2021-05-21', job_actual_days : '11',
        job_task_status_fm : true, job_task_status_mn : true, 
        title: 'Admin Task', start: '2021-05-11', end: '2021-05-20'}},

        {1:{id : 1, manager : 'fieldman', car : '18-1654', job_order : '2021-B', job_desc : '0',
        job_remarks : 'ongoing', job_startdate : '2021-05-12', job_enddate : '2021-05-15', 
        job_startdate_actual : '2021-05-12', job_enddate_actual : '2021-05-21', job_actual_days : '11',
        job_task_status_fm : true, job_task_status_mn : true, 
        title: 'Fieldman Task', start: '2021-05-12', end: '2021-05-15'}}
    ];

    const optionsFullCalendar = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultView: 'dayGridMonth',
        defaultDate: '2021-05-01',
        header: {
            left: '',
            center: 'title',
            right: 'prev,next'
        },
        editable: true,
        dateClick: (e) =>  {
            //handle date click
            console.log("AW", e)
        }
    };

    function jobOrderList() {
        schedules.map(result => {
            console.log('test');
        })
    };

    useEffect(() => {
        jobOrderList();
    },[]);

    return (
        <div className="p-grid p-fluid" >
            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                <h2><b>Job Schedule</b></h2>
            </div>
            
            
            <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                <div className="card">
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <h4><b>Job Order List</b></h4>
                        <div>
                        {
                           jobOrderList()
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-col-12 p-lg-8 p-md-8 p-sm-12">
                <div className="card">
                    <FullCalendar events={schedules} options={optionsFullCalendar} />
                </div>
            </div>
           
        </div>

    );

}

export default JobScheduling;