import React from 'react';
import { BarChart3, BellRing, PackageSearch, ShieldCheck } from "lucide-react";
import styles from './features.module.css';

const Features = () => {
  const featureList = [
    {
      title: "Real-time Tracking",
      desc: "Monitor stock levels across multiple locations instantly.",
      icon: <PackageSearch size={40} />,
    },
    {
      title: "Advanced Analytics",
      desc: "Generate detailed reports on sales trends and movements.",
      icon: <BarChart3 size={40} />,
    },
    {
      title: "Smart Alerts",
      desc: "Get notified immediately when stock hits critical levels.",
      icon: <BellRing size={40} />,
    },
    {
      title: "Role-Based Security",
      desc: "Secure access for Admins, Staff, and Viewers.",
      icon: <ShieldCheck size={40} />,
    },
  ];

  return (
    <div className={styles.grid}>
      {featureList.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.icon}>{item.icon}</div>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardDesc}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;