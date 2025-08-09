import React, { useState } from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import styles from "../styles/components/Newsletter.module.scss"
import { FormInput } from "../Components/Inputs"
import { SubmitButton } from "../Components/Buttons"
import SuccessMessage from '../Components/SuccessMessage';

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleNewsletter = (e) => {
    setEmail(e.target.value);
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (email.trim() === '') return;

  setIsSending(true);
  setIsSent(false);

  setTimeout(() => {
    setIsSending(false);
    setIsSent(true);
    setEmail("");
  }, 1500);
};

  return (
    <>
      <Header/>
      <h1>Newsletter</h1>
      <div className={`${styles.container} page`}>
        <p>
          Nisi aliquip minim voluptate enim enim exercitation aliqua. Magna consequat culpa proident tempor aute nostrud deserunt aute aliquip et nostrud. Proident laboris fugiat sit sunt eiusmod veniam id dolore. Eiusmod excepteur Lorem do laborum consectetur tempor veniam proident deserunt duis tempor cupidatat sint nulla.
        </p>
        <p>
          Enim Lorem nostrud proident ea. Ipsum labore do nulla occaecat proident aliqua exercitation officia voluptate non. Eiusmod proident culpa incididunt irure qui ullamco cillum et officia Lorem reprehenderit. Ipsum excepteur dolor mollit Lorem ad ipsum reprehenderit Lorem nulla.
        </p>
        <div className={styles.newsletterBox}>
          <h2>Stay Ahead with AI</h2>
          <p>Join 5,000+ subscribers getting the latest AI tools, use cases, and productivity hacks — once a week, no spam.</p>

          <form
          //  action="#" method="POST"
          onSubmit={handleSubmit} className="form"
           >
            <FormInput
              type="email"
              name="newsletter"
              value={email}
              onChange={handleNewsletter}
              placeholder="Email address"
              required={true}
            />
            <SubmitButton 
              loading={isSending}
            />
          </form>

          <p className={styles.trustText}>🔒 No spam. Unsubscribe anytime.</p>

          <div className={styles.previousBox}>
            <strong>🎯 What to expect:</strong>
            <ul>
              <li>Top 5 new AI tools each week</li>
              <li>Productivity & prompt engineering tips</li>
              <li>Short, scannable updates</li>
            </ul>
          </div>
        </div>
        {isSent && 
          <SuccessMessage 
            successMessage="Thanks for subscribing!"
          />
        }
      </div>
      <Footer />
    </>
  );
}
