import net from "node:net";

// No funciona como se espera, por tanto hay que arregarlo
export const ping = (ip) => {
  const startTime = process.hrtime();

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    return { time: process.hrtime(startTime), ip };
  });

  client.on("error", (err) => {
    throw err;
    client.end();
  });
};

ping("midu.dev", (err, info) => {
  if (err) console.error(err);
  console.log(info);
});

// Solucion
/**
 * Explicacion
 *
 * Le pasamos una funcion por parametro a la funcion ping, esta es la encargada de manejar el estado de la
 * "peticion", si es correcta simplemente imprime el tiempo y el host que le pasamos
 * Si no es correcta imprime el error
 */

export const pingSolucion = (ip, callback) => {
  const startTime = process.hrtime();

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    //return { time: process.hrtime(startTime), ip };// <-- No funciona
    callback(null, { time: process.hrtime(startTime), ip });
  });

  client.on("error", (err, callback) => {
    // throw err; // No hace nada
    client.end();
    callback(err);
  });
};

pingSolucion("midu.dev", (err, info) => {
  if (err) console.error(err);
  console.log(info);
});

// Ejercicio 2
// Transform la siguiente funcion para que funcione con promesas en lugar de callbacks

export function obtenerDatosPromise(callback) {
  setTimeout(() => {
    callback(null, { data: "datos importantes" });
  }, 2000);
}

// Pasamos de ejecuatar una funcion callback para obtener los datos construyendo y devolviendo una promesa
// El resolve es lo que se ejecuta en el .then() o .catch()

export function obtenerDatosPromiseSolutions() {
  
  return new Promise( resolve => {
    setTimeout( () => {
      resolve({data: 'datos importantes'})
    }, 2000)
  })
}

const obtDatosPromise = obtenerDatosPromise((err, info) => {
  console.log(info);
});

//Ejecuta el resolve el .then() 
obtenerDatosPromiseSolutions()
  .then((info) => {
    console.log(info);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

try{
//Devuelve la promesa
const info = await obtenerDatosPromiseSolutions()
//Ejecuta el resolve
console.log(info)
} catch(err) {
  console.error(err)
  process.exit(1)
}