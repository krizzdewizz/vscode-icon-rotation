import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as glob from 'glob';

function copyFile(src: string, target: string) {
    fs.writeFileSync(target, fs.readFileSync(src));
}
const VS_CODE_ROOT = 'C:/Program Files (x86)/Microsoft VS Code/resources/app';
const VSCODE_MAIN = path.join(VS_CODE_ROOT, 'out/vs/code/electron-main/main.js');

function copyResources() {
    console.log(`Copy resources...`);
    const iconFolder = path.join(VS_CODE_ROOT, 'resources/krizzdewizz-icon-rotation');
    mkdirp.sync(iconFolder);
    glob.sync('media/code/*').forEach(it => copyFile(it, path.join(iconFolder, path.basename(it))));
    copyFile('krizzdewizz-icon-rotation.js', path.join(path.dirname(VSCODE_MAIN), 'krizzdewizz-icon-rotation.js'));
}

function patchMain() {

    const content = String(fs.readFileSync(VSCODE_MAIN));

    let replaced = content;
    [
        [/(\"vs\/code\/electron-main\/env\",\"\.\/log\"\],function\(e,t,n,r,o,i,a,s,c,u)/, '$1,krizzdewizz_icon_rotation_1'],
        [/(\"vs\/code\/electron-main\/env\",\"\.\/log\")/, '$1,"./krizzdewizz-icon-rotation"'],
        [/(r\.isLinux\&\&\(u\.icon=n\.join\(this\.envService\.appRoot,\"resources\/linux\/code.png\")/, 'u.icon=krizzdewizz_icon_rotation_1.nextIcon(this.envService.appRoot)||u.icon;!u.icon&&$1']
    ].forEach(it => {
        const tmp = replaced.replace(it[0] as RegExp, it[1] as string);
        if (replaced === tmp) {
            throw `Patch does not match vscode version (${VSCODE_MAIN}). Nothing was replaced for regex ${it[0]}.`;
        }
        replaced = tmp;
    });
    fs.writeFileSync(VSCODE_MAIN, replaced);
}

function backupMain() {
    const backupFile = `${VSCODE_MAIN}.backup.${Date.now()}`;
    console.log(`Backup ${VSCODE_MAIN} to ${backupFile}...`);
    copyFile(VSCODE_MAIN, backupFile);
}

backupMain();
patchMain();
copyResources();
console.log(`Patched ${VSCODE_MAIN}. Restart VS Code for changes to take effect.`);
