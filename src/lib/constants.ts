import { optimism, base, arbitrum, mainnet } from 'viem/chains'


export interface Token {
    symbol: string;
    name: string;
    icon: string;
}
  
export const SUPPORTED_CHAINS = {
  'optimism': optimism,
  'base': base,
  'arbitrum': arbitrum,
  'mainnet': mainnet,
}

export const SUPPORTED_TOKENS: Token[] = [

    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '⟠',
  },
  //Other tokens wiould have an address field that shows the address on different chaisn e.g addresses: {
  //   'optimism': '0x4200000000000000000000000000000000000006',
  //   'base': '0x4200000000000000000000000000000000000006',
  //   'arbitrum': '0x4200000000000000000000000000000000000006',
  //   'mainnet': '0x4200000000000000000000000000000000000006',
  // }
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: '$',
    },
];
  
export const BASE_URL = "http//localhost:3000";