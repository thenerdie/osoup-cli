import { spawn } from 'child_process';

export default function calculate(hitObjects) {
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
            const difficulty = JSON.parse(data.toString());

            delete difficulty[3].rate

            resolve(difficulty[3]);
        });

        minacalc.stderr.on('data', (data) => {
            reject(data.toString());
        });
    })
}

