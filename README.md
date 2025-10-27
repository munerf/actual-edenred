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

Contributing:

Contributions are welcome! Please submit issues or pull requests if you encounter any problems or have suggestions for improvements.

License:

This project is licensed under the MIT License. See the LICENSE file for details.
