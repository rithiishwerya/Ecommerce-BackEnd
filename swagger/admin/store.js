/**
 * @swagger
 * tags:
 *   name: Store
 *   description: Store management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StoreRequestBody:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Chennai Mobiles_Test
 *     StoreDeleteBody:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: number
 *           example: 1
 *     StoreResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */



/**
 * @swagger
 * /api/store/add:
 *   post:
 *     summary: Add Store
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoreRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/store/list:
 *   get:
 *     summary: List Store
 *     tags: [Store]
 *     parameters:
 *       - in: query
 *         name: TenantItemId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Store by Id
 *       - in: query
 *         name: Kundencode
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Customers Kundencode
 *       - in: query
 *         name: limit
 *         schema:
 *           type: numbe
 *         required: false
 *         description: No of records
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: false
 *         description: page no
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/store/update/{id}:
 *   put:
 *     summary: Update Store
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Store ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoreRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/store/delete/{id}:
 *   delete:
 *     summary: Delete Store
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Store ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoreDeleteBody'
 *     responses:
 *       200:
 *         description: Success
 */
