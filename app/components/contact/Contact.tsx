'use client'

export function Contact() {
  return (
    <section id="contact" className="py-12 md:py-16 text-center">
      <div className="mb-16">
        <h2 className="font-heading text-3xl md:text-4xl mb-6">Let's Build Something Great</h2>
        <a
          href="mailto:codesbyasif@gmail.com"
          className="text-2xl md:text-4xl text-gray-400 hover:text-white transition-colors duration-300 block my-6"
          data-magnetic
        >
          codesbyasif@gmail.com
        </a>
        <p className="text-base text-gray-400">Available for freelance & contract roles.</p>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href="https://github.com/asifrazapk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-xl transition-all duration-200 hover:bg-white hover:text-black"
            data-magnetic
            aria-label="GitHub Profile"
          >
            <i className="ph ph-github-logo"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/dev-asifraza"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white text-2xl transition-all duration-200 hover:bg-white hover:text-black"
            data-magnetic
            aria-label="LinkedIn Profile"
          >
            <i className="ph ph-linkedin-logo"></i>
          </a>
          <a
            href="https://x.com/Dev_AsifRaza"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white text-2xl transition-all duration-200 hover:bg-white hover:text-black"
            data-magnetic
            aria-label="X Profile"
          >
            <i className="ph ph-x-logo"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white text-2xl transition-all duration-200 hover:bg-white hover:text-black"
            data-magnetic
            aria-label="Instagram Profile"
          >
            <i className="ph ph-instagram-logo"></i>
          </a>
        </div>
      </div>
    </section>
  )
}
