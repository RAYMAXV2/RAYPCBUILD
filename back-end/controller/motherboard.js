// routes/motherboard.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all motherboards
router.get('/', async (req, res) => {
  try {
    const motherboards = await prisma.motherboard.findMany();
    res.json(motherboards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching motherboards' });
  }
});

// GET motherboard by ID
router.get('/:id', async (req, res) => {
  const mbId = parseInt(req.params.id, 10);
  try {
    const mb = await prisma.motherboard.findUnique({ where: { id: mbId } });
    if (!mb) {
      return res.status(404).json({ error: 'Motherboard not found' });
    }
    res.json(mb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching motherboard' });
  }
});

// POST create motherboard
router.post('/', async (req, res) => {
  try {
    const newMb = await prisma.motherboard.create({ data: req.body });
    res.status(201).json(newMb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating motherboard' });
  }
});

// PUT update motherboard
router.put('/:id', async (req, res) => {
  const mbId = parseInt(req.params.id, 10);
  try {
    const updatedMb = await prisma.motherboard.update({
      where: { id: mbId },
      data: req.body,
    });
    res.json(updatedMb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating motherboard' });
  }
});

// DELETE motherboard
router.delete('/:id', async (req, res) => {
  const mbId = parseInt(req.params.id, 10);
  try {
    await prisma.motherboard.delete({ where: { id: mbId } });
    res.json({ message: 'Motherboard deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting motherboard' });
  }
});

module.exports = router;
