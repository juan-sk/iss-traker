const axios = require('axios');
const fs = require('fs');
const outFile="ieeData.csv"


//creacion de los headers del archivo de salida
//appendToFile("id,latitud,longitud\n",outFile,false)


getIeeData();

const INTERVALO_EN_MILISEGUNDOS = 10000;


setInterval(() => {
    getIeeData();
}, INTERVALO_EN_MILISEGUNDOS);


//getdata(void)=>void
//realiza una consulta a la api de http://api.open-notify.org/iss-now.json 
// esta api disponibiliza la informacion de latitud y longitud 
// de la estacion espacial internacional (ISS
function getIeeData() {
    let serviceUrl = 'http://api.open-notify.org/iss-now.json';
    //axios.get es el metodo que realiza la peticion al servicio
    axios.get(serviceUrl)
        .then((response) => {
            let ieePosition=response.data.iss_position;
            //Data formateada 
            let saveData=`${new Date().toJSON()},${ieePosition.latitude},${ieePosition.longitude}\n`;
            appendToFile(saveData,outFile,false);
        });

}


//apendToFile(object, string, boolean)=> new Promise()
//recive como primer parametro la data que se quiere guardar, 
//recive como segundo parametro el nombre del archivo donde se quiere guardar la informacion
//resive un tercer parametro que atualmente no hace nada 
//agrega data a un archivo 
// en caso de no existir el archivo el metodo lo crea automaticamente
async function appendToFile(data, fileName, overrite) {

    return await new Promise((resolve, reject) => {

        fs.appendFile(fileName, data, function (err) {
            if (err) return console.log(err);
            resolve()
        });

    })
}