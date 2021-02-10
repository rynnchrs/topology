import React, {Component} from 'react';
import { TabView,TabPanel } from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {InputText} from 'primereact/inputtext';


import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber' 
import { Fieldset } from 'primereact/fieldset';

import './TabViewDemo.css';
import axios from "axios";



export class Vehicles extends Component {

    constructor() {
        super();
        this.state = {

            //filter option for search

            filterOption:'VIN', //possible values: byVIN, byBDN or byPLN

            todoList: {},
            dataTableValue:[
                {vin: 'PAEL65NYHJB005043', body: '18-1654', plate: 'NCT4511' },
                {vin: 'PAEL65NYHJB005036', body: '18-1655', plate: 'NCT4508' },
                {vin: 'PAEL65NYHJB005044', body: '18-1656', plate: 'NCT4507' },
                {vin: 'PAEL65NYHJB005012', body: '18-1657', plate: 'NCT4506' },
                {vin: 'PAEL65NYHJB005051', body: '18-1658', plate: 'NCT4505' },
                {vin: 'PAEL65NYHJB004620', body: '18-1659', plate: 'NCT4233' },
                {vin: 'PAEL65NYHJB004958', body: '18-1660', plate: 'NCT4240' },
                {vin: 'PAEL65NYHJB004985', body: '18-1661', plate: 'NCT4236' },
                {vin: 'PAEL65NYHJB005016', body: '18-1662', plate: 'NCT4238' },
                {vin: 'PAEL65NYHJB005032', body: '18-1663', plate: 'NCT4234' },
            ],
            layout: 'list',
            identitylist:[
                {label: 'Status:', value: 'Active'},
                {label: 'Operational:', value: 'Yes'},
                {label: 'Body Number:', value: '18-1654' },
                {label: 'CS Number:', value: 'B2R843' },
                {label: 'Plate Number:', value: 'NCT4511' },
                {label: 'Remarks:', value: 'N/A' },
            ],
            vehicleinfolist:[
                {label: 'Brand:', value: 'Mitsubishi' },
                {label: 'Year:', value: '2018' },
                {label: 'Make:', value: 'L300 Exceed 2.5D MT' },
                {label: 'Series:', value: 'L300 Exceed C/C' },
                {label: 'Body Type:', value: 'HSPUR' },
                {label: 'Color:', value: 'Polar White' },
            ],
            supplierslist:[
                {label: 'Dealer:', value: 'Diamond Motor Corporation' },
                {label: 'PO Number:', value: 'CS-MARIKINA NCLSP-2018-124' },
                {label: 'PO Date:', value: '10/23/2018' },
                {label: 'Body Builder:', value: 'Centro' },
                {label: 'Fabricator:', value: 'Centro' },
            ],
            enginelist:[
                {label: 'Chassis Number:', value: 'PAEL65NYHJB005043' },
                {label: 'Engine Number:', value: '4D56AAT3525' },
                {label: 'Battery Number:', value: 'N/A' },
                {label: 'Fuel Type:', value: 'Diesel' },
                {label: 'Transmission:', value: 'Manual' },
                {label: 'Denomination:', value: 'Utility Vehicle' },
                {label: 'Piston Displacement:', value: '2477' },
                {label: 'Number of Cylinders:', value: '4' },
                {label: 'Procuring Entity:', value: 'FiberHome' },
                {label: 'Capacity:', value: '2 pax' },
                {label: 'Gross Weight:', value: '2345' },
                {label: 'Net Weight:', value: '1173' },
                {label: 'Shipping Weight:', value: '1173' },
                {label: 'Net Capacity:', value: '1172' },
            ],
            ltolist:[
                {label: 'LTO CR:', value: '323178693' },
                {label: 'LTO Date:', value: '08/10/2018' },
                {label: 'OR Number:', value: '002018147722464' },
                {label: 'OR Date:', value: '08/09/2018' },
                {label: 'TopLoadReg:', value: 'Yes' },
                {label: 'Field Office:', value: 'Quezon City District Office' },
                {label: 'ORCR Copy:', value: '11/21/2019' },
            ],
            locationlist:[
                {label: 'Permanent:', value: 'Marikina' },
                {label: 'Current:', value: 'Marikina' },
                {label: 'With VTF?:', value: 'N/A' },
                {label: 'Permanent?', value: 'N/A' },
            ],
            deliverylist:[
                {label: 'Delivery Location:', value: 'Marikina' },
                {label: 'Delivery Date:', value: '08/03/2018' },
                {label: 'SI Number:', value: '186679' },
                {label: 'DR Number', value: 'CE0003' },
                {label: 'DR Codes', value: 'CE0003.7' },
            ],
            biddinglist:[
                {label: 'Bidding Date:', value: 'No Bidding Docs' },
                {label: 'Bidding Name:', value: 'No Bidding Docs' },
                {label: 'Bid Number:', value: 'No Bidding Docs' },
                {label: 'Contract Number', value: 'FH/PH-2018-002-301806' },
            ],
            receivedlist:[
                {label: 'Plate Number Delivery:', value: 'NO RECEIVING COPY' },
                {label: 'Decals:', value: 'no receiving copy found' },
                {label: 'Modified:', value: 'No' },
                {label: 'EWD', value: 'c/o sir jun' },
                {label: 'Tools', value: '08/03/2018' },
                {label: "User's Manual", value: 'NO RECEIVING COPY' },
                {label: 'Warranty Book', value: 'NO RECEIVING COPY' },
                {label: 'Unit Key', value: 'NO RECEIVING COPY' },
                {label: 'Body Key', value: 'NO RECEIVING COPY' },
                {label: 'Cigarette Plug', value: 'NO RECEIVING COPY' },
                {label: 'Keychain', value: 'NO RECEIVING COPY' },
                {label: 'Jack', value: 'NO RECEIVING COPY' },
                {label: 'Tire Wrench', value: 'NO RECEIVING COPY' },
                {label: 'Fire Extinguisher', value: 'NO RECEIVING COPY' },
                {label: 'Early Warning Device', value: 'NO RECEIVING COPY' },
                {label: 'Fan', value: 'N/A' },
            ],
            tpl19list:[
                {label: 'Insurance Company:', value: 'Pioneer Insurance & Surety Corporation' },
                {label: 'Policy Number:', value: 'MC-PC-HO-18-0019722-00-D' },
                {label: 'Date Issued:', value: '08/02/2018' },
                {label: 'From', value: '08/03/2018' },
                {label: 'To', value: '08/03/2021' },
            ],
            insurance19list:[
                {label: 'Insurance Company:', value: 'Pioneer Insurance & Surety Corporation' },
                {label: 'Policy Number:', value: 'MC-PC-HO-18-0020072-00-D' },
                {label: 'Date Issued:', value: '08/07/2018' },
                {label: 'From', value: '08/03/2018' },
                {label: 'To', value: '08/03/2019' },
            ],
            insurance20list:[
                {label: 'Insurance Company:', value: 'The Mercantile Insurance Co., Inc.' },
                {label: 'Policy Number:', value: 'N/A' },
                {label: 'Reference Number:', value: 'N/A' },
                {label: 'Date Issued:', value: 'N/A' },
                {label: 'From', value: 'N/A' },
                {label: 'To', value: 'N/A' },
            ],
        };

        this.radioChange = this.radioChange.bind(this);
    }
    componentDidMount() {
        this.refreshList();
        
      }

