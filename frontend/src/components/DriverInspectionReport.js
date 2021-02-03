import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

{/*I added Driver Inspection Report tab under Report tab in App.js*/ }

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
    
    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <center><h1>Fleet Vehicle Inspection Checklist</h1></center>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Body No." /> 
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Make/Model" />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Mileage" />
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText placeholder="Location" />
                            </div>
                        </div>
                    </div>
                </div>
                {/*This is space in website UI for upload image display from PrimeReact. */}
                {/*Other table UI like Exterior, Interior, etc. can be change depends on this space. */}
                <div className="p-col-12 p-lg-6"> 
                    <div className="card card-w-title">
                        <div className="p-grid">
                            <center><label>Upload Image</label></center>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-6">
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
                                <center><Checkbox value="clean_ok" inputId="rb1" onChange={event => this.setState({ radioValue1: event.value })} checked={this.state.radioValue1 === "clean_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="clean_not" inputId="rb2" onChange={event => this.setState({ radioValue1: event.value })} checked={this.state.radioValue1 === "clean_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Cleanliness</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cr_ok" inputId="rb1" onChange={event => this.setState({ radioValue2: event.value })} checked={this.state.radioValue2 === "cr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cr_not" inputId="rb2" onChange={event => this.setState({ radioValue2: event.value })} checked={this.state.radioValue2 === "cr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Condition Rust</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="d_ok" inputId="rb1" onChange={event => this.setState({ radioValue3: event.value })} checked={this.state.radioValue3 === "d_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="d_not" inputId="rb2" onChange={event => this.setState({ radioValue3: event.value })} checked={this.state.radioValue3 === "d_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Decals</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ww_ok" inputId="rb1" onChange={event => this.setState({ radioValue4: event.value })} checked={this.state.radioValue4 === "ww_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ww_not" inputId="rb2" onChange={event => this.setState({ radioValue4: event.value })} checked={this.state.radioValue4 === "ww_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Windows/ Windscreen</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rd_ok" inputId="rb1" onChange={event => this.setState({ radioValue5: event.value })} checked={this.state.radioValue5 === "rd_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rd_not" inputId="rb2" onChange={event => this.setState({ radioValue5: event.value })} checked={this.state.radioValue5 === "rd_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Rear Door</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="m_ok" inputId="rb1" onChange={event => this.setState({ radioValue6: event.value })} checked={this.state.radioValue6 === "m_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="m_not" inputId="rb2" onChange={event => this.setState({ radioValue6: event.value })} checked={this.state.radioValue6 === "m_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Mirrors</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rr_ok" inputId="rb1" onChange={event => this.setState({ radioValue7: event.value })} checked={this.state.radioValue7 === "rr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rr_not" inputId="rb2" onChange={event => this.setState({ radioValue7: event.value })} checked={this.state.radioValue7 === "rr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Roof Rack</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rs_ok" inputId="rb1" onChange={event => this.setState({ radioValue8: event.value })} checked={this.state.radioValue8 === "rs_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rs_not" inputId="rb2" onChange={event => this.setState({ radioValue8: event.value })} checked={this.state.radioValue8 === "rs_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Rear Step</label></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-6">
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
                                <center><Checkbox value="s_ok" inputId="rb1" onChange={event => this.setState({ radioValue9: event.value })} checked={this.state.radioValue9 === "s_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="s_not" inputId="rb2" onChange={event => this.setState({ radioValue9: event.value })} checked={this.state.radioValue9 === "s_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Seats</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sb_ok" inputId="rb1" onChange={event => this.setState({ radioValue10: event.value })} checked={this.state.radioValue10 === "sb_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sb_not" inputId="rb2" onChange={event => this.setState({ radioValue10: event.value })} checked={this.state.radioValue10 === "sb_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Seat Belts</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="gc_ok" inputId="rb1" onChange={event => this.setState({ radioValue11: event.value })} checked={this.state.radioValue11 === "gc_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="gc_not" inputId="rb2" onChange={event => this.setState({ radioValue11: event.value })} checked={this.state.radioValue11 === "gc_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>General Condition</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="vdok" inputId="rb1" onChange={event => this.setState({ radioValue12: event.value })} checked={this.state.radioValue12 === "vd_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="vd_not" inputId="rb2" onChange={event => this.setState({ radioValue12: event.value })} checked={this.state.radioValue12 === "vd_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Vehicle Documents</label></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-6">
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
                                <center><Checkbox value="cleane_ok" inputId="rb1" onChange={event => this.setState({ radioValue13: event.value })} checked={this.state.radioValue13 === "cleane_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cleane_not" inputId="rb2" onChange={event => this.setState({ radioValue13: event.value })} checked={this.state.radioValue13 === "cleane_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Cleanliness</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wf_ok" inputId="rb1" onChange={event => this.setState({ radioValue14: event.value })} checked={this.state.radioValue14 === "wf_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wf_not" inputId="rb2" onChange={event => this.setState({ radioValue14: event.value })} checked={this.state.radioValue14 === "wf_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Washer Fluid</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cl_ok" inputId="rb1" onChange={event => this.setState({ radioValue15: event.value })} checked={this.state.radioValue15 === "cl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="cl_not" inputId="rb2" onChange={event => this.setState({ radioValue15: event.value })} checked={this.state.radioValue15 === "cl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Coolant Level</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="bfl_ok" inputId="rb1" onChange={event => this.setState({ radioValue16: event.value })} checked={this.state.radioValue16 === "bfl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="bfl_not" inputId="rb2" onChange={event => this.setState({ radioValue16: event.value })} checked={this.state.radioValue16 === "bfl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><label>Brake Fluid Level</label></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="psf_ok" inputId="rb1" onChange={event => this.setState({ radioValue17: event.value })} checked={this.state.radioValue17 === "psf_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="psf_not" inputId="rb2" onChange={event => this.setState({ radioValue17: event.value })} checked={this.state.radioValue17 === "psf_not"} /></center>
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
                                <center><Checkbox value="mb_ok" inputId="rb1" onChange={event => this.setState({ radioValue18: event.value })} checked={this.state.radioValue18 === "mb_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="mb_not" inputId="rb2" onChange={event => this.setState({ radioValue18: event.value })} checked={this.state.radioValue18 === "mb_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Main Beam</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="db_ok" inputId="rb1" onChange={event => this.setState({ radioValue19: event.value })} checked={this.state.radioValue19 === "db_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="db_not" inputId="rb2" onChange={event => this.setState({ radioValue19: event.value })} checked={this.state.radioValue19 === "db_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Dipped Beam</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sl_ok" inputId="rb1" onChange={event => this.setState({ radioValue20: event.value })} checked={this.state.radioValue20 === "sl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sl_not" inputId="rb2" onChange={event => this.setState({ radioValue20: event.value })} checked={this.state.radioValue20 === "sl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Side Lights</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="tl_ok" inputId="rb1" onChange={event => this.setState({ radioValue21: event.value })} checked={this.state.radioValue21 === "tl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="tl_not" inputId="rb2" onChange={event => this.setState({ radioValue21: event.value })} checked={this.state.radioValue21 === "tl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Tail Lights</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="i_ok" inputId="rb1" onChange={event => this.setState({ radioValue22: event.value })} checked={this.state.radioValue22 === "i_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="i_not" inputId="rb2" onChange={event => this.setState({ radioValue22: event.value })} checked={this.state.radioValue22 === "i_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Indicators</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="bl_ok" inputId="rb1" onChange={event => this.setState({ radioValue23: event.value })} checked={this.state.radioValue23 === "bl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="bl_not" inputId="rb2" onChange={event => this.setState({ radioValue23: event.value })} checked={this.state.radioValue23 === "bl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Break Lights</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rl_ok" inputId="rb1" onChange={event => this.setState({ radioValue24: event.value })} checked={this.state.radioValue24 === "rl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rl_not" inputId="rb2" onChange={event => this.setState({ radioValue24: event.value })} checked={this.state.radioValue24 === "rl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Reverse Lights</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="hl_ok" inputId="rb1" onChange={event => this.setState({ radioValue25: event.value })} checked={this.state.radioValue25 === "hl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="hl_not" inputId="rb2" onChange={event => this.setState({ radioValue25: event.value })} checked={this.state.radioValue25 === "hl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Hazard Lights</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rfl_ok" inputId="rb1" onChange={event => this.setState({ radioValue26: event.value })} checked={this.state.radioValue26 === "rfl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rfl_not" inputId="rb2" onChange={event => this.setState({ radioValue26: event.value })} checked={this.state.radioValue26 === "rfl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Rear Fog Light</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="il_ok" inputId="rb1" onChange={event => this.setState({ radioValue27: event.value })} checked={this.state.radioValue27 === "il_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="il_not" inputId="rb2" onChange={event => this.setState({ radioValue27: event.value })} checked={this.state.radioValue27 === "il_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Interior Lights</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sw_ok" inputId="rb1" onChange={event => this.setState({ radioValue28: event.value })} checked={this.state.radioValue28 === "sw_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sw_not" inputId="rb2" onChange={event => this.setState({ radioValue28: event.value })} checked={this.state.radioValue28 === "sw_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Screen Washer</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wb_ok" inputId="rb1" onChange={event => this.setState({ radioValue29: event.value })} checked={this.state.radioValue29 === "wb_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wb_not" inputId="rb2" onChange={event => this.setState({ radioValue29: event.value })} checked={this.state.radioValue29 === "wb_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Wiper Blades</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="h_ok" inputId="rb1" onChange={event => this.setState({ radioValue30: event.value })} checked={this.state.radioValue30 === "h_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="h_not" inputId="rb2" onChange={event => this.setState({ radioValue30: event.value })} checked={this.state.radioValue30 === "h_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Horn</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rcd_ok" inputId="rb1" onChange={event => this.setState({ radioValue31: event.value })} checked={this.state.radioValue31 === "rcd_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rcd_not" inputId="rb2" onChange={event => this.setState({ radioValue31: event.value })} checked={this.state.radioValue31 === "rcd_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Radio/ CD</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ffl_ok" inputId="rb1" onChange={event => this.setState({ radioValue32: event.value })} checked={this.state.radioValue32 === "ffl_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ffl_not" inputId="rb2" onChange={event => this.setState({ radioValue32: event.value })} checked={this.state.radioValue32 === "ffl_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Front Fog Lights</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ac_ok" inputId="rb1" onChange={event => this.setState({ radioValue33: event.value })} checked={this.state.radioValue33 === "ac_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="ac_not" inputId="rb2" onChange={event => this.setState({ radioValue33: event.value })} checked={this.state.radioValue33 === "ac_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Air Conditioning</label></center></div>
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
                                <center><Checkbox value="t_ok" inputId="rb1" onChange={event => this.setState({ radioValue34: event.value })} checked={this.state.radioValue34 === "t_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="t_not" inputId="rb2" onChange={event => this.setState({ radioValue34: event.value })} checked={this.state.radioValue34 === "t_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Tyres</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="fv_ok" inputId="rb1" onChange={event => this.setState({ radioValue35: event.value })} checked={this.state.radioValue35 === "fv_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="fv_not" inputId="rb2" onChange={event => this.setState({ radioValue35: event.value })} checked={this.state.radioValue35 === "fv_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Front (Visual)</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rv_ok" inputId="rb1" onChange={event => this.setState({ radioValue36: event.value })} checked={this.state.radioValue36 === "rv_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rv_not" inputId="rb2" onChange={event => this.setState({ radioValue36: event.value })} checked={this.state.radioValue36 === "rv_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Rear (Visual)</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sv_ok" inputId="rb1" onChange={event => this.setState({ radioValue37: event.value })} checked={this.state.radioValue37 === "sv_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="sv_not" inputId="rb2" onChange={event => this.setState({ radioValue37: event.value })} checked={this.state.radioValue37 === "sv_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Spare (Visual)</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wbr_ok" inputId="rb1" onChange={event => this.setState({ radioValue38: event.value })} checked={this.state.radioValue38 === "wbr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="wbr_not" inputId="rb2" onChange={event => this.setState({ radioValue38: event.value })} checked={this.state.radioValue38 === "wbr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Wheel Brace</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="j_ok" inputId="rb1" onChange={event => this.setState({ radioValue39: event.value })} checked={this.state.radioValue39 === "j_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="j_not" inputId="rb2" onChange={event => this.setState({ radioValue39: event.value })} checked={this.state.radioValue39 === "j_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Jack</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lf_ok" inputId="rb1" onChange={event => this.setState({ radioValue40: event.value })} checked={this.state.radioValue40 === "lf_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lf_not" inputId="rb2" onChange={event => this.setState({ radioValue40: event.value })} checked={this.state.radioValue40 === "lf_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Left Front</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rf_ok" inputId="rb1" onChange={event => this.setState({ radioValue41: event.value })} checked={this.state.radioValue41 === "rf_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rf_not" inputId="rb2" onChange={event => this.setState({ radioValue41: event.value })} checked={this.state.radioValue41 === "rf_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Right Front</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lr_ok" inputId="rb1" onChange={event => this.setState({ radioValue42: event.value })} checked={this.state.radioValue42 === "lr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="lr_not" inputId="rb2" onChange={event => this.setState({ radioValue42: event.value })} checked={this.state.radioValue42 === "lr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Left Rear</label></center></div>

                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rr_ok" inputId="rb1" onChange={event => this.setState({ radioValue43: event.value })} checked={this.state.radioValue43 === "rr_ok"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <center><Checkbox value="rr_not" inputId="rb2" onChange={event => this.setState({ radioValue43: event.value })} checked={this.state.radioValue43 === "rr_not"} /></center>
                            </div>
                            <div className="p-col-12 p-md-4"><center><label>Right Rear</label></center></div>
                        </div>
                    </div>
                </div>


                <div className="p-col-12 p-lg-12">
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

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Checklist Report</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-12">
                                <label>Comments:</label>
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
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}