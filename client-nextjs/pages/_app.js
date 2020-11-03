import '../styles/globals.less'
import {RecoilRoot, useRecoilState} from "recoil";
import {ConfigProvider, Spin} from "antd";
import viVN from 'antd/lib/locale/vi_VN';
import {useRouter} from "next/router";
import {userTokenSelector} from "../state/recoil/user";
import {useEffect, useState} from "react";
import LoginLayout from "../components/layouts/LoginLayout";
import MainLayout from "../components/layouts/MainLayout";


function MyApp({Component, pageProps}) {
    return (
        <ConfigProvider locale={viVN}>
            <RecoilRoot>
                <AppContainer>
                    <Component {...pageProps} />
                </AppContainer>
            </RecoilRoot>
        </ConfigProvider>
    )
}

const AppContainer = ({children}) => {
    const router = useRouter();

    const [token, setToken] = useRecoilState(userTokenSelector);

    const [fetched, setFetched] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [refPath, setRefPath] = useState(router.pathname === '/login' ? '/' : router.pathname);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('session_token') || sessionStorage.getItem('session_token');
            if (token) {
                await setToken(token);
            }
            setFetched(true);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!fetched) return;
            if (router.pathname !== '/login' && !token) {
                setRefPath(router.pathname);
                await router.push('/login');
                return;
            }
            if (token) {
                if (refPath === '/login') {
                    await router.push('/');
                    setInitialized(true);
                    return;
                }
                await router.push(refPath);
                setInitialized(true);
            }
        })()
    }, [fetched, token]);

    if (!fetched || !initialized) {
        return (
            <Spin size="large">
                <div className='loading-screen'/>
            </Spin>
        );
    }

    if (router.pathname === "/login") {
        return <LoginLayout>{children}</LoginLayout>;
    }
    return <MainLayout>{children}</MainLayout>;
};

export default MyApp
