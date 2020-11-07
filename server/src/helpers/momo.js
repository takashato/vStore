import axios from 'axios';
import crypto from 'crypto';
import {partnerCode, accessKey, secretKey, endpointUrl} from '../config/momo.json';

function generateSignature(rawSignature) {
    return crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
}

export async function requestPayment(paymentInfo) {
    const toSend = {
        ...paymentInfo,
        requestType: 'captureMoMoWallet',
        partnerCode,
        accessKey,
    };
    try {
        const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${paymentInfo.requestId}&amount=${paymentInfo.amount}&orderId=${paymentInfo.orderId}&orderInfo=${paymentInfo.orderInfo || ""}&returnUrl=${paymentInfo.returnUrl}&notifyUrl=${paymentInfo.notifyUrl}&extraData=${paymentInfo.extraData}`;
        console.log('raw signature ', rawSignature);
        toSend.signature = generateSignature(rawSignature);
        console.log('signature ', toSend.signature);
        const {data} = await axios.post(endpointUrl, toSend);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return false;
    }
}
