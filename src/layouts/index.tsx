import React, { ReactElement } from "react"

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
    title: "Contact",
    href: "/contact",
  },
]

function Index(props: Props): ReactElement {
  return (
    <>
      <header>
        <Nav links={linkList} />
      </header>
      <main
        id="body-container"
        className="mt-8 lg:mt-16 max-w-screen-xl m-auto"
      >
        {props.children}
      </main>
    </>
  )
}

export default Index
