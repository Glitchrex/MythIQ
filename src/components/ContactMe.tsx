import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X } from 'lucide-react';

const GmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="none"/>
    <path d="M12 16.64L24 7.636v13.364c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64z" fill="#4285F4"/>
    <path d="M12 16.64l-6.545-4.91v10.909H1.636A1.636 1.636 0 0 1 0 21V7.636L12 16.64z" fill="#34A853"/>
    <path d="M12 9.548v7.092L24 7.636V5.457c0-2.023-2.309-3.178-3.927-1.964L12 9.548z" fill="#EA4335"/>
    <path d="M12 9.548L0 5.457V7.636l12 7.092V9.548z" fill="#FBBC04"/>
    <path d="M12 9.548L0 5.457c0 2.023 2.309 3.178 3.927 1.964L12 9.548z" fill="#C5221F"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="#25D366">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.898-4.449 9.898-9.891.001-5.441-4.449-9.889-9.889-9.889-5.442 0-9.885 4.449-9.885 9.889 0 2.115.596 3.714 1.59 5.389l-1.127 4.12 4.225-1.12zm10.231-6.126c-.29-.145-1.719-.848-1.985-.945-.266-.097-.46-.145-.653.145-.194.291-.749.945-.918 1.139-.169.194-.339.218-.629.073-.29-.145-1.226-.452-2.336-1.443-.863-.772-1.445-1.724-1.614-2.014-.169-.291-.018-.448.127-.593.131-.131.29-.339.435-.508.145-.169.194-.291.291-.485.097-.194.048-.364-.024-.509-.073-.145-.653-1.572-.894-2.152-.234-.566-.472-.489-.653-.498-.169-.008-.364-.008-.558-.008s-.508.073-.774.364c-.266.29-1.016.993-1.016 2.422 0 1.429 1.041 2.81 1.186 3.004.145.194 2.046 3.123 4.961 4.384 2.915 1.261 2.915.842 3.447.801.532-.041 1.719-.703 1.961-1.381.242-.679.242-1.261.169-1.381-.073-.12-.266-.194-.556-.339z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="#0A66C2">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export const ContactMe: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { 
      name: 'Email', 
      icon: <GmailIcon />, 
      href: 'mailto:shikharpratap7@gmail.com', 
      color: 'hover:bg-red-400/20 border-red-500/20' 
    },
    { 
      name: 'WhatsApp', 
      icon: <WhatsAppIcon />, 
      href: 'https://wa.me/917829178296', 
      color: 'hover:bg-green-400/20 border-green-500/20' 
    },
    { 
      name: 'LinkedIn', 
      icon: <LinkedInIcon />, 
      href: 'https://www.linkedin.com/in/shikhar-pratap-singh/', 
      color: 'hover:bg-blue-400/20 border-blue-500/20' 
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full bg-black/80 border border-white/10 backdrop-blur-md text-white/70 transition-all ${link.color} shadow-lg flex items-center justify-center group relative`}
              >
                {link.icon}
                <span className="absolute right-full mr-3 px-2 py-1 rounded bg-black/80 text-[10px] uppercase tracking-widest text-white/90 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                  {link.name}
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20 transition-all hover:scale-110 flex items-center justify-center border border-white/10"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
      </button>
    </div>
  );
};
