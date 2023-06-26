import { Link } from "gatsby"
import React from "react"
import SEO from "../components/SEO"

const FourOhFour = () => (
  <>
    <SEO title="Thank You" description="Thank you for your form submission" />
    <section className="mx-auto px-6 mt-8 max-w-screen-lg mb-8">
      <h2>Thank You</h2>
      <p>
        We've got your info! Let's take you back <Link to="/">home</Link>
      </p>
    </section>
  </>
)

export default FourOhFour
