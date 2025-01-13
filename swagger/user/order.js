/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckoutRequestBody:
 *       type: object
 *       required:
 *         - user_id
 *         - sub_total
 *         - shipping_amount
 *         - gst
 *         - total
 *         - coupon_code
 *         - first_name
 *         - last_name
 *         - company_name
 *         - email
 *         - phone_number
 *         - alternate_contact_number
 *         - address1
 *         - address2
 *         - landmark
 *         - city
 *         - state
 *         - pincode
 *       properties:
 *         user_id:
 *           type: string
 *           example: 6687b75f43c4d4454c5c164f
 *         sub_total:
 *           type: number
 *           example: 7000
 *         shipping_amount:
 *           type: number
 *           example: 300
 *         gst:
 *           type: number
 *           example: 18
 *         total:
 *           type: number
 *           example: 8000
 *         coupon_code:
 *           type: string
 *           example: coupon_code_test
 *         first_name:
 *           type: test
 *           example: 660404a9d59613a72bcd1070
 *         last_name:
 *           type: test
 *           example: One Plus_test
 *         company_name:
 *           type: string
 *           example: test_company
 *         email:
 *           type: string
 *           example: rithi@test.com
 *         phone_number:
 *           type: number
 *           example: 987654321
 *         alternate_contact_number:
 *           type: string
 *           example: 987654321
 *         address1:
 *           type: string
 *           example: rondy street
 *         address2:
 *           type: string
 *           example: r.s.puram
 *         landmark:
 *           type: string
 *           example: milk booth
 *         city:
 *           type: string
 *           example: cbe
 *         state:
 *           type: string
 *           example: TN
 *         pincode:
 *           type: number
 *           example: 641002
 *     OrderResponse:
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
 * /api/order/placeOrder:
 *   post:
 *     summary: Add Order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckoutRequestBody'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/order/listOrder:
 *   get:
 *     summary: List Order
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter Order by user_id
 *     responses:
 *       200:
 *         description: Success
 */
