import { Link } from "gatsby"
import React from "react"
import SEO from "../components/SEO"

const ThankYou = () => (
  <>
    <SEO title="Thank You" description="Thank you for your form submission" />
    <section className="mx-auto px-6 mt-8 max-w-screen-lg mb-8">
      <h2>Thank You!</h2>
      <p className="text-lg">
        We've got your info! Maybe you should check out:
      </p>
      <h4>
        <Link to="/faq">FAQs</Link>
      </h4>
      <a href="https://www.instagram.com/mesaoverland/">
        <h4>Instagram</h4>
      </a>
      <a href="https://www.facebook.com/mesaoverland/">
        <h4>Facebook</h4>
      </a>
      <a href="https://www.youtube.com/channel/UCD4XzcEwC4fL9UzwMZwC2Hg">
        <h4>YouTube</h4>
      </a>
    </section>
  </>
)

export default ThankYou
