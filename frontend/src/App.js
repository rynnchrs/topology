import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppConfig } from './AppConfig';

import { Dashboard } from './components/Dashboard';
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
import {Vehicles} from './components/Vehicles';
import { InspectionReport } from './components/InspectionReport';
import { InspectionReportDriver } from './components/InspectionReportDriver';
import { DriverInspectionReport } from './components/DriverInspectionReport';
//import  DriverRecordForms from './components/DriverRecordForms';


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
                    {label: 'Driver Inspection Report', icon: 'pi pi-fw pi-file', to: '/driverinspectionreport' },
                    {label: 'Inspection Report (Careta)', icon: 'pi pi-fw pi-file', to: '/inspectionreport'},
                    {label: 'Inspection Report (Driver)', icon: 'pi pi-fw pi-file', to: '/forms'},
                    {label: 'Repair Report', icon: 'pi pi-fw pi-file', to: '/empty'},
                ]
        },
        {
            label: 'Records', icon: 'pi pi-fw pi-table',
                items: [
                    //{label: 'Inspection Records', icon: 'pi pi-fw pi-table', to: '/driverrecordforms'},
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

    const logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';

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
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                </div>
            </CSSTransition>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <div className="layout-main">
                <Route path="/" exact component={Dashboard} />
                <Route path="/vehicles" exact component={Vehicles} />
                <Route path="/inspectionreport" exact component={InspectionReport} />
                <Route path="/inspectionreportdriver" exact component={InspectionReportDriver} />
                <Route path="/driverinspectionreport" exact component={DriverInspectionReport} />
                {/*<Route path="/driverrecordforms" exact component={DriverRecordForms} />*/}
            </div>

            <AppFooter />

        </div>
    );

}

export default App;
