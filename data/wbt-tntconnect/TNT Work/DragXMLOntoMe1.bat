@echo off
ECHO Converting "%~1" to TNT
saxonhe9-2-0-6n\bin\Transform.exe -s:"%~1" -xsl:GenerateTNTMPDFromWBTCxml.xsl -o:"TNTOutputs\%~n1%.tntmpd"
PAUSE