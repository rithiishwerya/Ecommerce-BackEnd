/**
 * @swagger
 * tags:
 *   name: Cart / Wishlist
 *   description: CartWishlist management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartRequestBody:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - variantID
 *         - quantity
 *       properties:
 *         userId:
 *           type: string
 *           example: 660408edef07f9048f127ff7
 *         productId:
 *           type: string
 *           example: 660d24cefae4244c4a77ef26
 *         variantID:
 *           type: string
 *           example: 660cecff55bfb745f0acf0c4
 *         quantity:
 *           type: number
 *           example: 2
 *     WishlistRequestBody:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *       properties:
 *         userId:
 *           type: string
 *           example: 660408edef07f9048f127ff7
 *         productId:
 *           type: string
 *           example: 660d24cefae4244c4a77ef26
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
 * /api/cartwishlist/addToCart:
 *   post:
 *     summary: Add Cart
 *     tags: [Cart / Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/cartwishlist/getCartItems:
 *   get:
 *     summary: List Cart
 *     tags: [Cart / Wishlist]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter cart by userId
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/cartwishlist/deleteCart/{id}:
 *   delete:
 *     summary: Delete Cart
 *     tags: [Cart / Wishlist]
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
 * /api/cartwishlist/addToWishlist:
 *   post:
 *     summary: Add Wishlist
 *     tags: [Cart / Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/cartwishlist/getWishlistItems:
 *   get:
 *     summary: List Wishlist
 *     tags: [Cart / Wishlist]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter wishlist by userId
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/cartwishlist/deleteWishlist/{id}:
 *   delete:
 *     summary: Delete Wishlist
 *     tags: [Cart / Wishlist]
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

////////////


/**
 * @swagger
 * /api/cartwishlist/postCompare:
 *   post:
 *     summary: Add Compare items
 *     tags: [Cart / Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/cartwishlist/compareProducts:
 *   get:
 *     summary: List Compare items
 *     tags: [Cart / Wishlist]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter cart by userId
 *     responses:
 *       200:
 *         description: Success
 */
