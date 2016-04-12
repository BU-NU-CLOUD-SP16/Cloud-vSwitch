@echo CreateObject("Wscript.Shell").Run ^"^"^"^" ^& WScript.Arguments(0) ^& ^"^"^"^", 0, False >  %HOMEPATH%/invisible.vbs

@echo openvpn.exe %HOMEPATH%/client.ovpn >  %HOMEPATH%/invisible_openvpn.bat

wscript.exe "%HOMEPATH%/invisible.vbs" "%HOMEPATH%/invisible_openvpn.bat"
