import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, Zap, Wifi, WifiOff } from 'lucide-react';
import { checkPuterConnection } from '../utils/textProcessor';

const Header: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkPuterConnection();
      setIsConnected(connected);
    };

    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-yellow-300" />
              <h1 className="text-2xl font-bold">VENBA AI</h1>
            </div>
            <div className="hidden sm:block text-sm text-blue-100">
              Powered by Puter.com
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-300" />
                <span>AI-Detector Bypass</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-yellow-300" />
                <span>Fast Processing</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {isConnected === null ? (
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              ) : isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-300" />
                  <span className="text-xs text-green-300 hidden sm:inline">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-300" />
                  <span className="text-xs text-red-300 hidden sm:inline">Offline Mode</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;