import styles from "./home.module.css";
import Features from "@/components/features";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      {/* HOME / HERO SECTION */}
      <section id="home" className={`${styles.section} ${styles.heroSection}`}>
        <h1 className={`${styles.title} ${styles.whiteText}`}>Inventory Management System</h1>
        <p style={{ color: '#383a3d' }}>Streamline your stock, optimize your business.</p>
        <img src="/home page.png" alt="Inventory dashboard" className={styles.heroImg} />
        <p className={styles.description} style={{ color: '#1e252e' }}>
          Say goodbye to manual tracking. Our intelligent platform provides end-to-end 
          visibility of your stock, demand forecasting, and optimized reordering.
        </p>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className={styles.section}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.description}>
          We are dedicated to helping businesses grow by providing a robust, 
          real-time solution for tracking inventory movements. Whether you are 
          managing a small shop or a large warehouse, our system scales with you.
        </p>
        <img src="/about.jpg" alt="Inventory dashboard" className={styles.heroImg} />
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className={styles.section}>
        <h1 className={styles.title}>System Features</h1>
        <div style={{ width: '100%' }}>
          <Features /> 
          <img src="/feature.png" alt="Inventory dashboard" className={styles.heroImg} />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={styles.section}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.description}>
          Have questions or need a custom setup? Reach out to our support team.
        </p>

        <div className={styles.contactContainer}>
          <form className={styles.contactForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="email@example.com" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={4} placeholder="How can we help you?" required></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </form>

          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <strong>Email:</strong>
              <p>support@inventory.com</p>
            </div>
            <div className={styles.infoCard}>
              <strong>Support Hours:</strong>
              <p>Mon - Fri, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Inventory Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}