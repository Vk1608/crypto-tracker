import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setCryptoData } from './features/cryptoSlice';
import Modal from './components/Modal';
import CryptoTable from './components/CryptoTable';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    socket.on('stockData', (data) => {
      dispatch(setCryptoData([data]));
    });

    return () => {
      socket.off('stockData');
    };
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Real-Time Cryptocurrency Prices</h1>
        <button onClick={() => setShowModal(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Select Cryptocurrency
        </button>
        <CryptoTable />
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
}

export default App;
