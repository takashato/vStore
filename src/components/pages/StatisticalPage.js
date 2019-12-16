import React from 'react';
import {connect} from "react-redux";

class StatisticalPage extends React.Component{

    state = {
        data: []
    };

    render() {
        return (
            <div>Statistical Page</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff,
    };
};

export default connect(mapStateToProps)(StatisticalPage);