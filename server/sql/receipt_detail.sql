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

 Date: 15/12/2019 19:22:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of receipt_detail
-- ----------------------------
INSERT INTO `receipt_detail` VALUES (4, 4, 3, 9500, 20, 190000, '2019-12-15 19:04:50', '2019-12-15 19:04:50');
INSERT INTO `receipt_detail` VALUES (5, 5, 3, 9600, 10, 96000, '2019-12-15 19:09:06', '2019-12-15 19:09:06');
INSERT INTO `receipt_detail` VALUES (6, 6, 2, 4900, 15, 73500, '2019-12-15 19:15:32', '2019-12-15 19:15:32');
INSERT INTO `receipt_detail` VALUES (7, 7, 9, 14450, 95, 1372750, '2019-12-15 19:18:30', '2019-12-15 19:18:30');

SET FOREIGN_KEY_CHECKS = 1;
