import '../styles/globals.less'
import {RecoilRoot} from "recoil";
import {ConfigProvider} from "antd";
import viVN from 'antd/lib/locale/vi_VN';


function MyApp({Component, pageProps}) {
    return (
        <ConfigProvider locale={viVN}>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </ConfigProvider>
    )
}

export default MyApp
