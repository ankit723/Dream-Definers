"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    // Only track scroll on home page
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const publicNavLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/courses", label: "Courses" },
    { href: "/services", label: "Services" },
    { href: "/our-founders", label: "Our Founders" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const adminNavLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/blogs", label: "Blogs" },
    { href: "/admin/blogs/new", label: "New Blog" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/admins", label: "Admins" },
    { href: "/admin/contact-results", label: "Contact Results" },
    { href: "/admin/consultancy-results", label: "Consultancy Results" },
  ];

  const navLinks = isAdminRoute && isAuthenticated ? adminNavLinks : publicNavLinks;

  const isTransparent = isHomePage && !isScrolled;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "w-full py-3 sm:py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors rounded-lg">
            <Image 
              src="/assets/common/logo.png" 
              alt="Logo" 
              width={45} 
              height={45}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 xl:px-4 py-2 rounded-md text-sm xl:text-base font-medium transition-all duration-200",
                      isActive
                        ? "text-primary bg-accent"
                        : isTransparent
                        ? "text-white hover:text-white/80 hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop CTA Button */}
        {!isAdminRoute && (
          <div className="hidden lg:block">
            <Button asChild size="default" className="text-xs xl:text-sm">
              <Link href="/free-consultancy">Get Free Consultancy</Link>
            </Button>
          </div>
        )}
        {isAdminRoute && isAuthenticated && (
          <div className="hidden lg:block">
            <Button asChild variant="outline" size="default" className="text-xs xl:text-sm">
              <Link href="/">View Site</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className={cn(
            "lg:hidden p-2 rounded-md transition-all duration-200",
            isTransparent
              ? "text-white hover:bg-white/10"
              : "text-foreground hover:bg-accent/50"
          )}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden top-[60px] sm:top-[64px]"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-[60px] sm:top-[64px] left-0 right-0 bg-white/98 backdrop-blur-md border-b border-border shadow-lg z-40 lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className={cn(
                      "block px-4 py-3 rounded-md text-base font-medium transition-all duration-200",
                      isActive
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Mobile CTA Button */}
          {!isAdminRoute && (
            <div className="mt-4 pt-4 border-t border-border">
              <Button asChild size="default" className="w-full text-base">
                <Link href="/free-consultancy" onClick={toggleMobileMenu}>
                  Get Free Consultancy
                </Link>
              </Button>
            </div>
          )}
          {isAdminRoute && isAuthenticated && (
            <div className="mt-4 pt-4 border-t border-border">
              <Button asChild variant="outline" size="default" className="w-full text-base">
                <Link href="/" onClick={toggleMobileMenu}>
                  View Site
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};