# Edenred Actual CLI

A command-line interface (CLI) tool for managing transactions between Edenred and Actual Budget APIs.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/actual-edenred.git
   cd actual-edenred
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the project:

   ```bash
   pnpm build
   ```

## Configuration

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your credentials:

   ```env
   # Edenred API Credentials
   EDENRED_USERID=your_edenred_userid
   EDENRED_PASSWORD=your_edenred_pin

   # Actual Budget API Configuration
   ACTUAL_SERVER=https://your-actual-server.com
   ACTUAL_PASSWORD=your_actual_server_password
   ACTUAL_TMPFOLDER=/tmp/actual-data
   ACTUAL_BUDGET=your_budget_id

   # Optional: Enable debug logging
   DEBUG=false
   ```

> **Note**: Edenred changed their authentication system. You now need to use your **User ID** and **PIN** (not username/password). The PIN is the same one used in the Edenred mobile app.

## Usage

### Development Mode

Run commands directly without building:

```bash
pnpm dev list-cards
pnpm dev list-movements <cardname>
pnpm dev import <edenred_account> <actual_account>
```

### Production Mode

After building, run using the compiled JavaScript:

```bash
node dist/bin.js list-cards
node dist/bin.js list-movements <cardname>
node dist/bin.js import <edenred_account> <actual_account>
```

Or install globally:

```bash
pnpm link --global
actual-edenred list-cards
```

## Commands

### List Cards

List all credit cards associated with the Edenred account.

```bash
actual-edenred list-cards
```

### List Movements

List movements (transactions) of a specific credit card by name.

```bash
actual-edenred list-movements <cardname>
```

### Import Transactions

Import transactions from Edenred API to Actual Budget API.

```bash
actual-edenred import <edenred_account> <actual_account>
```

- `<edenred_account>`: Edenred account from which transactions will be fetched
- `<actual_account>`: Actual Budget account where transactions will be imported

## Development

### Available Scripts

- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm clean` - Remove the dist directory
- `pnpm dev` - Run in development mode with tsx
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Requirements

- Node.js 20.x or higher (recommended for better native module support)
- pnpm package manager

## Technical Notes

### Reverse Engineering the PIN Authentication

Edenred Portugal changed their web authentication system, making the traditional username/password login obsolete. The new PIN-based authentication was reverse-engineered using the following process:

1. **Setup Proxyman on iPhone**
   - Install [Proxyman](https://proxyman.io/) on your Mac
   - Install the Proxyman certificate on your iPhone ([follow the official guide](https://docs.proxyman.io/debug-devices/ios-device))
   - Configure your iPhone to use your Mac as an HTTP proxy

2. **Capture Mobile App Traffic**
   - Open the Edenred mobile app on your iPhone
   - Log in using your PIN
   - In Proxyman, filter requests to `myedenred.pt`

3. **Identify the Authentication Endpoint**
   - Look for the POST request to `/authenticate/pin`
   - Note the request headers, body, and query parameters
   - Key findings:
     - Endpoint: `/authenticate/pin?appVersion=4.1.1&appType=IOS&channel=MOBILE`
     - Request body includes: `userId`, `password` (PIN), `appVersion`, `appType`
     - Response contains the authentication token

The authenticated token from the mobile endpoint works for both mobile and web API endpoints, which is how this CLI continues to function with Edenred's current authentication system.

## Contributing

Contributions are welcome! Please submit issues or pull requests if you encounter any problems or have suggestions for improvements.

License:

This project is licensed under the MIT License. See the LICENSE file for details.
