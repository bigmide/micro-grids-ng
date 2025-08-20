import { motion } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { cloneDeep } from 'es-toolkit'
import loadingAnimation from '~/assets/lottie/loadingV2.json'
import { useMemo } from 'react'

export default function GlobalLoader() {
  const animation = useMemo(() => cloneDeep(loadingAnimation), [])

  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-4"
      >
        {/* Spinner */}
        <DotLottieReact data={animation} style={{ width: '40px', height: '40px' }} loop autoplay />

        {/* Loading text */}
        <p className="text-foreground text-lg font-medium">Loading…</p>
      </motion.div>
    </div>
  )
}
