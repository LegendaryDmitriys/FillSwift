import React, {useEffect, useState} from 'react';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import Header from "../Header/Header";
import ModalFuels from "./modalFuels";
import axios from "axios";


function Fuelings(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFuelStation, setSelectedFuelStation] = useState(null);
    const [fuelStations, setFuelStations] = useState([]);


    useEffect(() => {
        async function fetchFuelStations() {
            try {
                const response = await axios.get('http://192.168.0.106:8000/fuelstation/list/');
                setFuelStations(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных о заправках:', error);
            }
        }
        fetchFuelStations();
    }, []);


    const markerClick = (station) => {
        setSelectedFuelStation(station);
        setModalOpen(true)
    }

    const imagesPlacemark = {
        iconLayout: 'default#image',
        iconImageHref: '../images/placemark.png',
        iconImageSize: [45, 45],
        iconImageOffset: [-15, -30]
    };


    return (
        <div>
            <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY }}>
                <div>
                    <Map
                        defaultState={{ center: [58.536413, 31.259857], zoom: 12 }}
                        width="100vw"
                        height="100vh"
                    >
                        {fuelStations.map(station => (
                            <Placemark
                                key={station.id}
                                geometry={[station.latitude, station.longitude]}
                                options={imagesPlacemark}
                                onClick={() => markerClick(station)}
                            />
                        ))}
                    </Map>
                </div>
                {modalOpen && <ModalFuels fuelStation={selectedFuelStation} onClose={() => setModalOpen(false)} />}
            </YMaps>
        </div>
    );
}

export default Fuelings;