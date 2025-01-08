// routes/cpu.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all CPU
router.get('/', async (req, res) => {
  try {
    const cpus = await prisma.cPU.findMany();
    res.json(cpus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching CPUs' });
  }
});

// GET CPU by ID
router.get('/:id', async (req, res) => {
  const cpuId = parseInt(req.params.id, 10);
  try {
    const cpu = await prisma.cPU.findUnique({ where: { id: cpuId } });
    if (!cpu) {
      return res.status(404).json({ error: 'CPU not found' });
    }
    res.json(cpu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching CPU' });
  }
});

// POST create CPU
router.post('/', async (req, res) => {
  try {
    const newCpu = await prisma.cPU.create({ data: req.body });
    res.status(201).json(newCpu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating CPU' });
  }
});

// PUT update CPU
router.put('/:id', async (req, res) => {
  const cpuId = parseInt(req.params.id, 10);
  try {
    const updated = await prisma.cPU.update({
      where: { id: cpuId },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating CPU' });
  }
});

// DELETE CPU
router.delete('/:id', async (req, res) => {
  const cpuId = parseInt(req.params.id, 10);
  try {
    await prisma.cPU.delete({ where: { id: cpuId } });
    res.json({ message: 'CPU deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting CPU' });
  }
});

module.exports = router;
