import React, {Component, createRef} from 'react';
import { TabView,TabPanel } from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {InputText} from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';

import {Button} from 'primereact/button';
import {Fieldset} from 'primereact/fieldset';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputMask} from 'primereact/inputmask';
import {Calendar} from 'primereact/calendar';
import {SelectButton} from 'primereact/selectbutton';
import {Toast} from 'primereact/toast'
import { ListBox } from 'primereact/listbox';

//import './TabViewDemo.css';
import axios from "axios";
import { isThisISOWeek } from 'date-fns';


export class Vehicles extends Component {



    constructor() {
        super();

        this.state = {

            //vehicle data object
            vehicleData : {
                car_id : 0, slug : '', vin_no : '', body_no : '', cs_no : '', plate_no : '', brand : '', release_year : 2020, make : '', series : '', 
                body_type : '', color : '', dealer : '', dealer_phone : '', dealer_email : '', po_no : '', po_date : '', body_builder : '', fabricator : '',
                sale_price : 0, vat_price : 0, engine_no : '', battery_no : '', fuel_type : '', transmission : '', denomination : '', piston : 0, cylinder : 0,
                procuring_entity : '', capacity : 0, gross_weight : 0, net_weight : 0, shipping_weight : 0, net_capacity : 0, lto_cr : 0, cr_date : '', or_no : 0,
                or_date : '', top_load : '', field_office : '', or_cr : '', permanent_loc : '', current_loc : '', vtf : '', permanent_status : '', delivery_location : '',
                deliver_date : '', si_no : 0, dr_no : '', dr_codes : '', plate_date : '', decals_date : '', modified : '', ewd_date : '', tools_date : '',
                userManual_date : '', warrantyBook_date : '', unitKey_date : '', bodyKey_date : '', cigarettePlug_date : '', keychain_date : '', fan_date : '',
                remarks : '', operational : '', status : '', date_updated : '', date_created : '', fire_extinguisher:'',jack: '', wrench: '', c_client_name: '',
                c_contract_no: '', c_start_date: '', c_end_date: '', c_bid_no: '', c_bid_name: '', c_bid_date: '', c_cost: 0, t_insurance_name: '', t_telephone_no: '',
                t_email: '', t_po_no: '', t_date_issued: '', t_start_date: '', t_end_date: '', t_cost: 0, i1_insurance_company: '', i1_telephone_no: '', i1_email: '',
                i1_po_no: '', i1_date_issued: '', i1_start_date: '', i1_end_date: '', i1_cost: 0, i2_insurance_company: '', i2_telephone_no: '', i2_email: '',
                i2_po_no: '', i2_date_issued: '', i2_start_date: '', i2_end_date: '', i2_cost: 0,
            },

            //vehicle data object for CRUD
            newvehicleData : {
                car_id : 0, slug : '', vin_no : '', body_no : '', cs_no : '', plate_no : '', brand : '', release_year :2020, make : '', series : '', 
                body_type : '', color : '', dealer : '', dealer_phone : '', dealer_email : '', po_no : '', po_date : '', body_builder : '', fabricator : '',
                sale_price : 0, vat_price : 0, engine_no : '', battery_no : '', fuel_type : '', transmission : '', denomination : '', piston : 0, cylinder : 0,
                procuring_entity : '', capacity : 0, gross_weight : 0, net_weight : 0, shipping_weight : 0, net_capacity : 0, lto_cr : 0, cr_date : '', or_no : 0,
                or_date : '', top_load : '', field_office : '', or_cr : '', permanent_loc : '', current_loc : '', vtf : '', permanent_status : '', delivery_location : '',
                deliver_date : '', si_no : 0, dr_no : '', dr_codes : '', plate_date : '', decals_date : '', modified : '', ewd_date : '', tools_date : '',
                userManual_date : '', warrantyBook_date : '', unitKey_date : '', bodyKey_date : '', cigarettePlug_date : '', keychain_date : '', fan_date : '',
                remarks : '', operational : '', status : '', date_updated : '', date_created : '', fire_extinguisher:'',jack: '', wrench: '', c_client_name: '',
                c_contract_no: '', c_start_date: '', c_end_date: '', c_bid_no: '', c_bid_name: '', c_bid_date: '', c_cost: 0, t_insurance_name: '', t_telephone_no: '',
                t_email: '', t_po_no: '', t_date_issued: '', t_start_date: '', t_end_date: '', t_cost: 0, i1_insurance_company: '', i1_telephone_no: '', i1_email: '',
                i1_po_no: '', i1_date_issued: '', i1_start_date: '', i1_end_date: '', i1_cost: 0, i2_insurance_company: '', i2_telephone_no: '', i2_email: '',
                i2_po_no: '', i2_date_issued: '', i2_start_date: '', i2_end_date: '', i2_cost: 0,
            },

            //vehicle data object for no values
            emptyvehicleData : {
                car_id : 0, slug : '', vin_no : '', body_no : '', cs_no : '', plate_no : '', brand : '', release_year : 2020, make : '', series : '', 
                body_type : '', color : '', dealer : '', dealer_phone : '', dealer_email : '', po_no : '', po_date : '', body_builder : '', fabricator : '',
                sale_price : 0, vat_price : 0, engine_no : '', battery_no : '', fuel_type : '', transmission : '', denomination : '', piston : 0, cylinder : 0,
                procuring_entity : '', capacity : 0, gross_weight : 0, net_weight : 0, shipping_weight : 0, net_capacity : 0, lto_cr : 0, cr_date : '', or_no : 0,
                or_date : '', top_load : '', field_office : '', or_cr : '', permanent_loc : '', current_loc : '', vtf : '', permanent_status : '', delivery_location : '',
                deliver_date : '', si_no : 0, dr_no : '', dr_codes : '', plate_date : '', decals_date : '', modified : '', ewd_date : '', tools_date : '',
                userManual_date : '', warrantyBook_date : '', unitKey_date : '', bodyKey_date : '', cigarettePlug_date : '', keychain_date : '', fan_date : '',
                remarks : '', operational : '', status : '', date_updated : '', date_created : '', fire_extinguisher:'',jack: '', wrench: '', c_client_name: '',
                c_contract_no: '', c_start_date: '', c_end_date: '', c_bid_no: '', c_bid_name: '', c_bid_date: '', c_cost: 0, t_insurance_name: '', t_telephone_no: '',
                t_email: '', t_po_no: '', t_date_issued: '', t_start_date: '', t_end_date: '', t_cost: 0, i1_insurance_company: '', i1_telephone_no: '', i1_email: '',
                i1_po_no: '', i1_date_issued: '', i1_start_date: '', i1_end_date: '', i1_cost: 0, i2_insurance_company: '', i2_telephone_no: '', i2_email: '',
                i2_po_no: '', i2_date_issued: '', i2_start_date: '', i2_end_date: '', i2_cost: 0,
            },

            APIvehicleData : {
                car_id : 0, slug : '', vin_no : '', body_no : '', cs_no : '', plate_no : '', brand : '', release_year :2020, make : '', series : '', 
                body_type : '', color : '', dealer : '', dealer_phone : '', dealer_email : '', po_no : '', po_date : '', body_builder : '', fabricator : '',
                sale_price : 0, vat_price : 0, engine_no : '', battery_no : '', fuel_type : '', transmission : '', denomination : '', piston : 0, cylinder : 0,
                procuring_entity : '', capacity : 0, gross_weight : 0, net_weight : 0, shipping_weight : 0, net_capacity : 0, lto_cr : 0, cr_date : '', or_no : 0,
                or_date : '', top_load : '', field_office : '', or_cr : '', permanent_loc : '', current_loc : '', vtf : '', permanent_status : '', delivery_location : '',
                deliver_date : '', si_no : 0, dr_no : '', dr_codes : '', plate_date : '', decals_date : '', modified : '', ewd_date : '', tools_date : '',
                userManual_date : '', warrantyBook_date : '', unitKey_date : '', bodyKey_date : '', cigarettePlug_date : '', keychain_date : '', fan_date : '',
                remarks : '', operational : '', status : '', date_updated : '', date_created : '', fire_extinguisher:'',jack: '', wrench: '', c_client_name: '',
                c_contract_no: '', c_start_date: '', c_end_date: '', c_bid_no: '', c_bid_name: '', c_bid_date: '', c_cost: 0, t_insurance_name: '', t_telephone_no: '',
                t_email: '', t_po_no: '', t_date_issued: '', t_start_date: '', t_end_date: '', t_cost: 0, i1_insurance_company: '', i1_telephone_no: '', i1_email: '',
                i1_po_no: '', i1_date_issued: '', i1_start_date: '', i1_end_date: '', i1_cost: 0, i2_insurance_company: '', i2_telephone_no: '', i2_email: '',
                i2_po_no: '', i2_date_issued: '', i2_start_date: '', i2_end_date: '', i2_cost: 0,
            },

            

            //filter option for search

            filterOption:'VIN', //possible values: VIN, BDN or PLN
            vmModalMode: 'Add', //possible values: Add, Modify, Remove
            vmVisibility: false, //modal form visibility
            vdModalMode: '',
            vdVisibility: false,
            ddVisibility : false,

            vBrandSelected: 'Mitsubishi', //test data only

            selectedRowVal:[],

            todoList: {},
            todoList_tpl: {},
            todoList_contract : {},
            todoList_insurance1 : {},
            todoList_insurance2: {},

            layout: 'list',

            activeIndexMain: 0,
            activeIndexModal: 0,

            carValues: null,

            sampleValue: '',
            

        };


        this.toast = createRef(null)

        this.radioChange = this.radioChange.bind(this);

    }

