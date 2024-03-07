import { ActualService, type Transaction } from './services/actualService'
import createEdenredService from './services/edenredService'
import * as dotenv from 'dotenv'

dotenv.config()

function amountToInteger(n: number): number {
  return Math.round(n * 100)
}

const main = async (): Promise<void> => {
  try {
    const edenredLogin = process.env.EDENRED_USERNAME
    const password = process.env.EDENRED_PASSWORD

    if (!edenredLogin || !password) {
      return
    }

    const edenred = createEdenredService()

    await edenred.login(edenredLogin, password)
    const cards = await edenred.listCards()
    const movements = await edenred.getMovements(cards[0])
    const movementsFlex = await edenred.getMovements(cards[1])

    const transactions = movements.map(
      (m: {
        amount: number
        transactionDate: string | number | Date
        transactionName: string
      }) => {
        return {
          amount: amountToInteger(m.amount),
          date: new Date(m.transactionDate),
          payee_name: m.transactionName,
        }
      },
    ) as Transaction[]

    const transactionsFlex = movementsFlex.map(
      (m: {
        amount: number
        transactionDate: string | number | Date
        transactionName: string
      }) => {
        return {
          amount: amountToInteger(m.amount),
          date: new Date(m.transactionDate),
          payee_name: m.transactionName,
        }
      },
    ) as Transaction[]

    const actualService = new ActualService()
    await actualService.init(
      'http://localhost:5006',
      'juteru35',
      '/tmp/actual',
      'b95161f0-fc1f-4fb6-9ae0-c1ff0e0ae8bb',
    )
    await actualService.importTransactions('Edenred', transactions)
    await actualService.importTransactions('Edenred Flex', transactionsFlex)

    await actualService.shutdown()

    // console.log(movements);
  } catch (error) {
    console.log(error)
  }
}

main()
