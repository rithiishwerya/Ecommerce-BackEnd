/**
 * @swagger
 * tags:
 *   name: Brand
 *   description: Product Brand Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BrandRequestBody:
 *       type: object
 *       required:
 *         - store_id
 *         - name
 *         - description
 *       properties:
 *         store_id:
 *           type: string
 *           example: 660404a9d59613a72bcd1070
 *         name:
 *           type: string
 *           example: One Plus_test
 *         description:
 *           type: string
 *           example: swagger description
 *     BrandResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 * 
 * 
 */

/**
 * @swagger
 * /api/brand/addbrand:
 *   post:
 *     summary: Add Brand
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/brand/listbrand:
 *   get:
 *     summary: List Brand
 *     tags: [Brand]
 *     parameters: 
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter menu by Name
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/vendors/updatebrand/{id}:
 *   post:
 *     summary: Update Brand
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: store_id
 *         schema:
 *           type: string
 *         required: true
 *         description: update by store ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */