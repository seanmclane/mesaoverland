import React, { ReactElement } from "react"
import { graphql, Link } from "gatsby"

interface MDNode {
  node: {
    frontmatter: {
      name: string
      slug: string
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

function Contact(props: Props): ReactElement {
  return (
    <section className="mx-auto px-6 my-2 lg:m-4">
      {props.data.allMarkdownRemark.edges.map((b) => (
        <Link
          className="no-underline text-gray-800"
          to={b.node.frontmatter.slug}
        >
          <h1 className="text-2xl mb-2">{b.node.frontmatter.name}</h1>
          <p className="text-lg">{b.node.frontmatter.date}</p>
        </Link>
      ))}
    </section>
  )
}

export const query = graphql`
  query BuildsQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          frontmatter {
            name
            date(formatString: "MMMM DD, YYYY")
            slug
          }
        }
      }
    }
  }
`

export default Contact
