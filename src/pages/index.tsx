import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import Hero from "../components/Hero"
import SEO from "../components/SEO"
import LinkButton from "../components/LinkButton"
const logo = require("../../static/images/logo.png")

interface Props {
  data: {
    file: {
      childImageSharp: {
        fluid: any
      }
    }
    allMarkdownRemark: {
      edges: Array<{
        node: {
          html: string
          frontmatter: {
            title: string
            author: string
            date: string
          }
        }
      }>
    }
  }
}

function Index(props: Props): ReactElement {
  return (
    <>
      <SEO title="Home" image={logo} />
      <div id="hero-container" className="bg-gray-100">
        <Hero
          className="text-outline lg:pt-8 max-w-5xl m-auto"
          tagline="Build your dreams"
          details="At Mesa Overland, we love making customers' dream adventure rigs into reality. Whether you want to convert your own truck with a camper, make a rugged campulance, or have us source a truck and build a ready-to-adventure overland RV, we have you covered."
          videoSrc="https://www.youtube.com/embed/uET6dbB1_Lo"
        />
      </div>
      <div className="bg-mesa text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">Pick your camper</h2>
            <p className="text-xl flex-wrap">
              Turn your truck into an overland RV with our
              chassis-or-flatbed-mounted campers
            </p>
          </div>
          <LinkButton
            to="/campers"
            className="flex mx-16 md:mx-16 items-center"
          >
            Campers
          </LinkButton>
        </div>
      </div>
      <div className="bg-outline text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">
              Check out our builds
            </h2>
            <p className="text-xl flex-wrap">
              You can have 41-inch tires AND a shower. No compromises.
            </p>
          </div>
          <LinkButton
            to="/builds"
            bgColor="bg-mesa"
            className="flex mx-16 md:mx-16 items-center"
          >
            Builds
          </LinkButton>
        </div>
      </div>
      <div className=" py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">Testimonials</h2>
            <div className="flex flex-wrap">
              {props.data.allMarkdownRemark.edges.map((t) => {
                return (
                  <div
                    className="text-xl lg:w-1/3 lg:max-w-3xl px-10"
                    key={t.node.frontmatter.author}
                  >
                    <h2 className="mt-8 mb-4 text-2xl font-title uppercase">
                      {t.node.frontmatter.title}
                    </h2>
                    <h3 className="text-md mb-2">
                      {t.node.frontmatter.author}
                    </h3>
                    <h3 className="text-sm text-mesa">
                      {t.node.frontmatter.date}
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: t.node.html }} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-mesa text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">
              Start planning your overland camper today!
            </h2>
            <LinkButton to="/contact" className="text-gray-100">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query HomePageQuery {
    file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/testimonial/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
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

export default Index
