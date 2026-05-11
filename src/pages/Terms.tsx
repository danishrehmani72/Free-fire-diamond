import React from "react";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-black mb-12 tracking-tighter uppercase italic text-center">Terms of <span className="text-neon-blue">Service</span></h1>
      
      <div className="glass-card p-10 md:p-16 rounded-[40px] border-white/5 space-y-10 prose prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-blue mr-2">01.</span> Acceptance of Terms</h2>
          <p className="text-white/60 leading-relaxed">
            By accessing and using Diamond Rush ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-blue mr-2">02.</span> Product Delivery</h2>
          <p className="text-white/60 leading-relaxed">
            Diamond Rush provides digital gaming top-up services. Once a transaction is confirmed, diamonds are sent to the Player ID provided by the user. Most deliveries take seconds, but some may take up to 24 hours under extreme circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-blue mr-2">03.</span> User Accuracy</h2>
          <p className="text-white/60 leading-relaxed italic border-l-2 border-neon-blue pl-6 py-2">
            It is the user's absolute responsibility to provide the correct Player ID (UID). Diamond Rush is not responsible for diamonds sent to incorrect accounts due to user error. No refunds will be issued for such cases.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-blue mr-2">04.</span> Refunds and Cancellations</h2>
          <p className="text-white/60 leading-relaxed">
            Due to the digital nature of the products, all sales are final. Refunds are only considered if the service fails to deliver the product within 48 hours and the error is on our side.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group"><span className="text-neon-blue mr-2">05.</span> Account Safety</h2>
          <p className="text-white/60 leading-relaxed">
            We use official APIs to ensure your Free Fire account remains safe. However, using our service signifies that you understand and accept any risks associated with third-party top-ups.
          </p>
        </section>
      </div>
      
      <p className="mt-12 text-center text-[10px] text-white/30 uppercase tracking-[0.3em]">Last Updated: May 11, 2026</p>
    </div>
  );
}
