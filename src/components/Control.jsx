import React, { useState, useRef } from 'react';

import ammoData from '../data.json';
import mapData from '../map-data.json';

const ammoTypes = [...new Set(ammoData.data.map((ammoData) => {
    return ammoData.type
}))].sort();

function Control(props) {
    const [connectionText, setConnectionText] = useState('Connect');
    const [connectID, setConnectID] = useState();
    
    const inputRef = useRef(null);
    
    const handleConnectClick = (event) => {
        if(connectID.length !== 4){            
            inputRef.current.focus();
            
            return true;
        }
        
        setConnectionText(`Connected to ${props.sessionID}`);
        
        props.send({
            type: 'command',
            data: {
                type: 'map',
                value: document.querySelector('[name="map"]').value,
            },
        });  
    };
    
    const handleIDChange = (event) => {
        const tempConnectID = event.target.value.trim().toUpperCase().substring(0, 4);
        props.setID(tempConnectID);
        
        setConnectID(tempConnectID);
    };
    
    const handleMapChange = (event) => {
        props.send({
            type: 'command',
            data: {
                type: 'map',
                value: event.target.value,
            },
        });
    };
    
    const handleAmmoChange = (event) => {
        props.send({
            type: 'command',
            data: {
                type: 'ammo',
                value: event.target.value,
            }
        });
    };
    
    return <div className="control-wrapper">
        <span>View map:</span>
        <select name="map" onChange={handleMapChange}>
            {mapData.map(map => 
                <option
                    key = {map.key}
                    value = {map.key}
                >
                    {map.displayText}
                </option>
            )} 
        </select>
        <span>View caliber:</span>
        <select name="ammo" onChange={handleAmmoChange}>
            {ammoTypes.map((ammoType) => (
                <option
                    key = {ammoType}
                    value = {ammoType}
                >
                    {ammoType}
                </option>
            ))}
        </select>
        <div className="info-wrapper">
            Load this page in another browser to control it from here
        </div>
        <div className="connection-wrapper">
            <input
                maxLength = "4"
                minLength = "4"
                name = "session-id"
                onChange = {handleIDChange}
                placeholder = "desktop id"
                ref = {inputRef}
                type = "text"
            />
            <input 
                disabled = {!props.socketConnected}
                onClick = {handleConnectClick}
                type = "submit"
                value = {connectionText} 
            />
        </div>
    </div>
}

export default Control;


