import { Product, Category, ProductColor } from '@/types/product';

// Mock product database
export const allProducts: Product[] = [
  // ===== LIPSTICKS (20 products) =====
  {
    id: 'lipstick-ruby-red-001',
    name: 'M·A·CXIMAL SILKY MATTE LIPSTICK',
    category: 'lipsticks',
    description: 'A silky matte lipstick that delivers 12 hours of full-coverage colour and eight hours of moisture.',
    price: 2000,
    colors: [
      { name: 'Ruby Red', hex: '#C41E3A' },
      { name: 'Cherry Red', hex: '#DE3163' },
      { name: 'Wine Red', hex: '#722F37' },
    ],
    finish: 'matte',
    ingredients: ['Vitamin E', 'Jojoba Oil', 'Shea Butter', 'Candelilla Wax', 'Natural Pigments'],
    image: 'https://sdcdn.io/mac/us/mac_sku_NY9N37_1x1_0.png?width=1080&height=1080',
    featured: true,
  },
  {
    id: 'lipstick-rose-gold-002',
    name: 'Retro Matte Lipstick',
    category: 'lipsticks',
    description: 'A long-wearing Lipstick formula with intense colour payoff and a completely matte finish.',
    price: 2899,
    colors: [
      { name: 'Rose Gold', hex: '#E8B4B8' },
      { name: 'Pink Champagne', hex: '#F4C2C2' },
      { name: 'Deep Rose', hex: '#C4787C' },
      { name: 'Dusty Rose', hex: '#D4A5A5' },
    ],
    finish: 'satin',
    ingredients: ['Long-wearing, eight hours',
'Non-feathering',
'Fade-proof'],
    image: 'https://sdcdn.io/mac/us/mac_sku_M0N904_1x1_0.png?width=1080&height=1080',
    featured: true,
  },
  {
    id: 'lipstick-nude-beige-003',
    name: 'Dazzlelips Crayon',
    category: 'lipsticks',
    description: 'An everyday nude that complements all skin tones. Creamy formula glides on smoothly and provides a natural, your-lips-but-better finish.',
    price: 2299,
    colors: [
      { name: 'Natural Beige', hex: '#DDB892' },
      { name: 'Soft Peach', hex: '#FFDAB9' },
      { name: 'Warm Taupe', hex: '#B38B6D' },
      { name: 'Honey Nude', hex: '#E8C5A5' },
    ],
    finish: 'cream',
    ingredients: ['Vitamin E', 'Coconut Oil', 'Shea Butter', 'Castor Oil', 'Natural Waxes'],
    image: 'https://sdcdn.io/mac/us/mac_sku_S9DS09_1x1_0.png?width=1080&height=1080',
  },
  {
    id: 'lipstick-coral-crush-005',
    name: 'Powder Kiss Liquid Lipcolour',
    category: 'lipsticks',
    description: 'A liquid lipcolour with a whipped, mousse-like texture that delivers Soft-focus moisture-matte, comfortable colour with ten hours of hydration.',
    price: 2399,
    colors: [
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'Peach Coral', hex: '#FFAA88' },
      { name: 'Orange Coral', hex: '#FF6347' },
    ],
    finish: 'satin',
    ingredients: ['Vitamin C', 'Mango Butter', 'Jojoba Oil', 'Sunflower Oil', 'Carnauba Wax'],
    image: 'https://sdcdn.io/mac/us/mac_sku_SJC251_1x1_0.png?width=1080&height=1080',
    featured: true,
  },
  {
    id: 'lipstick-pink-glam-006',
    name: 'Lipmix',
    category: 'lipsticks',
    description: 'A stunning metallic pink that catches the light beautifully. Bold pigmentation with a unique metallic finish for a statement look.',
    price: 3199,
    colors: [
      { name: 'Metallic Pink', hex: '#FF69B4' },
      { name: 'Rose Metal', hex: '#F88379' },
      { name: 'Magenta Metal', hex: '#FF00FF' },
    ],
    finish: 'metallic',
    ingredients: ['Vitamin E', 'Mica', 'Shea Butter', 'Pearl Powder', 'Natural Pigments'],
    image: 'https://sdcdn.io/mac/us/mac_sku_M4R804_1x1_0.png?width=1080&height=1080',
  },
  {
    id: 'lipstick-velvet-blur-023',
    name: 'Totally Teddy Lip Kit',
    category: 'lipsticks',
    description: 'A giftable, holiday-exclusive lip set of four best-selling lip formulas in shades inspired by Velvet Teddy at a M·A·Cnificent value.',
    price: 4900,
    colors: [
      { name: 'Ruby Red', hex: '#C41E3A' },
      { name: 'Cherry Red', hex: '#DE3163' },
      { name: 'Wine Red', hex: '#722F37' },
    ],
    finish: 'matte',
    ingredients: ['Organic Shea Butter',
  'Cocoa Butter',
  'Coconut Oil',
  'Octyldodecanol',
  'Synthetic Wax'],
    image: 'https://sdcdn.io/mac/us/mac_sku_S65QY5_1x1_0.png?width=1080&height=1080',
    featured: true,
  },
  {
    id: 'lipstick-rose-gold-003',
    name: 'M·A·CXIMAL SLEEK SATIN LIPSTICK',
    category: 'lipsticks',
    description: 'A sleek satin lipstick with full-coverage, pigment-rich colour in a comfortable formula that hydrates lips for eight hours.',
    price: 2499,
    colors: [
      { name: 'Rose Gold', hex: '#E8B4B8' },
      { name: 'Pink Champagne', hex: '#F4C2C2' },
      { name: 'Deep Rose', hex: '#C4787C' },
      { name: 'Dusty Rose', hex: '#D4A5A5' },
    ],
    finish: 'satin',
    ingredients: ['Punica Granatum (Pomegranate) Flower Extract',
    'Camellia Japonica Seed Oil',
    'Rosa Canina (Rosehip) Fruit Oil',
    'Ricinus Communis (Castor) Seed Oil',
    'Shea Butter',
    'Vanillin'],
    image: 'https://sdcdn.io/mac/us/mac_sku_NW9M24_1x1_0.png?width=1080&height=1080',
    featured: true,
  },

  // ===== FOUNDATIONS (20 products) =====
  {
    id: 'foundation-porcelain-001',
    name: 'Studio Radiance Serum-Powered™ Foundation',
    category: 'foundations',
    description: 'A full-coverage matte foundation that lasts all day. Formulated to control oil and minimize pores while providing a smooth, airbrushed finish.',
    price: 4299,
    colors: [
      { name: 'Porcelain', hex: '#FFF5E1' },
      { name: 'Ivory', hex: '#F8ECD1' },
      { name: 'Fair', hex: '#F5E6D3' },
      { name: 'Light', hex: '#F0DCC4' },
      { name: 'Light Medium', hex: '#E8C9A9' },
      { name: 'Medium', hex: '#D4A88B' },
      { name: 'Medium Tan', hex: '#C68E69' },
      { name: 'Tan', hex: '#B4785A' },
      { name: 'Deep', hex: '#9B5A3D' },
      { name: 'Rich', hex: '#7A4527' },
    ],
    finish: 'matte',
    ingredients: ['Hyaluronic Acid', 'Vitamin E', 'SPF 30', 'Salicylic Acid', 'Niacinamide'],
    image: 'https://sdcdn.io/mac/us/mac_sku_SYP830_1x1_0.png?width=1080&height=1080',
    featured: true,
  },
  {
    id: 'foundation-radiant-002',
    name: 'Super Stay® Lumi-Matte Foundation makeup',
    category: 'foundations',
    description: 'A luminous foundation that gives your skin a natural, dewy glow. Light to medium coverage with a radiant finish perfect for dry or mature skin.',
    price: 4599,
    colors: [
      { name: 'Fair Porcelain', hex: '#FFF5E1' },
      { name: 'Light Ivory', hex: '#F8ECD1' },
      { name: 'Light Beige', hex: '#F5E6D3' },
      { name: 'Medium Beige', hex: '#E8C9A9' },
      { name: 'Medium Tan', hex: '#D4A88B' },
      { name: 'Tan', hex: '#C68E69' },
      { name: 'Deep Tan', hex: '#B4785A' },
      { name: 'Deep', hex: '#9B5A3D' },
      { name: 'Rich Caramel', hex: '#7A4527' },
      { name: 'Rich Mahogany', hex: '#5D3A1A' },
    ],
    finish: 'satin',
    ingredients: ['Hyaluronic Acid', 'Vitamin C', 'SPF 25', 'Peptides', 'Glycerin'],
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400https://www.maybelline.com/-/media/project/loreal/brand-sites/mny/americas/us/products/face/foundation/lumi-matte-foundation/packshot/maybelline-lumi-matte-foundation-128-upc-p.jpg?rev=f5737056d79e4481a420141678564497&cx=0.25&cy=0.31&cw=632&ch=950&hash=2DB3CD77B743ADBAE6520B642519A121',
    featured: true,
  },
  {
    id: 'foundation-dewy-004',
    name: 'Studio Fix Every-Wear All-Over Face Pen',
    category: 'foundations',
    description: 'A hydrating foundation with a dewy, glass-skin finish. Infused with skincare ingredients for a fresh, healthy glow.',
    price: 4799,
    colors: [
      { name: 'Fair', hex: '#FFF5E1' },
      { name: 'Light', hex: '#F5E6D3' },
      { name: 'Light Medium', hex: '#E8C9A9' },
      { name: 'Medium', hex: '#D4A88B' },
      { name: 'Medium Tan', hex: '#C68E69' },
      { name: 'Tan', hex: '#B4785A' },
      { name: 'Deep', hex: '#9B5A3D' },
      { name: 'Rich', hex: '#7A4527' },
      { name: 'Dark', hex: '#5D3A1A' },
      { name: 'Deep Ebony', hex: '#4A2C0F' },
    ],
    finish: 'satin',
    ingredients: ['Hyaluronic Acid', 'Vitamin C', 'Niacinamide', 'SPF 30', 'Ceramides'],
    image: 'https://sdcdn.io/mac/us/mac_sku_NYA853_1x1_0.png?width=1080&height=1080',
  },
  {
    id: 'foundation-velvet-005',
    name: 'Velvet Matte Foundation',
    category: 'foundations',
    description: 'A luxurious matte foundation with a velvet-smooth finish. Full coverage that feels weightless and lasts up to 24 hours.',
    price: 4999,
    colors: [
      { name: 'Porcelain', hex: '#FFF5E1' },
      { name: 'Ivory', hex: '#F8ECD1' },
      { name: 'Fair', hex: '#F5E6D3' },
      { name: 'Light', hex: '#F0DCC4' },
      { name: 'Light Medium', hex: '#E8C9A9' },
      { name: 'Medium', hex: '#D4A88B' },
      { name: 'Medium Tan', hex: '#C68E69' },
      { name: 'Tan', hex: '#B4785A' },
      { name: 'Deep', hex: '#9B5A3D' },
      { name: 'Rich', hex: '#7A4527' },
      { name: 'Ebony', hex: '#5D3A1A' },
      { name: 'Deep Ebony', hex: '#4A2C0F' },
    ],
    finish: 'matte',
    ingredients: ['Hyaluronic Acid', 'Vitamin E', 'SPF 35', 'Oil-Absorbing Powder', 'Niacinamide'],
    image: 'https://sdcdn.io/mac/us/mac_sku_SMXT23_1x1_0.png?width=1080&height=1080',
  },
  {
    id: 'foundation-sheer-006',
    name: 'Full Coverage Foundation',
    category: 'foundations',
    description: 'A barely-there foundation with sheer, buildable coverage. Perfect for a natural, no-makeup makeup look.',
    price: 3499,
    colors: [
      { name: 'Fair', hex: '#FFF5E1' },
      { name: 'Light', hex: '#F5E6D3' },
      { name: 'Medium', hex: '#D4A88B' },
      { name: 'Tan', hex: '#B4785A' },
      { name: 'Deep', hex: '#9B5A3D' },
      { name: 'Rich', hex: '#7A4527' },
    ],
    finish: 'sheer',
    ingredients: ['Vitamin E', 'Aloe Vera', 'SPF 15', 'Green Tea Extract', 'Glycerin'],
    image: 'https://sdcdn.io/mac/us/mac_sku_M0P159_1x1_1.png?width=1080&height=1080',
  },
  {
    id: 'foundation-hd-007',
    name: 'Pro Palette Full Coverage Foundation x 12',
    category: 'foundations',
    description: 'A high-definition foundation designed for camera-ready skin. Blurs imperfections and provides a flawless finish.',
    price: 5299,
    colors: [
      { name: 'Fair 01', hex: '#FFF5E1' },
      { name: 'Fair 02', hex: '#F8ECD1' },
      { name: 'Light 01', hex: '#F5E6D3' },
      { name: 'Light 02', hex: '#F0DCC4' },
      { name: 'Medium 01', hex: '#E8C9A9' },
      { name: 'Medium 02', hex: '#D4A88B' },
      { name: 'Tan 01', hex: '#C68E69' },
      { name: 'Tan 02', hex: '#B4785A' },
      { name: 'Deep 01', hex: '#9B5A3D' },
      { name: 'Deep 02', hex: '#7A4527' },
      { name: 'Rich 01', hex: '#5D3A1A' },
      { name: 'Rich 02', hex: '#4A2C0F' },
    ],
    finish: 'satin',
    ingredients: ['Hyaluronic Acid', 'Vitamin C', 'SPF 30', 'Soft-Focus Powders', 'Peptides'],
    image: 'https://sdcdn.io/mac/us/mac_sku_SCC201_1x1_0.png?width=1080&height=1080',
  },
  {
    id: 'foundation-hydra-008',
    name: 'Strobe Dewy Skin Tint Moisturizer',
    category: 'foundations',
    description: 'A sheer, illuminating tinted moisturizer with light-bending effects thats infused with hyaluronic acid, shea butter, squalane and vitamin E. Please note packaging may vary.',
    price: 4399,
    colors: [
      { name: 'Porcelain', hex: '#FFF5E1' },
      { name: 'Fair', hex: '#F5E6D3' },
      { name: 'Light', hex: '#F0DCC4' },
      { name: 'Light Medium', hex: '#E8C9A9' },
      { name: 'Medium', hex: '#D4A88B' },
      { name: 'Tan', hex: '#B4785A' },
      { name: 'Deep', hex: '#9B5A3D' },
      { name: 'Rich', hex: '#7A4527' },
    ],
    finish: 'satin',
    ingredients: ['Hyaluronic Acid', 'Vitamin E', 'SPF 25', 'Glycerin', 'Ceramides'],
    image: 'https://sdcdn.io/mac/us/mac_sku_NX5X01_1x1_0.png?width=1080&height=1080',
  },
  {
    id: 'foundation-studio-fix-blur-021',
    name: 'Studio Fix Pro Set + Blur Weightless Loose Powder',
    category: 'foundations',
    description: 'An ultra-refined loose powder that sets makeup all day, instantly absorbs oil and provides a photo-friendly matte finish with a 3D blurring effect.',
    price: 3600,
    colors: [
      { name: 'Porcelain', hex: '#FFF5E1' },
      { name: 'Fair', hex: '#F5E6D3' },
      { name: 'Light', hex: '#F0DCC4' },
      { name: 'Light Medium', hex: '#E8C9A9' },
      { name: 'Medium', hex: '#D4A88B' },
      { name: 'Tan', hex: '#B4785A' },
      { name: 'Deep', hex: '#9B5A3D' },
      { name: 'Rich', hex: '#7A4527' },
    ],
    finish: 'satin',
    ingredients: ['Lightweight, ultra-refined powder sets makeup',
'Instantly absorbs oil and controls shine',
'Blurs and smooths the look of blemishes',
'Colour-true longwear',
'Doesnt settle, cake or crease',
'Sweat- and humidity-resistant',
'Does not cause acne',
'Suitable for all skin types'],
    image: 'https://sdcdn.io/mac/us/mac_sku_NX6403_1x1_0.png?width=1080&height=1080',
  },
{
    id: 'foundation-full-coverage-022',
    name: 'Full Coverage Foundation',
    category: 'foundations',
    description: 'A foundation thats both water-resistant and long-wearing with opaque coverage.',
    price: 3600,
    colors: [
      { name: 'Porcelain', hex: '#FFF5E1' },
      { name: 'Fair', hex: '#F5E6D3' },
      { name: 'Light', hex: '#F0DCC4' },
      { name: 'Light Medium', hex: '#E8C9A9' },
      { name: 'Medium', hex: '#D4A88B' },
      { name: 'Tan', hex: '#B4785A' },
      { name: 'Deep', hex: '#9B5A3D' },
      { name: 'Rich', hex: '#7A4527' },
    ],
    finish: 'satin',
    ingredients: ['Silica', 
    'Polymethylsilsesquioxane', 
    'Lauroyl Lysine', 
    'Tocopheryl Acetate (Vitamin E)', 
    'Ethylhexylglycerin',
    'Lecithin'],
    image: 'https://sdcdn.io/mac/us/mac_sku_M0P159_1x1_0.png?width=1080&height=1080',
  },

  // ===== SERUMS (20 products) =====

  {
    id: 'serum-retinol-002',
    name: 'Hydrium Triple Hyaluronic Moisture Ampoule',
    category: 'serums',
    description: 'Gift your skin with deep & long - lasting hydration!',
    price: 6999,
    colors: [],
    finish: 'serums',
    ingredients: ['Retinol 1%', 'Peptides', 'Hyaluronic Acid', 'Vitamin E', 'Ceramides'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://www.cosrx.com/cdn/shop/files/hydrium-triple-hyaluronic-moisture-ampoule-cosrx-official-1.jpg?v=1724835343',
    featured: true,
  },
  {
    id: 'serum-hyaluronic-003',
    name: 'Hyaluronic Acid Hydrating Serum',
    category: 'serums',
    description: 'An ultra-hydrating serum with multi-weight hyaluronic acid. Plumps and moisturizes skin at multiple levels for long-lasting hydration.',
    price: 4999,
    colors: [],
    finish: 'cream',
    ingredients: ['Hyaluronic Acid Multi-Weight', 'Vitamin B5', 'Glycerin', 'Aloe Vera', 'Ceramides'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://soskin.fr/cdn/shop/files/Serumdoublecorrection.png?v=1740080003&width=1500',
  },
  {
    id: 'serum-niacinamide-004',
    name: 'Niacinamide Pore Refining Serum',
    category: 'serums',
    description: 'A pore-minimizing serum with 10% niacinamide. Regulates oil production, refines pores, and improves skin texture for a smooth, matte finish.',
    price: 4499,
    colors: [],
    finish: 'cream',
    ingredients: ['Niacinamide 10%', 'Zinc', 'Hyaluronic Acid', 'Vitamin B5', 'Salicylic Acid'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
  },
  {
    id: 'serum-peptide-005',
    name: 'Peptide Firming Serum',
    category: 'serums',
    description: 'Rebalancing and stimulating action for a fresher, younger complexion. Skin texture is smoothed and evened out.',
    price: 7999,
    colors: [],
    finish: 'cream',
    ingredients: ['Matrixyl 3000', 'Argireline', 'Copper Peptides', 'Hyaluronic Acid', 'Vitamin E'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
  },
  {
    id: 'serum-vitamin-e-006',
    name: 'Vitamin Antioxidant Serum',
    category: 'serums',
    description: 'A protective antioxidant serum rich in vitamin E. Shields skin from environmental damage while providing deep nourishment and hydration.',
    price: 4299,
    colors: [],
    finish: 'serums',
    ingredients: ['Vitamin E', 'Vitamin C', 'Ferulic Acid', 'Green Tea Extract', 'Resveratrol'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
  },
  {
    id: 'serum-aha-bha-007',
    name: 'AHA BHA Exfoliating Serum',
    category: 'serums',
    description: 'A gentle exfoliating serum with AHA and BHA. Removes dead skin cells, unclogs pores, and reveals brighter, smoother skin.',
    price: 5499,
    colors: [],
    finish: 'serums',
    ingredients: ['Glycolic Acid 5%', 'Salicylic Acid 2%', 'Lactic Acid', 'Hyaluronic Acid', 'Aloe Vera'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://soskin.fr/cdn/shop/files/SKM160_BRIGHTSERUMBOOSTE_PACK1_BLANC.png?v=1763160071&width=1500',
  },
  {
    id: 'serum-collagen-008',
    name: 'Minéral 89 Hyaluronic Acid Serum',
    category: 'serums',
    description: 'hyaluronic acid booster, Mineral 89 Serum is formulated with Pure Hyaluronic Acid and 15 Mineral-Rich Vichy Volcanic Water to strengthen & repair your skin barrier.',
    price: 6499,
    colors: [],
    finish: 'serums',
    ingredients: ['Hydrolyzed Collagen', 'Peptides',  'Hyaluronic Acid'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://www.vichyusa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-vichy-master-catalog/default/dwfc8759c1/product/Mineral89/NEW-%20Vichy-Mineral-89-Hyaluronic-Acid-Face-Serum-50-ml-3337875543248-PDP-1%20(2).jpg?sw=720&sh=750&sm=cut&sfrm=jpg&q=70',
  },
  {
    id: 'serum-squalane-009',
    name: 'Liftactiv 16% Pure Vitamin C Brightening Serum',
    category: 'serums',
    description: 'A serum formulated with our highest concentration of 16% Pure Vitamin C, and now formulated without any drying alcohols.',
    price: 4799,
    colors: [],
    finish: 'serums',
    ingredients: ['Squalane', 'Vitamin c', 'Hyaluronic Acid', 'Jojoba Oil', 'Ceramides'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://www.vichyusa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-vichy-master-catalog/default/dw32a2f52b/product/vitamincserum/Vichy-LiftActiv-Vitamin-C-Serum-Bottle-Reflection-2025.jpg?sw=720&sh=750&sm=cut&sfrm=jpg&q=70',
  },
  {
    id: 'serum-tranexamic-010',
    name: 'Tranexamic Acid Dark Spot Serum',
    category: 'serums',
    description: 'A serum formulated with our highest concentration of 16% Pure Vitamin C, and now formulated without any drying alcohols.',
    price: 6299,
    colors: [],
    finish: 'cream',
    ingredients: ['Tranexamic Acid 5%', 'Niacinamide', 'Vitamin C', 'Kojic Acid', 'Licorice Extract'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
  },
  {
    id: 'serum-bakuchiol-011',
    name: 'LiftActiv Anti-Wrinkle Day Cream ',
    category: 'serums',
    description: 'A gentle retinol alternative perfect for sensitive skin. Bakuchiol provides anti-aging benefits without irritation.',
    price: 5799,
    colors: [],
    finish: 'serums',
    ingredients: ['Bakuchiol 2%', 'Peptides', 'Hyaluronic Acid', 'Vitamin E', 'Niacinamide'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://www.vichyusa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-vichy-master-catalog/default/dw1f90b81b/product/LiftActiv-Supreme-Day-Cream/LiftActiv-Supreme%20Anti-Wrinkle%20Day-5.jpg?sw=720&sh=750&sm=cut&sfrm=png&q=70',
  },
  {
    id: 'serum-ceramide-012',
    name: 'Retinol 0.2 Boosting Shot Ampoule',
    category: 'serums',
    description: 'Elasticity Boost, Smoother Texture, Helps reduce the appearance of wrinkles, Firming',
    price: 5499,
    colors: [],
    finish: 'serums',
    ingredients: ['Ceramides', 'Cholesterol', 'Fatty Acids', 'Retinol 0.2', 'Niacinamide'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://www.skin1004.com/cdn/shop/files/skin1004-30ml-retinol-0-2-boosting-shot-ampoule-1170007504_1440x.png?v=1750078128',
  },
  {
    id: 'serum-snail-mucin-013',
    name: 'Snail Mucin Repair Serum',
    category: 'serums',
    description: 'A regenerating serum with 96% snail mucin. Repairs damaged skin, fades scars, and provides intense hydration.',
    price: 3999,
    colors: [],
    finish: 'cream',
    ingredients: ['Snail Mucin 96%', 'Hyaluronic Acid', 'Allantoin', 'Peptides', 'Glycerin'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://www.cosrx.com/cdn/shop/files/5_bc6986a1-1b85-42ce-b761-6bc4acbb07a3.png?v=1757571879',
  },
  {
    id: 'serum-azelaic-014',
    name: 'AC Collection Blemish Spot Drying Lotion',
    category: 'serums',
    description: 'A multi-tasking serum with azelaic acid. Brightens skin, reduces redness, and helps clear acne-prone skin.',
    price: 5299,
    colors: [],
    finish: 'cream',
    ingredients: ['Azelaic Acid 10%', 'Niacinamide', 'Salicylic Acid', 'Hyaluronic Acid', 'Zinc'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://www.cosrx.com/cdn/shop/files/ac-collection-blemish-spot-drying-lotion-cosrx-official-1.jpg?v=1724836370',
  },
  {
    id: 'serum-coq10-015',
    name: 'BHA Blackhead Power Liquid',
    category: 'serums',
    description: 'An energizing serum with coenzyme Q10. Revitalizes tired skin, reduces fine lines, and provides antioxidant protection.',
    price: 2899,
    colors: [],
    finish: 'cream',
    ingredients: ['Coenzyme Q10', 'Vitamin C', 'Vitamin E', 'Hyaluronic Acid', 'Peptides'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400https://www.cosrx.com/cdn/shop/files/bha-blackhead-power-liquid-cosrx-official-1.jpg?v=1689840681',
  },
  {
    id: 'serum-rose-hip-016',
    name: 'Multi-Concern All-in One Peptide Booster',
    category: 'serums',
    description: 'A nourishing serum with organic rosehip oil. Rich in essential fatty acids and vitamins to regenerate and brighten skin.',
    price: 4499,
    colors: [],
    finish: 'cream',
    ingredients: ['Rosehip Oil', 'Vitamin A', 'Vitamin C', 'Vitamin E', 'Essential Fatty Acids'],
    sizes: ['15ml', '30ml', '50ml'],
    image: 'https://www.cosrx.com/cdn/shop/files/1_23a79a66-a967-4533-9e71-cd88b0c6efb2.jpg?v=1724837008https://www.cosrx.com/cdn/shop/files/1_23a79a66-a967-4533-9e71-cd88b0c6efb2.jpg?v=1724837008',
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return allProducts.find(product => product.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return allProducts.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter(product => product.featured === true);
}

export function searchProductsByColor(hexCodes: string[]): Product[] {
  // Convert hex codes to lowercase for case-insensitive comparison
  const normalizedHexCodes = hexCodes.map(hex => hex.toLowerCase());

  // Find products that have colors matching or similar to the provided hex codes
  const matchedProducts = allProducts.filter(product => {
    if (product.colors.length === 0) return false;

    return product.colors.some(color => {
      const normalizedProductHex = color.hex.toLowerCase();
      // Check for exact matches
      if (normalizedHexCodes.includes(normalizedProductHex)) {
        return true;
      }

      // Check for similar colors (within the same color family)
      return normalizedHexCodes.some(searchHex => {
        return areColorsSimilar(searchHex, normalizedProductHex);
      });
    });
  });

  return matchedProducts;
}

// Helper function to check if two colors are similar
function areColorsSimilar(hex1: string, hex2: string): boolean {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return false;

  // Calculate color distance using simple Euclidean distance
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );

  // Consider colors similar if distance is less than 80 (out of max ~441)
  return distance < 80;
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
