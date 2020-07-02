import React from 'react';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

const CursorPagination = ({total = 0, hasPreviousPage = false, hasNextPage = false, onChange}) => {
    const handleClick = (params = {previous: false, next: false}) => {
        if ((params.previous && hasPreviousPage) || (params.next || hasNextPage))
            onChange(params);
    }

    return (
        <ul className="ant-pagination ant-table-pagination ant-table-pagination-right" unselectable="unselectable">
            <li className="ant-pagination-total-text">
                Tổng cộng có <b>{total}</b> mục
            </li>
            <li title="Trang Trước"
                className={"ant-pagination-prev" + (hasPreviousPage ? "" : " ant-pagination-disabled")}
                aria-disabled={!hasPreviousPage} onClick={() => handleClick({previous: true})}>
                <a
                    className="ant-pagination-item-link">
                    <LeftOutlined/>
                </a>
            </li>
            <li title="Trang Kế" className={"ant-pagination-next" + (hasNextPage ? "" : " ant-pagination-disabled")}
                aria-disabled={!hasNextPage} onClick={() => handleClick({next: true})}>
                <a
                    className="ant-pagination-item-link">
                    <RightOutlined/>
                </a>
            </li>
        </ul>
    );
};

export default CursorPagination;
