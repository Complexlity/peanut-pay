'use client'

import { SUPPORTED_TOKENS } from '../lib/constants';

interface TokenSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
        Token (Optional)
      </label>
      <select
        id="token"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select a token</option>
        {SUPPORTED_TOKENS.map((token) => (
          <option key={token.symbol} value={token.symbol.toLowerCase()}>
            {token.icon} {token.symbol} - {token.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TokenSelect;