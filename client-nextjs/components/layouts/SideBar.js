import Image from "next/image";

import '../../styles/sidebar.less';
import {Layout} from "antd";

const SideBar = () => {
    return (
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme="light"
        >
            <div className="logo">
                <Image src={"/logo.png"} width={1024} height={512}/>
            </div>
        </Layout.Sider>
    )
};

export default SideBar;
