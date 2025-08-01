const express = require("express");
const router = express.Router();
const facilitatorController = require("../controllers/facilitator.controller");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticate);

/**
 * @swagger
 * /facilitators:
 *   post:
 *     tags: [Facilitators]
 *     summary: Create a new facilitator (Manager only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Facilitator'
 *     responses:
 *       201:
 *         description: Facilitator created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facilitator'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (manager role required)
 */
router.post("/", authorizeRoles('manager'), facilitatorController.createFacilitator);

/**
 * @swagger
 * /facilitators:
 *   get:
 *     tags: [Facilitators]
 *     summary: Get all facilitators (Manager only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all facilitators
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Facilitator'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (manager role required)
 */
router.get("/", authorizeRoles('manager'), facilitatorController.getAllFacilitators);

/**
 * @swagger
 * /facilitators/{id}:
 *   get:
 *     tags: [Facilitators]
 *     summary: Get facilitator by ID (Manager only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facilitator ID
 *     responses:
 *       200:
 *         description: Facilitator details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facilitator'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (manager role required)
 *       404:
 *         description: Facilitator not found
 */
router.get("/:id", authorizeRoles('manager'), facilitatorController.getFacilitatorById);

/**
 * @swagger
 * /facilitators/{id}:
 *   put:
 *     tags: [Facilitators]
 *     summary: Update facilitator (Manager only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facilitator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Facilitator'
 *     responses:
 *       200:
 *         description: Facilitator updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facilitator'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (manager role required)
 *       404:
 *         description: Facilitator not found
 */
router.put("/:id", authorizeRoles('manager'), facilitatorController.updateFacilitator);

/**
 * @swagger
 * /facilitators/{id}:
 *   delete:
 *     tags: [Facilitators]
 *     summary: Delete facilitator (Manager only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facilitator ID
 *     responses:
 *       204:
 *         description: Facilitator deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (manager role required)
 *       404:
 *         description: Facilitator not found
 */
router.delete("/:id", authorizeRoles('manager'), facilitatorController.deleteFacilitator);

module.exports = router;