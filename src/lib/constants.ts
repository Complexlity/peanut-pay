export interface Token {
    symbol: string;
    name: string;
    icon: string;
  }
  
  export const SUPPORTED_TOKENS: Token[] = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '⟠',
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: '$',
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      icon: '$',
    },
    {
      symbol: 'DAI',
      name: 'Dai',
      icon: '◈',
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      icon: '₿',
    },
  ];