import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  services: [
    { name: "SEO Services", href: "/services#seo" },
    { name: "Social Media Marketing", href: "/services#smm" },
    { name: "Meta Ads", href: "/services#meta" },
    { name: "Google Ads", href: "/services#google" },
    { name: "Web Development", href: "/services#web" },
    { name: "Content Marketing", href: "/services#content" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-4 md:space-y-6">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Attur Media Crew" className="h-12 md:h-14 w-auto brightness-0 invert" />
            </Link>
            <p className="text-secondary-foreground/70 text-xs md:text-sm leading-relaxed">
              Elevating brands through strategic digital marketing. We combine creativity with data-driven strategies to deliver exceptional results.
            </p>
            <div className="flex gap-3 md:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Services</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-xs md:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Company</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-xs md:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Contact Us</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 md:gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-secondary-foreground/70 text-xs md:text-sm">
                  Attur, Salem District, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-secondary-foreground/70 hover:text-primary transition-colors text-xs md:text-sm">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                <a href="mailto:hello@atturmediacrew.com" className="text-secondary-foreground/70 hover:text-primary transition-colors text-xs md:text-sm break-all">
                  hello@atturmediacrew.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-secondary-foreground/60 text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Attur Media Crew. All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6">
              <Link to="/privacy" className="text-secondary-foreground/60 hover:text-primary text-xs md:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-secondary-foreground/60 hover:text-primary text-xs md:text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
