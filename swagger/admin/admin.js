/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminLoginBody:
 *       type: object
 *       required:
 *         - email 
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: notification.nestjs@gmail.com
 *         password:
 *           type: number
 *           example: Sample@1234$
 *         phone:
 *     AdminRegisterBody:
 *       type: object
 *       required:
 *         - name
 *         - email 
 *         - password
 *         - phone  
 *         - roleId
 *       properties:
 *         name:
 *           type: string
 *           example: test
 *         email:
 *           type: string
 *           example: notification.nestjs@gmail.com
 *         password:
 *           type: number
 *           example: Sample@1234$
 *         phone:
 *           type: number
 *           example: 98765432
 *     UpdateAdminBody:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - phone  
 *       properties:
 *         name:
 *           type: string
 *           example: test_update
 *         password:
 *           type: number
 *           example: 123456
 *         phone:
 *           type: number
 *           example: 7654321
 *     AdminResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: login
 *     tags: [Admin]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/AdminLoginBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register
 *     tags: [Admin]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/AdminRegisterBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/admin/update/{id}:
 *   put:
 *     summary: Update Admin
 *     tags: [Admin]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateAdminBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/admin/profile:
 *   get:
 *     summary: Get profile
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */


