/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100406
 Source Host           : localhost:3306
 Source Schema         : vstore

 Target Server Type    : MySQL
 Target Server Version : 100406
 File Encoding         : 65001

 Date: 01/08/2020 08:48:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` date NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, 'Bành Thanh Sơn', '0362804401', '2001-01-01', '2019-12-16 00:41:32', '2019-12-16 00:41:32');
INSERT INTO `customer` VALUES (2, 'Phạm Trần Chính', '0361111111', '1999-01-01', '2019-12-16 14:53:14', '2019-12-16 14:53:14');

-- ----------------------------
-- Table structure for invoice
-- ----------------------------
DROP TABLE IF EXISTS `invoice`;
CREATE TABLE `invoice`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NULL DEFAULT NULL,
  `staff_id` int(11) NOT NULL,
  `prepaid_value` double NULL DEFAULT NULL,
  `total_value` double NULL DEFAULT NULL,
  `discount_value` double NULL DEFAULT NULL,
  `total_final_value` double NULL DEFAULT NULL,
  `pay_method` int(11) NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `staff_id`(`staff_id`) USING BTREE,
  INDEX `customer_id`(`customer_id`) USING BTREE,
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of invoice
-- ----------------------------
INSERT INTO `invoice` VALUES (7, 1, 1, 40000, 40000, 0, 40000, 0, '2019-12-16 02:07:04', '2019-12-16 02:07:04');
INSERT INTO `invoice` VALUES (16, 1, 1, 10000, 3500, 0, 3500, 0, '2019-12-16 02:15:57', '2019-12-16 02:15:57');
INSERT INTO `invoice` VALUES (23, 2, 1, 1000000, 10500, 0, 10500, 0, '2019-12-16 16:34:56', '2019-12-16 16:34:56');
INSERT INTO `invoice` VALUES (24, 1, 1, 150000, 95000, 0, 95000, 0, '2020-02-20 22:40:42', '2020-02-20 22:40:42');
INSERT INTO `invoice` VALUES (25, NULL, 1, 120000, 55100, 0, 55100, 0, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `invoice` VALUES (26, 1, 1, 2000000, 10000, 100, 9900, 0, '2020-06-06 11:41:43', '2020-06-06 11:41:44');
INSERT INTO `invoice` VALUES (27, 1, 1, 1000000, 110000, 1000, 109000, 0, '2020-07-31 16:04:08', '2020-07-31 16:04:08');

-- ----------------------------
-- Table structure for invoice_detail
-- ----------------------------
DROP TABLE IF EXISTS `invoice_detail`;
CREATE TABLE `invoice_detail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` double NULL DEFAULT NULL,
  `quantity` double NULL DEFAULT NULL,
  `total_value` double NULL DEFAULT NULL,
  `discount_value` double NULL DEFAULT NULL,
  `total_final_value` double NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `invoice_id`(`invoice_id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE,
  CONSTRAINT `invoice_detail_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `invoice_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of invoice_detail
