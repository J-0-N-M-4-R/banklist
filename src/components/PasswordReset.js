import React from 'react';
import './email-confirmation.css'; // Reusing the same CSS

function PasswordReset() {
  return (
    <div className="email-confirmation-container">
      <div className="email-confirmation-box">
        <img src="/assets/Banklist-lock.png" alt="Password Reset" className="email-image" />
        <h2>Password Reset Sent</h2>
        <p>
          Please check your email for the password reset link. You may need to check your junkmail.
        </p>
      </div>
    </div>
  );
}

export default PasswordReset;