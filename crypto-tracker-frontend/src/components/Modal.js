import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCrypto } from '../features/cryptoSlice';

const Modal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const handleSelectCrypto = (crypto) => {
    dispatch(setSelectedCrypto(crypto));
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded">
          <h2 className="text-xl mb-4">Select Cryptocurrency</h2>
          <button onClick={() => handleSelectCrypto('BTC')} className="block w-full mb-2">
            Bitcoin (BTC)
          </button>
          <button onClick={() => handleSelectCrypto('ETH')} className="block w-full">
            Ethereum (ETH)
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
