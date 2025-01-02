import axios from 'axios'

export interface AccountInfo {
  id: string
  name: string
}

const createEdenredService = () => {
  let token: string | null = null

  const axiosInstance = axios.create({
    baseURL: 'https://www.myedenred.pt/edenred-customer/v2',
    withCredentials: true,
  })

  const login = async (userId: string, password: string): Promise<void> => {
    console.log('login', userId, password)
    const response = await axiosInstance.post(
      '/authenticate/pin?appVersion=4.1.1&appType=IOS&channel=MOBILE',
      {
        userId,
        password,
        appVersion: '4.1.1',
        appType: 'IOS',
      },
    )

    token = response.data.data.token
  }

  const listCards = async (): Promise<AccountInfo[]> => {
    if (!token) {
      throw new Error('Please login first.')
    }

    const response = await axiosInstance.get(
      '/protected/card/list?&appVersion=1.0&appType=PORTAL&channel=WEB',
      { headers: { authorization: token } },
    )
    return response.data.data.map(
      (item: {
        id: string
        product: { name: string }
      }): { id: string; name: string } => ({
        id: item.id,
        name: item.product.name,
      }),
    )
  }

  const getMovements = async (account: AccountInfo) => {
    if (!token) {
      throw new Error('Please login first.')
    }

    const response = await axiosInstance.get(
      `/protected/card/${account.id}/accountmovement?appVersion=1.0&appType=PORTAL&channel=WEB`,
      { headers: { authorization: token } },
    )
    return response.data.data.movementList
  }

  return { login, listCards, getMovements }
}

export default createEdenredService
