import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-12 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">🎙️ EchoPhrase</h3>
          <p className="text-amber-200 text-sm">
            AI-powered shadowing practice for language learners.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Languages</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/languages/spanish" className="hover:text-white">Spanish</Link></li>
            <li><Link href="/languages/french" className="hover:text-white">French</Link></li>
            <li><Link href="/languages/german" className="hover:text-white">German</Link></li>
            <li><Link href="/languages/japanese" className="hover:text-white">Japanese</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Learn More</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/about" className="hover:text-white">About Shadowing</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/feedback" className="hover:text-white">Give Feedback</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="text-sm text-amber-200">
            Questions or suggestions?<br />
            <a href="mailto:hello@echophrase.app" className="hover:text-white">hello@echophrase.app</a>
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-amber-800 text-center text-sm text-amber-300">
        © 2026 EchoPhrase. Built with ❤️ for language learners.
      </div>
    </footer>
  );
}
