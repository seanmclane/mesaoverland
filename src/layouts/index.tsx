import React, { ReactElement } from "react"
import { StaticQuery, graphql } from "gatsby"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

interface Props {
  children: React.ReactNode
}

const linkList = (midSizeName: string) => [
  {
    title: "Home",
    href: "/",
  },
  {
    title: midSizeName,
    href: "/campers/midsize",
  },
  {
    title: "Builds",
    href: "/builds",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Financing",
    href: "/financing",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

function Index(props: Props): ReactElement {
  //ensure scroll is reset from configure modal if not "x"ed out
  document.body.style.overflow = "unset"

  return (
    <div className="font-body">
      <header className="font-title uppercase">
        <StaticQuery
          query={graphql`
            query LayoutQuery {
              midSizeData: markdownRemark(
                fileAbsolutePath: { regex: "/content/campers/midsize/" }
              ) {
                frontmatter {
                  name
                }
              }
            }
          `}
          render={(data) => (
            <Nav links={linkList(data.midSizeData.frontmatter.name)} />
          )}
        />
      </header>
      <main
        id="body-container"
        className="m-auto"
        style={{ minHeight: "75vh" }}
      >
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Index
