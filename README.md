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
   EDENRED_USERNAME=your_edenred_username
   EDENRED_PASSWORD=your_edenred_password

   # Actual Budget API Configuration
   ACTUAL_SERVER=https://your-actual-server.com
   ACTUAL_PASSWORD=your_actual_server_password
   ACTUAL_TMPFOLDER=/tmp/actual-data
   ACTUAL_BUDGET=your_budget_id

   # Optional: Enable debug logging
   DEBUG=false
   ```

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

## Deployment

When deploying to a server (especially Linux servers):

1. **Do NOT copy `node_modules` from your development machine**
2. Install dependencies on the target server:

```bash
cd /path/to/actual-edenred
pnpm install
pnpm build
```

### Why?

This project depends on `@actual-app/api`, which uses `better-sqlite3` - a native Node.js module that must be compiled for the specific operating system and Node.js version. Installing dependencies directly on the target server ensures native modules are built correctly.

## Troubleshooting

### Error: "Could not locate the bindings file" for better_sqlite3

**Cause:** Native modules were installed on a different OS (e.g., macOS) than where they're being run (e.g., Linux).

**Solution:** Rebuild native dependencies on the target machine:

```bash
# Option 1: Reinstall all dependencies (recommended)
rm -rf node_modules
pnpm install

# Option 2: Rebuild just the native modules
pnpm rebuild better-sqlite3
```

### TLS Certificate Warning

If you see `NODE_TLS_REJECT_UNAUTHORIZED` warnings, ensure your Actual Budget server has a valid SSL certificate. In production, never set `NODE_TLS_REJECT_UNAUTHORIZED=0` as it makes connections insecure.

Contributing:

Contributions are welcome! Please submit issues or pull requests if you encounter any problems or have suggestions for improvements.

License:

This project is licensed under the MIT License. See the LICENSE file for details.
