const express = require("express");
const router = express.Router();
const allocationController = require("../controllers/allocation.controller");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticate);

/**
 * @swagger
 * /allocations:
 *   post:
 *     tags: [Allocations]
 *     summary: Create a new allocation (Manager only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Allocation'
 *     responses:
 *       201:
 *         description: Allocation created successfully
 *       403:
 *         description: Forbidden (not a manager)
 *       401:
 *         description: Unauthorized
 */
router.post("/", authorizeRoles('manager'), allocationController.createAllocation);

/**
 * @swagger
 * /allocations:
 *   get:
 *     tags: [Allocations]
 *     summary: Get all allocations (Manager only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of allocations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Allocation'
 *       403:
 *         description: Forbidden (not a manager)
 *       401:
 *         description: Unauthorized
 */
router.get("/", authorizeRoles('manager'), allocationController.getAllAllocations);

/**
 * @swagger
 * /allocations/{id}:
 *   get:
 *     tags: [Allocations]
 *     summary: Get allocation by ID (Manager only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Allocation data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Allocation'
 *       404:
 *         description: Allocation not found
 *       403:
 *         description: Forbidden (not a manager)
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authorizeRoles('manager'), allocationController.getAllocationById);

/**
 * @swagger
 * /allocations/{id}:
 *   put:
 *     tags: [Allocations]
 *     summary: Update allocation (Manager only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Allocation'
 *     responses:
 *       200:
 *         description: Allocation updated
 *       404:
 *         description: Allocation not found
 *       403:
 *         description: Forbidden (not a manager)
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authorizeRoles('manager'), allocationController.updateAllocation);

/**
 * @swagger
 * /allocations/{id}:
 *   delete:
 *     tags: [Allocations]
 *     summary: Delete allocation (Manager only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Allocation deleted
 *       404:
 *         description: Allocation not found
 *       403:
 *         description: Forbidden (not a manager)
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authorizeRoles('manager'), allocationController.deleteAllocation);

module.exports = router;