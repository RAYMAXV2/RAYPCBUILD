// routes/build.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

// GET all builds
router.get('/', async (req, res) => {
  try {
    const builds = await prisma.build.findMany({
      include: {
        cpu: true,
        gpu: true,
        motherboard: true,
        psu: true,
        buildRams: { include: { ram: true } },
        buildStorages: { include: { storage: true } },
        buildMonitors: { include: { monitor: true } },
        buildOthers: { include: { other: true } }
      }
    });
    res.json(builds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching builds' });
  }
});

// GET build by ID or shareCode
router.get('/:idOrShare', async (req, res) => {
  const param = req.params.idOrShare;
  try {
    let build = null;
    const asNumber = parseInt(param, 10);
    if (!isNaN(asNumber)) {
      // c'est un ID
      build = await prisma.build.findUnique({
        where: { id: asNumber },
        include: {
          cpu: true,
          gpu: true,
          motherboard: true,
          psu: true,
          buildRams: { include: { ram: true } },
          buildStorages: { include: { storage: true } },
          buildMonitors: { include: { monitor: true } },
          buildOthers: { include: { other: true } }
        },
      });
    } else {
      // c'est un shareCode
      build = await prisma.build.findUnique({
        where: { shareCode: param },
        include: {
          cpu: true,
          gpu: true,
          motherboard: true,
          psu: true,
          buildRams: { include: { ram: true } },
          buildStorages: { include: { storage: true } },
          buildMonitors: { include: { monitor: true } },
          buildOthers: { include: { other: true } }
        },
      });
    }

    if (!build) {
      return res.status(404).json({ error: 'Build not found' });
    }
    res.json(build);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching build' });
  }
});

// POST create build
router.post('/', async (req, res) => {
  try {
    const {
      cpuId, gpuId, motherboardId, psuId,
      ramIds, storageIds, monitorIds, otherIds
    } = req.body;

    const shareCode = crypto.randomBytes(4).toString('hex');

    const newBuild = await prisma.build.create({
      data: {
        shareCode,
        cpuId: cpuId || null,
        gpuId: gpuId || null,
        motherboardId: motherboardId || null,
        psuId: psuId || null,
        // tables pivot => createMany
        buildRams: ramIds ? {
          createMany: {
            data: ramIds.map((rid) => ({ ramId: rid }))
          }
        } : undefined,
        buildStorages: storageIds ? {
          createMany: {
            data: storageIds.map((sid) => ({ storageId: sid }))
          }
        } : undefined,
        buildMonitors: monitorIds ? {
          createMany: {
            data: monitorIds.map((mid) => ({ monitorId: mid }))
          }
        } : undefined,
        buildOthers: otherIds ? {
          createMany: {
            data: otherIds.map((oid) => ({ otherId: oid }))
          }
        } : undefined,
      },
      include: {
        cpu: true,
        gpu: true,
        motherboard: true,
        psu: true,
        buildRams: { include: { ram: true } },
        buildStorages: { include: { storage: true } },
        buildMonitors: { include: { monitor: true } },
        buildOthers: { include: { other: true } }
      }
    });

    res.status(201).json(newBuild);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating build' });
  }
});

// PUT update build (remplacer CPU, GPU, etc. + pivots)
router.put('/:id', async (req, res) => {
  const buildId = parseInt(req.params.id, 10);
  try {
    const {
      cpuId, gpuId, motherboardId, psuId,
      ramIds, storageIds, monitorIds, otherIds
    } = req.body;

    const updated = await prisma.build.update({
      where: { id: buildId },
      data: {
        cpuId: cpuId || null,
        gpuId: gpuId || null,
        motherboardId: motherboardId || null,
        psuId: psuId || null,
        // on supprime, puis on recrée
        buildRams: ramIds ? {
          deleteMany: {},
          createMany: {
            data: ramIds.map((rid) => ({ ramId: rid }))
          }
        } : undefined,
        buildStorages: storageIds ? {
          deleteMany: {},
          createMany: {
            data: storageIds.map((sid) => ({ storageId: sid }))
          }
        } : undefined,
        buildMonitors: monitorIds ? {
          deleteMany: {},
          createMany: {
            data: monitorIds.map((mid) => ({ monitorId: mid }))
          }
        } : undefined,
        buildOthers: otherIds ? {
          deleteMany: {},
          createMany: {
            data: otherIds.map((oid) => ({ otherId: oid }))
          }
        } : undefined
      },
      include: {
        cpu: true,
        gpu: true,
        motherboard: true,
        psu: true,
        buildRams: { include: { ram: true } },
        buildStorages: { include: { storage: true } },
        buildMonitors: { include: { monitor: true } },
        buildOthers: { include: { other: true } }
      }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating build' });
  }
});

// DELETE build
router.delete('/:id', async (req, res) => {
  const buildId = parseInt(req.params.id, 10);
  try {
    await prisma.build.delete({ where: { id: buildId } });
    res.json({ message: 'Build deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting build' });
  }
});

module.exports = router;
