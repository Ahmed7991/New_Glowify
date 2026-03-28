'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartModal } from '@/components/CartModal';
import { UserNav } from '@/components/UserNav';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products/lipsticks', label: 'Lipsticks' },
    { href: '/products/foundations', label: 'Foundations' },
    { href: '/products/serums', label: 'Serums' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-playfair text-rose-gold font-bold">
              Glowify
            </h1>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-poppins transition-colors hover:text-rose-gold ${
                  isActiveLink(link.href)
                    ? 'text-rose-gold font-semibold border-b-2 border-rose-gold pb-1'
                    : 'text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side - Cart and User Nav */}
          <div className="flex items-center gap-2">
            <CartModal />
            <UserNav />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-poppins whitespace-nowrap transition-colors hover:text-rose-gold ${
                isActiveLink(link.href)
                  ? 'text-rose-gold font-semibold border-b-2 border-rose-gold pb-1'
                  : 'text-charcoal'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
