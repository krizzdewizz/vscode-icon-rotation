// this code runs in VS Code -> must be AMD module format

import { nativeImage } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let winNumber = -1;

let allIcons: string[];
function getAllIcons(root: string): string[] {
	if (allIcons) {
		return allIcons;
	}

	let files: string[];
	try {
		files = fs.readdirSync(root);
	} catch (error) {
		// ignore
	}

	if (!files) {
		return allIcons = [];
	}

	return allIcons = files.sort();
}

export function nextIcon(appRoot: string): Electron.NativeImage | string {
	const root = path.join(appRoot, 'resources/krizzdewizz-icon-rotation');
	const icons = getAllIcons(root);
	if (icons.length === 0) {
		return undefined;
	}

	winNumber++;
	if (winNumber === 0) {
		return undefined; // first is original
	}

	return nativeImage.createFromPath(path.join(root, icons[(winNumber - 1) % icons.length]));
}
