"use client";
import { Globe, Linkedin, Twitter } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Header } from "@/app/components/Header";
import { STRINGS, Lang } from "@/lib/strings";

export default function About() {
  const lang: Lang = (process.env.NEXT_PUBLIC_DEMO_LANG as Lang) === "en" ? "en" : "pl";

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-3xl mx-auto relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-[-1] bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.15),transparent_50%)]" />

      <Header />

      <Card className="w-full p-8 md:p-12 bg-white shadow-xl border-none relative overflow-hidden">
        {/* Decorative stamp */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">{STRINGS.aboutTitle[lang]}</h1>
          <div className="w-16 h-1 bg-accent mb-6" />

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-serif">
            {STRINGS.aboutDescription[lang]}
          </p>

          <div className="bg-secondary/20 p-6 rounded-xl border border-secondary">
            <p className="text-lg font-medium mb-2">Made by Łukasz Gandecki</p>

            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="https://twitter.com/lgandecki"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full hover:bg-accent/10 hover:border-accent transition-all"
              >
                <Twitter size={18} />
                <span>@lgandecki</span>
              </a>

              <a
                href="https://www.linkedin.com/in/lgandecki"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full hover:bg-accent/10 hover:border-accent transition-all"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>

              {/* <a
                href="https://youtube.com/@lgandecki"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full hover:bg-accent/10 hover:border-accent transition-all"
              >
                <Youtube size={18} />
                <span>YouTube</span>
              </a> */}

              <a
                href="https://lgandecki.net"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full hover:bg-accent/10 hover:border-accent transition-all"
              >
                <Globe size={18} />
                <span>lgandecki.net</span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground/60 font-serif italic">
          &copy; {new Date().getFullYear()} {STRINGS.mainTitle[lang]}. {STRINGS.aboutCopyright[lang]}
        </div>
      </Card>
    </div>
  );
}
