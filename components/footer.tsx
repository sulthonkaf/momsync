import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold">M</span>
              </div>
              <span className="font-bold text-lg">MomSync</span>
            </div>
            <p className="text-background/80">Empowering mothers, preventing stunting, building healthier futures.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/features" className="hover:text-background transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-background transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-background transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/about" className="hover:text-background transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-background transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-background transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/privacy" className="hover:text-background transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-background transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/80">
          <p>&copy; 2025 MomSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
