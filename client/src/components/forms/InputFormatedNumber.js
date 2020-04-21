import React from "react";
import {InputNumber} from "antd";

class InputFormatedNumnber extends React.Component {
    render() {
        return (<InputNumber min={0}
                             {...this.props}
                             formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                             parser={value => value.replace(/\$\s?|(,*)/g, '')}
                             style={{width: '100%'}}/>
        );
    }
}

export default InputFormatedNumnber;