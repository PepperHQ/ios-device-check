import fetch from 'node-fetch';
import uuid from 'uuid';

// API Documentation available at:
// https://developer.apple.com/documentation/devicecheck/accessing_and_modifying_per-device_data

export interface QueryDevicePayload {
    // Base 64–encoded representation of encrypted device information
    device_token: string;

    // Unique transaction identifier
    // If omitted, a V4 UUID is generated and sent to the API
    transaction_id?: string;

    // UTC timestamp in milliseconds since the Unix epoch
    // If omitted, a UNIX timestamp of the current time is generated and sent to the API
    timestamp?: number;
}

export interface QueryDeviceResult {
    bit0: boolean;
    bit1: boolean;
    last_update_time: string
}

function isQueryDeviceResult(result: any): result is QueryDeviceResult {
    return typeof result.bit0 === 'boolean' &&
        typeof result.bit1 === 'boolean' && 
        typeof result.last_update_time === 'string';
}

export async function QueryDevice(host: string, jwt: string, payload: QueryDevicePayload): Promise<QueryDeviceResult> {
    const url = `https://${host}/v1/query_two_bits`;

    const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json'
    }

    const body: QueryDevicePayload = {
        device_token: payload.device_token,
        transaction_id: payload.transaction_id || uuid(),
        timestamp: payload.timestamp || Date.now()
    };

    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), compress: true });

    if (response.status !== 200) {
        throw new Error(`Device check api returned ${response.status}: ${await response.text()}`);
    }

    const responseBody = await response.json();

    if (!isQueryDeviceResult(responseBody)) {
        throw new Error('Failed to parse response from device check api');
    }

    return responseBody;
} 