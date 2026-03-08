import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Superstition } from '../types';
import { MapPin, HelpCircle, BookOpen, MessageSquare, Check, X, Share2, CheckCircle2, Wand2 } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface Props {
  superstition: Superstition;
  onVote: (id: string, type: 'truth' | 'myth', comment?: string) => void;
  onMysticInsight: (s: Superstition) => void;
  isInsightLoading: boolean;
}

export const SuperstitionCard: React.FC<Props> = ({ superstition, onVote, onMysticInsight, isInsightLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [voteType, setVoteType] = useState<'truth' | 'myth' | null>(null);
  const [comment, setComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const anim = useMemo(() => ({
    swayDuration: 6 + Math.random() * 6,
    swayDelay: Math.random() * -10, // Negative delay to start at random point in cycle
    rotate: 0.4 + Math.random() * 0.8,
    glowDuration: 4 + Math.random() * 4,
    glowDelay: Math.random() * -5
  }), []);

  const handleVote = (type: 'truth' | 'myth') => {
    setVoteType(type);
    setShowCommentForm(true);
  };

  const handleShare = async () => {
    const shareText = `🔮 Superstition Explorer: ${superstition.title}\n\n"${superstition.backstory}"\n\nExplore more mysteries: ${window.location.href}`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const submitVote = () => {
    if (voteType) {
      onVote(superstition.id, voteType, comment);
      setShowCommentForm(false);
      setComment('');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotate: [anim.rotate, -anim.rotate, anim.rotate],
      }}
      whileHover={{ 
        scale: 1.01, 
        y: -4,
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.4)",
        borderColor: "rgba(255, 200, 150, 0.2)"
      }}
      transition={{
        opacity: { duration: 0.8 },
        y: { duration: 0.8 },
        rotate: {
          duration: anim.swayDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: anim.swayDelay
        },
        scale: { duration: 0.4, ease: "easeOut" },
        boxShadow: { duration: 0.4 },
        borderColor: { duration: 0.4 }
      }}
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      className="glass rounded-3xl p-6 mb-8 relative overflow-hidden group transition-colors duration-500 will-change-transform"
    >
      <motion.div 
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: anim.glowDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: anim.glowDelay
        }}
        className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-orange-500/20 transition-all duration-500" 
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex flex-col gap-2">
          <h2 className="serif text-3xl md:text-4xl font-light text-white tracking-tight">
            {superstition.title}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-orange-500/60 font-semibold px-2 py-0.5 border border-orange-500/20 rounded-full">
              {superstition.country}
            </span>
            {superstition.state && (
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
                • {superstition.state}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 items-center self-end md:self-center">
          <Tooltip text="Mystic Insight">
            <button
              onClick={() => onMysticInsight(superstition)}
              disabled={isInsightLoading}
              className="p-2 bg-orange-500/10 hover:bg-orange-500/20 rounded-full border border-orange-500/20 transition-all group"
            >
              <Wand2 className={`w-4 h-4 text-orange-500 ${isInsightLoading ? 'animate-pulse' : 'group-hover:rotate-12'}`} />
            </button>
          </Tooltip>

          <Tooltip text="Share Mystery">
            <button
              onClick={handleShare}
              className="p-2 text-white/40 hover:text-orange-500 hover:bg-white/5 rounded-full transition-all relative"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="copied"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="share"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4 mb-6 relative z-10">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-orange-500/60 mt-1 shrink-0" />
          <div>
            <p className="text-sm text-orange-200/40 uppercase tracking-tighter font-bold mb-1">What's the Superstition?</p>
            <p className="text-orange-50/80 leading-relaxed">{superstition.backstory}</p>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500/60 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-orange-200/40 uppercase tracking-tighter font-bold mb-1">Location Details</p>
                  <p className="text-orange-50/80 leading-relaxed">
                    {superstition.state ? `${superstition.state}, ${superstition.country}` : superstition.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-orange-500/60 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-orange-200/40 uppercase tracking-tighter font-bold mb-1">Why they believe in it</p>
                  <p className="text-orange-50/80 leading-relaxed">{superstition.reasoning}</p>
                </div>
              </div>

              {superstition.personalExperience && (
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-orange-500/60 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-orange-200/40 uppercase tracking-tighter font-bold mb-1">Personal Experience</p>
                    <p className="text-orange-50/80 italic leading-relaxed">"{superstition.personalExperience}"</p>
                  </div>
                </div>
              )}

              {superstition.userComments.length > 0 && (
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-orange-500/60 font-bold">Community Perspectives</p>
                  <div className="space-y-3">
                    {superstition.userComments.map((c, i) => (
                      <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${c.type === 'truth' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>
                            {c.type}
                          </span>
                          <span className="text-[10px] text-white/20">{new Date(c.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-orange-50/70 leading-relaxed italic">"{c.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 relative z-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs uppercase tracking-widest text-orange-500/80 hover:text-orange-400 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Read Community Perspectives'}
        </button>

        <div className="flex gap-3">
          {!showCommentForm ? (
            <>
              <button
                onClick={() => handleVote('myth')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all group"
              >
                <X className="w-4 h-4 text-red-500/60 group-hover:text-red-500" />
                <span className="text-xs uppercase tracking-widest font-medium">Myth</span>
                <span className="text-[10px] text-white/30">{superstition.votes.myth}</span>
              </button>
              <button
                onClick={() => handleVote('truth')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 transition-all group"
              >
                <Check className="w-4 h-4 text-orange-500/60 group-hover:text-orange-500" />
                <span className="text-xs uppercase tracking-widest font-medium">Truth</span>
                <span className="text-[10px] text-white/30">{superstition.votes.truth}</span>
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-500/20 rounded-lg">
                  <Check className="w-3 h-3 text-orange-500" />
                </div>
                <p className="text-xs text-orange-400/80 uppercase tracking-widest font-bold">
                  Thanks for your vote! Add your perspective?
                </p>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your version of the backstory or a personal experience (optional)..."
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={submitVote}
                  className="px-4 py-2 text-xs uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={submitVote}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-lg shadow-orange-900/20"
                >
                  Add Backstory
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
