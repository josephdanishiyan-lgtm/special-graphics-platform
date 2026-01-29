import { Clock, GalleryVerticalEnd, MessageSquare, EyeOff } from 'lucide-react';

export default function ContestCard({ contest }: { contest: any }) {
  return (
    // OUTER CONTAINER
    // 'group' allows the Prize Box to react when we hover this row.
    <div className="group flex flex-col md:flex-row gap-4 h-auto md:h-[210px] cursor-pointer mb-6">
      
      {/* ================= BOX 1: MAIN CONTENT & STATS ================= */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row transition-colors duration-300 group-hover:border-gray-300">
        
        {/* LEFT COLUMN: Text Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
              {/* TITLE: Isolated Hover */}
              <h3 className="text-[19px] font-bold text-[#222222] mb-2 leading-tight hover:text-blue-600 transition-colors w-fit">
                {contest.title}
              </h3>
              
              <p className="text-[#5e6675] text-sm leading-7 mb-4 line-clamp-2">
                {contest.description}
              </p>
              
              <p className="text-xs text-[#99a1b1] uppercase tracking-wider font-bold">
                By <span className="text-[#5e6675]">{contest.author}</span>
              </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 text-[13px] font-extrabold mt-4">
              {contest.isGuaranteed && <span className="text-[#222222]">Guaranteed</span>}
              {contest.isGuaranteed && <span className="text-gray-300">•</span>}
              
              {contest.isBlind && <span className="text-[#222222]">Blind</span>}
              {contest.isBlind && <span className="text-gray-300">•</span>}

              <span className="text-[#222222]">{contest.category}</span>
          </div>
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="hidden md:block w-[1px] bg-gray-100 my-4"></div>

        {/* MIDDLE COLUMN: Stats & Mark Button */}
        <div className="p-6 flex flex-col justify-between min-w-[200px]">
            {/* Stats List */}
            <div className="flex flex-col gap-4 text-[#727b8c]">
                <div className="flex items-center gap-3">
                    <GalleryVerticalEnd className="w-5 h-5 text-[#b4bcc9]" />
                    <span className="text-sm font-medium">{contest.designs} designs</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#b4bcc9]" />
                    <span className="text-sm font-medium">{contest.daysLeft}</span>
                </div>
                <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#b4bcc9]" />
                    <span className="text-sm font-medium">No feedback</span>
                </div>
            </div>

            {/* MARK BUTTON */}
            <button className="border border-gray-200 text-[#5e6675] px-5 py-1.5 text-sm font-bold rounded-[4px] hover:border-black hover:text-black transition-colors bg-white w-fit mt-4">
                Mark
            </button>
        </div>
      </div>


      {/* ================= BOX 2: IMAGE HOLDER (Original Pop-out Effect) ================= */}
      {/* This uses your EXACT original CSS for the soft shadow and lift effect */}
      <div className="w-full md:w-[180px] bg-white rounded-lg border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.06)] 
                      group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 group-hover:border-gray-200
                      transition-all duration-300 ease-out
                      relative flex flex-col items-center justify-center min-h-[180px] md:min-h-auto">
          
          {/* Price Tag */}
          <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 font-bold text-[15px] rounded-bl-sm rounded-tr-lg">
            {contest.price}$
          </div>

          {/* Blind Icon */}
          {contest.isBlind && (
              <div className="flex flex-col items-center gap-3 text-[#5e6675] mt-8">
                  <EyeOff className="w-8 h-8 text-[#d1d5db]" />
                  <span className="text-[15px] font-medium">Blind</span>
              </div>
          )}
      </div>

    </div>
  );
}
