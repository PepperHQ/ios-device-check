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

### Querying a device
```
const key = readFileSync('key.p8').toString();

const jwt = jsonwebtoken.sign({}, key, { algorithm: 'ES256', keyid: 'AP00LNP89K', issuer: 'PJK0EZJ3I6' });

try {
    const queryResult = await deviceCheck.QueryDevice(jwt, { 
        device_token: 'aDeviceToken',
        // Optional, will be set as Date.now() if omitted
        timestamp: Date.now()
        // Optional, will be set as V4 UUID if omitted
        transaction_id: 'aTransactionId'
    });
} catch (err) {
    console.log(err);
}

```

### Updating the bits for a device
```
const key = readFileSync('key.p8').toString();

const jwt = jsonwebtoken.sign({}, key, { algorithm: 'ES256', keyid: 'AP00LNP89K', issuer: 'PJK0EZJ3I6' });

try {
    await deviceCheck.UpdateDevice(jwt, { 
        device_token: 'aDeviceToken',
        // Optional, will be default to Date.now() if omitted
        timestamp: Date.now()
        // Optional, will be default to V4 UUID if omitted
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
const key = readFileSync('key.p8').toString();

const jwt = jsonwebtoken.sign({}, key, { algorithm: 'ES256', keyid: 'AP00LNP89K', issuer: 'PJK0EZJ3I6' });

// Will throw if device token is invalid
try {
    await deviceCheck.ValidateDevice(jwt, { 
        device_token: 'aDeviceToken',
        // Optional, will be default to Date.now() if omitted
        timestamp: Date.now()
        // Optional, will be default to V4 UUID if omitted
        transaction_id: 'aTransactionId'
    });
} catch (err) {
    console.log(err);
}
```

