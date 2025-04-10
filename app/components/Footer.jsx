import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const companyLinks = [
    { label: "Home Page", href: "#" },
    { label: "Collection", href: "#" },
    { label: "Categories", href: "#" },
    { label: "About us", href: "/about" },
];

const featureLinks = [
    { label: "What’s Included", href: "#" },
    { label: "How It Works", href: "#" },
    { label: "Contact", href: "/contact" },
];

const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com" },
];

const Footer = () => {
    return (
        <footer className="bg-black text-white px-6 md:px-12 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {/* Logo & Description */}
                <div>
                    <Image src="/logo.png" alt="Logo" width={120} height={60} />
                    <p className="text-sm text-gray-400 mt-4">
                        This is your one-stop destination for high-quality mobile phone spare parts. <br />
                        We offer genuine and affordable components to keep your devices running smoothly.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="font-semibold mb-3">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        {companyLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className="hover:underline">{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Feature Links */}
                <div>
                    <h4 className="font-semibold mb-3">Features</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        {featureLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className="hover:underline">{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Location Info */}
                <div>
                    <h4 className="font-semibold mb-3">Locations</h4>
                    <p className="text-sm text-gray-300 mb-2">Middlest 2 East 42nd Strearket place<br />New York, NY 10017</p>
                    <p className="text-sm text-gray-300 mb-2">+001 2454 456</p>
                    <p className="text-sm text-gray-300">logo@xyzasd.com</p>
                </div>

                {/* Social Icons */}
                <div>
                    <h4 className="font-semibold mb-3">SOCIAL</h4>
                    <div className="flex gap-4">
                        {socialLinks.map((link, index) => (
                            <Link key={index} href={link.href} target="_blank">
                                <span className="text-gray-300 hover:text-white">{link.icon}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-500 mt-10 pt-6 text-center text-sm text-gray-200">
                Copyright © 2025{" "}
                <a
                    href="#"
                    className="text-[#FF0000] hover:text-red-500 font-medium transition-colors duration-200"
                >
                    Mobile Display
                </a>
            </div>
        </footer>
    );
};

export default Footer;

