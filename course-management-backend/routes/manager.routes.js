const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');

/**
 * @swagger
 * /managers:
 *   post:
 *     tags: [Managers]
 *     summary: Create a new manager
 *     description: Create a new manager account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manager'
 *     responses:
 *       201:
 *         description: Manager created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Manager already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', managerController.createManager);

/**
 * @swagger
 * /managers:
 *   get:
 *     tags: [Managers]
 *     summary: Get all managers
 *     description: Retrieve a list of all managers
 *     responses:
 *       200:
 *         description: A list of managers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Manager'
 *       500:
 *         description: Internal server error
 */
router.get('/', managerController.getManagers);

module.exports = router;