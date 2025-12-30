import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/NavBar';
import heroImage from '../assets/photos/image2.jpeg'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log('Form Submitted:', formData);
  alert('Your message has been sent successfully. Thank you!');
};

  return (
    <>
    <div className="bg-gray-50 min-h-screen ">
        <Header />
            {/* Hero Section */}
            <section className="bg-blue-600 relative py-38 text-white text-center bg-cover bg-center "
                style={{backgroundImage:`url(${heroImage})`}}
            >
                {/* overlay (optional) */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-lg opacity-90">
                    If you have any questions or would like to know more about our services,
                    please contact us using the form below or reach us directly via phone or email.
                </p>
                </div>
            </section>

            
      <div className="max-w-6xl mx-auto px-4 py-15">

        {/* Header */}
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4 border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone Number</h3>
                <p className="text-gray-600">+94 11 123 4567</p>
                <p className="text-gray-600">+94 77 123 4567</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4 border border-gray-100">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Address</h3>
                <p className="text-gray-600">info@example.com</p>
                <p className="text-gray-600">support@example.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4 border border-gray-100">
              <div className="bg-red-100 p-3 rounded-lg text-red-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">
                  No. 123, Galle Road,<br />
                  Colombo 03, Sri Lanka.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is your inquiry about?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;
