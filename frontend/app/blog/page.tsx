import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Journal | Forge & Timber Atelier Nairobi",
  description: "Wood and metal care guides, species notes, and craft insights from the Forge & Timber Atelier workshop in Nairobi, Kenya.",
};

const POSTS = [
  {
    slug: "caring-for-oiled-mvule-furniture",
    title: "Caring for Oiled Mvule Furniture",
    excerpt: "Mvule is one of Kenya's most prized hardwoods — durable, termite-resistant, and rich in colour. Here's how to keep it looking its best for decades.",
    category: "Wood Care",
    readTime: "4 min read",
  },
  {
    slug: "wood-care-guide",
    title: "The Essential Wood Furniture Care Guide",
    excerpt: "Whether it's mahogany, oak, or teak, proper care is what separates furniture that lasts a lifetime from furniture that doesn't survive the decade.",
    category: "Wood Care",
    readTime: "3 min read",
  },
  {
    slug: "preventing-rust-on-steel-furniture",
    title: "Preventing Rust on Steel Furniture",
    excerpt: "Steel furniture brings industrial strength to any space — but only if it's protected. Here's how to keep rust from ever taking hold.",
    category: "Metal Care",
    readTime: "3 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <main
      className="bg-[#131313] text-[#e5e2e1] pt-24 min-h-screen"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')" }}
    >
      <section className="px-4 md:px-16 py-24 max-w-[1440px] mx-auto">
        <span className="text-xs text-[#ffb785] tracking-widest uppercase mb-4 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          From the Workshop
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
          The Journal
        </h1>
        <p className="text-lg text-[#d3c4b9] max-w-2xl leading-relaxed mb-16">
          Notes on wood, metal, and the craft of building furniture that lasts. Straight from our artisans in Nairobi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#1c1b1b] border border-[#4f453d]/40 p-8 flex flex-col hover:border-[#e8bf9b]/40 transition-colors"
            >
              <span className="text-[10px] text-[#e8bf9b] tracking-widest uppercase mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                {post.category}
              </span>
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-[#e8bf9b] transition-colors" style={{ fontFamily: "Playfair Display, serif" }}>
                {post.title}
              </h2>
              <p className="text-[#d3c4b9] text-sm leading-relaxed flex-1 mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-[#9c8e84] pt-4 border-t border-[#4f453d]/30" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                <span>{post.readTime}</span>
                <span className="text-[#e8bf9b] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  READ <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
