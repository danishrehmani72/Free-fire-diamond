import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-black mb-12 tracking-tighter uppercase italic text-center">Privacy <span className="text-neon-purple">Policy</span></h1>
      
      <div className="glass-card p-10 md:p-16 rounded-[40px] border-white/5 space-y-10 prose prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-purple mr-2">A.</span> Data Collection</h2>
          <p className="text-white/60 leading-relaxed">
            We collect minimal data required to process your order: Player ID, email address (for account holders), and transaction logs. We do NOT store payment details like credit card numbers; these are handled directly by secure payment gateways.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-purple mr-2">B.</span> Purpose of Use</h2>
          <p className="text-white/60 leading-relaxed">
            Your data is used solely for order processing, account management, and providing customer support. We may occasionally send promotional emails if you have opted-in to our newsletter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-purple mr-2">C.</span> Security Protocols</h2>
          <p className="text-white/60 leading-relaxed italic border-l-2 border-neon-purple pl-6 py-2">
            We use industry-standard encryption (SSL/TLS) to protect your data during transmission. Access to our database is strictly restricted to authorized security personnel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-purple mr-2">D.</span> Third-Party Disclosure</h2>
          <p className="text-white/60 leading-relaxed">
            We do not sell, trade, or rent your personal data to third parties. Data is only shared with our official top-up partners (like Garena) to fulfill your diamond purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-purple mr-2">E.</span> Cookies</h2>
          <p className="text-white/60 leading-relaxed">
            We use small cookies to remember your login session and enhance your browsing experience. You can disable cookies in your browser settings if you wish.
          </p>
        </section>
      </div>
      
      <p className="mt-12 text-center text-[10px] text-white/30 uppercase tracking-[0.3em]">Last Updated: May 11, 2026</p>
    </div>
  );
}