    componentDidMount() {

      }

     

    refreshList = () => {
        axios
          .get("http://127.0.0.1:8000/api/careta/?search=")
          .then(res => this.setState({ vehicleData: res.data[0] },this.logTest))
          .catch(err => console.log(err));
      };

    logTest = () =>{
        console.log(this.state.vehicleData);
        //this.forceUpdate();

    }


    // search option function
    radioChange(e) {
        this.setState({
            filterOption: e.currentTarget.value
        });
      }

    //ADD VEHICLE ALGORITHM
    addVehicle = () => {
        const data = {
            slug: this.state.APIvehicleData.slug,
            vin_no: this.state.APIvehicleData.vin_no,
            body_no: this.state.APIvehicleData.body_no,
            cs_no: this.state.APIvehicleData.cs_no,
            plate_no: this.state.APIvehicleData.plate_no,
            brand: this.state.APIvehicleData.brand,
            release_year: this.state.APIvehicleData.release_year,
            make: this.state.APIvehicleData.make,
            series: this.state.APIvehicleData.series,
            body_type: this.state.APIvehicleData.body_type,
            color: this.state.APIvehicleData.color,
            dealer: this.state.APIvehicleData.dealer,
            dealer_phone: this.state.APIvehicleData.dealer_phone,
            dealer_email: this.state.APIvehicleData.dealer_email,
            po_no: this.state.APIvehicleData.po_no,
            po_date: this.state.APIvehicleData.po_date,
            body_builder: this.state.APIvehicleData.body_builder,
            fabricator: this.state.APIvehicleData.fabricator,
            engine_no: this.state.APIvehicleData.engine_no,
            battery_no: this.state.APIvehicleData.battery_no,
            fuel_type: this.state.APIvehicleData.fuel_type,
            transmission: this.state.APIvehicleData.transmission,
            denomination: this.state.APIvehicleData.denomination,
            piston: this.state.APIvehicleData.piston,
            cylinder: this.state.APIvehicleData.cylinder,
            procuring_entity: this.state.APIvehicleData.procuring_entity,
            capacity: this.state.APIvehicleData.capacity,
            gross_weight: this.state.APIvehicleData.gross_weight,
            net_weight: this.state.APIvehicleData.net_weight,
            shipping_weight: this.state.APIvehicleData.shipping_weight,
            net_capacity: this.state.APIvehicleData.net_capacity,
            lto_cr: this.state.APIvehicleData.lto_cr,
            cr_date: this.state.APIvehicleData.cr_date,
            or_no: this.state.APIvehicleData.or_no,
            or_date: this.state.APIvehicleData.or_date,
            top_load: this.state.APIvehicleData.top_load,
            field_office: this.state.APIvehicleData.field_office,
            or_cr: this.state.APIvehicleData.or_cr,
            permanent_loc: this.state.APIvehicleData.permanent_loc,
            current_loc: this.state.APIvehicleData.current_loc,
            vtf: this.state.APIvehicleData.vtf,
            permanent_status: this.state.APIvehicleData.permanent_status,
            delivery_location: this.state.APIvehicleData.delivery_location,
            deliver_date: this.state.APIvehicleData.deliver_date,
            si_no: this.state.APIvehicleData.si_no,
            dr_no: this.state.APIvehicleData.dr_no,
            dr_codes: this.state.APIvehicleData.dr_codes,
            plate_date: this.state.APIvehicleData.plate_date,
            decals_date: this.state.APIvehicleData.decals_date,
            modified: this.state.APIvehicleData.modified,
            ewd_date: this.state.APIvehicleData.ewd_date,
            tools_date: this.state.APIvehicleData.tools_date,
            userManual_date: this.state.APIvehicleData.userManual_date,
            warrantyBook_date: this.state.APIvehicleData.warrantyBook_date,
            unitKey_date: this.state.APIvehicleData.unitKey_date,
            bodyKey_date: this.state.APIvehicleData.bodyKey_date,
            cigarettePlug_date: this.state.APIvehicleData.cigarettePlug_date,
            keychain_date: this.state.APIvehicleData.keychain_date,
            fan_date: this.state.APIvehicleData.fan_date,
            jack: this.state.APIvehicleData.jack,
            wrench: this.state.APIvehicleData.wrench,
            fire_extinguisher: this.state.APIvehicleData.fire_extinguisher,
            remarks: this.state.APIvehicleData.remarks,
            operational: this.state.APIvehicleData.operational,
            status: this.state.APIvehicleData.status,
        };
        axios
                .post("http://localhost:8000/api/careta/",data)
                .then(res => this.setState({ todoList: res.data },this.addTPL))
                .catch(this.showErrorSave);
    }

    addTPL = () =>{
        const data_tpl ={
            slug : this.state.todoList.car_id,
            insurance_name: this.state.APIvehicleData.t_insurance_name,
            telephone:this.state.APIvehicleData.t_telephone_no,
            email:this.state.APIvehicleData.t_email,
            po_no: this.state.APIvehicleData.po_no,
            date_issued: this.state.APIvehicleData.t_date_issued,
            start_date: this.state.APIvehicleData.t_start_date,
            end_date: this.state.APIvehicleData.t_end_date,
            cost: this.state.APIvehicleData.t_cost,
            car: this.state.todoList.car_id,

        }
        axios
                .post("http://localhost:8000/api/careta-tpl/",data_tpl)
                .then(res => this.setState({ todoList_tpl: res.data },this.addContract))
                .catch(err => console.log(err));

    }

    addContract = () => {
        const data_contract ={
            slug : this.state.todoList.car_id,
            client_name: this.state.APIvehicleData.c_client_name,
            contract_no:this.state.APIvehicleData.c_contract_no,
            start_date:this.state.APIvehicleData.c_start_date,
            end_date: this.state.APIvehicleData.c_end_date,
            bid_no: this.state.APIvehicleData.c_bid_no,
            bid_name: this.state.APIvehicleData.c_bid_name,
            bid_date: this.state.APIvehicleData.c_bid_date,
            cost: this.state.APIvehicleData.c_cost,
            car: this.state.todoList.car_id,

        }
        axios
                .post("http://localhost:8000/api/careta-contract/",data_contract)
                .then(res => this.setState({ todoList_contract: res.data },this.addInsurance1))
                .catch(err => console.log(err));
    }

    addInsurance1 = () => {
        const data_insurance1 ={
            slug : this.state.todoList.car_id + "-1",
            company: this.state.APIvehicleData.i1_insurance_company,
            telephone:this.state.APIvehicleData.i1_telephone_no,
            email:this.state.APIvehicleData.i1_email,
            po_no: this.state.APIvehicleData.i1_po_no,
            date_issued: this.state.APIvehicleData.i1_date_issued,
            start_date: this.state.APIvehicleData.i1_start_date,
            end_date: this.state.APIvehicleData.i1_end_date,
            cost: this.state.APIvehicleData.i1_cost,
            insurance_no: 1,
            car: this.state.todoList.car_id,
        }
        axios
                .post("http://localhost:8000/api/careta-insurance/",data_insurance1)
                .then(res => this.setState({ todoList_insurance1: res.data },this.addInsurance2))
                .catch(err => console.log(err));
    }

    addInsurance2 = () => {
        const data_insurance2 ={
            slug : this.state.todoList.car_id + "-2",
            company: this.state.APIvehicleData.i2_insurance_company,
            telephone:this.state.APIvehicleData.i2_telephone_no,
            email:this.state.APIvehicleData.i2_email,
            po_no: this.state.APIvehicleData.i2_po_no,
            date_issued: this.state.APIvehicleData.i2_date_issued,
            start_date: this.state.APIvehicleData.i2_start_date,
            end_date: this.state.APIvehicleData.i2_end_date,
            cost: this.state.APIvehicleData.i2_cost,
            insurance_no: 2,
            car: this.state.todoList.car_id,
        }
        axios
                .post("http://localhost:8000/api/careta-insurance/",data_insurance2)
                .then(res => this.setState({ todoList_insurance2: res.data }))
                .catch(err => console.log(err));
    }

