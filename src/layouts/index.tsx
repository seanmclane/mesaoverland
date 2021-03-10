import React, { ReactElement } from "react"
import { Helmet } from "react-helmet"

import Nav from "../components/Nav"

interface Props {
  children: React.ReactNode
}

const linkList = [
  {
    title: "Builds",
    href: "/builds",
  },
  {
    title: "About",
    href: "/about",
  },
]

function Index(props: Props): ReactElement {
  return (
    <div className="font-body">
      <Helmet>
        <title>Mesa Overland - Custom 4x4 Campers</title>
      </Helmet>
      <header className="font-title uppercase">
        <Nav links={linkList} />
      </header>
      <main id="body-container" className="mt-8 max-w-screen-xl m-auto">
        {props.children}
      </main>
    </div>
  )
}

export default Index
