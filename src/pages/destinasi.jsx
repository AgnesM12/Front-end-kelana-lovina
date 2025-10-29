import HeroSection from "../components/HeroSection";
import HalamanPaketPenuh from "../components/HalamanPaketPenuh";


function Destinasi() {
    const dataHero = {
        title: "Temukan Paket Terbaik untuk Perjalananmu",
        imageSrc: '/hero.png',
        altText: 'hero',
    };
    return (
        <main className="w-full max-w-7xl mx-auto px-6 sm:px-8  overflow-x-hidden my-16">
        <HeroSection hero={dataHero} />
        <HalamanPaketPenuh/>
        </main>
    );
}
export default Destinasi;



