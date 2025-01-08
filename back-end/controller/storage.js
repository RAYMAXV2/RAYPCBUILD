// routes/storage.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all storages
router.get('/', async (req, res) => {
  try {
    const storages = await prisma.storage.findMany();
    res.json(storages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching storages' });
  }
});

// GET storage by ID
router.get('/:id', async (req, res) => {
  const storageId = parseInt(req.params.id, 10);
  try {
    const storage = await prisma.storage.findUnique({ where: { id: storageId } });
    if (!storage) {
      return res.status(404).json({ error: 'Storage not found' });
    }
    res.json(storage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching storage' });
  }
});

// POST create storage
router.post('/', async (req, res) => {
  try {
    const newStorage = await prisma.storage.create({ data: req.body });
    res.status(201).json(newStorage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating storage' });
  }
});

// PUT update storage
router.put('/:id', async (req, res) => {
  const storageId = parseInt(req.params.id, 10);
  try {
    const updated = await prisma.storage.update({
      where: { id: storageId },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating storage' });
  }
});

// DELETE storage
router.delete('/:id', async (req, res) => {
  const storageId = parseInt(req.params.id, 10);
  try {
    await prisma.storage.delete({ where: { id: storageId } });
    res.json({ message: 'Storage deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting storage' });
  }
});

module.exports = router;
