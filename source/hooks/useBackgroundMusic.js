import { Events, Memory, getCurrentPacket } from "../memory.js"
import React, {useState, useEffect} from 'react';

export default function useBackgroundMusic() {
    const [ state, setState ] = useState(getCurrentPacket()?.menu.bm)

    useEffect(() => {
        Memory.addListener(Events.SONG_CHANGE, packet => {
            setState(packet.menu.bm)
        })
    }, [])

    return state
}