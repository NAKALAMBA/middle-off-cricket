import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Products } from "@/components/Products";
import { Testimonials } from "@/components/Testimonials";
import { ShopMarquee } from "@/components/ShopMarquee";
import { Featured } from "@/components/Featured";
import { About } from "@/components/About";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Middle Off — Premium Cricket Gear & Analysis" },
      {
        name: "description",
        content:
          "Premium cricket bats, balls, pads, gloves and protection — built for players who read the game. Free shipping over ₹2,000, 30-day returns.",
      },
      { property: "og:title", content: "Middle Off — Premium Cricket Gear & Analysis" },
      {
        property: "og:description",
        content:
          "Match-grade cricket gear with honest pricing. Trusted by 10,000+ players. Plus deep cricket analysis on the side.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Products />
        <Testimonials />
        <ShopMarquee />
        <Categories />
        <Featured />
        <About />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
