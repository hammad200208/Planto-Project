import React from 'react';
import Header from '../resuablecomp/Header';
import Footer from '../resuablecomp/Footer';
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP
} from 'react-icons/fa';

const Contact = () => {
  const contactDetails = [
    { icon: FaMapMarkerAlt, title: 'Address', info: '123 Plant Street, Greenville, PL 12345' },
    { icon: FaEnvelope, title: 'Email', info: 'contact@planto.example' },
    { icon: FaPhoneAlt, title: 'Phone', info: '(123) 456-7890' },
    { icon: FaClock, title: 'Business Hours', info: 'Monday - Friday: 9am - 5pm\nSaturday: 10am - 3pm' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#' },
    { icon: FaInstagram, href: '#' },
    { icon: FaTwitter, href: '#' },
    { icon: FaPinterestP, href: '#' },
  ];

  return (
    <>
      <div className="bg-[#1c261a]">
        <Header />
      </div>

      <div className="min-h-screen bg-[#1c261a]">
        <header className="bg-[#1e2619] py-6 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-white/75">Contact Us</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto py-8 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-[#2c352b] border border-[#c7c9c6] rounded-[30px] p-6 shadow-md">
              <h2 className="text-xl font-semibold text-white mb-4">Send us a message</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-[#cbcdca] mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-[#1e2619] border border-[#c7c9c6] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-300"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-[#cbcdca] mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-[#1e2619] border border-[#c7c9c6] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-300"
                    placeholder="Your email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-[#cbcdca] mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="4"
                    className="w-full bg-[#1e2619] border border-[#c7c9c6] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-300"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-transparent border border-white hover:bg-white hover:text-[#1c261a] text-white px-6 py-2 rounded-md transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-[#2c352b] border border-[#c7c9c6] rounded-[30px] p-6 shadow-md">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                {contactDetails.map(({ icon, title, info }, idx) => (
                  <div className="flex items-start" key={idx}>
                    {React.createElement(icon, { className: "text-white mt-1 mr-3 w-5 h-5" })}
                    <div>
                      <h3 className="text-white font-medium">{title}</h3>
                      {info.split('\n').map((line, i) => (
                        <p key={i} className="text-[#cbcdca]">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h3 className="text-white font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-4 text-white">
                  {socialLinks.map(({ icon, href }, idx) => (
                    <a href={href} key={idx} className="hover:text-green-300 transition-colors">
                      {React.createElement(icon, { className: "w-6 h-6" })}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
