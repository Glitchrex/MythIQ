import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ghost, Plus, Sparkles, Search, Filter, Map as MapIcon, Navigation } from 'lucide-react';
import { Superstition, NewSuperstition } from './types';
import { initialSuperstitions } from './data/initialSuperstitions';
import { SuperstitionCard } from './components/SuperstitionCard';
import { SuperstitionForm } from './components/SuperstitionForm';
import { AmbientSound } from './components/AmbientSound';
import { ContactMe } from './components/ContactMe';
import { getMysticInsight } from './services/geminiService';
import { Tooltip } from './components/Tooltip';

export default function App() {
  const [superstitions, setSuperstitions] = useState<Superstition[]>(initialSuperstitions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [scrolled, setScrolled] = useState(false);
  const [mysticInsight, setMysticInsight] = useState<{ id: string, text: string } | null>(null);
  const [loadingInsightId, setLoadingInsightId] = useState<string | null>(null);
  const [votedIds, setVotedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('votedSuperstitions');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const countries = useMemo(() => ['All', ...new Set(superstitions.map(s => s.country))].sort(), [superstitions]);
  const states = useMemo(() => ['All', ...new Set(superstitions.map(s => s.state || ''))].filter(s => s !== '').sort(), [superstitions]);

  const handleVote = (id: string, type: 'truth' | 'myth', comment?: string) => {
    if (votedIds.has(id)) return;

    setSuperstitions(prev => prev.map(s => {
      if (s.id === id) {
        const newVotes = { ...s.votes, [type]: s.votes[type] + 1 };
        const newComments = comment ? [
          ...s.userComments,
          { type, comment, timestamp: Date.now() }
        ] : s.userComments;
        return { ...s, votes: newVotes, userComments: newComments };
      }
      return s;
    }));

    setVotedIds(prev => {
      const next = new Set(prev).add(id);
      localStorage.setItem('votedSuperstitions', JSON.stringify([...next]));
      return next;
    });
  };

  const handleAddSuperstition = (newData: NewSuperstition) => {
    const newSuperstition: Superstition = {
      ...newData,
      id: Math.random().toString(36).substr(2, 9),
      votes: { truth: 0, myth: 0 },
      userComments: []
    };
    setSuperstitions(prev => [newSuperstition, ...prev]);
    setIsFormOpen(false);
  };

  const handleMysticInsight = async (s: Superstition) => {
    if (mysticInsight?.id === s.id) {
      setMysticInsight(null);
      return;
    }
    setLoadingInsightId(s.id);
    const insight = await getMysticInsight(s.title, s.backstory);
    setMysticInsight({ id: s.id, text: insight || '' });
    setLoadingInsightId(null);
  };

  const filteredSuperstitions = useMemo(() => {
    return superstitions.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.backstory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = countryFilter === 'All' || s.country === countryFilter;
      const matchesState = stateFilter === 'All' || s.state === stateFilter;
      return matchesSearch && matchesCountry && matchesState;
    }).sort((a, b) => {
      const totalA = a.votes.myth + a.votes.truth;
      const totalB = b.votes.myth + b.votes.truth;
      return totalB - totalA;
    });
  }, [superstitions, searchQuery, countryFilter, stateFilter]);

  const embers = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 20,
      opacity: Math.random(),
      scale: 0.5 + Math.random() * 1.5
    }));
  }, []);

  return (
    <div className="min-h-screen relative text-white selection:bg-orange-500/30">
      {/* Video Background */}
      <div className="fixed inset-0 z-[-10] overflow-hidden video-bg-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-40 scale-110"
        // poster="https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="/video/bonfire.mp4" type="video/mp4" />
          {/* Video by Lay-Z Owl: https://www.pexels.com/video/a-burning-wood-2590997/ */}
        </video>
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-[-5]" />
      </div>

      <div className="atmosphere" />

      {/* Floating Embers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="ember"
            style={{
              left: ember.left,
              bottom: `-20px`,
              animation: `ember-float ${ember.duration}s linear infinite`,
              animationDelay: `${ember.delay}s`,
              opacity: ember.opacity,
              scale: ember.scale
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 py-4 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-all">
              <Ghost className="w-6 h-6 text-orange-500" />
            </div>
            <h1 className="serif text-2xl md:text-3xl font-light text-white tracking-tight">
              Superstition <span className="italic opacity-60">Explorer</span>
            </h1>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-lg shadow-orange-900/20"
          >
            <Plus className="w-4 h-4" /> Add New Mystery
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6 shadow-[0_0_15px_rgba(255,78,0,0.2)]">
            <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-orange-300 font-bold">The Crackling Truth</span>
          </div>
          <h2 className="serif text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-[0.9] drop-shadow-[0_0_30px_rgba(255,140,0,0.3)]">
            Beliefs that <span className="italic text-orange-500">shape</span> our reality.
          </h2>
          <p className="text-orange-100/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Gather around the digital bonfire. Explore the ancient origins and hidden backstories of the world's most enduring superstitions.
          </p>
        </motion.div>
      </header>

      {/* Main Content Area with Search & Filters */}
      <main className="max-w-5xl mx-auto px-6 pb-32">
        <div className="sticky top-24 z-30 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[2rem] p-6 shadow-2xl shadow-black/50 border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Input */}
              <div className="md:col-span-5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  placeholder="Search by title or backstory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/20"
                />
              </div>

              {/* Country Filter */}
              <div className="md:col-span-2 relative">
                <MapIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-sm text-white appearance-none focus:outline-none focus:border-orange-500/50 transition-all cursor-pointer"
                >
                  <option value="All" className="bg-neutral-900 text-white">Country</option>
                  {countries.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c} className="bg-neutral-900 text-white">{c}</option>
                  ))}
                </select>
              </div>

              {/* State Filter */}
              <div className="md:col-span-2 relative">
                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-sm text-white appearance-none focus:outline-none focus:border-orange-500/50 transition-all cursor-pointer"
                >
                  <option value="All" className="bg-neutral-900 text-white">State</option>
                  {states.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s} className="bg-neutral-900 text-white">{s}</option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <div className="md:col-span-3 flex justify-center">
                <button
                  onClick={() => { setSearchQuery(''); setCountryFilter('All'); setStateFilter('All'); }}
                  className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-orange-500 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest font-bold">Reset</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSuperstitions.length > 0 ? (
              filteredSuperstitions.map((s, index) => (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative"
                >
                  <SuperstitionCard
                    superstition={s}
                    hasVoted={votedIds.has(s.id)}
                    onVote={handleVote}
                    onMysticInsight={handleMysticInsight}
                    isInsightLoading={loadingInsightId === s.id}
                  />

                  {/* Mystic Insight Display */}
                  <AnimatePresence>
                    {mysticInsight?.id === s.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-[-2rem] mb-8 mx-4 p-6 glass rounded-b-3xl border-t-0 border-orange-500/30 relative z-0"
                      >
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-2">Oracle's Insight</p>
                            <p className="serif text-lg text-orange-100/90 italic leading-relaxed">
                              {mysticInsight.text}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setMysticInsight(null)}
                          className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
                        >
                          <Ghost className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Ghost className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <p className="serif text-2xl text-white/40 italic">The shadows reveal nothing matching your search...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <SuperstitionForm
            onSubmit={handleAddSuperstition}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
          © {new Date().getFullYear()} Superstition Explorer • Powered by Ancient Wisdom & Modern AI
        </p>
      </footer>

      <AmbientSound />
      <ContactMe />
    </div>
  );
}
