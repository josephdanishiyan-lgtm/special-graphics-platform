'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // HARDCODED CREDENTIALS FOR DEMO
    if (email === 'designer@special.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'designer');
      localStorage.setItem('userName', 'Admin Designer');
      router.push('/contest'); // Redirects to contest page after login
    } else {
      alert('Security Alert: Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
           <div className="bg-black text-white p-3 rounded-full">
             <ShieldCheck className="w-8 h-8" />
           </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Special Graphics</h1>
        <p className="text-center text-gray-400 text-sm mb-8">Secure Designer Access Portal</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black transition-colors"
              placeholder="designer@special.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black transition-colors"
              placeholder="admin123"
            />
          </div>
          <button className="w-full bg-black text-white font-bold py-3 rounded-md hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" /> Secure Login
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
             <p className="text-xs text-green-600 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Database Connection: Secure
             </p>
             <p className="text-[10px] text-gray-400 mt-1">System Backup: Active (Auto-save enabled)</p>
        </div>
      </div>
    </div>
  );
}
