// routes/psu.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all PSU
router.get('/', async (req, res) => {
  try {
    const psus = await prisma.pSU.findMany();
    res.json(psus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching PSUs' });
  }
});

// GET PSU by ID
router.get('/:id', async (req, res) => {
  const psuId = parseInt(req.params.id, 10);
  try {
    const psu = await prisma.pSU.findUnique({ where: { id: psuId } });
    if (!psu) {
      return res.status(404).json({ error: 'PSU not found' });
    }
    res.json(psu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching PSU' });
  }
});

// POST create PSU
router.post('/', async (req, res) => {
  try {
    const newPsu = await prisma.pSU.create({ data: req.body });
    res.status(201).json(newPsu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating PSU' });
  }
});

// PUT update PSU
router.put('/:id', async (req, res) => {
  const psuId = parseInt(req.params.id, 10);
  try {
    const updatedPsu = await prisma.pSU.update({
      where: { id: psuId },
      data: req.body,
    });
    res.json(updatedPsu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating PSU' });
  }
});

// DELETE PSU
router.delete('/:id', async (req, res) => {
  const psuId = parseInt(req.params.id, 10);
  try {
    await prisma.pSU.delete({ where: { id: psuId } });
    res.json({ message: 'PSU deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting PSU' });
  }
});

module.exports = router;