    //MODIFY VEHICLE INFO ALGORITHM
    editVehicle = () => {
        const data = {
            slug: this.state.APIvehicleData.slug,
            vin_no: this.state.APIvehicleData.vin_no,
            body_no: this.state.APIvehicleData.body_no,
            cs_no: this.state.APIvehicleData.cs_no,
            plate_no: this.state.APIvehicleData.plate_no,
            brand: this.state.APIvehicleData.brand,
            release_year: this.state.APIvehicleData.release_year,
            make: this.state.APIvehicleData.make,
            series: this.state.APIvehicleData.series,
            body_type: this.state.APIvehicleData.body_type,
            color: this.state.APIvehicleData.color,
            dealer: this.state.APIvehicleData.dealer,
            dealer_phone: this.state.APIvehicleData.dealer_phone,
            dealer_email: this.state.APIvehicleData.dealer_email,
            po_no: this.state.APIvehicleData.po_no,
            po_date: this.state.APIvehicleData.po_date,
            body_builder: this.state.APIvehicleData.body_builder,
            fabricator: this.state.APIvehicleData.fabricator,
            engine_no: this.state.APIvehicleData.engine_no,
            battery_no: this.state.APIvehicleData.battery_no,
            fuel_type: this.state.APIvehicleData.fuel_type,
            transmission: this.state.APIvehicleData.transmission,
            denomination: this.state.APIvehicleData.denomination,
            piston: this.state.APIvehicleData.piston,
            cylinder: this.state.APIvehicleData.cylinder,
            procuring_entity: this.state.APIvehicleData.procuring_entity,
            capacity: this.state.APIvehicleData.capacity,
            gross_weight: this.state.APIvehicleData.gross_weight,
            net_weight: this.state.APIvehicleData.net_weight,
            shipping_weight: this.state.APIvehicleData.shipping_weight,
            net_capacity: this.state.APIvehicleData.net_capacity,
            lto_cr: this.state.APIvehicleData.lto_cr,
            cr_date: this.state.APIvehicleData.cr_date,
            or_no: this.state.APIvehicleData.or_no,
            or_date: this.state.APIvehicleData.or_date,
            top_load: this.state.APIvehicleData.top_load,
            field_office: this.state.APIvehicleData.field_office,
            or_cr: this.state.APIvehicleData.or_cr,
            permanent_loc: this.state.APIvehicleData.permanent_loc,
            current_loc: this.state.APIvehicleData.current_loc,
            vtf: this.state.APIvehicleData.vtf,
            permanent_status: this.state.APIvehicleData.permanent_status,
            delivery_location: this.state.APIvehicleData.delivery_location,
            deliver_date: this.state.APIvehicleData.deliver_date,
            si_no: this.state.APIvehicleData.si_no,
            dr_no: this.state.APIvehicleData.dr_no,
            dr_codes: this.state.APIvehicleData.dr_codes,
            plate_date: this.state.APIvehicleData.plate_date,
            decals_date: this.state.APIvehicleData.decals_date,
            modified: this.state.APIvehicleData.modified,
            ewd_date: this.state.APIvehicleData.ewd_date,
            tools_date: this.state.APIvehicleData.tools_date,
            userManual_date: this.state.APIvehicleData.userManual_date,
            warrantyBook_date: this.state.APIvehicleData.warrantyBook_date,
            unitKey_date: this.state.APIvehicleData.unitKey_date,
            bodyKey_date: this.state.APIvehicleData.bodyKey_date,
            cigarettePlug_date: this.state.APIvehicleData.cigarettePlug_date,
            keychain_date: this.state.APIvehicleData.keychain_date,
            fan_date: this.state.APIvehicleData.fan_date,
            jack: this.state.APIvehicleData.jack,
            wrench: this.state.APIvehicleData.wrench,
            fire_extinguisher: this.state.APIvehicleData.fire_extinguisher,
            remarks: this.state.APIvehicleData.remarks,
            operational: this.state.APIvehicleData.operational,
            status: this.state.APIvehicleData.status,
        };
        axios
                .put("http://localhost:8000/api/careta/" + this.state.newvehicleData.slug+"/",data)
                .then(res => this.setState({ todoList: res.data },this.editTPL))
                .catch(this.showErrorSave);

    }

    editTPL = () =>{
        const data_tpl ={
            slug : this.state.APIvehicleData.car_id,
            insurance_name: this.state.APIvehicleData.t_insurance_name,
            telephone:this.state.APIvehicleData.t_telephone_no,
            email:this.state.APIvehicleData.t_email,
            po_no: this.state.APIvehicleData.t_po_no,
            date_issued: this.state.APIvehicleData.t_date_issued,
            start_date: this.state.APIvehicleData.t_start_date,
            end_date: this.state.APIvehicleData.t_end_date,
            cost: this.state.APIvehicleData.t_cost,
            car: this.state.todoList.car_id,

        }
        axios
                .put("http://localhost:8000/api/careta-tpl/" + this.state.newvehicleData.car_id+"/",data_tpl)
                .then(res => this.setState({ todoList_tpl: res.data },this.editContract))
                .catch(this.showErrorSave);

    }

    editContract = () => {
        const data_contract ={
            slug : this.state.APIvehicleData.car_id,
            client_name: this.state.APIvehicleData.c_client_name,
            contract_no:this.state.APIvehicleData.c_contract_no,
            start_date:this.state.APIvehicleData.c_start_date,
            end_date: this.state.APIvehicleData.c_end_date,
            bid_no: this.state.APIvehicleData.c_bid_no,
            bid_name: this.state.APIvehicleData.c_bid_name,
            bid_date: this.state.APIvehicleData.c_bid_date,
            cost: this.state.APIvehicleData.c_cost,
            car: this.state.todoList.car_id,

        }
        axios
                .put("http://localhost:8000/api/careta-contract/"+this.state.newvehicleData.car_id + "/",data_contract)
                .then(res => this.setState({ todoList_contract: res.data },this.editInsurance1))
                .catch(this.showErrorSave);
    }

    editInsurance1 = () => {
        const data_insurance1 ={
            slug : this.state.APIvehicleData.car_id + "-1",
            company: this.state.APIvehicleData.i1_insurance_company,
            telephone:this.state.APIvehicleData.i1_telephone_no,
            email:this.state.APIvehicleData.i1_email,
            po_no: this.state.APIvehicleData.i1_po_no,
            date_issued: this.state.APIvehicleData.i1_date_issued,
            start_date: this.state.APIvehicleData.i1_start_date,
            end_date: this.state.APIvehicleData.i1_end_date,
            cost: this.state.APIvehicleData.i1_cost,
            insurance_no: 1,
            car: this.state.todoList.car_id,
        }
        axios
                .put("http://localhost:8000/api/careta-insurance/" + this.state.newvehicleData.car_id +"-1/",data_insurance1)
                .then(res => this.setState({ todoList_insurance1: res.data },this.editInsurance2))
                .catch(this.showErrorSave);
    }

    editInsurance2 = () => {
        const data_insurance2 ={
            slug : this.state.APIvehicleData.car_id + "-2",
            company: this.state.APIvehicleData.i2_insurance_company,
            telephone:this.state.APIvehicleData.i2_telephone_no,
            email:this.state.APIvehicleData.i2_email,
            po_no: this.state.APIvehicleData.i2_po_no,
            date_issued: this.state.APIvehicleData.i2_date_issued,
            start_date: this.state.APIvehicleData.i2_start_date,
            end_date: this.state.APIvehicleData.i2_end_date,
            cost: this.state.APIvehicleData.i2_cost,
            insurance_no: 2,
            car: this.state.todoList.car_id,
        }
        axios
                .put("http://localhost:8000/api/careta-insurance/" + this.state.newvehicleData.car_id +"-2/",data_insurance2)
                .then(res => this.setState({ todoList_insurance2: res.data }))
                .catch(this.showErrorSave);
    }

