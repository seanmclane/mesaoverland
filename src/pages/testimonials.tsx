import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import SEO from "../components/SEO"

interface MDNode {
  node: {
    html: string
    frontmatter: {
      title: string
      author: string
      date: string
    }
  }
}

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<MDNode>
    }
  }
}

function Testimonials(props: Props): ReactElement {
  return (
    <>
      <SEO title="Testimonials" />
      <section className="mx-auto px-6 mt-8 max-w-screen-md mb-8">
        {props.data.allMarkdownRemark.edges.map((b) => (
          <div
            key={`${b.node.frontmatter.author}_${b.node.frontmatter.title}`}
            className=""
          >
            <h1 className="mt-8 mb-4 text-3xl font-title uppercase">
              {b.node.frontmatter.title}
            </h1>
            <h2 className="text-md mb-2">{b.node.frontmatter.author}</h2>
            <h2 className="text-sm text-mesa">{b.node.frontmatter.date}</h2>
            <div dangerouslySetInnerHTML={{ __html: b.node.html }} />
          </div>
        ))}
      </section>
    </>
  )
}

export const query = graphql`
  query TestimonialsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/testimonial/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            author
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default Testimonials
