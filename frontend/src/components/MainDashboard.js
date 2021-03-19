import React, { useRef, useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';


export const MainDashboard = () => {

    const [datas, setDatas] = useState([{ name: 'Plate Delivery No.', withdate: '184', notyetreleased: '99', norcv: '33' }, 
    { name: 'Modified Decals', withdate: '102', notyetreleased: '120', norcv: '45' },
    { name: 'EWD', withdate: '102', notyetreleased: '120', norcv: '45' },
    { name: 'Fan', withdate: '102', notyetreleased: '120', norcv: '45' },
    { name: 'Tools', withdate: '102', notyetreleased: '120', norcv: '45' },
    { name: "User's Manual", withdate: '102', notyetreleased: '120', norcv: '45' }
    ]);

    const [expiry1, setExpiry1] = useState([
        { month: 'January', or: '184', cr: '99', tpl: '33', compre: '33' }, 
        { month: 'February', or: '184', cr: '99', tpl: '33', compre: '33' },
        { months: 'EWD', withdate: '102', notyetreleased: '120', norcv: '45' },
        { months: 'Fan', withdate: '102', notyetreleased: '120', norcv: '45' },
        { months: 'Tools', withdate: '102', notyetreleased: '120', norcv: '45' },
        { months: "User's Manual", withdate: '102', notyetreleased: '120', norcv: '45' }
    ]);


    const items = [
        {label: '2019', icon: 'pi pi-fw pi-calendar'},
        {label: '2020', icon: 'pi pi-fw pi-calendar'},
        {label: '2021', icon: 'pi pi-fw pi-calendar'}
    ];

    const [activeIndex, setActiveIndex] = useState(1);

    const dt = useRef(null);

    return (
        <div className="p-grid p-fluid" >
            <div className="p-col-12 p-grid nested-grid">
                <div className="p-col-12 p-lg-6 p-md-6 p-sm-4 ">
                <h2>DATA</h2>
                <div className="datatable-doc-demo">
                    <DataTable ref={dt} value={datas} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                        emptyMessage="No users found.">
                        <Column field="name" header="Name" style={{ paddingLeft: '2%' }}></Column>
                        <Column field="withdate" header="WITH DATE"></Column>
                        <Column field="notyetreleased" header="NOT YET RELEASED"></Column>
                        <Column field="norcv" header="NO RECEIVING COPY"></Column>
                        {/* <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column> */}
                    </DataTable>
                    </div>
                </div>

                <div className="p-col-12 p-lg-6 p-md-6 p-sm-4">
                <h2>EXPIRY</h2>
                    <div className="p-grid">
                        <div className="p-col-12">
                            <div className="card">
                                <TabView>
                                    <TabPanel header="2019">
                                        <DataTable ref={dt} value={expiry1} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                            emptyMessage="No users found.">
                                            <Column field="month" header="Month" style={{ paddingLeft: '2%' }}></Column>
                                            <Column field="or" header="OR"></Column>
                                            <Column field="cr" header="CR"></Column>
                                            <Column field="tpl" header="TPL Insurance"></Column>
                                            <Column field="tpl" header="Comprehensive Insurance"></Column>
                                            {/* <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column> */}
                                        </DataTable>
                                    </TabPanel>
                                    <TabPanel header="2020">
                                        <DataTable ref={dt} value={datas} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                            emptyMessage="No users found.">
                                            <Column field="name" header="Name" style={{ paddingLeft: '2%' }}></Column>
                                            <Column field="withdate" header="WITH DATE"></Column>
                                            <Column field="notyetreleased" header="NOT YET RELEASED"></Column>
                                            <Column field="norcv" header="NO RECEIVING COPY"></Column>
                                            {/* <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column> */}
                                        </DataTable>
                                    </TabPanel>
                                    <TabPanel header="2021">
                                        <DataTable ref={dt} value={datas} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                                            emptyMessage="No users found.">
                                            <Column field="name" header="Name" style={{ paddingLeft: '2%' }}></Column>
                                            <Column field="withdate" header="WITH DATE"></Column>
                                            <Column field="notyetreleased" header="NOT YET RELEASED"></Column>
                                            <Column field="norcv" header="NO RECEIVING COPY"></Column>
                                            {/* <Column body={actionBody} header="Action (Delete)" style={{ textAlign: 'center' }}></Column> */}
                                        </DataTable>
                                    </TabPanel>
                                </TabView>
                            </div>
                        </div>
                        
                    </div>
                </div>

            {/* </div> */}

            {/* <div className="p-col-12 p-grid nested-grid dashboard" style={{paddingTop:'3%'}}> */}
                <div className="p-col-12 p-lg-4 p-md-6 p-sm-4 dashboard" style={{backgroundColor:'white'}}>
                <h5>DATA</h5>
                    <ul className='task-list'>
                        <li>
                            <div className="p-shadow-1"style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(144,207,254,1) 100%)', border: '1px solid #eeeeee', borderRadius:'15px'}}>
                                <div style={{fontFamily:'Arial', fontWeight:'bold', fontSize:'25px', padding:'3%'}}>Plate No. Delivery</div>
                                    <div className="p-col-12">
                                        <div className="p-grid p-fluid">
                                            {/* <div className="p-col" style={{fontFamily:'arial narrow', color:'blue', padding:'3%'}}> {'\u2B24'} WITH DATE </div> */}
                                            <div className="p-col-12" style={{fontFamily:'Arial', fontWeight:'780', fontSize:'16px', color:'#00008b', paddingLeft:'3%'}}>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(178,182,255,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                    <label style={{float:'left'}}>{'➣'} WITH DATE </label>
                                                    <label style={{float:'right'}}> 200 </label>
                                                 </div>
                                                 <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(178,182,255,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                        <label style={{float:'left'}}>{'➣'} NOT YET RELEASED </label>
                                                        <label style={{float:'right'}}> 23 </label>
                                                </div>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(178,182,255,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                        <label style={{float:'left'}}>{'➣'} NO RECEIVING COPY </label>
                                                        <label style={{float:'right'}}> 180 </label>
                                                </div>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(178,182,255,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                        <label style={{float:'left'}}>{'➣'} DID NOT RECEIVE </label>
                                                        <label style={{float:'right'}}> 88 </label>
                                                </div>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(178,182,255,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                        <label style={{float:'left'}}>{'➣'} TOTAL </label>
                                                        <label style={{float:'right'}}> 296 </label>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                        <div className="p-shadow-1"style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(255,211,121,1) 100%)', border: '1px solid #eeeeee', borderRadius:'15px'}}>
                                <div style={{fontFamily:'Arial', fontWeight:'bold', fontSize:'25px', padding:'3%'}}>Modified Decals</div>
                                    <div className="p-col-12">
                                        <div className="p-grid p-fluid">
                                            {/* <div className="p-col" style={{fontFamily:'arial narrow', color:'blue', padding:'3%'}}> {'\u2B24'} WITH DATE </div> */}
                                            <div className="p-col-12" style={{fontFamily:'Courier', fontWeight:'900', fontSize:'16px', color:'#975601', paddingLeft:'3%'}}>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(252,200,95,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                    <label style={{float:'left'}}>{'➣'} WITH DATE </label>
                                                    <label style={{float:'right'}}> 200 </label>
                                                 </div>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(252,200,95,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                        <label style={{float:'left'}}>{'➣'} NOT YET RELEASED </label>
                                                        <label style={{float:'right'}}> 23 </label>
                                                </div>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(252,200,95,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                        <label style={{float:'left'}}>{'➣'} NO RECEIVING COPY </label>
                                                        <label style={{float:'right'}}> 180 </label>
                                                </div>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(252,200,95,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                        <label style={{float:'left'}}>{'➣'} DID NOT RECEIVE </label>
                                                        <label style={{float:'right'}}> 88 </label>
                                                </div>
                                                <div  style={{background: 'linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(252,200,95,1) 100%)', borderBottom: '1px solid #eeeeee', overflow: 'auto'}}>
                                                        <label style={{float:'left'}}>{'➣'} TOTAL </label>
                                                        <label style={{float:'right'}}> 296 </label>
                                                </div>
                                            </div>
                                        </div>
                                 </div>
                         </div>
                        
                        </li>
                        <li>
                            <Checkbox name="task" value="dinner" />
                            <span className="task-name">Dinner with Tony</span>
                            <i className="pi pi-user" />
                        </li>
                        <li>
                            <Checkbox name="task" value="meeting" />
                            <span className="task-name">Client Meeting</span>
                            <i className="pi pi-users" />
                        </li>
                        <li>
                            <Checkbox name="task" value="theme"/>
                            <span className="task-name">New Theme</span>
                            <i className="pi pi-globe" />
                        </li>
                        <li>
                            <Checkbox name="task" value="flight" />
                            <span className="task-name">Flight Ticket</span>
                            <i className="pi pi-briefcase" />
                        </li>
                    </ul>
                </div>

                <div className="p-col-12 p-lg-8 p-md-6 p-sm-4">
                    <div className="p-grid">
                        <div className="p-col-6">
                            <div className="card">
                                <span className="title">Users</span>
                                <span className="detail">Number of visitors</span>
                                <span className="count visitors">12</span>
                            </div>
                        </div>
                        <div className="p-col-6">
                            <div className="card">
                                <span className="title">Users</span>
                                <span className="detail">Number of visitors</span>
                                <span className="count visitors">12</span>
                            </div>
                        </div>
                        <div className="p-col-6 ">
                            <div className="card">
                                <span className="title">Users</span>
                                <span className="detail">Number of visitors</span>
                                <span className="count visitors">12</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            
            



        </div>

        

    )

}

export default MainDashboard;