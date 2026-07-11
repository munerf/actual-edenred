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

  const login = async (
    userId: string,
    password: string,
    type: 'default' | 'pin' = 'default',
  ): Promise<void> => {
    const endpoint =
      type === 'pin'
        ? '/authenticate/pin?appVersion=1.0&appType=PORTAL&channel=WEB'
        : '/authenticate/default?appVersion=1.0&appType=PORTAL&channel=WEB'

    const response = await axiosInstance.post(endpoint, {
      userId,
      password,
    })

    const authToken = response.data.data?.token
    if (authToken) {
      token = authToken
      return
    }

    if (response.data.data?.challengeId) {
      throw new Error(
        '2FA required. Set EDENRED_USERID and EDENRED_PIN in .env for PIN authentication.',
      )
    }

    throw new Error('Authentication failed.')
  }

  const loginFromEnv = async (): Promise<void> => {
    const userId = process.env.EDENRED_USERID
    const pin = process.env.EDENRED_PIN

    if (userId && pin) {
      await login(userId, pin, 'pin')
      return
    }

    const username = process.env.EDENRED_USERNAME
    const password = process.env.EDENRED_PASSWORD

    if (!username || !password) {
      throw new Error('Edenred credentials not found in .env')
    }

    await login(username, password, 'default')
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

  return { login, loginFromEnv, listCards, getMovements }
}

export default createEdenredService
