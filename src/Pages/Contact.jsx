import React, { useState } from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FormInput, Textarea } from '../Components/Inputs'
import { SubmitButton } from '../Components/Buttons';
import SuccessMessage from '../Components/SuccessMessage';

export default function Contact() {
  const initialContactState = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  const [contact, setContact] = useState(initialContactState);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  });

  const handleRequestFirstName = (e) => {
    const value = e.target.value;
    setContact(prev => ({ ...prev, firstName: value }));
    if (touched.firstName) {
      setErrors(prev => ({ ...prev, firstName: value.trim() === '' }));
    }
  }

  const handleRequestLastName = (e) => {
    const value = e.target.value;
    setContact(prev => ({ ...prev, lastName: value }));
    if (touched.lastName) {
      setErrors(prev => ({ ...prev, lastName: value.trim() === '' }));
    }
  }

  const handleRequestEmail = (e) => {
    const value = e.target.value;
    setContact(prev => ({ ...prev, email: value }));
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: value.trim() === '' }));
    }
  }
  const handleRequestMessage = (e) => {
    const value = e.target.value;
    setContact(prev => ({ ...prev, message: value }));
    if (touched.message) {
      setErrors(prev => ({ ...prev, message: value.trim() === '' }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: contact.firstName.trim() === '',
      lastName: contact.lastName.trim() === '',
      email: contact.email.trim() === '',
      message: contact.message.trim() === '',
    };

    setErrors(newErrors);
    setTouched({ 
      firstName: true, 
      lastName: true, 
      email: true,
      message: true,
     });

    if (Object.values(newErrors).some(Boolean)) return;

    setIsSending(true);
    setIsSent(false);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setContact(initialContactState);
      setTouched({ 
        firstName: false, 
        lastName: false, 
        email: false,
        message: false,
      });
      setErrors({ 
        firstName: false, 
        lastName: false, 
        email: false,
        message: false,
       });
    }, 1500);
  };

  return (
    <>
      <Header />
        <div className="container page">
          <form onSubmit={handleSubmit} className="form">
            <h1>Contact</h1>
            <FormInput
              labelName="First name"
              type="text"
              name="firstname"
              value={contact.firstName}
              onChange={handleRequestFirstName}
              error={errors.firstName}
              touched={touched.firstName}
              onBlur={() => setTouched(prev => ({ ...prev, firstName: true }))}
            />
            <FormInput
              labelName="Last name"
              type="text"
              name="lastname"
              value={contact.lastName}
              onChange={handleRequestLastName}
              error={errors.lastName}
              touched={touched.lastName}
              onBlur={() => setTouched(prev => ({ ...prev, lastName: true }))}
            />
            <FormInput
              labelName="Email"
              type="email"
              name="email"
              value={contact.email}
              onChange={handleRequestEmail}
              error={errors.email}
              touched={touched.email}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            />
            <Textarea
              labelName="Message"
              name='message'
              value={contact.message}
              onChange={handleRequestMessage}
              error={errors.message}
              touched={touched.message}
              onBlur={() => setTouched(prev => ({ ...prev, message: true }))}
              hasCounter={false}
            />
            <SubmitButton 
              loading={isSending}
            />  
            {isSent && 
              <SuccessMessage 
                successMessage="Thank you for contacting us! We'll get back to you shortly."
              />
            }
          </form>

        </div>
      <Footer />
    </>
  )
}
