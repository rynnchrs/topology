import React, {useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

import axios from "axios";
import { format } from 'date-fns';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PDFget() {

    const conditionOptions = [{name: 'Operational', val: "True"}, {name: 'Non-Operational', val: "False"}];

    const [flagFieldInspectionRecordList, setFlagFieldInspectionRecordList] = useState(false);
    const [fieldInspectionRecordDetails, setFieldInspectionRecordDetails] = useState([]);
    const [fieldInspectionRecordDetailsPDF, setFieldInspectionRecordDetailsPDF] = useState([]);
    const [goodSummary, setGoodSummary] = useState([]);
    const [fairSummary, setFairSummary] = useState([]);
    const [poorSummary, setPoorSummary] = useState([]);

    const [reviseColor, setReviseColor] = useState(Array(30).fill(""));
    const [reviseText, setReviseText] = useState(Array(30).fill(""));

    // let arrExterior = useRef([]);
    // let arrGlass = useRef([]);
    // let arrTiresWheels = useRef([]);
    // let arrUnderBody = useRef([]);
    // let arrUnderHood = useRef([]);
    // let arrInterior = useRef([]);
    // let arrElectricalSystem = useRef([]);
    // let arrRoadTestFindings = useRef([]);

    const [arrExterior, setArrExterior] = useState([]);
    const [arrGlass, setArrGlass] = useState([]);
    const [arrTiresWheels, setArrTiresWheels] = useState([]);
    const [arrUnderBody, setArrUnderBody] = useState([]);
    const [arrUnderHood, setArrUnderHood] = useState([]);
    const [arrInterior, setArrInterior] = useState([]);
    const [arrElectricalSystem, setArrElectricalSystem] = useState([]);
    const [arrRoadTestFindings, setArrRoadTestFindings] = useState([]);


    //variables to be save
    const [fieldInspectionID, setFieldInspectionID] =  useState('');
    const [/* fieldInspectionTaskID */, setFieldInspectionTaskID] =  useState('');
    const [/* fieldInspectionJobID */, setFieldInspectionJobID] =  useState('');
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
    const [inspector, /* setInspector */] = useState("CARETA");
    const [location, setLocation] = useState('');
    const [exteriorColor, setExteriorColor] = useState('');
    const [doorCount, setDoorCount] = useState('');
    const [condition, setCondition] = useState([]);
    // const refImageUpload = useRef(null);
    const [reportImage, setReportImage] = useState([{id: '', image: ''}]);
    // const [holdImageID, setHoldImageID] = useState('');
    const [holdPDFName, setHoldPDFName] = useState('');

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

    const toast = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [displayPDF, setDisplayPDF] = useState(false);

    useEffect(() => {
        /* eslint-disable no-unused-expressions */
        if (flagFieldInspectionRecordList) {
            assignFieldInspectionRecordEdit(fieldInspectionRecordDetails); 
            setFieldInspectionRecordDetailsPDF(fieldInspectionRecordDetailsPDF);
            setGoodSummary(fieldInspectionRecordDetailsPDF.summary.good);
            setFairSummary(fieldInspectionRecordDetailsPDF.summary.fair);
            setPoorSummary(fieldInspectionRecordDetailsPDF.summary.poor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flagFieldInspectionRecordList]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setArrExterior(exterior.slice());
        // arrExterior = exterior.slice();
    }, [exterior]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setArrGlass(glass.slice());
        // arrGlass = glass.slice();
    }, [glass]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setArrTiresWheels(tiresWheels.slice());
        // arrTiresWheels = tiresWheels.slice();
    }, [tiresWheels]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setArrUnderBody(underbody.slice());
        // arrUnderBody = underbody.slice();
    }, [underbody]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setArrUnderHood(underhood.slice());
        // arrUnderHood = underhood.slice();
    }, [underhood]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setArrInterior(interior.slice());
        // arrInterior = interior.slice();
    }, [interior]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setArrElectricalSystem(electricalSystem.slice());
        // arrElectricalSystem = electricalSystem.slice();
    }, [electricalSystem]);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setArrRoadTestFindings(roadTestFindings.slice());
        // arrRoadTestFindings = roadTestFindings.slice();
    }, [roadTestFindings]);

    useEffect(() => {
        doPDF();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const doPDF = () => {
        const windowUrl = window.location.href;
        let splitURL = windowUrl.split("=");
        getFieldInspectionRecordDetails(splitURL[1]);
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
                setHoldPDFName("field-inspection-report-" + res.data.body_no.body_no);
                axios.get(process.env.REACT_APP_SERVER_NAME + 'report/field-inspection/' + value + '/pdf/', config)
                .then((res) => {
                    setFieldInspectionRecordDetailsPDF(res.data);
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
                    toast.current.show({ severity: 'error', summary: 'ERROR', detail: 'Something went wrong.', life: 3000 });
                });
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }

    const assignFieldInspectionRecordEdit = (value) => {
        try {
            
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

            setCondition(conditionOptions.find(x => x.name === value.operational));
            // let i;

            // arrExterior = exterior.slice();
            let syntaxExterior = ["hood", "front", "front_bumper", "fenders", "doors", "roof", "rear", "rear_bumper", "trunk", "trim", "fuel_door", "pait_condition"];
            let syntaxExteriorNote = ["hood_note", "front_note", "front_bumper_note", "fenders_note", "doors_note", "roof_note", "rear_note", "rear_bumper_note", "trunk_note", "trim_note", "fuel_door_note", "pait_condition_note"];
            // for (i = 0; i < syntaxExterior.length; i++) {
            //     Object.keys(value).filter(f => f === syntaxExterior[i]).map(x => {
            //         if (value[x].toLowerCase() === "g") {
            //             arrExterior[i] = {...arrExterior[i], g: true, f: false, p: false};
            //         } else if (value[x].toLowerCase() === "f") {
            //             arrExterior[i] = {...arrExterior[i], g: false, f: true, p: false};
            //         } else if (value[x].toLowerCase() === "p") {
            //             arrExterior[i] = {...arrExterior[i], g: false, f: false, p: true};
            //         }
            //         arrExterior[i] = {...arrExterior[i], notes: value[syntaxExteriorNote[i]] === null ? "" : value[syntaxExteriorNote[i]]};
            //         setExterior(arrExterior);
            //     })
            // }

            for (const [i, obkeys] of syntaxExterior.entries()) {
                Object.keys(value).filter(f => f === obkeys).map((x) => {
                    if (value[x].toLowerCase() === "g") {
                        arrExterior[i] = {...arrExterior[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrExterior[i] = {...arrExterior[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrExterior[i] = {...arrExterior[i], g: false, f: false, p: true};
                    }
                    arrExterior[i] = {...arrExterior[i], notes: value[syntaxExteriorNote[i]] === null ? "" : value[syntaxExteriorNote[i]]};
                    setExterior(arrExterior);
                    return null;
                })
            }

            // arrGlass = glass.slice();
            let syntaxGlass = ["windshield", "windows", "mirrors", "rear_window"];
            let syntaxGlassNote = ["windshield_note", "windows_note", "mirrors_note", "rear_window_note"];
            // for (i = 0; i < syntaxGlass.length; i++) {
            //     Object.keys(value).filter(f => f === syntaxGlass[i]).map(x => {
            //         if (value[x].toLowerCase() === "g") {
            //             arrGlass[i] = {...arrGlass[i], g: true, f: false, p: false};
            //         } else if (value[x].toLowerCase() === "f") {
            //             arrGlass[i] = {...arrGlass[i], g: false, f: true, p: false};
            //         } else if (value[x].toLowerCase() === "p") {
            //             arrGlass[i] = {...arrGlass[i], g: false, f: false, p: true};
            //         }
            //         arrGlass[i] = {...arrGlass[i], notes: value[syntaxGlassNote[i]] === null ? "" : value[syntaxGlassNote[i]]};
            //         setGlass(arrGlass);
            //     })
            // }

            for (const [i, obkeys] of syntaxGlass.entries()) {
                Object.keys(value).filter(f => f === obkeys).map((x) => {
                    if (value[x].toLowerCase() === "g") {
                        arrGlass[i] = {...arrGlass[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrGlass[i] = {...arrGlass[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrGlass[i] = {...arrGlass[i], g: false, f: false, p: true};
                    }
                    arrGlass[i] = {...arrGlass[i], notes: value[syntaxGlassNote[i]] === null ? "" : value[syntaxGlassNote[i]]};
                    setGlass(arrGlass);
                    return null;
                })
            }

            // arrTiresWheels = tiresWheels.slice();
            let syntaxTiresWheels = ["tires_condition", "wheels_condition", "spare_tire"];
            let syntaxTiresWheelsNote = ["tires_condition_note", "wheels_condition_note", "spare_tire_note"];
            // for (i = 0; i < syntaxTiresWheels.length; i++) {
            //     Object.keys(value).filter(f => f === syntaxTiresWheels[i]).map(x => {
            //         if (value[x].toLowerCase() === "g") {
            //             arrTiresWheels[i] = {...arrTiresWheels[i], g: true, f: false, p: false};
            //         } else if (value[x].toLowerCase() === "f") {
            //             arrTiresWheels[i] = {...arrTiresWheels[i], g: false, f: true, p: false};
            //         } else if (value[x].toLowerCase() === "p") {
            //             arrTiresWheels[i] = {...arrTiresWheels[i], g: false, f: false, p: true};
            //         }
            //         arrTiresWheels[i] = {...arrTiresWheels[i], notes: value[syntaxTiresWheelsNote[i]] === null ? "" : value[syntaxTiresWheelsNote[i]]};
            //         setTiresWheels(arrTiresWheels);
            //     })
            // }

            for (const [i, obkeys] of syntaxTiresWheels.entries()) {
                Object.keys(value).filter(f => f === obkeys).map((x) => {
                    if (value[x].toLowerCase() === "g") {
                        arrTiresWheels[i] = {...arrTiresWheels[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrTiresWheels[i] = {...arrTiresWheels[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrTiresWheels[i] = {...arrTiresWheels[i], g: false, f: false, p: true};
                    }
                    arrTiresWheels[i] = {...arrTiresWheels[i], notes: value[syntaxTiresWheelsNote[i]] === null ? "" : value[syntaxTiresWheelsNote[i]]};
                    setTiresWheels(arrTiresWheels);
                    return null;
                })
            }

            // arrUnderBody = underbody.slice();
            let syntaxUnderBody = ["frame", "exhaust_system", "transmission", "drive_axle", "suspension", "breake_system"];
            let syntaxUnderBodyNote = ["frame_note", "exhaust_system_note", "transmission_note", "drive_axle_note", "suspension_note", "breake_system_note"];
            // for (i = 0; i < syntaxUnderBody.length; i++) {
            //     Object.keys(value).filter(f => f === syntaxUnderBody[i]).map(x => {
            //         if (value[x].toLowerCase() === "g") {
            //             arrUnderBody[i] = {...arrUnderBody[i], g: true, f: false, p: false};
            //         } else if (value[x].toLowerCase() === "f") {
            //             arrUnderBody[i] = {...arrUnderBody[i], g: false, f: true, p: false};
            //         } else if (value[x].toLowerCase() === "p") {
            //             arrUnderBody[i] = {...arrUnderBody[i], g: false, f: false, p: true};
            //         }
            //         arrUnderBody[i] = {...arrUnderBody[i], notes: value[syntaxUnderBodyNote[i]] === null ? "" : value[syntaxUnderBodyNote[i]]};
            //         setUnderbody(arrUnderBody);
            //     })
            // }

            for (const [i, obkeys] of syntaxUnderBody.entries()) {
                Object.keys(value).filter(f => f === obkeys).map((x) => {
                    if (value[x].toLowerCase() === "g") {
                        arrUnderBody[i] = {...arrUnderBody[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrUnderBody[i] = {...arrUnderBody[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrUnderBody[i] = {...arrUnderBody[i], g: false, f: false, p: true};
                    }
                    arrUnderBody[i] = {...arrUnderBody[i], notes: value[syntaxUnderBodyNote[i]] === null ? "" : value[syntaxUnderBodyNote[i]]};
                    setUnderbody(arrUnderBody);
                    return null;
                })
            }

            // arrUnderHood = underhood.slice();
            let syntaxUnderHood = ["engine_compartment", "battery", "oil", "fluids", "wiring", "belts", "hoses", "non_stock_modif"];
            let syntaxUnderHoodNote = ["engine_compartment_note", "battery_note", "oil_note", "fluids_note", "wiring_note", "belts_note", "hoses_note", "non_stock_modif_note"];
            // for (i = 0; i < syntaxUnderHood.length; i++) {
            //     Object.keys(value).filter(f => f === syntaxUnderHood[i]).map(x => {
            //         if (value[x].toLowerCase() === "g") {
            //             arrUnderHood[i] = {...arrUnderHood[i], g: true, f: false, p: false};
            //         } else if (value[x].toLowerCase() === "f") {
            //             arrUnderHood[i] = {...arrUnderHood[i], g: false, f: true, p: false};
            //         } else if (value[x].toLowerCase() === "p") {
            //             arrUnderHood[i] = {...arrUnderHood[i], g: false, f: false, p: true};
            //         }
            //         arrUnderHood[i] = {...arrUnderHood[i], notes: value[syntaxUnderHoodNote[i]] === null ? "" : value[syntaxUnderHoodNote[i]]};
            //         setUnderhood(arrUnderHood);
            //     })
            // }

            for (const [i, obkeys] of syntaxUnderHood.entries()) {
                Object.keys(value).filter(f => f === obkeys).map((x) => {
                    if (value[x].toLowerCase() === "g") {
                        arrUnderHood[i] = {...arrUnderHood[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrUnderHood[i] = {...arrUnderHood[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrUnderHood[i] = {...arrUnderHood[i], g: false, f: false, p: true};
                    }
                    arrUnderHood[i] = {...arrUnderHood[i], notes: value[syntaxUnderHoodNote[i]] === null ? "" : value[syntaxUnderHoodNote[i]]};
                    setUnderhood(arrUnderHood);
                    return null;
                })
            }

            // arrInterior = interior.slice();
            let syntaxInterior = ["seats", "headliner", "carpet", "door_panels", "glove_box", "vanity_mirrors", "interioir_trim", "dashboard", "dashboard_gauges", "air_conditioning", "heater", "defroster"];
            let syntaxInteriorNote = ["seats_note", "headliner_note", "carpet_note", "door_panels_note", "glove_box_note", "vanity_mirrors_note", "interioir_trim_note", "dashboard_note", "dashboard_gauges_note", "air_conditioning_note", "heater_note", "defroster_note"];
            // for (i = 0; i < syntaxInterior.length; i++) {
            //     Object.keys(value).filter(f => f === syntaxInterior[i]).map(x => {
            //         if (value[x].toLowerCase() === "g") {
            //             arrInterior[i] = {...arrInterior[i], g: true, f: false, p: false};
            //         } else if (value[x].toLowerCase() === "f") {
            //             arrInterior[i] = {...arrInterior[i], g: false, f: true, p: false};
            //         } else if (value[x].toLowerCase() === "p") {
            //             arrInterior[i] = {...arrInterior[i], g: false, f: false, p: true};
            //         }
            //         arrInterior[i] = {...arrInterior[i], notes: value[syntaxInteriorNote[i]] === null ? "" : value[syntaxInteriorNote[i]]};
            //         setInterior(arrInterior);
            //     })
            // }

            for (const [i, obkeys] of syntaxInterior.entries()) {
                Object.keys(value).filter(f => f === obkeys).map((x) => {
                    if (value[x].toLowerCase() === "g") {
                        arrInterior[i] = {...arrInterior[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrInterior[i] = {...arrInterior[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrInterior[i] = {...arrInterior[i], g: false, f: false, p: true};
                    }
                    arrInterior[i] = {...arrInterior[i], notes: value[syntaxInteriorNote[i]] === null ? "" : value[syntaxInteriorNote[i]]};
                    setInterior(arrInterior);
                    return null;
                })
            }

            // arrElectricalSystem = electricalSystem.slice();
            let syntaxElectricalSystem = ["power_locks", "power_seats", "power_steering", "power_windows", "power_mirrors", "audio_system", "onboard_computer", "headlights", "taillights", "signal_lights", "brake_lights", "parking_lights"];
            let syntaxElectricalSystemNote = ["power_locks_note", "power_seats_note", "power_steering_note", "power_windows_note", "power_mirrors_note", "audio_system_note", "onboard_computer_note", "headlights_note", "taillights_note", "signal_lights_note", "brake_lights_note", "parking_lights_note"];
            // for (i = 0; i < syntaxElectricalSystem.length; i++) {
            //     Object.keys(value).filter(f => f === syntaxElectricalSystem[i]).map(x => {
            //         if (value[x].toLowerCase() === "g") {
            //             arrElectricalSystem[i] = {...arrElectricalSystem[i], g: true, f: false, p: false};
            //         } else if (value[x].toLowerCase() === "f") {
            //             arrElectricalSystem[i] = {...arrElectricalSystem[i], g: false, f: true, p: false};
            //         } else if (value[x].toLowerCase() === "p") {
            //             arrElectricalSystem[i] = {...arrElectricalSystem[i], g: false, f: false, p: true};
            //         }
            //         arrElectricalSystem[i] = {...arrElectricalSystem[i], notes: value[syntaxElectricalSystemNote[i]] === null ? "" : value[syntaxElectricalSystemNote[i]]};
            //         setElectricalSystem(arrElectricalSystem);
            //     })
            // }

            for (const [i, obkeys] of syntaxElectricalSystem.entries()) {
                Object.keys(value).filter(f => f === obkeys).map((x) => {
                    if (value[x].toLowerCase() === "g") {
                        arrElectricalSystem[i] = {...arrElectricalSystem[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrElectricalSystem[i] = {...arrElectricalSystem[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrElectricalSystem[i] = {...arrElectricalSystem[i], g: false, f: false, p: true};
                    }
                    arrElectricalSystem[i] = {...arrElectricalSystem[i], notes: value[syntaxElectricalSystemNote[i]] === null ? "" : value[syntaxElectricalSystemNote[i]]};
                    setElectricalSystem(arrElectricalSystem);
                    return null;
                })
            }

            // arrRoadTestFindings= roadTestFindings.slice();
            let syntaxRoadTestFindings = ["starting", "idling", "engine_performance", "acceleration", "trans_shift_quality", "steering", "braking", "suspension_performance"];
            let syntaxRoadTestFindingsNote = ["starting_note", "idling_note", "engine_performance_note", "acceleration_note", "trans_shift_quality_note", "steering_note", "braking_note", "suspension_performance_note"];
            // for (i= 0; i < syntaxRoadTestFindings.length; i++) {
            //     Object.keys(value).filter(f => f === syntaxRoadTestFindings[i]).map(x => {
            //         if (value[x].toLowerCase() === "g") {
            //             arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: true, f: false, p: false};
            //         } else if (value[x].toLowerCase() === "f") {
            //             arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: false, f: true, p: false};
            //         } else if (value[x].toLowerCase() === "p") {
            //             arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: false, f: false, p: true};
            //         }
            //         arrRoadTestFindings[i] = {...arrRoadTestFindings[i], notes: value[syntaxRoadTestFindingsNote[i]] === null ? "" : value[syntaxRoadTestFindingsNote[i]]};
            //         setRoadTestFindings(arrRoadTestFindings);
            //     })
            // }

            for (const [i, obkeys] of syntaxRoadTestFindings.entries()) {
                Object.keys(value).filter(f => f === obkeys).map((x) => {
                    if (value[x].toLowerCase() === "g") {
                        arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: true, f: false, p: false};
                    } else if (value[x].toLowerCase() === "f") {
                        arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: false, f: true, p: false};
                    } else if (value[x].toLowerCase() === "p") {
                        arrRoadTestFindings[i] = {...arrRoadTestFindings[i], g: false, f: false, p: true};
                    }
                    arrRoadTestFindings[i] = {...arrRoadTestFindings[i], notes: value[syntaxRoadTestFindingsNote[i]] === null ? "" : value[syntaxRoadTestFindingsNote[i]]};
                    setRoadTestFindings(arrRoadTestFindings);
                    return null;
                })
            }

            setTimeout(() => {
                onClick('displayPDF');
                convertPDF();
            }, 1500);

        } catch(err) {

        }
    }

    const convertPDF = () => {
        try {
            var quotes = document.getElementById('toPdf');
            var quotes1 = document.getElementById('toPdfSummary');
            var quotes2 = document.getElementById('toPdfImage');
            var pdf = new jsPDF('p', 'pt', 'letter');

            html2canvas(quotes)
            .then((canvas) => {
                // var pdf = new jsPDF('p', 'pt', 'letter');

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
                pdf.addPage();
                
                html2canvas(quotes1)
                .then((canvas) => {
                    // var pdf = new jsPDF('p', 'pt', 'letter');

                    var srcImg  = canvas;
                    var sX      = 0;
                    var sY      = 0; // start 980 pixels down for every new page
                    var sWidth  = 1075;
                    var sHeight = 1100;
                    var dX      = 0;
                    var dY      = 0;
                    var dWidth  = 900;
                    var dHeight = 1100;

                    for (var i = 0; i < quotes1.clientHeight/1100; i++) {
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
                    pdf.addPage();

                    html2canvas(quotes2, {allowTaint: true, useCORS: true})
                    .then((canvas) => {
                        // var pdf = new jsPDF('p', 'pt', 'letter');

                        var srcImg  = canvas;
                        var sX      = 0;
                        var sY      = 0; // start 980 pixels down for every new page
                        var sWidth  = 1075;
                        var sHeight = 1100;
                        var dX      = 0;
                        var dY      = 0;
                        var dWidth  = 900;
                        var dHeight = 1100;

                        for (var i = 0; i < quotes2.clientHeight/1100; i++) {
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
                        pdf.save(holdPDFName + ".pdf");
                        // window.open(pdf.output('bloburl'));
                        setTimeout(() => {
                            onHide('displayPDF');
                            setIsLoading(false);
                            window.close();
                        }, 1000);
                    });
                });
            });
            
        } catch (err){
            setIsLoading(false);
            toast.current.show({ severity: 'error', summary: 'ERROR', detail: 'Something went wrong.', life: 3000 });
        }
    }

    const convertDatetoGMT = (value) => {
        let theDate = value.split("-");
        theDate = new Date(+theDate[0], theDate[1] - 1, +theDate[2]);
        return theDate;
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
        'displayPDF': setDisplayPDF,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        setFlagFieldInspectionRecordList(false);
        setReviseColor(Array(30).fill(""));
        setReviseText(Array(30).fill(""));
    }

    return(
        <div>
            <Toast ref={toast}/>
            <div className="gray-out" style={{display: isLoading ? "flex" : "none"}}>
                <ProgressSpinner />
            </div>
            
            <div className="p-grid p-fluid">
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
                                    <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                            <h6><b>REPORT No.:</b></h6>
                                            {/* <Dropdown value={fieldInspectionData} options={fieldInspectionNotCreatedList} optionLabel="job_id" placeholder="Select Job Number" 
                                            onChange={event => {setFieldInspectionData(event.target.value); handleSelectReportNo(event.target.value)}}/> */}
                                            <InputText placeholder="Input Report No." value={fieldInspectionID} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                            <h6><b>BODY No.:</b></h6>
                                            <InputText placeholder="Input Body No." value={bodyNo} disabled/>
                                        </div>
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[0]}>
                                            <h6><b>INSPECTION DATE:</b></h6>
                                            {/* <Calendar placeholder="Select Date" value={dateInspection} onChange={(e) => setDateInspection(e.value)} showIcon readOnlyInput/> */}
                                            <Calendar placeholder="Select Date" value={dateInspection} onChange={(e) => onChangeValue('f0', e.value)} showIcon readOnlyInput/>
                                            <small className="p-invalid p-d-block">{reviseText[0]}</small>
                                        </div>
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[1]}>
                                            <h6><b>MILEAGE:</b></h6>
                                            <InputText placeholder="Input Mileage" value={mileage} onChange={(e) => onChangeValue('f1', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[1]}</small>
                                        </div>
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[2]}>
                                            <h6><b>BODY STYLE:</b></h6>
                                            <InputText placeholder="Input Body Style" value={bodyStyle} onChange={(e) => onChangeValue('f2', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[2]}</small>
                                        </div>
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[3]}>
                                            <h6><b>DRIVER TYPE:</b></h6>
                                            <InputText placeholder="Input Driver Type" value={driverType} onChange={(e) => onChangeValue('f3', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[3]}</small>
                                        </div>
                                        <div className={"p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk " + reviseColor[4]}>
                                            <h6><b>DOOR COUNT:</b></h6>
                                            <InputText placeholder="Input Door Count" value={doorCount} onChange={(e) => onChangeValue('f4', e.target.value)}/>
                                            <small className="p-invalid p-d-block">{reviseText[4]}</small>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>CONDITION:</b></h6>
                                            <Dropdown value={condition} options={conditionOptions} optionLabel="name" placeholder="Select Condition" 
                                            onChange={event => setCondition(event.target.value)} />
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>YEAR:</b></h6>
                                            <InputText placeholder="Input Year" value={year} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>MAKE:</b></h6>
                                            <InputText placeholder="Input Make" value={make} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>MODEL:</b></h6>
                                            <InputText placeholder="Input Make" value={model} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>TRANSMISSION:</b></h6>
                                            <InputText placeholder="Input Transmisison" value={transmission} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>ENGINE:</b></h6>
                                            <InputText placeholder="Input Body No." value={engine} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>INSPECTOR:</b></h6>
                                            <InputText placeholder="Input Inspector" value={inspector} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>LOCATION:</b></h6>
                                            <InputText placeholder="Input Location" value={location} disabled/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12">
                                            <h6><b>EXTERIOR COLOR:</b></h6>
                                            <InputText placeholder="Input Exterior Color" value={exteriorColor} disabled/>
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

                        <div id="toPdfSummary" className="p-grid p-fluid">
                            <div className="p-col-12">
                                <h2><b>SUMMARY</b></h2>
                                <ul>
                                    <li><b>Good</b>
                                        <ul>
                                            {
                                                goodSummary === undefined ? '' :
                                                Object.entries(goodSummary).map(([key, val]) =>
                                                    <li key={key}><b>{key}</b>
                                                        <ul>
                                                            {
                                                                val.map((i) => {
                                                                    return <p><li><b>{i}</b></li></p>
                                                                })
                                                            }
                                                            
                                                        </ul>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </li>
                                </ul>
                                <ul>
                                    <li><b>Fair</b>
                                        <ul>
                                            {
                                                fairSummary === undefined ? '' :
                                                Object.entries(fairSummary).map(([key, val]) =>
                                                    <li key={key}><b>{key}</b>
                                                        <ul>
                                                            {
                                                                val.map((i) => {
                                                                    return <p><li><b>{i}</b></li></p>
                                                                })
                                                            }
                                                            
                                                        </ul>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </li>
                                </ul>
                                <ul>
                                    <li><b>Poor</b>
                                        <ul>
                                            {
                                                poorSummary === undefined ? '' :
                                                Object.entries(poorSummary).map(([key, val]) =>
                                                    <li key={key}><b>{key}</b>
                                                        <ul>
                                                            {
                                                                val.map((i) => {
                                                                    return <p><li><b>{i}</b></li></p>
                                                                })
                                                            }
                                                            
                                                        </ul>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div id="toPdfImage" className="p-col-12">
                            <div className="p-grid p-fluid">
                                {
                                    reportImage.map((x, index) =>
                                            <div className="p-col-4" key={index}>
                                                <div className="p-grid p-fluid">
                                                    <center><img src={process.env.REACT_APP_SERVER_NAME + x.image.substring(1)} alt="" style={{width:'320px', height: '230px'}}/><br></br></center>
                                                </div>
                                            </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="gray-out" style={{display: isLoading ? "flex" : "none"}}>
                            <ProgressSpinner />
                        </div>
                    </Dialog>
                </div>

            </div>
        </div>
    )

}