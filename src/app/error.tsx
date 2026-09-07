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
    console.error(error)
  }, [error])
 
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050505] text-white">
      <h2 className="mb-4 text-2xl font-bold font-sans">Something went wrong!</h2>
      <p className="mb-8 text-sm text-gray-400 max-w-md text-center font-mono">
        {error.message || 'An unexpected error occurred while rendering the 3D experience.'}
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
      >
        Try again
      </button>
    </div>
  )
}
