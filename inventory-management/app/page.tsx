import Image from "next/image";
import "./globals.css";
export default function Home() {
  return (
    <>
    <header>
        <nav>
          <h1><b><i>Inventory</i></b> Manager</h1>

          <a href="#hm">Home</a>
          <a href="#about">About us</a>
          <a href="#">Contact</a>

          <a href="/login">
            <button id="lb1">Login</button>
          </a>

          <a href="/signup">
            <button id="lb2">Signup</button>
          </a>
        </nav>
      </header>
      <h1 id="hm">Home</h1>

      <img src="/home page.png" alt=" inventory management"/>

      <p>
        Say goodbye to manual tracking and hello to seamless, automated inventory control.
        Our intelligent web platform provides end-to-end visibility of your stock,
        leveraging advanced analytics to forecast demand and optimize reordering.
        Whether you're managing a single warehouse or multi-channel retail, our
        cloud-based system ensures your products are in the right place at the right time.
      </p>

      <h1 id="about">About Us</h1>
      

      <footer>
        <p>© 2026 Inventory Management</p>
      </footer>
    </>
  );
}
