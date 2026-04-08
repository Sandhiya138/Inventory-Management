import styles from "./home.module.css";
import Features from "./components/features";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      {/* HOME / HERO SECTION */}
      <section id="home" className={`${styles.section} ${styles.heroSection}`}>
        <h1 className={`${styles.title} ${styles.whiteText}`}>Inventory Management System</h1>
        <p style={{ color: '#383a3d' }}>Streamline your stock, optimize your business.</p>
        <img src="/home page.png" alt="Inventory dashboard" className={styles.heroImg} />
        <p className={styles.description} style={{ color: '#94a3b8' }}>
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
          Have questions or need a custom setup? Reach out to our support team.<br />
          <strong>Email:</strong> support@inventory.com
        </p>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Inventory Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}