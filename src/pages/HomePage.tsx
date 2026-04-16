import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import StudioSection from '../sections/StudioSection'
import ArtistsSection from '../sections/ArtistsSection'
import GallerySection from '../sections/GallerySection'
import TestimonialsSection from '../sections/TestimonialsSection'
import InstagramSection from '../sections/InstagramSection'
import NewsletterSection from '../sections/NewsletterSection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar dark />
      <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StudioSection />
      <ArtistsSection />
      <GallerySection />
      <TestimonialsSection />
      <InstagramSection />
      <NewsletterSection />
      <Footer />
    </main>
    </>
  )
}
