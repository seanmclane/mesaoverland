import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import ImageCard from "../components/ImageCard"
import SEO from "../components/SEO"

interface MDNode {
  node: {
    frontmatter: {
      name: string
      slug: string
      date: string
      image?: {
        childImageSharp?: {
          fixed: any
        }
      }
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

function Build(props: Props): ReactElement {
  return (
    <>
      <SEO title="Builds" />
      <section className="mx-auto px-6 my-2 lg:m-4">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {props.data.allMarkdownRemark.edges.map((b) => (
            <div
              key={b.node.frontmatter.slug}
              className="my-4 px-4 w-full md:w-1/2 lg:w-1/3"
            >
              <ImageCard
                title={b.node.frontmatter.name}
                date={b.node.frontmatter.date}
                image={b.node.frontmatter.image?.childImageSharp?.fixed}
                imageAlt={b.node.frontmatter.name}
                linkTo={b.node.frontmatter.slug}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export const query = graphql`
  query BuildsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/build/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          frontmatter {
            name
            date(formatString: "MMMM DD, YYYY")
            slug
            image {
              childImageSharp {
                fixed(height: 400) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Build
