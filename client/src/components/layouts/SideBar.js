import React, {useEffect, useState} from 'react';

import {
    DatabaseOutlined,
    FileTextOutlined,
    FormOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    SnippetsOutlined,
    StockOutlined,
    TagsOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined
} from '@ant-design/icons';

import {Layout, Menu, message} from "antd";
import {Link, useHistory} from "react-router-dom";

import './SideBar.css';
import axios from "../../libs/axios";
import routes, {getRealRoutes} from "../routes";
import ProtectedArea from "../common/ProtectedArea";
import {useRecoilValue} from "recoil";
import {permissionState} from "../../states/recoil/atoms/permission";

const {Sider} = Layout;

class SideBar extends React.Component {
    state = {
        groups: [],
    };

    getSettingGroups = () => {
        axios.get('/setting').then(res => {
            this.setState({groups: res.data.settingGroups});
        }).catch(err => {
            message.error('Không thể lấy thông tin cài đặt');
        });
    };

    componentDidMount() {
        if (this.props.staff.token) {
            this.getSettingGroups();
        }
    }

    render() {
        const {groups} = this.state;
        let defaultOpenKeys = [];

        switch (this.props.location.pathname) {
            case "/category":
            case "/product":
                defaultOpenKeys = ['k_product'];
                break;
            case "/staff":
            case "/staff-group":
                defaultOpenKeys = ['k_staff'];
                break;
            case "/report/inventory":
            case "/report/revenue":
                defaultOpenKeys = ['k_report'];
                break;
            default:
                break;
        }

        if (!this.props.staff.staff) return null;
        const {permissions} = this.props.staff.staff;
        if (!permissions) return null;
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                theme="light"
            >
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + "/logo.png"} width="100%" height="auto"/>
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={this.props.location.pathname}
                      defaultOpenKeys={defaultOpenKeys}>
                    {permissions.staff ?
                        <Menu.SubMenu key="k_staff" title={
                            <span>
                                <UserOutlined/>
                                <span>Nhân viên</span>
                             </span>
                        }>
                            <Menu.Item key="/staff">
                                <Link to='/staff'>
                                    <UserOutlined/>
                                    <span>Nhân viên</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/staff-group">
                                <Link to='/staff-group'>
                                    <TeamOutlined/>
                                    <span>Nhóm nhân viên</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu> : null}
                    {permissions.product.read ?
                        <Menu.SubMenu key="k_product" title={
                            <span>
                            <DatabaseOutlined/>
                            <span>Sản phẩm</span>
                        </span>
                        }>
                            <Menu.Item key="/product">
                                <Link to="/product">
                                    <TagsOutlined/>
                                    <span>Sản phẩm</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/category">
                                <Link to="/category">
                                    <UnorderedListOutlined/>
                                    <span>Danh mục</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu> : null}
                    {permissions.sale ?
                        <Menu.Item key="/sale">
                            <Link to="/sale">
                                <ShoppingCartOutlined/>
                                <span><b>Bán hàng</b></span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.invoice ?
                        <Menu.Item key="/invoice">
                            <Link to="/invoice">
                                <FileTextOutlined/>
                                <span>Hóa đơn</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.receipt.read ?
                        <Menu.Item key="/receipt">
                            <Link to="/receipt">
                                <SnippetsOutlined/>
                                <span>Nhập / xuất kho</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.customer ?
                        <Menu.Item key="/customer">
                            <Link to='/customer'>
                                <TeamOutlined/>
                                <span>Khách hàng</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.report ?
                        <Menu.SubMenu key="k_report" title={
                            <span>
                            <FormOutlined/>
                            <span>Báo cáo</span>
                        </span>
                        }>
                            <Menu.Item key="/report/inventory">
                                <Link to='/report/inventory'>
                                    <DatabaseOutlined/>
                                    <span>Kiểm kho</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/report/revenue">
                                <Link to='/report/revenue'>
                                    <StockOutlined/>
                                    <span>Doanh thu</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu> : null}
                    <Menu.SubMenu key="k_setting" title={
                        <span>
                            <SettingOutlined/>
                            <span>Cài đặt chung</span>
                        </span>
                    }>
                        {groups.map((group) =>
                            <Menu.Item key={"/setting/" + group.varname}>
                                <Link to={"/setting/" + group.varname}>
                                    <span>{group.name}</span>
                                </Link>
                            </Menu.Item>)}
                    </Menu.SubMenu>
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff,
    }
};

const SideBarHook = () => {
    const history = useHistory();

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme="light"
        >
            <div className="logo">
                <img src={process.env.PUBLIC_URL + "/logo.png"} width="100%" height="auto"/>
            </div>
            <RenderedSidebar pathname={history.location.pathname}/>
        </Sider>
    );
};

const RenderedSidebar = ({pathname}) => {
    const permissions = useRecoilValue(permissionState);

    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(undefined);
    const [defaultOpenKeys, setDefaultOpenKeys] = useState(undefined)
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        // Open key
        const realRoutes = getRealRoutes();
        for (const realRoute of realRoutes) {
            let matched;
            for (const path of realRoute.path) {
                if ((realRoute.exact && pathname === path)
                    || (!realRoute.exact && pathname.startsWith(path))
                ) {
                    matched = realRoute.path[0];
                    break;
                }
            }
            if (matched) {
                setDefaultSelectedKeys([matched]);
                if (realRoute.hasOwnProperty('parent')) {
                    setDefaultOpenKeys([realRoute.parent.children[0].path[0]])
                } else {
                    setDefaultOpenKeys([]);
                }
                break;
            }
        }
    }, [pathname]);

    if (!defaultSelectedKeys || !defaultOpenKeys) return null;
    return (
        <Menu theme="light" mode="inline"
              defaultSelectedKeys={defaultSelectedKeys}
              defaultOpenKeys={defaultOpenKeys}
        >
            {routes.map((menu) => {
                if (!menu.hasOwnProperty('children')) {
                    return (
                        <ProtectedArea key={menu.path[0]} permissions={menu.permissions}>
                            <Menu.Item key={menu.path[0]}>
                                <Link to={menu.path[0]}>
                                    {menu.icon}
                                    <span>{menu.name}</span>
                                </Link>
                            </Menu.Item>
                        </ProtectedArea>
                    );
                }

                let hiddenMenu = 0;
                const subMenuList = menu.children.map(subMenu => {
                    let hasPermissionCount = 0;
                    for (const permissionKey of subMenu.permissions) {
                        if (permissions[permissionKey]) {
                            hasPermissionCount++;
                            continue;
                        }
                    }
                    if (hasPermissionCount <= 0) hiddenMenu++;
                    return (
                        <ProtectedArea key={subMenu.path[0]} permissions={subMenu.permissions}>
                            <Menu.Item key={subMenu.path[0]}>
                                <Link to={subMenu.path[0]}>
                                    {subMenu.icon}
                                    <span>{subMenu.name}</span>
                                </Link>
                            </Menu.Item>
                        </ProtectedArea>
                    );
                });

                if (hiddenMenu === menu.children.length) return null;

                return (
                    <Menu.SubMenu key={menu.children[0].path[0]} title={
                        <span>
                        {menu.icon}
                            <span>{menu.name}</span>
                    </span>
                    }>
                        {subMenuList}
                    </Menu.SubMenu>
                );
            })}
        </Menu>
    );
}

// export default withRouter(connect(mapStateToProps)(SideBar));

export default SideBarHook;
