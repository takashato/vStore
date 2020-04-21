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
-- Cấu trúc bảng cho bảng `setting`
--

CREATE TABLE `setting` (
  `varname` varchar(255) NOT NULL,
  `value` text,
  `default_value` text,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `formatter` text,
  `group_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Đang đổ dữ liệu cho bảng `setting`
--

INSERT INTO `setting` (`varname`, `value`, `default_value`, `name`, `description`, `formatter`, `group_id`, `created_at`, `updated_at`) VALUES
('address', NULL, 'https://vstore.zenmaple.com', 'Địa chỉ trang chủ', 'Địa chỉ (link) trang chủ của website', 'Input', 1, NULL, NULL),
('login', NULL, 'Đăng nhập bằng sđt', 'Quản lý đăng nhập', 'Phương thức đăng nhập vào CMS', 'Input', 2, NULL, NULL),
('webName', NULL, 'Quản lý bán hàng vStore', 'Tên website', 'Tên hiển thị (title) trên tab tìm kiếm', 'Input', 1, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`varname`) USING BTREE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
