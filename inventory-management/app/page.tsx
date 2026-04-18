"use client";

import { useState } from "react";
import styles from "./home.module.css";
import Features from "@/components/features";

export default function Home() {

  // ✅ MOVE HERE (inside component)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender: form.name,
        email: form.email,
        content: form.message,
        date: new Date().toISOString().split("T")[0]
      })
    });

    if (res.ok) {
      alert("Message sent ✅");
      setForm({ name: "", email: "", message: "" });
    }
  };


  return (
    <div className={styles.mainContainer}>
    
      <section id="home" className={`${styles.section} ${styles.heroSection}`}>
        <h1 className={`${styles.title} ${styles.whiteText}`}>Inventory Management System</h1>
        <p style={{ color: '#ffffff', fontFamily:"emoji",fontSize:"20px" }}>Streamline your stock, optimize your business.</p>
        <img src="/home page.png" alt="Inventory dashboard" className={styles.heroImg} />
        <p className={styles.description} style={{ color: '#ffffff' ,fontFamily:"emoji",fontSize:"20px"}}>
          Say goodbye to manual tracking. Our intelligent platform provides end-to-end 
          visibility of your stock, demand forecasting, and optimized reordering.
        </p>
        <a href="/login" className={styles.ctaBtn}>
          Get Started 
        </a>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className={styles.section} >
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.description }style={{ fontFamily:"emoji",fontSize:"20px"}} >
          We are dedicated to helping businesses grow by providing a robust, 
          real-time solution for tracking inventory movements. Whether you are 
          managing a small shop or a large warehouse, our system scales with you.
        </p>
        <img src="/about.jpg" alt="Inventory dashboard" className={styles.heroImg} />
        <div className={styles.statsSection}>
  <div className={styles.div1} >
    <h2>100+</h2>
    <p>Products Managed</p>
  </div>
  <div className={styles.div2}>
    <h2>50+</h2>
    <p>Orders Processed</p>
  </div>
  <div className={styles.div3}>
    <h2>10+</h2>
    <p>Suppliers</p>
  </div>
</div>

      </section>

      {/* FEATURES SECTION */}
      <section id="features" className={styles.section} style={{}}>
        <h1 className={styles.title}>System Features</h1>
        <div style={{ width: '100%',fontFamily:"emoji",fontSize:"20px"}}>
          <Features /> 
          <img src="/feature.png" alt="Inventory dashboard" className={styles.heroImg2} />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={styles.section}>
        <h1 className={styles.title}>Contact Us</h1>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>

        </form>
      
          <div className={styles.contactInfo}>
            <div className={styles.infoCard1}>
              <strong>Email:</strong>
              <p>admin@gmail.com</p>
            </div>
            <div className={styles.infoCard2}>
              <strong>Support Hours:</strong>
              <p>Mon - Fri, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Inventory Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}