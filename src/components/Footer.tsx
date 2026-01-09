import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-amber-500">Rain Forest Royal Heritage Cabin</h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Experience the ultimate comfort and hospitality. Amche rooms tumhala ek prashant ani shant anubhav denyasathi design kele ahet.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-neutral-400 text-sm">
            <li><a href="#" className="hover:text-amber-500 transition-colors">Home</a></li>
            <li><a href="http://localhost:5173/About" className="hover:text-amber-500 transition-colors">About</a></li>
            <li><a href="http://localhost:5173/contact" className="hover:text-amber-500 transition-colors">Book</a></li>
            <li><a href="http://localhost:5173/Dashboard" className="hover:text-amber-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-neutral-400 text-sm">
            <li className="flex items-center gap-3">
              <span>📍</span> 123 Beach Road, Colombo, Sri Lanka
            </li>
            <li className="flex items-center gap-3">
              <span>📞</span> +94 11 234 5678
            </li>
            <li className="flex items-center gap-3">
              <span>✉️</span> info@luxurystay.com
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
          <p className="text-neutral-400 text-sm mb-4">Subscribe kara amche latest offers milvanyasathi.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-neutral-900 border border-white/10 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-amber-500"
            />
            <button className="bg-amber-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors">
              Go
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-xs">
        <p>© 2024 Luxury Stay Hotel. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;