'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Portfolio App Error:', error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050505] text-white">
      <h2 className="mb-4 text-3xl font-bold font-heading">Something went wrong!</h2>
      <p className="mb-8 text-white/50 max-w-md text-center">
        An unexpected error has occurred. Our team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
