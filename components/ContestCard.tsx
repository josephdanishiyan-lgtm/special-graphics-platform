import { Clock, MessageSquare, Image as ImageIcon, EyeOff } from 'lucide-react';

export default function ContestCard({ contest }: { contest: any }) {
  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 mb-4 transition-all duration-300 hover:border-black group relative">
      
      {/* 1. LEFT COLUMN: Main Info */}
      <div className="flex-1 p-6 pr-4">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-[18px] font-bold text-[#222] leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-black transition-all cursor-pointer">
            {contest.title}
            </h3>
        </div>
        
        <p className="text-[#555] text-[15px] leading-relaxed mb-4 font-normal max-w-[90%]">
          {contest.description}
        </p>
        
        <p className="text-[13px] text-[#777] mb-5">
          By <span className="text-[#555] font-medium hover:underline cursor-pointer">{contest.author}</span>
        </p>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#222]">
           {/* Dynamic Tags based on data */}
           {contest.isGuaranteed && (
               <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded-sm">
                   Guaranteed
               </span>
           )}
           
           {contest.isBlind && (
               <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded-sm">
                   Blind
               </span>
           )}
           
           <span className="text-gray-400">•</span>
           <span>{contest.category}</span>
           <span className="text-gray-400">•</span>
           <span>{contest.industry}</span>
        </div>
      </div>

      {/* 2. MIDDLE COLUMN: Stats */}
      <div className="w-full md:w-[200px] flex flex-col justify-center p-6 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/30">
         <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-[#555] group/stat">
                <ImageIcon className="w-4 h-4 text-[#aaa] group-hover/stat:text-black transition-colors" />
                <span className="text-sm font-medium">{contest.designs} designs</span>
            </div>
            <div className="flex items-center gap-3 text-[#555] group/stat">
                <Clock className="w-4 h-4 text-[#aaa] group-hover/stat:text-black transition-colors" />
                <span className="text-sm font-medium">{contest.daysLeft}</span>
            </div>
            <div className="flex items-center gap-3 text-[#555] group/stat">
                <MessageSquare className="w-4 h-4 text-[#aaa] group-hover/stat:text-black transition-colors" />
                <span className="text-sm font-medium">No feedback</span>
            </div>
         </div>
         
         <div className="mt-5">
            <button className="text-gray-400 text-xs font-bold border border-gray-300 px-3 py-1.5 rounded-[3px] bg-white hover:border-black hover:text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[1px] active:shadow-none">
                MARK
            </button>
         </div>
      </div>

      {/* 3. RIGHT COLUMN: Price Box (3D EFFECT APPLIED HERE) */}
      <div className="w-full md:w-[240px] p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200">
          
          {/* THE 3D BOX CONTAINER */}
          <div className="w-full h-[140px] bg-white border border-gray-900 relative flex flex-col items-center justify-center 
                          shadow-[5px_5px_0px_0px_rgba(0,0,0,0.9)] transition-all duration-200 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
               
               {/* Price Tag - Top Right Corner */}
               <div className="absolute -top-3 -right-3 bg-black text-white text-[14px] font-bold px-2 py-1 shadow-sm rotate-3">
                   {contest.price}$
               </div>

               {/* Center Content */}
               {contest.isBlind ? (
                   <div className="flex flex-col items-center gap-2 text-gray-400">
                       <EyeOff className="w-8 h-8 opacity-50" />
                       <span className="text-xs font-bold uppercase tracking-wider">Blind</span>
                   </div>
               ) : (
                   <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-[#222] tracking-tighter">
                            {contest.price}$
                        </span>
                   </div>
               )}
          </div>
      </div>

    </div>
  );
}
