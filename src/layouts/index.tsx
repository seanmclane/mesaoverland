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
      <main id="body-container" className="mt-8 max-w-screen-xl m-auto">
        {props.children}
      </main>
    </div>
  )
}

export default Index