    modifyCarDB = (mode) => {
        
        var vBrand = this.state.newvehicleData.brand === "Mitsubishi" ? "M"
            : this.state.newvehicleData.brand === "Suzuki" ? "S" : "F";
        var vDealer = this.state.newvehicleData.dealer === "Diamond Motor Corporation" ? "DM"
            : this.state.newvehicleData.dealer === "Grand Canyon Multi Holdings, INC." ? "GC"
            : this.state.newvehicleData.dealer === "Cebu Autocentrale Corporation" ? "CAC": "CA";
        var vFuelType = this.state.newvehicleData.fuel_type === "Diesel" ? "D" : "G";
        var vTransmissionType = this.state.newvehicleData.transmission === "Automatic" ? "A" : "M";
        var vTopLoading = this.state.newvehicleData.top_load ==="Yes" ? true : false;
        var vVTF = this.state.newvehicleData.vtf ==="Yes" ? true : false;
        var vPermanentStatus = this.state.newvehicleData.permanent_status ==="Yes" ? true : false;
        var vModified = this.state.newvehicleData.modified ==="Yes" ? true : false;
        var vOperational = this.state.newvehicleData.operational ==="Yes" ? true : false;
        var vStatus = this.state.newvehicleData.status ==="Active" ? "A" : this.state.newvehicleData.status ==="Maintenance" ? "M" : "R";
        var vPlateNumberDelivery = this.state.newvehicleData.plate_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.plate_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.plate_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.plate_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.plate_date;
        var vDecals = this.state.newvehicleData.decals_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.decals_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.decals_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.decals_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.decals_date;
        var vEWDDate = this.state.newvehicleData.ewd_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.ewd_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.ewd_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.ewd_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.ewd_date;
        var vTools = this.state.newvehicleData.tools_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.tools_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.tools_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.tools_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.tools_date;
        var vUserManual = this.state.newvehicleData.userManual_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.userManual_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.userManual_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.userManual_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.userManual_date;
        var vWarrantyBook = this.state.newvehicleData.warrantyBook_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.warrantyBook_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.warrantyBook_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.warrantyBook_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.warrantyBook_date;
        var vUnitKey = this.state.newvehicleData.unitKey_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.unitKey_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.unitKey_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.unitKey_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.unitKey_date;
        var vBodyKey = this.state.newvehicleData.bodyKey_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.bodyKey_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.bodyKey_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.bodyKey_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.bodyKey_date;
        var vCigarettePlug = this.state.newvehicleData.cigarettePlug_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.cigarettePlug_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.cigarettePlug_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.cigarettePlug_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.cigarettePlug_date;
        var vKeyChain = this.state.newvehicleData.keychain_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.keychain_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.keychain_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.keychain_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.keychain_date;
        var vJack = this.state.newvehicleData.jack === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.jack === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.jack ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.jack ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.jack;
        var vWrench = this.state.newvehicleData.wrench === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.wrench === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.wrench ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.wrench ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.wrench;
        var vFireExtinguisher = this.state.newvehicleData.fire_extinguisher === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.fire_extinguisher === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.fire_extinguisher ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.fire_extinguisher ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.fire_extinguisher;
        var vFan = this.state.newvehicleData.fan_date === 'No Recieving Copy' ? 'NRC'
            : this.state.newvehicleData.fan_date === 'Not Yet Released' ? 'NYR'
            : this.state.newvehicleData.fan_date ===  'Not Applicable'? 'NA'
            : this.state.newvehicleData.fan_date ===  'Did Not Recieve'? 'DNR'
            : this.state.newvehicleData.fan_date;

        console.log(vBrand);

        //apply
        this.setState({
            APIvehicleData: {
                car_id : this.state.newvehicleData.car_id,
                slug: this.state.newvehicleData.vin_no,
                vin_no : this.state.newvehicleData.vin_no,
                body_no : this.state.newvehicleData.body_no,
                brand: vBrand,
                dealer: vDealer,
                fuel_type: vFuelType,
                transmission: vTransmissionType,
                top_load: vTopLoading,
                vtf: vVTF,
                permanent_status: vPermanentStatus,
                modified: vModified,
                operational: vOperational,
                status: vStatus,
                plate_date : vPlateNumberDelivery,
                decals_date : vDecals,
                ewd_date : vEWDDate,
                tools_date : vTools,
                userManual_date : vUserManual,
                warrantyBook_date: vWarrantyBook,
                unitKey_date : vUnitKey,
                bodyKey_date : vBodyKey,
                cigarettePlug_date : vCigarettePlug,
                keychain_date : vKeyChain,
                jack : vJack,
                wrench : vWrench,
                fire_extinguisher: vFireExtinguisher,
                fan_date: vFan,
                date_created: vPlateNumberDelivery,
                date_updated: vPlateNumberDelivery,
                cs_no : this.state.newvehicleData.cs_no, plate_no : this.state.newvehicleData.plate_no, release_year :this.state.newvehicleData.release_year, 
                make : this.state.newvehicleData.make, series : this.state.newvehicleData.series, 
                body_type : this.state.newvehicleData.body_type, color : this.state.newvehicleData.color, dealer_phone : this.state.newvehicleData.dealer_phone, 
                dealer_email : this.state.newvehicleData.dealer_email, po_no : this.state.newvehicleData.po_no, po_date : this.state.newvehicleData.po_date, 
                body_builder : this.state.newvehicleData.body_builder, fabricator : this.state.newvehicleData.fabricator,
                sale_price : this.state.newvehicleData.sale_price, vat_price : this.state.newvehicleData.vat_price, engine_no : this.state.newvehicleData.engine_no, 
                battery_no : this.state.newvehicleData.battery_no, denomination : this.state.newvehicleData.denomination, piston : this.state.newvehicleData.piston, 
                cylinder : this.state.newvehicleData.cylinder,
                procuring_entity : this.state.newvehicleData.procuring_entity, capacity : this.state.newvehicleData.capacity, 
                gross_weight : this.state.newvehicleData.gross_weight, net_weight : this.state.newvehicleData.net_weight, shipping_weight : this.state.newvehicleData.shipping_weight,
                net_capacity : this.state.newvehicleData.net_capacity, lto_cr : this.state.newvehicleData.lto_cr, cr_date : this.state.newvehicleData.cr_date,
                or_no : this.state.newvehicleData.or_no,
                or_date : this.state.newvehicleData.or_date, field_office : this.state.newvehicleData.field_office, or_cr : this.state.newvehicleData.or_cr, 
                permanent_loc : this.state.newvehicleData.permanent_loc, current_loc : this.state.newvehicleData.current_loc,   delivery_location : this.state.newvehicleData.delivery_location,
                deliver_date : this.state.newvehicleData.deliver_date, si_no : this.state.newvehicleData.si_no, dr_no : this.state.newvehicleData.dr_no, 
                dr_codes : this.state.newvehicleData.dr_codes, remarks : this.state.newvehicleData.remarks,   c_client_name: this.state.newvehicleData.c_client_name,
                c_contract_no: this.state.newvehicleData.c_contract_no, c_start_date: this.state.newvehicleData.c_start_date, 
                c_end_date: this.state.newvehicleData.c_end_date, c_bid_no: this.state.newvehicleData.c_bid_date, c_bid_name: this.state.newvehicleData.c_bid_name, 
                c_bid_date: this.state.newvehicleData.c_bid_date, c_cost: this.state.newvehicleData.c_cost, t_insurance_name: this.state.newvehicleData.t_insurance_name, 
                t_telephone_no: this.state.newvehicleData.t_telephone_no,
                t_email: this.state.newvehicleData.t_email, t_po_no: this.state.newvehicleData.t_po_no, t_date_issued: this.state.newvehicleData.t_date_issued, 
                t_start_date: this.state.newvehicleData.t_start_date, t_end_date: this.state.newvehicleData.t_end_date, t_cost: this.state.newvehicleData.t_cost, 
                i1_insurance_company: this.state.newvehicleData.i1_insurance_company, i1_telephone_no: this.state.newvehicleData.i1_telephone_no, i1_email:this.state.newvehicleData.i1_email,
                i1_po_no: this.state.newvehicleData.i1_po_no, i1_date_issued: this.state.newvehicleData.i1_date_issued, i1_start_date: this.state.newvehicleData.i1_start_date, 
                i1_end_date: this.state.newvehicleData.i1_end_date, i1_cost: this.state.newvehicleData.i1_cost, i2_insurance_company: this.state.newvehicleData.i2_insurance_company, 
                i2_telephone_no: this.state.newvehicleData.i2_telephone_no, i2_email: this.state.newvehicleData.i2_email,
                i2_po_no: this.state.newvehicleData.i2_po_no, i2_date_issued: this.state.newvehicleData.i2_date_issued, 
                i2_start_date: this.state.newvehicleData.i2_start_date, i2_end_date: this.state.newvehicleData.i2_end_date, i2_cost: this.state.newvehicleData.i2_cost,
            }
        }, this.runModify);


    }

    runModify = () => {

        if(this.state.vmModalMode==='Add'){
            console.log(this.state.APIvehicleData)
            this.addVehicle()
        }

        else if(this.state.vmModalMode==='Modify'){
            this.editVehicle()
            }
        else
            {
                axios
                    .delete("http://localhost:8000/api/careta/" + this.state.vehicleData.slug + '/')
                    .then(res => this.setState({ todoList: res.data }))
                    .catch(err => console.log(err));
            }
    }

    showErrorSave = () => {
        this.toast.current.show({severity:'error', summary: 'Saving Failed', detail:'Please check all your input data.', life: 5000});
    }


