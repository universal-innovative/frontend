import React from "react";
import "./styles/form.css";
const ContactForm = () => {
  const submit = (formData) => {
    const data = Object.fromEntries(formData.entries());
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form className="contact-form" action={submit}>
      <label htmlFor="name">Name</label>
      <input
        required
        name="name"
        id="name"
        type="text"
        minLength="2"
        maxLength="30"
      />

      <label htmlFor="email">Email</label>
      <input required name="email" type="email" />

      <label htmlFor="phone">Phone</label>
      <input required name="phone" type="tel" pattern="[0-9]{10}" />

      <label htmlFor="message">Message</label>
      <textarea name="message" minLength="10" maxLength="200" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
