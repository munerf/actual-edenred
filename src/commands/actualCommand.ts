import { Command } from 'commander'
import createEdenredAPI, { AccountInfo } from '../services/edenredService'
import { logDebug } from '../utils/logger'
import { ActualService, Transaction } from '../services/actualService'

export function actualCommand(program: Command) {
  program
    .command('import <edenred_account> <actual_account>')
    .description('Import transactions from Edenred API to Actual API')
    .action(async (edenredAccount: string, actualAccount: string) => {
      try {
        const edenredAPI = createEdenredAPI()

        await edenredAPI.login(
          process.env.EDENRED_USERNAME!,
          process.env.EDENRED_PASSWORD!,
        )

        const cards = await edenredAPI.listCards()
        const edenredAccountInfo = cards.find(
          (card: AccountInfo) =>
            card.name.toLowerCase() === edenredAccount.toLowerCase(),
        )
        if (!edenredAccountInfo) {
          throw new Error(`Edenred account '${edenredAccount}' not found.`)
        }

        const transactions = await edenredAPI.getMovements(edenredAccountInfo)
        console.log(`Got ${transactions.length} transactions`)
        logDebug(
          `Transactions retrieved from Edenred API for account '${edenredAccount}':`,
        )

        const actualServer = process.env.ACTUAL_SERVER!
        const actualPassword = process.env.ACTUAL_PASSWORD!
        const actualTmpFolder = process.env.ACTUAL_TMPFOLDER!
        const actualBudget = process.env.ACTUAL_BUDGET!

        const actualAPI = new ActualService()
        await actualAPI.init(
          actualServer,
          actualPassword,
          actualTmpFolder,
          actualBudget,
        )

        const actualTransactions = transactions.map(
          (m: {
            amount: number
            transactionDate: string | number | Date
            transactionName: string
          }) => {
            return {
              amount: actualAPI.amountToInteger(m.amount),
              date: new Date(m.transactionDate),
              payee_name: m.transactionName,
            }
          },
        ) as Transaction[]

        logDebug(
          `Importing transactions to Actual API for account '${actualAccount}' from Edenred account '${edenredAccount}':`,
        )
        await actualAPI.importTransactions(actualAccount, actualTransactions)

        console.log(
          `Transactions imported to Actual API for account '${actualAccount}' from Edenred account '${edenredAccount}'.`,
        )
        actualAPI.shutdown()
      } catch (error) {
        console.error('An error occurred:', error.message)
        logDebug(`Error occurred: ${error}`)
      }
    })
}
