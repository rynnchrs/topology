import React, {useState, useEffect, useRef } from 'react';
import { ListBox } from 'primereact/listbox';
import { InputText } from 'primereact/inputtext';
import axios from "axios";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { format, isToday } from 'date-fns';
import './mycss.scss';

export default function DriverRecordForms() {
        const [selectedCar, setSelectedCar] = useState([]);
        //const [selectedBody, setSelectedBody] = useState(['']);
        const [selectedBody, setSelectedBody] = useState([]);
        const [carValues, setcarValues] = useState([]);
        const [displayBasic, setDisplayBasic] = useState(false);
        const [displayBasic2, setDisplayBasic2] = useState(false);
        const [position, setPosition] = useState('center');
        const [date2, setDate2] = useState(null);
        const [selectedLocation, setSelectedLocation] = useState(null);
        const cities = [
        { name: 'All Location', code: '' },
        { name: 'Marikina', code: 'Marikina' },
        { name: 'South Manila', code: 'South+Manila' },
        { name: 'North Manila', code: 'North+Manila' },
        { name: 'Mandaluyong', code: 'Mandaluyong' },
        { name: 'Quezon', code: 'Quezon' },
        { name: 'Makati', code: 'Makati' },
        { name: 'Batangas', code: 'Batangas' },
        { name: 'Pampanga', code: 'Pampanga' },
        { name: 'Laguna', code: 'Laguna' },
        { name: 'Tarlac', code: 'Tarlac' },
        { name: 'Nueva Ecija', code: 'Nueva+Ecija' },
        { name: 'Pangasinan', code: 'Pangasinan' },
        { name: 'Las Pinas', code: 'Las+Pinas' },
        { name: 'Bataan', code: 'Bataan' },
        { name: 'Zambales', code: 'Zambales' },
        ];

        const [selected, setSelected] = useState(null);
        const [globalFilter, setGlobalFilter] = useState(null);
        const dt = useRef(null);
        const toast = useRef(null);

        //const [cloneSelectedCar, setCloneSelectedCar] = useState([]);
        const [mil, setMileage] = useState("");

        const [cleanlinessExterior, isCleanlinessExterior] = useState(false);
        const [conditionRust, isConditionRust] = useState(false);
        const [decals, isDecals] = useState(false);
        const [windows, isWindows] = useState(false);
        const [rearDoor, isRearDoor] = useState(false);
        const [mirror, isMirror] = useState(false);
        const [roofRack, isRoofRack] = useState(false);
        const [rearStep, isRearStep] = useState(false);

        const [seats, isSeats] = useState(false);
        const [seatBelts, isSeatBelts] = useState(false);
        const [generalCondition, isGeneralCondition] = useState(false);
        const [vehicleDocuments, isVehicleDocuments] = useState(false);

        const [cleanlinessEngineBay, isCleanlinessEngineBay] = useState(false);
        const [washerFluid, isWasherFluid] = useState(false);
        const [coolantLevel, isCoolantLevel] = useState(false);
        const [brakeFluidLevel, isBrakeFluidLevel] = useState(false);
        const [powerSteeringFluid, isPowerSteeringFluid] = useState(false);

        const [mainBeam, isMainBeam] = useState(false);
        const [dippedBeam, isDippedBeam] = useState(false);
        const [sideLights, isSideLights] = useState(false);
        const [tailLights, isTailLights] = useState(false);
        const [indicators, isIndicators] = useState(false);
        const [breakLights, isBreakLights] = useState(false);
        const [reverseLights, isReverseLights] = useState(false);
        const [hazardLights, isHazardLights] = useState(false);
        const [rearFogLights, isRearFogLights] = useState(false);
        const [interiorLights, isInteriorLights] = useState(false);
        const [screenWasher, isScreenWashers] = useState(false);
        const [wiperBlades, isWiperBlades] = useState(false);
        const [horn, isHorn] = useState(false);
        const [radio, isRadio] = useState(false);
        const [frontFogLights, isFrontFogLights] = useState(false);
        const [airConditioning, isAirConditioning] = useState(false);

        const [tyres, isTyres] = useState(false);
        const [frontVisual, isFrontVisual] = useState(false);
        const [rearVisual, isRearVisual] = useState(false);
        const [spareVisual, isSpareVisual] = useState(false);
        const [wheelBrace, isWheelBrace] = useState(false);
        const [jack, isJack] = useState(false);
        const [frontLeftWheel, isFrontLeftWheel] = useState(false);
        const [frontRightWheel, isFrontRightWheel] = useState(false);
        const [rearLeftWheel, isRearLeftWheel] = useState(false);
        const [rearRightWheel, isRearRightWheel] = useState(false);

        const [gasLevel, isGasLevel] = useState("");
        const [oilLevel, isOilLevel] = useState("");
        const [notes, isNotes] = useState("");

        const [notOkay, setNotOkay] = useState(Array(46).fill(""));
        const [okay, setOkay] = useState(Array(46).fill(""));
        const [gas, setGas] = useState(Array(5).fill(""));
        const [oil, setOil] = useState(Array(5).fill(""));
        const [editNotes, setEditNotes] = useState("");
        const [smallNotes, setSmallNotes] = useState("");
        const [editMileage, setEditMileage] = useState("");
        const [smallMileage, setSmallMileage] = useState("");

        React.useEffect(function effectFunction() {
            let token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                };
            fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/?ordering=-inspection_id',config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
        }, []);

        useEffect(() => {
            try{
                console.log("test",selectedCar )
                revised();
            }catch(err){
                console.log("revised error")
                console.log(err)
            }
        }, [selectedCar]);

        // React.useEffect(() => {
        //     console.log(selectedCar)
        //     if (selectedCar) {
        //         let token = localStorage.getItem("token");
        //         const config = {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer ' + token,
        //             },
        //         };
        //         console.log(selectedCar.inspection_id);
        //         fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection/'+ selectedCar.inspection_id + "/",config)
        //             .then(response => response.json())
        //             .then(data => {
        //                 setSelectedCar(data);
        //                 setSelectedBody(data.body_no,onClick('displayBasic'));
                        
        //             });
        //     }
        // }, [selectedCar.inspection_id]);

        const dialogFuncMap = {
            'displayBasic': setDisplayBasic,
            'displayBasic2': setDisplayBasic2,
        }

        const onClick = (name, position) => {
            if (selected != null) {
                //console.log(selected.inspection_id);
                //getInspectionData();
                dialogFuncMap[`${name}`](true);
                if (position) {
                    setPosition(position);
                }
            } else {
                console.log("no selected");
                toast.current.show({ severity: 'error', summary: 'No Selected', detail: 'Please select a row in table first to edit.', life: 5000 });
            }
        }
    
        const onHide = (name) => {
            dialogFuncMap[`${name}`](false);
            setSelectedCar([]);
            setNotOkay([]);
            setOkay([]);
            setGas([]);
            setOil([]);
            setSmallNotes("");
            setEditNotes("");
            setSmallMileage("");
            setEditMileage("");
        }

        const getInspectionData = () => {
            if (selected != null) {
                let token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                };
                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection/'+ selected.inspection_id + "/",config)
                .then(response => response.json())
                .then(data => {
                    setSelectedCar(data);
                    setSelectedBody(data.body_no);
                    onClick('displayBasic');
                })
                .catch((error) => {
                    console.log('error: ');
                    console.log(error);
                });
            } else {
                console.log("no selected");
                toast.current.show({ severity: 'error', summary: 'No Selected', detail: 'Please select a row in table first to edit.', life: 5000 });
            }
        }

        const getInspectionData2 = () => {
            if (selected != null) {
                let token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                };
                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection/'+ selected.inspection_id + "/",config)
                .then(response => response.json())
                .then(data => {
                    setSelectedCar(data);
                    setSelectedBody(data.body_no);
                    onClick('displayBasic2');
                })
                .catch((error) => {
                    console.log('error: ');
                    console.log(error);
                });
            } else {
                console.log("no selected");
                toast.current.show({ severity: 'error', summary: 'No Selected', detail: 'Please select a row in table first to edit.', life: 5000 });
            }
        }

        const revised = () => {
            /* eslint-disable no-unused-expressions */
            setMileage(selectedCar.mileage);
            isCleanlinessExterior(selectedCar.cleanliness_exterior);
            isConditionRust(selectedCar.condition_rust);
            isDecals(selectedCar.decals);
            isWindows(selectedCar.windows);
            isRearDoor(selectedCar.rear_door);
            isMirror(selectedCar.mirror);
            isRoofRack(selectedCar.roof_rack);
            isRearStep(selectedCar.rear_step);

            isSeats(selectedCar.seats);
            isSeatBelts(selectedCar.seat_belts);
            isGeneralCondition(selectedCar.general_condition);
            isVehicleDocuments(selectedCar.vehicle_documents);

            isCleanlinessEngineBay(selectedCar.cleanliness_engine_bay);
            isWasherFluid(selectedCar.washer_fluid);
            isCoolantLevel(selectedCar.coolant_level);
            isBrakeFluidLevel(selectedCar.brake_fluid_level);
            isPowerSteeringFluid(selectedCar.power_steering_fluid);

            isMainBeam(selectedCar.main_beam);
            isDippedBeam(selectedCar.dipped_beam);
            isSideLights(selectedCar.side_lights);
            isTailLights(selectedCar.tail_lights);
            isIndicators(selectedCar.indicators);
            isBreakLights(selectedCar.break_lights);
            isReverseLights(selectedCar.reverse_lights);
            isHazardLights(selectedCar.hazard_light);
            isRearFogLights(selectedCar.rear_fog_lights);
            isInteriorLights(selectedCar.interior_lights);
            isScreenWashers(selectedCar.screen_washer);
            isWiperBlades(selectedCar.wiper_blades);
            isHorn(selectedCar.horn);
            isRadio(selectedCar.radio);
            isFrontFogLights(selectedCar.front_fog_lights);
            isAirConditioning(selectedCar.air_conditioning);

            isTyres(selectedCar.tyres);
            isFrontVisual(selectedCar.front_visual);
            isRearVisual(selectedCar.rear_visual);
            isSpareVisual(selectedCar.spare_visual);
            isWheelBrace(selectedCar.wheel_brace);
            isJack(selectedCar.jack);
            isFrontLeftWheel(selectedCar.front_left_wheel);
            isFrontRightWheel(selectedCar.front_right_wheel);
            isRearLeftWheel(selectedCar.rear_left_wheel);
            isRearRightWheel(selectedCar.rear_right_wheel);

            isGasLevel(selectedCar.gas_level);
            isOilLevel(selectedCar.oil_level);

            isNotes(selectedCar.notes);
            console.log("revised")
            console.log(selectedCar.revised.mileage)
            selectedCar.revised.mileage ? (setMileage(selectedCar.revised.mileage), onCheckboxChange(selectedCar.revised.mileage, "mil")) : '';
            if (typeof(selectedCar.revised.cleanliness_exterior) !== 'undefined' && selectedCar.revised.cleanliness_exterior !== selectedCar.cleanliness_exterior) {  isCleanlinessExterior(selectedCar.revised.cleanliness_exterior); onCheckboxChange(selectedCar.revised.cleanliness_exterior, "cb0"); } 
            if (typeof(selectedCar.revised.condition_rust) !== 'undefined' && selectedCar.revised.condition_rust !== selectedCar.condition_rust) { isConditionRust(selectedCar.revised.condition_rust); onCheckboxChange(selectedCar.revised.condition_rust, 'cb1'); }
            if (typeof(selectedCar.revised.decals) !== 'undefined' && selectedCar.revised.decals !== selectedCar.decals) { isDecals(selectedCar.revised.decals); onCheckboxChange(selectedCar.revised.decals, "cb2"); }
            if (typeof(selectedCar.revised.windows) !== 'undefined' && selectedCar.revised.windows !== selectedCar.windows) { isWindows(selectedCar.revised.windows); onCheckboxChange(selectedCar.revised.windows, "cb3"); }
            if (typeof(selectedCar.revised.rear_door) !== 'undefined' &&  selectedCar.revised.rear_door !== selectedCar.rear_door) { isRearDoor(selectedCar.revised.rear_door); onCheckboxChange(selectedCar.revised.rear_door, "cb4"); }
            if (typeof(selectedCar.revised.mirror) !== 'undefined' &&  selectedCar.revised.mirror !== selectedCar.mirror) { isMirror(selectedCar.revised.mirror); onCheckboxChange(selectedCar.revised.mirror, "cb5"); }
            if (typeof(selectedCar.revised.roof_rack) !== 'undefined'  && selectedCar.revised.roof_rack !== selectedCar.roof_rack) { isRoofRack(selectedCar.revised.roof_rack); onCheckboxChange(selectedCar.revised.roof_rack, "cb6"); }
            if (typeof(selectedCar.revised.rear_step) !== 'undefined'  && selectedCar.revised.rear_step !== selectedCar.rear_step) { isRearStep(selectedCar.revised.rear_step); onCheckboxChange(selectedCar.revised.rear_step, "cb7"); }
            
            if (typeof(selectedCar.revised.seats) !== 'undefined'  && selectedCar.revised.seats !== selectedCar.seats) { isSeats(selectedCar.revised.seats); onCheckboxChange(selectedCar.revised.seats, "cb8"); }
            if (typeof(selectedCar.revised.seat_belts) !== 'undefined'  && selectedCar.revised.seat_belts !== selectedCar.seat_belts) { isSeatBelts(selectedCar.revised.seat_belts); onCheckboxChange(selectedCar.revised.seat_belts, "cb9"); }
            if (typeof(selectedCar.revised.general_condition) !== 'undefined'  && selectedCar.revised.general_condition !== selectedCar.general_condition) { isGeneralCondition(selectedCar.revised.general_condition); onCheckboxChange(selectedCar.revised.general_condition, "cb10"); }
            if (typeof(selectedCar.revised.vehicle_documents) !== 'undefined'  && selectedCar.revised.vehicle_documents !== selectedCar.vehicle_documents) { isVehicleDocuments(selectedCar.revised.vehicle_documents); onCheckboxChange(selectedCar.revised.vehicle_documents, "cb11"); }
            
            if (typeof(selectedCar.revised.cleanliness_engine_bay) !== 'undefined'  && selectedCar.revised.cleanliness_engine_bay !== selectedCar.cleanliness_engine_bay) { isCleanlinessEngineBay(selectedCar.revised.cleanliness_engine_bay); onCheckboxChange(selectedCar.revised.cleanliness_engine_bay, "cb12"); }
            if (typeof(selectedCar.revised.washer_fluid) !== 'undefined'  && selectedCar.revised.washer_fluid !== selectedCar.washer_fluid) { isWasherFluid(selectedCar.revised.washer_fluid); onCheckboxChange(selectedCar.revised.washer_fluid, "cb13"); }
            if (typeof(selectedCar.revised.coolant_level) !== 'undefined'  && selectedCar.revised.coolant_level !== selectedCar.coolant_level) { isCoolantLevel(selectedCar.revised.coolant_level); onCheckboxChange(selectedCar.revised.coolant_level, "cb14"); }
            if (typeof(selectedCar.revised.brake_fluid_level) !== 'undefined'  && selectedCar.revised.brake_fluid_level !== selectedCar.brake_fluid_level) { isBrakeFluidLevel(selectedCar.revised.brake_fluid_level); onCheckboxChange(selectedCar.revised.brake_fluid_level, "cb15"); }
            if (typeof(selectedCar.revised.power_steering_fluid) !== 'undefined'  && selectedCar.revised.power_steering_fluid !== selectedCar.power_steering_fluid) { isPowerSteeringFluid(selectedCar.revised.power_steering_fluid); onCheckboxChange(selectedCar.revised.power_steering_fluid, "cb16"); }
            
            if (typeof(selectedCar.revised.main_beam) !== 'undefined'  && selectedCar.revised.main_beam !== selectedCar.main_beam) { isMainBeam(selectedCar.revised.main_beam); onCheckboxChange(selectedCar.revised.main_beam, "cb17"); }
            if (typeof(selectedCar.revised.dipped_beam) !== 'undefined'  && selectedCar.revised.dipped_beam !== selectedCar.dipped_beam) { isDippedBeam(selectedCar.revised.dipped_beam); onCheckboxChange(selectedCar.revised.dipped_beam, "cb18"); }
            if (typeof(selectedCar.revised.side_lights) !== 'undefined'  && selectedCar.revised.side_lights !== selectedCar.side_lights) { isSideLights(selectedCar.revised.side_lights); onCheckboxChange(selectedCar.revised.side_lights, "cb19"); }
            if (typeof(selectedCar.revised.tail_lights) !== 'undefined'  && selectedCar.revised.tail_lights !== selectedCar.tail_lights) { isTailLights(selectedCar.revised.tail_lights); onCheckboxChange(selectedCar.revised.tail_lights, "cb20"); }
            if (typeof(selectedCar.revised.indicators) !== 'undefined'  && selectedCar.revised.indicators !== selectedCar.indicators) { isIndicators(selectedCar.revised.indicators); onCheckboxChange(selectedCar.revised.indicators, "cb21"); }
            if (typeof(selectedCar.revised.break_lights) !== 'undefined'  && selectedCar.revised.break_lights !== selectedCar.break_lights) { isBreakLights(selectedCar.revised.break_lights); onCheckboxChange(selectedCar.revised.break_lights, "cb22"); }
            if (typeof(selectedCar.revised.reverse_lights) !== 'undefined'  && selectedCar.revised.reverse_lights !== selectedCar.reverse_lights) { isReverseLights(selectedCar.revised.reverse_lights); onCheckboxChange(selectedCar.revised.reverse_lights, "cb23"); }
            if (typeof(selectedCar.revised.hazard_light) !== 'undefined'  && selectedCar.revised.hazard_light !== selectedCar.hazard_light) { isHazardLights(selectedCar.revised.hazard_light); onCheckboxChange(selectedCar.revised.hazard_light, "cb24"); }
            if (typeof(selectedCar.revised.rear_fog_lights) !== 'undefined'  && selectedCar.revised.rear_fog_lights !== selectedCar.rear_fog_lights) { isRearFogLights(selectedCar.revised.rear_fog_lights); onCheckboxChange(selectedCar.revised.rear_fog_lights, "cb25"); }
            if (typeof(selectedCar.revised.interior_lights) !== 'undefined'  && selectedCar.revised.interior_lights !== selectedCar.interior_lights) { isInteriorLights(selectedCar.revised.interior_lights); onCheckboxChange(selectedCar.revised.interior_lights, "cb26"); }
            if (typeof(selectedCar.revised.screen_washer) !== 'undefined'  && selectedCar.revised.screen_washer !== selectedCar.screen_washer) { isScreenWashers(selectedCar.revised.screen_washer); onCheckboxChange(selectedCar.revised.screen_washer, "cb27"); }
            if (typeof(selectedCar.revised.wiper_blades) !== 'undefined'  && selectedCar.revised.wiper_blades !== selectedCar.wiper_blades) { isWiperBlades(selectedCar.revised.wiper_blades); onCheckboxChange(selectedCar.revised.wiper_blades, "cb28"); }
            if (typeof(selectedCar.revised.horn) !== 'undefined'  && selectedCar.revised.horn !== selectedCar.horn) { isHorn(selectedCar.revised.horn); onCheckboxChange(selectedCar.revised.horn, "cb29"); }
            if (typeof(selectedCar.revised.radio) !== 'undefined'  && selectedCar.revised.radio !== selectedCar.radio) { isRadio(selectedCar.revised.radio); onCheckboxChange(selectedCar.revised.radio, "cb30"); }
            if (typeof(selectedCar.revised.front_fog_lights) !== 'undefined'  && selectedCar.revised.front_fog_lights !== selectedCar.front_fog_lights) { isFrontFogLights(selectedCar.revised.front_fog_lights); onCheckboxChange(selectedCar.revised.front_fog_lights, "cb31"); }
            if (typeof(selectedCar.revised.air_conditioning) !== 'undefined'  && selectedCar.revised.air_conditioning !== selectedCar.air_conditioning) { isAirConditioning(selectedCar.revised.air_conditioning); onCheckboxChange(selectedCar.revised.air_conditioning, "cb32"); }
            
            if (typeof(selectedCar.revised.tyres) !== 'undefined'  && selectedCar.revised.tyres !== selectedCar.tyres) { isTyres(selectedCar.revised.tyres); onCheckboxChange(selectedCar.revised.tyres, "cb33"); }
            if (typeof(selectedCar.revised.front_visual) !== 'undefined'  && selectedCar.revised.front_visual !== selectedCar.front_visual) { isFrontVisual(selectedCar.revised.front_visual); onCheckboxChange(selectedCar.revised.front_visual, "cb34"); }
            if (typeof(selectedCar.revised.rear_visual) !== 'undefined'  && selectedCar.revised.rear_visual !== selectedCar.rear_visual) { isRearVisual(selectedCar.revised.rear_visual); onCheckboxChange(selectedCar.revised.rear_visual, "cb35"); }
            if (typeof(selectedCar.revised.spare_visual) !== 'undefined'  && selectedCar.revised.spare_visual !== selectedCar.spare_visual) { isSpareVisual(selectedCar.revised.spare_visual); onCheckboxChange(selectedCar.revised.spare_visual, "cb36"); }
            if (typeof(selectedCar.revised.wheel_brace) !== 'undefined'  && selectedCar.revised.wheel_brace !== selectedCar.wheel_brace) { isWheelBrace(selectedCar.revised.wheel_brace); onCheckboxChange(selectedCar.revised.wheel_brace, "cb37"); }
            if (typeof(selectedCar.revised.jack) !== 'undefined'  && selectedCar.revised.jack !== selectedCar.jack) { isJack(selectedCar.revised.jack); onCheckboxChange(selectedCar.revised.jack, "cb38"); }
            if (typeof(selectedCar.revised.front_left_wheel) !== 'undefined'  && selectedCar.revised.front_left_wheel !== selectedCar.front_left_wheel) { isFrontLeftWheel(selectedCar.revised.front_left_wheel); onCheckboxChange(selectedCar.revised.front_left_wheel, "cb39"); }
            if (typeof(selectedCar.revised.front_right_wheel) !== 'undefined'  && selectedCar.revised.front_right_wheel !== selectedCar.front_right_wheel) { isFrontRightWheel(selectedCar.revised.front_right_wheel); onCheckboxChange(selectedCar.revised.front_right_wheel, "cb40"); }
            if (typeof(selectedCar.revised.rear_left_wheel) !== 'undefined'  && selectedCar.revised.rear_left_wheel !== selectedCar.rear_left_wheel) { isRearLeftWheel(selectedCar.revised.rear_left_wheel); onCheckboxChange(selectedCar.revised.rear_left_wheel, "cb41"); }
            if (typeof(selectedCar.revised.rear_right_wheel) !== 'undefined'  && selectedCar.revised.rear_right_wheel !== selectedCar.rear_right_wheel) { isRearRightWheel(selectedCar.revised.rear_right_wheel); onCheckboxChange(selectedCar.revised.rear_right_wheel, "cb42"); }
            
            selectedCar.revised.gas_level ? (isOilLevel(selectedCar.revised.gas_level), onCheckboxChange(selectedCar.revised.gas_level, "g"+selectedCar.revised.gas_level)) : '';
            selectedCar.revised.oil_level ? (isOilLevel(selectedCar.revised.oil_level), onCheckboxChange(selectedCar.revised.oil_level, "o"+selectedCar.revised.oil_level)) : '';
            selectedCar.revised.notes ? (isNotes(selectedCar.revised.notes), onCheckboxChange(selectedCar.revised.notes, "n")) : '';
            
        }

        const submitData = () => {
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            };
            axios.put(process.env.REACT_APP_SERVER_NAME + 'api/inspection/'+ selected.inspection_id + "/", {
                //car: this.state.bn.car_id,
                body_no: selectedBody.body_no,
                make: selectedBody.make,
                mileage: mil,
                location: selectedBody.current_loc,
                cleanliness_exterior: cleanlinessExterior,
                condition_rust: conditionRust,
                decals: decals,
                windows: windows,
                rear_door: rearDoor,
                mirror: mirror,
                roof_rack: roofRack,
                rear_step: rearStep,
                seats: seats,
                seat_belts: seatBelts,
                general_condition: generalCondition,
                vehicle_documents: vehicleDocuments,
                main_beam: mainBeam,
                dipped_beam: dippedBeam,
                side_lights: sideLights,
                tail_lights: tailLights,
                indicators: indicators,
                break_lights: breakLights,
                reverse_lights: reverseLights,
                hazard_light: hazardLights,
                rear_fog_lights: rearFogLights,
                interior_lights: interiorLights,
                screen_washer: screenWasher,
                wiper_blades: wiperBlades,
                horn: horn,
                radio: radio,
                front_fog_lights: frontFogLights,
                air_conditioning: airConditioning,
                cleanliness_engine_bay: cleanlinessEngineBay,
                washer_fluid: washerFluid,
                coolant_level: coolantLevel,
                brake_fluid_level: brakeFluidLevel,
                power_steering_fluid: powerSteeringFluid,
                gas_level: gasLevel,
                oil_level: oilLevel,
                tyres: tyres,
                front_visual: frontVisual,
                rear_visual: rearVisual,
                spare_visual: spareVisual,
                wheel_brace: wheelBrace,
                jack: jack,
                front_right_wheel: frontRightWheel,
                front_left_wheel: frontLeftWheel,
                rear_right_wheel: rearRightWheel,
                rear_left_wheel: rearLeftWheel,
                notes: notes,
                driver: selectedCar.driver,
              }, config)
              .then((res) => {
                toast.current.show({severity:'success', summary: 'Save Successfully', detail:'Inspection Report Saved', life: 5000});
                //refreshPage();
                //onHide('displayBasic');
                onClick('displayBasic');
                console.log("Changes saved.");
              })
              .catch((err) => {
                console.log(err.response);
               toast.current.show({severity:'error', summary: 'Saving Failed', detail:'Please check all your input data.', life: 5000});
              })
    
        }

        const updateNotOkay = (index, value) => {
            notOkay[index] = value;
        }
        const updateOkay = (index, value) => {
            okay[index] = value; 
        }
        
        const onCheckboxChange = (value, id) => {
            /* eslint-disable no-unused-expressions */
            //console.log(value); console.log(id);
            switch (id) {
                case 'cb0':
                    console.log("id: cb0");
                    isCleanlinessExterior(value);
                    if (selectedCar.cleanliness_exterior !== value){
                        console.log("edit0");
                        value ? (updateNotOkay(0,"gray"),  updateOkay(0,"red")) : (updateNotOkay(0,"red"),  updateOkay(0,"gray"));
                    } else {
                        console.log("same0");
                        updateNotOkay(0,"none"); updateOkay(0,"none");
                    }
                    break;
                case 'cb1':
                    isConditionRust(value);
                    if (selectedCar.condition_rust !== value){
                        value ? (updateNotOkay(1,"gray"),  updateOkay(1,"red")) : (updateNotOkay(1,"red"),  updateOkay(1,"gray"));
                    } else {
                        updateNotOkay(1,"none"); updateOkay(1,"none");
                    }
                    break;
                case 'cb2':
                    isDecals(value);
                    if (selectedCar.decals !== value){
                        value ? (updateNotOkay(2,"gray"),  updateOkay(2,"red")) : (updateNotOkay(2,"red"),  updateOkay(2,"gray"));
                    } else {
                        updateNotOkay(2,"none"); updateOkay(2,"none");
                    }
                    break;
                case 'cb3':
                    isWindows(value);
                    if (selectedCar.windows !== value){
                        value ? (updateNotOkay(3,"gray"),  updateOkay(3,"red")) : (updateNotOkay(3,"red"),  updateOkay(3,"gray"));
                    } else {
                        updateNotOkay(3,"none"); updateOkay(3,"none");
                    }
                    break;
                case 'cb4':
                    isRearDoor(value);
                    if (selectedCar.rear_door !== value){
                        value ? (updateNotOkay(4,"gray"),  updateOkay(4,"red")) : (updateNotOkay(4,"red"),  updateOkay(4,"gray"));
                    } else {
                        updateNotOkay(4,"none"); updateOkay(4,"none");
                    }
                    break;
                case 'cb5':
                    isMirror(value);
                    if (selectedCar.mirror !== value){
                        value ? (updateNotOkay(5,"gray"),  updateOkay(5,"red")) : (updateNotOkay(5,"red"),  updateOkay(5,"gray"));
                    } else {
                        updateNotOkay(5,"none"); updateOkay(5,"none");
                    }
                    break;
                case 'cb6':
                    isRoofRack(value);
                    if (selectedCar.roof_rack !== value){
                        value ? (updateNotOkay(6,"gray"),  updateOkay(6,"red")) : (updateNotOkay(6,"red"),  updateOkay(6,"gray"));
                    } else {
                        updateNotOkay(6,"none"); updateOkay(6,"none");
                    }
                    break;
                case 'cb7':
                    isRearStep(value);
                    if (selectedCar.rear_step !== value){
                        value ? (updateNotOkay(7,"gray"),  updateOkay(7,"red")) : (updateNotOkay(7,"red"),  updateOkay(7,"gray"));
                    } else {
                        updateNotOkay(7,"none"); updateOkay(7,"none");
                    }
                    break;
                case 'cb8':
                    isSeats(value);
                    if (selectedCar.seats !== value){
                        value ? (updateNotOkay(8,"gray"),  updateOkay(8,"red")) : (updateNotOkay(8,"red"),  updateOkay(8,"gray"));
                    } else {
                        updateNotOkay(8,"none"); updateOkay(8,"none");
                    }
                    break;
                case 'cb9':
                    isSeatBelts(value);
                    if (selectedCar.seat_belts !== value){
                        value ? (updateNotOkay(9,"gray"),  updateOkay(9,"red")) : (updateNotOkay(9,"red"),  updateOkay(9,"gray"));
                    } else {
                        updateNotOkay(9,"none"); updateOkay(9,"none");
                    }
                    break;
                case 'cb10':
                    isGeneralCondition(value);
                    if (selectedCar.general_condition !== value){
                        value ? (updateNotOkay(10,"gray"),  updateOkay(10,"red")) : (updateNotOkay(10,"red"),  updateOkay(10,"gray"));
                    } else {
                        updateNotOkay(10,"none"); updateOkay(10,"none");
                    }
                    break;
                case 'cb11':
                    isVehicleDocuments(value);
                    if (selectedCar.vehicle_documents !== value){
                        value ? (updateNotOkay(11,"gray"),  updateOkay(11,"red")) : (updateNotOkay(11,"red"),  updateOkay(11,"gray"));
                    } else {
                        updateNotOkay(11,"none"); updateOkay(11,"none");
                    }
                    break;
                case 'cb12':
                    isCleanlinessEngineBay(value);
                    if (selectedCar.cleanliness_engine_bay !== value){
                        value ? (updateNotOkay(12,"gray"),  updateOkay(12,"red")) : (updateNotOkay(12,"red"),  updateOkay(12,"gray"));
                    } else {
                        updateNotOkay(12,"none"); updateOkay(12,"none");
                    }
                    break;
                case 'cb13':
                    isWasherFluid(value);
                    if (selectedCar.washer_fluid !== value){
                        value ? (updateNotOkay(13,"gray"),  updateOkay(13,"red")) : (updateNotOkay(13,"red"),  updateOkay(13,"gray"));
                    } else {
                        updateNotOkay(13,"none"); updateOkay(13,"none");
                    }
                    break;
                case 'cb14':
                    isCoolantLevel(value);
                    if (selectedCar.coolant_level !== value){
                        value ? (updateNotOkay(14,"gray"),  updateOkay(14,"red")) : (updateNotOkay(14,"red"),  updateOkay(14,"gray"));
                    } else {
                        updateNotOkay(14,"none"); updateOkay(14,"none");
                    }
                    break;
                case 'cb15':
                    isBrakeFluidLevel(value);
                    if (selectedCar.brake_fluid_level !== value){
                        value ? (updateNotOkay(15,"gray"),  updateOkay(15,"red")) : (updateNotOkay(15,"red"),  updateOkay(15,"gray"));
                    } else {
                        updateNotOkay(15,"none"); updateOkay(15,"none");
                    }
                    break;
                case 'cb16':
                    isPowerSteeringFluid(value);
                    if (selectedCar.power_steering_fluid !== value){
                        value ? (updateNotOkay(16,"gray"),  updateOkay(16,"red")) : (updateNotOkay(16,"red"),  updateOkay(16,"gray"));
                    } else {
                        updateNotOkay(16,"none"); updateOkay(16,"none");
                    }
                    break;
                case 'cb17':
                    isMainBeam(value);
                    if (selectedCar.main_beam !== value){
                        value ? (updateNotOkay(17,"gray"),  updateOkay(17,"red")) : (updateNotOkay(17,"red"),  updateOkay(17,"gray"));
                    } else {
                        updateNotOkay(17,"none"); updateOkay(17,"none");
                    }
                    break;
                case 'cb18':
                    isDippedBeam(value);
                    if (selectedCar.dipped_beam !== value){
                        value ? (updateNotOkay(18,"gray"),  updateOkay(18,"red")) : (updateNotOkay(18,"red"),  updateOkay(18,"gray"));
                    } else {
                        updateNotOkay(18,"none"); updateOkay(18,"none");
                    }
                    break;
                case 'cb19':
                    isSideLights(value);
                    if (selectedCar.side_lights !== value){
                        value ? (updateNotOkay(19,"gray"),  updateOkay(19,"red")) : (updateNotOkay(19,"red"),  updateOkay(19,"gray"));
                    } else {
                        updateNotOkay(19,"none"); updateOkay(19,"none");
                    }
                    break;
                case 'cb20':
                    isTailLights(value);
                    if (selectedCar.tail_lights !== value){
                        value ? (updateNotOkay(20,"gray"),  updateOkay(20,"red")) : (updateNotOkay(20,"red"),  updateOkay(20,"gray"));
                    } else {
                        updateNotOkay(20,"none"); updateOkay(20,"none");
                    }
                    break;
                case 'cb21':
                    isIndicators(value);
                    if (selectedCar.indicators !== value){
                        value ? (updateNotOkay(21,"gray"),  updateOkay(21,"red")) : (updateNotOkay(21,"red"),  updateOkay(21,"gray"));
                    } else {
                        updateNotOkay(21,"none"); updateOkay(21,"none");
                    }
                    break;
                case 'cb22':
                    isBreakLights(value);
                    if (selectedCar.break_lights !== value){
                        value ? (updateNotOkay(22,"gray"),  updateOkay(22,"red")) : (updateNotOkay(22,"red"),  updateOkay(22,"gray"));
                    } else {
                        updateNotOkay(22,"none"); updateOkay(22,"none");
                    }
                    break;
                case 'cb23':
                    isReverseLights(value);
                    if (selectedCar.reverse_lights !== value){
                        value ? (updateNotOkay(23,"gray"),  updateOkay(23,"red")) : (updateNotOkay(23,"red"),  updateOkay(23,"gray"));
                    } else {
                        updateNotOkay(23,"none"); updateOkay(23,"none");
                    }
                    break;
                case 'cb24':
                    isHazardLights(value);
                    if (selectedCar.hazard_light !== value){
                        value ? (updateNotOkay(24,"gray"),  updateOkay(24,"red")) : (updateNotOkay(24,"red"),  updateOkay(24,"gray"));
                    } else {
                        updateNotOkay(24,"none"); updateOkay(24,"none");
                    }
                    break;
                case 'cb25':
                    isRearFogLights(value);
                    if (selectedCar.rear_fog_lights !== value){
                        value ? (updateNotOkay(25,"gray"),  updateOkay(25,"red")) : (updateNotOkay(25,"red"),  updateOkay(25,"gray"));
                    } else {
                        updateNotOkay(25,"none"); updateOkay(25,"none");
                    }
                    break;
                case 'cb26':
                    isInteriorLights(value);
                    if (selectedCar.interior_lights !== value){
                        value ? (updateNotOkay(26,"gray"),  updateOkay(26,"red")) : (updateNotOkay(26,"red"),  updateOkay(26,"gray"));
                    } else {
                        updateNotOkay(26,"none"); updateOkay(26,"none");
                    }
                    break;
                case 'cb27':
                    isScreenWashers(value);
                    if (selectedCar.screen_washer !== value){
                        value ? (updateNotOkay(27,"gray"),  updateOkay(27,"red")) : (updateNotOkay(27,"red"),  updateOkay(27,"gray"));
                    } else {
                        updateNotOkay(27,"none"); updateOkay(27,"none");
                    }
                    break;
                case 'cb28':
                    isWiperBlades(value);
                    if (selectedCar.wiper_blades !== value){
                        value ? (updateNotOkay(28,"gray"),  updateOkay(28,"red")) : (updateNotOkay(28,"red"),  updateOkay(28,"gray"));
                    } else {
                        updateNotOkay(28,"none"); updateOkay(28,"none");
                    }
                    break;
                case 'cb29':
                    isHorn(value);
                    if (selectedCar.horn !== value){
                        value ? (updateNotOkay(29,"gray"),  updateOkay(29,"red")) : (updateNotOkay(29,"red"),  updateOkay(29,"gray"));
                    } else {
                        updateNotOkay(29,"none"); updateOkay(29,"none");
                    }
                    break;
                case 'cb30':
                    isRadio(value);
                    if (selectedCar.radio !== value){
                        value ? (updateNotOkay(30,"gray"),  updateOkay(30,"red")) : (updateNotOkay(30,"red"),  updateOkay(30,"gray"));
                    } else {
                        updateNotOkay(30,"none"); updateOkay(30,"none");
                    }
                    break;
                case 'cb31':
                    isFrontFogLights(value);
                    if (selectedCar.front_fog_lights !== value){
                        value ? (updateNotOkay(31,"gray"),  updateOkay(31,"red")) : (updateNotOkay(31,"red"),  updateOkay(31,"gray"));
                    } else {
                        updateNotOkay(31,"none"); updateOkay(31,"none");
                    }
                    break;
                case 'cb32':
                    isAirConditioning(value);
                    if (selectedCar.air_conditioning !== value){
                        value ? (updateNotOkay(32,"gray"),  updateOkay(32,"red")) : (updateNotOkay(32,"red"),  updateOkay(32,"gray"));
                    } else {
                        updateNotOkay(32,"none"); updateOkay(32,"none");
                    }
                    break;
                case 'cb33':
                    isTyres(value);
                    if (selectedCar.tyres !== value){
                        value ? (updateNotOkay(33,"gray"),  updateOkay(33,"red")) : (updateNotOkay(33,"red"),  updateOkay(33,"gray"));
                    } else {
                        updateNotOkay(33,"none"); updateOkay(33,"none");
                    }
                    break;
                case 'cb34':
                    isFrontVisual(value);
                    if (selectedCar.front_visual !== value){
                        value ? (updateNotOkay(34,"gray"),  updateOkay(34,"red")) : (updateNotOkay(34,"red"),  updateOkay(34,"gray"));
                    } else {
                        updateNotOkay(34,"none"); updateOkay(34,"none");
                    }
                    break;
                case 'cb35':
                    isRearVisual(value);
                    if (selectedCar.rear_visual !== value){
                        value ? (updateNotOkay(35,"gray"),  updateOkay(35,"red")) : (updateNotOkay(35,"red"),  updateOkay(35,"gray"));
                    } else {
                        updateNotOkay(35,"none"); updateOkay(35,"none");
                    }
                    break;
                case 'cb36':
                    isSpareVisual(value);
                    if (selectedCar.spare_visual !== value){
                        value ? (updateNotOkay(36,"gray"),  updateOkay(36,"red")) : (updateNotOkay(36,"red"),  updateOkay(36,"gray"));
                    } else {
                        updateNotOkay(36,"none"); updateOkay(36,"none");
                    }
                    break;
                case 'cb37':
                    isWheelBrace(value);
                    if (selectedCar.wheel_brace !== value){
                        value ? (updateNotOkay(37,"gray"),  updateOkay(37,"red")) : (updateNotOkay(37,"red"),  updateOkay(37,"gray"));
                    } else {
                        updateNotOkay(37,"none"); updateOkay(37,"none");
                    }
                    break;
                case 'cb38':
                    isJack(value);
                    if (selectedCar.jack !== value){
                        value ? (updateNotOkay(38,"gray"),  updateOkay(38,"red")) : (updateNotOkay(38,"red"),  updateOkay(38,"gray"));
                    } else {
                        updateNotOkay(38,"none"); updateOkay(38,"none");
                    }
                    break;
                case 'cb39':
                    isFrontLeftWheel(value);
                    if (selectedCar.front_left_wheel !== value){
                        value ? (updateNotOkay(39,"gray"),  updateOkay(39,"red")) : (updateNotOkay(39,"red"),  updateOkay(39,"gray"));
                    } else {
                        updateNotOkay(39,"none"); updateOkay(39,"none");
                    }
                    break;
                case 'cb40':
                    isFrontRightWheel(value);
                    if (selectedCar.front_right_wheel !== value){
                        value ? (updateNotOkay(40,"gray"),  updateOkay(40,"red")) : (updateNotOkay(40,"red"),  updateOkay(40,"gray"));
                    } else {
                        updateNotOkay(40,"none"); updateOkay(40,"none");
                    }
                    break;
                case 'cb41':
                    isRearLeftWheel(value);
                    if (selectedCar.rear_left_wheel !== value){
                        value ? (updateNotOkay(41,"gray"),  updateOkay(41,"red")) : (updateNotOkay(41,"red"),  updateOkay(41,"gray"));
                    } else {
                        updateNotOkay(41,"none"); updateOkay(41,"none");
                    }
                    break;
                case 'cb42':
                    isRearRightWheel(value);
                    if (selectedCar.rear_right_wheel !== value){
                        value ? (updateNotOkay(42,"gray"),  updateOkay(42,"red")) : (updateNotOkay(42,"red"),  updateOkay(42,"gray"));
                    } else {
                        updateNotOkay(42,"none"); updateOkay(42,"none");
                    }
                    break;
                case 'g4':
                    isGasLevel(value);
                    if (selectedCar.gas_level !== value){
                        const copy = gas.slice(); //copy the array
                        for (var i = 0; i < 5; i++) {
                            if (i === 4) {
                                copy[i] = "red";
                            } else if (i === selectedCar.gas_level) {
                                copy[i] = "gray";
                            } else {
                                copy[i] = "none";
                            }
                        }
                        setGas(copy);
                    } else {
                        setGas([]);
                    }
                    break;
                case 'g3':
                    isGasLevel(value);
                    if (selectedCar.gas_level !== value){
                        const copy = gas.slice(); //copy the array
                        for (var i = 0; i < 5; i++) {
                            if (i === 3) {
                                copy[i] = "red";
                            } else if (i === selectedCar.gas_level) {
                                copy[i] = "gray";
                            } else {
                                copy[i] = "none";
                            }
                        }
                        setGas(copy);
                    } else {
                        setGas([]);
                    }
                    break;
                case 'g2':
                    isGasLevel(value);
                    if (selectedCar.gas_level !== value){
                        const copy = gas.slice(); //copy the array
                        for (var i = 0; i < 5; i++) {
                            if (i === 2) {
                                copy[i] = "red";
                            } else if (i === selectedCar.gas_level) {
                                copy[i] = "gray";
                            } else {
                                copy[i] = "none";
                            }
                        }
                        setGas(copy);
                    } else {
                        setGas([]);
                    }
                    break;
                case 'g1':
                    isGasLevel(value);
                    if (selectedCar.gas_level !== value){
                        const copy = gas.slice(); //copy the array
                        for (var i = 0; i < 5; i++) {
                            if (i === 1) {
                                copy[i] = "red";
                            } else if (i === selectedCar.gas_level) {
                                copy[i] = "gray";
                            } else {
                                copy[i] = "none";
                            }
                        }
                        setGas(copy);
                    } else {
                        setGas([]);
                    }
                    break;
                case 'o4':
                    isOilLevel(value);
                    if (selectedCar.oil_level !== value){
                        const copy = oil.slice(); //copy the array
                        for (var i = 0; i < 5; i++) {
                            if (i === 4) {
                                copy[i] = "red";
                            } else if (i === selectedCar.oil_level) {
                                copy[i] = "gray";
                            } else {
                                copy[i] = "none";
                            }
                        }
                        setOil(copy);
                    } else {
                        setOil([]);
                    }
                    break;
                case 'o3':
                    isOilLevel(value);
                    if (selectedCar.oil_level !== value){
                        const copy = oil.slice(); //copy the array
                        for (var i = 0; i < 5; i++) {
                            if (i === 3) {
                                copy[i] = "red";
                            } else if (i === selectedCar.oil_level) {
                                copy[i] = "gray";
                            } else {
                                copy[i] = "none";
                            }
                        }
                        setOil(copy);
                    } else {
                        setOil([]);
                    }
                    break;
                case 'o2':
                    isOilLevel(value);
                    if (selectedCar.oil_level !== value){
                        const copy = oil.slice(); //copy the array
                        for (var i = 0; i < 5; i++) {
                            if (i === 2) {
                                copy[i] = "red";
                            } else if (i === selectedCar.oil_level) {
                                copy[i] = "gray";
                            } else {
                                copy[i] = "none";
                            }
                        }
                        setOil(copy);
                    } else {
                        setOil([]);
                    }
                    break;
                case 'o1':
                    isOilLevel(value);
                    if (selectedCar.oil_level !== value){
                        const copy = oil.slice(); //copy the array
                        for (var i = 0; i < 5; i++) {
                            if (i === 1) {
                                copy[i] = "red";
                            } else if (i === selectedCar.oil_level) {
                                copy[i] = "gray";
                            } else {
                                copy[i] = "none";
                            }
                        }
                        setOil(copy);
                    } else {
                        setOil([]);
                    }
                    break;
                case 'n':
                    isNotes(value);
                    if (selectedCar.notes !== value){
                        setSmallNotes("Previous Comment: " + selectedCar.notes);
                        setEditNotes("red-inputtext");
                    } else {
                        setSmallNotes("");
                        setEditNotes("");
                    }
                    break;
                case 'mil':
                    setMileage(value);
                    if (selectedCar.mileage !== parseInt(value)){
                        setSmallMileage("Previous Mileage: " + selectedCar.mileage);
                        setEditMileage("red-inputtext");
                    } else {
                        setSmallMileage("");
                        setEditMileage("");
                    }
                    break;
                default:
                    break;
            }
        }

        const submitSearch = () => {
            console.log(selectedLocation);
            let token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                };
            if(date2 === null && selectedLocation === null){
                axios.get(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/', config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
            }
            else if (date2 !== null && selectedLocation === null){
                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/?date_created=' + format(date2, 'yyyy-MM-dd'), config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
            }
            else if (date2 === null && selectedLocation !== null){
                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/?body_no__current_loc=' + selectedLocation.code, config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
            }
            else if (date2 !== null && selectedLocation !== null){
                fetch(process.env.REACT_APP_SERVER_NAME + 'api/inspection-list/?date_created=' + format(date2, 'yyyy-MM-dd')+'&body_no__current_loc=' + selectedLocation.code, config)
                .then(response => response.json())
                .then(data => {
                    setcarValues(data);
                });
            }
        }

        const onChangeHandler = (e) => {
            console.log(e.target.value);
            setSelectedCar(e.target.value);

        }
        
        const actionBody = () => {
            return (
                localStorage.getItem("deleteUsers") === "true" ? <center>
                <Button label="Edit" icon="pi pi-pencil" className="p-mr-2" onClick={() => getInspectionData()}/> </center>
                : <center>
                <Button label="Show" icon="pi pi-search" className="p-mr-2" onClick={() => getInspectionData2()}/> </center>
            );
        }

        return(
            <div>
                <Toast ref={toast} />
                <div className="p-col-12">
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search Body No." />
                            </span>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-3 p-sm-12">
                            <Dropdown value={selectedLocation} options={cities} onChange={(e) => setSelectedLocation(e.value)} optionLabel="name" placeholder="Select a Location" />
                        </div>
                        <div className="p-col-12 p-lg-4 p-md-6 p-sm-12">
                            {/* <Button label="Search" icon="pi pi-external-link" onClick={() => submitSearch()} />
                            <Calendar id="icon" value={date2} onChange={(e) => setDate2(e.value)} showIcon /> */}
                            <div className="p-d-flex">
                                <div className="p-mr-3"><Calendar id="icon" value={date2} onChange={(e) => setDate2(e.value)} showIcon /></div>
                                <div className="p-mr-2"><Button label="Search" icon="pi pi-external-link" onClick={() => submitSearch()} /></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <ListBox value={selectedCar} options={carValues} onChange={(e) =>  onChangeHandler(e)} filter optionLabel="body_no"/> */}

                <DataTable ref={dt} value={carValues} className="p-datatable-sm" resizableColumns columnResizeMode="expand"
                    globalFilter={globalFilter} selectionMode="single" selection={selected} onSelectionChange={e => setSelected(e.value)}
                    paginator rows={10} emptyMessage="No users found.">
                    <Column selectionMode="single" style={{width:'3em'}}/>
                    <Column field="body_no" header="Body No." style={{ paddingLeft: '2%' }}></Column>
                    <Column body={actionBody}></Column>
                </DataTable>

                <Dialog header="Fleet Vehicle Inspection Checklist Record" visible={displayBasic} style={{ width: '85vw' }} onHide={() => onHide('displayBasic')}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-8 report-checklist">
                            <div className="card card">
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="bodyno">Body No.:</label>
                                        <InputText id="bodyno" value={selectedBody.body_no} />
                                    </div>
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="make">Make:</label>
                                        <InputText id="make" value={selectedBody.make = selectedBody.make === 'L30' ? 'L300 Exceed 2.5D MT': selectedBody.make === 'SUV' ? 'Super Carry UV': selectedBody.make ===  'G15'? 'Gratour midi truck 1.5L': selectedBody.make ===  'G12'? 'Gratour midi truck 1.2L': '' } />
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-6">
                                        <label>Mileage:</label>
                                        <InputText id="mil" className={editMileage} placeholder="Mileage" value={mil}
                                        onChange={event => onCheckboxChange(event.target.value, event.target.id)}/>
                                        <small className="p-invalid p-d-block">{smallMileage}</small>
                                        {/* <InputText id="n" className={editNotes} placeholder="Comments" value={notes} 
                                         onChange={event => onCheckboxChange(event.target.value, event.target.id)}/>
                                         <small className="p-invalid p-d-block">{smallNotes}</small> */}
                                    </div>
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="location">Location:</label>
                                        <InputText id="location" value={selectedBody.current_loc} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Exterior</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Cleanliness</h4></div>
                                    <div className={"p-col widCheck " + notOkay[0]}>
                                        {/* <center><Checkbox  type="checkbox" id="rb1" checked={!cleanlinessExterior} onChange={event => onCheckboxChange(false, event.target.id)} /></center> */}
                                        <center><Checkbox id="cb0" checked={!cleanlinessExterior} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[0]}>
                                        <center><Checkbox id="cb0" checked={cleanlinessExterior} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Condition Rust</h4></div>
                                    <div className={"p-col widCheck " + notOkay[1]}>
                                        <center><Checkbox  id="cb1" checked={!conditionRust} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[1]}>
                                        <center><Checkbox  id="cb1" checked={conditionRust} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Decals/Livery Intact</h4></div>
                                    <div className={"p-col widCheck " + notOkay[2]}>
                                        <center><Checkbox  id="cb2" checked={!decals} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[2]}>
                                        <center><Checkbox id="cb2" checked={decals} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Windows/Windscreen</h4></div>
                                    <div className={"p-col widCheck " + notOkay[3]}>
                                        <center><Checkbox id="cb3" checked={!windows} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[3]}>
                                        <center><Checkbox id="cb3" checked={windows} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Rear Door</h4></div>
                                    <div className={"p-col widCheck " + notOkay[4]}>
                                        <center><Checkbox  id="cb4"   checked={!rearDoor} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[4]}>
                                        <center><Checkbox id="cb4"  checked={rearDoor} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{ height:'40px'}}><h4>Mirrors</h4></div>
                                    <div className={"p-col widCheck " + notOkay[5]}>
                                        <center><Checkbox id="cb5" checked={!mirror} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[5]}>
                                        <center><Checkbox id="cb5" checked={mirror} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Roof Rack</h4></div>
                                    <div className={"p-col widCheck " + notOkay[6]}>
                                        <center><Checkbox id="cb6" checked={!roofRack} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[6]}>
                                        <center><Checkbox id="cb6" checked={roofRack} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Rear Step</h4></div>
                                    <div className={"p-col widCheck " + notOkay[7]}>
                                        <center><Checkbox id="cb7" checked={!rearStep} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[7]}>
                                        <center><Checkbox id="cb7" checked={rearStep} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Interior</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Seats</h4></div>
                                    <div className={"p-col widCheck " + notOkay[8]}>
                                        <center><Checkbox id="cb8" checked={!seats} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[8]}>
                                        <center><Checkbox id="cb8" checked={seats} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Seat Belts</h4></div>
                                    <div className={"p-col widCheck " + notOkay[9]}>
                                        <center><Checkbox id="cb9" checked={!seatBelts} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[9]}>
                                        <center><Checkbox id="cb9" checked={seatBelts} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>General Condition</h4></div>
                                    <div className={"p-col widCheck " + notOkay[10]}>
                                        <center><Checkbox id="cb10" checked={!generalCondition} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[10]}>
                                        <center><Checkbox id="cb10" checked={generalCondition} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Vehicle Documents</h4></div>
                                    <div className={"p-col widCheck " + notOkay[11]}>
                                        <center><Checkbox id="cb11" checked={!vehicleDocuments} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[11]}>
                                        <center><Checkbox id="cb11" checked={vehicleDocuments} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Engine Bay</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Cleanliness</h4></div>
                                    <div className={"p-col widCheck " + notOkay[12]}>
                                        <center><Checkbox id="cb12" checked={!cleanlinessEngineBay} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[12]}>
                                        <center><Checkbox id="cb12" checked={cleanlinessEngineBay} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Washer Fluid</h4></div>
                                    <div className={"p-col widCheck " + notOkay[13]}>
                                        <center><Checkbox id="cb13" checked={!washerFluid} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[13]}>
                                        <center><Checkbox id="cb13" checked={washerFluid} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Coolant Level</h4></div>
                                    <div className={"p-col widCheck " + notOkay[14]}>
                                        <center><Checkbox id="cb14" checked={!coolantLevel} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[14]}>
                                        <center><Checkbox id="cb14" checked={coolantLevel} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Brake Fluid Level</h4></div>
                                    <div className={"p-col widCheck " + notOkay[15]}>
                                        <center><Checkbox id="cb15" checked={!brakeFluidLevel} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[15]}>
                                        <center><Checkbox id="cb15" checked={brakeFluidLevel} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Power Steering Fluid</h4></div>
                                    <div className={"p-col widCheck " + notOkay[16]}>
                                        <center><Checkbox id="cb16" checked={!powerSteeringFluid} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[16]}>
                                        <center><Checkbox id="cb16"  checked={powerSteeringFluid} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Electrics</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Main Beam</h4></div>
                                    <div className={"p-col widCheck " + notOkay[17]}>
                                        <center><Checkbox id="cb17" checked={!mainBeam} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[17]}>
                                        <center><Checkbox id="cb17" checked={mainBeam} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Dipped Beam</h4></div>
                                    <div className={"p-col widCheck " + notOkay[18]}>
                                        <center><Checkbox id="cb18" checked={!dippedBeam} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[18]}>
                                        <center><Checkbox id="cb18" checked={dippedBeam} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Side Lights</h4></div>
                                    <div className={"p-col widCheck " + notOkay[19]}>
                                        <center><Checkbox id="cb19" checked={!sideLights} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[19]}>
                                        <center><Checkbox id="cb19" checked={sideLights} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Tail Lights</h4></div>
                                    <div className={"p-col widCheck " + notOkay[20]}>
                                        <center><Checkbox id="cb20" checked={!tailLights} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[20]}>
                                        <center><Checkbox id="cb20" checked={tailLights} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Indicators</h4></div>
                                    <div className={"p-col widCheck " + notOkay[21]}>
                                        <center><Checkbox id="cb21" checked={!indicators} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[21]}>
                                        <center><Checkbox id="cb21" checked={indicators} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{ height:'40px'}}><h4>Break Lights</h4></div>
                                    <div className={"p-col widCheck " + notOkay[22]}>
                                        <center><Checkbox id="cb22" checked={!breakLights} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[22]}>
                                        <center><Checkbox id="cb22" checked={breakLights} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Reverse Lights</h4></div>
                                    <div className={"p-col widCheck " + notOkay[23]}>
                                        <center><Checkbox id="cb23" checked={!reverseLights} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[23]}>
                                        <center><Checkbox id="cb23" checked={reverseLights} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Hazard Lights</h4></div>
                                    <div className={"p-col widCheck " + notOkay[24]}>
                                        <center><Checkbox id="cb24" checked={!hazardLights} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[24]}>
                                        <center><Checkbox id="cb24" checked={hazardLights} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Rear Fog Light</h4></div>
                                    <div className={"p-col widCheck " + notOkay[25]}>
                                        <center><Checkbox id="cb25" checked={!rearFogLights} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[25]}>
                                        <center><Checkbox id="cb25" checked={rearFogLights} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Interior Lights</h4></div>
                                    <div className={"p-col widCheck " + notOkay[26]}>
                                        <center><Checkbox id="cb26" checked={!interiorLights} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[26]}>
                                        <center><Checkbox id="cb26" checked={interiorLights} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Screen Washer</h4></div>
                                    <div className={"p-col widCheck " + notOkay[27]}>
                                        <center><Checkbox id="cb27" checked={!screenWasher} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[27]}>
                                        <center><Checkbox id="cb27" checked={screenWasher} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Wiper Blades</h4></div>
                                    <div className={"p-col widCheck " + notOkay[28]}>
                                        <center><Checkbox id="cb28" checked={!wiperBlades} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[28]}>
                                        <center><Checkbox id="cb28" checked={wiperBlades} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Horn</h4></div>
                                    <div className={"p-col widCheck " + notOkay[29]}>
                                        <center><Checkbox id="cb29" checked={!horn} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[29]}>
                                        <center><Checkbox id="cb29" checked={horn} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Radio/CD</h4></div>
                                    <div className={"p-col widCheck " + notOkay[30]}>
                                        <center><Checkbox id="cb30" checked={!radio} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[30]}>
                                        <center><Checkbox id="cb30" checked={radio} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Front Fog Lights</h4></div>
                                    <div className={"p-col widCheck " + notOkay[31]}>
                                        <center><Checkbox id="cb31" checked={!frontFogLights} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[31]}>
                                        <center><Checkbox id="cb31" checked={frontFogLights} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Air Conditioning</h4></div>
                                    <div className={"p-col widCheck " + notOkay[32]}>
                                        <center><Checkbox id="cb32" checked={!airConditioning} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[32]}>
                                        <center><Checkbox id="cb32" checked={airConditioning} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Wheels and Tyres</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Tyres</h4></div>
                                    <div className={"p-col widCheck " + notOkay[33]}>
                                        <center><Checkbox id="cb33" checked={!tyres} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[33]}>
                                        <center><Checkbox id="cb33" checked={tyres} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Front (Visual)</h4></div>
                                    <div className={"p-col widCheck " + notOkay[34]}>
                                        <center><Checkbox id="cb34" checked={!frontVisual} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[34]}>
                                        <center><Checkbox id="cb34" checked={frontVisual} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Rear (Visual)</h4></div>
                                    <div className={"p-col widCheck " + notOkay[35]}>
                                        <center><Checkbox id="cb35" checked={!rearVisual} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[35]}>
                                        <center><Checkbox id="cb35" checked={rearVisual} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Spare (Visual)</h4></div>
                                    <div className={"p-col widCheck " + notOkay[36]}>
                                        <center><Checkbox id="cb36" checked={!spareVisual} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[36]}>
                                        <center><Checkbox id="cb36" checked={spareVisual} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Wheel Brace</h4></div>
                                    <div className={"p-col widCheck " + notOkay[37]}>
                                        <center><Checkbox id="cb37" checked={!wheelBrace} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[37]}>
                                        <center><Checkbox id="cb37" checked={wheelBrace} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{ height:'40px'}}><h4>Jack</h4></div>
                                    <div className={"p-col widCheck " + notOkay[38]}>
                                        <center><Checkbox id="cb38" checked={!jack} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[38]}>
                                        <center><Checkbox id="cb38" checked={jack} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Left Front</h4></div>
                                    <div className={"p-col widCheck " + notOkay[39]}>
                                        <center><Checkbox id="cb39" checked={!frontLeftWheel} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[39]}>
                                        <center><Checkbox id="cb39" checked={frontLeftWheel} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Right Front</h4></div>
                                    <div className={"p-col widCheck " + notOkay[40]}>
                                        <center><Checkbox id="cb40" checked={!frontRightWheel} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[40]}>
                                        <center><Checkbox id="cb40" checked={frontRightWheel} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Left Rear</h4></div>
                                    <div className={"p-col widCheck " + notOkay[41]}>
                                        <center><Checkbox id="cb41" checked={!rearLeftWheel} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[41]}>
                                        <center><Checkbox id="cb41" checked={rearLeftWheel} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Right Rear</h4></div>
                                    <div className={"p-col widCheck " + notOkay[42]}>
                                        <center><Checkbox id="cb42" checked={!rearRightWheel} onChange={event => onCheckboxChange(false, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col widCheck " + okay[42]}>
                                        <center><Checkbox id="cb42" checked={rearRightWheel} onChange={event => onCheckboxChange(true, event.target.id)}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Gas and Oil</h1>
                                <div className="p-grid">
                                    <div className="p-col">
                                        <center><h4><b>Gas Level</b></h4></center>
                                    </div>
                                    <div className="p-col">
                                        <center><h4><b>Oil Level</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className={"p-col " + gas[4]}>
                                        <center><Checkbox id="g4" checked={gasLevel === 4} onChange={event => onCheckboxChange(4, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col " + oil[4]}>
                                        <center><Checkbox id="o4" checked={oilLevel === 4} onChange={event => onCheckboxChange(4, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className={"p-col " + gas[3]}>
                                        <center><Checkbox id="g3" checked={gasLevel === 3} onChange={event => onCheckboxChange(3, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col " + oil[3]}>
                                        <center><Checkbox id="o3" checked={oilLevel === 3} onChange={event => onCheckboxChange(3, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className={"p-col " + gas[2]}>
                                        <center><Checkbox id="g2" checked={gasLevel === 2} onChange={event => onCheckboxChange(2, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col " + oil[2]}>
                                        <center><Checkbox id="o2" checked={oilLevel === 2} onChange={event => onCheckboxChange(2, event.target.id)}/></center>
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className={"p-col " + gas[1]}>
                                        <center><Checkbox id="g1" checked={gasLevel === 1} onChange={event => onCheckboxChange(1, event.target.id)}/></center>
                                    </div>
                                    <div className={"p-col " + oil[1]}>
                                        <center><Checkbox id="o1" checked={oilLevel === 1} onChange={event => onCheckboxChange(1, event.target.id)}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                            <h1>Checklist Report</h1>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-8">
                                        <label>Comments:</label>
                                        <InputText id="n" className={editNotes} placeholder="Comments" value={notes} 
                                         onChange={event => onCheckboxChange(event.target.value, event.target.id)}/>
                                         <small className="p-invalid p-d-block">{smallNotes}</small>
                                    </div>
                                    <div className="p-col-12 p-md-8">
                                        <label>Driver/ Operator:</label>
                                        <InputText placeholder="Inspected by" value={selectedCar.driver} disabled/>
                                    </div>
                                    <div className="p-col-12 p-md-8">
                                        <label>Date:</label>
                                        <InputText placeholder="Inspected Date" value={selectedCar.date_created} disabled/>
                                    </div>
                                    <div className="p-col-12 p-md-5"> </div>
                                    <div className="p-col-12 p-md-3">
                                        {/*submit button is okay but not getting autocomplete value after clicking on suggestions*/}
                                        <Button label="Save Changes" onClick={submitData}> </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            

                <Dialog header="Fleet Vehicle Inspection Checklist Record" visible={displayBasic2} style={{ width: '85vw' }} onHide={() => onHide('displayBasic2')}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-8">
                            <div className="card card">
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="bodyno">Body No.:</label>
                                        <InputText id="bodyno" value={selectedBody.body_no} />
                                    </div>
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="make">Make:</label>
                                        <InputText id="make" value={selectedBody.make= selectedBody.make === 'L30' ? 'L300 Exceed 2.5D MT': selectedBody.make === 'SUV' ? 'Super Carry UV': selectedBody.make ===  'G15'? 'Gratour midi truck 1.5L': selectedBody.make ===  'G12'? 'Gratour midi truck 1.2L': '' } />
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="mileage">Mileage:</label>
                                        <InputText id="mileage" value={selectedCar.mileage} />
                                    </div>
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="location">Location:</label>
                                        <InputText id="location" value={selectedBody.current_loc} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Exterior</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Cleanliness</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.cleanliness_exterior}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.cleanliness_exterior}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Condition Rust</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1" checked={!selectedCar.condition_rust}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb2" checked={selectedCar.condition_rust}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Decals/Livery Intact</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1"  checked={!selectedCar.decals}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"   checked={selectedCar.decals}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Windows/Windscreen</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.windows}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.windows} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Rear Door</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1"   checked={!selectedCar.rear_door}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.rear_door} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{ height:'40px'}}><h4>Mirrors</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.mirror} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.mirror} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Roof Rack</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.roof_rack}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.roof_rack}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Rear Step</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.rear_step} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.rear_step}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Interior</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Seats</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.seats} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.seats} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Seat Belts</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1" checked={!selectedCar.seat_belts}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb2" checked={selectedCar.seat_belts}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>General Condition</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1"  checked={!selectedCar.general_condition}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"   checked={selectedCar.general_condition}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Vehicle Documents</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.vehicle_documents}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.vehicle_documents}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Engine Bay</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Cleanliness</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.cleanliness_engine_bay} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.cleanliness_engine_bay} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Washer Fluid</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1"  checked={!selectedCar.washer_fluid}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb2" checked={selectedCar.washer_fluid}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Coolant Level</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1"  checked={!selectedCar.coolant_level}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.coolant_level}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Brake Fluid Level</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.brake_fluid_level}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.brake_fluid_level} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Power Steering Fluid</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.power_steering_fluid}  /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.power_steering_fluid}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Electrics</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Main Beam</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.main_beam}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.main_beam}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Dipped Beam</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1"  checked={!selectedCar.dipped_beam} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb2" checked={selectedCar.dipped_beam} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Side Lights</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1" checked={!selectedCar.side_lights} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.side_lights} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Tail Lights</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.tail_lights} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.tail_lights}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Indicators</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1"  checked={!selectedCar.indicators}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.indicators}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{ height:'40px'}}><h4>Break Lights</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.break_lights}  /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.break_lights}  /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Reverse Lights</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.reverse_lights}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.reverse_lights}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Hazard Lights</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.hazard_light}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.hazard_light}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Rear Fog Light</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.rear_fog_lights} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.rear_fog_lights}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Interior Lights</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.interior_lights}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.interior_lights} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Screen Washer</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.screen_washer} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"checked={selectedCar.screen_washer} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Wiper Blades</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.wiper_blades} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.wiper_blades}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Horn</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.horn}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.horn} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Radio/CD</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.radio} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.radio}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Front Fog Lights</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.front_fog_lights} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.front_fog_lights}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Air Conditioning</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.air_conditioning}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.air_conditioning}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                                <h1>Wheels and Tyres</h1><hr style={{ borderTop:'1px solid black'}}/>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}>
                                <div className="p-col widName" style={{height:'40px'}}></div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Not Okay</b></h4></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><h4><b>Okay</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Tyres</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.tyres}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.tyres}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Front (Visual)</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1" checked={!selectedCar.front_visual}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb2" checked={selectedCar.front_visual}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Rear (Visual)</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1" checked={!selectedCar.rear_visual}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.rear_visual} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Spare (Visual)</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.spare_visual}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.spare_visual}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Wheel Brace</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox  inputId="rb1"   checked={!selectedCar.wheel_brace}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.wheel_brace}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{ height:'40px'}}><h4>Jack</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.jack}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.jack}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Left Front</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.front_left_wheel} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.front_left_wheel} /></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Right Front</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1" checked={!selectedCar.front_right_wheel} /></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.front_right_wheel}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Left Rear</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.rear_left_wheel}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.rear_left_wheel}/></center>
                                    </div>
                                </div>
                                <div className="p-fluid p-grid p-col-12 p-lg-11 p-md-12 p-sm-12" style={{borderBottom: '1px solid #dedede'}}> 
                                <div className="p-col widName" style={{height:'40px'}}><h4>Right Rear</h4></div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb1"  checked={!selectedCar.rear_right_wheel}/></center>
                                    </div>
                                    <div className="p-col widCheck">
                                        <center><Checkbox inputId="rb2" checked={selectedCar.rear_right_wheel}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12">
                            <div className="card card-w-title">
                                <h1>Gas and Oil</h1>
                                <div className="p-grid">
                                    <div className="p-col">
                                        <center><h4><b>Gas Level</b></h4></center>
                                    </div>
                                    <div className="p-col">
                                        <center><h4><b>Oil Level</b></h4></center>
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className="p-col">
                                        <center><Checkbox inputId="rb1"  checked={selectedCar.gas_level === 4} /></center>
                                    </div>
                                    <div className="p-col">
                                        <center><Checkbox inputId="rb1"  checked={selectedCar.oil_level === 4} /></center>
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className="p-col">
                                        <center><Checkbox inputId="rb2"  checked={selectedCar.gas_level === 3}/></center>
                                    </div>
                                    <div className="p-col">
                                        <center><Checkbox  inputId="rb2" checked={selectedCar.oil_level === 3} /></center>
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className="p-col">
                                        <center><Checkbox  inputId="rb3" checked={selectedCar.gas_level === 2} /></center>
                                    </div>
                                    <div className="p-col">
                                        <center><Checkbox  inputId="rb3" checked={selectedCar.oil_level === 2} /></center>
                                    </div>
                                </div>
                                <div className="p-grid">
                                    <div className="p-col">
                                        <center><Checkbox  inputId="rb4"  checked={selectedCar.gas_level === 1}/></center>
                                    </div>
                                    <div className="p-col">
                                        <center><Checkbox  inputId="rb4"  checked={selectedCar.oil_level === 1}/></center>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-lg-12 report-checklist">
                            <div className="card card-w-title">
                            <h1>Checklist Report</h1>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-8">
                                        <label>Comments:</label>
                                        <InputText placeholder="Comments" value={selectedCar.notes}/>
                                    </div>
                                    <div className="p-col-12 p-md-8">
                                        <label>Driver/ Operator:</label>
                                        <InputText placeholder="Inspected by" value={selectedCar.driver}/>
                                    </div>
                                    <div className="p-col-12 p-md-8">
                                        <label>Date:</label>
                                        <InputText placeholder="Inspected by" value={selectedCar.date_created}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )

    }
