"use client";

import React from "react";
import { motion } from "framer-motion";

export default function UpgradeButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className="w-full h-16 rounded-[22px] bg-white text-[#0A0A0A] font-bold text-lg"
    >
      Try it free for 30 days
    </motion.button>
  );
}
