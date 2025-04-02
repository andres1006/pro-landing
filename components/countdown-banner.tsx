"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("April 14, 2025 00:00:00").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-primary via-accent to-secondary z-50 py-3 px-4 text-white shadow-lg border-b border-white/10"
    >
      <div className="container mx-auto flex items-center justify-center flex-wrap gap-2 md:gap-4">
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-2 text-secondary-light animate-pulse" />
          <span className="font-bold text-sm md:text-base">
            Lanzamiento PRO Manizales:
          </span>
          <Star className="w-4 h-4 ml-2 text-secondary-light animate-pulse" />
        </div>

        <div className="flex items-center space-x-1 md:space-x-3 ml-2 md:ml-4">
          <Clock className="w-4 h-4 mr-1 text-white/80" />

          <div className="flex items-center">
            <div className="bg-black/30 rounded-md px-2 py-1 min-w-[40px] text-center">
              <span className="text-sm md:text-base font-mono font-bold">
                {formatNumber(timeLeft.days)}
              </span>
            </div>
            <span className="mx-1 text-xs md:text-sm">días</span>
          </div>

          <div className="flex items-center">
            <div className="bg-black/30 rounded-md px-2 py-1 min-w-[40px] text-center">
              <span className="text-sm md:text-base font-mono font-bold">
                {formatNumber(timeLeft.hours)}
              </span>
            </div>
            <span className="mx-1 text-xs md:text-sm">hrs</span>
          </div>

          <div className="flex items-center">
            <div className="bg-black/30 rounded-md px-2 py-1 min-w-[40px] text-center">
              <span className="text-sm md:text-base font-mono font-bold">
                {formatNumber(timeLeft.minutes)}
              </span>
            </div>
            <span className="mx-1 text-xs md:text-sm">min</span>
          </div>

          <div className="flex items-center">
            <div className="bg-black/30 rounded-md px-2 py-1 min-w-[40px] text-center">
              <span className="text-sm md:text-base font-mono font-bold">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
            <span className="mx-1 text-xs md:text-sm">seg</span>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="ml-0 md:ml-4 bg-primary/20 hover:bg-primary/30 px-3 py-1 rounded-full text-xs md:text-sm cursor-pointer transition-colors duration-300"
        >
          <a href="#registro" className="font-semibold">
            ¡Reserva tu lugar ahora!
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
