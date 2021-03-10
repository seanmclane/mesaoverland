import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import SEO from "../components/SEO"

interface Props {
  data: {
    site: {
      siteMetadata: {
        contact_email: string
        contact_phone: string
      }
    }
  }
}

function About(props: Props): ReactElement {
  return (
    <>
      <SEO title="About" />
      <section className="mx-auto h-80 px-6 mt-8 text-center">
        <iframe
          title="Google Maps Embed"
          width="100%"
          height="100%"
          className="max-w-screen-md"
          style={{ border: 0, margin: "auto" }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJr5JXhnFXRocRI6AXLBzC-_g&zoom=7&key=AIzaSyAauFuxptANtOMqd_VnZYgNsQdVdT0_9mA"
        ></iframe>
      </section>
      <section className="mx-auto px-6 mt-8 text-center">
        <h1 className="text-2xl mb-2 font-title">Mesa Overland</h1>
        <p className="text-lg">1020 Old 6 and 50</p>
        <p className="text-lg">Mack, CO 81525</p>
        <p className="text-lg">{props.data.site.siteMetadata.contact_email}</p>
        <p className="text-lg">{props.data.site.siteMetadata.contact_phone}</p>
      </section>
    </>
  )
}

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        contact_email
        contact_phone
      }
    }
  }
`

export default About
