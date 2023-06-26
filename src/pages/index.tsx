import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Hero from "../components/Hero"
import SEO from "../components/SEO"
import LinkButton from "../components/LinkButton"
// import HomeData from '../content/home/index.json'
const logo = require("../../static/images/logo.png")

interface Props {
  data: {
    file: {
      childImageSharp: {
        fluid: any
      }
    }
    reviews: {
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
    homeData: {
      frontmatter: {
        tagline: string
        tagline_desc: string
        hero_image: {
          childImageSharp?: {
            fluid: any
          }
        }
        midsize_tagline: string
        midsize_tagline_desc: string
        midsize_button: string
        gallery: Array<{
          image?: {
            childImageSharp?: {
              fluid: any
            }
          }
        }>
      }
    }
  }
}

function Index(props: Props): ReactElement {
  const HomeData = props.data.homeData.frontmatter
  return (
    <>
      <SEO title="Home" description={HomeData.tagline_desc} image={logo} />
      <div id="hero-container" className="">
        <Hero
          className="text-outline"
          tagline={HomeData.tagline}
          details={HomeData.tagline_desc}
          gatsbyImage={HomeData.hero_image.childImageSharp?.fluid}
          gatsbyImageAlt="Hero image"
        />
      </div>
      <div className="bg-mesa text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">
              {HomeData.midsize_tagline}
            </h2>
            <p className="text-xl flex-wrap">{HomeData.midsize_tagline_desc}</p>
          </div>
          <LinkButton
            to="/campers/midsize"
            classNames="flex mx-16 md:mx-16 items-center no-underline"
          >
            {HomeData.midsize_button}
          </LinkButton>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="w-full overflow-auto whitespace-nowrap mr-2">
            {HomeData.gallery.map((g) => {
              return (
                <Img
                  className="ml-2 inline-block rounded-lg w-4/5 md:w-2/3"
                  style={{ maxHeight: "40em", minHeight: "20em" }}
                  fluid={g.image?.childImageSharp?.fluid}
                  alt={g.image?.childImageSharp?.fluid.alt}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className="bg-outline text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">
              We finance! See how much you could be approved for
            </h2>
            <LinkButton
              to="/financing"
              bgColor="bg-mesa"
              classNames="text-gray-100"
            >
              Financing
            </LinkButton>
          </div>
        </div>
      </div>
      <div className="py-20 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">Testimonials</h2>
            <div className="flex flex-wrap">
              {props.data.reviews.edges.map((t) => {
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
            <LinkButton to="/contact" classNames="text-gray-100">
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
    homeData: markdownRemark(fileAbsolutePath: { regex: "/content/home/" }) {
      frontmatter {
        tagline
        tagline_desc
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        midsize_tagline
        midsize_tagline_desc
        midsize_button
        gallery {
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    reviews: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/review/" } }
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
