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

 Date: 10/12/2019 12:46:22
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
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES (1, 'admin', '$2b$10$Vnod3DQ3J.ecC0ocoRk5dequEXN7455IUamZRF.vKTNkAHymG5P8q', 'Quản trị viên', 'admin@vstore.net', 1, 1, '2019-11-18 14:36:04', '2019-12-10 05:27:04');
INSERT INTO `staff` VALUES (3, 'takashato', '$2b$10$aB78Gak8YcYartwk6JYqWOdIwTeS8MyKHH.J1Bm7MTClv8mY2X8Vq', 'Bành Thanh Sơn', 'takashato@gmail.com', 1, 1, '2019-12-10 04:15:48', '2019-12-10 04:15:48');
INSERT INTO `staff` VALUES (4, 'manager', '$2b$10$yu1x.kbw3fNDeWzginXJW.txu4OJ3ShPByR3iWp4A2h4j.BD1P8iW', 'Quản lý', 'manager@vstore.net', 2, 1, '2019-12-10 04:18:45', '2019-12-10 04:18:45');
INSERT INTO `staff` VALUES (5, 'staff', '$2b$10$lzAn/OpvVPNXtLGZFJcGb.0h0Uc/0AmDfAam5CXhJXTisxiQyr/gK', 'Nhân viên', 'staff@vstore.com', 3, 1, '2019-12-10 04:19:56', '2019-12-10 04:19:56');

SET FOREIGN_KEY_CHECKS = 1;
