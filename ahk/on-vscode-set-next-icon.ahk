#Include ewinhook.ahk

change_icon(hWnd, icon) {
	hIcon := DllCall("LoadImage", uint, 0, str, icon, uint, 1, int, 0, int, 0, uint, 0x10)
	SendMessage, 0x80, 0, hIcon,, ahk_id %hWnd%
	SendMessage, 0x80, 1, hIcon,, ahk_id %hWnd%
}

#Persistent
DetectHiddenWindows, On
OnExit, QUIT

sSearchList =
(
	ahk_class Chrome_WidgetWin_1
)

hWinEventHook := ewinhook_CheckForWindowsEvents("WINEVENT", sSearchList)

Return

QUIT:
ewinhook_StopChecking(hWinEventHook)
ExitApp

WINEVENT(sEvent, hWnd) {
	if (sEvent = "Created") {
		WinWait, Visual Studio Code, , 2
		if (ErrorLevel = 0) {
			next = %temp%\vsciconrot_next.ico
			change_icon(hWnd, next)
		}
	}
}


#singleinstance force