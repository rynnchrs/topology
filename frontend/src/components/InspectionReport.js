import React, { Component } from 'react';
import {CountryService} from '../service/CountryService';
import {InputText} from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';

export class InspectionReport extends Component {

    constructor() {
        super();
        this.state = {
            countriesData: [],
            cars: [],
            selectedType: null,
            chipsValue: [],
            date1: null,
            date2: null,
            date3: null,
            date4: null,
            date5: null,
            date6: null,
            date7: null,
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
        
            inputSwitchValue: false,
            dropdownCity: null,
            spinnerValue: null,
            sliderValue: [20,80],
            listBoxCity: null,
            ratingValue: null,
            colorPickerValue: null,
            inputGroupValue: null,
            carOptions: [
                {label: 'Audi', value: 'Audi'},
                {label: 'BMW', value: 'BMW'},
                {label: 'Fiat', value: 'Fiat'},
                {label: 'Honda', value: 'Honda'},
                {label: 'Jaguar', value: 'Jaguar'},
                {label: 'Mercedes', value: 'Mercedes'},
                {label: 'Renault', value: 'Renault'},
                {label: 'VW', value: 'VW'},
                {label: 'Volvo', value: 'Volvo'}
            ],
            cities: [
                {label: 'Select City', value: null},
                {label: 'New York', value: 'New York'},
                {label: 'Rome', value: 'Rome'},
                {label: 'London', value: 'London'},
                {label: 'Istanbul', value: 'Istanbul'},
                {label: 'Paris', value: 'Paris'}
            ],
            listBoxCities: [
                {label: 'Madrid', value: 'Madrid'},
                {label: 'Geneva', value: 'Geneva'},
                {label: 'Los Angeles', value: 'Los Angeles'},
                {label: 'Monaco', value: 'Monaco'},
                {label: 'Berlin', value: 'Berlin'}
            ],
            types: [
                {label: 'Apartment', value: 'Apartment'},
                {label: 'House', value: 'House'},
                {label: 'Studio', value: 'Studio'}
            ],
            splitButtonItems: [
                {label: 'Update', icon: 'pi pi-refresh'},
                {label: 'Delete', icon: 'pi pi-times'},
                {label: 'Home', icon: 'pi pi-home', url: 'http://www.primefaces.org/primereact'}
            ]
        };

        this.countryService = new CountryService();
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.filterCountry = this.filterCountry.bind(this);
        this.filterBrands = this.filterBrands.bind(this);
        this.autoCompleteItemTemplate = this.autoCompleteItemTemplate.bind(this);
    }

    componentDidMount(){
        this.setState({countriesData: this.countryService.getCountries(this)})
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
    }

