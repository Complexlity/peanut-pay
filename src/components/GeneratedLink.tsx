'use client'

import { useState } from 'react';
import { Link as LinkIcon, Copy, Check } from 'lucide-react';
import { isAddress } from 'viem';
interface GeneratedLinkProps {
    link: string;
    address: string
  hasOtherValues: boolean
}

const GeneratedLink: React.FC<GeneratedLinkProps> = ({ link, address, hasOtherValues }) => {
    const [copied, setCopied] = useState(false);
    const isValidUserAddress = isAddress(address);

  const handleCopy = async () => {
    if (!isValidUserAddress) return;
    
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="pt-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            <span className="font-medium">Generated Link:</span>
          </div>
          <button
            onClick={handleCopy}
            disabled={!isValidUserAddress}
            className={`p-2 rounded-md transition-colors ${
              isValidUserAddress
                ? 'text-gray-600 hover:bg-gray-200'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            title={isValidUserAddress ? 'Copy to clipboard' : 'Invalid link'}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="relative">
          <code
            className={`block w-full p-2 rounded border text-sm break-all ${
              isValidUserAddress
                ? 'bg-white border-gray-200'
                : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}
          >
            {link}
          </code>
          {(address.length > 0 && !isValidUserAddress) || (hasOtherValues && !isValidUserAddress) && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
             Enter a valid recipient address or ENS
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratedLink;