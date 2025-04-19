import React, { useState } from "react";
import { db } from "../FireBase"
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ContactSection = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      if (!message.trim()) {
        throw new Error("Message cannot be empty");
      }

      const feedbackRef = collection(db, "feedback");
      await addDoc(feedbackRef, {
        userId: user.uid,
        email: user.email,
        message: message.trim(),
        createdAt: new Date(),
      });

      setMessage("");
      setSubmitStatus({ success: true, message: "Feedback submitted successfully!" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus({ success: false, message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="d-flex align-content-center overflow-hidden"
      id="contact"
      style={{
        backgroundImage: `url("/assets/image/logine page.jpg")`,
        backgroundSize: "cover",
        height:"100vh",
        marginBottom:"100pxs"
      }}
    >
      <div className="container">
        <div className="box ps-5 overflow-hidden">
          <img src="assets/img/shape.png" className="square" alt="" />
          <div className="form">
            <div className="contact-info">
              <h3 className="title">Let's get in touch</h3>
              <p className="text">
                we provide best customer service and support, our motive is to make this world healthy
              </p>

              <div className="info">
                <div className="information">
                  <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;
                  <p>403,faizan apt,variaoli,rander,surat,gujrat,india 
                    395005
                  </p>
                </div>
                <div className="information">
                  <i className="fas fa-envelope"></i>&nbsp;&nbsp;
                  <p>ammar15102004@gmail.com</p>
                </div>
                <div className="information">
                  <i className="fas fa-phone"></i>&nbsp;&nbsp;
                  <p>+91-9898326125</p>
                </div>
              </div>

              <div className="social-media">
                <p>Connect with us :</p>
                <div className="social-icons">
                  <a href="https://www.facebook.com/help/668969529866328/"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://x.com/"><i className="fab fa-twitter"></i></a>
                  <a href="https://www.instagram.com/ammar_3040/"><i className="fab fa-instagram"></i></a>
                  <a href="https://www.linkedin.com/login"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <span className="circle one"></span>
              <span className="circle two"></span>

              <form onSubmit={handleSubmit} autoComplete="off">
                <h3 className="title">Send us Feedback</h3>

                {submitStatus && (
                  <div className={`alert ${submitStatus.success ? "alert-success" : "alert-danger"}`}>
                    {submitStatus.message}
                  </div>
                )}

                <div className="input-container textarea"   >
                  <textarea 
                    name="message" 
                    className="input" 
                    rows={10} 

                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
              

                </div>
                <button 
                  type="submit" 
                  className="btn" 
                  disabled={isSubmitting || !message.trim()}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;