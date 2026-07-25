import Link from "next/link";
import { Facebook, Instagram, Linkedin, ShieldCheck, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-icon"><ShieldCheck size={22} /></span>WheelMateDrive</div>
          <p>Verified professional drivers for the car you already love.</p>
          <div className="social-row">
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>
        <div><h3>Product</h3><Link href="/book">Book a Driver</Link><Link href="/services">Services</Link><Link href="/safety">Safety Centre</Link></div>
        <div><h3>Company</h3><Link href="/how-it-works">How It Works</Link><Link href="/register/driver">Drive with us</Link><Link href="/customer/support">Support</Link></div>
        <div><h3>Need help?</h3><a href="tel:18001234567">1800 123 4567</a><a href="mailto:support@wheelmatedrive.com">support@wheelmatedrive.com</a><span>24/7 trip support</span></div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} WheelMateDrive. Made for safer journeys across India.</div>
    </footer>
  );
}
