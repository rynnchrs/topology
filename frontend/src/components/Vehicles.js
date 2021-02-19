import React, {Component, useState } from 'react';
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
import {SelectButton} from 'primereact/selectbutton';

//import './TabViewDemo.css';
import axios from "axios";

export class Vehicles extends Component {

    constructor() {
        super();
       
        this.state = {

            //vehicle data object    
            vehicleData : {
                car_id : '',
                slug : '',
                vin_no : '',
                body_no : '',
                cs_no : '',
                plate_no : '',
                brand : '',
                release_year : '',
                make : '',
                series : '',
                body_type : '',
                color : '',
                dealer : '',
                dealer_phone : '',
                dealer_email : '',
                po_no : '',
                po_date : '',
                body_builder : '',
                fabricator : '',
                sale_price : '',
                vat_price : '',
                engine_no : '',
                battery_no : '',
                fuel_type : '',
                transmission : '',
                denomination : '',
                piston : '',
                cylinder : '',
                procuring_entity : '',
                capacity : '',
                gross_weight : '',
                net_weight : '',
                shipping_weight : '',
                net_capacity : '',
                lto_cr : '',
                cr_date : '',
                or_no : '',
                or_date : '',
                top_load : '',
                field_office : '',
                or_cr : '',
                permanent_loc : '',
                current_loc : '',
                vtf : '',
                permanent_status : '',
                delivery_location : '',
                deliver_date : '',
                si_no : '',
                dr_no : '',
                dr_codes : '',
                plate_date : '',
                decals_date : '',
                modified : '',
                ewd_date : '',
                tools_date : '',
                userManual_date : '',
                warrantyBook_date : '',
                unitKey_date : '',
                bodyKey_date : '',
                cigarettePlug_date : '',
                keychain_date : '',
                fan_date : '',
                jack_date: '',
                wrench_date: '',
                fire_ext_date:'',
                remarks : '',
                operational : '',
                status : '',
                date_updated : '',
                date_created : ''

            },    
            //filter option for search

            filterOption:'VIN', //possible values: VIN, BDN or PLN
            vmModalMode: 'Add', //possible values: Add, Modify, Remove    
            vmVisibility: false, //modal form visibility
            vdModalMode: '',
            vdVisibility: false,

            vBrandSelected: 'Mitsubishi', //test data only

            selectedRowVal:[],
            
            todoList: {},
       
            layout: 'list',

            activeIndexMain: 0,
            activeIndexModal: 0,

            

            
        };

        this.radioChange = this.radioChange.bind(this);

        this.vehicleinfolist =[
            {label: 'Brand:', value: 'Mitsubishi' },
            {label: 'Year:', value: this.state.vehicleData.release_year },
            {label: 'Make:', value: 'L300 Exceed 2.5D MT' },
            {label: 'Series:', value: 'L300 Exceed C/C' },
            {label: 'Body Type:', value: 'HSPUR' },
            {label: 'Color:', value: 'Polar White' },
        ];

        this.identitylist =[
            {label: 'Status:', value: 'Active'},
            {label: 'Operational:', value: 'YES'},
            {label: 'Body Number:', value: this.state.vehicleData.body_no },
            {label: 'CS Number:', value: 'B2R843' },
            {label: 'Plate Number:', value: 'NCT4511' },
            {label: 'Remarks:', value: 'N/A' },
        ];
        
        this.supplierslist =[
            {label: 'Dealer:', value: 'Diamond Motor Corporation' },
            {label: 'PO Number:', value: 'CS-MARIKINA NCLSP-2018-124' },
            {label: 'PO Date:', value: '10/23/2018' },
            {label: 'Body Builder:', value: 'Centro' },
            {label: 'Fabricator:', value: 'Centro' },
        ];
        
        this.enginelist =[
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
        ];

        this.ltolist =[
            {label: 'LTO CR:', value: '323178693' },
            {label: 'LTO Date:', value: '08/10/2018' },
            {label: 'OR Number:', value: '002018147722464' },
            {label: 'OR Date:', value: '08/09/2018' },
            {label: 'TopLoadReg:', value: 'Yes' },
            {label: 'Field Office:', value: 'Quezon City District Office' },
            {label: 'ORCR Copy:', value: '11/21/2019' },
        ];

        this.locationlist =[
            {label: 'Permanent:', value: 'Marikina' },
            {label: 'Current:', value: 'Marikina' },
            {label: 'With VTF?:', value: 'N/A' },
            {label: 'Permanent?', value: 'N/A' },
        ];

        this.deliverylist =[
            {label: 'Delivery Location:', value: 'Marikina' },
            {label: 'Delivery Date:', value: '08/03/2018' },
            {label: 'SI Number:', value: '186679' },
            {label: 'DR Number', value: 'CE0003' },
            {label: 'DR Codes', value: 'CE0003.7' },
        ];

        this.biddinglist =[
            {label: 'Bidding Date:', value: 'No Bidding Docs' },
            {label: 'Bidding Name:', value: 'No Bidding Docs' },
            {label: 'Bid Number:', value: 'No Bidding Docs' },
            {label: 'Contract Number', value: 'FH/PH-2018-002-301806' },
        ];

        this.receivedlist =[
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
        ];

        this.tpllist =[
            {label: 'Insurance Company:', value: 'Pioneer Insurance & Surety Corporation' },
            {label: 'Policy Number:', value: 'MC-PC-HO-18-0019722-00-D' },
            {label: 'Date Issued:', value: '08/02/2018' },
            {label: 'From', value: '08/03/2018' },
            {label: 'To', value: '08/03/2021' },
        ];
        
        this.insurancelist =[
            {label: 'Insurance Company:', value: 'The Mercantile Insurance Co., Inc.' },
            {label: 'Policy Number:', value: 'N/A' },
            {label: 'Reference Number:', value: 'N/A' },
            {label: 'Date Issued:', value: 'N/A' },
            {label: 'From', value: 'N/A' },
            {label: 'To', value: 'N/A' },
        ]
     
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

        const recievedItemStatus = [
            {label: 'No Recieving Copy', value: 'No Recieving Copy'},
            {label: 'Not Yet Released', value: 'Not Yet Released'},
            {label: 'Not Applicable', value: 'Not Applicable'},
            {label: 'Did Not Recieve', value: 'Did Not Recieve'},
            {label: 'Date', value: 'DT'}
        ];

        const statusOptions = [
            {label: 'Active', value: 'Active'},
            {label: 'Maintenance', value: 'Maintenance'},
            {label: 'Repair', value: 'Repair'}
        ];

        const operationalStatus = [
            {label: 'Yes', value: 'Yes'},
            {label: 'No', value: 'No'}
        ];

        const fuelType = [
            {label: 'Diesel', value: 'Diesel'},
            {label: 'Gas', value: 'Gas'}
        ];

        const transmissionType = [
            {label: 'Automatic', value: 'Automatic'},
            {label: 'Manual', value: 'Manual'}
        ];



        const onHide = () => {

            this.setState({
                vmVisibility: false
            });
            }

        const onShow = (vm) => {

            if(vm !== 'Remove')
            {

                this.setState({
                    vmVisibility: true,
                    vmModalMode: vm
                });
            }  
            
            else

            {

            }


           
            }
        
        const renderFooter = (name) => {
            return (
                <div>
                    <Button label="Save" icon="pi pi-check" onClick={() => onHide()} autoFocus />
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

        const setSelectedProduct = (e) => {

            console.log(e)

        }


        //selectbutton behavior on vehicle data: recieved items modal dialog

        const setOptionValue = (name,e) => {

            if(e.value!=='DT'){

                switch(name)
                    {

                        //others

                    case 'Permanent Type': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                permanent_status: e.value
                            }
                        });
                        break;                            

                    case 'VTF Type': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                vtf: e.value
                            }
                        });
                        break;    

