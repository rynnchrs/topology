import React, {useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';



export default function FieldInspectionReport() {


    const [notes, setNotes] = useState("");
    const [theLabel, setTheLabel] = useState("");
    const [theIndex, setTheIndex] = useState("");
    const [theType, setTheType] = useState("");
    const refImageUpload = useRef(null);

    const toast = useRef(null);



    const [displayNotes, setDisplayNotes] = useState(false);

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


    const dialogFuncMap = {
        'displayNotes': setDisplayNotes,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const onClearImageFile = () => {
        //empty
    }

    return(
        <div>
            <Toast ref={toast}/>
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                        <h4>FIELD INSPECTION REPORT</h4>
                    </div>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <div className="card card-w-title">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>INSPECTION DATE:</b></h6>
                                    <InputText placeholder="Input Date"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>YEAR:</b></h6>
                                    <InputText placeholder="Input Year"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>MAKE:</b></h6>
                                    <InputText placeholder="Input Make"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>MODEL:</b></h6>
                                    <InputText placeholder="Input Make"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>MILEAGE:</b></h6>
                                    <InputText placeholder="Input Mileage"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>BODY No.:</b></h6>
                                    <InputText placeholder="Input Body No."/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>BODY STYLE:</b></h6>
                                    <InputText placeholder="Input Body Style"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>TRANSMISSION:</b></h6>
                                    <InputText placeholder="Input Transmisison"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>ENGINE:</b></h6>
                                    <InputText placeholder="Input Body No."/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>DRIVER TYPE:</b></h6>
                                    <InputText placeholder="Input Driver Type"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>INSPECTOR:</b></h6>
                                    <InputText placeholder="Input Inspector"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>LOCATION:</b></h6>
                                    <InputText placeholder="Input Location"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>EXTERIOR COLOR:</b></h6>
                                    <InputText placeholder="Input Exterioir Color"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>DOOR COUNT:</b></h6>
                                    <InputText placeholder="Input Door Count"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>CONDITION:</b></h6>
                                    <InputText placeholder="Input Condition"/>
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
                                                                <td><Button icon="pi pi-paperclip" className="p-button-success" onClick={() => showNotes(x.label, index, "undh", x.notes)}/></td>
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

            </div>
        </div>

    )

}