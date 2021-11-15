import React, {useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

import axios from "axios";

export default function FieldInspectionReport() {

    const [fieldInspectionNotCreatedList, setFieldInspectionNotCreatedList] = useState([]);
    const [fieldInspectionData, setFieldInspectionData] = useState([]);
    const [notes, setNotes] = useState("");
    const [theLabel, setTheLabel] = useState("");
    const [theIndex, setTheIndex] = useState("");
    const [theType, setTheType] = useState("");

    const [dateInspection, setDateInspection] = useState(null);
    const [year, setYear] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [mileage, setMileage] = useState("");
    const [bodyNo, setBodyNo] = useState("");
    const [bodyStyle, setBodyStyle] = useState("");
    const [transmission, setTransmission] = useState("");
    const [engine, setEngine] = useState("");
    const [driverType, setDriverType] = useState("");
    const [inspector, setInspector] = useState("CARETA");
    const [location, setLocation] = useState("");
    const [exteriorColor, setExteriorColor] = useState("");
    const [doorCount, setDoorCount] = useState("");
    const [condition, setCondition] = useState("");
    const refImageUpload = useRef(null);

    const toast = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});
    const [displayNotes, setDisplayNotes] = useState(false);
    

    useEffect(() => {
        getFieldInspectionNotCreated();
    }, []);

    const getFieldInspectionNotCreated = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'task/job-order/fi_inspection_not_created/', config)
            .then((res) => {
                setFieldInspectionNotCreatedList(res.data);
            })
            .catch((err) => {
                
            });
    }

    const [exterior, setExterior] = useState([
        {g: false, f: false, p: false, label: "Hood", notes: ""},
        {g: false, f: false, p: false, label: "Front", notes: ""},
        {g: false, f: false, p: false, label: "Front Bumper", notes: ""},
        {g: false, f: false, p: false, label: "Fenders", notes: ""},
        {g: false, f: false, p: false, label: "Doors", notes: ""},
        {g: false, f: false, p: false, label: "Roof", notes: ""},
        {g: false, f: false, p: false, label: "Rear", notes: ""},
        {g: false, f: false, p: false, label: "Rear Bumper", notes: ""},
        {g: false, f: false, p: false, label: "Trunk", notes: ""},
        {g: false, f: false, p: false, label: "Trim", notes: "" },
        {g: false, f: false, p: false, label: "Fuel Door", notes: ""},
        {g: false, f: false, p: false, label: "Paint Condition", notes: ""},
    ]);

    const [glass, setGlass] = useState([
        {g: false, f: false, p: false, label: "Windshield", notes: ""},
        {g: false, f: false, p: false, label: "Windows", notes: ""},
        {g: false, f: false, p: false, label: "Mirrors", notes: ""},
        {g: false, f: false, p: false, label: "Rear Window", notes: ""}
    ]);

    const [tiresWheels, setTiresWheels] = useState([
        {g: false, f: false, p: false, label: "Condition of Tires", notes: ""},
        {g: false, f: false, p: false, label: "Condition of Wheels", notes: ""},
        {g: false, f: false, p: false, label: "Spare Tire", notes: ""}
    ]);

    const [underbody, setUnderbody] = useState([
        {g: false, f: false, p: false, label: "Frame", notes: ""},
        {g: false, f: false, p: false, label: "Exhaust System", notes: ""},
        {g: false, f: false, p: false, label: "Transmission", notes: ""},
        {g: false, f: false, p: false, label: "Drive Axie", notes: ""},
        {g: false, f: false, p: false, label: "Suspension", notes: ""},
        {g: false, f: false, p: false, label: "Brake System", notes: ""}
    ]);

    const [underhood, setUnderhood] = useState([
        {g: false, f: false, p: false, label: "Engine Compartment", notes: ""},
        {g: false, f: false, p: false, label: "Battery", notes: ""},
        {g: false, f: false, p: false, label: "Oil", notes: ""},
        {g: false, f: false, p: false, label: "Fluids", notes: ""},
        {g: false, f: false, p: false, label: "Wiring", notes: ""},
        {g: false, f: false, p: false, label: "Belts", notes: ""},
        {g: false, f: false, p: false, label: "Hoses", notes: ""},
        {g: false, f: false, p: false, label: "Any Non-Stock Modifications", notes: ""}
    ]);

    const [interior, setInterior] = useState([
        {g: false, f: false, p: false, label: "Seats", notes: ""},
        {g: false, f: false, p: false, label: "Headliner", notes: ""},
        {g: false, f: false, p: false, label: "Carpet"},
        {g: false, f: false, p: false, label: "Door Panels", notes: ""},
        {g: false, f: false, p: false, label: "Glove Box", notes: ""},
        {g: false, f: false, p: false, label: "Vanity Mirrors", notes: ""},
        {g: false, f: false, p: false, label: "Interior Trim", notes: ""},
        {g: false, f: false, p: false, label: "Dashboard", notes: ""},
        {g: false, f: false, p: false, label: "Dashboard Gauges", notes: ""},
        {g: false, f: false, p: false, label: "Air Conditioning", notes: ""},
        {g: false, f: false, p: false, label: "Heater", notes: ""},
        {g: false, f: false, p: false, label: "Defroster", notes: ""}
    ]);

    const [electricalSystem, setElectricalSystem] = useState([
        {g: false, f: false, p: false, label: "Power Locks", notes: ""},
        {g: false, f: false, p: false, label: "Power Seats", notes: ""},
        {g: false, f: false, p: false, label: "Power Steering", notes: ""},
        {g: false, f: false, p: false, label: "Power Windows", notes: ""},
        {g: false, f: false, p: false, label: "Power Mirrors", notes: ""},
        {g: false, f: false, p: false, label: "Audio System", notes: ""},
        {g: false, f: false, p: false, label: "Onboard Computer", notes: ""},
        {g: false, f: false, p: false, label: "Headlights", notes: ""},
        {g: false, f: false, p: false, label: "Taillights", notes: ""},
        {g: false, f: false, p: false, label: "Signal Lights", notes: ""},
        {g: false, f: false, p: false, label: "Brake Lights", notes: ""},
        {g: false, f: false, p: false, label: "Parking Lights", notes: ""}
    ]);

    const [roadTestFindings, setRoadTestFindings] = useState([
        {g: false, f: false, p: false, label: "Starting", notes: ""},
        {g: false, f: false, p: false, label: "Idling", notes: ""},
        {g: false, f: false, p: false, label: "Engine Performance", notes: ""},
        {g: false, f: false, p: false, label: "Acceleration", notes: ""},
        {g: false, f: false, p: false, label: "Transmission Shift Quality", notes: ""},
        {g: false, f: false, p: false, label: "Steering", notes: ""},
        {g: false, f: false, p: false, label: "Braking", notes: ""},
        {g: false, f: false, p: false, label: "Suspension Performance", notes: ""}
    ]);

    const submitFieldInspection = () => {
        console.log(exterior)
        let flagChecking = true;

        if (flagChecking === true) {
            for (var i = 0; i < exterior.length; i++) {
                if (exterior[i].g === false && exterior[i].f === false && exterior[i].p === false) {
                    toast.current.show({severity: 'error', summary: 'EXTERIOR', detail: 'Please check one: ' + exterior[i].label, life: 3000});
                    flagChecking = false;
                    break;
                }
            }
        }

        if (flagChecking === true) {
            for (var i = 0; i < glass.length; i++) {
                if (glass[i].g === false && glass[i].f === false && glass[i].p === false) {
                    toast.current.show({severity: 'error', summary: 'GLASS', detail: 'Please check one: ' + glass[i].label, life: 3000});
                    flagChecking = false;
                    break;
                }
            }
        }

        if (flagChecking === true) {
            for (var i = 0; i < tiresWheels.length; i++) {
                if (tiresWheels[i].g === false && tiresWheels[i].f === false && tiresWheels[i].p === false) {
                    toast.current.show({severity: 'error', summary: 'TIRES AND WHEELS', detail: 'Please check one: ' + tiresWheels[i].label, life: 3000});
                    flagChecking = false;
                    break;
                }
            }
        }
        
        if (flagChecking === true) {
            for (var i = 0; i < underbody.length; i++) {
                if (underbody[i].g === false && underbody[i].f === false && underbody[i].p === false) {
                    toast.current.show({severity: 'error', summary: 'UNDERBODY', detail: 'Please check one: ' + underbody[i].label, life: 3000});
                    flagChecking = false;
                    break;
                }
            }
        }

        if (flagChecking === true) {
            for (var i = 0; i < underhood.length; i++) {
                if (underhood[i].g === false && underhood[i].f === false && underhood[i].p === false) {
                    toast.current.show({severity: 'error', summary: 'UNDERBODY', detail: 'Please check one: ' + underhood[i].label, life: 3000});
                    flagChecking = false;
                    break;
                }
            }
        }

        if (flagChecking === true) {
            for (var i = 0; i < interior.length; i++) {
                if (interior[i].g === false && interior[i].f === false && interior[i].p === false) {
                    toast.current.show({severity: 'error', summary: 'INTERIOR', detail: 'Please check one: ' + interior[i].label, life: 3000});
                    flagChecking = false;
                    break;
                }
            }
        }

        if (flagChecking === true) {
            for (var i = 0; i < electricalSystem.length; i++) {
                if (electricalSystem[i].g === false && electricalSystem[i].f === false && electricalSystem[i].p === false) {
                    toast.current.show({severity: 'error', summary: 'ELECTRICAL SYSTEM', detail: 'Please check one: ' + electricalSystem[i].label, life: 3000});
                    flagChecking = false;
                    break;
                }
            }
        }

        if (flagChecking === true) {
            for (var i = 0; i < roadTestFindings.length; i++) {
                if (roadTestFindings[i].g === false && roadTestFindings[i].f === false && roadTestFindings[i].p === false) {
                    toast.current.show({severity: 'error', summary: 'road test findings', detail: 'Please check one: ' + roadTestFindings[i].label, life: 3000});
                    flagChecking = false;
                    break;
                }
            }
        }

        if (flagChecking === true) {
            if (typeof(fieldInspectionData.job_id) === "undefined") {
                toast.current.show({ severity: 'error', summary: 'REPORT NO.', detail: 'Please select report no. first.', life: 3000 });
            } else if (dateInspection === null) { 
                toast.current.show({ severity: 'error', summary: 'INSPECTION DATE:', detail: 'This field is required.', life: 3000 });
            } else if (mileage === "") { 
                toast.current.show({ severity: 'error', summary: 'MILEAGE', detail: 'This field is required.', life: 3000 });
            } 
            // else if (bodyStyle === "") { 
            //     toast.current.show({ severity: 'error', summary: 'BODY STYLE', detail: 'This field is required.', life: 3000 });
            // } else if (driverType === "") { 
            //     toast.current.show({ severity: 'error', summary: 'DRIVER TYPE', detail: 'This field is required.', life: 3000 });
            // } 
            // else if (inspector === "") { 
            //     toast.current.show({ severity: 'error', summary: 'INSPECTOR', detail: 'This field is required.', life: 3000 });
            // } 
            else if (doorCount === "") { 
                toast.current.show({ severity: 'error', summary: 'DOOR COUNT', detail: 'This field is required.', life: 3000 });
            } else {
                setIsLoading(true);
                let token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                };

                axios.post(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/', {
                    "task": fieldInspectionData.task.task_id,
                    "job_order": fieldInspectionData.job_no,
                    "body_no": bodyNo,
                    "approved_by": "",
                    "noted_by": "",
                    "mileage": mileage,
                    "body_style": bodyStyle === "" ? null : bodyStyle,
                    "drive_type": driverType === "" ? null : driverType,
                    "door_count": doorCount,
                    "hood": exterior[0].g === true ? "G" : exterior[0].p === true ? "P" : "F",
                    "hood_note": exterior[0].notes === "" ? null : exterior[0].notes,
                    "front": exterior[1].g === true ? "G" : exterior[1].p === true ? "P" : "F",
                    "front_note": exterior[1].notes === "" ? null : exterior[1].notes,
                    "front_bumper": exterior[2].g === true ? "G" : exterior[2].p === true ? "P" : "F",
                    "front_bumper_note": exterior[2].notes === "" ? null : exterior[2].notes,
                    "fenders": exterior[3].g === true ? "G" : exterior[3].p === true ? "P" : "F",
                    "fenders_note": exterior[3].notes === "" ? null : exterior[3].notes,
                    "doors": exterior[4].g === true ? "G" : exterior[4].p === true ? "P" : "F",
                    "doors_note": exterior[4].notes === "" ? null : exterior[4].notes,
                    "roof": exterior[5].g === true ? "G" : exterior[5].p === true ? "P" : "F",
                    "roof_note": exterior[5].notes === "" ? null : exterior[5].notes,
                    "rear": exterior[6].g === true ? "G" : exterior[6].p === true ? "P" : "F",
                    "rear_note": exterior[6].notes === "" ? null : exterior[6].notes,
                    "rear_bumper": exterior[7].g === true ? "G" : exterior[7].p === true ? "P" : "F",
                    "rear_bumper_note": exterior[7].notes === "" ? null : exterior[7].notes,
                    "trunk": exterior[8].g === true ? "G" : exterior[8].p === true ? "P" : "F",
                    "trunk_note": exterior[8].notes === "" ? null : exterior[8].notes,
                    "trim": exterior[9].g === true ? "G" : exterior[9].p === true ? "P" : "F",
                    "trim_note": exterior[9].notes === "" ? null : exterior[9].notes,
                    "fuel_door": exterior[10].g === true ? "G" : exterior[10].p === true ? "P" : "F",
                    "fuel_door_note": exterior[10].notes === "" ? null : exterior[10].notes,
                    "pait_condition": exterior[11].g === true ? "G" : exterior[11].p === true ? "P" : "F",
                    "pait_condition_note": exterior[11].notes === "" ? null : exterior[11].notes,

                    "windshield": glass[0].g === true ? "G" : glass[0].p === true ? "P" : "F",
                    "windshield_note": glass[0].notes === "" ? null : glass[0].notes,
                    "windows": glass[1].g === true ? "G" : glass[1].p === true ? "P" : "F",
                    "windows_note": glass[1].notes === "" ? null : glass[1].notes,
                    "mirrors": glass[2].g === true ? "G" : glass[2].p === true ? "P" : "F",
                    "mirrors_note": glass[2].notes === "" ? null : glass[2].notes,
                    "rear_window": glass[3].g === true ? "G" : glass[3].p === true ? "P" : "F",
                    "rear_window_note": glass[3].notes === "" ? null : glass[3].notes,

                    "tires_condition": tiresWheels[0].g === true ? "G" : tiresWheels[0].p === true ? "P" : "F",
                    "tires_condition_note": tiresWheels[0].notes === "" ? null : tiresWheels[0].notes,
                    "wheels_condition": tiresWheels[1].g === true ? "G" : tiresWheels[1].p === true ? "P" : "F",
                    "wheels_condition_note": glass[1].notes === "" ? null : glass[1].notes,
                    "spare_tire": tiresWheels[2].g === true ? "G" : tiresWheels[2].p === true ? "P" : "F",
                    "spare_tire_note": tiresWheels[2].notes === "" ? null : tiresWheels[2].notes,

                    "frame": underbody[0].g === true ? "G" : underbody[0].p === true ? "P" : "F",
                    "frame_note": underbody[0].notes === "" ? null : underbody[0].notes,
                    "exhaust_system": underbody[1].g === true ? "G" : underbody[1].p === true ? "P" : "F",
                    "exhaust_system_note": underbody[1].notes === "" ? null : underbody[1].notes,
                    "transmission": underbody[2].g === true ? "G" : underbody[2].p === true ? "P" : "F",
                    "transmission_note": underbody[2].notes === "" ? null : underbody[2].notes,
                    "drive_axle": underbody[3].g === true ? "G" : underbody[3].p === true ? "P" : "F",
                    "drive_axle_note": underbody[3].notes === "" ? null : underbody[3].notes,
                    "suspension": underbody[4].g === true ? "G" : underbody[4].p === true ? "P" : "F",
                    "suspension_note": underbody[4].notes === "" ? null : underbody[4].notes,
                    "breake_system": underbody[5].g === true ? "G" : underbody[5].p === true ? "P" : "F",
                    "breake_system_note": underbody[5].notes === "" ? null : underbody[5].notes,

                    "engine_compartment": underhood[0].g === true ? "G" : underhood[0].p === true ? "P" : "F",
                    "engine_compartment_note": underhood[0].notes === "" ? null : underhood[0].notes,
                    "battery": underhood[1].g === true ? "G" : underhood[1].p === true ? "P" : "F",
                    "battery_note": underhood[1].notes === "" ? null : underhood[1].notes,
                    "oil": underhood[2].g === true ? "G" : underhood[2].p === true ? "P" : "F",
                    "oil_note": underhood[2].notes === "" ? null : underhood[2].notes,
                    "fluids": underhood[3].g === true ? "G" : underhood[3].p === true ? "P" : "F",
                    "fluids_note": underhood[3].notes === "" ? null : underhood[3].notes,
                    "wiring": underhood[4].g === true ? "G" : underhood[4].p === true ? "P" : "F",
                    "wiring_note": underhood[4].notes === "" ? null : underhood[4].notes,
                    "belts": underhood[5].g === true ? "G" : underhood[5].p === true ? "P" : "F",
                    "belts_note": underhood[5].notes === "" ? null : underhood[5].notes,
                    "hoses": underhood[6].g === true ? "G" : underhood[6].p === true ? "P" : "F",
                    "hoses_note": underhood[6].notes === "" ? null : underhood[6].notes,
                    "non_stock_modif": underhood[7].g === true ? "G" : underhood[7].p === true ? "P" : "F",
                    "non_stock_modif_note": underhood[7].notes === "" ? null : underhood[7].notes,

                    "seats": interior[0].g === true ? "G" : interior[0].p === true ? "P" : "F",
                    "seats_note": interior[0].notes === "" ? null : interior[0].notes,
                    "headliner": interior[1].g === true ? "G" : interior[1].p === true ? "P" : "F",
                    "headliner_note": interior[1].notes === "" ? null : interior[1].notes,
                    "carpet": interior[2].g === true ? "G" : interior[2].p === true ? "P" : "F",
                    "carpet_note": interior[2].notes === "" ? null : interior[2].notes,
                    "door_panels": interior[3].g === true ? "G" : interior[3].p === true ? "P" : "F",
                    "door_panels_note": interior[3].notes === "" ? null : interior[3].notes,
                    "glove_box": interior[4].g === true ? "G" : interior[4].p === true ? "P" : "F",
                    "glove_box_note": interior[4].notes === "" ? null : interior[4].notes,
                    "vanity_mirrors": interior[5].g === true ? "G" : interior[5].p === true ? "P" : "F",
                    "vanity_mirrors_note": interior[5].notes === "" ? null : interior[5].notes,
                    "interioir_trim": interior[6].g === true ? "G" : interior[6].p === true ? "P" : "F",
                    "interioir_trim_note": interior[6].notes === "" ? null : interior[6].notes,
                    "dashboard": interior[7].g === true ? "G" : interior[7].p === true ? "P" : "F",
                    "dashboard_note": interior[7].notes === "" ? null : interior[7].notes,
                    "dashboard_gauges": interior[8].g === true ? "G" : interior[8].p === true ? "P" : "F",
                    "dashboard_gauges_note": interior[8].notes === "" ? null : interior[8].notes,
                    "air_conditioning": interior[9].g === true ? "G" : interior[9].p === true ? "P" : "F",
                    "air_conditioning_note": interior[9].notes === "" ? null : interior[9].notes,
                    "heater": interior[10].g === true ? "G" : interior[10].p === true ? "P" : "F",
                    "heater_note": interior[10].notes === "" ? null : interior[10].notes,
                    "defroster": interior[11].g === true ? "G" : interior[11].p === true ? "P" : "F",
                    "defroster_note": interior[11].notes === "" ? null : interior[11].notes,

                    "power_locks": electricalSystem[0].g === true ? "G" : electricalSystem[0].p === true ? "P" : "F",
                    "power_locks_note":  electricalSystem[0].notes === "" ? null : electricalSystem[0].notes,
                    "power_seats": electricalSystem[1].g === true ? "G" : electricalSystem[1].p === true ? "P" : "F",
                    "power_seats_note": electricalSystem[1].notes === "" ? null : electricalSystem[1].notes,
                    "power_steering": electricalSystem[2].g === true ? "G" : electricalSystem[2].p === true ? "P" : "F",
                    "power_steering_note": electricalSystem[2].notes === "" ? null : electricalSystem[2].notes,
                    "power_windows": electricalSystem[3].g === true ? "G" : electricalSystem[3].p === true ? "P" : "F",
                    "power_windows_note": electricalSystem[3].notes === "" ? null : electricalSystem[3].notes,
                    "power_mirrors": electricalSystem[4].g === true ? "G" : electricalSystem[4].p === true ? "P" : "F",
                    "power_mirrors_note": electricalSystem[4].notes === "" ? null : electricalSystem[4].notes,
                    "audio_system": electricalSystem[5].g === true ? "G" : electricalSystem[5].p === true ? "P" : "F",
                    "audio_system_note": electricalSystem[5].notes === "" ? null : electricalSystem[5].notes,
                    "onboard_computer": electricalSystem[6].g === true ? "G" : electricalSystem[6].p === true ? "P" : "F",
                    "onboard_computer_note": electricalSystem[6].notes === "" ? null : electricalSystem[6].notes,
                    "headlights": electricalSystem[7].g === true ? "G" : electricalSystem[7].p === true ? "P" : "F",
                    "headlights_note": electricalSystem[7].notes === "" ? null : electricalSystem[7].notes,
                    "taillights": electricalSystem[8].g === true ? "G" : electricalSystem[8].p === true ? "P" : "F",
                    "taillights_note": electricalSystem[8].notes === "" ? null : electricalSystem[8].notes,
                    "signal_lights": electricalSystem[9].g === true ? "G" : electricalSystem[9].p === true ? "P" : "F",
                    "signal_lights_note": electricalSystem[9].notes === "" ? null : electricalSystem[9].notes,
                    "brake_lights": electricalSystem[10].g === true ? "G" : electricalSystem[10].p === true ? "P" : "F",
                    "brake_lights_note": electricalSystem[10].notes === "" ? null : electricalSystem[10].notes,
                    "parking_lights": electricalSystem[11].g === true ? "G" : electricalSystem[11].p === true ? "P" : "F",
                    "parking_lights_note": electricalSystem[11].notes === "" ? null : electricalSystem[11].notes,

                    "starting": roadTestFindings[0].g === true ? "G" : roadTestFindings[0].p === true ? "P" : "F",
                    "starting_note": roadTestFindings[0].notes === "" ? null : roadTestFindings[0].notes,
                    "idling": roadTestFindings[1].g === true ? "G" : roadTestFindings[1].p === true ? "P" : "F",
                    "idling_note": roadTestFindings[1].notes === "" ? null : roadTestFindings[1].notes,
                    "engine_performance": roadTestFindings[2].g === true ? "G" : roadTestFindings[2].p === true ? "P" : "F",
                    "engine_performance_note": roadTestFindings[2].notes === "" ? null : roadTestFindings[2].notes,
                    "acceleration": roadTestFindings[3].g === true ? "G" : roadTestFindings[3].p === true ? "P" : "F",
                    "acceleration_note": roadTestFindings[3].notes === "" ? null : roadTestFindings[3].notes,
                    "trans_shift_quality": roadTestFindings[4].g === true ? "G" : roadTestFindings[4].p === true ? "P" : "F",
                    "trans_shift_quality_note": roadTestFindings[4].notes === "" ? null : roadTestFindings[4].notes,
                    "steering": roadTestFindings[5].g === true ? "G" : roadTestFindings[5].p === true ? "P" : "F",
                    "steering_note": roadTestFindings[5].notes === "" ? null : roadTestFindings[5].notes,
                    "braking": roadTestFindings[6].g === true ? "G" : roadTestFindings[6].p === true ? "P" : "F",
                    "braking_note": roadTestFindings[6].notes === "" ? null : roadTestFindings[6].notes,
                    "suspension_performance": roadTestFindings[7].g === true ? "G" : roadTestFindings[7].p === true ? "P" : "F",
                    "suspension_performance_note": roadTestFindings[7].notes === "" ? null : roadTestFindings[7].notes
                }, config)
                .then((res) => {
                    console.log(res);
                    submitFieldInspectionAfter();
                    if (refImageUpload.current.state.files.length <= 0) {
                        submitFieldInspectionAfter();
                    } else {
                        let formData = new FormData();
                        refImageUpload.current.state.files.map((f, index) => {
                            formData.append("images[" + index + "]image", f);
                            formData.append("images[" + index + "]mode", "fi");
                            formData.append("images[" + index + "]image_name", res.data.fi_report_id);
                            return null;
                        })
                        axios.post(process.env.REACT_APP_SERVER_NAME + 'image/report-image/', formData, config)
                        .then((res) => {
                            submitFieldInspectionAfter();
                        })
                        .catch((err) => {

                        });
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setIsLoading(false);
                })
            }
        }
    }

    const submitFieldInspectionAfter = () => {
        window.scrollTo({top: 0, left: 0, behavior:'smooth'});
        setIsLoading(false);
        setMessage({title:"CREATE", content:"Successfully created."});
        onClick('displayMessage');
        getFieldInspectionNotCreated();
    }

    const gfpExterior = (index, value) => {
        let arr = exterior.slice();
        if (value === "g") {
            arr[index] = {...arr[index], g: true, f: false, p: false};
        } else if (value === "f") {
            arr[index] = {...arr[index], g: false, f: true, p: false};
        } else if (value === "p") {
            arr[index] = {...arr[index], g: false, f: false, p: true};
        }
        setExterior(arr);
    }

    const gfpGlass = (index, value) => {
        let arr = glass.slice();
        if (value === "g") {
            arr[index] = {...arr[index], g: true, f: false, p: false};
        } else if (value === "f") {
            arr[index] = {...arr[index], g: false, f: true, p: false};
        } else if (value === "p") {
            arr[index] = {...arr[index], g: false, f: false, p: true};
        }
        setGlass(arr);
    }

    const gfpTiresWheels = (index, value) => {
        let arr = tiresWheels.slice();
        if (value === "g") {
            arr[index] = {...arr[index], g: true, f: false, p: false};
        } else if (value === "f") {
            arr[index] = {...arr[index], g: false, f: true, p: false};
        } else if (value === "p") {
            arr[index] = {...arr[index], g: false, f: false, p: true};
        }
        setTiresWheels(arr);
    }

    const gfpUnderbody = (index, value) => {
        let arr = underbody.slice();
        if (value === "g") {
            arr[index] = {...arr[index], g: true, f: false, p: false};
        } else if (value === "f") {
            arr[index] = {...arr[index], g: false, f: true, p: false};
        } else if (value === "p") {
            arr[index] = {...arr[index], g: false, f: false, p: true};
        }
        setUnderbody(arr);
    }

    const gfpUnderhood = (index, value) => {
        let arr = underhood.slice();
        if (value === "g") {
            arr[index] = {...arr[index], g: true, f: false, p: false};
        } else if (value === "f") {
            arr[index] = {...arr[index], g: false, f: true, p: false};
        } else if (value === "p") {
            arr[index] = {...arr[index], g: false, f: false, p: true};
        }
        setUnderhood(arr);
    }

    const gfpInterior = (index, value) => {
        let arr = interior.slice();
        if (value === "g") {
            arr[index] = {...arr[index], g: true, f: false, p: false};
        } else if (value === "f") {
            arr[index] = {...arr[index], g: false, f: true, p: false};
        } else if (value === "p") {
            arr[index] = {...arr[index], g: false, f: false, p: true};
        }
        setInterior(arr);
    }

    const gfpElectricalSystem = (index, value) => {
        let arr = electricalSystem.slice();
        if (value === "g") {
            arr[index] = {...arr[index], g: true, f: false, p: false};
        } else if (value === "f") {
            arr[index] = {...arr[index], g: false, f: true, p: false};
        } else if (value === "p") {
            arr[index] = {...arr[index], g: false, f: false, p: true};
        }
        setElectricalSystem(arr);
    }

    const gfpRoadTestFindings = (index, value) => {
        let arr = roadTestFindings.slice();
        if (value === "g") {
            arr[index] = {...arr[index], g: true, f: false, p: false};
        } else if (value === "f") {
            arr[index] = {...arr[index], g: false, f: true, p: false};
        } else if (value === "p") {
            arr[index] = {...arr[index], g: false, f: false, p: true};
        }
        setRoadTestFindings(arr);
    }

    const showNotes = (valLabel, valIndex, valType, valNotes) => {
        setTheLabel(valLabel); 
        setTheIndex(valIndex); 
        setTheType(valType); 
        setNotes(valNotes);
        onClick('displayNotes');
    }

    const saveNotes = (value) => {
        let arr = [];
        if (theType === "exte") {
            arr = exterior.slice();
            arr[theIndex] = {...arr[theIndex], notes: value};
            setExterior(arr);
        } else if (theType === "glas") {
            arr = glass.slice();
            arr[theIndex] = {...arr[theIndex], notes: value};
            setGlass(arr);
        } else if (theType === "tire") {
            arr = tiresWheels.slice();
            arr[theIndex] = {...arr[theIndex], notes: value};
            setTiresWheels(arr);
        } else if (theType === "undb") {
            arr = underbody.slice();
            arr[theIndex] = {...arr[theIndex], notes: value};
            setUnderbody(arr);
        } else if (theType === "undh") {
            arr = underhood.slice();
            arr[theIndex] = {...arr[theIndex], notes: value};
            setUnderhood(arr);
        } else if (theType === "inte") {
            arr = interior.slice();
            arr[theIndex] = {...arr[theIndex], notes: value};
            setInterior(arr);
        } else if (theType === "elec") {
            arr = electricalSystem.slice();
            arr[theIndex] = {...arr[theIndex], notes: value};
            setElectricalSystem(arr);
        } else if (theType === "road") {
            arr = roadTestFindings.slice();
            arr[theIndex] = {...arr[theIndex], notes: value};
            setRoadTestFindings(arr);
        }
        onHide('displayNotes');
    }

    const handleSelectReportNo = (value) => {
        console.log("handle:", value)
        setYear(value.body_no.release_year);
        setMake(value.body_no.brand);
        setModel(value.body_no.make);
        // setMileage(value.body_no.release_year);
        setBodyNo(value.body_no.body_no);
        // setBodyStyle(value.body_no.series);
        setTransmission(value.body_no.transmission);
        setEngine(value.body_no.cylinder + " cylinder");
        // setDriverType("");
        // setInspector("");
        setLocation(value.body_no.current_loc);
        setExteriorColor(value.body_no.color);
        // setDoorCount(0);
        setCondition(value.body_no.operational);

    }


    const dialogFuncMap = {
        'displayNotes': setDisplayNotes,
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
                        <h4>FIELD INSPECTION REPORT</h4>
                    </div>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <div className="card card-w-title">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>REPORT No.:</b></h6>
                                    <Dropdown value={fieldInspectionData} options={fieldInspectionNotCreatedList} optionLabel="job_id" placeholder="Select Job Number" 
                                    onChange={event => {setFieldInspectionData(event.target.value); handleSelectReportNo(event.target.value)}}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>INSPECTION DATE:</b></h6>
                                    <Calendar placeholder="Select Date" value={dateInspection} onChange={(e) => setDateInspection(e.value)} showIcon/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>YEAR:</b></h6>
                                    <InputText placeholder="Input Year" value={year} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>MAKE:</b></h6>
                                    <InputText placeholder="Input Make" value={make} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>MODEL:</b></h6>
                                    <InputText placeholder="Input Make" value={model} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>MILEAGE:</b></h6>
                                    <InputText placeholder="Input Mileage" value={mileage} onChange={(e) => setMileage(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>BODY No.:</b></h6>
                                    <InputText placeholder="Input Body No." value={bodyNo} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>BODY STYLE:</b></h6>
                                    <InputText placeholder="Input Body Style" value={bodyStyle} onChange={(e) => setBodyStyle(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>TRANSMISSION:</b></h6>
                                    <InputText placeholder="Input Transmisison" value={transmission} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>ENGINE:</b></h6>
                                    <InputText placeholder="Input Body No." value={engine} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>DRIVER TYPE:</b></h6>
                                    <InputText placeholder="Input Driver Type" value={driverType} onChange={(e) => setDriverType(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>INSPECTOR:</b></h6>
                                    <InputText placeholder="Input Inspector" value={inspector} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>LOCATION:</b></h6>
                                    <InputText placeholder="Input Location" value={location} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>EXTERIOR COLOR:</b></h6>
                                    <InputText placeholder="Input Exterior Color" value={exteriorColor} disabled/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>DOOR COUNT:</b></h6>
                                    <InputText placeholder="Input Door Count" value={doorCount} onChange={(e) => setDoorCount(e.target.value)}/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>CONDITION:</b></h6>
                                    <InputText placeholder="Input Condition" value={condition} disabled/>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{borderTop:'2px solid blue', borderBottom:'2px solid blue', marginBottom:'1px'}}>
                                    <center><b>G=Good F=Fair P=Poor</b></center>
                                </div>
                                
                                <div className="p-col-12 p-lg-4 p-md-6 p-sm-12">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                            <h5>EXTERIOR</h5>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {/* <tr>
                                                        <td><h6><b>G</b></h6></td>
                                                        <td><h6><b>F</b></h6></td>
                                                        <td><h6><b>P</b></h6></td>
                                                    </tr> */}
                                                    {
                                                        exterior.map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpExterior(index, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpExterior(index, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpExterior(index, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                {/* <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => {setTheLabel(x.label); setTheIndex(index); setTheType("exte"); setNotes(x.notes)}}/></td> */}
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "exte", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                            <h5>GLASS</h5>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {
                                                        glass.map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpGlass(index, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpGlass(index, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpGlass(index, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "glas", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                            <h5>TIRES AND WHEELS</h5>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {
                                                        tiresWheels.map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "tire", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                            <h5>UNDERBODY</h5>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {
                                                        underbody.slice(0, 2).map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "undb", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-12 p-lg-4 p-md-6 p-sm-12">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {
                                                        underbody.slice(2, underbody.length).map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index + 2, "undb", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                            <h5>UNDERHOOD</h5>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {
                                                        underhood.map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "undh", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                            <h5>INTERIOR</h5>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {
                                                        interior.map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpInterior(index, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpInterior(index, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpInterior(index, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "inte", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-12 p-lg-4 p-md-6 p-sm-12">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                            <h5>ELECTRICAL SYSTEM</h5>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {
                                                        electricalSystem.map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "elec", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                            <h5>ROAD TEST FINDINGS</h5>
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                            <table>
                                                <tbody>
                                                    {
                                                        roadTestFindings.map((x, index) =>
                                                            <tr key={index}>
                                                                <td><Button label="G" className={x.g ? "" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "g")}/></td>
                                                                <td><Button label="F" className={x.f ? "" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "f")}/></td>
                                                                <td><Button label="P" className={x.p ? "" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "p")}/></td>
                                                                <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "road", x.notes)}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 image-upload">
                                    <h6><b>IMAGE UPLOAD:</b></h6>
                                    <FileUpload ref={refImageUpload} multiple accept="image/*" maxFileSize={1000000} onClear={onClearImageFile}
                                        emptyTemplate={<p className="p-m-0">Click Choose and select image files to upload.</p>} />
                                </div>

                                <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                    <Button label="SUBMIT" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitFieldInspection()}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Dialog header="NOTE" visible={displayNotes} style={{width: '310px'}} onHide={() => onHide('displayNotes')} blockScroll={true}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{paddingTop: '20px'}}>
                            <h5><b>{theLabel/*  + " : " + theIndex */}</b></h5>
                            {/* <h6><b>REMARKS:</b></h6> */}
                            <InputTextarea placeholder="Discuss details here or leave it blank." rows={5} cols={30} autoResize
                            value={notes} onChange={(e) => setNotes(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                            <Button label="SAVE" onClick={() => saveNotes(notes)}/>
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