    render() {

        const brandListItems = [
            {label: 'Mitsubishi', value: 'Mitsubishi'},
            {label: 'Suzuki', value: 'Suzuki'},
            {label: 'Foton', value: 'Foton'},
        ];

        const dealerListItems = [
            {label: 'Diamond Motor Corporation', value: 'Diamond Motor Corporation'},
            {label: 'Grand Canyon Multi Holdings, INC.', value: 'Grand Canyon Multi Holdings, INC.'},
            {label: 'Cebu Autocentrale Corporation', value: 'Cebu Autocentrale Corporation'},
            {label: 'Cherub Autodealer Inc.', value: 'Cherub Autodealer Inc.'}
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



        const onHide = (name) => {


            }

        const onShow = (vm) => {
            if (vm === 'Add'){
                this.setState({
                    vmVisibility: true,
                    vmModalMode: vm,
                    newvehicleData:this.state.emptyvehicleData
                });
            }
            else if (vm === 'Modify'){
                this.setState({
                    vmVisibility: true,
                    vmModalMode: vm,
                    newvehicleData:this.state.vehicleData
                });
            }
            }

        const renderFooter = (name) => {
            return (
                <div>
                    <Button label="Save" icon="pi pi-check" onClick={(e) => mainModalDialogSaveButtonhandler(e,name)} autoFocus />
                    <Button label="Cancel" icon="pi pi-times" onClick={(e) => mainModalDialogCancelButtonhandler(e)} className="p-button-text" />
                </div>
            );
        }

        //selectbutton behavior on vehicle data: recieved items modal dialog

        const setOptionValue = (name,e) => {

            if(e.value!=='DT'){

                switch(name)
                    {

                        //others

                    case 'TopLoad':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                top_load: e.value
                            }
                        });
                        break;

                    case 'Permanent Type':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                permanent_status: e.value
                            }
                        });
                        break;

                    case 'VTF Type':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                vtf: e.value
                            }
                        });
                        break;

                    case 'Fuel Type':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                fuel_type: e.value
                            }
                        });
                        break;

                    case 'Transmission Type':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                transmission: e.value
                            }
                        });
                        break;

                    case 'Status':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                status: e.value
                            }
                        });
                        break;

                    case 'Operational':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                operational: e.value
                            }
                        });
                        break;


                        //recieved items

                    case 'Plate Number Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                plate_date: e.value
                            }
                        });
                        break;

                    case 'Decal Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                decals_date: e.value
                            }
                        });
                        break;

                    case 'Modified Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                modified: e.value
                            }
                        });
                        break;

                    case 'EWD Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                ewd_date: e.value
                            }
                        });
                        break;

                    case 'Tools Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                tools_date: e.value
                            }
                        });
                        break;

                    case "User's Manual Delivery Date":

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                userManual_date: e.value
                            }
                        });
                        break;

                    case 'Warranty Book Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                warrantyBook_date: e.value
                            }
                        });
                        break;

                    case 'Unit Key Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                unitKey_date: e.value
                            }
                        });
                        break;

                    case 'Body Key Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                bodyKey_date: e.value
                            }
                        });
                        break;

                    case 'Cigarette Plug Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                cigarettePlug_date: e.value
                            }
                        });
                        break;

                    case 'Key Chain Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                keychain_date: e.value
                            }
                        });
                        break;

                    case 'Jack Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                jack: e.value
                            }
                        });
                        break;

                    case 'Tire Wrench Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                wrench: e.value
                            }
                        });
                        break;

                    case 'Fire Extinguisher Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                fire_extinguisher: e.value
                            }
                        });
                        break;

                    case 'Fan Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
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
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                deliver_date: formattedValue
                            }
                        });
                    break;

                    case 'OR CR Copy Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                or_cr: formattedValue
                            }
                        });
                    break;

                    case 'LTO Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                cr_date: formattedValue
                            }
                        });
                        break;

                    case 'OR Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                or_date: formattedValue
                            }
                        });
                        break;

                    case 'PO Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                po_date: formattedValue
                            }
                        });
                        break;

                    case 'Plate Number Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                plate_date: formattedValue
                            }
                        });
                        break;

                    case 'Decal Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                decals_date: formattedValue
                            }
                        });
                        break;

                    case 'Modified Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                modified: formattedValue
                            }
                        });
                        break;

                    case 'EWD Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                ewd_date: formattedValue
                            }
                        });
                        break;

                    case 'Tools Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                tools_date: formattedValue
                            }
                        });
                        break;

                    case "User's Manual Delivery Date":

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                userManual_date: formattedValue
                            }
                        });
                        break;

                    case 'Warranty Book Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                warrantyBook_date: formattedValue
                            }
                        });
                        break;

                    case 'Unit Key Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                unitKey_date: formattedValue
                            }
                        });
                        break;

                    case 'Body Key Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                bodyKey_date: formattedValue
                            }
                        });
                        break;

                    case 'Cigarette Plug Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                cigarettePlug_date: formattedValue
                            }
                        });
                        break;

                    case 'Key Chain Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                keychain_date: formattedValue
                            }
                        });
                        break;

                    case 'Jack Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                jack: formattedValue
                            }
                        });
                        break;

                    case 'Tire Wrench Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                wrench: formattedValue
                            }
                        });
                        break;

                    case 'Fire Extinguisher Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                fire_extinguisher: formattedValue
                            }
                        });
                        break;

                    case 'Fan Delivery Date':

                        this.setState({
                            newvehicleData: {
                                ...this.state.newvehicleData,
                                fan_date: formattedValue
                            }
                        });
                        break;
                    
                    case 'Fan Delivery Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    fan_date: formattedValue
                                }
                            });
                            break;
                    
                    case 'TDate Issued':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    t_date_issued: formattedValue
                                }
                            });
                            break;
                    
                    case 'TStart Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    t_start_date: formattedValue
                                }
                            });
                            break;

                    case 'TEnd Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    t_end_date: formattedValue
                                }
                            });
                            break;
                    
                    case 'I1Date Issued':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    i1_date_issued: formattedValue
                                }
                            });
                            break;

                    case 'I1Start Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    i1_start_date: formattedValue
                                }
                            });
                            break;
                    
                    case 'I1End Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    i1_end_date: formattedValue
                                }
                            });
                            break;

                    case 'I2Date Issued':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    i2_date_issued: formattedValue
                                }
                            });
                            break;
                
                    case 'I2Start Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    i2_start_date: formattedValue
                                }
                            });
                            break;

                    case 'I2End Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    i2_end_date: formattedValue
                                }
                            });
                            break;

                    case 'CStart Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    c_start_date: formattedValue
                                }
                            });
                            break;

                    case 'CEnd Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    c_end_date: formattedValue
                                }
                            });
                            break;

                    case 'CBid Date':

                            this.setState({
                                newvehicleData: {
                                    ...this.state.newvehicleData,
                                    c_bid_date: formattedValue
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
        
        //GET VALUES OF CAR FROM DB
        const getContract = () =>{
            axios
                .get("http://127.0.0.1:8000/api/careta-contract/" + this.state.vehicleData.car_id+"/")
                .then(res=>{this.setState({
                        vehicleData: {
                            ...this.state.vehicleData,
                        c_client_name:res.data.client_name,
                        c_contract_no: res.data.contract_no,
                        c_start_date: res.data.start_date,
                        c_end_date:res.data.end_date,
                        c_bid_no: res.data.bid_no,
                        c_bid_name: res.data.bid_name,
                        c_bid_date: res.data.bid_date,
                        c_cost: res.data.cost,        
                        }
                },getTPL)})
        }

        const getTPL= () =>{
            axios
                .get("http://127.0.0.1:8000/api/careta-tpl/" + this.state.vehicleData.car_id+"/")
                .then(res=>{this.setState({
                        vehicleData: {
                            ...this.state.vehicleData,
                        t_insurance_name:res.data.insurance_name,
                        t_telephone_no: res.data.telephone,
                        t_email: res.data.email,
                        t_po_no:res.data.po_no,
                        t_date_issued: res.data.date_issued,
                        t_start_date: res.data.start_date,
                        t_end_date: res.data.end_date,
                        t_cost: res.data.cost,        
                        }
                },getInsurance1)})
        }

        const getInsurance1= () =>{
            axios
                .get("http://127.0.0.1:8000/api/careta-insurance/" + this.state.vehicleData.car_id+"-1/")
                .then(res=>{this.setState({
                        vehicleData: {
                            ...this.state.vehicleData,
                        i1_insurance_company:res.data.company,
                        i1_telephone_no: res.data.telephone,
                        i1_email: res.data.email,
                        i1_po_no:res.data.po_no,
                        i1_date_issued: res.data.date_issued,
                        i1_start_date: res.data.start_date,
                        i1_end_date: res.data.end_date,
                        i1_cost: res.data.cost,        
                        }
                },getInsurance2)})
        }

        const getInsurance2= () =>{
            axios
                .get("http://127.0.0.1:8000/api/careta-insurance/" + this.state.vehicleData.car_id+"-2/")
                .then(res=>{this.setState({
                        vehicleData: {
                            ...this.state.vehicleData,
                        i2_insurance_company:res.data.company,
                        i2_telephone_no: res.data.telephone,
                        i2_email: res.data.email,
                        i2_po_no:res.data.po_no,
                        i2_date_issued: res.data.date_issued,
                        i2_start_date: res.data.start_date,
                        i2_end_date: res.data.end_date,
                        i2_cost: res.data.cost,        
                        }
                },reProcessResult)})
        }

        
        const onSearchBarOnKeyUp = (e) => {


            if(e.keyCode===13)
                {
                    axios
                    .get("http://127.0.0.1:8000/api/careta/?search=" + e.target.value)
                    .then(res =>  {
                        console.log(res.data);
                        const isDataAvailable = res.data && res.data.length;

                        if(isDataAvailable)
                            this.setState({ vehicleData: res.data[0]},getContract);
                        else
                            showNoResult();

                    })
                    .catch(err => console.log(err));


                }


        }

        const reProcessResult = () => {


            console.log(this.state.vehicleData);
            var vBrand = this.state.vehicleData.brand === "M" ? "Mitsubishi"
                : this.state.vehicleData.brand === "S" ? "Suzuki" : "Foton";
            var vDealer = this.state.vehicleData.dealer === "DM" ? "Diamond Motor Corporation"
                : this.state.vehicleData.dealer === "GC" ? "Grand Canyon Multi Holdings, INC."
                : this.state.vehicleData.dealer === "CAC" ? "Cebu Autocentrale Corporation" : "Cherub Autodealer Inc."; 
            var vFuelType = this.state.vehicleData.fuel_type === "D" ? "Diesel" : "Gas";
            var vTransmissionType = this.state.vehicleData.transmission === "A" ? "Automatic" : "Manual";
            var vTopLoading = this.state.vehicleData.top_load === true ? "Yes" : "No";
            var vVTF = this.state.vehicleData.vtf === true ? "Yes" : "No";
            var vPermanentStatus = this.state.vehicleData.permanent_status === true ? "Yes" : "No";
            var vModified = this.state.vehicleData.modified === true ? "Yes" : "No";
            var vOperational = this.state.vehicleData.operational === true ? "Yes" : "No";
            var vStatus = this.state.vehicleData.status ==="A" ? "Active" : this.state.vehicleData.status ==="M" ? "Maintenance" : "Repair";
            var vPlateNumberDelivery = this.state.vehicleData.plate_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.plate_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.plate_date ===  'NA'? 'Not Applicable'
                : this.state.vehicleData.plate_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.plate_date;
            var vDecals = this.state.vehicleData.decals_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.decals_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.decals_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.decals_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.decals_date;
            var vEWDDate = this.state.vehicleData.ewd_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.ewd_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.ewd_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.ewd_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.ewd_date;
            var vTools = this.state.vehicleData.tools_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.tools_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.tools_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.tools_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.tools_date;
            var vUserManual = this.state.vehicleData.userManual_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.userManual_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.userManual_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.userManual_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.userManual_date;
            var vWarrantyBook = this.state.vehicleData.warrantyBook_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.warrantyBook_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.warrantyBook_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.warrantyBook_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.warrantyBook_date;
            var vUnitKey = this.state.vehicleData.unitKey_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.unitKey_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.unitKey_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.unitKey_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.unitKey_date;
            var vBodyKey = this.state.vehicleData.bodyKey_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.bodyKey_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.bodyKey_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.bodyKey_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.bodyKey_date;
            var vCigarettePlug = this.state.vehicleData.cigarettePlug_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.cigarettePlug_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.cigarettePlug_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.cigarettePlug_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.cigarettePlug_date;
            var vKeyChain = this.state.vehicleData.keychain_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.keychain_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.keychain_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.keychain_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.keychain_date;
            var vJack = this.state.vehicleData.jack === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.jack === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.jack ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.jack ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.jack;
            var vWrench = this.state.vehicleData.wrench === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.wrench === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.wrench ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.wrench ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.wrench;
            var vFireExtinguisher = this.state.vehicleData.fire_extinguisher === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.fire_extinguisher === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.fire_extinguisher ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.fire_extinguisher ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.fire_extinguisher;
            var vFan = this.state.vehicleData.fan_date === 'NRC' ? 'No Recieving Copy'
                : this.state.vehicleData.fan_date === 'NYR' ? 'Not Yet Released'
                : this.state.vehicleData.fan_date ===  'NA' ? 'Not Applicable'
                : this.state.vehicleData.fan_date ===  'DNR'? 'Did Not Recieve'
                : this.state.vehicleData.fan_date;



            //apply
            this.setState({
                vehicleData: {
                    ...this.state.vehicleData,
                    slug: this.state.vehicleData.vin_no,
                    brand: vBrand,
                    dealer: vDealer,
                    fuel_type: vFuelType,
                    transmission: vTransmissionType,
                    top_load: vTopLoading,
                    vtf: vVTF,
                    permanent_status: vPermanentStatus,
                    modified: vModified,
                    operational: vOperational,
                    status: vStatus,
                    plate_date : vPlateNumberDelivery,
                    decals_date : vDecals,
                    ewd_date : vEWDDate,
                    tools_date : vTools,
                    userManual_date : vUserManual,
                    warrantyBook_date: vWarrantyBook,
                    unitKey_date : vUnitKey,
                    bodyKey_date : vBodyKey,
                    cigarettePlug_date : vCigarettePlug,
                    keychain_date : vKeyChain,
                    jack : vJack,
                    wrench : vWrench,
                    fire_extinguisher: vFireExtinguisher,
                    fan_date: vFan,
                    date_created: vPlateNumberDelivery,
                    date_updated: vPlateNumberDelivery

                }
            });

            }

        const onChangeHandler = (e) => {

            this.setState({
                newvehicleData: {
                    ...this.state.newvehicleData,
                    [e.target.name]: e.target.value
                }
            });


        }



        const mainModalDialogSaveButtonhandler = (name) => {
            
            if(this.state.vmVisibility)
            {
                //this.setState({
                  //  vmVisibility: false
                //});
                this.modifyCarDB(name)
            }

        }


        const mainModalDialogCancelButtonhandler = () => {

            if(this.state.vmVisibility)
            {
                this.setState({
                    vmVisibility: false
                });

                //this.modifyCarDB(name);

            }


        }


        const ConfirmDeleteDialogHide = (e) =>{

            if(this.state.ddVisibility)
            {
                this.setState({
                    vmModalMode: 'Remove',
                    ddVisibility: false
                });

                //this.modifyCarDB('Remove');

            }


        }

        const ConfirmDeleteProceedHandler = () => {

            if(this.state.ddVisibility)
            {
                this.setState({
                    ddVisibility: false
                },this.runModify());

                

            }


        }

        const ConfirmDeleteCancelHandler = () => {
        }

        const RemoveButtonHandler = () => {

             if(this.state.vehicleData.car_id===0)
                {
                    showError();
                }
              else
                {
                    this.setState({
                        ddVisibility: true,
                        vmModalMode: "Remove"
                    });
                }

        }

        const showError = () => {
            this.toast.current.show({severity:'error', summary: 'Transaction Failed', detail:'You must select a vehicle in order to use this button.', life: 5000});
        }

        const showNoResult = () => {
            this.toast.current.show({severity:'error', summary: 'Search Failed', detail:'Failed to find the any vehicle that matches your keyword..', life: 5000});
        }

        

        return (

            <div className="p-grid">

                <div className="p-col-12">

                    <Toast ref={this.toast} />

                    <Dialog header={"Delete Data"} visible={this.state.ddVisibility} onHide={() => ConfirmDeleteDialogHide()}>
                        <div className="card">
                            <p>Are you sure you want to delete this vehicle?</p>
                        <div>
                        </div>
                            <Button label="Yes" icon="pi pi-check" onClick={() => ConfirmDeleteProceedHandler()} autoFocus />
                            <Button label="No" icon="pi pi-times" onClick={() => ConfirmDeleteCancelHandler()} className="p-button-text" />
                        </div>
                    </Dialog>

                    <Dialog header={"Select " + this.state.vdModalMode} visible={this.state.vdVisibility}  onHide={() => onCalendarModalHide()}  >
                        <div className="card">
                        <Calendar inline monthNavigator yearNavigator yearRange="2010:2030" onChange={(e) => onCalendarModalDateChange(e.value)}></Calendar>
                        </div>
                    </Dialog>

                    <Dialog header={this.state.vmModalMode + " Vehicle Data"} visible={this.state.vmVisibility} footer={renderFooter(this.state.vmModalMode)} onHide={() => onHide(this.state.vmModalMode)} className="p-md-8" closable={false} blockScroll={true}>
                        <div className="card">
                        <TabView activeIndex={this.state.activeIndexModal} onTabChange={(e) => this.setState({activeIndexModal: e.index})}>
                            <TabPanel header="Identification" className="btn-block">
                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vStatus" className="p-col-12 p-md-2">Status:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vStatus" type="text" value = {this.state.newvehicleData.status}/>
                                            <SelectButton value={""} options={statusOptions} onChange={(e) => setOptionValue('Status',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vOperational" className="p-col-12 p-md-2">Operational:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vOperational" type="text" value = {this.state.newvehicleData.operational}/>
                                            <SelectButton value={""} options={operationalStatus} onChange={(e) => setOptionValue('Operational',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyNum" className="p-col-12 p-md-2">Body Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyNum" name='body_no' type="text" value = {this.state.newvehicleData.body_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCSNum" className="p-col-12 p-md-2">CS Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCSNum" type="text" name='cs_no' value = {this.state.newvehicleData.cs_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPlateNum" className="p-col-12 p-md-2">Plate Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPlateNum" type="text" name='plate_no' value={this.state.newvehicleData.plate_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vRemarks" className="p-col-12 p-md-2">Remarks:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vRemarks" type="text" name='remarks' value = {this.state.newvehicleData.remarks} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="Vehicle Info">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBrand" className="p-col-12 p-md-2">Brand:</label>
                                        <div className="p-col-12 p-md-10">
                                            <Dropdown id="vBrand" name="brand" value={this.state.newvehicleData.brand} options={brandListItems} optionLabel="label" placeholder="Select a Brand" onChange={(e) => onChangeHandler(e)} />
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vYear" className="p-col-12 p-md-2">Year:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputMask id="vYear" mask="9999" name='release_year' value={this.state.newvehicleData.release_year} onChange={(e) => onChangeHandler(e)}></InputMask>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vMake" className="p-col-12 p-md-2">Make:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vMake" type="text" name='make' value={this.state.newvehicleData.make} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vSeries" className="p-col-12 p-md-2">Series:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vSeries" type="text" name='series' value={this.state.newvehicleData.series} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyType" className="p-col-12 p-md-2">Body Type:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyType" type="text" name='body_type' value={this.state.newvehicleData.body_type} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vColor" className="p-col-12 p-md-2">Color:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vColor" type="text" name='color'  value={this.state.newvehicleData.color} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel header="Suppliers">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDealer" className="p-col-12 p-md-2">Dealer:</label>
                                        <div className="p-col-12 p-md-10">
                                            <Dropdown id="vDealer" name="dealer" value={this.state.newvehicleData.dealer} options={dealerListItems} optionLabel="label" placeholder="Select a Dealer" onChange={(e) => onChangeHandler(e)} />
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPONumber" className="p-col-12 p-md-2">PO Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPONumber" type="text" name='po_no'  value={this.state.newvehicleData.po_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPODate" className="p-col-12 p-md-2">PO Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPODate" type="text" value={this.state.newvehicleData.po_date} onClick={()=>onInputTextClickHandler("PO Date")} readOnly/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyBuilder" className="p-col-12 p-md-2">Body Builder:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBodyBuilder" type="text" name='body_builder' value={this.state.newvehicleData.body_builder} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFabricator" className="p-col-12 p-md-2">Fabricator:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFabricator" type="text" name='fabricator'  value={this.state.newvehicleData.fabricator} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>

                                </div>

                            </TabPanel>
                            <TabPanel header="Engine and Body Info">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vChassisN" className="p-col-12 p-md-2">Chassis Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vChassisN" type="text" name='vin_no' value={this.state.newvehicleData.vin_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vEngineN" className="p-col-12 p-md-2">Engine Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vEngineN" type="text" name='engine_no' value={this.state.newvehicleData.engine_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBatteryN" className="p-col-12 p-md-2">Battery Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vBatteryN" type="text" name='battery_no' value={this.state.newvehicleData.battery_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFuelType" className="p-col-12 p-md-2">Fuel Type:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vFuelType" type="text" value = {this.state.newvehicleData.fuel_type}/>
                                            <SelectButton value={""} options={fuelType} onChange={(e) => setOptionValue('Fuel Type',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTransmission" className="p-col-12 p-md-2">Transmission:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vTransmission" type="text" value = {this.state.newvehicleData.transmission}/>
                                            <SelectButton value={""} options={transmissionType} onChange={(e) => setOptionValue('Transmission Type',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDenomination" className="p-col-12 p-md-2">Denomination:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDenomination" type="text" name='denomination' value={this.state.newvehicleData.denomination} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPistonD" className="p-col-12 p-md-2">Piston Displacement:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPistonD" type="text" name='piston' value={this.state.newvehicleData.piston} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNumCylinders" className="p-col-12 p-md-2">Number of Cylinders:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNumCylinders" type="text" name='cylinder' value={this.state.newvehicleData.cylinder} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vProcEntity" className="p-col-12 p-md-2">Procuring Entity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vProcEntity" type="text" name='procuring_entity' value={this.state.newvehicleData.procuring_entity} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCapacity" className="p-col-12 p-md-2">Capacity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCapacity" type="text" name='capacity' value={this.state.newvehicleData.capacity} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vGrossW" className="p-col-12 p-md-2">Gross Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vGrossW" type="text" name='gross_weight' value={this.state.newvehicleData.gross_weight} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNetW" className="p-col-12 p-md-2">Net Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNetW" type="text" name='net_weight' value={this.state.newvehicleData.net_weight} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vShippingW" className="p-col-12 p-md-2">Shipping Weight:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vShippingW" type="text" name='shipping_weight' value={this.state.newvehicleData.shipping_weight} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vNetCapacity" className="p-col-12 p-md-2">Net Capacity:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vNetCapacity" type="text" name='net_capacity' value={this.state.newvehicleData.net_capacity} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>

                                </div>

                            </TabPanel>
                            <TabPanel header="LTO">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vLTOCR" className="p-col-12 p-md-2">LTO CR:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vLTOCR" type="text" name='lto_cr' value={this.state.newvehicleData.lto_cr} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vLTOCRDate" className="p-col-12 p-md-2">LTO CR Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vLTOCRDate" type="text" value={this.state.newvehicleData.cr_date} onClick={()=>onInputTextClickHandler("LTO Date")} readOnly/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORNumber" className="p-col-12 p-md-2">OR Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORNumber" type="text" name='or_no' value={this.state.newvehicleData.or_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORDate" className="p-col-12 p-md-2">OR Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORDate" type="text" value={this.state.newvehicleData.or_date} onClick={()=>onInputTextClickHandler("OR Date")} readOnly/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTopLoadReg" className="p-col-12 p-md-2">TopLoadReg:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vTopLoadReg" type="text" name='top_load' value={this.state.newvehicleData.top_load}/>
                                            <SelectButton value={""} options={operationalStatus} onChange={(e) => setOptionValue('TopLoad',e)} className="p-col-6 p-md-6"></SelectButton>
                                        </div>


                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFieldOfc" className="p-col-12 p-md-2">Field office:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vFieldOfc" type="text" name='field_office' value={this.state.newvehicleData.field_office} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vORCRCopy" className="p-col-12 p-md-2">ORCR Copy:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vORCRCopy" type="text" value={this.state.newvehicleData.or_cr} onClick={()=>onInputTextClickHandler("OR CR Copy Date")} readOnly/>
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel header="Location">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPermanentLoc" className="p-col-12 p-md-2">Permanent:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vPermanentLoc" type="text" name='permanent_loc' value={this.state.newvehicleData.permanent_loc} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCurrentLoc" className="p-col-12 p-md-2">Current:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vCurrentLoc" type="text" name='current_loc' value={this.state.newvehicleData.current_loc} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vVTF" className="p-col-12 p-md-2">With VTF?:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vVTF" type="text" value={this.state.newvehicleData.vtf} readOnly/>
                                            <SelectButton value={""} options={operationalStatus} onChange={(e) => setOptionValue('VTF Type',e)} className="p-col-4 p-md-6"></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPLStatus" className="p-col-12 p-md-2">Permanent?:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vPLStatus" type="text" value={this.state.newvehicleData.permanent_status} readOnly/>
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
                                            <InputText id="vDeliveryLoc" type="text" name='delivery_location' value={this.state.newvehicleData.delivery_location} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDeliveryDate" className="p-col-12 p-md-2">Delivery Date:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDeliveryDate" type="text" value={this.state.newvehicleData.deliver_date} onClick={()=>onInputTextClickHandler("Delivery Date")} readOnly/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vSINumber" className="p-col-12 p-md-2">SI Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vSINumber" type="text" name='si_no' value={this.state.newvehicleData.si_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDRNumber" className="p-col-12 p-md-2">DR Number:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDRNumber" type="text" name='dr_no' value={this.state.newvehicleData.dr_no} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDRCodes" className="p-col-12 p-md-2">DR Codes:</label>
                                        <div className="p-col-12 p-md-10">
                                            <InputText id="vDRCodes" type="text" name='dr_codes' value={this.state.newvehicleData.dr_codes} onChange={(e) => onChangeHandler(e)}/>
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel header="Received Items">

                                <div className="p-fluid">
                                    <div className="p-field p-grid">
                                        <label htmlFor="vPlateNumDel" className="p-col-12 p-md-2">Plate Number Delivery:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vPlateNumDel"  type="text" value={this.state.newvehicleData.plate_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Plate Number Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vDecals" className="p-col-12 p-md-2">Decals:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vDecals" type="text" value={this.state.newvehicleData.decals_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Decal Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vModified" className="p-col-12 p-md-2">Modified:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vModified" type="text" value={this.state.newvehicleData.modified} readOnly/>
                                            <SelectButton value={""} options={operationalStatus} onChange={(e) => setOptionValue('Modified Date',e)} className="p-col-6 p-md-6"></SelectButton>
                                        </div>


                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vEWD" className="p-col-12 p-md-2">Early Warning Device:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vEWD" type="text" value={this.state.newvehicleData.ewd_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('EWD Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTools" className="p-col-12 p-md-2">Tools:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vTools" type="text" value={this.state.newvehicleData.tools_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Tools Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vUsersManual" className="p-col-12 p-md-2">User's Manual:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vUsersManual" type="text" value={this.state.newvehicleData.userManual_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue("User's Manual Delivery Date",e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vWarrantyBook" className="p-col-12 p-md-2">Warranty Book:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vWarrantyBook" type="text" value={this.state.newvehicleData.warrantyBook_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Warranty Book Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vUnitKey" className="p-col-12 p-md-2">Unit Key:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vUnitKey" type="text" value={this.state.newvehicleData.unitKey_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Unit Key Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vBodyKey" className="p-col-12 p-md-2">Body Key:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vBodyKey" type="text" value={this.state.newvehicleData.bodyKey_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Body Key Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vCigPlug" className="p-col-12 p-md-2">Cigarette Plug:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vCigPlug" type="text" value={this.state.newvehicleData.cigarettePlug_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Cigarette Plug Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vKeyChain" className="p-col-12 p-md-2">Key Chain:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vKeyChain" type="text" value={this.state.newvehicleData.keychain_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Key Chain Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vJack" className="p-col-12 p-md-2">Jack:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vJack" type="text" value={this.state.newvehicleData.jack} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Jack Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vTireWrench" className="p-col-12 p-md-2">Tire Wrench:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vTireWrench" type="text" value={this.state.newvehicleData.wrench} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Tire Wrench Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFireExt" className="p-col-12 p-md-2">Fire Extinguisher:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vFireExt" type="text" value={this.state.newvehicleData.fire_extinguisher} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Fire Extinguisher Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>
                                    <div className="p-field p-grid">
                                        <label htmlFor="vFan" className="p-col-12 p-md-2">Fan:</label>
                                        <div className="p-inputgroup p-col-12 p-md-10">
                                            <InputText id="vFan" type="text" value={this.state.newvehicleData.fan_date} readOnly/>
                                            <SelectButton value={""} options={recievedItemStatus} onChange={(e) => setOptionValue('Fan Delivery Date',e)}></SelectButton>
                                        </div>
                                    </div>

                                </div>

                            </TabPanel>
                            <TabPanel header="Bidding/Contract">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dClientName" className="p-col-12 p-md-2">Client Name:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dClientName"  name = "c_client_name" type="text" value={this.state.newvehicleData.c_client_name} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dContractNumber" className="p-col-12 p-md-2">Contract Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dContractNumber" name = "c_contract_no" type="text" value={this.state.newvehicleData.c_contract_no} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCStartDate" className="p-col-12 p-md-2">Start Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCStartDate" name = "c_start_date" type="text" value={this.state.newvehicleData.c_start_date} onClick={()=>onInputTextClickHandler("CStart Date")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCEndDate" className="p-col-12 p-md-2">End Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCEndDate" name="c_end_date" type="text" value={this.state.newvehicleData.c_end_date} onClick={()=>onInputTextClickHandler("CEnd Date")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCBidNumber" className="p-col-12 p-md-2">Bid Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCBidNumber" name="c_bid_no" type="text" value={this.state.newvehicleData.c_bid_no} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCBidName" className="p-col-12 p-md-2">Bid Name:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCBidName" name = "c_bid_name" type="text" value={this.state.newvehicleData.c_bid_name} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCBidDate" className="p-col-12 p-md-2">Bid Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCBidDate" name= "c_bid_date" type="text" value={this.state.newvehicleData.c_bid_date} onClick={()=>onInputTextClickHandler("CBid Date")}readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCCost" className="p-col-12 p-md-2">Cost:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="dCCost" name="c_cost" type="text" value={this.state.newvehicleData.c_cost} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                            <TabPanel header="TPL">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTInsuranceName" className="p-col-12 p-md-2">Insurance Name:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTInsuranceName"  name = "t_insurance_name" type="text" value={this.state.newvehicleData.t_insurance_name} onChange={(e) => onChangeHandler(e)} />
                                                </div>
                                            </div> 
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTTelephone" className="p-col-12 p-md-2">Telephone Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTTelephone" name = "t_telephone_no" type="text" value={this.state.newvehicleData.t_telephone_no} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTEmail" className="p-col-12 p-md-2">Email:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTEmail" name= "t_email" type="text" value={this.state.newvehicleData.t_email} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTPONo" className="p-col-12 p-md-2">PO Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTPONo" name = "t_po_no" type="text" value={this.state.newvehicleData.t_po_no} onChange={(e) => onChangeHandler(e)} />
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTDateIssued" className="p-col-12 p-md-2">Date Issued:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTDateIssued" name = "t_date_issued" type="text" value={this.state.newvehicleData.t_date_issued} onClick={()=>onInputTextClickHandler("TDate Issued")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTStartDate" className="p-col-12 p-md-2">Start Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTStartDate" name = "t_start_date" type="text" value={this.state.newvehicleData.t_start_date} onClick={()=>onInputTextClickHandler("TStart Date")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTEndDate" className="p-col-12 p-md-2">End Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTEndDate" name = "t_end_date" type="text" value={this.state.newvehicleData.t_end_date}  onClick={()=>onInputTextClickHandler("TEnd Date")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTCost" className="p-col-12 p-md-2">Cost:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="dTCost" name = "t_cost" type="text" value={this.state.newvehicleData.t_cost} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                            <TabPanel header="1st Insurance">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1InsuranceCompany" className="p-col-12 p-md-2">Insurance Company:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1InsuranceCompany" name = "i1_insurance_company" type="text" value={this.state.newvehicleData.i1_insurance_company} onChange={(e) => onChangeHandler(e)} />
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1Telephone" className="p-col-12 p-md-2">Telephone Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1Telephone" name = "i1_telephone_no" type="text" value={this.state.newvehicleData.i1_telephone_no} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1Email" className="p-col-12 p-md-2">Email:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1Email" name = "i1_email" type="text" value={this.state.newvehicleData.i1_email} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1PONo" className="p-col-12 p-md-2">PO Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1PONo" name = "i1_po_no" type="text" value={this.state.newvehicleData.i1_po_no} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1DateIssued" className="p-col-12 p-md-2">Date Issued:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1DateIssued" name = "i1_date_issued" type="text" value={this.state.newvehicleData.i1_date_issued} onClick={()=>onInputTextClickHandler("I1Date Issued")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1StartDate" className="p-col-12 p-md-2">Start Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1StartDate" name = "i1_start_date" type="text" value={this.state.newvehicleData.i1_start_date} onClick={()=>onInputTextClickHandler("I1Start Date")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1EndDate" className="p-col-12 p-md-2">End Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1EndDate" name = "i1_end_date" type="text" value={this.state.newvehicleData.i1_end_date} onClick={()=>onInputTextClickHandler("I1End Date")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1Cost" className="p-col-12 p-md-2">Cost:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="d1Cost" name = "i1_cost" type="text" value={this.state.newvehicleData.i1_cost} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                            <TabPanel header="2nd Insurance">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2InsuranceCompany" className="p-col-12 p-md-2">Insurance Company:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2InsuranceCompany" name = "i2_insurance_company" type="text" value={this.state.newvehicleData.i2_insurance_company} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2Telephone" className="p-col-12 p-md-2">Telephone Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2Telephone" name= "i2_telephone_no" type="text" value={this.state.newvehicleData.i2_telephone_no} onChange={(e) => onChangeHandler(e)}/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2Email" className="p-col-12 p-md-2">Email:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2Email" name= "i2_email" type="text" value={this.state.newvehicleData.i2_email}onChange={(e) => onChangeHandler(e)} />
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2PONo" className="p-col-12 p-md-2">PO Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2PONo" name = "i2_po_no" type="text" value={this.state.newvehicleData.i2_po_no} onChange={(e) => onChangeHandler(e)} />
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2DateIssued" className="p-col-12 p-md-2">Date Issued:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2DateIssued" name = "i2_date_issued" type="text" value={this.state.newvehicleData.i2_date_issued} onClick={()=>onInputTextClickHandler("I2Date Issued")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2StartDate" className="p-col-12 p-md-2">Start Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2StartDate" name = "i2_start_date" type="text" value={this.state.newvehicleData.i2_start_date} onClick={()=>onInputTextClickHandler("I2Start Date")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2EndDate" className="p-col-12 p-md-2">End Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2EndDate" name = "i2_end_date" type="text" value={this.state.newvehicleData.i2_end_date}  onClick={()=>onInputTextClickHandler("I2End Date")} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2Cost" className="p-col-12 p-md-2">Cost:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="d2Cost" name = "i2_cost" type="text" value={this.state.newvehicleData.i2_cost} onChange={(e) => onChangeHandler(e)}/>
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
                                    <Button label="Remove" icon="pi pi-ban" className="p-col-1 p-md-2 p-mr-2" onClick={() => RemoveButtonHandler()} />
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
                                                    <InputText id="dJack" type="text" value={this.state.vehicleData.jack} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTireWrench" className="p-col-12 p-md-2">Tire Wrench:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTireWrench" type="text" value={this.state.vehicleData.wrench} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dFireExt" className="p-col-12 p-md-2">Fire Extinguisher:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dFireExt" type="text" value={this.state.vehicleData.fire_extinguisher} readOnly/>
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
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dClientName" className="p-col-12 p-md-2">Client Name:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dClientName"  type="text" value={this.state.vehicleData.c_client_name} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dContractNumber" className="p-col-12 p-md-2">Contract Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dContractNumber" type="text" value={this.state.vehicleData.c_contract_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCStartDate" className="p-col-12 p-md-2">Start Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCStartDate" type="text" value={this.state.vehicleData.c_start_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCEndDate" className="p-col-12 p-md-2">End Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCEndDate" type="text" value={this.state.vehicleData.c_end_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCBidNumber" className="p-col-12 p-md-2">Bid Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCBidNumber" type="text" value={this.state.vehicleData.c_bid_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCBidName" className="p-col-12 p-md-2">Bid Name:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCBidName" type="text" value={this.state.vehicleData.c_bid_name} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCBidDate" className="p-col-12 p-md-2">Bid Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dCBidDate" type="text" value={this.state.vehicleData.c_bid_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dCCost" className="p-col-12 p-md-2">Cost:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="dCCost" type="text" value={this.state.vehicleData.c_cost} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="TPL">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTInsuranceName" className="p-col-12 p-md-2">Insurance Name:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTInsuranceName"  type="text" value={this.state.vehicleData.t_insurance_name} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTTelephone" className="p-col-12 p-md-2">Telephone Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTTelephone" type="text" value={this.state.vehicleData.t_telephone_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTEmail" className="p-col-12 p-md-2">Email:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTEmail" type="text" value={this.state.vehicleData.t_email} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTPONo" className="p-col-12 p-md-2">PO Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTPONo" type="text" value={this.state.vehicleData.t_po_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTDateIssued" className="p-col-12 p-md-2">Date Issued:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTDateIssued" type="text" value={this.state.vehicleData.t_date_issued} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTStartDate" className="p-col-12 p-md-2">Start Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTStartDate" type="text" value={this.state.vehicleData.t_start_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTEndDate" className="p-col-12 p-md-2">End Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="dTEndDate" type="text" value={this.state.vehicleData.t_end_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="dTCost" className="p-col-12 p-md-2">Cost:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="dTCost" type="text" value={this.state.vehicleData.t_cost} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="1st Insurance">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1InsuranceCompany" className="p-col-12 p-md-2">Insurance Company:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1InsuranceCompany"  type="text" value={this.state.vehicleData.i1_insurance_company} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1Telephone" className="p-col-12 p-md-2">Telephone Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1Telephone" type="text" value={this.state.vehicleData.i1_telephone_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1Email" className="p-col-12 p-md-2">Email:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1Email" type="text" value={this.state.vehicleData.i1_email} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1PONo" className="p-col-12 p-md-2">PO Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1PONo" type="text" value={this.state.vehicleData.i1_po_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1DateIssued" className="p-col-12 p-md-2">Date Issued:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1DateIssued" type="text" value={this.state.vehicleData.i1_date_issued} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1StartDate" className="p-col-12 p-md-2">Start Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1StartDate" type="text" value={this.state.vehicleData.i1_start_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1EndDate" className="p-col-12 p-md-2">End Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d1EndDate" type="text" value={this.state.vehicleData.i1_end_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d1Cost" className="p-col-12 p-md-2">Cost:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="d1Cost" type="text" value={this.state.vehicleData.i1_cost} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="2nd Insurance">
                                        <div className="p-fluid">
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2InsuranceCompany" className="p-col-12 p-md-2">Insurance Company:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2InsuranceCompany"  type="text" value={this.state.vehicleData.i2_insurance_company} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2Telephone" className="p-col-12 p-md-2">Telephone Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2Telephone" type="text" value={this.state.vehicleData.i2_telephone_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2Email" className="p-col-12 p-md-2">Email:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2Email" type="text" value={this.state.vehicleData.i2_email} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2PONo" className="p-col-12 p-md-2">PO Number:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2PONo" type="text" value={this.state.vehicleData.i2_po_no} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2DateIssued" className="p-col-12 p-md-2">Date Issued:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2DateIssued" type="text" value={this.state.vehicleData.i2_date_issued} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2StartDate" className="p-col-12 p-md-2">Start Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2StartDate" type="text" value={this.state.vehicleData.i2_start_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2EndDate" className="p-col-12 p-md-2">End Date:</label>
                                                <div className="p-col-12 p-md-10">
                                                    <InputText id="d2EndDate" type="text" value={this.state.vehicleData.i2_end_date} readOnly/>
                                                </div>
                                            </div>
                                            <div className="p-field p-grid">
                                                <label htmlFor="d2Cost" className="p-col-12 p-md-2">Cost:</label>
                                                <div className="p-inputgroup p-col-12 p-md-10">
                                                    <InputText id="d2Cost" type="text" value={this.state.vehicleData.i2_cost} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>

                                </TabView>
                            </div>

                        </div>

                    </Fieldset>

                </div>
            </div>

        );
    }
}