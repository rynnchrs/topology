import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppConfig } from './AppConfig';

import PrimeReact from 'primereact/utils';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';
import { Dashboard } from './components/Dashboard';
import { MainDashboard } from './components/MainDashboard';
import { Vehicles } from './components/Vehicles';
import { InspectionReport } from './components/InspectionReport';
import { InspectionReportDriver } from './components/InspectionReportDriver';
import { DriverInspectionReport } from './components/DriverInspectionReport';

import { Register } from './components/Register';
import { EditDeleteUser } from './components/EditDeleteUser';

import  TSManager  from './components/TSManager';
import  DriverRecordForms from './components/DriverRecordForms';

const App = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('dark')
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const sidebar = useRef();
    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden');
        }
        else {
            removeClass(document.body, 'body-overflow-hidden');
        }
    }, [mobileMenuActive]);

    const sidebarMenu = [];
    const sidebarSubMenu1 = [];
    const sidebarSubMenu2 = [];
    
    //sidebarMenu.push({label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'});
    sidebarMenu.push({label: 'MainDashboard', icon: 'pi pi-fw pi-home', to: '/'});
    //users permission
    if (localStorage.getItem("addUsers") === "true") {
        sidebarSubMenu1.push({ label: 'Register User', icon: 'pi pi-user-plus', to: '/register'});
    }
    if (localStorage.getItem("viewUsers") === "true" || localStorage.getItem("editUsers") === "true" || localStorage.getItem("deleteUsers") === "true") {
        sidebarSubMenu1.push({ label: 'Edit-Delete user', icon: 'pi pi-user-edit', to: '/editdeleteuser'});
    }
    if (localStorage.getItem("viewUsers") === "true" || localStorage.getItem("addUsers") === "true" || localStorage.getItem("editUsers") === "true" || localStorage.getItem("deleteUsers") === "true") {
        sidebarMenu.push({label: 'Users Management', icon: 'pi pi-user',items: sidebarSubMenu1});
    } else {
        console.log("permission data none");
    }

    //inventory permission
    // if (localStorage.getItem("addInspectionReport") === "true") {
    //     sidebarSubMenu2.push({label: 'Driver Inspection Report', icon: 'pi pi-file', to: '/driverinspectionreport' });
    // }
    // if (localStorage.getItem("viewInspectionReport") === "true" || localStorage.getItem("editInspectionReport") === "true" || localStorage.getItem("deleteInspectionReport") === "true") {
    //     sidebarSubMenu2.push({label: 'Driver Inspection Records', icon: 'pi pi-file', to: '/driverrecordforms' });
    // }
    if (localStorage.getItem("viewInventory") === "true" || localStorage.getItem("addInventory") === "true" || localStorage.getItem("editInventory") === "true" || localStorage.getItem("deleteInventory") === "true") {
        sidebarMenu.push({label: 'Vehicles Info', icon: 'pi pi-fw pi-align-left', to: '/vehicles'});
    } else {
        console.log("permission data none");
    }

    //inspection permission
    if (localStorage.getItem("addInspectionReport") === "true") {
        sidebarSubMenu2.push({label: 'Driver Inspection Report', icon: 'pi pi-file', to: '/driverinspectionreport' });
    }
    if (localStorage.getItem("viewInspectionReport") === "true" || localStorage.getItem("editInspectionReport") === "true" || localStorage.getItem("deleteInspectionReport") === "true") {
        sidebarSubMenu2.push({label: 'Driver Inspection Records', icon: 'pi pi-file', to: '/driverrecordforms' });
    }
    
    if (localStorage.getItem("viewInspectionReport") === "true" || localStorage.getItem("addInspectionReport") === "true" || localStorage.getItem("editInspectionReport") === "true" || localStorage.getItem("deleteInspectionReport") === "true") {
        sidebarMenu.push({label: 'Inspection Management', icon: 'pi pi-file',items: sidebarSubMenu2});
    } else {
        console.log("permission data none");
    }

    if (localStorage.getItem("viewTask") === "true" || localStorage.getItem("addTask") === "true" || localStorage.getItem("editTask") === "true" || localStorage.getItem("deleteTask") === "true") {
        sidebarMenu.push({label: 'Job Schedule', icon: 'pi pi-fw pi-calendar'});
    } else {
        console.log("permission data none");
    }

    //sidebarMenu.push({label: 'Vehicles Info', icon: 'pi pi-fw pi-align-left', to: '/vehicles'});
    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    }

    const onToggleMenu = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                setOverlayMenuActive(prevState => !prevState);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive(prevState => !prevState);
            }
        }
        else {
            setMobileMenuActive(prevState => !prevState);
        }
        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }

    const menu = [
        {
            label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}
        },
        {
            label: 'Vehicles Info', icon: 'pi pi-fw pi-align-left', to: '/vehicles'
        },
        {
            label: 'Parts Info', icon: 'pi pi-fw pi-briefcase',
                /*items: [
                    {label: 'Dark', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'dark'}) },
                    {label: 'Light', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'light'}) }
                ]*/
        },
        {
             label: 'Reports', icon: 'pi pi-fw pi-file',
                items: [
                    { label: 'Driver Inspection Report', icon: 'pi pi-fw pi-file', to: '/driverinspectionreport' },
                    { label: 'Inspection Report (Careta)', icon: 'pi pi-fw pi-file', to: '/inspectionreport'},
                    { label: 'Inspection Report (Driver)', icon: 'pi pi-fw pi-file', to: '/forms'},
                    { label: 'Repair Report', icon: 'pi pi-fw pi-file', to: '/empty'},
                ]
        },
        {
            label: 'Records', icon: 'pi pi-fw pi-table',
                items: [
                    { label: 'Driver Inspection Records', icon: 'pi pi-fw pi-table', to: '/driverrecordforms' },
                    {label: 'Repair Records', icon: 'pi pi-fw pi-table', to: '/empty'},
                ]
        },
        { label: 'Job Schedule', icon: 'pi pi-fw pi-calendar' },
        { label: 'Drivers List', icon: 'pi pi-fw pi-users'}
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === 'static')
                return !staticMenuInactive;
            else if (layoutMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        }
        return true;
    }

    const logo =  'assets/layout/images/careta-logo.png' ;

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false
    });

    const sidebarClassName = classNames('layout-sidebar', {
        'layout-sidebar-dark': layoutColorMode === 'dark',
        'layout-sidebar-light': layoutColorMode === 'light'
    });

    return (
        
        <div className={wrapperClass} onClick={onWrapperClick}>
            <AppTopbar onToggleMenu={onToggleMenu} />

            <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                    <div className="layout-logo">
                        <img alt="Logo" src={logo} />
                    </div>
                    <AppProfile />
                    {/*<AppMenu model={menu} onMenuItemClick={onMenuItemClick} />*/}
                    <AppMenu model={sidebarMenu} onMenuItemClick={onMenuItemClick} />
                </div>
            </CSSTransition>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <div className="layout-main">
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/" exact component={MainDashboard} />
                <Route path="/register" exact component={Register} />
                <Route path="/editdeleteuser" exact component={EditDeleteUser} />
                <Route path="/vehicles" exact component={Vehicles} />
                <Route path="/driverinspectionreport" exact component={DriverInspectionReport} />
                <Route path="/driverrecordforms" exact component={DriverRecordForms} />
                <Route path="/inspectionreport" exact component={InspectionReport} />
                <Route path="/inspectionreportdriver" exact component={InspectionReportDriver} />
                <Route path="/taskscheduler" exact component={TSManager} />
            </div>

            <AppFooter />

        </div>
               
    );

}

export default App;
