import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { AIImageSearch } from '@/components/AIImageSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Upload, ShoppingBag } from 'lucide-react';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  const categories = [
    {
      name: 'Lipsticks',
      href: '/products/lipsticks',
      description: 'Bold colors, long-lasting formulas',
      emoji: '💄',
    },
    {
      name: 'Foundations',
      href: '/products/foundations',
      description: 'Flawless coverage for every skin tone',
      emoji: '✨',
    },
    {
      name: 'Serums',
      href: '/products/serums',
      description: 'Powerful skincare ingredients',
      emoji: '🧖🏻‍♀️🫧🧴',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-gold/10 via-white to-baby-blue/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-playfair text-charcoal mb-6">
            A butterfly's effect may be
            <span className="text-rose-gold"> unseen, </span>
            but it lasts forever.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-inter">
            Discover beauty that transforms and endures
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#ai-search">
              <Button
                size="lg"
                className="bg-rose-gold hover:bg-deep-rose text-white text-lg px-8 py-6"
              >
                <Upload className="w-5 h-5 mr-2" />
                Try AI Image Search
              </Button>
            </Link>
            <Link href="/products/lipsticks">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white text-lg px-8 py-6"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Image Search */}
      <section id="ai-search" className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-playfair text-charcoal mb-3">
              AI-Powered Product Matching
            </h2>
            <p className="text-gray-600">
              Upload a photo and let AI find your perfect makeup match
            </p>
          </div>

          <AIImageSearch />
        </div>
      </section>

      {/* Category Cards */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-playfair text-charcoal text-center mb-12">
          Shop by Category
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="group hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-rose-gold">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{category.emoji}</div>
                  <h3 className="text-2xl font-playfair text-charcoal mb-2 group-hover:text-rose-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair text-charcoal mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Discover our most-loved beauty essentials
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products/lipsticks">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
