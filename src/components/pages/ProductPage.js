import React from "react";
import {connect} from "react-redux";

class ProductPage extends React.Component {
    render() {
        return (<div>Hello</div>);
    }
}

const mapStateToProps = (state) => {
    return {
        staff: state.staff,
    }
};

export default connect(mapStateToProps)(ProductPage);