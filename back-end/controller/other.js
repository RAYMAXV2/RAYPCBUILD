// routes/other.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all "others"
router.get('/', async (req, res) => {
  try {
    const others = await prisma.other.findMany();
    res.json(others);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching others' });
  }
});

// GET other by ID
router.get('/:id', async (req, res) => {
  const otherId = parseInt(req.params.id, 10);
  try {
    const oneOther = await prisma.other.findUnique({ where: { id: otherId } });
    if (!oneOther) {
      return res.status(404).json({ error: 'Other not found' });
    }
    res.json(oneOther);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching other' });
  }
});

// POST create "other"
router.post('/', async (req, res) => {
  try {
    const newOther = await prisma.other.create({ data: req.body });
    res.status(201).json(newOther);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating other' });
  }
});

// PUT update "other"
router.put('/:id', async (req, res) => {
  const otherId = parseInt(req.params.id, 10);
  try {
    const updatedOther = await prisma.other.update({
      where: { id: otherId },
      data: req.body,
    });
    res.json(updatedOther);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating other' });
  }
});

// DELETE "other"
router.delete('/:id', async (req, res) => {
  const otherId = parseInt(req.params.id, 10);
  try {
    await prisma.other.delete({ where: { id: otherId } });
    res.json({ message: 'Other deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting other' });
  }
});

module.exports = router;
