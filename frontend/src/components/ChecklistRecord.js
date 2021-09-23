import React, {useState, useEffect, useRef } from 'react';
// import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { format } from 'date-fns';

export default function ChecklistRecord() {

    //search fields
    // const [searchJobNumber, setSearchJobNumber] = useState("");
    // const searchJobTypeOptions = [{ name: "SHOW ALL", val: "" }, { name: "REPAIR", val: "True" }, { name: "INSPECTION", val: "False" }];
    // const [searchJobType, setSearchJobType] = useState([]);
    // const [searchDateCreated, setSearchDateCreated] = useState(null);

    const [checklistRecordList, setChecklistRecordList] = useState([]);
    const [flagChecklistRecordList, setFlagChecklistRecordList] = useState(false);
    const [checklistRecordDetails, setCheckListRecordDetails] = useState([]);

    const [reportImage, setReportImage] = useState([{ id: "", image: "" }]);

    //paginator
    const [first, setFirst] = useState(0);
    const rows = 10;
    const [flagPages, setFlagPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const dt = useRef(null);
    const toast = useRef(null);

    useEffect(() => {
        /* eslint-disable no-unused-expressions */
        flagChecklistRecordList ? assignChecklistRecordEdit(checklistRecordDetails) : '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flagChecklistRecordList]);

    //for pagination
    useEffect(() => {
        try {
            const sentPage = (first / rows) + 1;

            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };

            axios
                .get(process.env.REACT_APP_SERVER_NAME + 'report/checklist/', config)
                .then((res) => {
                    setTotalCount(res.data.count);
                    setChecklistRecordList(res.data.results);
                })
                .catch((err) => {
                    
                });
        } catch(err) {

        }
    }, [flagPages]); // eslint-disable-line react-hooks/exhaustive-deps

    //for pagination
    const onPageChange = (event) =>  {
        setFirst(event.first);
        if (event.first > first) {
            setFlagPages(flagPages + 1);
        } else if (event.first < first) {
            setFlagPages(flagPages - 1);
        } else {

        }          
    }

    const getCheckListRecordDetails = (value) => {
        let token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axios.get(process.env.REACT_APP_SERVER_NAME + 'report/checklist/' + value + '/', config)
            .then((res) => {
                setCheckListRecordDetails(res.data);
                axios.get(process.env.REACT_APP_SERVER_NAME + 'image/report-image/' + res.data.check_list_id +'/?mode=cl', config)
                    .then((res) => {
                        setReportImage(res.data);
                        setFlagChecklistRecordList(true);
                    })
                    .catch((err) => {
                        
                    });
            })
            .catch((err) => {
                
            });
    }

    const assignChecklistRecordEdit = (value) => {
        console.log(value);
    }

    const dialogFuncMap = {
        
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        
    }

    const renderHeader = () => {
        return (
            <div style={{paddingTop:'1%'}}><h5><b>CHECKLIST RECORDS</b></h5></div>
        );
    }

    const actionBody = (rowData) => {
        return (
            <div>
                <center>
                <Button style={{marginRight: '5%'}} icon="pi pi-pencil" className="p-button-rounded" onClick={() => getCheckListRecordDetails(rowData.check_list_id)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"/>
                </center>
            </div>
        );
    }
    
    return(
        <div>
            <Toast ref={toast}/>
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search Report No." /* value={searchJobNumber} onChange={(event) => setSearchJobNumber(event.target.value)} *//>
                                </span>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <Dropdown placeholder="Select Job Type" /* optionLabel="name"  value={searchJobType} options={searchJobTypeOptions} onChange={event => setSearchJobType(event.target.value)} *//>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <Calendar placeholder="Select Date" /* value={searchDateCreated} onChange={(e) => setSearchDateCreated(e.value)} showIcon *//>
                            </div>
                            <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                                <div className="p-d-flex">
                                    <div className="p-mr-3"><Button label="SEARCH" icon="pi pi-search" /* onClick={() => submitSearch()} *//></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <DataTable ref={dt} header={renderHeader()} value={checklistRecordList} className="p-datatable-sm" 
                        resizableColumns columnResizeMode="expand" emptyMessage="No records found">
                        <Column field="check_list_id" header="Checklist No." style={{ paddingLeft: '3%' }}></Column>
                        <Column body={actionBody}></Column>
                    </DataTable>
                    <Paginator first={first} rows={rows} totalRecords={totalCount} onPageChange={onPageChange}></Paginator>
                </div>
            </div>

        </div>
    )

}