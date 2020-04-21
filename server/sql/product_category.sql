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

 Date: 14/12/2019 20:28:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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

SET FOREIGN_KEY_CHECKS = 1;
