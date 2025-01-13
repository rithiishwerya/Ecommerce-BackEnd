/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginBody:
 *       type: object
 *       required:
 *         - email 
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: user@gmail.com
 *         password:
 *           type: number
 *           example: Sample@1234$
 *         phone:
 *     UserRegisterBody:
 *       type: object
 *       required:
 *         - name
 *         - email 
 *         - password
 *         - phone  
 *       properties:
 *         name:
 *           type: string
 *           example: test
 *         email:
 *           type: string
 *           example: user@gmail.com
 *         password:
 *           type: number
 *           example: Sample@1234$
 *         phone:
 *           type: number
 *           example: 98765432
 *     UpdateUserBody:
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
 *     UsersResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: login
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserLoginBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserRegisterBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update User
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUserBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/user/sendemail:
 *   post:
 *     summary: Send Email
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *     responses:
 *       200:
 *         description: Data Saved Success
 */


/**
 * @swagger
 * /api/user/verifyemail:
 *   put:
 *     summary: Verify Email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               otp:
 *                 type: number
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Success
 */