-- ----------------------------
INSERT INTO `invoice_detail` VALUES (1, 7, 1, 3500, 10, 35000, 0, NULL, '2019-12-16 02:07:04', '2019-12-16 02:07:04');
INSERT INTO `invoice_detail` VALUES (2, 7, 2, 5000, 1, 5000, 0, NULL, '2019-12-16 02:07:04', '2019-12-16 02:07:04');
INSERT INTO `invoice_detail` VALUES (11, 16, 1, 3500, 1, 3500, 0, NULL, '2019-12-16 02:15:57', '2019-12-16 02:15:57');
INSERT INTO `invoice_detail` VALUES (20, 23, 1, 3500, 3, 10500, 0, NULL, '2019-12-16 16:34:56', '2019-12-16 16:34:56');
INSERT INTO `invoice_detail` VALUES (21, 24, 9, 19000, 5, 95000, 0, 95000, '2020-02-20 22:40:42', '2020-02-20 22:40:42');
INSERT INTO `invoice_detail` VALUES (22, 25, 2, 5000, 1, 5000, 0, 5000, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `invoice_detail` VALUES (23, 25, 3, 10000, 2, 20000, 0, 20000, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `invoice_detail` VALUES (24, 25, 5, 7000, 1, 7000, 0, 7000, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `invoice_detail` VALUES (25, 25, 6, 7000, 2, 14000, 0, 14000, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `invoice_detail` VALUES (26, 25, 7, 9100, 1, 9100, 0, 9100, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `invoice_detail` VALUES (27, 26, 4, 9900, 1, 10000, 100, 9900, '2020-06-06 11:41:43', '2020-06-06 11:41:43');
INSERT INTO `invoice_detail` VALUES (28, 27, 3, 10000, 1, 10000, 0, 10000, '2020-07-31 16:04:08', '2020-07-31 16:04:08');
INSERT INTO `invoice_detail` VALUES (29, 27, 4, 10000, 10, 100000, 1000, 99000, '2020-07-31 16:04:08', '2020-07-31 16:04:08');

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `key` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `default_value` int(1) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bar_code` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `category_id` int(11) NOT NULL,
  `price` double NULL DEFAULT NULL,
  `original_price` double NULL DEFAULT NULL,
  `inventory_quantity` double NOT NULL,
  `added_by` int(11) NULL DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id`) USING BTREE,
  FULLTEXT INDEX `name`(`name`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, '891223456789', 'Mì ăn liền Hảo Hảo chua cay', 8, 3500, 3500, 86, 1, 0, '2019-12-14 14:47:33', '2019-12-16 16:34:56');
INSERT INTO `product` VALUES (2, '891000000000', 'Mì ăn liền Indomie sa tế cay', 8, 5000, 5000, 13, 1, 0, '2019-12-14 15:20:03', '2020-05-18 14:28:15');
INSERT INTO `product` VALUES (3, '891000000001', 'Nước ngọt Number One', 1, 10000, 10000, 27, 1, 0, '2019-12-14 22:49:53', '2020-07-31 16:04:08');
INSERT INTO `product` VALUES (4, '891000000002', 'Nước ngọt Sting dâu', 1, 9900, 10000, -11, 1, 0, '2019-12-14 23:09:01', '2020-07-31 16:04:08');
INSERT INTO `product` VALUES (5, '5053867119885', 'Snack Mực Tẩm Gia Vị Cay Ngọt Bento (6g / Gói)', 2, 7000, NULL, -1, 1, 0, '2019-12-14 23:39:14', '2020-05-18 14:28:15');
INSERT INTO `product` VALUES (6, '1442664639179', 'Snack Mực Tẩm Gia Vị Cay Bento (6g)', 2, 7000, NULL, -2, 1, 0, '2019-12-14 23:39:47', '2020-05-18 14:28:15');
INSERT INTO `product` VALUES (7, '8936079120092', 'Snack Lay\'s Vị Khoai Tây Tự Nhiên Classic (56g / Gói)', 2, 9100, NULL, -1, 1, 0, '2019-12-14 23:40:24', '2020-05-18 14:28:15');
INSERT INTO `product` VALUES (8, '2787163826057', 'Snack Lays Khoai Tây Hành Kem 29 gr', 2, 5900, NULL, 0, 1, 0, '2019-12-14 23:41:11', '2019-12-14 23:41:11');
INSERT INTO `product` VALUES (9, '3690590705576', 'Nước Giải Khát Có Gas Coca-Cola (2.25L)', 1, 19000, NULL, 90, 1, 0, '2019-12-14 23:42:15', '2020-02-20 22:40:42');
INSERT INTO `product` VALUES (10, '8934588063176', 'Nước khoáng thiên nhiên Aquafina 5L', 1, 19500, NULL, 0, 1, 0, '2019-12-14 23:43:02', '2019-12-14 23:43:02');
INSERT INTO `product` VALUES (11, '3629048969086', 'Cá Chiên Sốt Tương Ớt Pompui 155g', 3, 11000, NULL, 0, 1, 0, '2019-12-14 23:44:16', '2019-12-14 23:44:16');

-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_category
-- ----------------------------
INSERT INTO `product_category` VALUES (1, 'Nước giải khát', '2019-12-11 16:00:31', '2019-12-11 17:28:32');
INSERT INTO `product_category` VALUES (2, 'Snack', '2019-12-11 17:08:06', '2019-12-11 17:28:50');
INSERT INTO `product_category` VALUES (3, 'Đồ hộp', '2019-12-11 17:30:04', '2019-12-11 17:30:04');
INSERT INTO `product_category` VALUES (4, 'Rau củ quả', '2019-12-11 17:30:28', '2019-12-11 17:30:28');
INSERT INTO `product_category` VALUES (5, 'Sữa', '2019-12-11 17:30:37', '2019-12-11 17:30:37');
INSERT INTO `product_category` VALUES (6, 'Thịt trứng', '2019-12-11 17:31:09', '2019-12-11 17:31:09');
INSERT INTO `product_category` VALUES (7, 'Dụng cụ nhà bếp', '2019-12-12 00:33:30', '2019-12-12 00:33:30');
INSERT INTO `product_category` VALUES (8, 'Mì các loại', '2019-12-12 00:34:29', '2019-12-12 00:34:29');
INSERT INTO `product_category` VALUES (9, 'Thức ăn nhanh chế biến sẵn', '2019-12-12 00:35:31', '2019-12-12 00:35:31');
INSERT INTO `product_category` VALUES (10, 'Dầu gội, sữa tắm', '2019-12-12 00:36:28', '2019-12-12 00:36:28');
INSERT INTO `product_category` VALUES (11, 'Sữa rửa mặt', '2019-12-12 00:36:46', '2019-12-12 00:36:46');
INSERT INTO `product_category` VALUES (12, 'BCS, gel', '2019-12-12 00:37:45', '2019-12-12 00:37:45');
INSERT INTO `product_category` VALUES (13, 'Kem đánh răng', '2020-06-06 08:25:31', '2020-06-06 08:25:31');

-- ----------------------------
-- Table structure for receipt
-- ----------------------------
DROP TABLE IF EXISTS `receipt`;
CREATE TABLE `receipt`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `type` tinyint(1) NOT NULL,
  `source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `staff_id` int(11) NOT NULL,
  `customer_id` int(11) NULL DEFAULT NULL,
  `total` int(11) NOT NULL,
  `total_money` double NULL DEFAULT NULL,
  `total_amount` double NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `staff_id`(`staff_id`) USING BTREE,
  CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of receipt
-- ----------------------------
INSERT INTO `receipt` VALUES (4, NULL, 1, 'Tân Hiệp Phát', 1, NULL, 1, 190000, 20, '2019-12-15 19:04:50', '2019-12-15 19:04:50');
INSERT INTO `receipt` VALUES (5, NULL, 1, 'Tân Hiệp Phát', 1, NULL, 1, 96000, 10, '2019-12-15 19:09:06', '2019-12-15 19:09:06');
INSERT INTO `receipt` VALUES (6, NULL, 1, 'Indonesia', 1, NULL, 1, 73500, 15, '2019-12-15 19:15:32', '2019-12-15 19:15:32');
INSERT INTO `receipt` VALUES (7, NULL, 1, 'Coca-cola Việt Nam', 1, NULL, 1, 1372750, 95, '2019-12-15 19:18:30', '2019-12-15 19:18:30');
INSERT INTO `receipt` VALUES (14, 'Hóa đơn #7', -1, 'Kho', 1, 1, 2, 40000, 11, '2019-12-16 02:07:04', '2019-12-16 02:07:04');
INSERT INTO `receipt` VALUES (23, 'Hóa đơn #16', -1, 'Kho', 1, 1, 1, 3500, 1, '2019-12-16 02:15:57', '2019-12-16 02:15:57');
INSERT INTO `receipt` VALUES (30, 'Hóa đơn #23', -1, 'Kho', 1, 2, 1, 10500, 3, '2019-12-16 16:34:56', '2019-12-16 16:34:56');
INSERT INTO `receipt` VALUES (31, 'Hóa đơn #24', -1, 'Kho', 1, 1, 1, 95000, 5, '2020-02-20 22:40:42', '2020-02-20 22:40:42');
INSERT INTO `receipt` VALUES (32, 'Hóa đơn #25', -1, 'Kho', 1, NULL, 5, 55100, 7, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `receipt` VALUES (33, 'Hóa đơn #26', -1, 'Kho', 1, 1, 1, 9900, 1, '2020-06-06 11:41:43', '2020-06-06 11:41:44');
INSERT INTO `receipt` VALUES (34, 'Hóa đơn #27', -1, 'Kho', 1, 1, 2, 109000, 11, '2020-07-31 16:04:08', '2020-07-31 16:04:08');

-- ----------------------------
-- Table structure for receipt_detail
-- ----------------------------
DROP TABLE IF EXISTS `receipt_detail`;
CREATE TABLE `receipt_detail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receipt_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` double NULL DEFAULT NULL,
  `amount` double NULL DEFAULT NULL,
  `total_money` double NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `receipt_id`(`receipt_id`) USING BTREE,
  CONSTRAINT `receipt_detail_ibfk_1` FOREIGN KEY (`receipt_id`) REFERENCES `receipt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of receipt_detail
-- ----------------------------
INSERT INTO `receipt_detail` VALUES (4, 4, 3, 9500, 20, 190000, '2019-12-15 19:04:50', '2019-12-15 19:04:50');
INSERT INTO `receipt_detail` VALUES (5, 5, 3, 9600, 10, 96000, '2019-12-15 19:09:06', '2019-12-15 19:09:06');
INSERT INTO `receipt_detail` VALUES (6, 6, 2, 4900, 15, 73500, '2019-12-15 19:15:32', '2019-12-15 19:15:32');
INSERT INTO `receipt_detail` VALUES (7, 7, 9, 14450, 95, 1372750, '2019-12-15 19:18:30', '2019-12-15 19:18:30');
INSERT INTO `receipt_detail` VALUES (8, 14, 1, 3500, 10, 35000, '2019-12-16 02:07:04', '2019-12-16 02:07:04');
INSERT INTO `receipt_detail` VALUES (9, 14, 2, 5000, 1, 5000, '2019-12-16 02:07:04', '2019-12-16 02:07:04');
INSERT INTO `receipt_detail` VALUES (18, 23, 1, 3500, 1, 3500, '2019-12-16 02:15:57', '2019-12-16 02:15:57');
INSERT INTO `receipt_detail` VALUES (27, 30, 1, 3500, 3, 10500, '2019-12-16 16:34:56', '2019-12-16 16:34:56');
INSERT INTO `receipt_detail` VALUES (28, 31, 9, 19000, 5, 95000, '2020-02-20 22:40:42', '2020-02-20 22:40:42');
INSERT INTO `receipt_detail` VALUES (29, 32, 2, 5000, 1, 5000, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `receipt_detail` VALUES (30, 32, 3, 10000, 2, 20000, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `receipt_detail` VALUES (31, 32, 5, 7000, 1, 7000, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `receipt_detail` VALUES (32, 32, 6, 7000, 2, 14000, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `receipt_detail` VALUES (33, 32, 7, 9100, 1, 9100, '2020-05-18 14:28:15', '2020-05-18 14:28:15');
INSERT INTO `receipt_detail` VALUES (34, 33, 4, 9900, 1, 9900, '2020-06-06 11:41:44', '2020-06-06 11:41:44');
INSERT INTO `receipt_detail` VALUES (35, 34, 3, 10000, 1, 10000, '2020-07-31 16:04:08', '2020-07-31 16:04:08');
INSERT INTO `receipt_detail` VALUES (36, 34, 4, 9900, 10, 99000, '2020-07-31 16:04:08', '2020-07-31 16:04:08');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20200624040713-create_staff.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042418-product_category.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042753-product.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042908-invoice.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042914-invoice_detail.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042923-receipt.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042927-receipt_detail.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042940-customer.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042951-setting_group.js');
INSERT INTO `sequelizemeta` VALUES ('20200624042955-setting.js');
INSERT INTO `sequelizemeta` VALUES ('20200702085428-create-staff-group.js');
INSERT INTO `sequelizemeta` VALUES ('20200702090031-create-staff-group-permission.js');
INSERT INTO `sequelizemeta` VALUES ('20200702091228-create-permission.js');

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `varname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `default_value` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `formatter` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `group_id` int(11) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`varname`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of setting
-- ----------------------------
INSERT INTO `setting` VALUES ('address', NULL, 'https://vstore.zenmaple.com', 'Địa chỉ trang chủ', 'Địa chỉ (link) trang chủ của website', 'Input', 1, NULL, NULL);
INSERT INTO `setting` VALUES ('login', NULL, 'Đăng nhập bằng sđt', 'Quản lý đăng nhập', 'Phương thức đăng nhập vào CMS', 'Input', 2, NULL, NULL);
INSERT INTO `setting` VALUES ('webName', NULL, 'Quản lý bán hàng vStore', 'Tên website', 'Tên hiển thị (title) trên tab tìm kiếm', 'Input', 1, NULL, NULL);

-- ----------------------------
-- Table structure for setting_group
-- ----------------------------
DROP TABLE IF EXISTS `setting_group`;
CREATE TABLE `setting_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `varname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `index` int(11) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of setting_group
-- ----------------------------
INSERT INTO `setting_group` VALUES (1, 'Trang chủ', 'homepage', 'Cài đặt tên và địa chỉ trang chủ', 1, 1, NULL, NULL);
INSERT INTO `setting_group` VALUES (2, 'Bảo mật', 'security', 'Cài đặt bảo mật cho website', 1, 2, NULL, NULL);

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `group_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES (1, 'admin', '$2b$10$t5ZcupO08JQIV.HWJnuC2.NAWtO90p57O057hISvGs7wKYGvyk0Yq', 'Quản Trị Viên', 'admin@vstore.net', 1, 1, '2019-11-18 14:36:04', '2020-06-27 05:00:11');
INSERT INTO `staff` VALUES (3, 'takashato', '$2b$10$z6ow3xafBKy/dxnU.ouFv.XWNZUY8vYRKVgbp6GySVzAqZXzhPF12', 'Bành Thanh Sơn', 'takashato@gmail.com', 1, 1, '2019-12-10 04:15:48', '2020-06-23 04:23:45');
INSERT INTO `staff` VALUES (4, 'manager', '$2b$10$yu1x.kbw3fNDeWzginXJW.txu4OJ3ShPByR3iWp4A2h4j.BD1P8iW', 'Quản lý', 'manager@vstore.net', 2, 1, '2019-12-10 04:18:45', '2019-12-10 04:18:45');
INSERT INTO `staff` VALUES (5, 'staff', '$2b$10$lzAn/OpvVPNXtLGZFJcGb.0h0Uc/0AmDfAam5CXhJXTisxiQyr/gK', 'Nhân viên', 'staff@vstore.com', 3, 1, '2019-12-10 04:19:56', '2019-12-15 00:34:12');
INSERT INTO `staff` VALUES (6, 'test', '$2b$10$9542q4dV2PL7VN2xtpSoX.w.8f7QxCpXVDbyvSku86su0y1Xjv3s.', 'Test Account', 'test@vstore.net', 3, 0, '2020-06-23 03:55:18', '2020-06-23 04:57:54');
INSERT INTO `staff` VALUES (7, 'test02', '$2b$10$7SFaEn57fUDvHKjLseIta.470ucCgjTYCQ98BOyq6oAla7jJ/rgv2', 'Test 02', 'test02@vstore.com', 3, 0, '2020-06-26 04:09:40', '2020-07-31 16:05:30');
INSERT INTO `staff` VALUES (8, 'test03', '$2b$10$jNyKV7KaP6jQSKBaGd2UF.aO2kGZb2RPfgmGztM8ZPMOO86eNerTS', 'Test 03', 'test03@vstore.net', 3, 0, '2020-06-26 04:23:36', '2020-07-31 16:05:34');
INSERT INTO `staff` VALUES (9, 'test04', '$2b$10$wgmNMaU49V7cKIfoxg3GyO48GfHRfG.Efm6IhUd4Op07l2JXc/kuC', 'Test 04', 'test04@vstore.net', 3, 0, '2020-06-26 04:24:25', '2020-07-31 16:05:37');
INSERT INTO `staff` VALUES (10, 'test05', '$2b$10$LQY3D.7PcDVJ3vWZSvqZX.Y2cGrRpFIU05/edbnXAs3yFASk90niO', 'Test 05', 'test05@vstore.net', 3, 0, '2020-06-26 04:42:34', '2020-07-31 16:05:40');
INSERT INTO `staff` VALUES (11, 'test06', '$2b$10$L7bqFDKsszHwqrUMCV4fg.QMEWY0QGW4Oulb7abAXA0VEgy.BQ41K', 'Test 06', 'test06@vstore.net', 3, 0, '2020-06-26 04:43:10', '2020-06-26 04:43:10');
INSERT INTO `staff` VALUES (12, 'test07', '$2b$10$Dykp.SLdlqL/MKYjApZGtu0P40vIzBZGKwIQcZMT5mTLUPVo6eCve', 'Test 07', 'test07@vstore.net', 3, 1, '2020-06-26 04:45:38', '2020-06-26 04:45:38');
INSERT INTO `staff` VALUES (13, 'test08', '$2b$10$xK5ag2lqMCe9vsLxS5tQMeBl4k/ADhdGglxXiyXZ0UST66eYBlUwS', 'Test 08', 'test08@vstore.net', 3, 1, '2020-06-26 04:54:42', '2020-06-26 04:54:42');

-- ----------------------------
-- Table structure for staff_group
-- ----------------------------
DROP TABLE IF EXISTS `staff_group`;
CREATE TABLE `staff_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff_group
-- ----------------------------

-- ----------------------------
-- Table structure for staff_group_permission
-- ----------------------------
DROP TABLE IF EXISTS `staff_group_permission`;
CREATE TABLE `staff_group_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `key` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` int(1) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff_group_permission
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
