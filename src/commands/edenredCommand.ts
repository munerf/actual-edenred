import { Command } from 'commander'
import createEdenredAPI, { AccountInfo } from '../services/edenredService'
import { logDebug } from '../utils/logger'

export function edenredCommand(program: Command) {
  program
    .command('list-cards')
    .description('List all credit cards')
    .action(async () => {
      try {
        const edenredAPI = createEdenredAPI()
        await edenredAPI.login(
          process.env.EDENRED_USERNAME!,
          process.env.EDENRED_PASSWORD!,
        )

        const cards = await edenredAPI.listCards()
        console.log('List of cards:', cards)

        // Log debug information
        logDebug('List of cards retrieved successfully.')
      } catch (error) {
        console.error('An error occurred:', error.message)

        // Log debug information
        logDebug(`Error occurred: ${error}`)
      }
    })

  program
    .command('list-movements <cardname>')
    .description('List movements of a card by name')
    .action(async (cardname: string) => {
      try {
        const edenredAPI = createEdenredAPI()
        await edenredAPI.login(
          process.env.EDENRED_USERNAME!,
          process.env.EDENRED_PASSWORD!,
        )

        const cards = await edenredAPI.listCards()
        const card = cards.find(
          (card: AccountInfo) =>
            card.name.toLowerCase() === cardname.toLowerCase(),
        )
        if (!card) {
          throw new Error(`Card '${cardname}' not found.`)
        }
        const movements = await edenredAPI.getMovements(card)
        console.log(`Movements of ${card.name}:`, movements)

        // Log debug information
        logDebug(`Movements of ${card.name} retrieved successfully.`)
      } catch (error) {
        console.error('An error occurred:', error.message)

        // Log debug information
        logDebug(`Error occurred: ${error}`)
      }
    })
}
