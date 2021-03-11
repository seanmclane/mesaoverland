import React, { ReactElement } from "react"
import { Link } from "gatsby"

interface Props {}

function Footer(props: Props): ReactElement {
  return (
    <footer className="flex flex-wrap items-center p-6 bg-gray-500 text-white">
      <div className="m-auto max-w-screen-lg text-center">
        <Link to="/about">Contact Us</Link>
        <p>&#169; Mesa Overland, 2021</p>
      </div>
    </footer>
  )
}

export default Footer
