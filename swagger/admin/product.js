/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product Management
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductRequestBody:
 *       type: object
 *       required:
 *         - productname
 *         - brand
 *         - category
 *         - subcategory
 *         - childcategory
 *         - mrpprice
 *         - sellingprice
 *         - resellerprice
 *         - productfeaturedimage
 *         - producthoverfeaturedimage
 *         - shortdescription
 *         - description
 *         - productimage
 *         - variant
 *       properties:
 *         store_id:
 *           type: string
 *           example: 660404a9d59613a72bcd1070
 *         productname:
 *           type: string
 *           example: PHONES_test
 *         brand:
 *           type: string
 *           example: 660be87d0d0402fbc3b43be0
 *         category:
 *           type: string
 *           example: 660a8a9d2f7b5d2319c9fe26
 *         subcategory:
 *           type: string
 *           example: 660b8aea52ab2716c786fa5e
 *         childcategory:
 *           type: string
 *           example: 660ba8583c669c5dcd3b16c3
 *         mrpprice:
 *           type: number
 *           example: 75000
 *         sellingprice:
 *           type: number
 *           example: 70000
 *         resellerprice:
 *           type: number
 *           example: 50000
 *         productgst:
 *           type: number
 *           example: 18
 *         productfeaturedimage:
 *           type: string
 *           example: http://localhost:2000/uploads/productfeaturedimage_1712215198161.png
 *         producthoverfeaturedimage:
 *           type: string
 *           example: http://localhost:2000/uploads/producthoverfeaturedimage_1712215198165.jpg
 *         shortdescription:
 *           type: string
 *           example: Oneplus 7t phones
 *         description:
 *           type: string
 *           example: good camera pixels and speed
 *         productimage:
 *           type: array
 *           items:
 *             type: string
 *             example: http://localhost:2000/uploads/productImage_1712205718968.png
 *           default: []
 *         variant:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *              variantid: 
 *                type: string
 *                example : 660cecff55bfb745f0acf0c4
 *              unitid: 
 *                type: string
 *                example : 660cfafe9e1be7c4b14ea4b2
 *     DeleteBody:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: number
 *           example: 1
 *     Response:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 * 
 */

/**
 * @swagger
 * /api/product/addProducts:
 *   post:
 *     summary: Add Product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */



/**
 * @swagger
 * /api/product/getproduct:
 *   get:
 *     summary: List Product
 *     tags: [Product]
 *     parameters: 
 *       - in: query
 *         name: productname
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter product by productname
 *       - in: query
 *         name: store_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter product by store_id
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/product/updateProductFields/{id}:
 *   put:
 *     summary: Update Product 
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/product/updateProductImage/{id}:
 *   put:
 *     summary: Update Product multiple Image
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                productimage:
 *                  type: array
 *                  items:
 *                    type: string
 *                    format: binary
 *                  description: "Featured image file"
 *     responses:
 *       200:
 *         description: Success
 */



/**
 * @swagger
 * /api/product/deleteCart/{id}:
 *   delete:
 *     summary: Delete Product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/product/addvariant:
 *   post:
 *     summary: Add variant
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                variantid:
 *                  type: string
 *                  example: 660cecff55bfb745f0acf0c4
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/product/updatevariant/{id}:
 *   put:
 *     summary: Update Variant
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: variants'ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               variantid:
 *                 type: string
 *                 example: 660cecff55bfb745f0acf0c4
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/product/deleteVariant/{id}:
 *   delete:
 *     summary: Delete Variant
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: variants'ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteBody'
 *     responses:
 *       200:
 *         description: Success
 */