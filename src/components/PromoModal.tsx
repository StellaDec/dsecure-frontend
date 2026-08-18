import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ShoppingCart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoModal() {
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: August 15, 2026, 23:59:59
    const targetDate = new Date('2026-08-15T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    // Check session storage to show modal only once per session
    const hasSeenModal = sessionStorage.getItem("hasSeenPromoModal");
    const targetDate = new Date('2026-08-15T23:59:59').getTime();
    const now = new Date().getTime();
    
    // Only show if the current time is before the target date
    if (!hasSeenModal && now <= targetDate) {
      const timer = setTimeout(() => {
        setShowPromoModal(true);
        sessionStorage.setItem("hasSeenPromoModal", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {showPromoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPromoModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden border border-white/20 rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPromoModal(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-none backdrop-blur-md transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="w-full">
              <img 
                src="/independence-day-banner.jpeg" 
                alt="Independence Day Offer - Flat 15% OFF on all D-Secure licenses" 
                className="w-full h-auto block"
              />
            </div>

            {/* Action Area */}
            <div className="p-4 sm:p-6 bg-[#f4fcf8] border-t border-[#0e7c66]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div>
                  <div className="text-gray-800 font-semibold text-lg flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span>Use Coupon Code:</span>
                    <div className="flex items-center bg-[#0e7c66]/10 rounded-none">
                      <span className="text-[#0e7c66] font-bold px-2 py-0.5">IND15</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText("IND15");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="p-1.5 text-[#0e7c66] hover:bg-[#0e7c66]/20 transition-colors"
                        title="Copy Code"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Timer UI */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <Clock className="w-4 h-4 text-[#e04d4d] animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">Offer ends in:</span>
                    <div className="flex items-center gap-1 text-sm font-bold text-[#e04d4d]">
                      <span className="bg-[#e04d4d]/10 px-1.5 py-0.5 rounded">{timeLeft.days}d</span>
                      <span>:</span>
                      <span className="bg-[#e04d4d]/10 px-1.5 py-0.5 rounded">{timeLeft.hours.toString().padStart(2, '0')}h</span>
                      <span>:</span>
                      <span className="bg-[#e04d4d]/10 px-1.5 py-0.5 rounded">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
                      <span>:</span>
                      <span className="bg-[#e04d4d]/10 px-1.5 py-0.5 rounded">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Link 
                  to="/pricing-and-plan?product=file-eraser" 
                  onClick={() => setShowPromoModal(false)}
                  className="px-8 py-3 bg-[#0e7c66] text-white font-medium hover:bg-[#0b6351] transition-colors shadow-lg shadow-[#0e7c66]/30 flex-1 sm:flex-none text-center flex items-center justify-center gap-2 rounded-none"
                >
                  Buy Now <ShoppingCart className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
