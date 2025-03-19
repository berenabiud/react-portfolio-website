import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const form = useRef();

  useEffect(() => {
    // Set the letter class animation
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('gmail', 'template_YeJhZkgb', form.current, 'your-token')
      .then(
        () => {
          alert('Message successfully sent!');
          window.location.reload(false);
        },
        () => {
          alert('Failed to send the message, please try again');
        }
      );
  };

  // Your current location coordinates
  const myLocation = [-1.286389, 36.817223]; // Replace with your actual coordinates

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I'm a passionate young developer with a love for building clean,
            functional, and user-friendly applications. I'm always excited to take
            on new challenges and collaborate on innovative projects. Whether you
            have a question, an opportunity, or just want to say hi, feel free to
            reach out!
          </p>
          <p>
            I’m currently open to <strong>freelance projects</strong>,{' '}
            <strong>internships</strong>, or <strong>junior developer roles</strong>.
            I’m particularly interested in working on projects involving{' '}
            <strong>web development</strong>, <strong>AI</strong>, or{' '}
            <strong>mobile apps</strong>. If you have an idea or a project you'd
            like to discuss, I'd love to hear about it!
          </p>
          <p>
            Don’t hesitate to drop me a message – I’m always happy to chat! You
            can also find me on{' '}
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{' '}
            or{' '}
            <a
              href="https://github.com/berenabiud"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            .
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Beren Abiud,
          <br />
          Kenya,
          <br />
          P.B.O.X, 1190 <br />
          Nairobi<br />
          <br />
          <span>berenabiud4@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={myLocation} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={myLocation}>
              <Popup>I'm here! Feel free to reach out.</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default Contact;