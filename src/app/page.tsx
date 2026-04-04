import ArticleList from "@/components/ArticleList";
import FeaturedContent from "@/components/FeaturedContent";
import Hero from "@/components/Hero";
import StudentsMemo from "@/components/StudentsMemo";
import TeacherFeatures from "@/components/TeacherFeatures";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 pt-16 pb-24 lg:pt-24">
      <Hero />
      <Suspense>
        <FeaturedContent />
      </Suspense>
      <Suspense>
        <StudentsMemo />
      </Suspense>
      <TeacherFeatures />
      <Suspense>
        <ArticleList />
      </Suspense>
    </main>
  );
}
