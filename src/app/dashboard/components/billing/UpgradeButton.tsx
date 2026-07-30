"use client";

import React from "react";
import { motion } from "framer-motion";

export default function UpgradeButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className="w-full h-13 py-3.5 rounded-2xl bg-white text-[#0A0A0A] font-bold text-base"
    >
      Try it free for 30 days
    </motion.button>
  );
}
