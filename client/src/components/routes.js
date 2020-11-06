import React from 'react';
import {
    DashboardOutlined,
    DatabaseOutlined, FileTextOutlined, FormOutlined, ShoppingCartOutlined, SnippetsOutlined, StockOutlined,
    TagsOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons";
import DashboardPage from "./pages/DashboardPage";
import StaffPage from "./pages/staff/StaffPage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/category/CategoryPage";
import SalePage from "./pages/SalePage";
import InvoicePage from "./pages/InvoicePage";
import ReceiptPage from "./pages/ReceiptPage";
import CustomerPage from "./pages/CustomerPage";
import ReportPage from "./pages/ReportPage";
import ReportRevenuePage from "./pages/ReportRevenuePage";

const routes = [
    {
        path: [ '/dashboard', '/'],
        exact: true,
        icon: <DashboardOutlined/>,
        name: "Trang chính",
        component: DashboardPage,
        permissions: ['dashboard'],
    },
    {
        icon: <UserOutlined/>,
        name: "Nhân viên",
        children: [
            {
                path: ['/staff'],
                exact: false,
                icon: <UserOutlined/>,
                name: "Nhân viên",
                component: StaffPage,
                permissions: ['staff.list'],
            },
            {
                path: ['/staff-group'],
                exact: false,
                icon: <TeamOutlined/>,
                name: "Nhóm nhân viên",
                component: null,
                permissions: ['staff_group.list'],
            }
        ]
    },
    {
        icon: <DatabaseOutlined/>,
        name: "Sản phẩm",
        children: [
            {
                path: ['/product'],
                exact: false,
                icon: <TagsOutlined/>,
                name: "Sản phẩm",
                component: ProductPage,
                permissions: ['product.list'],
            },
            {
                path: ['/category'],
                exact: false,
                icon: <UnorderedListOutlined/>,
                name: "Danh mục",
                component: CategoryPage,
                permissions: ['category.list'],
            }
        ]
    },
    {
        path: ['/sale'],
        exact: false,
        icon: <ShoppingCartOutlined/>,
        name: "Bán hàng",
        component: SalePage,
        permissions: ['sale'],
    },
    {
        path: ['/invoice'],
        exact: false,
        icon: <FileTextOutlined/>,
        name: "Hóa đơn / đơn hàng",
        component: InvoicePage,
        permissions: ['invoice.list'],
    },
    {
        path: ['/receipt'],
        exact: false,
        icon: <SnippetsOutlined/>,
        name: "Nhập / xuất kho",
        component: ReceiptPage,
        permissions: ['receipt.list'],
    },
    {
        path: ['/customer'],
        exact: false,
        icon: <TeamOutlined/>,
        name: "Khách hàng",
        component: CustomerPage,
        permissions: ['customer.list'],
    },
    {
        icon: <FormOutlined/>,
        name: "Báo cáo",
        children: [
            {
                path: ['/report/inventory'],
                exact: false,
                icon: <DatabaseOutlined/>,
                name: "Kiểm kho",
                component: ReportPage,
                permissions: ['report.inventory'],
            },
            {
                path: ['/report/revenue'],
                exact: false,
                icon: <StockOutlined/>,
                name: "Doanh thu",
                component: ReportRevenuePage,
                permissions: ['report.revenue'],
            }
        ]
    },
];

export const getRealRoutes = () =>  {
    const realRoutes = [];
    for (const menu of routes) {
        if (!menu.hasOwnProperty('children')) {
            realRoutes.push(menu);
            continue;
        }
        for (const subMenu of menu.children) {
            subMenu.parent = menu;
            realRoutes.push(subMenu);
        }
    }
    return realRoutes;
}

export default routes;
