import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Rocket, Shield, Users, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.15 },
  },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 p-8 overflow-hidden relative">
      {/* Background Sparkle Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-primary/20 rounded-full blur-3xl animate-bounce"></div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-24 relative z-10"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-6xl font-extrabold text-primary drop-shadow-lg mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          About <span className="text-secondary">ChatApp</span>
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          ✨ A platform crafted to make <span className="font-bold text-primary">communication</span> 
          seamless, fun, and secure.  
          We exist to **connect hearts & minds** across the globe 💬.
        </motion.p>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-24 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div
          variants={fadeUp}
          className="p-10 rounded-3xl shadow-xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:scale-105 transition transform hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">🚀 Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To create a **borderless chat world** where conversations spark ideas, 
            and relationships grow without limitations.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="p-10 rounded-3xl shadow-xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:scale-105 transition transform hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">🌍 Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To become the **most trusted chat universe**, empowering millions
            to speak freely, securely, and creatively 🌌.
          </p>
        </motion.div>
      </motion.div>

      {/* Journey Timeline */}
      <motion.div
        className="max-w-5xl mx-auto mb-24 relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-14">
          Our Journey 📈
        </h2>
        <div className="timeline timeline-vertical">
          {[
            { year: "2022", text: "💡 Dream sparked → ChatApp was born." },
            { year: "2023", text: "🚀 First launch → 10k+ users joined us." },
            { year: "2024", text: "🔐 E2E encryption + global expansion." },
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <div
                className={`timeline-${
                  idx % 2 === 0 ? "start" : "end"
                } timeline-box bg-white/80 backdrop-blur-xl hover:scale-105 transition shadow-lg`}
              >
                <h3 className="font-bold text-lg text-secondary">{item.year}</h3>
                <p className="text-gray-700">{item.text}</p>
              </div>
              <div className="timeline-middle text-secondary text-xl">✨</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div
        className="max-w-6xl mx-auto mb-24 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-secondary mb-14">
          Our Core Values 💡
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Shield className="w-14 h-14 mx-auto text-primary mb-5" />,
              title: "Security",
              desc: "Your privacy stays guarded like a fortress.",
            },
            {
              icon: <Rocket className="w-14 h-14 mx-auto text-secondary mb-5" />,
              title: "Innovation",
              desc: "Always evolving with futuristic features 🚀.",
            },
            {
              icon: <Users className="w-14 h-14 mx-auto text-accent mb-5" />,
              title: "Community",
              desc: "Where voices unite, inspire, and grow 🌱.",
            },
          ].map((val, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-8 rounded-2xl bg-white/80 shadow-lg text-center hover:scale-110 transition hover:shadow-2xl"
            >
              {val.icon}
              <h3 className="text-2xl font-bold mb-3">{val.title}</h3>
              <p className="text-gray-600 text-lg">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        className="max-w-6xl mx-auto mb-24 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-14">
          Why Choose ChatApp? 🤔
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            "End-to-End Encryption 🔐",
            "Lightning Fast Servers ⚡",
            "24/7 Human + AI Support 🤖",
            "Seamless Cross-Platform Access 📱",
            "Flexible Free & Premium Plans 💎",
            "Customizable UI & Futuristic Themes 🎨",
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="flex items-center gap-3 p-5 bg-white/80 rounded-xl shadow hover:scale-105 transition hover:shadow-lg"
            >
              <CheckCircle className="text-secondary w-6 h-6" />
              <p className="text-gray-700 text-lg">{feature}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="max-w-6xl mx-auto mb-24 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-14">
          Meet Our Team 👨‍💻👩‍💻
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[1, 2, 3].map((id) => (
            <motion.div
              key={id}
              variants={fadeUp}
              whileHover={{ rotateY: 15, scale: 1.07 }}
              className="p-8 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg text-center cursor-pointer hover:shadow-2xl"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${id}`}
                alt="Team Member"
                className="w-28 h-28 mx-auto rounded-full border-4 border-primary mb-5 shadow-md"
              />
              <h3 className="text-2xl font-bold text-gray-800">
                {id === 1 ? "Sahil" : id === 2 ? "Aarav" : "Neha"}
              </h3>
              <p className="text-gray-600 text-lg">
                {id === 1
                  ? "Founder & Developer"
                  : id === 2
                  ? "UI/UX Designer"
                  : "Marketing Lead"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="max-w-4xl mx-auto text-center p-14 rounded-3xl shadow-2xl bg-gradient-to-r from-primary to-secondary text-white relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-4xl font-bold mb-6">
          Ready to Experience the Future of Chat? 🚀
        </h2>
        <p className="mb-8 text-lg">
          Join thousands of dreamers already shaping conversations on ChatApp today.
        </p>
        <motion.button
          className="btn bg-white text-primary px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AboutPage;
