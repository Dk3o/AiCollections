import React, { useState } from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Input, Textarea } from '../Components/Inputs'
import { SubmitButton } from '../Components/Buttons';

export default function Contact() {
  const contact = {
    firstName: '',
    lastName: '',
    email: '',
    description: '',
  };

  const [isSending, setIsSending] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    description: false
  });

  const handleRequestFirstName = (e) => {
    console.log(e);
  }

  const handleRequestLastName = (e) => {
    console.log(e);
  }

  const handleRequestEmail = (e) => {
    console.log(e);
  }
  const handleRequestDescription = (e) => {
    console.log(e);
  }
  return (
    <>
      <Header />
      <div className="container page">
        <form className='form'>
          <h1>Contact</h1>
          <Input
            labelName="First name"
            type="text"
            name="firstname"
            value={contact.firstName}
            onChange={handleRequestFirstName}
            error={errors.firstName}
            // touched={touched.firstName}
          />
          <Input
            labelName="Last name"
            type="text"
            name="lastname"
            value={contact.firstName}
            onChange={handleRequestLastName}
            error={errors.firstName}
            // touched={touched.firstName}
          />
          <Input
            labelName="Email"
            type="email"
            name="email"
            value={contact.firstName}
            onChange={handleRequestEmail}
            error={errors.firstName}
            // touched={touched.firstName}
          />
          <Textarea
            value={contact.description}
            onChange={handleRequestDescription}
            error={errors.description}
            // touched={touched.description}
            onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
            hasCounter={false}
          />
          <SubmitButton 
            loading={isSending}
            hasCancelBtn={false}
          />  
        </form>
      </div>
      <Footer />
    </>
  )
}
