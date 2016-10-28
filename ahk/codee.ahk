ICO = %1%\.vscode\vscode.ico
if (FileExist(ICO)) {
	FileCopy, %ICO%, %temp%\vsciconrot_next.ico, 1
}

Run, "code" "%1%",, Hide