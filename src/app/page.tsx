import CareerPath from "@/components/CareerPath";
import Cta from "@/components/Cta";
import DailyLife from "@/components/DailyLife";
import Events from "@/components/Events";
import Faq from "@/components/Faq";
import FeaturedContent from "@/components/FeaturedContent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StudentFeatures from "@/components/StudentFeatures";
import StudentWorks from "@/components/StudentWorks";
import HeaderNav from "@/components/SubNav";
import TeacherFeatures from "@/components/TeacherFeatures";

export default function Home() {
  return (
    <>
      <Header />
      <HeaderNav />
      <main className="flex flex-col gap-40 pt-16">
        <Hero />
        <FeaturedContent />
        <Events />
        <StudentFeatures />
        <TeacherFeatures />
        <DailyLife />
        <StudentWorks />
        <Faq />
        <CareerPath />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
