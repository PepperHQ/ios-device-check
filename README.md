# Device Check
A Promise-based Node.js client for the Apple device check API.
https://developer.apple.com/documentation/devicecheck/accessing_and_modifying_per-device_data

## Installation
``` 
npm install device-check 
```

## Usage

### Initialization
```
const deviceCheck = new DeviceCheck(ApiHost.DEVELOPMENT);
```

### Querying device
```
try {
    const queryResult = await deviceCheck.QueryDevice({ 
        device_token: 'aDeviceToken',
        // Optional, will be set as Date.now() if ommitted
        timestamp: Date.now()
        // Optional, will be set as V4 UUID if ommitted
        transaction_id: 'aTransactionId'
    });
} catch (err) {
    console.log(err);
}

```

### Updating the bits for a device
```
try {
    await deviceCheck.UpdateDevice({ 
        device_token: 'aDeviceToken',
        // Optional, will be default to Date.now() if ommitted
        timestamp: Date.now()
        // Optional, will be default to V4 UUID if ommitted
        transaction_id: 'aTransactionId'
        bit0: true,
        bit1: false
    });
} catch (err) {
    console.log(err);
}
```

### Validating a device token
```
// Will throw if device token is invalid
try {
    await deviceCheck.ValidateDevice({ 
        device_token: 'aDeviceToken',
        // Optional, will be default to Date.now() if ommitted
        timestamp: Date.now()
        // Optional, will be default to V4 UUID if ommitted
        transaction_id: 'aTransactionId'
    });
} catch (err) {
    console.log(err);
}
```