    refreshList = () => {
        axios
          .get("http://localhost:8000/api/careta/1/")
          .then(res => this.setState({ todoList: res.data }))
          .catch(err => console.log(err));
      };


    // search option function
    
    radioChange(e) {
        this.setState({
            filterOption: e.currentTarget.value
        });
      }

    render() {
        return (
            <div className="p-grid">
                
                <div className="p-col-12">
                        
                        <div className="p-grid p-dir-col">
                            
                                
                                <Fieldset legend="Search Vehicle" className="p-grid p-dir-col">

                                    <div className="p-d-flex p-mb-2" name="searchbox">
                                        <InputText placeholder={"Search by " + this.state.filterOption + " No."}  style={{width: '100%'}} onKeyUp={event => this.dv.filter(event.target.value)} />
                                    </div>

                                    <div className="p-grid p-mb-2">
                                        <div className="p-col">
                                            <input type="radio"
                                                value="VIN"
                                                checked={this.state.filterOption === "VIN"}
                                                onChange={this.radioChange} />Search By VIN No.
                                        </div>

                                        <div className="p-col">
                                            <input type="radio"
                                                value="Body"
                                                checked={this.state.filterOption === "Body"}
                                                onChange={this.radioChange} />Search By Body No.
                                        </div>

                                        <div className="p-col">
                                            <input type="radio"
                                                value="Plate"
                                                checked={this.state.filterOption === "Plate"}
                                                onChange={this.radioChange} />Search By Plate No.
                                        </div>
                                    
                                    </div>  
                                    
                                    <div className="p-grid">
                                        <div className="p-col-2">
                                            <Button type="button" label="Add New" style={{width: '100%'}} class="btn-block"/>
                                        </div>

                                        <div className="p-col-2">
                                            <Button type="button" label="Modify" style={{width: '100%'}} class="btn-block"/>
                                        </div>

                                        <div className="p-col-2">
                                            <Button type="button" label="Remove" style={{width: '100%'}} class="btn-block"/>
                                        </div>
                                    </div>                                         
                                
                                </Fieldset>    
                            
                            {/*
                            <div className="p-col-12 p-md-4">
                                <InputText placeholder="Search by body no." onKeyUp={event => this.dv.filter(event.target.value)} />
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText placeholder="Search by plate no." onKeyUp={event => this.dv.filter(event.target.value)} />
                            </div>
                            */}
                        </div>
                </div>
                
                <div className="p-col-5">

                    <p class="aligncenter">
                        <img src={process.env.PUBLIC_URL+ "/assets/layout/images/samplecar.jpg"} width="250" alt="car"></img>
                    </p>
                    
                </div>            

                <div className="p-col-7">
                    <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                        <TabPanel header="Identification">
                            
                            <DataTable value={this.state.identitylist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Vehicle Info">
                            <DataTable value={this.state.vehicleinfolist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Suppliers">
                            <DataTable value={this.state.supplierslist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Engine and Body Info">
                            <DataTable value={this.state.enginelist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="LTO">
                            <DataTable value={this.state.ltolist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Location">
                            <DataTable value={this.state.locationlist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Delivery Info">
                            <DataTable value={this.state.deliverylist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Bidding/Contract">
                            <DataTable value={this.state.biddinglist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Received Items">
                            <DataTable value={this.state.receivedlist} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="2019 TPL">
                            <DataTable value={this.state.tpl19list} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="2019 Insurance">
                            <DataTable value={this.state.insurance19list} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="2020 Insurance">
                            <DataTable value={this.state.insurance20list} className="p-datatable-gridlines">
                                <Column field="label"></Column>
                                <Column field="value"></Column>
                            </DataTable>
                        </TabPanel>
                    </TabView>
                </div>
                {/*<p>{this.state.todoList.release_year}</p>*/}
            </div>
            
        );
    }
}