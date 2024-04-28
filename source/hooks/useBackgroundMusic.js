import React, {useState, useEffect} from 'react';

import useOsuMemory from "./useOsuMemory.js";

export default function useBackgroundMusic() {
    const rawMemory = useOsuMemory()
    const [ memory, setMemory ] = useState(rawMemory)

    useEffect(() => {
        setMemory(rawMemory)
    }, [ rawMemory?.menu.bm.md5 ])

    return memory?.menu.bm
}

