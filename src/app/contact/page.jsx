'use client'

import React from 'react'
import HeroSection from './components/HeroSection'
import ContactForm from './components/ContactForm'
import SupportSection from './components/Support'

function Contact() {
  return (
    <section>
      <HeroSection/>
      <ContactForm/>
      <SupportSection/>
    </section>
  )
}

export default Contact