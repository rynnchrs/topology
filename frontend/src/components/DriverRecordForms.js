import React, {useState, useEffect } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputText } from 'primereact/inputtext';
import axios from "axios";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { format } from 'date-fns';
import './mycss.scss';

export default function DriverRecordForms() {
        const [selectedCar, setSelectedCar] = useState(['']);
        const [selectedBody, setSelectedBody] = useState(['']);
        const [carValues, setcarValues] = useState(['']);
        const [displayBasic, setDisplayBasic] = useState(false);
        const [position, setPosition] = useState('center');
        const [date2, setDate2] = useState(null);
        const [selectedLocation, setSelectedLocation] = useState(null);
        const cities = [
        { name: 'All Location', code: '' },
        { name: 'Marikina', code: 'Marikina' },
        { name: 'South Manila', code: 'South+Manila' },
        { name: 'North Manila', code: 'North+Manila' },
        { name: 'Mandaluyong', code: 'Mandaluyong' },
        { name: 'Quezon', code: 'Quezon' },
        { name: 'Makati', code: 'Makati' },
        { name: 'Batangas', code: 'Batangas' },
        { name: 'Pampanga', code: 'Pampanga' },
        { name: 'Laguna', code: 'Laguna' },
        { name: 'Tarlac', code: 'Tarlac' },
        { name: 'Nueva Ecija', code: 'Nueva+Ecija' },
        { name: 'Pangasinan', code: 'Pangasinan' },
        { name: 'Las Pinas', code: 'Las+Pinas' },
        { name: 'Bataan', code: 'Bataan' },
        { name: 'Zambales', code: 'Zambales' },
        ];

        const dialogFuncMap = {
            'displayBasic': setDisplayBasic,
        }

        const onClick = (name, position) => {
            dialogFuncMap[`${name}`](true);
    
            if (position) {
                setPosition(position);
            }

        }
    
        const onHide = (name) => {
            dialogFuncMap[`${name}`](false);
        }

         const submitSearch = () => {
            console.log(selectedLocation);
            let token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                };
            //console.log(selectedLocation.code);
            if(date2 === null && selectedLocation === null){
                axios.get(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/', config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
            }
            else if (date2 !== null && selectedLocation === null){
                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/?date_created=' + format(date2, 'yyyy-MM-dd'), config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
            }

            else if (date2 === null && selectedLocation !== null){

                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/?body_no__current_loc=' + selectedLocation.code, config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
            }
            else if (date2 !== null && selectedLocation !== null){
                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/?date_created=' + format(date2, 'yyyy-MM-dd')+'&body_no__current_loc=' + selectedLocation.code, config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
            }
         }

        const onChangeHandler = (e) => {
            console.log(e.target.value);
            setSelectedCar(e.target.value);

        }


        React.useEffect(function effectFunction() {
            fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/?ordering=-inspection_id')
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
        }, []);

        React.useEffect(() => {
            console.log(selectedCar)
            if (selectedCar) {
                let token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                };
                console.log(selectedCar.inspection_id);
                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection/'+ selectedCar.inspection_id + "/",config)
                    .then(response => response.json())
                    .then(data => {
                        setSelectedCar(data);
                        setSelectedBody(data.body_no,onClick('displayBasic'));
                    });
            }
        }, [selectedCar.inspection_id]);

        return(
            <div>
                <div className="p-grid">
            <div className="p-col-12 p-md-3">
            <Button label="Search" icon="pi pi-external-link" onClick={() => submitSearch()} />
            <Calendar id="icon" value={date2} onChange={(e) => setDate2(e.value)} showIcon />
            </div>
            <div className="p-col-12 p-md-3">
            <Dropdown value={selectedLocation} options={cities} onChange={(e) => setSelectedLocation(e.value)} optionLabel="name" placeholder="Select a Location" />
            </div>
            </div>
            <ListBox value={selectedCar} options={carValues} onChange={(e) =>  onChangeHandler(e)} filter optionLabel="body_no"/>
            
            <Dialog header="Fleet Vehicle Inspection Checklist Record" visible={displayBasic} style={{ width: '85vw' }} onHide={() => onHide('displayBasic')}>
            
                <div className="card card">
                    <div className="p-grid">
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="bodyno">Body No.:</label>
                            <InputText id="bodyno" value={selectedBody.body_no} />

                        </div>
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="make">Make:</label>
                            <InputText id="make" value={selectedBody.make= selectedBody.make === 'L30' ? 'L300 Exceed 2.5D MT': selectedBody.make === 'SUV' ? 'Super Carry UV': selectedBody.make ===  'G15'? 'Gratour midi truck 1.5L': selectedBody.make ===  'G12'? 'Gratour midi truck 1.2L': '' } />
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="mileage">Mileage:</label>
                            <InputText id="mileage" value={selectedCar.mileage} />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="location">Location:</label>
                            <InputText id="location" value={selectedBody.current_loc} />
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12 report-checklist">
                    <div className="card card-w-title">
                        <h1>Exterior</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-col widName" style={{height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Cleanliness</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.cleanliness_exterior}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.cleanliness_exterior}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Condition Rust</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1" checked={!selectedCar.condition_rust}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb2" checked={selectedCar.condition_rust}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Decals/Livery Intact</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1"  checked={!selectedCar.decals}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"   checked={selectedCar.decals}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Windows/Windscreen</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.windows}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.windows} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Rear Door</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1"   checked={!selectedCar.rear_door}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.rear_door} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{ height:'40px'}}><h4>Mirrors</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.mirror} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.mirror} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Roof Rack</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.roof_rack}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.roof_rack}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Rear Step</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.rear_step} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.rear_step}/></center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12 report-checklist">
                    <div className="card card-w-title">
                        <h1>Interior</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-col widName" style={{height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Seats</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.seats} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.seats} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Seat Belts</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1" checked={!selectedCar.seat_belts}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb2" checked={selectedCar.seat_belts}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>General Condition</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1"  checked={!selectedCar.general_condition}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"   checked={selectedCar.general_condition}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Vehicle Documents</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.vehicle_documents}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.vehicle_documents}/></center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12 report-checklist">
                    <div className="card card-w-title">
                        <h1>Engine Bay</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-col widName" style={{height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Cleanliness</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.cleanliness_engine_bay} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.cleanliness_engine_bay} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Washer Fluid</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1"  checked={!selectedCar.washer_fluid}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb2" checked={selectedCar.washer_fluid}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Coolant Level</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1"  checked={!selectedCar.coolant_level}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.coolant_level}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Brake Fluid Level</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.brake_fluid_level}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.brake_fluid_level} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Power Steering Fluid</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.power_steering_fluid}  /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.power_steering_fluid}/></center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12 report-checklist">
                    <div className="card card-w-title">
                        <h1>Electrics</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-col widName" style={{height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Main Beam</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.main_beam}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.main_beam}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Dipped Beam</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1"  checked={!selectedCar.dipped_beam} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb2" checked={selectedCar.dipped_beam} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Side Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1" checked={!selectedCar.side_lights} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.side_lights} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Tail Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.tail_lights} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.tail_lights}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Indicators</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1"  checked={!selectedCar.indicators}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.indicators}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{ height:'40px'}}><h4>Break Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.break_lights}  /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.break_lights}  /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Reverse Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.reverse_lights}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.reverse_lights}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Hazard Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.hazard_light}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.hazard_light}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Rear Fog Light</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.rear_fog_lights} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.rear_fog_lights}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Interior Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.interior_lights}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.interior_lights} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Screen Washer</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.screen_washer} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"checked={selectedCar.screen_washer} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Wiper Blades</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.wiper_blades} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.wiper_blades}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Horn</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.horn}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.horn} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Radio/CD</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.radio} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.radio}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Front Fog Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.front_fog_lights} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.front_fog_lights}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Air Conditioning</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.air_conditioning}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.air_conditioning}/></center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12 report-checklist">
                    <div className="card card-w-title">
                        <h1>Wheels and Tyres</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                        <div className="p-col widName" style={{height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Tyres</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.tyres}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.tyres}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Front (Visual)</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1" checked={!selectedCar.front_visual}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb2" checked={selectedCar.front_visual}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Rear (Visual)</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1" checked={!selectedCar.rear_visual}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.rear_visual} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Spare (Visual)</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.spare_visual}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.spare_visual}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Wheel Brace</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox  inputId="rb1"   checked={!selectedCar.wheel_brace}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.wheel_brace}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{ height:'40px'}}><h4>Jack</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.jack}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.jack}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Left Front</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.front_left_wheel} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.front_left_wheel} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Right Front</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1" checked={!selectedCar.front_right_wheel} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.front_right_wheel}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Left Rear</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.rear_left_wheel}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.rear_left_wheel}/></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{height:'40px'}}><h4>Right Rear</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb1"  checked={!selectedCar.rear_right_wheel}/></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox inputId="rb2" checked={selectedCar.rear_right_wheel}/></center>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Gas and Oil</h1>
                        <div className="p-grid">
                            <div className="p-col">
                                <center><h4><b>Gas Level</b></h4></center>
                            </div>
                            <div className="p-col">
                                <center><h4><b>Oil Level</b></h4></center>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col">
                                <center><Checkbox inputId="rb1"  checked={selectedCar.gas_level === 4} /></center>
                            </div>
                            <div className="p-col">
                                <center><Checkbox inputId="rb1"  checked={selectedCar.oil_level === 4} /></center>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col">
                                <center><Checkbox inputId="rb2"  checked={selectedCar.gas_level === 3}/></center>
                            </div>
                            <div className="p-col">
                                <center><Checkbox  inputId="rb2" checked={selectedCar.oil_level === 3} /></center>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col">
                                <center><Checkbox  inputId="rb3" checked={selectedCar.gas_level === 2} /></center>
                            </div>
                            <div className="p-col">
                                <center><Checkbox  inputId="rb3" checked={selectedCar.oil_level === 2} /></center>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col">
                                <center><Checkbox  inputId="rb4"  checked={selectedCar.gas_level === 1}/></center>
                            </div>
                            <div className="p-col">
                                <center><Checkbox  inputId="rb4"  checked={selectedCar.oil_level === 1}/></center>
                            </div>
                        </div>
                    </div>
                </div>


            <div className="card card-w-title">
                <h1>Checklist Report</h1>
                <div className="p-grid">
                    <div className="p-col-12 p-md-12">
                        <label>Comments:</label>
                        <div className="p-col-12 p-md-12">
                        <InputText placeholder="Comments" value={selectedCar.notes}/>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-12">
                        <label>Driver/ Operator:</label>
                        <div className="p-col-12 p-md-12">
                        <InputText placeholder="Inspected by" value={selectedCar.driver}/>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-12">
                        <label>Date:</label>
                        <div className="p-col-12 p-md-12">
                        <InputText placeholder="Inspected by" value={selectedCar.date_created}/>
                        </div>
                    </div>
                </div>
            </div>
            </Dialog>
            </div>
        )

    }
