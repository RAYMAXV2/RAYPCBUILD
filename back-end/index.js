// index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Controllers
const cpuController = require('./controller/cpu');
const gpuController = require('./controller/gpu');
const ramController = require('./controller/ram');
const psuController = require('./controller/psu');
const motherboardController = require('./controller/motherboard');
const storageController = require('./controller/storage');
const monitorController = require('./controller/monitor');
const otherController = require('./controller/other');
const buildController = require('./controller/build');

// Instancier Express
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cpu', cpuController);
app.use('/api/gpu', gpuController);
app.use('/api/ram', ramController);
app.use('/api/psu', psuController);
app.use('/api/motherboard', motherboardController);
app.use('/api/storage', storageController);
app.use('/api/monitor', monitorController);
app.use('/api/other', otherController);
app.use('/api/builds', buildController);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
