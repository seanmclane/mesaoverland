import React, { useState } from "react"
import { navigate } from "gatsby-link"
import SEO from "../components/SEO"

interface FormData {
  "form-name": string
  name: string
  email: string
  message: string
}

function encode(data: FormData) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

function ContactUs() {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const [emailValidState, setEmailValidState] = useState(true)

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    setEmailValidState(re.test(email))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    if (emailValidState && state.email) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": form.getAttribute("name"),
          ...state,
        }),
      })
        .then(() => navigate(form.getAttribute("action")))
        .catch((error) => alert(error))
    }
  }

  return (
    <div>
      <SEO
        title="Contact Us"
        description="Contact us about a slide in camper or custom RV work"
      />
      <div className="bg-mesa text-gray-100 py-20 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <h2 className="text-3xl font-title uppercase">Contact Us</h2>
          <form
            name="contact"
            method="post"
            action="/thankyou"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="uppercase min-w-full"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <label className="font-title">
                Name
                <br />
                <input
                  className="text-black font-body p-2 w-2/3"
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <label className="font-title">
                Email
                <br />
                <input
                  className="text-black font-body p-2 w-2/3"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={() => validateEmail(state.email)}
                />
              </label>
              {emailValidState ? null : (
                <p className="text-sm font-body p-0 m-0">
                  Please enter a valid email
                </p>
              )}
            </p>
            <p>
              <label className="font-title">
                Message
                <br />
                <textarea
                  className="text-black font-body p-2 w-2/3 h-40"
                  name="message"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <button
                type="submit"
                className="p-4 text-xl font-bold font-title uppercase bg-black"
              >
                Send
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
