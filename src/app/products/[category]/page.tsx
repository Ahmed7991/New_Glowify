import { notFound } from 'next/navigation';
import { getProductsByCategory } from '@/lib/products';
import { Category } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Validate category
  const validCategories: Category[] = ['lipsticks', 'foundations', 'serums'];
  if (!validCategories.includes(category as Category)) {
    notFound();
  }

  const products = getProductsByCategory(category as Category);

  // Category metadata
  const categoryInfo = {
    lipsticks: {
      title: 'Lipsticks',
      description: 'Discover our collection of bold, long-lasting lipsticks in a variety of colors and finishes.',
      emoji: '💄',
    },
    foundations: {
      title: 'Foundations',
      description: 'Find your perfect match with our comprehensive range of foundations for every skin tone.',
      emoji: '✨',
    },
    serums: {
      title: 'Serums',
      description: 'Transform your skin with powerful, targeted serums packed with active ingredients.',
      emoji: '🧪',
    },
  }[category as Category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-gold/10 via-white to-baby-blue/10">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-playfair text-charcoal mb-4">
            {categoryInfo.title}
          </h1>
          <p className="text-lg text-gray-600">{categoryInfo.description}</p>
        </div>

        {/* Product Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{products.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params for build-time optimization
export async function generateStaticParams() {
  return [
    { category: 'lipsticks' },
    { category: 'foundations' },
    { category: 'serums' },
  ];
}

// Metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;

  const categoryTitles = {
    lipsticks: 'Lipsticks - Glowify',
    foundations: 'Foundations - Glowify',
    serums: 'Serums - Glowify',
  };

  return {
    title: categoryTitles[category as Category] || 'Products - Glowify',
  };
}
