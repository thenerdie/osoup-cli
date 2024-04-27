import { Events, Memory, getCurrentPacket } from "../memory.js"
import React, {useState, useEffect} from 'react';

export default function useOsuMemory() {
    const [ state, setState ] = useState(getCurrentPacket())

    useEffect(() => {
        Memory.addListener(Events.UPDATE, packet => {
            setState(packet)
        })
    }, [])

    return state
}