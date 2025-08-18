'use client'

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 text-white px-4 py-8 mt-16 overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Platform Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">
            Anonymous Message
          </h2>
          <p className="text-neutral-400">
            A safe space to send and receive messages anonymously.
          </p>
        </div>

        {/* Quick Links (optional) */}
        <div className="hidden md:block">
          <h2 className="text-lg font-semibold text-white mb-2">Quick Links</h2>
          <ul className="space-y-1 text-neutral-400">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/users" className="hover:text-white transition">
                Explore
              </a>
            </li>
            <li>
              <a
                href="/terms-condition"
                className="hover:text-white transition"
              >
                Terms & Condition
              </a>
            </li>
          </ul>
        </div>

        {/* Creator Info */}
        <div className="md:text-right">
          <h2 className="text-lg font-semibold text-white mb-2">Created By</h2>
          <p className="text-neutral-400">
            Crafted with ❤️ by{" "}
            <span className="text-white font-semibold">Shivam</span>
          </p>
          <p className="text-neutral-400">
            © {new Date().getFullYear()} Anonymous Message
          </p>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="mt-6 border-t border-neutral-700 pt-4 text-center text-neutral-500 text-xs">
        <p>Made for expression, not impression | Built for honesty, not surveillance</p>
      </div>
    </footer>
  );
}
