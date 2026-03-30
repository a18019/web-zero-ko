import Cta from "@/components/Cta";
import DailyLife from "@/components/DailyLife";
import Faq from "@/components/Faq";
import FeaturedContent from "@/components/FeaturedContent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StudentFeatures from "@/components/StudentFeatures";
import SubNav from "@/components/SubNav";
import TeacherFeatures from "@/components/TeacherFeatures";

export default function Home() {
  return (
    <>
      <Header />
      <SubNav />
      <main className="flex flex-col gap-24 pt-16 lg:pt-24">
        <Hero />
        <FeaturedContent />
        <StudentFeatures />
        <TeacherFeatures />
        <DailyLife />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
