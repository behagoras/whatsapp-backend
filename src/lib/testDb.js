const ClientsService = require('../services/clients')
const MongoLib = require('./mongo')

const clientService = new ClientsService()
const mongo = new MongoLib()

clientService.getClient({ clientUid: '5ea3c074a321458549f68c3c' }).then((client) => {
  console.log(client)
});

// // { $exists: true, $not: { $gt: 0 } }
// // { sent: true }
// mongo.getAll('clients', { sent: true }).then((clients) => {
//   clients.forEach((client) => {
//     // eslint-disable-next-line no-underscore-dangle
//     const clientUid = client._id;
//     const sent = new Date() - 1;
//     console.log(client);
//     // mongo.update('clients', clientUid, { sent })
//     //   .then((c) => {
//     //     console.log('client updated', c);
//     //   });
//   });
// });

(async () => {
  const clients = await mongo.getAll('clients', { sent: false })
  console.log('Mundo de clientes', clients)
})()

const phoneNumbers = [
  7499181937,
  2224661886,
  7771271009,
  5557121233,
  5941016070,
  5551153543,
  5563663571,
  5558122236,
  5589946308,
  5522270009,
  7621118868,
  5556914845,
  2721005831,
  5554464220,
  9221072213,
  5558724726,
  7737343050,
  9361175404,
  7326775186,
  5555750190,
  9717145757,
  9361018242,
  5552600471,
  4423732122,
  2434311068,
  5517390316,
  9141194222
]

// phoneNumbers.forEach((phone) => {
//   mongo.getAll('clients', { phone }).then((clients) => {
//     clients.forEach((client) => {
//       // eslint-disable-next-line no-underscore-dangle
//       const clientUid = client._id;
//       console.log(client);
//       // mongo.update('clients', clientUid, { whatsapp: false })
//       //   .then((c) => {
//       //     console.log('The client doesn`t have whatsapp', c);
//       //   });
//     });
//   });
// });

// // { $not: { $gt: 0 } }

console.log(phoneNumbers)

// mongo.getAll('clients', { sent: { $gt: 0 } }).then((clients) => {
//   clients.forEach((client) => {
//     // eslint-disable-next-line no-underscore-dangle
//     const clientUid = client._id;
//     // console.log(client.phone);
//     const whatsapp = `521${client.phone}@c.us`;
//     // mongo.update('clients', clientUid, { whatsapp })
//     //   .then((c) => {
//     //     console.log('Whatsapp = ', client.phone, c);
//     //   });
//   });
// });
