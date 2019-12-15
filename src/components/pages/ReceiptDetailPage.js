import React from 'react';
import {withRouter} from "react-router-dom";

class ReceiptDetailPage extends React.Component {
    render() {
        return (<div>{this.props.match.params.id}</div>);
    }
}

export default withRouter(ReceiptDetailPage);