'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, UserCircle } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  // Check login status whenever component loads
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setRole(null);
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Special<span className="text-gray-400">Graphics</span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
        {/* 1. Link to Contest Page */}
        <Link href="/contest" className="hover:text-black transition-colors">Find a Contest</Link>
        
        {/* 2. Link to Inspiration Page (Fixed path) */}
        <Link href="/inspiration" className="hover:text-black transition-colors">Inspiration</Link>
        
        {/* 3. Link to Studio Page (Added) */}
        <Link href="/special-studio" className="hover:text-black transition-colors">Studio</Link>
        
        {/* DYNAMIC PART */}
        {role ? (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <span className="font-bold text-black capitalize flex items-center gap-2">
                    <UserCircle className="w-5 h-5" />
                    {role} Mode
                </span>
                
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700" title="Logout">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        ) : (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <Link href="/login" className="hover:text-black">Log In</Link>
                <Link href="/start">
                    <button className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs hover:scale-105 transition-transform">
                        Start a Contest
                    </button>
                </Link>
            </div>
        )}
      </div>
    </nav>
  );
}
