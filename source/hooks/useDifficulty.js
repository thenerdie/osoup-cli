import { useEffect, useState } from "react";
import useBackgroundMusic from "./useBackgroundMusic.js";

import axios from "axios"
import { BeatmapDecoder } from 'osu-parsers'
import calculate from '../utils/minacalc.js';

function xToColumn(x, columnCount) {
    return Math.floor(x * columnCount / 512)
}

function glicko(msd) {
    msd *= 1.8

    return 0.55 * msd * msd + 500
}

const useDifficulty = () => {
    const backgroundMusic = useBackgroundMusic();
    const [difficulty, setDifficulty] = useState(0);

    useEffect(() => {
        (async () => {
            const folder = encodeURIComponent(backgroundMusic?.path.folder)
            const file = encodeURIComponent(backgroundMusic?.path.file)

            const { data } = await axios.get(
                "http://127.0.0.1:24050/Songs/" + 
                folder + "/" + 
                file
            )

            const decoder = new BeatmapDecoder()
            const beatmap = decoder.decodeFromString(data)

            const keyCount = beatmap.difficulty.circleSize

            let difficulty = {
                starRating: backgroundMusic.stats.fullSR
            }

            if (keyCount == 4) {
                const processedHitObjects = beatmap.hitObjects.map(hitObject => {
                    return {
                        Time: hitObject.startTime,
                        Track: xToColumn(hitObject.startPosition.x, keyCount) + 1,
                        Type: hitObject.endTime ? 2 : 1
                    }
                })

                const msd = await calculate(processedHitObjects)

                difficulty.msd = msd.overall
                difficulty.robeatsCsMmr = glicko(msd.overall)
            }

            setDifficulty(difficulty);
        })()
    }, [ backgroundMusic ]);

    return difficulty
};

export default useDifficulty;
