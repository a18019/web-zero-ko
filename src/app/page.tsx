import DailyLife from "@/components/DailyLife";
import FeaturedContent from "@/components/FeaturedContent";
import Hero from "@/components/Hero";
import StudentFeatures from "@/components/StudentFeatures";
// import TeacherFeatures from "@/components/TeacherFeatures";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 pt-16 pb-24 lg:pt-24">
      <Hero />
      <FeaturedContent />
      <StudentFeatures />
      {/* <TeacherFeatures /> */}
      <DailyLife />
    </main>
  );
}
