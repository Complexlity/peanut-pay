import React from 'react';
import { SUPPORTED_CHAINS } from '@/lib/constants';

interface ChainSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ChainSelect: React.FC<ChainSelectProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="chain" className="block text-sm font-medium text-gray-700 mb-1">
        Chain
      </label>
      <select
        id="chain"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select a chain</option>
        {Object.keys(SUPPORTED_CHAINS).map((chainKey) => (
          <option key={chainKey} value={chainKey}>
            {chainKey.charAt(0).toUpperCase() + chainKey.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSelect;