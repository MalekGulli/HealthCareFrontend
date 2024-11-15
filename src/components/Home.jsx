import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../styles/Booking.css";

// Main container for the Home page
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: url("../assets/healthcare.png");
  color: #333;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
  justify-content: space-between; /* Fördelar innehåll jämnt */
`;

// Shared styles
const Section = styled.section`
  width: 90%;
  max-width: 600px;
  margin: 40px 0;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const SectionText = styled.p`
  font-size: 1.1em;
  color: #555;
  line-height: 1.6;
`;

const AboutSection = styled(Section)``;

const ContactSection = styled(Section)``;

const AppointmentSection = styled(Section)``;

const AppointmentButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #057d7a;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2fadaa;
  }
`;

// Data Privacy Section
const PrivacySection = styled(Section)``;

// Testimonials Section
const TestimonialsSection = styled(Section)``;

const TestimonialList = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const TestimonialCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
  text-align: left;
  color: #333;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TestimonialText = styled.p`
  font-size: 1em;
  color: #666;
  font-style: italic;
  line-height: 1.5;
`;

const TestimonialAuthor = styled.p`
  font-size: 0.9em;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

// Home Page Component
const Home = () => (
  <HomeContainer>
    {/* About Us Section */}
    <AboutSection>
      <SectionTitle>About Us</SectionTitle>
      <SectionText>
        Welcome to Health Care, where we are committed to delivering the highest
        standard of medical care for our patients. Our experienced team is
        dedicated to providing compassionate and personalized care tailored to
        each individual's needs.
      </SectionText>
    </AboutSection>

    {/* Contact Section */}
    <ContactSection>
      <SectionTitle>Contact</SectionTitle>
      <SectionText>
        Get in touch with us at any time for assistance with bookings or for
        general inquiries. Reach out by phone at <strong>+123-456-7890</strong>{" "}
        or email us at <strong>hello@healthcare.com</strong>.
      </SectionText>
    </ContactSection>

    {/* Appointment Booking Section */}
    <AppointmentSection>
      <SectionTitle>Appointment Booking</SectionTitle>
      <SectionText>
        Book appointments seamlessly through our online system, with no need to
        wait in phone queues. Explore our caregivers' availability and find a
        time that suits you, all from the convenience of your device.
      </SectionText>
      <AppointmentButton to="/appointments">Book Now</AppointmentButton>
    </AppointmentSection>

    {/* Data Privacy Section */}
    <PrivacySection>
      <SectionTitle>Data Privacy</SectionTitle>
      <SectionText>
        We value your privacy and are dedicated to safeguarding your personal
        health information. Our system is built to comply with the highest
        standards of data protection to ensure your information remains secure
        and confidential.
      </SectionText>
    </PrivacySection>

    {/* Testimonials Section */}
    <TestimonialsSection>
      <SectionTitle>Patient Reviews</SectionTitle>
      <TestimonialList>
        <TestimonialCard>
          <TestimonialText>
            "Booking an appointment was so easy and convenient. Health Care
            truly respects my time and needds."
          </TestimonialText>
          <TestimonialAuthor>- Malek G.</TestimonialAuthor>
        </TestimonialCard>
        <TestimonialCard>
          <TestimonialText>
            "I love the secure online portal. I feel confident that my
            information is in safe hands."
          </TestimonialText>
          <TestimonialAuthor>- Abou C.</TestimonialAuthor>
        </TestimonialCard>
      </TestimonialList>
    </TestimonialsSection>
  </HomeContainer>
);

export default Home;
