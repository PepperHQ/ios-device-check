import fetch from 'node-fetch';
import uuid from 'uuid';
import { QueryDevicePayload } from './query';
// API Documentation available at:
// https://developer.apple.com/documentation/devicecheck/accessing_and_modifying_per-device_data

export interface UpdateDevicePayload extends QueryDevicePayload {
    bit0: boolean;
    bit1: boolean;
}

export async function UpdateDevice(host: string, jwt: string, payload: UpdateDevicePayload): Promise<void> {
    const url = `https://${host}/v1/update_two_bits`;

    const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json'
    }

    const body: UpdateDevicePayload = {
        device_token: payload.device_token,
        bit0: payload.bit0,
        bit1: payload.bit1,
        transaction_id: payload.transaction_id || uuid(),
        timestamp: payload.timestamp || Date.now(),
    };

    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), compress: true });

    if (response.status !== 200) {
        throw new Error(`Device check api returned ${response.status}: ${await response.text()}`);
    }
} 