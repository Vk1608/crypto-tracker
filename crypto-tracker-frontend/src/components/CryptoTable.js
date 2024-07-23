import React from 'react';
import { useSelector } from 'react-redux';

const CryptoTable = () => {
  const selectedCrypto = useSelector((state) => state.crypto.selectedCrypto);
  const cryptoData = useSelector((state) => state.crypto.cryptoData);

  return (
    <div className="mt-5">
      <h2 className="text-2xl mb-4">Cryptocurrency Prices</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Symbol</th>
            <th className="py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData
            .filter((data) => data.symbol === selectedCrypto)
            .map((data, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{data.symbol}</td>
                <td className="border px-4 py-2">{data.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
