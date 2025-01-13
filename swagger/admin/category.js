/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryRequestBody:
 *       type: object
 *       required:
 *         - store_id
 *         - name 
 *         - image
 *       properties:
 *         store_id:
 *           type: string
 *           example: 660404a9d59613a72bcd1070
 *         name:
 *           type: string
 *           example: phone_test
 *         image:
 *           type: string
 *           example: http://localhost:2000/uploads/image_1711976756076.png
 *     subCategoryRequestBody:
 *       type: object
 *       required:
 *         - name
 *         - image 
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           example: Oneplus 7t_test
 *         image:
 *           type: string
 *           example: http://localhost:2000/uploads/image_1712032490361.png
 *         categoryId:
 *           type: string
 *           example: 660a8a9d2f7b5d2319c9fe26
 *     childCategoryRequestBody:
 *       type: object
 *       required:
 *         - name
 *         - image 
 *         - categoryId
 *         - subcategoryId
 *       properties:
 *         name:
 *           type: string
 *           example: oneplus 7t color_test
 *         image:
 *           type: string
 *           example: http://localhost:2000/uploads/image_1712032490361.png
 *         categoryId:
 *           type: string
 *           example: 660a8a9d2f7b5d2319c9fe26
 *         subcategoryId:
 *           type: string
 *           example: 660b8aea52ab2716c786fa5e
 *     Response:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/category/add:
 *   post:
 *     summary: Add Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/category/list:
 *   get:
 *     summary: List Category
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Category name
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/category/update/{id}:
 *   put:
 *     summary: Update Category
 *     tags: [Category]
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
 *             $ref: '#/components/schemas/CategoryRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */


/////////////


/**
 * @swagger
 * /api/category/addsub:
 *   post:
 *     summary: Add Sub Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subCategoryRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/category/listsub:
 *   get:
 *     summary: List Sub Category
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter sub category by name 
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/category/update/{id}:
 *   put:
 *     summary: Update Category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: sub category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subCategoryRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

//////////


/**
 * @swagger
 * /api/category/addchild:
 *   post:
 *     summary: Add Child Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/childCategoryRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/category/listchild:
 *   get:
 *     summary: List Child Category
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter child category by name 
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/category/update/{id}:
 *   put:
 *     summary: Update Child Category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sub Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/childCategoryRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/category/categoryFlow:
 *   get:
 *     summary: List categoryFlow
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Category Flow by ID
 *     responses:
 *       200:
 *         description: Success
 */