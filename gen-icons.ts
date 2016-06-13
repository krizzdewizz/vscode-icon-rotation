import * as lwip from 'lwip';
import * as fs from 'fs';
import * as path from 'path';

const COUNT_IMAGES = 10;

const SRC = 'media/code.png';
const OUT = 'out';

lwip.open(SRC, (err, image) => {

    const lowerA = 0x61;

    function doit(i: number) {
        image.batch()
            .hue(i * 1 + 30)
            .saturate(-i * 0.035)
            .writeFile(path.join(OUT, `icon_${String.fromCharCode(lowerA + i)}.png`), err => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (++i < COUNT_IMAGES) {
                    doit(i);
                }
            });
    }

    doit(0);
});