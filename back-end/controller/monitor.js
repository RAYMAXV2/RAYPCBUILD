// routes/monitor.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all monitors
router.get('/', async (req, res) => {
  try {
    const monitors = await prisma.monitor.findMany();
    res.json(monitors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching monitors' });
  }
});

// GET monitor by ID
router.get('/:id', async (req, res) => {
  const monitorId = parseInt(req.params.id, 10);
  try {
    const monitor = await prisma.monitor.findUnique({ where: { id: monitorId } });
    if (!monitor) {
      return res.status(404).json({ error: 'Monitor not found' });
    }
    res.json(monitor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching monitor' });
  }
});

// POST create monitor
router.post('/', async (req, res) => {
  try {
    const newMonitor = await prisma.monitor.create({ data: req.body });
    res.status(201).json(newMonitor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating monitor' });
  }
});

// PUT update monitor
router.put('/:id', async (req, res) => {
  const monitorId = parseInt(req.params.id, 10);
  try {
    const updated = await prisma.monitor.update({
      where: { id: monitorId },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating monitor' });
  }
});

// DELETE monitor
router.delete('/:id', async (req, res) => {
  const monitorId = parseInt(req.params.id, 10);
  try {
    await prisma.monitor.delete({ where: { id: monitorId } });
    res.json({ message: 'Monitor deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting monitor' });
  }
});

module.exports = router;
