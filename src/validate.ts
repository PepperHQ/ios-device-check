import fetch from 'node-fetch';
import uuid from 'uuid';
import { QueryDevicePayload } from './query';

// API Documentation available at:
// https://developer.apple.com/documentation/devicecheck/accessing_and_modifying_per-device_data

export type ValidateDevicePayload = QueryDevicePayload;

// The documentation is cryptic about what is returned if the token is invalid so we assume any error === invalid 
// and throw an error if one is returned instead of returning a boolean.
export async function ValidateDevice(host: string, jwt: string, payload: ValidateDevicePayload): Promise<void> {
    const url = `https://${host}/v1/validate_device_token`;

    const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json'
    }

    const body: ValidateDevicePayload = {
        device_token: payload.device_token,
        transaction_id: payload.transaction_id || uuid(),
        timestamp: payload.timestamp || Date.now()
    };

    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), compress: true });

    if (response.status !== 200) {
        throw new Error(`Device check api returned ${response.status}: ${await response.text()}`);
    }
} 