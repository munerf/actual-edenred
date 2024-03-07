import * as api from '@actual-app/api'

interface Transaction {
  id?: string
  account: string
  amount: number
  date: string
  payee_name: string
}

class ActualService {
  async init(
    serverURL: string,
    password: string,
    dataDir: string,
    budget: string,
  ): Promise<void> {
    await api.init({
      serverURL,
      password,
      dataDir,
    })

    await api.downloadBudget(budget)
  }

  async getAccountId(accountName: string): Promise<any> {
    const accounts = await api.getAccounts()
    return accounts.find((acc: { name: string }) => acc.name === accountName)
  }

  async importTransactions(accountName: string, transactions: Transaction[]) {
    const account = await this.getAccountId(accountName)
    const result = await api.importTransactions(account.id, transactions)
    return result
  }

  async shutdown(): Promise<void> {
    await api.shutdown()
  }

  amountToInteger(n: number): number {
    return Math.round(n * 100)
  }
}

export { ActualService, Transaction }
