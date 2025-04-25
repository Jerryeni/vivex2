import { lazy, Suspense } from 'react'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Header } from '../../components/layout/Header';
const Hero = lazy(() => import('../../components/landing_page/Hero').then(module => ({ default: module.Hero })));
const ServiceFeatures = lazy(() => import('../../components/landing_page/ServiceFeatures').then(module => ({ default: module.ServiceFeatures })));
const BestDeals = lazy(() => import('../../components/landing_page/BestDeals').then(module => ({ default: module.BestDeals })));
const SpecialProducts = lazy(() => import('../../components/landing_page/SpecialProducts').then(module => ({ default: module.SpecialProducts })));
const PromotionalBanners = lazy(() => import('../../components/landing_page/PromotionalBanners').then(module => ({ default: module.PromotionalBanners })));
const ComputerAccessories = lazy(() => import('../../components/landing_page/ComputerAccessories').then(module => ({ default: module.ComputerAccessories })));
const PromotionalBanners2 = lazy(() => import('../../components/landing_page/PromotionalBanners2').then(module => ({ default: module.PromotionalBanners2 })));
const FeaturedProducts = lazy(() => import('../../components/landing_page/FeaturedProducts').then(module => ({ default: module.FeaturedProducts })));
const FlashSale = lazy(() => import('../../components/landing_page/FlashSale').then(module => ({ default: module.FlashSale })));
const Blog = lazy(() => import('../../components/landing_page/Blog').then(module => ({ default: module.Blog })));
// const AboutUs = lazy(() => import('./pages/AboutUs').then(module => ({ default: module.AboutUs })));
// const Support = lazy(() => import('./pages/Support').then(module => ({ default: module.Support })));
// const FAQ = lazy(() => import('./pages/FAQ').then(module => ({ default: module.FAQ })));


export default function Home() {
    return (
        <main className='overflow-hidden bg-white'>
            <Suspense fallback={<LoadingSpinner />}>
                <Hero />
                <ServiceFeatures />
                <BestDeals />
                <SpecialProducts />
                <FeaturedProducts />
                <PromotionalBanners />
                <ComputerAccessories />
                <PromotionalBanners2 />
                <FlashSale />
                <Blog />
            </Suspense>
        </main>
    )
}