    filterCountry(event) {
        let results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountries: results });
    }

    filterBrands(event) {
        setTimeout(() => {
            let results;

            if (event.query.length === 0) {
                results = [...this.brands];
            }
            else {
                results = this.brands.filter((brand) => {
                    return brand.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            this.setState({ filteredBrands: results });
        }, 250);
    }

    autoCompleteItemTemplate(brand) {
        if (!brand) {
            return;
        }

        return (
                <div className="p-clearfix">
                    <img alt={brand} src={`assets/demo/images/car/${brand}.png`} style={{ width: '32px', display: 'inline-block', margin: '5px 0 2px 5px' }} />
                    <div style={{ fontSize: '18px', float: 'right', margin: '10px 10px 0 0' }}>{brand}</div>
                </div>
        );
    }

    onCheckboxChange(event){
        let selected = [...this.state.checkboxValue];
        if (event.checked)
            selected.push(event.value);
        else
            selected.splice(selected.indexOf(event.value), 1);

        this.setState({checkboxValue: selected});
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Vehicle Inspection Report (Careta)</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <InputText placeholder="Body No." />
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText placeholder="Mileage"/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <InputText placeholder="Make/Model"/>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText placeholder="Location"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Exterior</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-3">
                                <center><label>Checked and Ok</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>May Require Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>Req. Immediate Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3"></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cl_ok" inputId="rb1" onChange={event => this.setState({radioValue1: event.value})} checked={this.state.radioValue1 === "cl_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cl_ma" inputId="rb2" onChange={event => this.setState({radioValue1: event.value})} checked={this.state.radioValue1 === "cl_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cl_ra" inputId="rb3" onChange={event => this.setState({radioValue1: event.value})} checked={this.state.radioValue1 === "cl_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Cleanliness</label></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cr_ok" inputId="rb1" onChange={event => this.setState({radioValue2: event.value})} checked={this.state.radioValue2 === "cr_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cr_ma" inputId="rb2" onChange={event => this.setState({radioValue2: event.value})} checked={this.state.radioValue2 === "cr_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cr_ra" inputId="rb3" onChange={event => this.setState({radioValue2: event.value})} checked={this.state.radioValue2 === "cr_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Condition Rust</label></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="dli_ok" inputId="rb1" onChange={event => this.setState({radioValue3: event.value})} checked={this.state.radioValue3 === "dli_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="dli_ma" inputId="rb2" onChange={event => this.setState({ radioValue3: event.value })} checked={this.state.radioValue3 === "dli_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="dli_ra" inputId="rb3" onChange={event => this.setState({ radioValue3: event.value })} checked={this.state.radioValue3 === "dli_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Decals/Livery Intact</label></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wd_ok" inputId="rb1" onChange={event => this.setState({radioValue4: event.value})} checked={this.state.radioValue4 === "wd_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wd_ma" inputId="rb2" onChange={event => this.setState({radioValue4: event.value})} checked={this.state.radioValue4 === "wd_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wd_ra" inputId="rb3" onChange={event => this.setState({radioValue4: event.value})} checked={this.state.radioValue4 === "wd_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Windows/Windscreen</label></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rd_ok" inputId="rb1" onChange={event => this.setState({radioValue5: event.value})} checked={this.state.radioValue5 === "rd_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rd_ma" inputId="rb2" onChange={event => this.setState({radioValue5: event.value})} checked={this.state.radioValue5 === "rd_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rd_ra" inputId="rb3" onChange={event => this.setState({radioValue5: event.value})} checked={this.state.radioValue5 === "rd_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Rear Door</label></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="mi_ok" inputId="rb1" onChange={event => this.setState({radioValue6: event.value})} checked={this.state.radioValue6 === "mi_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="mi_ma" inputId="rb2" onChange={event => this.setState({radioValue6: event.value})} checked={this.state.radioValue6 === "mi_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="mi_ra" inputId="rb3" onChange={event => this.setState({radioValue6: event.value})} checked={this.state.radioValue6 === "mi_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Mirrors</label></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rr_ok" inputId="rb1" onChange={event => this.setState({radioValue7: event.value})} checked={this.state.radioValue7 === "rr_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rr_ma" inputId="rb2" onChange={event => this.setState({radioValue7: event.value})} checked={this.state.radioValue7 === "rr_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rr_ra" inputId="rb3" onChange={event => this.setState({radioValue7: event.value})} checked={this.state.radioValue7 === "rr_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Roof Rack</label></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rs_ok" inputId="rb1" onChange={event => this.setState({radioValue8: event.value})} checked={this.state.radioValue8 === "rs_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rs_ma" inputId="rb2" onChange={event => this.setState({radioValue8: event.value})} checked={this.state.radioValue8 === "rs_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rs_ra" inputId="rb3" onChange={event => this.setState({radioValue8: event.value})} checked={this.state.radioValue8 === "rs_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Rear Step</label></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Interior</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-3">
                                <center><label>Checked and Ok</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>May Require Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>Req. Immediate Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3"></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="se_ok" inputId="rb1" onChange={event => this.setState({radioValue9: event.value})} checked={this.state.radioValue9 === "se_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="se_ma" inputId="rb2" onChange={event => this.setState({radioValue9: event.value})} checked={this.state.radioValue9 === "se_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="se_ra" inputId="rb3" onChange={event => this.setState({radioValue9: event.value})} checked={this.state.radioValue9 === "se_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><label>Seats</label></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="sb_ok" inputId="rb1" onChange={event => this.setState({radioValue10: event.value})} checked={this.state.radioValue10 === "sb_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="sb_ma" inputId="rb2" onChange={event => this.setState({radioValue10: event.value})} checked={this.state.radioValue10 === "sb_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="sb_ra" inputId="rb3" onChange={event => this.setState({radioValue10: event.value})} checked={this.state.radioValue10 === "sb_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Seat Belts</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="psf_ok" inputId="rb1" onChange={event => this.setState({radioValue11: event.value})} checked={this.state.radioValue11 === "psf_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="psf_ma" inputId="rb2" onChange={event => this.setState({radioValue11: event.value})} checked={this.state.radioValue11 === "psf_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="psf_ra" inputId="rb3" onChange={event => this.setState({radioValue11: event.value})} checked={this.state.radioValue11 === "psf_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Power Steering Fluid</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wf_ok" inputId="rb1" onChange={event => this.setState({radioValue12: event.value})} checked={this.state.radioValue12 === "wf_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wf_ma" inputId="rb2" onChange={event => this.setState({radioValue12: event.value})} checked={this.state.radioValue12 === "wf_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wf_ra" inputId="rb3" onChange={event => this.setState({radioValue12: event.value})} checked={this.state.radioValue12 === "wf_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Washer Fluid</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bh_ok" inputId="rb1" onChange={event => this.setState({radioValue13: event.value})} checked={this.state.radioValue13 === "bh_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bh_ma" inputId="rb2" onChange={event => this.setState({radioValue13: event.value})} checked={this.state.radioValue13 === "bh_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bh_ra" inputId="rb3" onChange={event => this.setState({radioValue13: event.value})} checked={this.state.radioValue13 === "bh_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Belts and Hoses</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="afc_ok" inputId="rb1" onChange={event => this.setState({radioValue14: event.value})} checked={this.state.radioValue14 === "afc_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="afc_ma" inputId="rb2" onChange={event => this.setState({radioValue14: event.value})} checked={this.state.radioValue14 === "afc_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="afc_ra" inputId="rb3" onChange={event => this.setState({radioValue14: event.value})} checked={this.state.radioValue14 === "afc_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Antifreeze/Coolant</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="af_ok" inputId="rb1" onChange={event => this.setState({radioValue15: event.value})} checked={this.state.radioValue15 === "af_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="af_ma" inputId="rb2" onChange={event => this.setState({radioValue15: event.value})} checked={this.state.radioValue15 === "af_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="af_ra" inputId="rb3" onChange={event => this.setState({radioValue15: event.value})} checked={this.state.radioValue15 === "af_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Air Filter</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cf_ok" inputId="rb1" onChange={event => this.setState({radioValue16: event.value})} checked={this.state.radioValue16 === "cf_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cf_ma" inputId="rb2" onChange={event => this.setState({radioValue16: event.value})} checked={this.state.radioValue16 === "cf_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cf_ra" inputId="rb3" onChange={event => this.setState({radioValue16: event.value})} checked={this.state.radioValue16 === "cf_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Cabin Filter</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ff_ok" inputId="rb1" onChange={event => this.setState({radioValue17: event.value})} checked={this.state.radioValue17 === "ff_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ff_ma" inputId="rb2" onChange={event => this.setState({radioValue17: event.value})} checked={this.state.radioValue17 === "ff_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ff_ra" inputId="rb3" onChange={event => this.setState({radioValue17: event.value})} checked={this.state.radioValue17 === "ff_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Fuel Filter</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="spw_ok" inputId="rb1" onChange={event => this.setState({radioValue18: event.value})} checked={this.state.radioValue18 === "spw_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="spw_ma" inputId="rb2" onChange={event => this.setState({radioValue18: event.value})} checked={this.state.radioValue18 === "spw_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="spw_ra" inputId="rb3" onChange={event => this.setState({radioValue18: event.value})} checked={this.state.radioValue18 === "spw_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Spark Plugs/ Wires</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ou_ok" inputId="rb1" onChange={event => this.setState({radioValue19: event.value})} checked={this.state.radioValue19 === "ou_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ou_ma" inputId="rb2" onChange={event => this.setState({radioValue19: event.value})} checked={this.state.radioValue19 === "ou_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ou_ra" inputId="rb3" onChange={event => this.setState({radioValue19: event.value})} checked={this.state.radioValue19 === "ou_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Others</label></center></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Battery</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-3">
                                <center><label>Checked and Ok</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>May Require Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>Req. Immediate Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3"></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bch_ok" inputId="rb1" onChange={event => this.setState({radioValue20: event.value})} checked={this.state.radioValue20 === "bch_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bch_ma" inputId="rb2" onChange={event => this.setState({radioValue20: event.value})} checked={this.state.radioValue20 === "bch_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bch_ra" inputId="rb3" onChange={event => this.setState({radioValue20: event.value})} checked={this.state.radioValue20 === "bch_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Battery Charge</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bco_ok" inputId="rb1" onChange={event => this.setState({radioValue21: event.value})} checked={this.state.radioValue21 === "bco_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bco_ma" inputId="rb2" onChange={event => this.setState({radioValue21: event.value})} checked={this.state.radioValue21 === "bco_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bco_ra" inputId="rb3" onChange={event => this.setState({radioValue21: event.value})} checked={this.state.radioValue21 === "bco_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Battery Condition</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cc_ok" inputId="rb1" onChange={event => this.setState({radioValue22: event.value})} checked={this.state.radioValue22 === "cc_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cc_ma" inputId="rb2" onChange={event => this.setState({radioValue22: event.value})} checked={this.state.radioValue22 === "cc_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="cc_ra" inputId="rb3" onChange={event => this.setState({radioValue22: event.value})} checked={this.state.radioValue22 === "cc_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Cables and Connections</label></center></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Under Vehicle</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-3">
                                <center><label>Checked and Ok</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>May Require Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>Req. Immediate Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3"></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="b_ok" inputId="rb1" onChange={event => this.setState({radioValue23: event.value})} checked={this.state.radioValue23 === "b_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="b_ma" inputId="rb2" onChange={event => this.setState({radioValue23: event.value})} checked={this.state.radioValue23 === "b_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="b_ra" inputId="rb3" onChange={event => this.setState({radioValue23: event.value})} checked={this.state.radioValue23 === "b_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Brakes (Pads/Shoes)</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bl_ok" inputId="rb1" onChange={event => this.setState({radioValue24: event.value})} checked={this.state.radioValue24 === "bl_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bl_ma" inputId="rb2" onChange={event => this.setState({radioValue24: event.value})} checked={this.state.radioValue24 === "bl_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="bl_ra" inputId="rb3" onChange={event => this.setState({radioValue24: event.value})} checked={this.state.radioValue24 === "bl_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Brake Lines/ Hoses</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ss_ok" inputId="rb1" onChange={event => this.setState({radioValue25: event.value})} checked={this.state.radioValue25 === "ss_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ss_ma" inputId="rb2" onChange={event => this.setState({radioValue25: event.value})} checked={this.state.radioValue25 === "ss_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ss_ra" inputId="rb3" onChange={event => this.setState({radioValue25: event.value})} checked={this.state.radioValue25 === "ss_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Steering System</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="sas_ok" inputId="rb1" onChange={event => this.setState({radioValue26: event.value})} checked={this.state.radioValue26 === "sas_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="sas_ma" inputId="rb2" onChange={event => this.setState({radioValue26: event.value})} checked={this.state.radioValue26 === "sas_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="sas_ra" inputId="rb3" onChange={event => this.setState({radioValue26: event.value})} checked={this.state.radioValue26 === "sas_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Shocks and Struts</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="d_ok" inputId="rb1" onChange={event => this.setState({radioValue27: event.value})} checked={this.state.radioValue27 === "d_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="d_ma" inputId="rb2" onChange={event => this.setState({radioValue27: event.value})} checked={this.state.radioValue27 === "d_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="d_ra" inputId="rb3" onChange={event => this.setState({radioValue27: event.value})} checked={this.state.radioValue27 === "d_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Driveline</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="es_ok" inputId="rb1" onChange={event => this.setState({radioValue28: event.value})} checked={this.state.radioValue28 === "es_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="es_ma" inputId="rb2" onChange={event => this.setState({radioValue28: event.value})} checked={this.state.radioValue28 === "es_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="es_ra" inputId="rb3" onChange={event => this.setState({radioValue28: event.value})} checked={this.state.radioValue28 === "es_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Exhaust System</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="flh_ok" inputId="rb1" onChange={event => this.setState({radioValue29: event.value})} checked={this.state.radioValue29 === "flh_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="flh_ma" inputId="rb2" onChange={event => this.setState({radioValue29: event.value})} checked={this.state.radioValue29 === "flh_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="flh_ra" inputId="rb3" onChange={event => this.setState({radioValue29: event.value})} checked={this.state.radioValue29 === "flh_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Fuel Lines and Hoses</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ouv_ok" inputId="rb1" onChange={event => this.setState({radioValue30: event.value})} checked={this.state.radioValue30 === "ouv_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ouv_ma" inputId="rb2" onChange={event => this.setState({radioValue30: event.value})} checked={this.state.radioValue30 === "ouv_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="ouv_ra" inputId="rb3" onChange={event => this.setState({radioValue30: event.value})} checked={this.state.radioValue30 === "ouv_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Others</label></center></div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Tires</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-3">
                                <center><label>7/32" or greater</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>3/32" to 6/32"</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>2/32" or less</label></center>
                            </div>
                            <div className="p-col-12 p-md-3"></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="td_7" inputId="rb1" onChange={event => this.setState({radioValue31: event.value})} checked={this.state.radioValue31 === "td_7"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="td_3" inputId="rb2" onChange={event => this.setState({radioValue31: event.value})} checked={this.state.radioValue31 === "td_3"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="td_2" inputId="rb3" onChange={event => this.setState({radioValue31: event.value})} checked={this.state.radioValue31 === "td_2"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Tread Depth</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="lf_7" inputId="rb1" onChange={event => this.setState({radioValue32: event.value})} checked={this.state.radioValue32 === "lf_7"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="lf_3" inputId="rb2" onChange={event => this.setState({radioValue32: event.value})} checked={this.state.radioValue32 === "lf_3"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="lf_2" inputId="rb3" onChange={event => this.setState({radioValue32: event.value})} checked={this.state.radioValue32 === "lf_2"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Left Front</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="lr_7" inputId="rb1" onChange={event => this.setState({radioValue33: event.value})} checked={this.state.radioValue33 === "lr_7"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="lr_3" inputId="rb2" onChange={event => this.setState({radioValue33: event.value})} checked={this.state.radioValue33 === "lr_3"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="lr_2" inputId="rb3" onChange={event => this.setState({radioValue33: event.value})} checked={this.state.radioValue33 === "lr_2"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Left Rear</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rf_7" inputId="rb1" onChange={event => this.setState({radioValue34: event.value})} checked={this.state.radioValue34 === "rf_7"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rf_3" inputId="rb2" onChange={event => this.setState({radioValue34: event.value})} checked={this.state.radioValue34 === "rf_3"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rf_2" inputId="rb3" onChange={event => this.setState({radioValue34: event.value})} checked={this.state.radioValue34 === "rf_2"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Right Front</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rr_7" inputId="rb1" onChange={event => this.setState({radioValue35: event.value})} checked={this.state.radioValue35 === "rr_7"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rr_3" inputId="rb2" onChange={event => this.setState({radioValue35: event.value})} checked={this.state.radioValue35 === "rr_3"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="rr_2" inputId="rb3" onChange={event => this.setState({radioValue35: event.value})} checked={this.state.radioValue35 === "rr_2"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Right Rear</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><label>Checked and Ok</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>May Require Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><label>Req. Immediate Attention</label></center>
                            </div>
                            <div className="p-col-12 p-md-3"></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wplf_ok" inputId="rb1" onChange={event => this.setState({radioValue36: event.value})} checked={this.state.radioValue36 === "wplf_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wplf_ma" inputId="rb2" onChange={event => this.setState({radioValue36: event.value})} checked={this.state.radioValue36 === "wplf_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wplf_ra" inputId="rb3" onChange={event => this.setState({radioValue36: event.value})} checked={this.state.radioValue36 === "wplf_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Wear Pattern LF</label></center></div>
                            
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wprf_ok" inputId="rb1" onChange={event => this.setState({radioValue37: event.value})} checked={this.state.radioValue37 === "wprf_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wprf_ma" inputId="rb2" onChange={event => this.setState({radioValue37: event.value})} checked={this.state.radioValue37 === "wprf_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wprf_ra" inputId="rb3" onChange={event => this.setState({radioValue37: event.value})} checked={this.state.radioValue37 === "wprf_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Wear Pattern RF</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wplr_ok" inputId="rb1" onChange={event => this.setState({radioValue38: event.value})} checked={this.state.radioValue38 === "wplr_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wplr_ma" inputId="rb2" onChange={event => this.setState({radioValue38: event.value})} checked={this.state.radioValue38 === "wplr_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wplr_ra" inputId="rb3" onChange={event => this.setState({radioValue38: event.value})} checked={this.state.radioValue38 === "wplr_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Wear Pattern LR</label></center></div>

                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wprr_ok" inputId="rb1" onChange={event => this.setState({radioValue39: event.value})} checked={this.state.radioValue39 === "wprr_ok"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wprr_ma" inputId="rb2" onChange={event => this.setState({radioValue39: event.value})} checked={this.state.radioValue39 === "wprr_ma"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="wprr_ra" inputId="rb3" onChange={event => this.setState({radioValue39: event.value})} checked={this.state.radioValue39 === "wprr_ra"}/></center>
                            </div>
                            <div className="p-col-12 p-md-3"><center><label>Wear Pattern RR</label></center></div>
                        </div>
                    </div>
                </div>


                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Tire Check</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="Alignment" inputId="cb1" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Alignment') > -1} />
                                <label htmlFor="cb1" className="p-checkbox-label">Alignment</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="Balance" inputId="cb2" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Balance') > -1} />
                                <label htmlFor="cb2" className="p-checkbox-label">Balance</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="Rotation" inputId="cb3" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Rotation') > -1} />
                                <label htmlFor="cb3" className="p-checkbox-label">Rotation</label></center>
                            </div>
                            <div className="p-col-12 p-md-3">
                                <center><Checkbox value="New_Tire" inputId="cb4" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('New_Tire') > -1} />
                                <label htmlFor="cb4" className="p-checkbox-label">New Tire</label></center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title">
                        <h1>Repair Report</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-12">
                                <label>Repair Description:</label>
                                <InputText placeholder="Repair Description"/>
                            </div>
                            <div className="p-col-12 p-md-12">
                                <label>Comments:</label>
                                <InputText placeholder="Comments"/>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <label>Inspected by:</label>
                                <InputText placeholder="Inspected by"/>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <label>Date:</label>
                                <InputText placeholder="Date"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
