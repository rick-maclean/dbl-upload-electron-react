@echo off
if [%1]==[] goto :eof
:loop
saxonhe9-2-0-6n\bin\Transform.exe -s:"%~1" -xsl:GenerateTNTMPDFromWBTCxml.xsl -o:"TNTOutputs\%~n1%.tntmpd"
shift
if not [%1]==[] goto loop