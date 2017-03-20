ICO = %1%\.vscode\vscode.ico
if (FileExist(ICO)) {
	FileCopy, %ICO%, %temp%\vsciconrot_next.ico, 1
}

Run, "code" "%1%" "%2%" "%3%" "%4%" "%5%" "%6%" "%7%" "%8%" "%9%",, Hide