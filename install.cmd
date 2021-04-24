@echo off

REM Register npm server
CALL npm set registry https://registry.npmjs.org

REM Install modules
CALL npm install
IF %errorlevel% neq 0 EXIT /b