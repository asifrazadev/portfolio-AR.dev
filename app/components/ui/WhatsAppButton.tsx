'use client'

import { WhatsappLogo } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function WhatsAppButton() {
  // TODO: Update with actual WhatsApp number (include country code, omit +)
  const phoneNumber = '+923341045680'
  const message = 'Hi Asif, I would like to book a free consultation for my business website.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappLogo size={32} weight="fill" />
      <span className="absolute right-full mr-4 bg-[#0A0A0A] text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-lg font-medium">
        Book Free Consultation
      </span>
    </motion.a>
  )
}
