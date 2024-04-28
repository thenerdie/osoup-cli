import { spawn } from 'child_process';

export default function calculate(hitObjects) {
    let totalObjects = hitObjects.length
    let holds = hitObjects.filter(hitObject => hitObject.Type == 2).length

    return new Promise((resolve, reject) => {
        const minacalc = spawn('minacalc', {
            cwd: 'tools/windows',
            shell: true
        });

        minacalc.stdin.write(JSON.stringify({
            "HitObjects": hitObjects
        }));

        minacalc.stdin.end();

        minacalc.stdout.on('data', (data) => {
            const difficulty = JSON.parse(data.toString())[3];

            delete difficulty.rate

            // for (let key of Object.keys(difficulty)) {
                
            // }

            difficulty.overall += 5.8 * ( holds / totalObjects )

            resolve(difficulty);
        });

        minacalc.stderr.on('data', (data) => {
            reject(data.toString());
        });
    })
}

