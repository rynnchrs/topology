import React, {useState, useEffect, useRef } from 'react';


import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';


import {DummyDataSvc} from '../service/DummyDataSvc';


import axios from "axios";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { format } from 'date-fns';


import { Fieldset } from 'primereact/fieldset';

export default function TSManager() {
    const [products, setProducts] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const toast = useRef(null);

    const [events, setEvents] = useState([]);
    const options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultView: 'dayGridMonth',
        defaultDate: '2021-02-01',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: false,
        displayEventTime: false
    };


    const dummySvc = new DummyDataSvc();

    useEffect(() => {
        dummySvc.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowSelect = (event) => {
        toast.current.show({ severity: 'info', summary: 'Job Selected', detail: 'Vehicle: ' + event.data.plate_no, life: 3000 });
    }

    const onRowUnselect = (event) => {
        toast.current.show({ severity: 'warn', summary: 'Job Unselected', detail: 'Vehicle: ' + event.data.plate_no, life: 3000 });
    }

    return(
        <div>

            <Toast ref={toast} />

            <Fieldset legend="Job Schedule Management" className="p-grid p-dir-col">
                <div className="p-grid">

                    <div className="p-col-12" name="searchbox">                           
                            <InputText placeholder={"Type Vehicle Plate Number"} style={{width: '100%'}} />
                    </div>

                    <div className="p-grid p-col-12">
                        <div className="p-col-12">
                            <Fieldset legend="Jobs List">    
                                <DataTable value={products} selection={selectedJob} onSelectionChange={e => setSelectedJob(e.value)} selectionMode="single" dataKey="plate_no"
                                    onRowSelect={onRowSelect} onRowUnselect={onRowUnselect}>
                                    <Column field="plate_no" header="Plate Number"></Column>
                                    <Column field="title" header="Job"></Column>
                                    <Column field="manager_id" header="Assigned By"></Column>
                                    <Column field="start" header="Date Start"></Column>
                                    <Column field="actual_start" header="Actual Start"></Column>
                                    <Column field="job_done" header="Status"></Column>
                                </DataTable>
                            </Fieldset>
                        </div>
                        <div className="p-col-12">
                        <Fieldset legend="Jobs Calendar">  
                    
                            <FullCalendar events={products} options={options} />
            
                        </Fieldset>
                        </div>
                        
                       
                    
                    </div>

                </div>

                
                
            </Fieldset>
        </div>
    )

    }
