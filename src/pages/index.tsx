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
        highlight_camper_1_tagline: string
        highlight_camper_1_tagline_desc: string
        highlight_camper_1_button: string
        highlight_camper_1_link: string
        highlight_camper_1_image: {
          childImageSharp?: {
            fluid: any
          }
        }
        highlight_camper_2_tagline: string
        highlight_camper_2_tagline_desc: string
        highlight_camper_2_button: string
        highlight_camper_2_link: string
        highlight_camper_2_image: {
          childImageSharp?: {
            fluid: any
          }
        }
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
      <div className="bg-mesa text-gray-100 md:py-8">
        <div className="flex w-full flex-wrap flex-row justify-between text-center mx-auto">
          <Img
            className="w-full md:w-1/2 md:rounded-r-lg"
            fluid={HomeData.highlight_camper_1_image.childImageSharp?.fluid}
            alt="Highlighted camper 1 photo"
          />
          <div className="m-auto w-full md:w-1/2 p-4 max-w-md text-center">
            <h2 className="text-3xl font-title uppercase">
              {HomeData.highlight_camper_1_tagline}
            </h2>
            <p className="text-xl flex-wrap">
              {HomeData.highlight_camper_1_tagline_desc}
            </p>
            <LinkButton to={HomeData.highlight_camper_1_link} classNames="no-underline">
              {HomeData.highlight_camper_1_button}
            </LinkButton>
          </div>
        </div>
      </div>
      <div className="bg-outline text-gray-100 md:py-8">
        <div className="flex w-full flex-wrap flex-row justify-between text-center mx-auto">
          <div className="m-auto w-full md:w-1/2 p-4 max-w-md text-center">
            <h2 className="text-3xl font-title uppercase">
              {HomeData.highlight_camper_2_tagline}
            </h2>
            <p className="text-xl flex-wrap">
              {HomeData.highlight_camper_2_tagline_desc}
            </p>
            <LinkButton
              to={HomeData.highlight_camper_2_link}
              classNames="no-underline"
              bgColor="bg-mesa"
            >
              {HomeData.highlight_camper_2_button}
            </LinkButton>
          </div>
          <Img
            className="w-full md:w-1/2 md:rounded-l-lg"
            fluid={HomeData.highlight_camper_2_image.childImageSharp?.fluid}
            alt="Highlighted camper 1 photo"
          />
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
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        highlight_camper_1_tagline
        highlight_camper_1_tagline_desc
        highlight_camper_1_button
        highlight_camper_1_link
        highlight_camper_1_image {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        highlight_camper_2_tagline
        highlight_camper_2_tagline_desc
        highlight_camper_2_button
        highlight_camper_2_link
        highlight_camper_2_image {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        gallery {
          image {
            childImageSharp {
              fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    reviews: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/review/" } }
      sort: { frontmatter: {date: DESC} }
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
