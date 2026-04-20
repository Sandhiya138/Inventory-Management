"use client";
import { useState, useEffect } from "react";
import styles from "./messages.module.css";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
        const data = await res.json();
        setMessages(data.reverse());
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });

      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, isRead: true } : msg
      ));
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${id}`, { method: "DELETE" });
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  if (loading) return <div className={styles.loading}>Opening Admin Inbox...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customer Inquiries</h1>
      <p className={styles.subtitle}>Direct messages from your landing page contact form.</p>

      <div className={styles.messageList}>
        {messages.length === 0 ? (
          <div className={styles.emptyCard}>
            <p>No new messages at the moment. 📭</p>
          </div>
        ) : (
          messages.map((msg) => (
            /* We combine the styles here: messageCard + unread/read */
            <div 
              key={msg.id} 
              className={`${styles.messageCard} ${msg.isRead ? styles.read : styles.unread}`}
            >
              <div className={styles.cardHeader}>
                <div>
                  <h4 className={styles.senderName}>
                    {msg.sender} {!msg.isRead && <span className={styles.newBadge}>NEW</span>}
                  </h4>
                  <span className={styles.emailText}>{msg.email}</span>
                </div>
                <span className={styles.dateText}>{msg.date}</span>
              </div>
              
              <div className={styles.contentArea}>
                <p className={styles.messageContent}>{msg.content}</p>
              </div>

              <div className={styles.cardActions}>
                <a href={`mailto:${msg.email}`} className={styles.replyBtn}>
                  Reply via Email
                </a>

                {!msg.isRead && (
                  <button onClick={() => markAsRead(msg.id)} className={styles.readBtn}>
                    Mark as Read
                  </button>
                )}

                <button onClick={() => deleteMessage(msg.id)} className={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}