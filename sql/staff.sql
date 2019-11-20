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

 Date: 20/11/2019 14:47:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES (1, 'admin', '$2b$10$sVOMDgsfOW4/Ipl1QuAja.iFu2v238u9XKM192XFeUS2u70Xn3rz.', 'Administrator', 'admin@vstore.net', 1, '2019-11-18 14:36:04', '2019-11-19 07:34:19');

SET FOREIGN_KEY_CHECKS = 1;
