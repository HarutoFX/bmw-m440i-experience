'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050505] text-white font-sans">
          <h2 className="mb-4 text-2xl font-bold">A critical error occurred!</h2>
          <p className="mb-8 text-sm text-gray-400 max-w-md text-center font-mono">
            {error.message || 'We apologize, but something went terribly wrong.'}
          </p>
          <button
            onClick={() => reset()}
            className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
