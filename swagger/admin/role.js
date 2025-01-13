/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role management
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
 * /api/role/add:
 *   post:
 *     summary: Add Role
 *     tags: [Role]
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
 * /api/role/list:
 *   get:
 *     summary: List Role
 *     tags: [Role]
 *     parameters:
 *       - in: query
 *         name: TenantItemId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Role by Id
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
 * /api/role/update/{id}:
 *   put:
 *     summary: Update Role
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
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
 * /api/role/delete/{id}:
 *   delete:
 *     summary: Delete Role
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
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
