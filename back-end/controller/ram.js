// routes/ram.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all RAM
router.get('/', async (req, res) => {
  try {
    const rams = await prisma.rAM.findMany();
    res.json(rams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching RAM' });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  const ramId = parseInt(req.params.id, 10);
  try {
    const ram = await prisma.rAM.findUnique({ where: { id: ramId } });
    if (!ram) {
      return res.status(404).json({ error: 'RAM not found' });
    }
    res.json(ram);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching RAM' });
  }
});

// POST create RAM
router.post('/', async (req, res) => {
  try {
    const newRam = await prisma.rAM.create({ data: req.body });
    res.status(201).json(newRam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating RAM' });
  }
});

// PUT update RAM
router.put('/:id', async (req, res) => {
  const ramId = parseInt(req.params.id, 10);
  try {
    const updated = await prisma.rAM.update({
      where: { id: ramId },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating RAM' });
  }
});

// DELETE RAM
router.delete('/:id', async (req, res) => {
  const ramId = parseInt(req.params.id, 10);
  try {
    await prisma.rAM.delete({ where: { id: ramId } });
    res.json({ message: 'RAM deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting RAM' });
  }
});

module.exports = router;
