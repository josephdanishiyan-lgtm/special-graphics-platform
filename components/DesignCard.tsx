'use client';

import Image from 'next/image';
import { Star, Trophy } from 'lucide-react';

interface DesignProps {
    design: {
        id: number;
        designer: string;
        rating: number;
    };
    isClient?: boolean; // New prop to check if user is client
}

export default function DesignCard({ design, isClient = false }: DesignProps) {
  return (
    <div className="group bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
      
      {/* IMAGE AREA */}
      <div className="bg-gray-50 h-48 w-full rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
        {/* Placeholder for now */}
        <div className="text-gray-300 font-bold text-4xl opacity-20">#{design.id}</div>
        
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-gray-500">
            #{design.id}
        </div>

        {/* CLIENT ACTION: SELECT WINNER (Visible on Hover) */}
        {isClient && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={(e) => { e.stopPropagation(); alert(`Winner Selected: #${design.id}`); }}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:scale-105 transition-transform"
                >
                    <Trophy className="w-3 h-3" /> Award Winner
                </button>
            </div>
        )}
      </div>

      {/* INFO AREA */}
      <div className="flex justify-between items-center">
        <div>
            <p className="text-xs text-gray-400 font-body mb-0.5">by {design.designer}</p>
            <p className="text-sm font-bold font-heading text-gray-800">#{design.id}</p>
        </div>
        
        {/* RATING AREA */}
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button 
                    key={star}
                    disabled={!isClient} // Only clients can click
                    onClick={(e) => { e.stopPropagation(); alert(`Rated ${star} stars`); }}
                    className={`${isClient ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                >
                    <Star 
                        className={`w-4 h-4 ${star <= design.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200"}`} 
                    />
                </button>
            ))}
        </div>
      </div>
    </div>
  );
}
