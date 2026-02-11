import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">🎙️ EchoPhrase</h3>
          <p className="text-sm opacity-80">
            AI-powered shadowing practice for language learners.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Languages</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/languages/spanish" className="opacity-80 hover:opacity-100">Spanish</Link></li>
            <li><Link href="/languages/french" className="opacity-80 hover:opacity-100">French</Link></li>
            <li><Link href="/languages/german" className="opacity-80 hover:opacity-100">German</Link></li>
            <li><Link href="/languages/japanese" className="opacity-80 hover:opacity-100">Japanese</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Learn More</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/how-it-works" className="opacity-80 hover:opacity-100">How It Works</Link></li>
            <li><Link href="/about" className="opacity-80 hover:opacity-100">About Shadowing</Link></li>
            <li><Link href="/blog" className="opacity-80 hover:opacity-100">Blog</Link></li>
            <li><Link href="/feedback" className="opacity-80 hover:opacity-100">Give Feedback</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="text-sm opacity-80">
            Questions or suggestions?<br />
            <a href="mailto:hello@echophrase.app" className="hover:opacity-100">hello@echophrase.app</a>
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-60">
        © 2026 EchoPhrase. Built with ❤️ for language learners.
      </div>
    </footer>
  );
}
