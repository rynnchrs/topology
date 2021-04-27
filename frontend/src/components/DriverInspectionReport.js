import React, { Component, createRef} from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from "axios";
import { isThisISOWeek } from 'date-fns';

export class DriverInspectionReport extends Component {
    
    constructor() {
        super();
        this.state = {
            checkboxValue: [],  
            radioValue1: null,
            radioValue2: null,
            radioValue3: null,
            radioValue4: null,
            radioValue5: null,
            radioValue6: null,
            radioValue7: null,
            radioValue8: null,
            radioValue9: null,
            radioValue10: null,
            radioValue11: null,
            radioValue12: null,
            radioValue13: null,
            radioValue14: null,
            radioValue15: null,
            radioValue16: null,
            radioValue17: null,
            radioValue18: null,
            radioValue19: null,
            radioValue20: null,
            radioValue21: null,
            radioValue22: null,
            radioValue23: null,
            radioValue24: null,
            radioValue25: null,
            radioValue26: null,
            radioValue27: null,
            radioValue28: null,
            radioValue29: null,
            radioValue30: null,
            radioValue31: null,
            radioValue32: null,
            radioValue33: null,
            radioValue34: null,
            radioValue35: null,
            radioValue36: null,
            radioValue37: null,
            radioValue38: null,
            radioValue39: null,
            radioValue40: null,
            radioValue41: null,
            radioValue42: null,
            radioValue43: null,
            radioValue44: null,
            radioValue45: null,
            radioValue46: null,
            radioValue47: null,
            radioValue48: null,
            radioValue49: null,
            radioValue50: null,
            radioValue51: null,
            selectedFile: undefined,
            text: "No File Chosen",
            bn: "",
            make: "",
            mil: "",
            locc: "",
            emergency: "09465657944",
            gpsData: "",
            com: "",
            driver: "",
            drivername: "",
            editor: "",
            time: "",
            date: "",
            bodyno: [],
            filteredSuggestions: [],
            carValues: [],
            displayError: false,
            displaySuccess: false,
            errorMessage: { title: "", content: ""},
            isBtnSubmit: false,
            labelBtnSubmit: "SUBMIT",
            iconBtnSubmit: "",
            isLoading: false,
        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onTagBodyNo = this.onTagBodyNo.bind(this);

        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);

    }

    onCheckboxChange(event) {
        let selected = [...this.state.checkboxValue];
        if (event.checked)
            selected.push(event.value);
        else
            selected.splice(selected.indexOf(event.value), 1);
        this.setState({ checkboxValue: selected });
    }

    // //fetch data of car list from db on page load
    // componentDidMount() {
    //     let user = localStorage.getItem("myfirst");
    //     this.setState({drivername:user})
    //     let username = localStorage.getItem("username");
    //     this.setState({driver:username})
    //     let token = localStorage.getItem("token");
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token,
    //         },
    //     };
    //     axios.get(process.env.REACT_APP_SERVER_NAME + 'careta/car-list/', config)
    //         .then(res => {
    //             const bodyno = res.data;
    //             bodyno.map((item) => ({ make: item.make = item.make === 'L30' ? 'L300 Exceed 2.5D MT'
    //                     : item.make === 'SUV' ? 'Super Carry UV'
    //                     : item.make ===  'G15'? 'Gratour midi truck 1.5L'
    //                     : 'Gratour midi truck 1.2L' }));
    //             this.setState({
    //                 bodyno: bodyno,
    //             });
    //             //console.log(bodyno);
    //         })
    // }

    //fetch data of car list from db on page load
    componentDidMount() {
        let user = localStorage.getItem("myfirst");
        this.setState({drivername:user})
        let username = localStorage.getItem("username");
        this.setState({driver:username})
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        Promise.all([
            fetch(process.env.REACT_APP_SERVER_NAME + 'careta/car-list/', config).then(res => res.json()),
            //fetch(process.env.REACT_APP_SERVER_NAME + 'careta/inspection-list/?ordering=-inspection_id',config).then(res => res.json())
            fetch(process.env.REACT_APP_SERVER_NAME + 'report/inspection/',config).then(res => res.json())
        ]).then(([res1, res2]) => {
            const bodyno = res1;
            //console.log("res", res1)
            // bodyno.map((item) => ({ make: item.make = item.make === 'L30' ? 'L300 Exceed 2.5D MT'
            //             : item.make === 'SUV' ? 'Super Carry UV'
            //             : item.make ===  'G15'? 'Gratour midi truck 1.5L'
            //             : 'Gratour midi truck 1.2L' }));
            this.setState({
                bodyno: bodyno,
                carValues: res2
            });
        })
    }

