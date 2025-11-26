"use client";

import Link from "next/link";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { PenTool, History, Info, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/app/components/ui/sheet";
import { STRINGS, Lang } from "@/lib/strings";

export function Header() {
  const lang: Lang = (process.env.NEXT_PUBLIC_DEMO_LANG as Lang) === "en" ? "en" : "pl";

  return (
    <header className="w-full flex justify-between items-center mb-12 mt-4 z-10">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
          <PenTool size={24} strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-primary">{STRINGS.mainTitle[lang]}</h1>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">AI Assistant</p>
        </div>
      </Link>

      {/* Desktop navigation */}
      <div className="hidden sm:flex gap-4 items-center">
        <Link href="/history" prefetch={true}>
          <Button
            variant="ghost"
            className="font-serif italic hover:bg-transparent hover:text-accent transition-colors"
            data-testid="button-history"
          >
            <History className="mr-2 h-4 w-4" />
            {STRINGS.navHistory[lang]}
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="ghost"
            className="font-serif italic hover:bg-transparent hover:text-accent transition-colors"
            data-testid="button-about"
          >
            {STRINGS.navAbout[lang]}
          </Button>
        </Link>
        <div className="w-[100px] flex justify-center items-center">
          <Authenticated>
            <div className="animate-in fade-in duration-300 flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    userButtonTrigger: {
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:active": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    },
                    avatarBox: {
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    },
                    userButtonAvatarBox: {
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    },
                    userButtonPopoverCard: {
                      outline: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    },
                    rootBox: {
                      outline: "none",
                      boxShadow: "none",
                    },
                  },
                }}
              />
            </div>
          </Authenticated>
          <Unauthenticated>
            <div className="animate-in fade-in duration-500">
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="font-serif italic hover:bg-transparent hover:text-accent transition-colors"
                >
                  {STRINGS.authSignIn[lang]}
                </Button>
              </SignInButton>
            </div>
          </Unauthenticated>
          <AuthLoading>
            <Button
              variant="ghost"
              className="font-serif italic hover:bg-transparent hover:text-accent transition-colors"
            >
              {STRINGS.authAuthorizing[lang]}
            </Button>
          </AuthLoading>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle className="font-serif">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <SheetClose asChild>
                <Link href="/history">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-serif italic hover:bg-transparent hover:text-accent transition-colors"
                  >
                    <History className="mr-2 h-4 w-4" />
                    {STRINGS.navHistory[lang]}
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-serif italic hover:bg-transparent hover:text-accent transition-colors"
                  >
                    <Info className="mr-2 h-4 w-4" />{STRINGS.navAbout[lang]}
                  </Button>
                </Link>
              </SheetClose>
              <div className="border-t border-border my-2" />
              <Authenticated>
                <div className="animate-in fade-in duration-300 flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link href="/user">
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-serif italic hover:bg-transparent hover:text-accent transition-colors"
                      >
                        <User className="mr-2 h-4 w-4" />
                        {STRINGS.navAccount[lang]}
                      </Button>
                    </Link>
                  </SheetClose>
                  <SignOutButton>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-serif italic hover:bg-transparent hover:text-accent transition-colors text-muted-foreground"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {STRINGS.authSignOut[lang]}
                    </Button>
                  </SignOutButton>
                </div>
              </Authenticated>
              <Unauthenticated>
                <div className="animate-in fade-in duration-300">
                  <SignInButton>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-serif italic hover:bg-transparent hover:text-accent transition-colors"
                    >
                      {STRINGS.authSignIn[lang]}
                    </Button>
                  </SignInButton>
                </div>
              </Unauthenticated>
              <AuthLoading>
                <div className="h-9 w-24 bg-muted/50 rounded animate-pulse" />
              </AuthLoading>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
