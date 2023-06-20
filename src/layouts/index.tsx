import React, { ReactElement } from "react"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

interface Props {
  children: React.ReactNode
}

const linkList = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Campers",
    href: "/campers",
  },
  {
    title: "For Sale",
    href: "/builds",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "About",
    href: "/about",
  },
]

function Index(props: Props): ReactElement {
  return (
    <div className="font-body">
      <header className="font-title uppercase">
        <Nav links={linkList} />
      </header>
      <main id="body-container" className="m-auto min-h-screen">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Index
