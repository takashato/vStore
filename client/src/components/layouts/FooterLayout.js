import React from "react";
import {Layout} from "antd";
import moment from "moment";

const FooterLayout = function(props) {
    return (
        <Layout.Footer style={{textAlign: 'center'}}>vStore &copy; {moment().format("YYYY")} by vTeam.</Layout.Footer>
    );
};

export default FooterLayout;