                    case 'Fuel Type': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                fuel_type: e.value
                            }
                        });
                        break;
                        
                    case 'Transmission Type': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                transmission: e.value
                            }
                        });
                        break;
                    
                    case 'Status': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                status: e.value
                            }
                        });
                        break;
                    
                    case 'Operational': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                operational: e.value
                            }
                        });
                        break;    


                        //recieved items

                    case 'Plate Number Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                plate_date: e.value
                            }
                        });
                        break;

                    case 'Decal Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                decals_date: e.value
                            }
                        });
                        break;
                        
                    case 'Modified Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                modified: e.value
                            }
                        });
                        break;

                    case 'EWD Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                ewd_date: e.value
                            }
                        });
                        break;
                    
                    case 'Tools Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                tools_date: e.value
                            }
                        });
                        break;

                    case "User's Manual Delivery Date": 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                userManual_date: e.value
                            }
                        });
                        break;

                    case 'Warranty Book Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                warrantyBook_date: e.value
                            }
                        });
                        break;

                    case 'Unit Key Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                unitKey_date: e.value
                            }
                        });
                        break;

                    case 'Body Key Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                bodyKey_date: e.value
                            }
                        });
                        break;

                    case 'Cigarette Plug Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                cigarettePlug_date: e.value
                            }
                        });
                        break;

                    case 'Key Chain Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                keychain_date: e.value
                            }
                        });
                        break;

                    case 'Jack Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                jack_date: e.value
                            }
                        });
                        break;

                    case 'Tire Wrench Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                wrench_date: e.value
                            }
                        });
                        break;

                    case 'Fire Extinguisher Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                fire_ext_date: e.value
                            }
                        });
                        break;

                    case 'Fan Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                fan_date: e.value
                            }
                        });
                        break;    
                        default:
                    }
                
            }

            else
            {
                onCalendarModalShow(name);
            }



        }

        //custom modal calendar behavior

        const onCalendarModalShow = (calendarTarget) => {

            this.setState({
                vdVisibility: true,
                vdModalMode: calendarTarget
                
            });
            }

        const onCalendarModalDateChange = (e) => {

            let formattedValue = e.getFullYear() + "-" + ('0' + (e.getMonth() + 1)).slice(-2) + "-" + ('0' + e.getDate()).slice(-2);

            switch(this.state.vdModalMode)
                {


                    case 'Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                deliver_date: formattedValue
                            }
                        });
                    break;

                    case 'OR CR Copy Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                or_cr: formattedValue
                            }
                        });
                    break;

                    case 'LTO Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                cr_date: formattedValue
                            }
                        });
                        break;

                    case 'OR Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                or_date: formattedValue
                            }
                        });
                        break;

                    case 'PO Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                po_date: formattedValue
                            }
                        });
                        break;    

                    case 'Plate Number Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                plate_date: formattedValue
                            }
                        });
                        break;

                    case 'Decal Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                decals_date: formattedValue
                            }
                        });
                        break;
                        
                    case 'Modified Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                modified: formattedValue
                            }
                        });
                        break;

                    case 'EWD Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                ewd_date: formattedValue
                            }
                        });
                        break;
                    
                    case 'Tools Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                tools_date: formattedValue
                            }
                        });
                        break;

                    case "User's Manual Delivery Date": 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                userManual_date: formattedValue
                            }
                        });
                        break;

                    case 'Warranty Book Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                warrantyBook_date: formattedValue
                            }
                        });
                        break;

                    case 'Unit Key Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                unitKey_date: formattedValue
                            }
                        });
                        break;

                    case 'Body Key Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                bodyKey_date: formattedValue
                            }
                        });
                        break;

                    case 'Cigarette Plug Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                cigarettePlug_date: formattedValue
                            }
                        });
                        break;

                    case 'Key Chain Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                keychain_date: formattedValue
                            }
                        });
                        break;

                    case 'Jack Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                jack_date: formattedValue
                            }
                        });
                        break;

                    case 'Tire Wrench Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                wrench_date: formattedValue
                            }
                        });
                        break;

                    case 'Fire Extinguisher Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                fire_ext_date: formattedValue
                            }
                        });
                        break;

                    case 'Fan Delivery Date': 

                        this.setState({
                            vehicleData: {
                                ...this.state.vehicleData,
                                fan_date: formattedValue
                            }
                        });
                        break;    

                    default:
                }    
            }    

        const onCalendarModalHide = () => {

            this.setState({
                vdVisibility: false
            });
            }    


        const onInputTextClickHandler = (clickSender) => {

            onCalendarModalShow(clickSender);

        }

       
        const onSearchBarOnKeyUp = (e) => {

            
            if(e.keyCode===13)
                {
                    axios
                    .get("http://127.0.0.1:8000/api/careta/?search=" + e.target.value)
                    .then(res =>  {
                        //console.log(res.data[0]);
                        this.setState({ vehicleData: res.data[0] });
                        reProcessResult();
                    })
                    .catch(err => console.log(err));

                    
                }


        }

        const reProcessResult = () => {

            let newValue = '';

            switch(this.state.vehicleData.status)
                {
                    case 'A': newValue = 'Active'; break;
                    case 'M': newValue = 'Maintenance'; break;
                    case 'R': newValue = 'Repair'; break;
                    default:  

                }

            this.setState({
                    vehicleData: {
                        ...this.state.vehicleData,
                        status : newValue
                    }
                });    

            switch(this.state.vehicleData.operational)
                {
                    case true: newValue = 'Yes'; break;
                    default:  
                        newValue='No'

                }

            this.setState({
                    vehicleData: {
                        ...this.state.vehicleData,
                        operational : newValue
                    }
                });        

            }

        const onChangeHandler = (e) => {

            this.setState({
                vehicleData: {
                    ...this.state.vehicleData,
                    [e.target.name]: e.target.value
                }
            });

           console.log(this.identitylist);
           this.forceUpdate();
           console.log(this.identitylist);
        }


        return (
            
            <div className="p-grid">

                <div className="p-col-12">

                    <Dialog header={"Select " + this.state.vdModalMode} visible={this.state.vdVisibility}  onHide={() => onCalendarModalHide()}  >
                        <div className="card">
                        <Calendar inline monthNavigator yearNavigator yearRange="2010:2030" onChange={(e) => onCalendarModalDateChange(e.value)}></Calendar>
                        </div>
                    </Dialog>
                                        
                    <Dialog header={this.state.vmModalMode + " Vehicle Data"} visible={this.state.vmVisibility} footer={renderFooter('displayBasic')} onHide={() => onHide()} className="p-md-8" closable={false} blockScroll={true}>
                        <div className="card">
                        <TabView activeIndex={this.state.activeIndexModal} onTabChange={(e) => this.setState({activeIndexModal: e.index})}>
                            <TabPanel header="Identification" className="btn-block">
                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vStatus" className="p-col-12 p-md-2">Status:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vStatus" type="text" value = {this.state.vehicleData.status}/>
                                            <SelectButton value={""} options={statusOptions} onChange={(e) => setOptionValue('Status',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vOperational" className="p-col-12 p-md-2">Operational:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vOperational" type="text" value = {this.state.vehicleData.operational}/>
                                            <SelectButton value={""} options={operationalStatus} onChange={(e) => setOptionValue('Operational',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyNum" className="p-col-12 p-md-2">Body Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyNum" name='body_no' type="text" onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCSNum" className="p-col-12 p-md-2">CS Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCSNum" type="text" name='cs_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPlateNum" className="p-col-12 p-md-2">Plate Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPlateNum" type="text" name='plate_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vRemarks" className="p-col-12 p-md-2">Remarks:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vRemarks" type="text" name='remarks' onChange={(e) => onChangeHandler(e)}/>
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
                                            <InputMask id="vYear" mask="9999" name='release_year' onChange={(e) => onChangeHandler(e)}></InputMask>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vMake" className="p-col-12 p-md-2">Make:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vMake" type="text" name='make' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vSeries" className="p-col-12 p-md-2">Series:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vSeries" type="text" name='series' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyType" className="p-col-12 p-md-2">Body Type:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyType" type="text" name='body_type' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vColor" className="p-col-12 p-md-2">Color:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vColor" type="text" name='color' onChange={(e) => onChangeHandler(e)}/>
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
                                            <InputText id="vPONumber" type="text" name='po_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPODate" className="p-col-12 p-md-2">PO Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPODate" type="text" value={this.state.vehicleData.po_date} onClick={()=>onInputTextClickHandler("PO Date")} readOnly/> 
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyBuilder" className="p-col-12 p-md-2">Body Builder:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyBuilder" type="text" name='body_builder' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFabricator" className="p-col-12 p-md-2">Fabricator:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFabricator" type="text" name='fabricator' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="Engine and Body Info">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vChassisN" className="p-col-12 p-md-2">Chassis Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vChassisN" type="text" name='vin_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vEngineN" className="p-col-12 p-md-2">Engine Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vEngineN" type="text" name='engine_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBatteryN" className="p-col-12 p-md-2">Battery Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBatteryN" type="text" name='battery_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFuelType" className="p-col-12 p-md-2">Fuel Type:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vFuelType" type="text" value = {this.state.vehicleData.fuel_type}/>
                                            <SelectButton value={""} options={fuelType} onChange={(e) => setOptionValue('Fuel Type',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTransmission" className="p-col-12 p-md-2">Transmission:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vTransmission" type="text" value = {this.state.vehicleData.transmission}/>
                                            <SelectButton value={""} options={transmissionType} onChange={(e) => setOptionValue('Transmission Type',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDenomination" className="p-col-12 p-md-2">Denomination:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDenomination" type="text" name='denomination' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPistonD" className="p-col-12 p-md-2">Piston Displacement:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPistonD" type="text" name='piston' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNumCylinders" className="p-col-12 p-md-2">Number of Cylinders:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNumCylinders" type="text" name='cylinder' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vProcEntity" className="p-col-12 p-md-2">Procuring Entity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vProcEntity" type="text" name='procuring_entity' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCapacity" className="p-col-12 p-md-2">Capacity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCapacity" type="text" name='capacity' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vGrossW" className="p-col-12 p-md-2">Gross Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vGrossW" type="text" name='gross_weight' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNetW" className="p-col-12 p-md-2">Net Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNetW" type="text" name='net_weight' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vShippingW" className="p-col-12 p-md-2">Shipping Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vShippingW" type="text" name='shipping_weight' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNetCapacity" className="p-col-12 p-md-2">Net Capacity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNetCapacity" type="text" name='net_capacity' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="LTO">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vLTOCR" className="p-col-12 p-md-2">LTO CR:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vLTOCR" type="text" name='lto_cr' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vLTOCRDate" className="p-col-12 p-md-2">LTO CR Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vLTOCRDate" type="text" value={this.state.vehicleData.cr_date} onClick={()=>onInputTextClickHandler("LTO Date")} readOnly/> 
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORNumber" className="p-col-12 p-md-2">OR Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORNumber" type="text" name='or_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORDate" className="p-col-12 p-md-2">OR Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORDate" type="text" value={this.state.vehicleData.or_date} onClick={()=>onInputTextClickHandler("OR Date")} readOnly/> 
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTopLoadReg" className="p-col-12 p-md-2">TopLoadReg:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vTopLoadReg" type="text" name='top_load' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFieldOfc" className="p-col-12 p-md-2">Field office:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFieldOfc" type="text" name='field_office' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORCRCopy" className="p-col-12 p-md-2">ORCR Copy:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORCRCopy" type="text" value={this.state.vehicleData.or_cr} onClick={()=>onInputTextClickHandler("OR CR Copy Date")} readOnly/> 
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel header="Location">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPermanentLoc" className="p-col-12 p-md-2">Permanent:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPermanentLoc" type="text" name='permanent_loc' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCurrentLoc" className="p-col-12 p-md-2">Current:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCurrentLoc" type="text" name='current_loc' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vVTF" className="p-col-12 p-md-2">With VTF?:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vVTF" type="text" value={this.state.vehicleData.vtf} readOnly/>
                                            <SelectButton value={""} options={operationalStatus} onChange={(e) => setOptionValue('VTF Type',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPLStatus" className="p-col-12 p-md-2">Permanent?:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vPLStatus" type="text" value={this.state.vehicleData.permanent_status} readOnly/>
                                            <SelectButton value={""} options={operationalStatus} onChange={(e) => setOptionValue('Permanent Type',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="Delivery Info">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDeliveryLoc" className="p-col-12 p-md-2">Delivery Location:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDeliveryLoc" type="text" name='delivery_location' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDeliveryDate" className="p-col-12 p-md-2">Delivery Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDeliveryDate" type="text" value={this.state.vehicleData.deliver_date} onClick={()=>onInputTextClickHandler("Delivery Date")} readOnly/> 
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vSINumber" className="p-col-12 p-md-2">SI Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vSINumber" type="text" name='si_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDRNumber" className="p-col-12 p-md-2">DR Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDRNumber" type="text" name='dr_no' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDRCodes" className="p-col-12 p-md-2">DR Codes:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDRCodes" type="text" name='dr_codes' onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                </div>
                                        
                            </TabPanel>
                            <TabPanel header="Received Items">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPlateNumDel" className="p-col-12 p-md-2">Plate Number Delivery:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vPlateNumDel"  type="text" value={this.state.vehicleData.plate_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Plate Number Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDecals" className="p-col-12 p-md-2">Decals:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vDecals" type="text" value={this.state.vehicleData.decals_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Decal Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vModified" className="p-col-12 p-md-2">Modified:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vModified" type="text" value={this.state.vehicleData.modified} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Modified Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vEWD" className="p-col-12 p-md-2">Early Warning Device:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vEWD" type="text" value={this.state.vehicleData.ewd_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('EWD Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTools" className="p-col-12 p-md-2">Tools:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vTools" type="text" value={this.state.vehicleData.tools_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Tools Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vUsersManual" className="p-col-12 p-md-2">User's Manual:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vUsersManual" type="text" value={this.state.vehicleData.userManual_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue("User's Manual Delivery Date",e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vWarrantyBook" className="p-col-12 p-md-2">Warranty Book:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vWarrantyBook" type="text" value={this.state.vehicleData.warrantyBook_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Warranty Book Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vUnitKey" className="p-col-12 p-md-2">Unit Key:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vUnitKey" type="text" value={this.state.vehicleData.unitKey_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Unit Key Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyKey" className="p-col-12 p-md-2">Body Key:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vBodyKey" type="text" value={this.state.vehicleData.bodyKey_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Body Key Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCigPlug" className="p-col-12 p-md-2">Cigarette Plug:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vCigPlug" type="text" value={this.state.vehicleData.cigarettePlug_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Cigarette Plug Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vKeyChain" className="p-col-12 p-md-2">Key Chain:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vKeyChain" type="text" value={this.state.vehicleData.keychain_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Key Chain Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vJack" className="p-col-12 p-md-2">Jack:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vJack" type="text" value={this.state.vehicleData.jack_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Jack Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTireWrench" className="p-col-12 p-md-2">Tire Wrench:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vTireWrench" type="text" value={this.state.vehicleData.wrench_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Tire Wrench Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFireExt" className="p-col-12 p-md-2">Fire Extinguisher:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vFireExt" type="text" value={this.state.vehicleData.fire_ext_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Fire Extinguisher Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFan" className="p-col-12 p-md-2">Fan:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vFan" type="text" value={this.state.vehicleData.fan_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Fan Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                   
                                </div>
                                       
                            </TabPanel>
                            
                        </TabView>
                        </div>
                    </Dialog>
                                
                    <Fieldset legend="Search Vehicle" className="p-grid p-dir-col">

                        <div className="p-d-flex p-mb-2" name="searchbox">
                            <InputText placeholder={"Search by " + this.state.filterOption + " No."}  style={{width: '100%'}} onKeyUp={(e) => onSearchBarOnKeyUp(e)} />
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
                 
                </div>
                
                <div className="p-col-12">

                    <Fieldset legend="Vehicle Data" className="p-grid p-dir-col">

                        <div className="p-grid">

                            <div className="p-col-12">
                                <div className="p-grid p-justify-end">
                                    <Button label="Add New" icon="pi pi-plus" className="p-col-1 p-md-2 p-mr-2" onClick={() => onShow("Add")} />
                                    <Button label="Modify" icon="pi pi-pencil" className="p-col-1 p-md-2 p-mr-2" onClick={() => onShow("Modify")} />
                                    <Button label="Remove" icon="pi pi-ban" className="p-col-1 p-md-2 p-mr-2" onClick={() => onShow("Remove")} />
                                </div>
                            </div>

                            <div className="p-col-3">

                                <div class="p-d-flex p-jc-center">
                                    <img src={process.env.PUBLIC_URL+ "/assets/layout/images/samplecar.jpg"} width="250" alt="car"></img>
                                </div>

                            </div>            

                            <div className="p-col-9">
                                <TabView activeIndex={this.state.activeIndexMain} onTabChange={(e) => this.setState({activeIndexMain: e.index})}>
                                    <TabPanel header="Identification" className="btn-block">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dStatus" className="p-col-12 p-md-2">Status:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dStatus" type="text" value = {this.state.vehicleData.status} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dOperational" className="p-col-12 p-md-2">Operational:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dOperational" type="text" value = {this.state.vehicleData.operational} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dBodyNum" className="p-col-12 p-md-2">Body Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dBodyNum" type="text" value={this.state.vehicleData.body_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCSNum" className="p-col-12 p-md-2">CS Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCSNum" type="text" value={this.state.vehicleData.cs_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="vPlateNum" className="p-col-12 p-md-2">Plate Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="vPlateNum" type="text" value={this.state.vehicleData.plate_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="vRemarks" className="p-col-12 p-md-2">Remarks:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="vRemarks" type="text" value={this.state.vehicleData.remarks} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Vehicle Info">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dBrand" className="p-col-12 p-md-2">Brand:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dBrand" type="text" value = {this.state.vehicleData.brand} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dYear" className="p-col-12 p-md-2">Year:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dYear" type="text" value = {this.state.vehicleData.release_year} readOnly/>    
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dMake" className="p-col-12 p-md-2">Make:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dMake" type="text" value = {this.state.vehicleData.make} readOnly/>    
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dSeries" className="p-col-12 p-md-2">Series:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dSeries" type="text" value = {this.state.vehicleData.series} readOnly/>    
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dBodyType" className="p-col-12 p-md-2">Body Type:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dBodyType" type="text" value = {this.state.vehicleData.body_type} readOnly/>    
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dColor" className="p-col-12 p-md-2">Color:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dColor" type="text" value = {this.state.vehicleData.color} readOnly/>    
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Suppliers">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dDealer" className="p-col-12 p-md-2">Dealer:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dDealer" type="text" value = {this.state.vehicleData.dealer} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dPONumber" className="p-col-12 p-md-2">PO Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dPONumber" type="text" value = {this.state.vehicleData.po_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dPODate" className="p-col-12 p-md-2">PO Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dPODate" type="text" value = {this.state.vehicleData.po_date} readOnly/> 
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dBodyBuilder" className="p-col-12 p-md-2">Body Builder:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dBodyBuilder" type="text" value = {this.state.vehicleData.body_builder} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dFabricator" className="p-col-12 p-md-2">Fabricator:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dFabricator" type="text" value = {this.state.vehicleData.fabricator} readOnly/>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </TabPanel>
                                    <TabPanel header="Engine and Body Info">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dChassisN" className="p-col-12 p-md-2">Chassis Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dChassisN" type="text" value = {this.state.vehicleData.vin_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dEngineN" className="p-col-12 p-md-2">Engine Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dEngineN" type="text" value = {this.state.vehicleData.engine_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dBatteryN" className="p-col-12 p-md-2">Battery Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dBatteryN" type="text" value = {this.state.vehicleData.battery_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dFuelType" className="p-col-12 p-md-2">Fuel Type:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dFuelType" type="text" value = {this.state.vehicleData.fuel_type} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTransmission" className="p-col-12 p-md-2">Transmission:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTransmission" type="text" value = {this.state.vehicleData.transmission} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dDenomination" className="p-col-12 p-md-2">Denomination:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dDenomination" type="text" value = {this.state.vehicleData.denomination} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dPistonD" className="p-col-12 p-md-2">Piston Displacement:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dPistonD" type="text" value = {this.state.vehicleData.piston} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dNumCylinders" className="p-col-12 p-md-2">Number of Cylinders:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dNumCylinders" type="text" value = {this.state.vehicleData.cylinder} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dProcEntity" className="p-col-12 p-md-2">Procuring Entity:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dProcEntity" type="text" value = {this.state.vehicleData.procuring_entity} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCapacity" className="p-col-12 p-md-2">Capacity:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCapacity" type="text" value = {this.state.vehicleData.capacity} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dGrossW" className="p-col-12 p-md-2">Gross Weight:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dGrossW" type="text" value = {this.state.vehicleData.gross_weight} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dNetW" className="p-col-12 p-md-2">Net Weight:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dNetW" type="text" value = {this.state.vehicleData.net_weight} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dShippingW" className="p-col-12 p-md-2">Shipping Weight:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dShippingW" type="text" value = {this.state.vehicleData.shipping_weight} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dNetCapacity" className="p-col-12 p-md-2">Net Capacity:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dNetCapacity" type="text" value = {this.state.vehicleData.net_capacity} readOnly/>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="LTO">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dLTOCR" className="p-col-12 p-md-2">LTO CR:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dLTOCR" type="text" value = {this.state.vehicleData.lto_cr} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dLTOCRDate" className="p-col-12 p-md-2">LTO CR Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dLTOCRDate" type="text" value={this.state.vehicleData.cr_date} readOnly/> 
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dORNumber" className="p-col-12 p-md-2">OR Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dORNumber" type="text" value = {this.state.vehicleData.or_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dORDate" className="p-col-12 p-md-2">OR Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dORDate" type="text" value={this.state.vehicleData.or_date} readOnly/> 
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTopLoadReg" className="p-col-12 p-md-2">TopLoadReg:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTopLoadReg" type="text" value = {this.state.vehicleData.top_load} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dFieldOfc" className="p-col-12 p-md-2">Field office:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dFieldOfc" type="text" value = {this.state.vehicleData.field_office} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dORCRCopy" className="p-col-12 p-md-2">ORCR Copy:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dORCRCopy" type="text" value={this.state.vehicleData.or_cr} readOnly/> 
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Location">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dPermanentLoc" className="p-col-12 p-md-2">Permanent:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dPermanentLoc" type="text" value = {this.state.vehicleData.permanent_loc} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCurrentLoc" className="p-col-12 p-md-2">Current:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCurrentLoc" type="text" value = {this.state.vehicleData.current_loc} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dVTF" className="p-col-12 p-md-2">With VTF?:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dVTF" type="text" value={this.state.vehicleData.vtf} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dPLStatus" className="p-col-12 p-md-2">Permanent?:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dPLStatus" type="text" value={this.state.vehicleData.permanent_status} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Delivery Info">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dDeliveryLoc" className="p-col-12 p-md-2">Delivery Location:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dDeliveryLoc" type="text" value = {this.state.vehicleData.delivery_location} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dDeliveryDate" className="p-col-12 p-md-2">Delivery Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dDeliveryDate" type="text" value={this.state.vehicleData.deliver_date} readOnly/> 
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dSINumber" className="p-col-12 p-md-2">SI Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dSINumber" value = {this.state.vehicleData.si_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dDRNumber" className="p-col-12 p-md-2">DR Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dDRNumber" type="text" value = {this.state.vehicleData.dr_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dDRCodes" className="p-col-12 p-md-2">DR Codes:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dDRCodes" type="text" value = {this.state.vehicleData.dr_codes} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Received Items">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dPlateNumDel" className="p-col-12 p-md-2">Plate Number Delivery:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dPlateNumDel"  type="text" value={this.state.vehicleData.plate_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dDecals" className="p-col-12 p-md-2">Decals:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dDecals" type="text" value={this.state.vehicleData.decals_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dModified" className="p-col-12 p-md-2">Modified:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dModified" type="text" value={this.state.vehicleData.modified} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dEWD" className="p-col-12 p-md-2">Early Warning Device:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dEWD" type="text" value={this.state.vehicleData.ewd_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTools" className="p-col-12 p-md-2">Tools:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTools" type="text" value={this.state.vehicleData.tools_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dUsersManual" className="p-col-12 p-md-2">User's Manual:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dUsersManual" type="text" value={this.state.vehicleData.userManual_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dWarrantyBook" className="p-col-12 p-md-2">Warranty Book:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dWarrantyBook" type="text" value={this.state.vehicleData.warrantyBook_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dUnitKey" className="p-col-12 p-md-2">Unit Key:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="dUnitKey" type="text" value={this.state.vehicleData.unitKey_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="BodyKey" className="p-col-12 p-md-2">Body Key:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="BodyKey" type="text" value={this.state.vehicleData.bodyKey_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCigPlug" className="p-col-12 p-md-2">Cigarette Plug:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCigPlug" type="text" value={this.state.vehicleData.cigarettePlug_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dKeyChain" className="p-col-12 p-md-2">Key Chain:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dKeyChain" type="text" value={this.state.vehicleData.keychain_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dJack" className="p-col-12 p-md-2">Jack:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dJack" type="text" value={this.state.vehicleData.jack_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTireWrench" className="p-col-12 p-md-2">Tire Wrench:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTireWrench" type="text" value={this.state.vehicleData.wrench_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dFireExt" className="p-col-12 p-md-2">Fire Extinguisher:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dFireExt" type="text" value={this.state.vehicleData.fire_ext_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dFan" className="p-col-12 p-md-2">Fan:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dFan" type="text" value={this.state.vehicleData.fan_date} readOnly/>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Bidding/Contract">
                                        <DataTable value={this.biddinglist} className="p-datatable-gridlines">
                                            <Column field="label"></Column>
                                            <Column field="value"></Column> 
                                        </DataTable>
                                    </TabPanel>
                                    <TabPanel header="TPL">
                                        <DataTable value={this.tpllist} className="p-datatable-gridlines">
                                            <Column field="label"></Column>
                                            <Column field="value"></Column>
                                        </DataTable>
                                    </TabPanel>
                                    <TabPanel header="Insurance">
                                        <DataTable value={this.insurancelist} className="p-datatable-gridlines">
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