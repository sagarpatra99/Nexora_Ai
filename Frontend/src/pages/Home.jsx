import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Zap, ShoppingBag, BarChart3, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';

const categories = [
  { name: 'Electronics', icon: Zap, color: 'from-blue-500 to-cyan-500' },
  { name: 'Fashion', icon: ShoppingBag, color: 'from-pink-500 to-rose-500' },
  { name: 'Home & Living', icon: Star, color: 'from-amber-500 to-orange-500' },
  { name: 'Sports', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
];

const features = [
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Personalized product suggestions powered by machine learning algorithms.',
  },
  {
    icon: TrendingUp,
    title: 'Price Forecasting',
    description: 'AI-driven price trend analysis to help you buy at the right time.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Razorpay integration with end-to-end encrypted transactions.',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Real-time dashboards for sellers and admins with actionable insights.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F1F1F7]">
        <div className="absolute inset-0 nexora-gradient opacity-[0.03]" />
        <div className="container py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm bg-white">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-muted-foreground">AI-Powered Shopping Experience</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Shop Smarter with{' '}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,hsl(230,65%,25%),hsl(262,83%,58%))] inline-block">Nexora.ai</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Discover products tailored to you, predict price trends, and enjoy a seamless shopping experience powered by artificial intelligence.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/products">
                <Button size="lg" className="nexora-gradient text-white border-0 gap-2 bg-[linear-gradient(135deg,hsl(230,65%,25%),hsl(262,83%,58%))]">
                  Start Shopping <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline">
                  Become a Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-40 py-16 bg-[#F6F7F9]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Shop by Category</h2>
            <p className="text-muted-foreground text-sm mt-1">Browse our curated collections</p>
          </div>
          <Link to="/categories">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link to={`/products?category=${cat.name}`} key={cat.name}>
              <Card className="group cursor-pointer hover:shadow-md transition-shadow border-0 bg-card">
                <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                  <div className={`rounded-xl bg-linear-to-br ${cat.color} p-3 text-white group-hover:scale-105 transition-transform`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-sm">{cat.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-40 border-y border-gray-300 bg-white">
        <div className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Why Nexora.ai?</h2>
            <p className="text-gray-500 text-sm mt-1">
              Cutting-edge AI meets e-commerce
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="text-center space-y-3 p-4">
                <div className="inline-flex rounded-xl p-3 text-white bg-[linear-gradient(135deg,hsl(230,65%,25%),hsl(262,83%,58%))]">
                  <feat.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{feat.title}</h3>
                <p className="text-sm text-gray-600">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-48 py-16">
        <div className="rounded-2xl p-8 md:p-12 flex flex-col items-center text-white bg-[linear-gradient(135deg,hsl(230,65%,25%),hsl(262,83%,58%))]">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Selling?</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto text-center">
            Join thousands of sellers on Nexora.ai and reach millions of customers with AI-powered tools.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Create Seller Account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
