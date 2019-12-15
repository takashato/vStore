import React from 'react';
import debounce from "lodash.debounce";
import axios from "../../libs/axios";
import {Select, Spin} from "antd";

class CustomerSelector extends React.Component {
    state = {
        data: [],
        value: [],
        fetching: false,
    };

    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchData = debounce(this.fetchData, 800);
    }

    fetchData = value => {
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({data: [], fetching: true});
        axios.get('/customer', {
            params: {
                results: 10,
                fields: this.props.fields ? this.props.fields.join(',') : 'id,full_name,phone_number',
                search: value,
            }
        })
            .then(res => {
                if (fetchId !== this.lastFetchId) {
                    // for fetch callback order
                    return;
                }
                this.setState({data: res.data.rows, fetching: false});
            });
    };

    handleChange = value => {
        this.setState({
            value,
            fetching: false,
        });
        if (this.props.onChange) this.props.onChange(value);
    };

    componentDidMount() {
        this.fetchData(undefined);
    }

    render() {
        return (
            <Select
                {...this.props}
                value={this.props.value}
                labelInValue
                notFoundContent={this.state.fetching ? <Spin size="small"/> : null}
                showSearch
                onSearch={this.fetchData}
                onChange={this.handleChange}
                filterOption={false}
                placeholder="Tìm khách hàng..."
            >
                {this.state.data.map(d => (
                    <Select.Option key={d.id}>{d.full_name + ' - ' + d.phone_number}</Select.Option>
                ))}
            </Select>
        );
    }
}

export default CustomerSelector;