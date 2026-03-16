import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedContent from "@/components/featured-content";
import Events from "@/components/events";
import StudentFeatures from "@/components/student-features";
import TeacherFeatures from "@/components/teacher-features";
import DailyLife from "@/components/daily-life";
import StudentWorks from "@/components/student-works";
import Faq from "@/components/faq";
import CareerPath from "@/components/career-path";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedContent />
      <Events />
      <StudentFeatures />
      <TeacherFeatures />
      <DailyLife />
      <StudentWorks />
      <Faq />
      <CareerPath />
      <SiteFooter />
    </>
  );
}
