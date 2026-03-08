import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AmbientSound: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error("Audio play failed:", err.message || err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex items-center gap-4">
      <audio
        ref={audioRef}
        preload="auto"
        onCanPlay={() => console.log("Audio is ready to play")}
        onError={() => console.error("Audio element error: Failed to load audio source.")}
      >
        {/* Primary local source - Ensure you upload fire.mp3 to /public/sounds/ */}
        <source src="/sounds/fire.mp3" type="audio/mpeg" />
        {/* Sound Effect by <a href="https://pixabay.com/users/dragon-studio-38165424/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=427410">DRAGON-STUDIO</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=427410">Pixabay</a> */}
      </audio>

      <button
        onClick={togglePlay}
        className={`p-3 rounded-full border transition-all duration-500 flex items-center justify-center group ${isPlaying
            ? 'bg-orange-600 border-orange-500 shadow-[0_0_20px_rgba(255,78,0,0.4)]'
            : 'bg-black/40 border-white/10 hover:border-orange-500/50'
          }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Volume2 className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <VolumeX className="w-5 h-5 text-white/40 group-hover:text-white/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-1"
        >
          <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold">Bonfire Sound</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500"
          />
        </motion.div>
      )}
    </div>
  );
};
