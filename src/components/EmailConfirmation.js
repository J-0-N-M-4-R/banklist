import React from 'react';
import './email-confirmation.css'; // Import the CSS

function EmailConfirmation() {
  return (
    <div className="email-confirmation-container">
      <div className="email-confirmation-box">
        <img src="/assets/Banklist-email.png" alt="Email Confirmation" className="email-image" />
        <h2>Email Confirmation Sent</h2>
        <p>
          Please check your email and click the link to activate your account.
          You may need to check your junkmail.
        </p>
      </div>
    </div>
  );
}

export default EmailConfirmation;