    showBodyNumberTags () {
        if (this.state.carValues.length <= 0) {
            //console.log("recent null");
        } else if (this.state.carValues.length == 1) { //1
            return <div> 
            <ul>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[0].body_no)}>
                        {this.state.carValues[0].body_no}
                    </span>
                </li>
            </ul>
            </div>
        } else if (this.state.carValues.length == 2) { //2
            return <div> 
            <ul>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[0].body_no)}>
                        {this.state.carValues[0].body_no}
                    </span>
                </li>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[1].body_no)}>
                        {this.state.carValues[1].body_no}
                    </span>
                </li>
            </ul>
            </div>
        } else if (this.state.carValues.length == 3) { //3
            return <div> 
            <ul>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[0].body_no)}>
                        {this.state.carValues[0].body_no}
                    </span>
                </li>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[1].body_no)}>
                        {this.state.carValues[1].body_no}
                    </span>
                </li>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[2].body_no)}>
                        {this.state.carValues[2].body_no}
                    </span>
                </li>
            </ul>
            </div>
        } else if (this.state.carValues.length == 4) { //4
            return <div> 
            <ul>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[0].body_no)}>
                        {this.state.carValues[0].body_no}
                    </span>
                </li>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[1].body_no)}>
                        {this.state.carValues[1].body_no}
                    </span>
                </li>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[2].body_no)}>
                        {this.state.carValues[2].body_no}
                    </span>
                </li>
                <li>
                    <span className="p-tag p-tag-rounded p-tag-info" onClick={() => this.onTagBodyNo(this.state.carValues[3].body_no)}>
                        {this.state.carValues[3].body_no}
                    </span>
                </li>
            </ul>
            </div>
        }
    }

    onTagBodyNo = (values) => {
        setTimeout(() => {
            if (!values.trim().length) {
                
            } else {
                this.setState({
                    filteredSuggestions: this.state.bodyno.filter(item => item.body_no.includes(values))
                });
                if (this.state.filteredSuggestions.length <= 0){
                    
                } else {
                    this.setState({
                        filteredSuggestions: this.state.filteredSuggestions,
                        bn: this.state.filteredSuggestions[0],
                    });
                }
            }
        }, 100);
    }

    //this will filter all "slug" data from api and show as suggestions on Autocomplete component below
    searchList = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {

            } else {
                //error when i use item.car_id.includes(event.query), uncomment to try
                //this.state.filteredSuggestions = this.state.bodyno.filter(item => item.car_id.includes(event.query));
                this.setState({filteredSuggestions: this.state.bodyno.filter(item => item.body_no.startsWith(event.query))});
                this.setState({
                    filteredSuggestions: this.state.filteredSuggestions,
                });
            }
        }, 100);
    };

    onChangeAutoCompelete = (event) => {
        //console.log("auto", event.target.value);
        this.setState({
            bn: event.target.value,
        });

        if (this.state.bn === null){
           // console.log("bn is null");
        } else {
            //console.log("bn is no null");
        }
    }

    //This will get the filename/filepath that can be use in post request*
    /*fileSelect = event => {
        console.log(event.target.files.length);
        this.state.text = '';
        for (let i = 0; i < event.target.files.length; i++) {
            //console.log(i);
            //console.log(event.target.files[i].name);
            this.state.text = this.state.text + event.target.files[i].name + "\n";
        }
        this.setState({
            text: this.state.text
        });
    };*/

    submitData = event => {
        this.setState({
            labelBtnSubmit:"SUBMITTING...",
            isBtnSubmit: true,
            iconBtnSubmit: "pi pi-spin pi-spinner",
            isLoading: true,
        });

        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axios.post(process.env.REACT_APP_SERVER_NAME + 'report/inspection/', {
            //car: this.state.bn.car_id,
            body_no: this.state.bn.body_no,
            make: this.state.bn.make,
            mileage: this.state.mil,
            location: this.state.bn.current_loc,
            cleanliness_exterior: this.state.radioValue1,
            condition_rust: this.state.radioValue2,
            decals: this.state.radioValue3,
            windows: this.state.radioValue4,
            rear_door: this.state.radioValue5,
            mirror: this.state.radioValue6,
            roof_rack: this.state.radioValue7,
            rear_step: this.state.radioValue8,
            seats: this.state.radioValue9,
            seat_belts: this.state.radioValue10,
            general_condition: this.state.radioValue11,
            vehicle_documents: this.state.radioValue12,
            liquid_leak: this.state.radioValue13,
            main_beam: this.state.radioValue19,
            dipped_beam: this.state.radioValue20,
            side_lights: this.state.radioValue21,
            tail_lights: this.state.radioValue22,
            indicators: this.state.radioValue23,
            break_lights: this.state.radioValue24,
            reverse_lights: this.state.radioValue25,
            hazard_light: this.state.radioValue26,
            rear_fog_lights: this.state.radioValue27,
            interior_lights: this.state.radioValue28,
            screen_washer: this.state.radioValue29,
            wiper_blades: this.state.radioValue30,
            horn: this.state.radioValue31,
            radio: this.state.radioValue32,
            front_fog_lights: this.state.radioValue33,
            cleanliness_engine_bay: this.state.radioValue14,
            washer_fluid: this.state.radioValue15,
            coolant_level: this.state.radioValue16,
            brake_fluid_level: this.state.radioValue17,
            power_steering_fluid: this.state.radioValue18,
            gas_level: this.state.radioValue44,
            oil_level: this.state.radioValue45,
            tyres: this.state.radioValue34,
            front_visual: this.state.radioValue35,
            rear_visual: this.state.radioValue36,
            spare_visual: this.state.radioValue37,
            wheel_brace: this.state.radioValue38,
            jack: this.state.radioValue39,
            front_right_wheel: this.state.radioValue41,
            front_left_wheel: this.state.radioValue40,
            rear_right_wheel: this.state.radioValue43,
            rear_left_wheel: this.state.radioValue42,
            gpsData: this.state.gpsData,
            notes: this.state.com,
            driver: this.state.driver,
            edited_by: this.state.editor,
          }, config)
          .then((res) => {
            this.setState({
                radioValue1: null,
                radioValue2: null,
                radioValue3: null,
                radioValue4: null,
                radioValue5: null,
                radioValue6: null,
                radioValue7: null,
                radioValue8: null,
                radioValue9: null,
                radioValue10: null,
                radioValue11: null,
                radioValue12: null,
                radioValue13: null,
                radioValue14: null,
                radioValue15: null,
                radioValue16: null,
                radioValue17: null,
                radioValue18: null,
                radioValue19: null,
                radioValue20: null,
                radioValue21: null,
                radioValue22: null,
                radioValue23: null,
                radioValue24: null,
                radioValue25: null,
                radioValue26: null,
                radioValue27: null,
                radioValue28: null,
                radioValue29: null,
                radioValue30: null,
                radioValue31: null,
                radioValue32: null,
                radioValue33: null,
                radioValue34: null,
                radioValue35: null,
                radioValue36: null,
                radioValue37: null,
                radioValue38: null,
                radioValue39: null,
                radioValue40: null,
                radioValue41: null,
                radioValue42: null,
                radioValue43: null,
                radioValue44: null,
                radioValue45: null,
                radioValue46: null,
                radioValue47: null,
                radioValue48: null,
                radioValue49: null,
                radioValue50: null,
                radioValue51: null,
                bn: "",
                make: "",
                mil: "",
                locc: "",
                gpsData: "",
                com: "",
                labelBtnSubmit:"SUBMIT",
                isBtnSubmit: false,
                iconBtnSubmit: "",
                isLoading: false,
            })
            window.scrollTo({top: 0, left: 0, behavior:'smooth'});
            this.onClick('displaySuccess');
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };
            fetch(process.env.REACT_APP_SERVER_NAME + 'report/inspection/',config)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        carValues: data
                    });
                })
                .catch((error) => {
                    console.log('error report insp: ');
                    console.log(error);
                });
          })
          .catch((err) => {
            console.log(err.response);
            if (err.toJSON().message === 'Network Error'){
                this.setState({errorMessage: {title:"NETWEORK ERROR:", content: "Please check internet connection."}});
            } else if (err.response.data.body_no) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Body No."}});
            } else if (err.response.data.mileage) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Mileage"}});
            } else if (err.response.data.cleanliness_exterior) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Exterior: Cleanliness"}});
            } else if (err.response.data.condition_rust) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Condition Rust"}});
            } else if (err.response.data.decals) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Decals/Livery Intact"}});
            } else if (err.response.data.windows) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Windows/Windscreen"}});
            } else if (err.response.data.rear_door) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Read Door"}});
            } else if (err.response.data.mirror) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Mirror"}});
            } else if (err.response.data.roof_rack) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Roof Rack"}});
            } else if (err.response.data.rear_step) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Rear Step"}});
            } else if (err.response.data.seats) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Seats"}});
            } else if (err.response.data.seat_belts) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Seat Belts"}});
            } else if (err.response.data.general_condition) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "General Condition"}});
            } else if (err.response.data.vehicle_documents) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Vehicle Documents"}});
            } else if (err.response.data.liquid_leak) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Liquid Leak"}});
            } else if (err.response.data.cleanliness_engine_bay) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Engine Bay: Cleanliness"}});
            } else if (err.response.data.washer_fluid) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Washer Fluid"}});
            } else if (err.response.data.coolant_level) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Coolant Level"}});
            } else if (err.response.data.brake_fluid_level) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Brake Fluid Level"}});
            } else if (err.response.data.power_steering_fluid) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Power Steering Fluid"}});
            } else if (err.response.data.main_beam) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Main Beam"}});
            } else if (err.response.data.dipped_beam) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Dipped Beam"}});
            } else if (err.response.data.side_lights) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Side Lights"}});
            } else if (err.response.data.tail_lights) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Tail Lights"}});
            } else if (err.response.data.indicators) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Indicators"}});
            } else if (err.response.data.break_lights) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Break Lights"}});
            } else if (err.response.data.reverse_lights) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Reverse Lights"}});
            } else if (err.response.data.hazard_light) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Hazard Lights"}});
            } else if (err.response.data.rear_fog_lights) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Rear Fog Light"}});
            } else if (err.response.data.interior_lights) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Interior Lights"}});
            } else if (err.response.data.screen_washer) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Screen Washer"}});
            } else if (err.response.data.wiper_blades) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Wiper Blades"}});
            } else if (err.response.data.horn) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Horn"}});
            } else if (err.response.data.radio) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Radio/CD"}});
            } else if (err.response.data.front_fog_lights) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Front Fog Lights"}});
            } else if (err.response.data.tyres) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Tyres"}});
            } else if (err.response.data.front_visual) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Front (Visual)"}});
            } else if (err.response.data.rear_visual) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Rear (Visual)"}});
            } else if (err.response.data.spare_visual) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Spare (Visual)"}});
            } else if (err.response.data.wheel_brace) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Wheel Brace"}});
            } else if (err.response.data.jack) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Jack"}});
            } else if (err.response.data.front_left_wheel) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Left Front"}});
            } else if (err.response.data.front_right_wheel) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Right Front"}});
            } else if (err.response.data.rear_left_wheel) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Left Rear"}});
            } else if (err.response.data.rear_right_wheel) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Right Rear"}});
            } else if (err.response.data.gas_level) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Gas Level"}});
            } else if (err.response.data.oil_level) {
                this.setState({errorMessage: {title:"REQUIRED FIELD:", content: "Oil Level"}});
            } 
            this.onClick('displayError');
          })
    }

    onClick(name) {
        let state = {
            [`${name}`]: true
        };
        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false,
            errorMessage: "",
            labelBtnSubmit:"SUBMIT",
            isBtnSubmit: false,
            iconBtnSubmit: "",
            isLoading: false,
        });
    }

    renderFooter(name) {
        if (name === "displayError"){
            return (
                <div>
                    <Button label="CLOSE" className="p-button-danger" onClick={() => this.onHide(name)} autoFocus />
                </div>
            );
        } else if (name === "displaySuccess"){
            return (
                <div>
                    <Button label="CLOSE" className="p-button-success" onClick={() => this.onHide(name)} autoFocus />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <center><h1><b>Fleet Vehicle Inspection Checklist</b></h1></center>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-6">
                                <AutoComplete forceSelection field="body_no" placeholder="Body No." value={this.state.bn} suggestions={this.state.filteredSuggestions} completeMethod={this.searchList} onChange={event => this.onChangeAutoCompelete(event)}/>
                                {/* <AutoComplete forceSelection field="body_no" placeholder="Body No." value={this.state.bn} suggestions={this.state.filteredSuggestions} completeMethod={this.searchList} onChange={event => this.setState({ bn: event.target.value })}  /> */}
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Make/Model" value={this.state.make = this.state.bn.make === "L30" ? 'L300 Exceed 2.5D MT': this.state.bn.make === "SUV" ? 'Super Carry UV': this.state.bn.make ===  'G15'? 'Gratour midi truck 1.5L': this.state.bn.make ===  'G12'? 'Gratour midi truck 1.2L' : '' }/>
                                {/* <InputText placeholder="Make/Model" value={this.state.bn.make}/> */}
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-6 p-inputgroup">
                                <InputText placeholder="Mileage" value={this.state.mil} keyfilter="int" onChange={event => this.setState({mil: event.target.value})}/>
                                <span className="p-inputgroup-addon">KM.</span>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Location" value={this.state.locc = this.state.bn.current_loc ? this.state.bn.current_loc:''}/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-6 driver-insp-rep">
                                {this.showBodyNumberTags()}
                            </div>
                        </div>
                    </div>
                </div>
                {/*This is space in website UI for upload image display from PrimeReact. */}
                {/*Other table UI like Exterior, Interior, etc. can be change depends on this space. */}
                {/* <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Upload Image File</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <b><p style={{ whiteSpace: 'pre' }}> {this.state.text} </p></b>
                                This is choose button i created instead of default upload UI in primereact for some reason like i cant hide upload button which
                                 will be use in submit button at the bottom of the webpage
                                <input style={{ display: 'none' }} type="file" onChange={this.fileSelect} ref={fileInput => this.fileInput = fileInput} multiple/>
                                <Button onClick={() => this.fileInput.click()} label="Choose File"> </Button>

                            </div>
                            <div className="p-col-12 p-md-4"></div>
                            <div className="p-col-12 p-md-4"></div>
                        </div>
                    </div>
                </div> */}

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Exterior</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}>
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Cleanliness</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue1: false})} checked={this.state.radioValue1 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue1: true})} checked={this.state.radioValue1 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Condition Rust</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue2: false })} checked={this.state.radioValue2 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue2: true })} checked={this.state.radioValue2 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Decals/Livery Intact</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue3: false })} checked={this.state.radioValue3 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue3: true })} checked={this.state.radioValue3 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Windows/Windscreen</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue4: false})} checked={this.state.radioValue4 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue4: true })} checked={this.state.radioValue4 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Rear Door</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue5: false})} checked={this.state.radioValue5 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue5: true })} checked={this.state.radioValue5 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Mirrors</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue6: false })} checked={this.state.radioValue6 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue6: true })} checked={this.state.radioValue6 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Roof Rack</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue7: false })} checked={this.state.radioValue7 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue7: true})} checked={this.state.radioValue7 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Rear Step</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue8: false })} checked={this.state.radioValue8 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue8: true})} checked={this.state.radioValue8 === true} /></center>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Interior</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}>
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Seats</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue9: false })} checked={this.state.radioValue9 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue9: true })} checked={this.state.radioValue9 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Seat Belts</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue10: false})} checked={this.state.radioValue10 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue10: true })} checked={this.state.radioValue10 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>General Condition</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue11: false})} checked={this.state.radioValue11 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue11: true })} checked={this.state.radioValue11 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Vehicle Documents</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue12: false})} checked={this.state.radioValue12 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue12: true })} checked={this.state.radioValue12 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Liquid Leak</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue13: false})} checked={this.state.radioValue13 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue13: true })} checked={this.state.radioValue13 === true} /></center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Engine Bay</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}>
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Cleanliness</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue14: false})} checked={this.state.radioValue14 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue14: true})} checked={this.state.radioValue14 === true } /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Washer Fluid</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue15: false})} checked={this.state.radioValue15 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue15: true})} checked={this.state.radioValue15 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Coolant Level</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue16: false})} checked={this.state.radioValue16 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue16: true })} checked={this.state.radioValue16 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Brake Fluid Level</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue17: false})} checked={this.state.radioValue17 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue17: true })} checked={this.state.radioValue17 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Power Steering Fluid</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue18: false })} checked={this.state.radioValue18 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue18: true })} checked={this.state.radioValue18 === true} /></center>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Electrics</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}>
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Main Beam</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue19: false})} checked={this.state.radioValue19 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue19: true })} checked={this.state.radioValue19 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Dipped Beam</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue20: false })} checked={this.state.radioValue20 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue20: true })} checked={this.state.radioValue20 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Side Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue21: false})} checked={this.state.radioValue21 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue21: true })} checked={this.state.radioValue21 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Tail Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue22: false })} checked={this.state.radioValue22 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue22: true})} checked={this.state.radioValue22 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Indicators</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue23: false })} checked={this.state.radioValue23 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue23: true})} checked={this.state.radioValue23 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Break Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue24: false})} checked={this.state.radioValue24 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue24: true })} checked={this.state.radioValue24 === true } /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Reverse Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue25: false })} checked={this.state.radioValue25 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue25: true})} checked={this.state.radioValue25 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Hazard Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue26: false })} checked={this.state.radioValue26 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue26: true })} checked={this.state.radioValue26 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Rear Fog Light</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue27: false})} checked={this.state.radioValue27 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue27: true })} checked={this.state.radioValue27 === true } /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Interior Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue28: false })} checked={this.state.radioValue28 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue28: true })} checked={this.state.radioValue28 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Screen Washer</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue29:false})} checked={this.state.radioValue29 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue29: true})} checked={this.state.radioValue29 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Wiper Blades</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue30:false })} checked={this.state.radioValue30 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue30: true})} checked={this.state.radioValue30 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Horn</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue31: false })} checked={this.state.radioValue31 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue31: true })} checked={this.state.radioValue31 ===true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Radio/CD</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue32: false })} checked={this.state.radioValue32 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue32: true})} checked={this.state.radioValue32 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Front Fog Lights</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue33: false })} checked={this.state.radioValue33 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue33: true })} checked={this.state.radioValue33 === true} /></center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Wheels and Tyres</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}>
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}></div>
                            <div className="p-col widCheck">
                                <center><h4><b>Not Okay</b></h4></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><h4><b>Okay</b></h4></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Tyres</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue34: false})} checked={this.state.radioValue34 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue34: true})} checked={this.state.radioValue34 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Front (Visual)</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue35: false })} checked={this.state.radioValue35 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue35: true})} checked={this.state.radioValue35 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Rear (Visual)</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue36: false})} checked={this.state.radioValue36 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue36: true})} checked={this.state.radioValue36 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Spare (Visual)</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue37: false })} checked={this.state.radioValue37 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue37: true})} checked={this.state.radioValue37 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Wheel Brace</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue38: false })} checked={this.state.radioValue38 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue38: true })} checked={this.state.radioValue38 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Jack</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue39: false })} checked={this.state.radioValue39 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue39: true })} checked={this.state.radioValue39 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Left Front</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue40: false })} checked={this.state.radioValue40 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue40: true})} checked={this.state.radioValue40 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Right Front</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue41: false })} checked={this.state.radioValue41 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue41: true})} checked={this.state.radioValue41 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                            <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Left Rear</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue42: false })} checked={this.state.radioValue42 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue42: true })} checked={this.state.radioValue42 === true} /></center>
                            </div>
                        </div>
                        <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{ marginLeft:'1%', borderBottom: '1px solid #dedede'}}> 
                        <div className="p-col widName" style={{margin:'auto', height:'40px'}}><h4>Right Rear</h4></div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue43: false })} checked={this.state.radioValue43 === false} /></center>
                            </div>
                            <div className="p-col widCheck">
                                <center><Checkbox onChange={event => this.setState({ radioValue43: true })} checked={this.state.radioValue43 === true} /></center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Gas and Oil</h1><hr style={{ borderTop:'1px solid black'}}/>
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-6 p-md-6">
                                <div className="p-grid p-fluid">
                                    <div className="p-field p-col gas-oil-img">
                                        <center><img src='/assets/layout/images/fuelindicator.png' alt="fuel"/></center>
                                    </div>
                                    <div className="p-field p-col">
                                        <center>
                                            <h4><b>Gas Level</b></h4>
                                            <div className="p-col"><Checkbox inputId="rb1" onChange={event => this.setState({ radioValue44: 4})} checked={this.state.radioValue44 === 4} /></div>
                                            <div className="p-col"><Checkbox inputId="rb2" onChange={event => this.setState({ radioValue44: 3})} checked={this.state.radioValue44 === 3} /></div>
                                            <div className="p-col"><Checkbox inputId="rb3" onChange={event => this.setState({ radioValue44: 2})} checked={this.state.radioValue44 === 2} /></div>
                                            <div className="p-col"><Checkbox inputId="rb4" onChange={event => this.setState({ radioValue44: 1})} checked={this.state.radioValue44 === 1} /></div>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div className="p-col-12 p-lg-6 p-md-6">
                                <div className="p-grid p-fluid">
                                    <div className="p-field p-col gas-oil-img">
                                        <center><img src='/assets/layout/images/oilindicator.png' alt="oil"/></center>
                                    </div>
                                    <div className="p-field p-col">
                                        <center>
                                            <h4><b>Oil  Level</b></h4>
                                            <div className="p-col"><Checkbox inputId="rb1" onChange={event => this.setState({ radioValue45: 4})} checked={this.state.radioValue45 === 4} /></div>
                                            <div className="p-col"><Checkbox inputId="rb2" onChange={event => this.setState({ radioValue45: 3})} checked={this.state.radioValue45 === 3} /></div>
                                            <div className="p-col"><Checkbox inputId="rb3" onChange={event => this.setState({ radioValue45: 2})} checked={this.state.radioValue45 === 2} /></div>
                                            <div className="p-col"><Checkbox inputId="rb4" onChange={event => this.setState({ radioValue45: 1})} checked={this.state.radioValue45 === 1} /></div>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Checklist Report</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-12">
                                <label>Emergency Contact Number:</label>
                                <InputText value={this.state.emergency} disabled/>
                            </div>
                            <div className="p-col-12 p-md-12">
                                <label>GPS:</label>
                                <InputText placeholder="Input GPS" value={this.state.gpsData} onChange={event => this.setState({ gpsData: event.target.value })}/>
                            </div>
                            <div className="p-col-12 p-md-12">
                                <label>Remarks:</label>
                                <InputText placeholder="Add other remarks here" value={this.state.com} onChange={event => this.setState({ com: event.target.value })}/>
                            </div>
                            <div className="p-col-12 p-md-12">
                                <label>Driver/ Operator:</label>
                                <InputText placeholder="Driver" value={localStorage.getItem("myfirst")} onChange={event => this.setState({ drivername: event.target.value })} disabled/>
                            </div>
                            <div className="p-col-12 p-md-12">
                                <label>Date Updated:</label>
                                <InputText placeholder="None" value="None" disabled/>
                            </div>
                            <div className="p-col-12 p-md-9"> </div>
                            <div className="p-col-12 p-md-3">
                                {/*submit button is okay but not getting autocomplete value after clicking on suggestions submitData*/}
                                <Button icon={this.state.iconBtnSubmit} iconPos="right" label={this.state.labelBtnSubmit} onClick={this.submitData} disabled={this.state.isBtnSubmit}> </Button>
                                {/* <Button label="SUBMIT" onClick={() => this.onClick('displayError')}> </Button> */}
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog header="SUBMIT FAILURE" visible={this.state.displayError} style={{ width: '310px' }} footer={this.renderFooter('displayError')} onHide={() => this.onHide('displayError')}>
                    <div className="p-grid">
                        <div className="p-col-2">
                            <i className="pi pi-exclamation-triangle" style={{fontSize: '30px', color: 'red'}}/>
                        </div>
                        <div className="p-col">
                            <h5><b>{this.state.errorMessage.title}</b></h5>
                            <div style={{fontSize: '16px'}}>{this.state.errorMessage.content}</div>
                        </div>
                    </div>
                </Dialog>

                <Dialog header="SUBMIT SUCCESS" visible={this.state.displaySuccess} style={{ width: '310px' }} footer={this.renderFooter('displaySuccess')} onHide={() => this.onHide('displaySuccess')}>
                    <div className="p-grid">
                        <div className="p-col-2">
                            <i className="pi pi-check-circle" style={{fontSize: '30px', color: 'green'}}/>
                        </div>
                        <div className="p-col">
                            <h5><b>SAVE REPORT</b></h5>
                            <div style={{fontSize: '16px'}}>Report save successfully.</div>
                        </div>
                    </div>
                </Dialog>

                <div className="gray-out" style={{display: this.state.isLoading ? "flex": "none"}}>
                    <ProgressSpinner />
                </div>

            </div>
        );
    }
}
