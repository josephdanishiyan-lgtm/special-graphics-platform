'use client';
import { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { useRouter } from 'next/navigation';
import { ChevronDown, Search, Check, Info, Loader2 } from 'lucide-react';
import ContestCard from '../../components/ContestCard';

// --- STATIC DATA FOR MENUS ---
const CATEGORIES = [
    { name: "Logo & identity", count: "505k" }, { name: "Web & app design", count: "48k" },
    { name: "Business & advertising", count: "42k" }, { name: "Clothing & merchandise", count: "24k" },
    { name: "Art & illustration", count: "15k" }, { name: "Packaging & label", count: "21k" },
    { name: "Book & magazine", count: "33k" }, { name: "Other", count: "3k" }
];

const INDUSTRIES = [
    "Accounting & Financial", "Agriculture", "Animal & Pet", "Architectural", "Art & Design", 
    "Attorney & Law", "Automotive", "Bar & Nightclub", "Business & Consulting", "Childcare", 
    "Computer", "Construction", "Cosmetics & Beauty", "Education", "Entertainment & The Arts", "Sports"
];

const SORT_OPTIONS = [
    { label: 'Newest first', value: 'newest' },
    { label: 'Oldest first', value: 'oldest' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Price: Low to High', value: 'price_asc' },
];

export default function ContestPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState<any[]>([]); // Data from API
  
  // UI Visibility States
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showIndustryMenu, setShowIndustryMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Filter Data States
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedIndustry, setSelectedIndustry] = useState('All industries');
  const [keyword, setKeyword] = useState('');
  
  // Advanced Filter States
  const [statusFilter, setStatusFilter] = useState('Open');
  const [levelFilters, setLevelFilters] = useState<string[]>([]);
  const [minPrice, setMinPrize] = useState('');
  const [maxPrice, setMaxPrize] = useState('');
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);

  // Check Auth
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (!role) router.push('/login');
    else setIsAuth(true);
  }, [router]);

  // --- API FETCH FUNCTION ---
  const fetchContests = useCallback(async () => {
    setLoading(true);
    try {
        // 1. Build Query Params
        const params = new URLSearchParams();

        if (selectedCategory !== 'All categories') params.append('category', selectedCategory);
        if (selectedIndustry !== 'All industries') params.append('industry', selectedIndustry);
        if (keyword) params.append('keyword', keyword);
        if (statusFilter) params.append('status', statusFilter);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        params.append('sort', sortOption.value);

        // Arrays need special handling
        levelFilters.forEach(l => params.append('level', l));
        typeFilters.forEach(t => params.append('type', t));

        // 2. Fetch from Backend
        const res = await fetch(`http://localhost:5000/api/contests?${params.toString()}`);
        const data = await res.json();
        
        // 3. Update State
        setContests(data);
    } catch (error) {
        console.error("Failed to fetch contests:", error);
    } finally {
        setLoading(false);
    }
  }, [selectedCategory, selectedIndustry, keyword, statusFilter, minPrice, maxPrice, sortOption, levelFilters, typeFilters]);

  // --- TRIGGER FETCH WHEN FILTERS CHANGE ---
  useEffect(() => {
    if (isAuth) {
        // Debounce keyword search to avoid too many API calls while typing
        const timer = setTimeout(() => {
            fetchContests();
        }, 300);
        return () => clearTimeout(timer);
    }
  }, [fetchContests, isAuth]);

  // Toggle helpers
  const toggleLevel = (level: string) => {
      setLevelFilters(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]);
  };

  const toggleType = (type: string) => {
      setTypeFilters(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  if (!isAuth) return null;

  return (
    <main className="min-h-screen bg-white pb-20 font-sans text-[#222]">
      
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 pt-10 pb-6 px-4 md:px-8 shadow-sm relative z-20">
         <div className="max-w-[1200px] mx-auto">
             <h1 className="text-[32px] font-bold text-black mb-8 tracking-tight">Browse contests</h1>
             
             {/* FILTERS BAR */}
             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative">
                 
                 <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                     
                     {/* 1. CATEGORIES */}
                     <div className="relative">
                        <button 
                            onClick={() => { setShowCategoryMenu(!showCategoryMenu); setShowIndustryMenu(false); setShowSortMenu(false); }}
                            className={`flex items-center justify-between gap-3 border px-4 py-2.5 rounded-[3px] text-sm font-bold transition-all min-w-[240px] ${showCategoryMenu ? 'border-black ring-1 ring-black' : 'border-gray-300 hover:border-gray-400'}`}
                        >
                            <span>{selectedCategory}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {showCategoryMenu && (
                            <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-md shadow-xl py-2 z-50 max-h-[400px] overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                                <button onClick={() => setSelectedCategory('All categories')} className="w-full text-left px-5 py-3 hover:bg-gray-50 text-sm font-bold flex items-center justify-between">
                                     All categories {selectedCategory === 'All categories' && <Check className="w-4 h-4" />}
                                </button>
                                {CATEGORIES.map((cat) => (
                                    <button key={cat.name} onClick={() => { setSelectedCategory(cat.name); setShowCategoryMenu(false); }} className="w-full text-left px-5 py-3 hover:bg-gray-50 text-sm flex items-center justify-between group">
                                        <span className="font-medium text-gray-700 group-hover:text-black">{cat.name}</span>
                                        <span className="text-gray-400 text-xs">({cat.count})</span>
                                    </button>
                                ))}
                            </div>
                        )}
                     </div>

                     {/* 2. INDUSTRIES */}
                     <div className="relative">
                        <button 
                            onClick={() => { setShowIndustryMenu(!showIndustryMenu); setShowCategoryMenu(false); setShowSortMenu(false); }}
                            className={`flex items-center justify-between gap-3 border px-4 py-2.5 rounded-[3px] text-sm font-bold transition-all min-w-[200px] ${showIndustryMenu ? 'border-black ring-1 ring-black' : 'border-gray-300 hover:border-gray-400'}`}
                        >
                            <span>{selectedIndustry}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showIndustryMenu ? 'rotate-180' : ''}`} />
                        </button>

                         {showIndustryMenu && (
                            <div className="absolute top-full left-0 mt-2 w-[280px] bg-white border border-gray-200 rounded-md shadow-xl py-2 z-50 max-h-[300px] overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                                <button onClick={() => setSelectedIndustry('All industries')} className="w-full text-left px-5 py-3 hover:bg-gray-50 text-sm font-bold">All industries</button>
                                {INDUSTRIES.map((ind) => (
                                    <button key={ind} onClick={() => { setSelectedIndustry(ind); setShowIndustryMenu(false); }} className="w-full text-left px-5 py-3 hover:bg-gray-50 text-sm text-gray-700 hover:text-black font-medium">
                                        {ind}
                                    </button>
                                ))}
                            </div>
                        )}
                     </div>

                     {/* 3. SHOW FILTERS TOGGLE */}
                     <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-1.5 text-sm font-bold text-[#222] hover:text-[#555] px-3 py-2"
                     >
                         {showFilters ? 'Hide filters' : 'Show filters'} 
                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                     </button>
                 </div>

                 {/* 4. SORT DROPDOWN */}
                 <div className="relative">
                     <button 
                        onClick={() => { setShowSortMenu(!showSortMenu); setShowCategoryMenu(false); }}
                        className="flex items-center justify-between gap-2 border border-gray-300 px-4 py-2.5 rounded-[3px] text-sm font-bold text-gray-700 hover:border-gray-400 min-w-[180px]"
                     >
                         <span>{sortOption.label}</span>
                         <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                     </button>
                     
                     {showSortMenu && (
                        <div className="absolute top-full right-0 mt-2 w-[180px] bg-white border border-gray-200 rounded-md shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                            {SORT_OPTIONS.map((opt) => (
                                <button 
                                    key={opt.value}
                                    onClick={() => { setSortOption(opt); setShowSortMenu(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${sortOption.value === opt.value ? 'font-bold text-black' : 'text-gray-600'}`}
                                >
                                    {opt.label}
                                    {sortOption.value === opt.value && <Check className="w-3 h-3" />}
                                </button>
                            ))}
                        </div>
                     )}
                 </div>
             </div>

             {/* --- EXPANDABLE FILTER PANEL --- */}
             {showFilters && (
                <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-8 animate-in slide-in-from-top-2 fade-in duration-300">
                    
                    {/* KEYWORDS & STATUS */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Keywords</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search contests..." 
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-[3px] py-2 pl-9 pr-3 text-sm focus:border-black focus:outline-none transition-colors" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Contest status</label>
                            <div className="flex bg-gray-100 p-1 rounded-[4px] w-full">
                                {['Open', 'Finished'].map(status => (
                                    <button 
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-[3px] transition-all ${statusFilter === status ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* LEVELS */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Contest levels</label>
                        <div className="space-y-3">
                            {["Base", "Gold", "Platinum"].map(level => (
                                <label key={level} className="flex items-center gap-3 cursor-pointer group select-none">
                                    <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${levelFilters.includes(level) ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
                                        {levelFilters.includes(level) && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={levelFilters.includes(level)}
                                        onChange={() => toggleLevel(level)}
                                    />
                                    <span className={`text-sm font-medium transition-colors ${levelFilters.includes(level) ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>
                                        {level}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* PRIZE */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Prize</label>
                        <div className="flex gap-2 items-center">
                            <div className="relative w-full">
                                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                                <input 
                                    type="number" 
                                    placeholder="Min" 
                                    value={minPrice}
                                    onChange={(e) => setMinPrize(e.target.value)}
                                    className="w-full border border-gray-300 rounded-[3px] py-2 pl-6 pr-2 text-sm focus:border-black focus:outline-none" 
                                />
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                                <input 
                                    type="number" 
                                    placeholder="Max" 
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrize(e.target.value)}
                                    className="w-full border border-gray-300 rounded-[3px] py-2 pl-6 pr-2 text-sm focus:border-black focus:outline-none" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* TYPES */}
                    <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Contest types</label>
                         <div className="flex gap-3">
                             {['Blind', 'Guaranteed'].map(type => (
                                 <button 
                                    key={type}
                                    onClick={() => toggleType(type)}
                                    className={`flex flex-col items-center justify-center w-16 h-14 rounded border transition-all ${typeFilters.includes(type) ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                                 >
                                     <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${typeFilters.includes(type) ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                                         {type === 'Blind' ? '👁️' : '$'}
                                     </div>
                                     <span className={`text-[10px] font-bold ${typeFilters.includes(type) ? 'text-black' : 'text-gray-500'}`}>{type}</span>
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>
             )}
         </div>
      </div>

      {/* LIST SECTION (API DATA) */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8">
          <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Showing {contests.length} contests ({statusFilter})
              </span>
          </div>

          <div className="space-y-4">
              {loading ? (
                  <div className="flex justify-center items-center py-20">
                      <Loader2 className="w-10 h-10 text-black animate-spin" />
                  </div>
              ) : contests.length > 0 ? (
                  contests.map((contest) => (
                      <ContestCard key={contest.id} contest={contest} />
                  ))
              ) : (
                  <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <Search className="w-10 h-10 text-gray-300 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No contests found</h3>
                      <p className="text-gray-500 text-sm mt-1">Try adjusting your filters to see more results.</p>
                      <button 
                        onClick={() => {
                            setKeyword('');
                            setStatusFilter('Open');
                            setLevelFilters([]);
                            setMinPrize('');
                            setMaxPrize('');
                            setTypeFilters([]);
                            setSelectedCategory('All categories');
                            setSelectedIndustry('All industries');
                        }}
                        className="mt-6 text-sm font-bold text-blue-600 hover:underline"
                      >
                          Clear all filters
                      </button>
                  </div>
              )}
          </div>
      </div>
    </main>
  );
}
