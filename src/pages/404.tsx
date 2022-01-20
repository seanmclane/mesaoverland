import { Link } from "gatsby"
import React from "react"
import SEO from "../components/SEO"

const FourOhFour = () => (
  <>
    <SEO title="404 Page Not Found" description="Hmm, there's nothing here" />
    <section className="mx-auto px-6 mt-8 max-w-screen-lg mb-8">
      <h2>Page not found</h2>
      <p>
        Hmm, there's nothing here. Let's try going{" "}
        <Link to="/" className="underline">
          home
        </Link>
      </p>
    </section>
  </>
)

export default FourOhFour
