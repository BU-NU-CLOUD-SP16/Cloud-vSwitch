@echo CreateObject("Wscript.Shell").Run ^"^"^"^" ^& WScript.Arguments(0) ^& ^"^"^"^", 0, False >  %HOEMPATH%/invisible.vbs

@echo openvpn.exe %HOMEPATH%/client.ovpn >  %HOEMPATH%/invisible_openvpn.bat

wscript.exe "%HOMEPATH%/invisible.vbs" "%HOMEPATH%/invisible_openvpn.bat"
