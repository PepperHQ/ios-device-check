import { QueryDevicePayload, QueryDeviceResult, QueryDevice } from "./query";
import { UpdateDevicePayload, UpdateDevice } from "./update";
import { ValidateDevice, ValidateDevicePayload } from "./validate";

export enum ApiHost {
    PRODUCTION = 'api.devicecheck.apple.com',
    DEVELOPMENT = 'api.development.devicecheck.apple.com'
}

export class DeviceCheck {
    constructor(private host: ApiHost) { }

    public QueryDevice(jwt: string, payload: QueryDevicePayload): Promise<QueryDeviceResult> {
        return QueryDevice(this.host, jwt, payload);
    }

    public UpdateDevice(jwt: string, payload: UpdateDevicePayload): Promise<void> {
        return UpdateDevice(this.host, jwt, payload);
    }

    public ValidateDevice(jwt: string, payload: ValidateDevicePayload): Promise<void> {
        return ValidateDevice(this.host, jwt, payload);
    }
}
