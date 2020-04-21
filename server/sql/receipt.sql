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

 Date: 15/12/2019 19:21:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of receipt
-- ----------------------------
INSERT INTO `receipt` VALUES (4, NULL, 1, 'Tân Hiệp Phát', 1, NULL, 1, 190000, 20, '2019-12-15 19:04:50', '2019-12-15 19:04:50');
INSERT INTO `receipt` VALUES (5, NULL, 1, 'Tân Hiệp Phát', 1, NULL, 1, 96000, 10, '2019-12-15 19:09:06', '2019-12-15 19:09:06');
INSERT INTO `receipt` VALUES (6, NULL, 1, 'Indonesia', 1, NULL, 1, 73500, 15, '2019-12-15 19:15:32', '2019-12-15 19:15:32');
INSERT INTO `receipt` VALUES (7, NULL, 1, 'Coca-cola Việt Nam', 1, NULL, 1, 1372750, 95, '2019-12-15 19:18:30', '2019-12-15 19:18:30');

SET FOREIGN_KEY_CHECKS = 1;
