import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import CursorPagination from "./CursorPagination";

const TableWithCursorPagination = ({data, properties, onChange, pageSizeOptions = [10], defaultPageSize = 10}) => {
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (data && data.edges) {
            const newDataSource = data.edges.map(e => e.node);
            setDataSource(newDataSource);
        }
    }, [data]);

    const onPagerChange = ({previous = false, next = false}) => {
        console.log('pager changed');
        if (!onChange || !data.pageInfo) return;
        if (previous && data.pageInfo.hasPreviousPage) {
            onChange({
                last: pageSize,
                before: data.pageInfo.startCursor,
            });
            return;
        }
        if (next && data.pageInfo.hasNextPage) {
            onChange({
                first: pageSize,
                after: data.pageInfo.endCursor,
            });
        }
    };

    return (
        <>
            <Table
                dataSource={dataSource}
                {...properties}
                pagination={false}
            />
            {data.pageInfo ?
                <CursorPagination
                    total={data.fullCount} hasPreviousPage={data.pageInfo.hasPreviousPage}
                    hasNextPage={data.pageInfo.hasNextPage}
                    onChange={onPagerChange}
                />
                : null}
        </>
    );
};

export default TableWithCursorPagination;
