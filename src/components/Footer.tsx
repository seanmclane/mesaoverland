import React, { ReactElement } from "react"
import { Link } from "gatsby"

interface Props {}

function Footer(props: Props): ReactElement {
  return (
    <footer className="bg-outline text-white w-full py-4">
      <div className="text-center ">
        <Link className="px-2" to="/about">
          Contact Us
        </Link>
        <Link className="px-2" to="/admin">
          Admin
        </Link>
        <p className="px-2 pt-1 pb-0">&#169; Mesa Overland, 2021</p>
      </div>
    </footer>
  )
}

export default Footer
