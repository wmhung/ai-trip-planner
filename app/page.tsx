import Hero from './_components/Hero';
import Footer from './_components/Footer';
import { PopularCityList } from './_components/PopularCityList';

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCityList />
      <Footer />
    </div>
  );
}
