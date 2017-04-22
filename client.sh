mkdir .pi-lib
cp -r node_modules/pi-lib/tools .pi-lib/tools
ts-node .pi-lib/tools/homify.ts --client
ng serve --host 0.0.0.0
