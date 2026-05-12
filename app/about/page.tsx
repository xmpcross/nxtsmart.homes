import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    `${SITE.name} — your independent, tech-savvy companions in smart electronics and home gadgets. Comprehensive guides, price comparisons and up-to-the-minute information.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div data-testid="about-page">
      <Hero />
      <Mission />
      <Vision />
      <Community />
      <ThankYou />
    </div>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            About Us
          </h1>
          <h2 className="mt-6 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
            About {SITE.name}: Number 1 Trusted Guide to the Smart Technology Universe
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-ink/70 sm:text-lg">
            At {SITE.name}, we’re more than just a website — we’re your independent, tech-savvy
            companions in the exciting world of smart electronics and home gadgets. Our team of
            passionate tech enthusiasts, researchers, and writers is dedicated to making your smart
            tech journey as smooth and rewarding as possible.
          </p>
        </div>
        <div className="relative">
          {/* Decorative background image (the source's about_image_bg.png) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/about_image_bg.png"
            alt=""
            aria-hidden
            className="mx-auto h-auto w-full max-w-md object-contain mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- OUR MISSION ---------- */

function Mission() {
  const pillars = [
    {
      title: 'Comprehensive, easy-to-digest guides',
      body:
        'Our in-depth articles break down the complexities of smart products — from the latest TVs and sound systems to cutting-edge security and automation. We use clear, jargon-free language so you can make informed decisions about the products that are right for you.',
    },
    {
      title: 'Powerful price comparisons',
      body:
        'We scour the web to find the best deals on the products you want, saving you time and money. Our comparison tools are easy to use and keep you up-to-date on the latest sales and discounts.',
    },
    {
      title: 'Up-to-the-minute information',
      body:
        'Our team is constantly researching and updating our content so you’re always in the know about the latest trends and innovations. We stay ahead of the curve, covering everything from new product releases to emerging smart-home technologies.',
    },
  ];
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our mission</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Simplify, Inform, Empower.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-ink/70">
            Navigating the ever-changing landscape of smart technology can feel like a challenge, but
            we’re here to make it simple. Three pillars drive everything we publish.
          </p>
          <div className="mt-8 hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/about_left_01-al.png"
              alt=""
              aria-hidden
              className="h-auto w-full max-w-xs object-contain mix-blend-multiply"
            />
          </div>
        </div>
        <ol className="space-y-6">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="relative rounded-3xl border border-ink/10 bg-paper/50 p-6 transition hover:border-primary/40 sm:p-8"
            >
              <span className="absolute -left-3 -top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{p.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink/70">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- OUR VISION ---------- */

function Vision() {
  return (
    <section className="bg-[#101d27] py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/90">Our vision</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            The future of smart-tech shopping.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            We envision a future where everyone can confidently embrace smart technology, regardless of
            their tech knowledge. We’re working towards becoming the leading platform and community for
            smart-tech enthusiasts and shoppers worldwide.
          </p>
        </div>
        <div className="relative flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/about_right_image-al.png"
            alt=""
            aria-hidden
            className="h-auto w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- COMMUNITY ---------- */

function Community() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
        <div className="order-2 flex justify-center lg:order-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/about_left_02-al.png"
            alt=""
            aria-hidden
            className="h-auto w-full max-w-sm object-contain mix-blend-multiply"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The community</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            More than a source — a community.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
            {SITE.name} is more than just a source of information — it’s a community. We value your
            feedback and believe that together we can create the ultimate resource for smart technology.
            Share your thoughts, ask questions, and join us as we explore the endless possibilities of
            the smart-tech universe.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
            Whether you’re a seasoned smart-home expert or just starting out, we welcome you to our
            community.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- THANK YOU ---------- */

function ThankYou() {
  return (
    <section className="bg-white py-20">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about/about_image_floweral.png"
          alt=""
          aria-hidden
          className="mx-auto mb-6 h-12 w-auto object-contain mix-blend-multiply opacity-80"
        />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Thank you</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Let’s get smart together.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
          Thank you for choosing {SITE.name} as your trusted source for all things smart tech. We’re
          excited to be part of your journey and look forward to helping you make the most of the
          amazing world of smart technology.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/product-comparisons"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-emphasis"
          >
            Browse comparisons
          </Link>
          <Link
            href="/product-reviews"
            className="inline-flex items-center rounded-full border border-ink/15 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink transition hover:border-primary hover:text-primary"
          >
            Read reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
