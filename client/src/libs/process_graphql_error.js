import {message} from "antd";

export const processGraphqlError = (err, form) => {
    if (!err.hasOwnProperty('graphQLErrors')) return;
    err.graphQLErrors.forEach(e => {
        const {message: messageStr} = e;
        if (!e.extensions.hasOwnProperty('fieldErrors') || !form) {
            message.error(messageStr);
            return;
        }
        for (const fieldError of e.extensions.fieldErrors) {
            if (!fieldError.hasOwnProperty('field')) continue;
            form.setFields([{
                name: fieldError.field,
                errors: [messageStr],
            }]);
        }
    });
};
