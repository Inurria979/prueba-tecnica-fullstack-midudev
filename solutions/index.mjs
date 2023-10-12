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
