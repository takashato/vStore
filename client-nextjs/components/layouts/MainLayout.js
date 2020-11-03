import {Layout, Skeleton} from "antd";

import '../../styles/main.less';
import dynamic from "next/dynamic";
import SideBar from "./SideBar";


const MainLayout = ({children}) => {
    return (
        <Layout className='main-layout'>
            <SideBar/>
            <Layout>
                <Layout.Content style={{margin: '24px 16px 0'}}>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    )
};

export default MainLayout;
