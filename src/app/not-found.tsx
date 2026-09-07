import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-[#050505] text-white">
      <h2 className="mb-2 text-4xl font-bold font-sans tracking-tight">404</h2>
      <p className="mb-8 text-sm text-gray-400 font-mono">Page Not Found</p>
      <Link
        href="/"
        className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
      >
        Return to Experience
      </Link>
    </div>
  )
}
