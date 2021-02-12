import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
<<<<<<< Updated upstream
import { FileUpload } from 'primereact/fileupload';
=======
import { AutoComplete } from 'primereact/autocomplete';
>>>>>>> Stashed changes
import axios from "axios";

{/*I added Image upload table below*/ }

export class DriverInspectionReport extends Component {

    constructor() {
        super();
        this.state = {
            checkboxValue: [],
            radioValue1: null,
            radioValue2: null,
            radioValue3: null,
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
<<<<<<< Updated upstream
            selectedFile: undefined,
            text: "No File Chosen",
            bodyValue: undefined,
=======
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
            mod: "",
            mil: "",
            loc: "",
            com: "",
            driver: "",
            time: "",
            date: "",
            bodyno: [],
            filteredSuggestions: [],
            completeSuggestions: [],
            setFilteredCountries: undefined,
>>>>>>> Stashed changes
            
        };

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        
    }

    onCheckboxChange(event) {
        let selected = [...this.state.checkboxValue];
        if (event.checked)
            selected.push(event.value);
        else
            selected.splice(selected.indexOf(event.value), 1);
        this.setState({ checkboxValue: selected });
    }

<<<<<<< Updated upstream
=======
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/careta/`)
            .then(res => {
                const bodyno = res.data;
                this.setState({
                    bodyno: res.data,
                    filteredSuggestions: res.data
                });
                console.log(bodyno);
                console.log(this.state.filteredSuggestions);
                {
                    /*this.state.bodyno.map((mybody, index) => {
                        return this.state.filteredSuggestions.push(mybody.body_no);
                    })*/
                    this.state.bodyno.map((mybody, index) => {
                        return this.state.completeSuggestions.push(mybody.body_no);
                    })
                }
               /* console.log(this.state.filteredSuggestions);*/
                console.log(this.state.completeSuggestions);

            })
    }

    searchList = (event) => {
        setTimeout(() => {
            let filteredCountries;
            if (!event.query.trim().length) {
                filteredCountries = this.state.bodyno;
            }
            else {
                filteredCountries = this.state.bodyno.filter((country) => {
                    return country.slug.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            this.state.setFilteredCountries(filteredCountries);
        }, 250);

        /*let items = this.state.filteredSuggestions;
        if (this.state.bn) {
            items = items.filter(item =>
                item.slug.includes("L"))
        }*/

        /*if (!event.query.trim().length) {
            *//*filteredSuggestions = this.state.bodyno;*//*
            console.log("trim");
        } else {
            *//*filteredSuggestions = [...this.state.bodyno].filter((list) => {
                return list.name.toLowerCase().startsWith(event.query.toLowerCase());
                return list.name.includes(event.query);
            });*//*
            console.log(event.query);
            filteredSuggestions = this.state.bodyno.filter((item) => {
                return Object.keys(item).some(key => item[key].toString().search(event.query) !== -1);
            });
            console.log(this.state.filteredSuggestions);
            
            
            console.log("else trim");
        }*/
           
        /*this.setState({ filteredSuggestions });*/
        /*console.log(items);*/
    };

>>>>>>> Stashed changes
    //This will get the filename/filepath that can be use in post request*
    fileSelect = event => {
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
    };

<<<<<<< Updated upstream
    onUpload = (event) => {
        [value1, setValue1] = useState('');
        console.log(event.target.files);
    }

    handleSubmit = event => {
        console.log("submit try");
        event.preventDefault();

    }

    getBody = ({ target }) => {
        bodyValue(target.value);
    };

    tryThis() {
        console.log(bodyValue);
=======
    submitData = event => {
        console.log('data:' + this.state.bn + ',' + this.state.mod + ',' + this.state.mil + ',' + this.state.loc);
        console.log('exterior: ' + this.state.radioValue1 + ',' + this.state.radioValue2 + ',' + this.state.radioValue3 + ',' + this.state.radioValue4 + ',' + this.state.radioValue5
            + ',' + this.state.radioValue6 + ',' + this.state.radioValue7 + ',' + this.state.radioValue8);
        console.log('interior: ' + this.state.radioValue9 + ',' + this.state.radioValue10 + ',' + this.state.radioValue11 + ',' + this.state.radioValue12);
        console.log('enginebay: ' + this.state.radioValue13 + ',' + this.state.radioValue14 + ',' + this.state.radioValue15 + ',' + this.state.radioValue16 + ',' + this.state.radioValue17);
        console.log('electrics: ' + this.state.radioValue18 + ',' + this.state.radioValue19 + ',' + this.state.radioValue20 + ',' + this.state.radioValue21 + ',' + this.state.radioValue22
            + ',' + this.state.radioValue23 + ',' + this.state.radioValue24 + ',' + this.state.radioValue25 + ',' + this.state.radioValue26 + ',' + this.state.radioValue27
            + ',' + this.state.radioValue28 + ',' + this.state.radioValue29 + ',' + this.state.radioValue30 + ',' + this.state.radioValue31 + ',' + this.state.radioValue32 + ',' + this.state.radioValue33);
        console.log('wheels&tyres: ' + this.state.radioValue34 + ',' + this.state.radioValue35 + ',' + this.state.radioValue36 + ',' + this.state.radioValue37 + ',' + this.state.radioValue38
            + ',' + this.state.radioValue39 + ',' + this.state.radioValue40 + ',' + this.state.radioValue41 + ',' + this.state.radioValue42 + ',' + this.state.radioValue43);
        console.log('gas&iol: ' + this.state.radioValue44 + ',' + this.state.radioValue45);
        console.log('wheels: ' + this.state.radioValue46 + ',' + this.state.radioValue47 + ',' + this.state.radioValue48 + ',' + this.state.radioValue49);
        console.log('belowdata:' + this.state.com + ',' + this.state.driver + ',' + this.state.time + ',' + this.state.date);
>>>>>>> Stashed changes
    }

    
    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <center><h1><b>Fleet Vehicle Inspection Checklist</b></h1></center>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-6">
<<<<<<< Updated upstream
                                <InputText placeholder="Body No." value={bodyValue} onChange={getBody}/> 
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Make/Model" />
=======
                                <AutoComplete value={this.state.bn} suggestions={this.state.completeSuggestions} completeMethod={this.searchList} onChange={event => this.setState({ bn: event.value })}/>
                                {/*<InputText placeholder="Body No." value={this.state.value} onChange={event => this.setState({ bn: event.target.value })}/> */}
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Make/Model" value={this.state.mod} onChange={event => this.setState({ mod: event.target.value })}/>
>>>>>>> Stashed changes
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-6">
<<<<<<< Updated upstream
                                <InputText placeholder="Mileage" />
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Location" />
=======
                                <InputText placeholder="Mileage" value={this.state.mil} onChange={event => this.setState({ mil: event.target.value })}/>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Location" value={this.state.loc} onChange={event => this.setState({ loc: event.target.value })}/>
>>>>>>> Stashed changes
                            </div>
                        </div>
                    </div>
                </div>
                {/*This is space in website UI for upload image display from PrimeReact. */}
                {/*Other table UI like Exterior, Interior, etc. can be change depends on this space. */}
                <div className="p-col-12 p-lg-12"> 
                    <div className="card card-w-title">
                        <h1>Upload Image File</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <b><p style={{ whiteSpace: 'pre' }}> {this.state.text} </p></b>
                                {/*This is choose button i created instead of default upload UI in primereact for some reason like i cant hide upload button which 
                                 will be use in submit button at the bottom of the webpage*/}
                                <input style={{ display: 'none' }} type="file" onChange={this.fileSelect} ref={fileInput => this.fileInput = fileInput} multiple/>
                                <Button onClick={() => this.fileInput.click()} label="Choose File"> </Button>
<<<<<<< Updated upstream
                                {/*<FileUpload mode="basic" name="demo[]" url="./upload.php" onChange={this.fileSelect} multiple accept="image*//*" maxFileSize={1000000}
                                    emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>} />*/}

                                <Button label="Submit" onClick={this.tryThis}> </Button>
=======
                               
                                <Button label="Submit" onClick={this.submitData}> </Button>
>>>>>>> Stashed changes
                                
                            </div>
                            <div className="p-col-12 p-md-4"></div>
                            <div className="p-col-12 p-md-4"></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Exterior</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <center><label>Not Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><label>Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4"></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="clean_ok" inputId="rb1" onChange={event => this.setState({ radioValue1: event.value })} checked={this.state.radioValue1 === "clean_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="clean_not" inputId="rb2" onChange={event => this.setState({ radioValue1: event.value })} checked={this.state.radioValue1 === "clean_not"} /></center>
=======
                                <center><Checkbox value="clean_not" inputId="rb1" onChange={event => this.setState({ radioValue1: event.value })} checked={this.state.radioValue1 === "clean_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="clean_ok" inputId="rb2" onChange={event => this.setState({ radioValue1: event.value })} checked={this.state.radioValue1 === "ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Cleanliness</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="cr_ok" inputId="rb1" onChange={event => this.setState({ radioValue2: event.value })} checked={this.state.radioValue2 === "cr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cr_not" inputId="rb2" onChange={event => this.setState({ radioValue2: event.value })} checked={this.state.radioValue2 === "cr_not"} /></center>
=======
                                <center><Checkbox value="cr_not" inputId="rb1" onChange={event => this.setState({ radioValue2: event.value })} checked={this.state.radioValue2 === "cr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cr_ok" inputId="rb2" onChange={event => this.setState({ radioValue2: event.value })} checked={this.state.radioValue2 === "cr_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Condition Rust</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="d_ok" inputId="rb1" onChange={event => this.setState({ radioValue3: event.value })} checked={this.state.radioValue3 === "d_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="d_not" inputId="rb2" onChange={event => this.setState({ radioValue3: event.value })} checked={this.state.radioValue3 === "d_not"} /></center>
=======
                                <center><Checkbox value="d_not" inputId="rb1" onChange={event => this.setState({ radioValue3: event.value })} checked={this.state.radioValue3 === "d_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="d_ok" inputId="rb2" onChange={event => this.setState({ radioValue3: event.value })} checked={this.state.radioValue3 === "d_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Decals</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="ww_ok" inputId="rb1" onChange={event => this.setState({ radioValue4: event.value })} checked={this.state.radioValue4 === "ww_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ww_not" inputId="rb2" onChange={event => this.setState({ radioValue4: event.value })} checked={this.state.radioValue4 === "ww_not"} /></center>
=======
                                <center><Checkbox value="ww_not" inputId="rb1" onChange={event => this.setState({ radioValue4: event.value })} checked={this.state.radioValue4 === "ww_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ww_ok" inputId="rb2" onChange={event => this.setState({ radioValue4: event.value })} checked={this.state.radioValue4 === "ww_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Windows/ Windscreen</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rd_ok" inputId="rb1" onChange={event => this.setState({ radioValue5: event.value })} checked={this.state.radioValue5 === "rd_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rd_not" inputId="rb2" onChange={event => this.setState({ radioValue5: event.value })} checked={this.state.radioValue5 === "rd_not"} /></center>
=======
                                <center><Checkbox value="rd_not" inputId="rb1" onChange={event => this.setState({ radioValue5: event.value })} checked={this.state.radioValue5 === "rd_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rd_ok" inputId="rb2" onChange={event => this.setState({ radioValue5: event.value })} checked={this.state.radioValue5 === "rd_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Rear Door</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="m_ok" inputId="rb1" onChange={event => this.setState({ radioValue6: event.value })} checked={this.state.radioValue6 === "m_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="m_not" inputId="rb2" onChange={event => this.setState({ radioValue6: event.value })} checked={this.state.radioValue6 === "m_not"} /></center>
=======
                                <center><Checkbox value="m_not" inputId="rb1" onChange={event => this.setState({ radioValue6: event.value })} checked={this.state.radioValue6 === "m_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="m_ok" inputId="rb2" onChange={event => this.setState({ radioValue6: event.value })} checked={this.state.radioValue6 === "m_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Mirrors</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rr_ok" inputId="rb1" onChange={event => this.setState({ radioValue7: event.value })} checked={this.state.radioValue7 === "rr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rr_not" inputId="rb2" onChange={event => this.setState({ radioValue7: event.value })} checked={this.state.radioValue7 === "rr_not"} /></center>
=======
                                <center><Checkbox value="rr_not" inputId="rb1" onChange={event => this.setState({ radioValue7: event.value })} checked={this.state.radioValue7 === "rr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rr_ok" inputId="rb2" onChange={event => this.setState({ radioValue7: event.value })} checked={this.state.radioValue7 === "rr_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Roof Rack</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rs_ok" inputId="rb1" onChange={event => this.setState({ radioValue8: event.value })} checked={this.state.radioValue8 === "rs_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rs_not" inputId="rb2" onChange={event => this.setState({ radioValue8: event.value })} checked={this.state.radioValue8 === "rs_not"} /></center>
=======
                                <center><Checkbox value="rs_not" inputId="rb1" onChange={event => this.setState({ radioValue8: event.value })} checked={this.state.radioValue8 === "rs_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rs_ok" inputId="rb2" onChange={event => this.setState({ radioValue8: event.value })} checked={this.state.radioValue8 === "rs_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Rear Step</label></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Interior</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <center><label>Not Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><label>Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4"></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="s_ok" inputId="rb1" onChange={event => this.setState({ radioValue9: event.value })} checked={this.state.radioValue9 === "s_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="s_not" inputId="rb2" onChange={event => this.setState({ radioValue9: event.value })} checked={this.state.radioValue9 === "s_not"} /></center>
=======
                                <center><Checkbox value="s_not" inputId="rb1" onChange={event => this.setState({ radioValue9: event.value })} checked={this.state.radioValue9 === "s_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="s_ok" inputId="rb2" onChange={event => this.setState({ radioValue9: event.value })} checked={this.state.radioValue9 === "s_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Seats</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="sb_ok" inputId="rb1" onChange={event => this.setState({ radioValue10: event.value })} checked={this.state.radioValue10 === "sb_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sb_not" inputId="rb2" onChange={event => this.setState({ radioValue10: event.value })} checked={this.state.radioValue10 === "sb_not"} /></center>
=======
                                <center><Checkbox value="sb_not" inputId="rb1" onChange={event => this.setState({ radioValue10: event.value })} checked={this.state.radioValue10 === "sb_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sb_ok" inputId="rb2" onChange={event => this.setState({ radioValue10: event.value })} checked={this.state.radioValue10 === "sb_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Seat Belts</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="gc_ok" inputId="rb1" onChange={event => this.setState({ radioValue11: event.value })} checked={this.state.radioValue11 === "gc_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="gc_not" inputId="rb2" onChange={event => this.setState({ radioValue11: event.value })} checked={this.state.radioValue11 === "gc_not"} /></center>
=======
                                <center><Checkbox value="gc_not" inputId="rb1" onChange={event => this.setState({ radioValue11: event.value })} checked={this.state.radioValue11 === "gc_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="gc_ok" inputId="rb2" onChange={event => this.setState({ radioValue11: event.value })} checked={this.state.radioValue11 === "gc_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>General Condition</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="vdok" inputId="rb1" onChange={event => this.setState({ radioValue12: event.value })} checked={this.state.radioValue12 === "vd_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="vd_not" inputId="rb2" onChange={event => this.setState({ radioValue12: event.value })} checked={this.state.radioValue12 === "vd_not"} /></center>
=======
                                <center><Checkbox value="vd_not" inputId="rb1" onChange={event => this.setState({ radioValue12: event.value })} checked={this.state.radioValue12 === "vd_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="vd_ok" inputId="rb2" onChange={event => this.setState({ radioValue12: event.value })} checked={this.state.radioValue12 === "vd_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Vehicle Documents</label></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Engine Bay</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <center><label>Not Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><label>Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4"></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="cleane_ok" inputId="rb1" onChange={event => this.setState({ radioValue13: event.value })} checked={this.state.radioValue13 === "cleane_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cleane_not" inputId="rb2" onChange={event => this.setState({ radioValue13: event.value })} checked={this.state.radioValue13 === "cleane_not"} /></center>
=======
                                <center><Checkbox value="cleane_not" inputId="rb1" onChange={event => this.setState({ radioValue13: event.value })} checked={this.state.radioValue13 === "cleane_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cleane_ok" inputId="rb2" onChange={event => this.setState({ radioValue13: event.value })} checked={this.state.radioValue13 === "cleane_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Cleanliness</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="wf_ok" inputId="rb1" onChange={event => this.setState({ radioValue14: event.value })} checked={this.state.radioValue14 === "wf_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wf_not" inputId="rb2" onChange={event => this.setState({ radioValue14: event.value })} checked={this.state.radioValue14 === "wf_not"} /></center>
=======
                                <center><Checkbox value="wf_not" inputId="rb1" onChange={event => this.setState({ radioValue14: event.value })} checked={this.state.radioValue14 === "wf_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wf_ok" inputId="rb2" onChange={event => this.setState({ radioValue14: event.value })} checked={this.state.radioValue14 === "wf_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Washer Fluid</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="cl_ok" inputId="rb1" onChange={event => this.setState({ radioValue15: event.value })} checked={this.state.radioValue15 === "cl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cl_not" inputId="rb2" onChange={event => this.setState({ radioValue15: event.value })} checked={this.state.radioValue15 === "cl_not"} /></center>
=======
                                <center><Checkbox value="cl_not" inputId="rb1" onChange={event => this.setState({ radioValue15: event.value })} checked={this.state.radioValue15 === "cl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cl_ok" inputId="rb2" onChange={event => this.setState({ radioValue15: event.value })} checked={this.state.radioValue15 === "cl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Coolant Level</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="bfl_ok" inputId="rb1" onChange={event => this.setState({ radioValue16: event.value })} checked={this.state.radioValue16 === "bfl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="bfl_not" inputId="rb2" onChange={event => this.setState({ radioValue16: event.value })} checked={this.state.radioValue16 === "bfl_not"} /></center>
=======
                                <center><Checkbox value="bfl_not" inputId="rb1" onChange={event => this.setState({ radioValue16: event.value })} checked={this.state.radioValue16 === "bfl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="bfl_ok" inputId="rb2" onChange={event => this.setState({ radioValue16: event.value })} checked={this.state.radioValue16 === "bfl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Brake Fluid Level</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="psf_ok" inputId="rb1" onChange={event => this.setState({ radioValue17: event.value })} checked={this.state.radioValue17 === "psf_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="psf_not" inputId="rb2" onChange={event => this.setState({ radioValue17: event.value })} checked={this.state.radioValue17 === "psf_not"} /></center>
=======
                                <center><Checkbox value="psf_not" inputId="rb1" onChange={event => this.setState({ radioValue17: event.value })} checked={this.state.radioValue17 === "psf_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="psf_ok" inputId="rb2" onChange={event => this.setState({ radioValue17: event.value })} checked={this.state.radioValue17 === "psf_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Power Steering Fluid</label></div>
                        </div>
                    </div>
                </div>


                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Electrics</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <center><label>Not Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><label>Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4"></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="mb_ok" inputId="rb1" onChange={event => this.setState({ radioValue18: event.value })} checked={this.state.radioValue18 === "mb_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="mb_not" inputId="rb2" onChange={event => this.setState({ radioValue18: event.value })} checked={this.state.radioValue18 === "mb_not"} /></center>
=======
                                <center><Checkbox value="mb_not" inputId="rb1" onChange={event => this.setState({ radioValue18: event.value })} checked={this.state.radioValue18 === "mb_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="mb_ok" inputId="rb2" onChange={event => this.setState({ radioValue18: event.value })} checked={this.state.radioValue18 === "mb_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Main Beam</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="db_ok" inputId="rb1" onChange={event => this.setState({ radioValue19: event.value })} checked={this.state.radioValue19 === "db_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="db_not" inputId="rb2" onChange={event => this.setState({ radioValue19: event.value })} checked={this.state.radioValue19 === "db_not"} /></center>
=======
                                <center><Checkbox value="db_not" inputId="rb1" onChange={event => this.setState({ radioValue19: event.value })} checked={this.state.radioValue19 === "db_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="db_ok" inputId="rb2" onChange={event => this.setState({ radioValue19: event.value })} checked={this.state.radioValue19 === "db_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Dipped Beam</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="sl_ok" inputId="rb1" onChange={event => this.setState({ radioValue20: event.value })} checked={this.state.radioValue20 === "sl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sl_not" inputId="rb2" onChange={event => this.setState({ radioValue20: event.value })} checked={this.state.radioValue20 === "sl_not"} /></center>
=======
                                <center><Checkbox value="sl_not" inputId="rb1" onChange={event => this.setState({ radioValue20: event.value })} checked={this.state.radioValue20 === "sl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sl_ok" inputId="rb2" onChange={event => this.setState({ radioValue20: event.value })} checked={this.state.radioValue20 === "sl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Side Lights</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="tl_ok" inputId="rb1" onChange={event => this.setState({ radioValue21: event.value })} checked={this.state.radioValue21 === "tl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="tl_not" inputId="rb2" onChange={event => this.setState({ radioValue21: event.value })} checked={this.state.radioValue21 === "tl_not"} /></center>
=======
                                <center><Checkbox value="tl_not" inputId="rb1" onChange={event => this.setState({ radioValue21: event.value })} checked={this.state.radioValue21 === "tl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="tl_ok" inputId="rb2" onChange={event => this.setState({ radioValue21: event.value })} checked={this.state.radioValue21 === "tl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Tail Lights</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="i_ok" inputId="rb1" onChange={event => this.setState({ radioValue22: event.value })} checked={this.state.radioValue22 === "i_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="i_not" inputId="rb2" onChange={event => this.setState({ radioValue22: event.value })} checked={this.state.radioValue22 === "i_not"} /></center>
=======
                                <center><Checkbox value="i_not" inputId="rb1" onChange={event => this.setState({ radioValue22: event.value })} checked={this.state.radioValue22 === "i_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="i_ok" inputId="rb2" onChange={event => this.setState({ radioValue22: event.value })} checked={this.state.radioValue22 === "i_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Indicators</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="bl_ok" inputId="rb1" onChange={event => this.setState({ radioValue23: event.value })} checked={this.state.radioValue23 === "bl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="bl_not" inputId="rb2" onChange={event => this.setState({ radioValue23: event.value })} checked={this.state.radioValue23 === "bl_not"} /></center>
=======
                                <center><Checkbox value="bl_not" inputId="rb1" onChange={event => this.setState({ radioValue23: event.value })} checked={this.state.radioValue23 === "bl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="bl_ok" inputId="rb2" onChange={event => this.setState({ radioValue23: event.value })} checked={this.state.radioValue23 === "bl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Break Lights</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rl_ok" inputId="rb1" onChange={event => this.setState({ radioValue24: event.value })} checked={this.state.radioValue24 === "rl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rl_not" inputId="rb2" onChange={event => this.setState({ radioValue24: event.value })} checked={this.state.radioValue24 === "rl_not"} /></center>
=======
                                <center><Checkbox value="rl_not" inputId="rb1" onChange={event => this.setState({ radioValue24: event.value })} checked={this.state.radioValue24 === "rl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rl_ok" inputId="rb2" onChange={event => this.setState({ radioValue24: event.value })} checked={this.state.radioValue24 === "rl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Reverse Lights</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="hl_ok" inputId="rb1" onChange={event => this.setState({ radioValue25: event.value })} checked={this.state.radioValue25 === "hl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="hl_not" inputId="rb2" onChange={event => this.setState({ radioValue25: event.value })} checked={this.state.radioValue25 === "hl_not"} /></center>
=======
                                <center><Checkbox value="hl_not" inputId="rb1" onChange={event => this.setState({ radioValue25: event.value })} checked={this.state.radioValue25 === "hl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="hl_ok" inputId="rb2" onChange={event => this.setState({ radioValue25: event.value })} checked={this.state.radioValue25 === "hl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Hazard Lights</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rfl_ok" inputId="rb1" onChange={event => this.setState({ radioValue26: event.value })} checked={this.state.radioValue26 === "rfl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rfl_not" inputId="rb2" onChange={event => this.setState({ radioValue26: event.value })} checked={this.state.radioValue26 === "rfl_not"} /></center>
=======
                                <center><Checkbox value="rfl_not" inputId="rb1" onChange={event => this.setState({ radioValue26: event.value })} checked={this.state.radioValue26 === "rfl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rfl_ok" inputId="rb2" onChange={event => this.setState({ radioValue26: event.value })} checked={this.state.radioValue26 === "rfl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Rear Fog Light</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="il_ok" inputId="rb1" onChange={event => this.setState({ radioValue27: event.value })} checked={this.state.radioValue27 === "il_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="il_not" inputId="rb2" onChange={event => this.setState({ radioValue27: event.value })} checked={this.state.radioValue27 === "il_not"} /></center>
=======
                                <center><Checkbox value="il_not" inputId="rb1" onChange={event => this.setState({ radioValue27: event.value })} checked={this.state.radioValue27 === "il_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="il_ok" inputId="rb2" onChange={event => this.setState({ radioValue27: event.value })} checked={this.state.radioValue27 === "il_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Interior Lights</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="sw_ok" inputId="rb1" onChange={event => this.setState({ radioValue28: event.value })} checked={this.state.radioValue28 === "sw_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sw_not" inputId="rb2" onChange={event => this.setState({ radioValue28: event.value })} checked={this.state.radioValue28 === "sw_not"} /></center>
=======
                                <center><Checkbox value="sw_not" inputId="rb1" onChange={event => this.setState({ radioValue28: event.value })} checked={this.state.radioValue28 === "sw_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sw_ok" inputId="rb2" onChange={event => this.setState({ radioValue28: event.value })} checked={this.state.radioValue28 === "sw_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Screen Washer</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="wb_ok" inputId="rb1" onChange={event => this.setState({ radioValue29: event.value })} checked={this.state.radioValue29 === "wb_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wb_not" inputId="rb2" onChange={event => this.setState({ radioValue29: event.value })} checked={this.state.radioValue29 === "wb_not"} /></center>
=======
                                <center><Checkbox value="wb_not" inputId="rb1" onChange={event => this.setState({ radioValue29: event.value })} checked={this.state.radioValue29 === "wb_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wb_ok" inputId="rb2" onChange={event => this.setState({ radioValue29: event.value })} checked={this.state.radioValue29 === "wb_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Wiper Blades</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="h_ok" inputId="rb1" onChange={event => this.setState({ radioValue30: event.value })} checked={this.state.radioValue30 === "h_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="h_not" inputId="rb2" onChange={event => this.setState({ radioValue30: event.value })} checked={this.state.radioValue30 === "h_not"} /></center>
=======
                                <center><Checkbox value="h_not" inputId="rb1" onChange={event => this.setState({ radioValue30: event.value })} checked={this.state.radioValue30 === "h_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="h_ok" inputId="rb2" onChange={event => this.setState({ radioValue30: event.value })} checked={this.state.radioValue30 === "h_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Horn</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rcd_ok" inputId="rb1" onChange={event => this.setState({ radioValue31: event.value })} checked={this.state.radioValue31 === "rcd_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rcd_not" inputId="rb2" onChange={event => this.setState({ radioValue31: event.value })} checked={this.state.radioValue31 === "rcd_not"} /></center>
=======
                                <center><Checkbox value="rcd_not" inputId="rb1" onChange={event => this.setState({ radioValue31: event.value })} checked={this.state.radioValue31 === "rcd_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rcd_ok" inputId="rb2" onChange={event => this.setState({ radioValue31: event.value })} checked={this.state.radioValue31 === "rcd_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Radio/ CD</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="ffl_ok" inputId="rb1" onChange={event => this.setState({ radioValue32: event.value })} checked={this.state.radioValue32 === "ffl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ffl_not" inputId="rb2" onChange={event => this.setState({ radioValue32: event.value })} checked={this.state.radioValue32 === "ffl_not"} /></center>
=======
                                <center><Checkbox value="ffl_not" inputId="rb1" onChange={event => this.setState({ radioValue32: event.value })} checked={this.state.radioValue32 === "ffl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ffl_ok" inputId="rb2" onChange={event => this.setState({ radioValue32: event.value })} checked={this.state.radioValue32 === "ffl_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Front Fog Lights</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="ac_ok" inputId="rb1" onChange={event => this.setState({ radioValue33: event.value })} checked={this.state.radioValue33 === "ac_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ac_not" inputId="rb2" onChange={event => this.setState({ radioValue33: event.value })} checked={this.state.radioValue33 === "ac_not"} /></center>
=======
                                <center><Checkbox value="ac_not" inputId="rb1" onChange={event => this.setState({ radioValue33: event.value })} checked={this.state.radioValue33 === "ac_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ac_ok" inputId="rb2" onChange={event => this.setState({ radioValue33: event.value })} checked={this.state.radioValue33 === "ac_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Air Conditioning</label></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Wheels and Tyres</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <center><label>Not Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><label>Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4"></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="t_ok" inputId="rb1" onChange={event => this.setState({ radioValue34: event.value })} checked={this.state.radioValue34 === "t_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="t_not" inputId="rb2" onChange={event => this.setState({ radioValue34: event.value })} checked={this.state.radioValue34 === "t_not"} /></center>
=======
                                <center><Checkbox value="t_not" inputId="rb1" onChange={event => this.setState({ radioValue34: event.value })} checked={this.state.radioValue34 === "t_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="t_ok" inputId="rb2" onChange={event => this.setState({ radioValue34: event.value })} checked={this.state.radioValue34 === "t_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Tyres</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="fv_ok" inputId="rb1" onChange={event => this.setState({ radioValue35: event.value })} checked={this.state.radioValue35 === "fv_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="fv_not" inputId="rb2" onChange={event => this.setState({ radioValue35: event.value })} checked={this.state.radioValue35 === "fv_not"} /></center>
=======
                                <center><Checkbox value="fv_not" inputId="rb1" onChange={event => this.setState({ radioValue35: event.value })} checked={this.state.radioValue35 === "fv_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="fv_ok" inputId="rb2" onChange={event => this.setState({ radioValue35: event.value })} checked={this.state.radioValue35 === "fv_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Front (Visual)</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rv_ok" inputId="rb1" onChange={event => this.setState({ radioValue36: event.value })} checked={this.state.radioValue36 === "rv_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rv_not" inputId="rb2" onChange={event => this.setState({ radioValue36: event.value })} checked={this.state.radioValue36 === "rv_not"} /></center>
=======
                                <center><Checkbox value="rv_not" inputId="rb1" onChange={event => this.setState({ radioValue36: event.value })} checked={this.state.radioValue36 === "rv_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rv_ok" inputId="rb2" onChange={event => this.setState({ radioValue36: event.value })} checked={this.state.radioValue36 === "rv_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Rear (Visual)</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="sv_ok" inputId="rb1" onChange={event => this.setState({ radioValue37: event.value })} checked={this.state.radioValue37 === "sv_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sv_not" inputId="rb2" onChange={event => this.setState({ radioValue37: event.value })} checked={this.state.radioValue37 === "sv_not"} /></center>
=======
                                <center><Checkbox value="sv_not" inputId="rb1" onChange={event => this.setState({ radioValue37: event.value })} checked={this.state.radioValue37 === "sv_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sv_ok" inputId="rb2" onChange={event => this.setState({ radioValue37: event.value })} checked={this.state.radioValue37 === "sv_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Spare (Visual)</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="wbr_ok" inputId="rb1" onChange={event => this.setState({ radioValue38: event.value })} checked={this.state.radioValue38 === "wbr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wbr_not" inputId="rb2" onChange={event => this.setState({ radioValue38: event.value })} checked={this.state.radioValue38 === "wbr_not"} /></center>
=======
                                <center><Checkbox value="wbr_not" inputId="rb1" onChange={event => this.setState({ radioValue38: event.value })} checked={this.state.radioValue38 === "wbr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wbr_ok" inputId="rb2" onChange={event => this.setState({ radioValue38: event.value })} checked={this.state.radioValue38 === "wbr_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Wheel Brace</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="j_ok" inputId="rb1" onChange={event => this.setState({ radioValue39: event.value })} checked={this.state.radioValue39 === "j_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="j_not" inputId="rb2" onChange={event => this.setState({ radioValue39: event.value })} checked={this.state.radioValue39 === "j_not"} /></center>
=======
                                <center><Checkbox value="j_not" inputId="rb1" onChange={event => this.setState({ radioValue39: event.value })} checked={this.state.radioValue39 === "j_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="j_ok" inputId="rb2" onChange={event => this.setState({ radioValue39: event.value })} checked={this.state.radioValue39 === "j_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Jack</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="lf_ok" inputId="rb1" onChange={event => this.setState({ radioValue40: event.value })} checked={this.state.radioValue40 === "lf_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lf_not" inputId="rb2" onChange={event => this.setState({ radioValue40: event.value })} checked={this.state.radioValue40 === "lf_not"} /></center>
=======
                                <center><Checkbox value="lf_not" inputId="rb1" onChange={event => this.setState({ radioValue40: event.value })} checked={this.state.radioValue40 === "lf_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lf_ok" inputId="rb2" onChange={event => this.setState({ radioValue40: event.value })} checked={this.state.radioValue40 === "lf_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Left Front</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rf_ok" inputId="rb1" onChange={event => this.setState({ radioValue41: event.value })} checked={this.state.radioValue41 === "rf_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rf_not" inputId="rb2" onChange={event => this.setState({ radioValue41: event.value })} checked={this.state.radioValue41 === "rf_not"} /></center>
=======
                                <center><Checkbox value="rf_not" inputId="rb1" onChange={event => this.setState({ radioValue41: event.value })} checked={this.state.radioValue41 === "rf_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rf_ok" inputId="rb2" onChange={event => this.setState({ radioValue41: event.value })} checked={this.state.radioValue41 === "rf_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Right Front</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="lr_ok" inputId="rb1" onChange={event => this.setState({ radioValue42: event.value })} checked={this.state.radioValue42 === "lr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lr_not" inputId="rb2" onChange={event => this.setState({ radioValue42: event.value })} checked={this.state.radioValue42 === "lr_not"} /></center>
=======
                                <center><Checkbox value="lr_not" inputId="rb1" onChange={event => this.setState({ radioValue42: event.value })} checked={this.state.radioValue42 === "lr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lr_ok" inputId="rb2" onChange={event => this.setState({ radioValue42: event.value })} checked={this.state.radioValue42 === "lr_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Left Rear</label></div>

                            <div className="p-col-12 p-md-4">
<<<<<<< Updated upstream
                                <center><Checkbox value="rr_ok" inputId="rb1" onChange={event => this.setState({ radioValue43: event.value })} checked={this.state.radioValue43 === "rr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rr_not" inputId="rb2" onChange={event => this.setState({ radioValue43: event.value })} checked={this.state.radioValue43 === "rr_not"} /></center>
=======
                                <center><Checkbox value="rr_not" inputId="rb1" onChange={event => this.setState({ radioValue43: event.value })} checked={this.state.radioValue43 === "rr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rr_ok" inputId="rb2" onChange={event => this.setState({ radioValue43: event.value })} checked={this.state.radioValue43 === "rr_ok"} /></center>
>>>>>>> Stashed changes
                            </div>
                            <div className="p-col-12 p-md-4"><label>Right Rear</label></div>
                        </div>
                    </div>
                </div>


                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Gas and Oil</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-6">
                                <center><label>Gas Level</label></center>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <center><label>Oil Level</label></center>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <center><Checkbox value="g_4" inputId="rb1" onChange={event => this.setState({ radioValue44: event.value })} checked={this.state.radioValue44 === "g_4"} /></center>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <center><Checkbox value="o_4" inputId="rb1" onChange={event => this.setState({ radioValue45: event.value })} checked={this.state.radioValue45 === "o_4"} /></center>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <center><Checkbox value="g_3" inputId="rb2" onChange={event => this.setState({ radioValue44: event.value })} checked={this.state.radioValue44 === "g_3"} /></center>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <center><Checkbox value="o_3" inputId="rb2" onChange={event => this.setState({ radioValue45: event.value })} checked={this.state.radioValue45 === "o_3"} /></center>
                            </div>

                            <div className="p-col-12 p-md-6">
                                <center><Checkbox value="g_2" inputId="rb3" onChange={event => this.setState({ radioValue44: event.value })} checked={this.state.radioValue44 === "g_2"} /></center>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <center><Checkbox value="o_2" inputId="rb3" onChange={event => this.setState({ radioValue45: event.value })} checked={this.state.radioValue45 === "o_2"} /></center>
                            </div>

                            <div className="p-col-12 p-md-6">
                                <center><Checkbox value="g_1" inputId="rb4" onChange={event => this.setState({ radioValue44: event.value })} checked={this.state.radioValue44 === "g_1"} /></center>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <center><Checkbox value="o_1" inputId="rb4" onChange={event => this.setState({ radioValue45: event.value })} checked={this.state.radioValue45 === "o_1"} /></center>
                            </div>
                        </div>
                    </div>
                </div>

<<<<<<< Updated upstream
=======
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Wheels</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <center><label>Not Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><label>Okay</label></center>
                            </div>
                            <div className="p-col-12 p-md-4"></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ulw_not" inputId="rb1" onChange={event => this.setState({ radioValue46: event.value })} checked={this.state.radioValue46 === "ulw_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ulw_ok" inputId="rb2" onChange={event => this.setState({ radioValue46: event.value })} checked={this.state.radioValue46 === "ulw_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Upper Left Wheel</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="urw_not" inputId="rb1" onChange={event => this.setState({ radioValue47: event.value })} checked={this.state.radioValue47 === "urw_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="urw_ok" inputId="rb2" onChange={event => this.setState({ radioValue47: event.value })} checked={this.state.radioValue47 === "urw_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Upper Right Wheel</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="llw_not" inputId="rb1" onChange={event => this.setState({ radioValue48: event.value })} checked={this.state.radioValue48 === "llw_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="llw_ok" inputId="rb2" onChange={event => this.setState({ radioValue48: event.value })} checked={this.state.radioValue48 === "llw_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Lower Left Wheel</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lrw_not" inputId="rb1" onChange={event => this.setState({ radioValue49: event.value })} checked={this.state.radioValue49 === "lrw_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lrw_ok" inputId="rb2" onChange={event => this.setState({ radioValue49: event.value })} checked={this.state.radioValue49     === "lrw_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Lower Right Wheel</label></div>
                        </div>
                    </div>
                </div>

>>>>>>> Stashed changes
                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Checklist Report</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-12">
                                <label>Comments:</label>
<<<<<<< Updated upstream
                                <InputText placeholder="Comments" />
                            </div>
                            <div className="p-col-12 p-md-6">
                                <label>Driver/ Operator:</label>
                                <InputText placeholder="Inspected by" />
                            </div>
                            <div className="p-col-12 p-md-3">
                                <label>Time:</label>
                                <InputText placeholder="Time" />
                            </div>
                            <div className="p-col-12 p-md-3">
                                <label>Date:</label>
                                <InputText placeholder="Date" />
=======
                                <InputText placeholder="Comments" value={this.state.com} onChange={event => this.setState({ com: event.target.value })}/>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <label>Driver/ Operator:</label>
                                <InputText placeholder="Inspected by" value={this.state.driver} onChange={event => this.setState({ driver: event.target.value })}/>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <label>Time:</label>
                                <InputText placeholder="Time" value={this.state.time} onChange={event => this.setState({ time: event.target.value })}/>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <label>Date:</label>
                                <InputText placeholder="Date" value={this.state.date} onChange={event => this.setState({ date: event.target.value })}/>
>>>>>>> Stashed changes
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}