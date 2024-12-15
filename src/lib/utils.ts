import { Address, createPublicClient, createWalletClient, custom, http } from 'viem'
import { normalize } from 'viem/ens'
import { SUPPORTED_CHAINS } from './constants'

const ensCache = new Map()

const getPubliicClient = (chain: keyof typeof SUPPORTED_CHAINS) => {
    return createPublicClient({
        chain: SUPPORTED_CHAINS[chain],
        transport: http(),
      })
}

export const getAddressForEns = async (ensName: string) => {
    if (ensCache.has(ensName)) {
        return ensCache.get(ensName)
    }
    const client = getPubliicClient('mainnet')
    const address = await client.getEnsAddress({
        name: normalize(ensName),
    })
    ensCache.set(ensName, address)
    return address
}
export function parsePaymentUrl(slugs: string[]): {
  recipient: string, 
  chain?: string, 
  amount?: string, 
  token?: string
} {
  //Validate the url properly here

  
  return {recipient: slugs[0], chain: slugs[1], amount: slugs[2], token: slugs[3]}
}

export function getWindowClient(chain: keyof typeof SUPPORTED_CHAINS) {
  return createWalletClient({
      chain: SUPPORTED_CHAINS[chain],
      //@ts-expect-error: ts not sure if ethereum exists on window
        transport: custom(window.ethereum!),
      })
}
 

 
  
  