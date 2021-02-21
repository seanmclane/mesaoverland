import React, { ReactElement, useState } from "react"

interface Props {
  children: React.ReactNode
}

function Index(props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <div>
        <nav className="flex flex-wrap items-center justify-between p-6 bg-teal-500">
          <div className="flex items-center flex-shrink-0 mr-6 text-white">
            <span>LOGO</span>
            <span className="text-xl font-semibold tracking-tight">
              Mesa Overland
            </span>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => {
                setMenuOpen((isMenuOpen) => !isMenuOpen)
              }}
              className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white"
            >
              <svg
                className="w-3 h-3 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`w-full ${
              isMenuOpen ? "block" : "hidden"
            } flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                Builds
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                About
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="container mx-auto mt-10">
        {props.children}
      </div>
    </>
  )
}

export default Index
