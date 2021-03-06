import React from 'react';
import {PrinterOutlined} from '@ant-design/icons';
import {Form} from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {Button, DatePicker, message, PageHeader, Table, Typography} from "antd";
import ReactToPrint from "react-to-print";
import moment from "moment";
import axios from "../../libs/axios";
import {number_format} from "../../libs/number_formater";
import enumerateDaysBetweenDates from "../../libs/date_enumerator";
import {Line} from "@ant-design/charts";

const dateFormat = 'DD/MM/YYYY';

class ReportRevenuePage extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
        range: [undefined, undefined],
    };

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Ngày',
                dataIndex: 'date',
                render: (data) => data.format(dateFormat),
            }, {
                title: 'Doanh thu',
                dataIndex: 'revenue',
                render: (data) => number_format(data),
            }
        ];
        this.fields = this.columns.map(e => e.dataIndex);
    }

    getData = () => {
        this.setState({loading: true});
        axios.get('/stat/revenue', {
            params: {
                start: this.state.range[0].format(dateFormat),
                end: this.state.range[1].format(dateFormat),
            }
        }).then(res => {
            let data = res.data;
            let newData = enumerateDaysBetweenDates(this.state.range[0], this.state.range[1]).map((e) => ({
                date: e,
                revenue: 0
            }));
            for (let i = 0; i < newData.length; ++i) {
                const dateStr = newData[i].date.format('YYYY-MM-DD');
                const idx = data.findIndex(e => e.date === dateStr);
                if (idx > -1) {
                    newData[i].revenue = data[idx].revenue;
                }
            }
            this.setState({data: newData});
        }).catch(err => {
            console.log(err);
            message.error('Không thể tạo thông tin báo cáo.');
        }).finally(() => {
            this.setState({loading: false});
        });
    };

    handleDate = async (value) => {
        await this.setState({range: value});
        this.getData();
    };

    componentDidMount() {
    }

    render() {
        console.log(this.state.data);
        const chartConfig = {
            data: this.state.data.map((e) => ({...e, date: e.date.format("D/M/Y")})),
            xField: "date",
            yField: "revenue",
            meta: {
                // date: {
                //     formatter: (moment) => {
                //         return moment.format('d/m/Y');
                //     }
                // }
            }
        };

        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Báo cáo doanh thu"
                    subTitle="Báo cáo danh thu trong khoảng thời gian"
                />
                <div className="container">
                    <div>
                        <Form layout="inline">
                            <Form.Item>
                                <DatePicker.RangePicker defaultValue={this.state.range} onChange={this.handleDate}
                                                        format={dateFormat} allowClear={false}/>
                            </Form.Item>
                            <Form.Item style={{float: "right"}}>
                                <ReactToPrint trigger={() => (<Button icon={<PrinterOutlined/>}>In Báo Cáo</Button>)}
                                              content={() => this.tableRef}
                                              pageStyle="padding: 20px;"/>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        {this.state.data ? <Line {...chartConfig}/> : null}
                    </div>
                    <div ref={(ref) => this.tableRef = ref} className="container">
                        <Table columns={this.columns} rowKey="date" dataSource={this.state.data}
                               loading={this.state.loading}
                               pagination={false} size="small"
                               title={() => (
                                   <div>
                                       <Typography.Title level={4}>Báo cáo doanh thu</Typography.Title>
                                       <div>Thời gian tạo: {moment().format('HH:mm:ss DD/MM/YYYY')}</div>
                                       <div>Có tất cả {this.state.data.length} mục trong báo cáo.</div>
                                   </div>
                               )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportRevenuePage;
