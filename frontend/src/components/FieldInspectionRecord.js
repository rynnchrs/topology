import React, {useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Carousel } from 'primereact/carousel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

import axios from "axios";
import { format } from 'date-fns';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function FieldInspectionReport() {

    //search fields
    const [searchFieldInspectionNumber, setSearchFieldInspectionNumber] = useState('');
    const [searchBodyNo, setSearchBodyNo] = useState('');
    const [searchDateInspection, setSearchDateInspection] = useState(null);

    // const [fieldInspectionNotCreatedList, setFieldInspectionNotCreatedList] = useState([]);
    // const [fieldInspectionData, setFieldInspectionData] = useState([]);
    const [notes, setNotes] = useState('');
    const [theLabel, setTheLabel] = useState('');
    const [theIndex, setTheIndex] = useState('');
    const [theType, setTheType] = useState('');

    const [fieldInspectionRecordList, setFieldInspectionRecordList] = useState([]);
    const [flagFieldInspectionRecordList, setFlagFieldInspectionRecordList] = useState(false);
    const [fieldInspectionRecordDetails, setFieldInspectionRecordDetails] = useState([]);
    const [delFieldInspectionID, setDelFieldInspectionID] = useState('');
    const [flagFieldInspectionRecordMethod, setFlagFieldInspectionRecordMethod] = useState('');

    const [reviseColor, setReviseColor] = useState(Array(30).fill(""));
    const [reviseText, setReviseText] = useState(Array(30).fill(""));

    let arrExterior = useRef([]);
    let arrGlass = useRef([]);
    let arrTiresWheels = useRef([]);
    let arrUnderBody = useRef([]);
    let arrUnderHood = useRef([]);
    let arrInterior = useRef([]);
    let arrElectricalSystem = useRef([]);
    let arrRoadTestFindings = useRef([]);

    //variables to be save
    const [fieldInspectionID, setFieldInspectionID] =  useState('');
    const [fieldInspectionTaskID, setFieldInspectionTaskID] =  useState('');
    const [fieldInspectionJobID, setFieldInspectionJobID] =  useState('');
    const [dateInspection, setDateInspection] = useState(null);
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [mileage, setMileage] = useState('');
    const [bodyNo, setBodyNo] = useState('');
    const [bodyStyle, setBodyStyle] = useState('');
    const [transmission, setTransmission] = useState('');
    const [engine, setEngine] = useState('');
    const [driverType, setDriverType] = useState('');
    const [inspector, setInspector] = useState("CARETA");
    const [location, setLocation] = useState('');
    const [exteriorColor, setExteriorColor] = useState('');
    const [doorCount, setDoorCount] = useState('');
    const [condition, setCondition] = useState('');
    const refImageUpload = useRef(null);
    const [reportImage, setReportImage] = useState([{id: '', image: ''}]);
    const [holdImageID, setHoldImageID] = useState('');

    const [exterior, setExterior] = useState([
        {g: false, f: false, p: false, label: "Hood", notes: ''},
        {g: false, f: false, p: false, label: "Front", notes: ''},
        {g: false, f: false, p: false, label: "Front Bumper", notes: ''},
        {g: false, f: false, p: false, label: "Fenders", notes: ''},
        {g: false, f: false, p: false, label: "Doors", notes: ''},
        {g: false, f: false, p: false, label: "Roof", notes: ''},
        {g: false, f: false, p: false, label: "Rear", notes: ''},
        {g: false, f: false, p: false, label: "Rear Bumper", notes: ''},
        {g: false, f: false, p: false, label: "Trunk", notes: ''},
        {g: false, f: false, p: false, label: "Trim", notes: '' },
        {g: false, f: false, p: false, label: "Fuel Door", notes: ''},
        {g: false, f: false, p: false, label: "Paint Condition", notes: ''},
    ]);

    const [glass, setGlass] = useState([
        {g: false, f: false, p: false, label: "Windshield", notes: ''},
        {g: false, f: false, p: false, label: "Windows", notes: ''},
        {g: false, f: false, p: false, label: "Mirrors", notes: ''},
        {g: false, f: false, p: false, label: "Rear Window", notes: ''}
    ]);

    const [tiresWheels, setTiresWheels] = useState([
        {g: false, f: false, p: false, label: "Condition of Tires", notes: ''},
        {g: false, f: false, p: false, label: "Condition of Wheels", notes: ''},
        {g: false, f: false, p: false, label: "Spare Tire", notes: ''}
    ]);

    const [underbody, setUnderbody] = useState([
        {g: false, f: false, p: false, label: "Frame", notes: ''},
        {g: false, f: false, p: false, label: "Exhaust System", notes: ''},
        {g: false, f: false, p: false, label: "Transmission", notes: ''},
        {g: false, f: false, p: false, label: "Drive Axie", notes: ''},
        {g: false, f: false, p: false, label: "Suspension", notes: ''},
        {g: false, f: false, p: false, label: "Brake System", notes: ''}
    ]);

    const [underhood, setUnderhood] = useState([
        {g: false, f: false, p: false, label: "Engine Compartment", notes: ''},
        {g: false, f: false, p: false, label: "Battery", notes: ''},
        {g: false, f: false, p: false, label: "Oil", notes: ''},
        {g: false, f: false, p: false, label: "Fluids", notes: ''},
        {g: false, f: false, p: false, label: "Wiring", notes: ''},
        {g: false, f: false, p: false, label: "Belts", notes: ''},
        {g: false, f: false, p: false, label: "Hoses", notes: ''},
        {g: false, f: false, p: false, label: "Any Non-Stock Modifications", notes: ''}
    ]);

    const [interior, setInterior] = useState([
        {g: false, f: false, p: false, label: "Seats", notes: ''},
        {g: false, f: false, p: false, label: "Headliner", notes: ''},
        {g: false, f: false, p: false, label: "Carpet"},
        {g: false, f: false, p: false, label: "Door Panels", notes: ''},
        {g: false, f: false, p: false, label: "Glove Box", notes: ''},
        {g: false, f: false, p: false, label: "Vanity Mirrors", notes: ''},
        {g: false, f: false, p: false, label: "Interior Trim", notes: ''},
        {g: false, f: false, p: false, label: "Dashboard", notes: ''},
        {g: false, f: false, p: false, label: "Dashboard Gauges", notes: ''},
        {g: false, f: false, p: false, label: "Air Conditioning", notes: ''},
        {g: false, f: false, p: false, label: "Heater", notes: ''},
        {g: false, f: false, p: false, label: "Defroster", notes: ''}
    ]);

    const [electricalSystem, setElectricalSystem] = useState([
        {g: false, f: false, p: false, label: "Power Locks", notes: ''},
        {g: false, f: false, p: false, label: "Power Seats", notes: ''},
        {g: false, f: false, p: false, label: "Power Steering", notes: ''},
        {g: false, f: false, p: false, label: "Power Windows", notes: ''},
        {g: false, f: false, p: false, label: "Power Mirrors", notes: ''},
        {g: false, f: false, p: false, label: "Audio System", notes: ''},
        {g: false, f: false, p: false, label: "Onboard Computer", notes: ''},
        {g: false, f: false, p: false, label: "Headlights", notes: ''},
        {g: false, f: false, p: false, label: "Taillights", notes: ''},
        {g: false, f: false, p: false, label: "Signal Lights", notes: ''},
        {g: false, f: false, p: false, label: "Brake Lights", notes: ''},
        {g: false, f: false, p: false, label: "Parking Lights", notes: ''}
    ]);

    const [roadTestFindings, setRoadTestFindings] = useState([
        {g: false, f: false, p: false, label: "Starting", notes: ''},
        {g: false, f: false, p: false, label: "Idling", notes: ''},
        {g: false, f: false, p: false, label: "Engine Performance", notes: ''},
        {g: false, f: false, p: false, label: "Acceleration", notes: ''},
        {g: false, f: false, p: false, label: "Transmission Shift Quality", notes: ''},
        {g: false, f: false, p: false, label: "Steering", notes: ''},
        {g: false, f: false, p: false, label: "Braking", notes: ''},
        {g: false, f: false, p: false, label: "Suspension Performance", notes: ''}
    ]);

    //paginator
    const [first, setFirst] = useState(0);
    const rows = 10;
    const [flagPages, setFlagPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const dt = useRef(null);
    const toast = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState({title:"", content:""});
    const [displayNotes, setDisplayNotes] = useState(false);
    const [displayFieldInspectionRecordEdit, setDisplayFieldInspectionRecordEdit] = useState(false);
    const [displayConfirmDeleteImage, setDisplayConfirmDeleteImage] = useState(false);
    const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);
    const [displayPDF, setDisplayPDF] = useState(false);

    useEffect(() => {
        /* eslint-disable no-unused-expressions */
        flagFieldInspectionRecordList ? assignFieldInspectionRecordEdit(fieldInspectionRecordDetails) : '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flagFieldInspectionRecordList]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrExterior = exterior.slice();
    }, [exterior]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrGlass = glass.slice();
    }, [glass]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrTiresWheels = tiresWheels.slice();
    }, [tiresWheels]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrUnderBody = underbody.slice();
    }, [underbody]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrUnderHood = underhood.slice();
    }, [underhood]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrUnderHood = underhood.slice();
    }, [underhood]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrInterior = interior.slice();
    }, [interior]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrElectricalSystem = electricalSystem.slice();
    }, [electricalSystem]);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        arrRoadTestFindings = roadTestFindings.slice();
    }, [roadTestFindings]);

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

            let sFINumber = searchFieldInspectionNumber;
            let sBodyNo = searchBodyNo;
            let sDateInspection = searchDateInspection === null ? "" : format(searchDateInspection, 'yyyy-MM-dd');

            axios
                // .get(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/', config)
                .get(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/?fi_report_id=' + sFINumber 
                + '&body_no=' + sBodyNo
                + '&inspection_date=' + sDateInspection, config)
                .then((res) => {
                    setTotalCount(res.data.count);
                    setFieldInspectionRecordList(res.data.results);
                })
                .catch((err) => {
                    
                });
        } catch (err) {

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

    const getFieldInspectionRecordDetails = (value) => {
        setIsLoading(true);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/' + value + '/', config)
            .then((res) => {
                setFieldInspectionRecordDetails(res.data);
                axios.get(process.env.REACT_APP_SERVER_NAME + 'image/report-image/' + res.data.fi_report_id +'/?mode=fi', config)
                    .then((res) => {
                        setReportImage(res.data);
                        setFlagFieldInspectionRecordList(true);
                        flagFieldInspectionRecordList ? setIsLoading(false) : '';
                    })
                    .catch((err) => {
                        setIsLoading(false);
                    });
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }

    const assignFieldInspectionRecordEdit = (value) => {
        try {
            // console.log("fi: ",value);
            setFieldInspectionID(value.fi_report_id);
            setFieldInspectionTaskID(value.task);
            setFieldInspectionJobID(value.job_order);

            onChangeValue('f0', convertDatetoGMT(value.inspection_date));

            setYear(value.body_no.release_year);
            setMake(value.body_no.brand);
            setModel(value.body_no.make);

            onChangeValue('f1', value.mileage);

            setBodyNo(value.body_no.body_no);

            onChangeValue('f2', value.body_style);

            setTransmission(value.body_no.transmission);
            setEngine(value.body_no.cylinder + " cylinder");

            onChangeValue('f3', value.drive_type);
            // setInspector("");
            setLocation(value.body_no.current_loc);
            setExteriorColor(value.body_no.color);

            onChangeValue('f4', value.door_count);

            setCondition(value.body_no.operational);
            let i;

            arrExterior = exterior.slice();
            let syntaxExterior = ["hood", "front", "front_bumper", "fenders", "doors", "roof", "rear", "rear_bumper", "trunk", "trim", "fuel_door", "pait_condition"];
            let syntaxExteriorNote = ["hood_note", "front_note", "front_bumper_note", "fenders_note", "doors_note", "roof_note", "rear_note", "rear_bumper_note", "trunk_note", "trim_note", "fuel_door_note", "pait_condition_note"];
            for (i = 0; i < syntaxExterior.length; i++) {
                Object.keys(value).filter(f => f === syntaxExterior[i]).map(x => {
                    // console.log("resX:", value[x])
                    if (value[x].toLowerCase() === "g") {
                        arrExterior[i] = {...arrExterior[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrExterior[i] = {...arrExterior[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrExterior[i] = {...arrExterior[i], g: false, f: false, p: true};
                    }
                    arrExterior[i] = {...arrExterior[i], notes: value[syntaxExteriorNote[i]] === null ? "" : value[syntaxExteriorNote[i]]};
                    setExterior(arrExterior);
                })
            }

            arrGlass = glass.slice();
            let syntaxGlass = ["windshield", "windows", "mirrors", "rear_window"];
            let syntaxGlassNote = ["windshield_note", "windows_note", "mirrors_note", "rear_window_note"];
            for (i = 0; i < syntaxGlass.length; i++) {
                Object.keys(value).filter(f => f === syntaxGlass[i]).map(x => {
                    if (value[x].toLowerCase() === "g") {
                        arrGlass[i] = {...arrGlass[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrGlass[i] = {...arrGlass[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrGlass[i] = {...arrGlass[i], g: false, f: false, p: true};
                    }
                    arrGlass[i] = {...arrGlass[i], notes: value[syntaxGlassNote[i]] === null ? "" : value[syntaxGlassNote[i]]};
                    setGlass(arrGlass);
                })
            }

            arrTiresWheels = tiresWheels.slice();
            let syntaxTiresWheels = ["tires_condition", "wheels_condition", "spare_tire"];
            let syntaxTiresWheelsNote = ["tires_condition_note", "wheels_condition_note", "spare_tire_note"];
            for (i = 0; i < syntaxTiresWheels.length; i++) {
                Object.keys(value).filter(f => f === syntaxTiresWheels[i]).map(x => {
                    if (value[x].toLowerCase() === "g") {
                        arrTiresWheels[i] = {...arrTiresWheels[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrTiresWheels[i] = {...arrTiresWheels[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrTiresWheels[i] = {...arrTiresWheels[i], g: false, f: false, p: true};
                    }
                    arrTiresWheels[i] = {...arrTiresWheels[i], notes: value[syntaxTiresWheelsNote[i]] === null ? "" : value[syntaxTiresWheelsNote[i]]};
                    setTiresWheels(arrTiresWheels);
                })
            }

            arrUnderBody = underbody.slice();
            let syntaxUnderBody = ["frame", "exhaust_system", "transmission", "drive_axle", "suspension", "breake_system"];
            let syntaxUnderBodyNote = ["frame_note", "exhaust_system_note", "transmission_note", "drive_axle_note", "suspension_note", "breake_system_note"];
            for (i = 0; i < syntaxUnderBody.length; i++) {
                Object.keys(value).filter(f => f === syntaxUnderBody[i]).map(x => {
                    if (value[x].toLowerCase() === "g") {
                        arrUnderBody[i] = {...arrUnderBody[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrUnderBody[i] = {...arrUnderBody[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrUnderBody[i] = {...arrUnderBody[i], g: false, f: false, p: true};
                    }
                    arrUnderBody[i] = {...arrUnderBody[i], notes: value[syntaxUnderBodyNote[i]] === null ? "" : value[syntaxUnderBodyNote[i]]};
                    setUnderbody(arrUnderBody);
                })
            }

            arrUnderHood = underhood.slice();
            let syntaxUnderHood = ["engine_compartment", "battery", "oil", "fluids", "wiring", "belts", "hoses", "non_stock_modif"];
            let syntaxUnderHoodNote = ["engine_compartment_note", "battery_note", "oil_note", "fluids_note", "wiring_note", "belts_note", "hoses_note", "non_stock_modif_note"];
            for (i = 0; i < syntaxUnderHood.length; i++) {
                Object.keys(value).filter(f => f === syntaxUnderHood[i]).map(x => {
                    if (value[x].toLowerCase() === "g") {
                        arrUnderHood[i] = {...arrUnderHood[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrUnderHood[i] = {...arrUnderHood[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrUnderHood[i] = {...arrUnderHood[i], g: false, f: false, p: true};
                    }
                    arrUnderHood[i] = {...arrUnderHood[i], notes: value[syntaxUnderHoodNote[i]] === null ? "" : value[syntaxUnderHoodNote[i]]};
                    setUnderhood(arrUnderHood);
                })
            }

            arrInterior = interior.slice();
            let syntaxInterior = ["seats", "headliner", "carpet", "door_panels", "glove_box", "vanity_mirrors", "interioir_trim", "dashboard", "dashboard_gauges", "air_conditioning", "heater", "defroster"];
            let syntaxInteriorNote = ["seats_note", "headliner_note", "carpet_note", "door_panels_note", "glove_box_note", "vanity_mirrors_note", "interioir_trim_note", "dashboard_note", "dashboard_gauges_note", "air_conditioning_note", "heater_note", "defroster_note"];
            for (i = 0; i < syntaxInterior.length; i++) {
                Object.keys(value).filter(f => f === syntaxInterior[i]).map(x => {
                    if (value[x].toLowerCase() === "g") {
                        arrInterior[i] = {...arrInterior[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrInterior[i] = {...arrInterior[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrInterior[i] = {...arrInterior[i], g: false, f: false, p: true};
                    }
                    arrInterior[i] = {...arrInterior[i], notes: value[syntaxInteriorNote[i]] === null ? "" : value[syntaxInteriorNote[i]]};
                    setInterior(arrInterior);
                })
            }

            arrElectricalSystem = electricalSystem.slice();
            let syntaxElectricalSystem = ["power_locks", "power_seats", "power_steering", "power_windows", "power_mirrors", "audio_system", "onboard_computer", "headlights", "taillights", "signal_lights", "brake_lights", "parking_lights"];
            let syntaxElectricalSystemNote = ["power_locks_note", "power_seats_note", "power_steering_note", "power_windows_note", "power_mirrors_note", "audio_system_note", "onboard_computer_note", "headlights_note", "taillights_note", "signal_lights_note", "brake_lights_note", "parking_lights_note"];
            for (i = 0; i < syntaxElectricalSystem.length; i++) {
                Object.keys(value).filter(f => f === syntaxElectricalSystem[i]).map(x => {
                    if (value[x].toLowerCase() === "g") {
                        arrElectricalSystem[i] = {...arrElectricalSystem[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrElectricalSystem[i] = {...arrElectricalSystem[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrElectricalSystem[i] = {...arrElectricalSystem[i], g: false, f: false, p: true};
                    }
                    arrElectricalSystem[i] = {...arrElectricalSystem[i], notes: value[syntaxElectricalSystemNote[i]] === null ? "" : value[syntaxElectricalSystemNote[i]]};
                    setElectricalSystem(arrElectricalSystem);
                })
            }

            arrRoadTestFindings= roadTestFindings.slice();
            let syntaxRoadTestFindings = ["starting", "idling", "engine_performance", "acceleration", "trans_shift_quality", "steering", "braking", "suspension_performance"];
            let syntaxRoadTestFindingsNote = ["starting_note", "idling_note", "engine_performance_note", "acceleration_note", "trans_shift_quality_note", "steering_note", "braking_note", "suspension_performance_note"];
            for (i= 0; i < syntaxRoadTestFindings.length; i++) {
                Object.keys(value).filter(f => f === syntaxRoadTestFindings[i]).map(x => {
                    if (value[x].toLowerCase() === "g") {
                        arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: false, f: false, p: true};
                    }
                    arrRoadTestFindings[i] = {...arrRoadTestFindings[i], notes: value[syntaxRoadTestFindingsNote[i]] === null ? "" : value[syntaxRoadTestFindingsNote[i]]};
                    setRoadTestFindings(arrRoadTestFindings);
                })
            }

            setTimeout(() => {
                if (flagFieldInspectionRecordMethod === 'pdf') {
                    onClick('displayPDF');
                    convertPDF();
                } else {
                    setIsLoading(false);
                    onClick('displayFieldInspectionRecordEdit');
                }
            }, 1500);

        } catch(err) {
            console.log(err)
        }
    }

    const convertPDF = () => {
        try {
            var quotes = document.getElementById('toPdf');

            html2canvas(quotes)
            .then((canvas) => {
                var pdf = new jsPDF('p', 'pt', 'letter');

                var srcImg  = canvas;
                var sX      = 0;
                var sY      = 0; // start 980 pixels down for every new page
                var sWidth  = 1075;
                var sHeight = 1100;
                var dX      = 0;
                var dY      = 0;
                var dWidth  = 900;
                var dHeight = 1100;

                for (var i = 0; i < quotes.clientHeight/1100; i++) {
                    sY = 1100*i;
                    var onePageCanvas = document.createElement("canvas");
                    onePageCanvas.setAttribute('width', 900);
                    onePageCanvas.setAttribute('height', 1100);
                    var ctx = onePageCanvas.getContext('2d');
                    ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);
                    var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
                    var width         = onePageCanvas.width;
                    var height        = onePageCanvas.clientHeight;

                    if (i > 0) {
                        pdf.addPage();
                    }
                    pdf.addImage(canvasDataURL, 'PNG', 22, 40, (width*.62), (height*.62));
                }
                window.open(pdf.output('bloburl'));
                onHide('displayPDF');
                setIsLoading(false);
            });
        } catch (err){
            console.log(err)
        }
    }

    const convertDatetoGMT = (value) => {
        let theDate = value.split("-");
        theDate = new Date(+theDate[0], theDate[1] - 1, +theDate[2]);
        return theDate;
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
            .delete(process.env.REACT_APP_SERVER_NAME + 'image/report-image/'+ fieldInspectionID +'/?mode=fi&id=' + holdImageID, config)
            .then((res) => {
                getFieldInspectionRecordDetails(fieldInspectionID);
                setMessage({title:"DELETE", content:"Successfully deleted."});
                onHide('displayConfirmDeleteImage');
                onClick('displayMessage');
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Delete Image Error', detail: 'Something went wrong.', life: 5000 });
            });
    }

    const [timeOutId, setTimeOutId] = useState(null);
    useEffect(() => {
        clearTimeout(timeOutId);
        setTimeOutId(setTimeout(() => {
            submitSearch();
        }, 1000));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchFieldInspectionNumber]);

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

        let sFINumber = searchFieldInspectionNumber;
        let sBodyNo = searchBodyNo;
        let sDateInspection = searchDateInspection === null ? "" : format(searchDateInspection, 'yyyy-MM-dd');

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/?fi_report_id=' + sFINumber 
            + '&body_no=' + sBodyNo
            + '&inspection_date=' + sDateInspection, config)
            .then((res) => {
                setTotalCount(res.data.count);
                setFieldInspectionRecordList(res.data.results);
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong.', life: 3000 });
            });
    }

    const submitFieldInspection = () => {
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
            if (fieldInspectionID === "") {
                toast.current.show({ severity: 'error', summary: 'REPORT NO.', detail: 'Please select report no. first.', life: 3000 });
            } else if (dateInspection === null) { 
                toast.current.show({ severity: 'error', summary: 'INSPECTION DATE:', detail: 'This field is required.', life: 3000 });
            } else if (mileage === "") { 
                toast.current.show({ severity: 'error', summary: 'MILEAGE', detail: 'This field is required.', life: 3000 });
            } else if (bodyStyle === "") { 
                toast.current.show({ severity: 'error', summary: 'BODY STYLE', detail: 'This field is required.', life: 3000 });
            } else if (driverType === "") { 
                toast.current.show({ severity: 'error', summary: 'DRIVER TYPE', detail: 'This field is required.', life: 3000 });
            } 
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

                axios.put(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/' + fieldInspectionID + '/', {
                    "fi_report_id": fieldInspectionID,
                    "task": fieldInspectionTaskID,
                    "job_order": fieldInspectionJobID,
                    "body_no": bodyNo,
                    "approved_by": "",
                    "noted_by": "",
                    "inspection_date" : format(dateInspection, 'yyyy-MM-dd'),
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
        onHide('displayFieldInspectionRecordEdit');
        window.scrollTo({top: 0, left: 0, behavior:'smooth'});
        setIsLoading(false);
        setMessage({title:"UPDATE", content:"Successfully updated."});
        onClick('displayMessage');
    }

    const submitDeleteFieldInspection = () => {
        setIsLoading(true);
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        axios
            .delete(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/' + delFieldInspectionID + '/', config)
            .then((res) => {
                console.log(res.data)
                getFieldInspectionRecord();
                setIsLoading(false);
                setMessage({title:"DELETE", content:"Successfully deleted."});
                onHide('displayConfirmDelete');
                onClick('displayMessage');
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Delete Record Error', detail: 'Something went wrong.', life: 5000 });
                setIsLoading(false);
            });
    }

    const getFieldInspectionRecord = () => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/', config)
            .then((res) => {
                setTotalCount(res.data.count);
                setFieldInspectionRecordList(res.data.results);
            })
            .catch((err) => {
                
            });
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

    // const saveNotes = (value) => {
    const saveNotes = (type, index, value) => {
        let arr = [];
        if (type === "exte") {
            arr = exterior.slice();
            arr[index] = {...arr[index], notes: value};
            setExterior(arr);
        } else if (type === "glas") {
            arr = glass.slice();
            arr[index] = {...arr[index], notes: value};
            setGlass(arr);
        } else if (type === "tire") {
            arr = tiresWheels.slice();
            arr[index] = {...arr[index], notes: value};
            setTiresWheels(arr);
        } else if (type === "undb") {
            arr = underbody.slice();
            arr[index] = {...arr[index], notes: value};
            setUnderbody(arr);
        } else if (type === "undh") {
            arr = underhood.slice();
            arr[index] = {...arr[index], notes: value};
            setUnderhood(arr);
        } else if (type === "inte") {
            arr = interior.slice();
            arr[index] = {...arr[index], notes: value};
            setInterior(arr);
        } else if (type === "elec") {
            arr = electricalSystem.slice();
            arr[index] = {...arr[index], notes: value};
            setElectricalSystem(arr);
        } else if (type === "road") {
            arr = roadTestFindings.slice();
            arr[index] = {...arr[index], notes: value};
            setRoadTestFindings(arr);
        }
        onHide('displayNotes');
    }

    const updateRevise = (index, color, text) => {
        reviseColor[index] = color;
        reviseText[index] = text;
    }

    const reviseFormatDate = (value) => {
        let gmt = convertDatetoGMT(value);
        gmt = format(gmt, 'MM/dd/yyyy');
        return gmt;
    }

    const onChangeValue = (id, value) => {
        let fird = fieldInspectionRecordDetails;
        let arrIndex = id.substring(1);
        let r = "red";
        let e = "";
        let dt = "";
        switch (id) {
            case 'f0':
                setDateInspection(value);
                dt = format(value, 'yyyy-MM-dd');
                if (typeof(fird.revised.inspection_date) === "undefined") {
                    dt !== fird.inspection_date ? updateRevise(arrIndex, r, reviseFormatDate(fird.inspection_date)) : updateRevise(arrIndex, e, e);
                } else {
                    dt !== fird.revised.dainspection_datete ? updateRevise(arrIndex, r, reviseFormatDate(fird.revised.inspection_date)) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f1':
                setMileage(value);
                if (typeof(fird.revised.mileage) === "undefined") {
                    parseInt(value) !== fird.mileage ? updateRevise(arrIndex, r, fird.mileage) : updateRevise(arrIndex, e, e);
                } else {
                    parseInt(value) !== fird.revised.mileage ? updateRevise(arrIndex, r, fird.revised.mileage) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f2':
                setBodyStyle(value);
                if (typeof(fird.revised.body_style) === "undefined") {
                    value !== fird.body_style ? updateRevise(arrIndex, r, fird.body_style) : updateRevise(arrIndex, e, e);
                } else {
                    value !== fird.revised.body_style ? updateRevise(arrIndex, r, fird.revised.body_style) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f3':
                setDriverType(value);
                if (typeof(fird.revised.drive_type) === "undefined") {
                    value !== fird.drive_type ? updateRevise(arrIndex, r, fird.drive_type) : updateRevise(arrIndex, e, e);
                } else {
                    value !== fird.revised.drive_type ? updateRevise(arrIndex, r, fird.revised.drive_type) : updateRevise(arrIndex, e, e);
                }
                break;
            case 'f4':
                setDoorCount(value);
                if (typeof(fird.revised.door_count) === "undefined") {
                    parseInt(value) !== fird.door_count ? updateRevise(arrIndex, r, fird.door_count) : updateRevise(arrIndex, e, e);
                } else {
                    parseInt(value) !== fird.revised.door_count ? updateRevise(arrIndex, r, fird.revised.door_count) : updateRevise(arrIndex, e, e);
                }
                break;
            default:
                break;
        }
    }

    const dialogFuncMap = {
        'displayNotes': setDisplayNotes,
        'displayMessage': setDisplayMessage,
        'displayFieldInspectionRecordEdit': setDisplayFieldInspectionRecordEdit,
        'displayConfirmDeleteImage': setDisplayConfirmDeleteImage,
        'displayConfirmDelete': setDisplayConfirmDelete,
        'displayPDF': setDisplayPDF,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        if (name === 'displayPDF') {
            setFlagFieldInspectionRecordMethod('');
        }
        setFlagFieldInspectionRecordList(false);
        setReviseColor(Array(30).fill(""));
        setReviseText(Array(30).fill(""));
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
                    <Button label="Yes" icon="pi pi-check" className="p-button-success" onClick={() => submitDeleteFieldInspection()}/>
                </div>
            );
        }
    }

    const renderHeader = () => {
        return (
            <div style={{paddingTop:'1%'}}><h5><b>FIELD INSPECTION RECORDS</b></h5></div>
        );
    }

    const actionBody = (rowData) => {
        return (
            <div>
                <center>
                    <Button style={{marginRight: '3%'}} icon="pi pi-pencil" className="p-button-rounded" onClick={() => getFieldInspectionRecordDetails(rowData.fi_report_id)}/>
                    <Button style={{marginRight: '3%'}} icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => {setDelFieldInspectionID(rowData.fi_report_id); onClick('displayConfirmDelete')}}/>
                    <Button icon="pi pi-download" className="p-button-rounded p-button-success" onClick={() => {setFlagFieldInspectionRecordMethod('pdf'); getFieldInspectionRecordDetails(rowData.fi_report_id)}}/>
                </center>
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
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Report No." value={searchFieldInspectionNumber} onChange={(event) => setSearchFieldInspectionNumber(event.target.value)}/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Body No." value={searchBodyNo} onChange={(event) => setSearchBodyNo(event.target.value)}/>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <Calendar placeholder="Select Date" value={searchDateInspection} onChange={(e) => setSearchDateInspection(e.value)} showIcon />
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
                    <DataTable ref={dt} header={renderHeader()} value={fieldInspectionRecordList} className="p-datatable-sm" 
                        resizableColumns columnResizeMode="expand" emptyMessage="No records found">
                        <Column field="job_order" header="Field Inspection No." style={{paddingLeft: '3%'}}></Column>
                        <Column body={actionBody}></Column>
                    </DataTable>
                    <Paginator first={first} rows={rows} totalRecords={totalCount} onPageChange={onPageChange}></Paginator>
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="dialog-display">
                    <Dialog header="EDIT FIELD INSPECTION" visible={displayFieldInspectionRecordEdit} onHide={() => onHide('displayFieldInspectionRecordEdit')} blockScroll={true}>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                                <h4>FIELD INSPECTION REPORT</h4>
                            </div>
                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                <div className="card card-w-title">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                            <h6><b>REPORT No.:</b></h6>
                                            {/* <Dropdown value={fieldInspectionData} options={fieldInspectionNotCreatedList} optionLabel="job_id" placeholder="Select Job Number" 
                                            onChange={event => {setFieldInspectionData(event.target.value); handleSelectReportNo(event.target.value)}}/> */}
                                            <InputText placeholder="Input Report No." value={fieldInspectionID} disabled/>
                                        </div>
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[0]}>
                                            <h6><b>INSPECTION DATE:</b></h6>
                                            {/* <Calendar placeholder="Select Date" value={dateInspection} onChange={(e) => setDateInspection(e.value)} showIcon readOnlyInput/> */}
                                            <Calendar placeholder="Select Date" value={dateInspection} onChange={(e) => onChangeValue('f0', e.value)} showIcon readOnlyInput/>
                                            <small className="p-invalid p-d-block">{reviseText[0]}</small>
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
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[1]}>
                                            <h6><b>MILEAGE:</b></h6>
                                            <InputText placeholder="Input Mileage" value={mileage} onChange={(e) => onChangeValue('f1', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[1]}</small>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                            <h6><b>BODY No.:</b></h6>
                                            <InputText placeholder="Input Body No." value={bodyNo} disabled/>
                                        </div>
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[2]}>
                                            <h6><b>BODY STYLE:</b></h6>
                                            <InputText placeholder="Input Body Style" value={bodyStyle} onChange={(e) => onChangeValue('f2', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[2]}</small>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                            <h6><b>TRANSMISSION:</b></h6>
                                            <InputText placeholder="Input Transmisison" value={transmission} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                            <h6><b>ENGINE:</b></h6>
                                            <InputText placeholder="Input Body No." value={engine} disabled/>
                                        </div>
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[3]}>
                                            <h6><b>DRIVER TYPE:</b></h6>
                                            <InputText placeholder="Input Driver Type" value={driverType} onChange={(e) => onChangeValue('f3', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[3]}</small>
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
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[4]}>
                                            <h6><b>DOOR COUNT:</b></h6>
                                            <InputText placeholder="Input Door Count" value={doorCount} onChange={(e) => onChangeValue('f4', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[4]}</small>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpExterior(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpExterior(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpExterior(index, "p")}/></td>
                                                                        <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                        {/* <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => {setTheLabel(x.label); setTheIndex(index); setTheType("exte"); setNotes(x.notes)}}/></td> */}
                                                                        <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "exte", x.notes)}/></td>
                                                                        {/* <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => console.log(exterior)}/></td> */}
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpGlass(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpGlass(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpGlass(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpInterior(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpInterior(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpInterior(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "p")}/></td>
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
                                            <FileUpload ref={refImageUpload} multiple accept="image/*" /* maxFileSize={1000000} */ onClear={onClearImageFile}
                                                emptyTemplate={<p className="p-m-0">Click Choose and select image files to upload.</p>} />
                                        </div>
                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                                <h6><b>REPORT IMAGES:</b></h6>
                                                <Carousel style={{paddingTop:'5px', border:"1px solid lightgrey"}} value={reportImage} numVisible={1} numScroll={1} itemTemplate={reportImageTemplate}/>
                                            </div>

                                        <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                            <Button label="SUBMIT" className="p-button-md p-shadow-4 p-button-rounded" onClick={() => submitFieldInspection()}/>
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

                <div className="dialog-display-pdf" >
                    <Dialog header="GENERATING PDF..." visible={displayPDF} onHide={() => onHide('displayPDF')} blockScroll={true}>
                        <div id="toPdf" className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                                <h4>FIELD INSPECTION REPORT</h4>
                            </div>
                            <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                <div className="card card-w-title">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>REPORT No.:</b></h6>
                                            {/* <Dropdown value={fieldInspectionData} options={fieldInspectionNotCreatedList} optionLabel="job_id" placeholder="Select Job Number" 
                                            onChange={event => {setFieldInspectionData(event.target.value); handleSelectReportNo(event.target.value)}}/> */}
                                            <InputText placeholder="Input Report No." value={fieldInspectionID} disabled/>
                                        </div>
                                        <div className={"p-col-4 required-asterisk " + reviseColor[0]}>
                                            <h6><b>INSPECTION DATE:</b></h6>
                                            {/* <Calendar placeholder="Select Date" value={dateInspection} onChange={(e) => setDateInspection(e.value)} showIcon readOnlyInput/> */}
                                            <Calendar placeholder="Select Date" value={dateInspection} onChange={(e) => onChangeValue('f0', e.value)} showIcon readOnlyInput/>
                                            <small className="p-invalid p-d-block">{reviseText[0]}</small>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>YEAR:</b></h6>
                                            <InputText placeholder="Input Year" value={year} disabled/>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>MAKE:</b></h6>
                                            <InputText placeholder="Input Make" value={make} disabled/>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>MODEL:</b></h6>
                                            <InputText placeholder="Input Make" value={model} disabled/>
                                        </div>
                                        <div className={"p-col-4 required-asterisk " + reviseColor[1]}>
                                            <h6><b>MILEAGE:</b></h6>
                                            <InputText placeholder="Input Mileage" value={mileage} onChange={(e) => onChangeValue('f1', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[1]}</small>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>BODY No.:</b></h6>
                                            <InputText placeholder="Input Body No." value={bodyNo} disabled/>
                                        </div>
                                        <div className={"p-col-4 required-asterisk " + reviseColor[2]}>
                                            <h6><b>BODY STYLE:</b></h6>
                                            <InputText placeholder="Input Body Style" value={bodyStyle} onChange={(e) => onChangeValue('f2', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[2]}</small>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>TRANSMISSION:</b></h6>
                                            <InputText placeholder="Input Transmisison" value={transmission} disabled/>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>ENGINE:</b></h6>
                                            <InputText placeholder="Input Body No." value={engine} disabled/>
                                        </div>
                                        <div className={"p-col-4 required-asterisk " + reviseColor[3]}>
                                            <h6><b>DRIVER TYPE:</b></h6>
                                            <InputText placeholder="Input Driver Type" value={driverType} onChange={(e) => onChangeValue('f3', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[3]}</small>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>INSPECTOR:</b></h6>
                                            <InputText placeholder="Input Inspector" value={inspector} disabled/>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>LOCATION:</b></h6>
                                            <InputText placeholder="Input Location" value={location} disabled/>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>EXTERIOR COLOR:</b></h6>
                                            <InputText placeholder="Input Exterior Color" value={exteriorColor} disabled/>
                                        </div>
                                        <div className={"p-col-4 required-asterisk " + reviseColor[4]}>
                                            <h6><b>DOOR COUNT:</b></h6>
                                            <InputText placeholder="Input Door Count" value={doorCount} onChange={(e) => onChangeValue('f4', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[4]}</small>
                                        </div>
                                        <div className="p-col-4 required-asterisk">
                                            <h6><b>CONDITION:</b></h6>
                                            <InputText placeholder="Input Condition" value={condition} disabled/>
                                        </div>

                                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{borderTop:'2px solid blue', borderBottom:'2px solid blue', marginBottom:'1px'}}>
                                            <center><b>G=Good F=Fair P=Poor</b></center>
                                        </div>
                                        
                                        <div className="p-col-4">
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpExterior(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpExterior(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpExterior(index, "p")}/></td>
                                                                        <td><label style={{fontWeight:'bold'}}>{x.label}</label></td>
                                                                        {/* <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => {setTheLabel(x.label); setTheIndex(index); setTheType("exte"); setNotes(x.notes)}}/></td> */}
                                                                        <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "exte", x.notes)}/></td>
                                                                        {/* <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => console.log(exterior)}/></td> */}
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpGlass(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpGlass(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpGlass(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpTiresWheels(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index, "p")}/></td>
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

                                        <div className="p-col-4">
                                            <div className="p-grid p-fluid">
                                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 field-inspection-table">
                                                    <table>
                                                        <tbody>
                                                            {
                                                                underbody.slice(2, underbody.length).map((x, index) =>
                                                                    <tr key={index}>
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderbody(index + 2, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpUnderhood(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpInterior(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpInterior(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpInterior(index, "p")}/></td>
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

                                        <div className="p-col-4">
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpElectricalSystem(index, "p")}/></td>
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
                                                                        <td><Button label="G" className={x.g ? "active-btn" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "g")}/></td>
                                                                        <td><Button label="F" className={x.f ? "active-btn" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "f")}/></td>
                                                                        <td><Button label="P" className={x.p ? "active-btn" : "p-button-outlined"} onClick={() => gfpRoadTestFindings(index, "p")}/></td>
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

                <Dialog header="NOTE" visible={displayNotes} style={{width: '310px'}} onHide={() => onHide('displayNotes')} blockScroll={true}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12" style={{paddingTop: '20px'}}>
                            <h5><b>{theLabel/*  + " : " + theIndex */}</b></h5>
                            {/* <h6><b>REMARKS:</b></h6> */}
                            <InputTextarea placeholder="Discuss details here or leave it blank." rows={5} cols={30} autoResize
                            value={notes} onChange={(e) => setNotes(e.target.value)}/>
                        </div>
                        <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                            <Button label="SAVE" onClick={() => saveNotes(theType, theIndex, notes)}/>
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
                            <div style={{fontSize: '16px'}}>Are you sure to delete this record no. {delFieldInspectionID}?</div>
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