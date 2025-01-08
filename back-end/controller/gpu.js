// routes/gpu.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all GPU
router.get('/', async (req, res) => {
  try {
    const gpus = await prisma.gPU.findMany();
    res.json(gpus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching GPUs' });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  const gpuId = parseInt(req.params.id, 10);
  try {
    const gpu = await prisma.gPU.findUnique({ where: { id: gpuId } });
    if (!gpu) {
      return res.status(404).json({ error: 'GPU not found' });
    }
    res.json(gpu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching GPU' });
  }
});

// POST create GPU
router.post('/', async (req, res) => {
  try {
    const newGpu = await prisma.gPU.create({ data: req.body });
    res.status(201).json(newGpu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating GPU' });
  }
});

// PUT update GPU
router.put('/:id', async (req, res) => {
  const gpuId = parseInt(req.params.id, 10);
  try {
    const updated = await prisma.gPU.update({
      where: { id: gpuId },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating GPU' });
  }
});

// DELETE GPU
router.delete('/:id', async (req, res) => {
  const gpuId = parseInt(req.params.id, 10);
  try {
    await prisma.gPU.delete({ where: { id: gpuId } });
    res.json({ message: 'GPU deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting GPU' });
  }
});

module.exports = router;
