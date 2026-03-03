import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NewSuperstition } from '../types';
import { Sparkles, Send, X } from 'lucide-react';

interface Props {
  onSubmit: (superstition: NewSuperstition) => void;
  onClose: () => void;
}

export const SuperstitionForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<NewSuperstition>({
    title: '',
    backstory: '',
    origin: '',
    believers: '',
    reasoning: '',
    personalExperience: ''
  });

  const totalSteps = 4;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === totalSteps) {
      onSubmit(formData);
    } else {
      nextStep();
    }
  };

  const updateField = (field: keyof NewSuperstition, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass w-full max-w-2xl rounded-[2rem] overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-orange-500/20 rounded-xl">
              <Sparkles className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="serif text-3xl text-white font-light">Add New Superstition</h2>
              <p className="text-xs uppercase tracking-widest text-white/40">Step {step} of {totalSteps}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-orange-400/80 font-bold">What is the superstition?</label>
                    <input
                      required
                      autoFocus
                      value={formData.title}
                      onChange={e => updateField('title', e.target.value)}
                      placeholder="e.g., Black cat crossing your path"
                      className="w-full bg-white/5 border-b border-white/10 p-4 text-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-orange-400/80 font-bold">Where did it originate?</label>
                    <input
                      required
                      value={formData.origin}
                      onChange={e => updateField('origin', e.target.value)}
                      placeholder="e.g., Medieval Europe"
                      className="w-full bg-white/5 border-b border-white/10 p-4 text-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-orange-400/80 font-bold">The Backstory</label>
                    <textarea
                      required
                      autoFocus
                      value={formData.backstory}
                      onChange={e => updateField('backstory', e.target.value)}
                      placeholder="How did this belief start? What are the legends?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-orange-500 transition-colors min-h-[150px]"
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-orange-400/80 font-bold">Who believes in it & Why?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        required
                        value={formData.believers}
                        onChange={e => updateField('believers', e.target.value)}
                        placeholder="Who follows this?"
                        className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                      <input
                        required
                        value={formData.reasoning}
                        onChange={e => updateField('reasoning', e.target.value)}
                        placeholder="Why do they believe?"
                        className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-orange-400/80 font-bold">Personal Experience (Optional)</label>
                    <textarea
                      autoFocus
                      value={formData.personalExperience}
                      onChange={e => updateField('personalExperience', e.target.value)}
                      placeholder="Have you ever experienced this yourself?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-orange-500 transition-colors min-h-[150px]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-8 border-t border-white/5">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`text-xs uppercase tracking-widest font-bold transition-all ${step === 1 ? 'opacity-0' : 'text-white/40 hover:text-white'}`}
              >
                Back
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${step === i + 1 ? 'w-8 bg-orange-500' : 'bg-white/10'}`}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-xl shadow-orange-900/40 group"
              >
                {step === totalSteps ? (
                  <>
                    Manifest <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
