export const metadata = {
  title: 'Contact Spirit Numeral - Connect with Our Spiritual Experts',
  description: 'Have a question about an angel number or your life path? Contact the Spirit Numeral team for guidance.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
          Connect With Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-zinc-400 text-lg mb-8">
              The universe has a way of bringing people together. Whether you have a question about a specific number, want to share your experience, or have business inquiries, we're here to listen.
            </p>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-amber-500 font-bold mb-2">Email Us</h3>
                <p className="text-zinc-300">guidance@spiritnumeral.com</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-amber-500 font-bold mb-2">Response Time</h3>
                <p className="text-zinc-300">We typically respond within 24-48 spiritual hours.</p>
              </div>
            </div>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Your Name</label>
              <input 
                type="text" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="How can we help you on your path?"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold py-4 rounded-xl hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/10"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
