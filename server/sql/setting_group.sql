-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 19, 2020 lúc 07:03 PM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vstore`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `setting_group`
--

CREATE TABLE `setting_group` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `varname` varchar(255) NOT NULL,
  `description` text,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `index` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Đang đổ dữ liệu cho bảng `setting_group`
--

INSERT INTO `setting_group` (`id`, `name`, `varname`, `description`, `active`, `index`, `created_at`, `updated_at`) VALUES
(1, 'Trang chủ', 'homepage', 'Cài đặt tên và địa chỉ trang chủ', 1, 1, NULL, NULL),
(2, 'Bảo mật', 'security', 'Cài đặt bảo mật cho website', 1, 2, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `setting_group`
--
ALTER TABLE `setting_group`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `setting_group`
--
ALTER TABLE `setting_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
