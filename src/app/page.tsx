import Header from "@/components/Header";
import HeaderNav from "@/components/HeaderNav";
import Hero from "@/components/Hero";
import FeaturedContent from "@/components/FeaturedContent";
import Events from "@/components/Events";
import StudentFeatures from "@/components/StudentFeatures";
import TeacherFeatures from "@/components/TeacherFeatures";
import DailyLife from "@/components/DailyLife";
import StudentWorks from "@/components/StudentWorks";
import Faq from "@/components/Faq";
import CareerPath from "@/components/CareerPath";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeaderNav />
      <Hero />
      <FeaturedContent />
      <Events />
      <StudentFeatures />
      <TeacherFeatures />
      <DailyLife />
      <StudentWorks />
      <Faq />
      <CareerPath />
      <Footer />
    </>
  );
}
