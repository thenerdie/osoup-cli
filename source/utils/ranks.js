// used to convert an MMR value to a dan

const dans = [
    [ "Epsilon", 2705 ],
    [ "Delta", 2375 ],
    [ "Gamma", 2095 ],
    [ "Beta", 1940 ],
    [ "Alpha", 1866 ],
    [ "10th", 1790 ],
    [ "9th", 1688 ],
    [ "8th", 1600 ],
    [ "7th", 1511 ],
    [ "6th", 1400 ],
    [ "5th", 1267 ],
    [ "4th", 1140 ],
    [ "3rd", 1036 ],
    [ "2nd", 950 ],
    [ "1st", 897 ]
]

export function danLevelForMmr(mmr) {
    for (let dan of dans) {
        const [ danName, danMmr ] = dan

        if (mmr > danMmr) {
            return danName
        }
    }

    return dans[dans.length - 1][0]
}