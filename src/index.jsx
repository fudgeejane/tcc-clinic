import React, { useState } from 'react';
import './index.css';
import tccBg from './assets/tcc.png';
import logo from './assets/logo.png';

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div
      className="min-h-screen min-w-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center relative"
      style={{ backgroundImage: `url(${tccBg})` }}
    >
      {!showModal && (
        <img
          src={logo}
          alt="Logo"
          className="w-[500px] h-[500px] cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      )}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-10"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white/95 rounded-[20px] p-10 min-w-[320px] flex flex-col items-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="font-bold mb-6 text-2xl">Admin Login</h2>
            <input
              className="w-full p-3 my-2 rounded-lg border border-gray-300 text-base outline-none"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="w-full p-3 my-2 rounded-lg border border-gray-300 text-base outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full p-3 mt-4 rounded-lg border-none bg-[#3b4cca] text-white font-semibold text-base cursor-pointer">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
