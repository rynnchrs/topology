import React, {useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/panel';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

export default function IncidentReport() {

    const jobTypeOptions = [{ name: 'REPAIR', val: 'Repair' }, { name: 'INSPECTION', val: 'Inspection' }];
    const statusOperationalOptions = [{ name: 'YES', val: "Yes" }, { name: 'NO', val: "No" }];

    return(
        <div>
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 p-nogutter">
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title" style={{borderBottom: '5px solid blue', padding: '0px'}}>
                        <h4>INCIDENT REPORT</h4>
                    </div>
                    <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                        <div className="card card-w-title">
                            <div className="p-grid p-fluid">
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>IR #:</b></h6>
                                    <InputText placeholder="Input IR No."/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>DATE:</b></h6>
                                    <InputText placeholder="Input Date"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>REQUESTOR'S NAME:</b></h6>
                                    <InputText placeholder="Input Requestor's Name"/>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                            <h6><b>PROJECT NAME:</b></h6>
                                            <InputText placeholder="Input Project Name"/>
                                        </div>
                                        <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                            <h6><b>SUB PROJECT:</b></h6>
                                            <InputText placeholder="Input Sub Project"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>CS NUMBER:</b></h6>
                                    <InputText placeholder="Input CS Number"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>PLATE NUMBER:</b></h6>
                                    <InputText placeholder="Input Plate Number"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>BODY No.:</b></h6>
                                    <InputText placeholder="Input Body no"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>REGION:</b></h6>
                                    <InputText placeholder="Input Region"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>AREA:</b></h6>
                                    <InputText placeholder="Input Area"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>EXACT LOCATION:</b></h6>
                                    <InputText placeholder="Input Location"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>VEHICLE SUPPLIER:</b></h6>
                                    <InputText placeholder="Input Vehicle Supplier"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>VEHICLE TYPE/MAKE:</b></h6>
                                    <InputText placeholder="Input Type/Make"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>OPERATIONAL (YES/NO):</b></h6>
                                    <Dropdown /*value={jobType}*/ options={statusOperationalOptions} optionLabel="name" placeholder="Select" 
                                    /* onChange={event => handleChangeJobType(event.target.value)} */ />
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>CURRENT ODOMETER:</b></h6>
                                    <InputText placeholder="Input Odometer"/>
                                </div>
                                
                                <Panel header="REPAIR TYPE" className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb1"/>
                                            <label htmlFor="cb1">MECHANICAL</label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb1"/>
                                            <label htmlFor="cb1">ELECTRICAL</label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb1"/>
                                            <label htmlFor="cb1">BATTERY</label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb1"/>
                                            <label htmlFor="cb1">TIRES</label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb1"/>
                                            <label htmlFor="cb1">PMS</label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb1"/>
                                            <label htmlFor="cb1">ACCIDENT</label>
                                        </div>
                                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12 p-field-checkbox">
                                            <Checkbox inputId="cb1"/>
                                            <label htmlFor="cb1">OTHERS</label>
                                        </div>
                                    </div>
                                </Panel>

                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 report-title">
                                    <h5>REPAIR/INCIDENT DETAILS</h5>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12">
                                    <h6><b><center>OBSERVATION (Problem encountered during use) / INCIDENT</center></b></h6>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>ENGINE NUMBER:</b></h6>
                                    <InputText placeholder="Input Engine Number"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>CHASSIS NUMBER:</b></h6>
                                    <InputText placeholder="Input Chassis Number"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>DAMAGED PARTS:</b></h6>
                                    <InputText placeholder="Input Damaged Parts"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12 required-asterisk">
                                    <h6><b>LOCATION OF INCIDENT:</b></h6>
                                    <InputText placeholder="Input Location"/>
                                </div>
                                <div className="p-col-12 p-lg-6 p-md-6 p-sm-12">
                                    <div className="p-grid p-fluid">
                                        <div className="p-col-12 p-lg-8 p-md-8 p-sm-12 required-asterisk">
                                            <h6><b>DATE:</b></h6>
                                            <Calendar placeholder="Select Date" showIcon/>
                                        </div>
                                        <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                            <h6><b>TIME:</b></h6>
                                            <Calendar placeholder="Select Time" timeOnly hourFormat="12" showIcon/>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>PROBLEM OBSERVED:</b></h6>
                                    <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                        /* value={detailsIncident} onChange={(e) => setDetailsIncident(e.target.value)} *//>
                                </div>
                                <div className="p-col-12 p-lg-12 p-md-12 p-sm-12 required-asterisk">
                                    <h6><b>RECOMMENDATION/REQUEST:</b></h6>
                                    <InputTextarea placeholder="Discuss details here." rows={5} cols={30} autoResize
                                        /* value={detailsIncident} onChange={(e) => setDetailsIncident(e.target.value)} *//>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>PREPARED BY: (Driver/Custodian/Dispatcher)</b></h6>
                                    <InputText placeholder="Input Name"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>ADMIN NAME:</b></h6>
                                    <InputText placeholder="Input Name"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>CONTACT NUMBER:</b></h6>
                                    <InputText placeholder="Input Contact Number"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>NOTED BY:</b></h6>
                                    <InputText placeholder="Input Name"/>
                                </div>
                                <div className="p-col-12 p-lg-4 p-md-4 p-sm-12 required-asterisk">
                                    <h6><b>APPROVED BY:</b></h6>
                                    <InputText placeholder="Input Name"/>
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