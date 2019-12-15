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

 Date: 15/12/2019 19:22:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
INSERT INTO `product` VALUES (1, '891223456789', 'Mì ăn liền Hảo Hảo chua cay', 8, 3500, 3500, 100, 1, 0, '2019-12-14 14:47:33', '2019-12-14 14:47:37');
INSERT INTO `product` VALUES (2, '891000000000', 'Mì ăn liền Indomie sa tế cay', 8, 5000, 5000, 15, 1, 0, '2019-12-14 15:20:03', '2019-12-15 19:15:32');
INSERT INTO `product` VALUES (3, '891000000001', 'Nước ngọt Number One', 1, 10000, 10000, 30, 1, 0, '2019-12-14 22:49:53', '2019-12-15 19:09:06');
INSERT INTO `product` VALUES (4, '891000000002', 'Nước ngọt Sting dâu', 1, 9900, 10000, 0, 1, 0, '2019-12-14 23:09:01', '2019-12-14 23:29:36');
INSERT INTO `product` VALUES (5, '5053867119885', 'Snack Mực Tẩm Gia Vị Cay Ngọt Bento (6g / Gói)', 2, 7000, NULL, 0, 1, 0, '2019-12-14 23:39:14', '2019-12-14 23:39:14');
INSERT INTO `product` VALUES (6, '1442664639179', 'Snack Mực Tẩm Gia Vị Cay Bento (6g)', 2, 7000, NULL, 0, 1, 0, '2019-12-14 23:39:47', '2019-12-14 23:39:47');
INSERT INTO `product` VALUES (7, '8936079120092', 'Snack Lay\'s Vị Khoai Tây Tự Nhiên Classic (56g / Gói)', 2, 9100, NULL, 0, 1, 0, '2019-12-14 23:40:24', '2019-12-14 23:40:24');
INSERT INTO `product` VALUES (8, '2787163826057', 'Snack Lays Khoai Tây Hành Kem 29 gr', 2, 5900, NULL, 0, 1, 0, '2019-12-14 23:41:11', '2019-12-14 23:41:11');
INSERT INTO `product` VALUES (9, '3690590705576', 'Nước Giải Khát Có Gas Coca-Cola (2.25L)', 1, 19000, NULL, 95, 1, 0, '2019-12-14 23:42:15', '2019-12-15 19:18:30');
INSERT INTO `product` VALUES (10, '8934588063176', 'Nước khoáng thiên nhiên Aquafina 5L', 1, 19500, NULL, 0, 1, 0, '2019-12-14 23:43:02', '2019-12-14 23:43:02');
INSERT INTO `product` VALUES (11, '3629048969086', 'Cá Chiên Sốt Tương Ớt Pompui 155g', 3, 11000, NULL, 0, 1, 0, '2019-12-14 23:44:16', '2019-12-14 23:44:16');

SET FOREIGN_KEY_CHECKS = 1;
