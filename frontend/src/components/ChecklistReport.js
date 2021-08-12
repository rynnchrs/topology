import React, {useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';

export default function ChecklistReport() {

    const jobTypeOptions = [{ name: 'REPAIR', val: 'Repair' }, { name: 'INSPECTION', val: 'Inspection' }];

    const refImageUpload = useRef(null);

    return(
        <div>
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                        <h4>CHECKLIST REPORT</h4>
                    </div>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <div className="card card-w-title">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>YOUR EMAIL:</b></h6>
                                    <InputText placeholder="Input Email"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>SCHEDULE DATE:</b></h6>
                                    <InputText placeholder="Input Date"/>
                                </div>

                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>LOCATION:</b></h6>
                                    <InputText placeholder="Input Location"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>BODY No.:</b></h6>
                                    <InputText placeholder="Input Body No."/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>MAKE/MODEL:</b></h6>
                                    <InputText placeholder="Input Make/Model"/>
                                </div>

                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>ACTUAL ODOMETER READING:</b></h6>
                                    <InputText placeholder="Input Reading"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>JOB DESCRIPTION:</b></h6>
                                    <Dropdown /*value={jobType}*/ options={jobTypeOptions} optionLabel="name" placeholder="Select Job Description" 
                                    /* onChange={event => handleChangeJobType(event.target.value)} */ />
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Is there a pair of Early Warning Device?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="ewd1" name="ewd" value="Yes" /* onChange={(e) => setEWD(e.value)} checked={ewdval === 'Yes'} */ />
                                            <label htmlFor="ewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="ewd2" name="ewd" value="No" />
                                            <label htmlFor="ewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>What color of Early Warning Device is available?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yellow Only</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">Red Only</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd3" name="cewd" value="bo"/>
                                            <label htmlFor="cewd3">Both</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Early Warning Device marked with body number?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Front left hand tire marked with body number?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Front right hand tire marked with body number?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Rear right hand tire marked with body number?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Rear left hand tire marked with body number?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Is there a reserve or spare tire?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Reserve or spare tire marked with body number?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Battery marked with body number?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Correct vehicle weight & capacity labels?</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Yes</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6>Vehicle status</h6>
                                    <div className="p-formgroup-inline ">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd1" name="cewd" value="yo"/>
                                            <label htmlFor="cewd1">Operational</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="cewd2" name="cewd" value="ro"/>
                                            <label htmlFor="cewd2">Non operational</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>PLEASE INCLUDE REMARKS:</b></h6>
                                    <small><i>*If upon inspection concern is not related or out of scope, kindly put "Unit is in good condition"</i></small>
                                    <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                        /* value={detailsIncident} onChange={(e) => setDetailsIncident(e.target.value)} *//>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>WHERE THERE PARTS REPLACED?</b></h6>
                                    <small><i>*If yes, KINDLY INDICATE the PARTS REPLACED and the QUANTITY. If no, kindly tick NA.</i></small>
                                    <div className="p-field-checkbox" style={{paddingTop:'10px'}}>
                                        <Checkbox inputId="cb1"/>
                                        <label htmlFor="cb1">NS40 battery</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb2"/>
                                        <label htmlFor="cb2">NS60 battery</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb2"/>
                                        <label htmlFor="cb2">3SM battery</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb2"/>
                                        <label htmlFor="cb2">Double contact bulb</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb2"/>
                                        <label htmlFor="cb2">Single contact bulb</label>
                                    </div>
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="cb2"/>
                                        <label htmlFor="cb2">Peanut bulb</label>
                                    </div>
                                </div>

                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>HOW MANY PARTS WERE REPLACED?</b></h6>
                                    <small><i>*Kindly indicate the variety of replaced parts. If none, kindly type NA</i></small>
                                    <InputText placeholder="Input Number"/>
                                </div>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 image-upload">
                                    <h6><b>ACTUAL VEHICLE (include photos of interior and exterior defects, vehicle capacity sticker, EWD, tire marks):</b></h6>
                                    <FileUpload ref={refImageUpload} customUpload multiple accept="image/*" maxFileSize={1000000}
                                        emptyTemplate={<p className="p-m-0">Click Choose and select image files to upload.</p>} />
                                </div>
                                <div className="p-col-12 p-lg-9 p-md-9 p-sm-12"></div>
                                <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                    <Button label="SUBMIT" className="p-button-md p-shadow-4 p-button-rounded" /* onClick={() => submitRepairReport()} *//>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}