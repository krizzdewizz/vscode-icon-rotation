import * as vscode from 'vscode';
import * as path from 'path';
const open: (url: string, cb: (err?: Error) => void) => void = require('openurl').open;

export function activate(context: vscode.ExtensionContext) {

	const command = vscode.commands.registerCommand('extension.iconRotationOpenInstallerFolder', () => {
		const thisExt = vscode.extensions.getExtension('krizzdewizz.vscode-icon-rotation');
		if (!thisExt) {
			return; // call Doctor Who
		}

		open(path.join(thisExt.extensionPath, 'installer'), err => {
			if (err) {
				vscode.window.showErrorMessage(`An error occured while opening the installer folder "${thisExt.extensionPath}": ${err}`);
			}
		});
	});

	context.subscriptions.push(command);
}
