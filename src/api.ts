// (c) PepperHQ Limited - All Right Reserved
import fetch, { Request } from 'node-fetch';
import uuid from 'uuid';
import { ApiError } from './error';

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

// TODO: Find a way of using unknown with object typeguards
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isQueryDeviceResult(result: any): result is QueryDeviceResult {
    return typeof result.bit0 === 'boolean' &&
        typeof result.bit1 === 'boolean' &&
        typeof result.last_update_time === 'string';
}

export async function QueryDevice(host: string, jwt: string, payload: QueryDevicePayload): Promise<QueryDeviceResult> {
    let request;
    let response;
    try {
        const url = `https://${host}/v1/query_two_bits`;

        const headers = {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }

        const body: QueryDevicePayload = {
            device_token: payload.device_token,
            transaction_id: payload.transaction_id || uuid(),
            timestamp: payload.timestamp || Date.now()
        };

        request = new Request(url, { method: 'POST', headers, body: JSON.stringify(body) })
        response = await fetch(request);

        if (response.status !== 200) {
            throw new Error(`Device check api returned ${response.status}: ${await response.text()}`);
        }

        const responseBody = await response.clone().json();

        if (!isQueryDeviceResult(responseBody)) {
            throw new Error('Failed to parse response from device check api');
        }

        return responseBody;
    } catch (err) {
        if (request) {
            throw new ApiError(request, response, err)
        }
        throw err
    }
}

export interface UpdateDevicePayload extends QueryDevicePayload {
    bit0: boolean;
    bit1: boolean;
}

export async function UpdateDevice(host: string, jwt: string, payload: UpdateDevicePayload): Promise<void> {
    let request;
    let response;
    try {
        const url = `https://${host}/v1/update_two_bits`;

        const headers = {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }

        const body: UpdateDevicePayload = {
            device_token: payload.device_token,
            bit0: payload.bit0,
            bit1: payload.bit1,
            transaction_id: payload.transaction_id || uuid(),
            timestamp: payload.timestamp || Date.now(),
        };

        request = new Request(url, { method: 'POST', headers, body: JSON.stringify(body) })
        response = await fetch(request);

        if (response.status !== 200) {
            throw new Error(`Device check api returned ${response.status}: ${await response.clone().text()}`);
        }

    } catch (err) {
        if (request) {
            throw new ApiError(request, response, err)
        }
        throw err
    }
}

export type ValidateDevicePayload = QueryDevicePayload;

// The documentation is cryptic about what is returned if the token is invalid so we assume any error === invalid 
// and throw an error if one is returned instead of returning a boolean.
export async function ValidateDevice(host: string, jwt: string, payload: ValidateDevicePayload): Promise<void> {
    let request;
    let response;
    try {
        const url = `https://${host}/v1/validate_device_token`;

        const headers = {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }

        const body: ValidateDevicePayload = {
            device_token: payload.device_token,
            transaction_id: payload.transaction_id || uuid(),
            timestamp: payload.timestamp || Date.now()
        };

        request = new Request(url, { method: 'POST', headers, body: JSON.stringify(body) })
        response = await fetch(request);

        if (response.status !== 200) {
            throw new Error(`Device check api returned ${response.status}: ${await response.clone().text()}`);
        }
    } catch (err) {
        if (request) {
            throw new ApiError(request, response, err)
        }
        throw err
    }
} 