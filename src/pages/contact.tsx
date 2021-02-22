import React, { ReactElement } from "react"
import { graphql } from "gatsby"

interface Props {
  data: {
    site: {
      siteMetadata: {
        contact_email: string
      }
    }
  }
}

function Contact(props: Props): ReactElement {
  return (
    <section className="mx-auto px-6 my-2 lg:m-4 text-center">
      <h1 className="text-2xl mb-2">Mesa Overland</h1>
      <p className="text-lg">1020 Old 6 and 50</p>
      <p className="text-lg">Mesa, CO 81525</p>
      <p className="text-lg">{props.data.site.siteMetadata.contact_email}</p>
    </section>
  )
}

export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        contact_email
      }
    }
  }
`

export default Contact
