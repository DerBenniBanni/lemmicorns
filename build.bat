REM build using l13 from benallfree
cd src
REM START /WAIT npx l13 build --out ..\build
npx l13 build --out ..\build|more
move *.zip ..\dist\.
cd ..