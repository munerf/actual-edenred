Edenred Actual CLI

Edenred Actual CLI is a command-line interface (CLI) tool for managing transactions between Edenred and Actual APIs.

Installation:

1. Clone the repository:

   git clone https://github.com/yourusername/edenred-actual-cli.git

2. Navigate to the project directory:

   cd edenred-actual-cli

3. Install dependencies:

   pnpm install

Usage:

Configuration:

1. Create a .env file in the root directory of the project.

2. Add the following environment variables to the .env file:

   - EDENRED_USERNAME=your_edenred_username
   - EDENRED_PASSWORD=your_edenred_password
   - ACTUAL_API_KEY=your_actual_api_key
   - ACTUAL_SERVER=your_actual_server_host
   - ACTUAL_BUDGET=your_budget_id

Commands:

List Cards:

List all credit cards associated with the Edenred account.

app list-cards

List Movements:

List movements (transactions) of a specific credit card by name.

app list-movements <cardname>

Import Transactions:

Import transactions from Edenred API to Actual API.

app actual <actual_account> <edenred_account>

- <actual_account>: Actual account where transactions will be imported.
- <edenred_account>: Edenred account from which transactions will be fetched.

Contributing:

Contributions are welcome! Please submit issues or pull requests if you encounter any problems or have suggestions for improvements.

License:

This project is licensed under the MIT License. See the LICENSE file for details.
