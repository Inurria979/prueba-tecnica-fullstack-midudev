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
