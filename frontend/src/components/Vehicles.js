import React, {Component, useState} from 'react';
import { TabView,TabPanel } from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {InputText} from 'primereact/inputtext';


import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber' 
import {Fieldset} from 'primereact/fieldset';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputMask} from 'primereact/inputmask';
import {Calendar} from 'primereact/calendar';

import './TabViewDemo.css';
import axios from "axios";



export class Vehicles extends Component {

    

    constructor() {
        super();
        this.state = {

            //filter option for search

            filterOption:'VIN', //possible values: VIN, BDN or PLN
            vmModalMode: 'Add', //possible values: Add, Modify, Remove    
            vmVisibility: false, //modal form visibility

            vBrandSelected: 'Mitsubishi', //test data only
            
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

        const brandListItems = [
            {label: 'Mitsubishi', value: 'Mitsubishi'},
            {label: 'Kia', value: 'Kia'}
        ];

        const dealerListItems = [
            {label: 'Diamond Motor Corporation', value: 'Diamond Motor Corporation'},
            {label: 'Toyota Motors', value: 'Toyota Motors'}
        ];

        const onHide = () => {

            this.setState({
                vmVisibility: false
            });
            }

        const onShow = (vm) => {

            this.setState({
                vmVisibility: true,
                vmModalMode: vm
            });
            }
        
        const renderFooter = (name) => {
            return (
                <div>
                    <Button label="Save" icon="pi pi-check" onClick={() => onHide()} autofocus />
                    <Button label="Cancel" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                </div>
            );
        }

        const onBrandChange = (e) => {

            /*    

            test hookup to defined lists in state

            this.setState(prevState => ({
                vehicleinfolist: prevState.vehicleinfolist.map(
                obj => (obj.label === 'Brand:' ? Object.assign(obj, { value: e.value }) : obj)
              )
            }));
            
            */
            
        }

        

        return (

            
            <div className="p-grid">
                
                <div className="p-col-12">

                    <Dialog header={this.state.vmModalMode + " Vehicle Data"} visible={this.state.vmVisibility} style={{ width: '50vw' }} closable={false} footer={renderFooter('displayBasic')} onHide={() => onHide()} >
                        <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                            <TabPanel header="Identification" className="btn-block">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vStatus" className="p-col-12 p-md-2">Status:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vStatus" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vOperational" className="p-col-12 p-md-2">Operational:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vOperational" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyNum" className="p-col-12 p-md-2">Body Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyNum" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCSNum" className="p-col-12 p-md-2">CS Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCSNum" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPlateNum" className="p-col-12 p-md-2">Plate Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPlateNum" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vRemarks" className="p-col-12 p-md-2">Remarks:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vRemarks" type="text"/>
                                        </div>
                                    </div>
                                </div>
                              
                            </TabPanel>
                            <TabPanel header="Vehicle Info">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBrand" className="p-col-12 p-md-2">Brand:</label>
                                        <div className="p-col-12 p-md-10">
                                            <Dropdown id="vBrand" value={this.state.vBrandSelected} options={brandListItems} optionLabel="label" placeholder="Select a Brand" />
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vYear" className="p-col-12 p-md-2">Year:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputMask id="vYear" mask="9999" value={'2020'} ></InputMask>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vMake" className="p-col-12 p-md-2">Make:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vMake" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vSeries" className="p-col-12 p-md-2">Series:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vSeries" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyType" className="p-col-12 p-md-2">Body Type:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyType" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vColor" className="p-col-12 p-md-2">Color:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vColor" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                       
                            </TabPanel>
                            <TabPanel header="Suppliers">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDealer" className="p-col-12 p-md-2">Dealer:</label>
                                        <div className="p-col-12 p-md-10">
                                            <Dropdown id="vDealer" value={''} options={dealerListItems} optionLabel="label" placeholder="Select a Dealer" />
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPONumber" className="p-col-12 p-md-2">PO Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPONumber" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPODate" className="p-col-12 p-md-2">PO Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPODate" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyBuilder" className="p-col-12 p-md-2">Body Builder:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyBuilder" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFabricator" className="p-col-12 p-md-2">Fabricator:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFabricator" type="text"/>
                                        </div>
                                    </div>
                                    
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="Engine and Body Info">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vChassisN" className="p-col-12 p-md-2">Chassis Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vChassisN" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vEngineN" className="p-col-12 p-md-2">Engine Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vEngineN" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBatteryN" className="p-col-12 p-md-2">Battery Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBatteryN" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFuelType" className="p-col-12 p-md-2">Fuel Type:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFuelType" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTransmission" className="p-col-12 p-md-2">Transmission:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vTransmission" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDenomination" className="p-col-12 p-md-2">Denomination:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDenomination" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPistonD" className="p-col-12 p-md-2">Piston Displacement:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPistonD" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNumCylinders" className="p-col-12 p-md-2">Number of Cylinders:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNumCylinders" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vProcEntity" className="p-col-12 p-md-2">Procuring Entity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vProcEntity" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCapacity" className="p-col-12 p-md-2">Capacity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCapacity" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vGrossW" className="p-col-12 p-md-2">Gross Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vGrossW" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNetW" className="p-col-12 p-md-2">Net Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNetW" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vShippingW" className="p-col-12 p-md-2">Shipping Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vShippingW" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNetCapacity" className="p-col-12 p-md-2">Net Capacity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNetCapacity" type="text"/>
                                        </div>
                                    </div>
                                    
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="LTO">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vLTOCR" className="p-col-12 p-md-2">LTO CR:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vLTOCR" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vLTOCRDate" className="p-col-12 p-md-2">LTO Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vLTOCRDate" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORNumber" className="p-col-12 p-md-2">OR Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORNumber" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORDate" className="p-col-12 p-md-2">OR Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORDate" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTopLoadReg" className="p-col-12 p-md-2">TopLoadReg:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vTopLoadReg" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFieldOfc" className="p-col-12 p-md-2">Field office:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFieldOfc" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORCRCopy" className="p-col-12 p-md-2">ORCR Copy:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORCRCopy" type="text"/>
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel header="Location">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPermanentLoc" className="p-col-12 p-md-2">Permanent:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPermanentLoc" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCurrentLoc" className="p-col-12 p-md-2">Current:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCurrentLoc" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vVTF" className="p-col-12 p-md-2">With VTF?:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vVTF" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPLStatus" className="p-col-12 p-md-2">Permanent?:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPLStatus" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="Delivery Info">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDeliveryLoc" className="p-col-12 p-md-2">Delivery Location:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDeliveryLoc" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDeliveryDate" className="p-col-12 p-md-2">Delivery Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDeliveryDate" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vSINumber" className="p-col-12 p-md-2">SI Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vSINumber" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDRNumber" className="p-col-12 p-md-2">DR Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDRNumber" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDRCodes" className="p-col-12 p-md-2">DR Codes:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDRCodes" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="Bidding/Contract">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBiddingDate" className="p-col-12 p-md-2">Bidding Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBiddingDate" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBiddingName" className="p-col-12 p-md-2">Bidding Name:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBiddingName" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBidNumber" className="p-col-12 p-md-2">Bid Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBidNumber" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vContractNumber" className="p-col-12 p-md-2">Contract Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vContractNumber" type="text"/>
                                        </div>
                                    </div>
                                   
                                </div>
                                    
                            </TabPanel>
                            <TabPanel header="Received Items">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPlateNumDel" className="p-col-12 p-md-2">Plate Number Delivery:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPlateNumDel" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDecals" className="p-col-12 p-md-2">Decals:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDecals" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vModified" className="p-col-12 p-md-2">Modified:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vModified" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vEWD" className="p-col-12 p-md-2">EWD:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vEWD" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTools" className="p-col-12 p-md-2">Tools:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vTools" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vUsersManual" className="p-col-12 p-md-2">User's Manual:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vUsersManual" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vWarrantyBook" className="p-col-12 p-md-2">Warranty Book:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vWarrantyBook" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vUnitKey" className="p-col-12 p-md-2">Unit Key:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vUnitKey" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyKey" className="p-col-12 p-md-2">Body Key:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyKey" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCigPlug" className="p-col-12 p-md-2">Cigarette Plug:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCigPlug" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vKeyChain" className="p-col-12 p-md-2">Key Chain:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vKeyChain" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vJack" className="p-col-12 p-md-2">Jack:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vJack" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTireWrench" className="p-col-12 p-md-2">Tire Wrench:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vTireWrench" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFireExt" className="p-col-12 p-md-2">Fire Extinguisher:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFireExt" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vEWDevice" className="p-col-12 p-md-2">Early Warning Device:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vEWDevice" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFan" className="p-col-12 p-md-2">Fan:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFan" type="text"/>
                                        </div>
                                    </div>
                                   
                                </div>
                                       
                            </TabPanel>
                            <TabPanel header="2019 TPL">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vInsuranceCompany1" className="p-col-12 p-md-2">Insurance Company:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vInsuranceCompany1" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyNumber1" className="p-col-12 p-md-2">Policy Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyNumber1" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyDateIssued1" className="p-col-12 p-md-2">Date Issued:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyDateIssued1" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyFrom1" className="p-col-12 p-md-2">From:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyFrom1" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyTo1" className="p-col-12 p-md-2">To:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyTo1" type="text"/>
                                        </div>
                                    </div>
                                   
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="2019 Insurance">

                            <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vInsuranceCompany2" className="p-col-12 p-md-2">Insurance Company:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vInsuranceCompany2" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyNumber2" className="p-col-12 p-md-2">Policy Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyNumber2" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyDateIssued2" className="p-col-12 p-md-2">Date Issued:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyDateIssued2" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyFrom2" className="p-col-12 p-md-2">From:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyFrom2" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyTo2" className="p-col-12 p-md-2">To:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyTo2" type="text"/>
                                        </div>
                                    </div>
                                   
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="2020 Insurance">
                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vInsuranceCompany3" className="p-col-12 p-md-2">Insurance Company:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vInsuranceCompany3" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyNumber3" className="p-col-12 p-md-2">Policy Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyNumber3" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vReferrenceNumber3" className="p-col-12 p-md-2">Referrence Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vReferrenceNumber3" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyDateIssued3" className="p-col-12 p-md-2">Date Issued:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyDateIssued3" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyFrom3" className="p-col-12 p-md-2">From:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyFrom3" type="text"/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPolicyTo3" className="p-col-12 p-md-2">To:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPolicyTo3" type="text"/>
                                        </div>
                                    </div>
                                   
                                </div>
                                       
                            </TabPanel>
                        </TabView>
                    </Dialog>
                                
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
                
                <div className="p-col-12">

                    <Fieldset legend="Vehicle Data" className="p-grid p-dir-col">

                        <div className="p-grid">

                            <div className="p-col-12">
                            <div className="p-grid p-justify-end">
                                <Button label="Add New" icon="pi pi-plus" className="p-col-1 p-mr-2" onClick={() => onShow("Add")} />
                                <Button label="Modify" icon="pi pi-pencil" className="p-col-1 p-mr-2" onClick={() => onShow("Modify")} />
                                <Button label="Remove" icon="pi pi-ban" className="p-col-1 p-mr-2" onClick={() => onShow("Remove")} />
                            </div>
                            </div>
                            

                            <div className="p-col-3">

                                <div class="p-d-flex p-jc-center">
                                    <img src={process.env.PUBLIC_URL+ "/assets/layout/images/samplecar.jpg"} width="250" alt="car"></img>
                                </div>

                            </div>            

                            <div className="p-col-9">
                                <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                                    <TabPanel header="Identification" className="btn-block">
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

                        </div>

                    </Fieldset>
    
                </div>                
 
                {/*<p>{this.state.todoList.release_year}</p>*/}
            </div>
            
        );
    }
}