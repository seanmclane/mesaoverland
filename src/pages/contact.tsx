import React, { useState } from "react"
import { navigate } from "gatsby-link"
import SEO from "../components/SEO"

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
    address: "",
    city: "",
    st: "",
    phone: "",
    purchase: ""
  })

  const handleChange = (e) => {
    validateRequiredFields()
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const [emailValidState, setEmailValidState] = useState(true)

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    setEmailValidState(re.test(email))
  }

  const [requiredFieldsState, setRequiredFieldsState] = useState(false)

  const validateRequiredFields = () => {
    const {
      name,
      email,
      message,
      st,
      city,
      phone
    } = state
    if (name && email && message && city && st && phone) {
      setRequiredFieldsState(true)
    } else {
      setRequiredFieldsState(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    if (emailValidState && requiredFieldsState) {
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
        description="Contact us about your new RV or truck camper"
      />
      <div
        className="bg-mesa text-gray-100 py-20 px-2"
        style={{ minHeight: "75vh" }}
      >
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
                Name*
                <br />
                <input
                  required
                  className="text-black font-body p-2 w-2/3"
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <label className="font-title">
                Email*
                <br />
                <input
                  required
                  className="text-black font-body p-2 w-2/3"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={() => validateEmail(state.email)}
                />
              </label>
              {emailValidState ? null : (
                <p className="text-sm font-body p-0 mt-2">
                  Please enter a valid email
                </p>
              )}
            </p>
            <p>
              <label className="font-title">
                Phone*
                <br />
                <input
                  required
                  className="text-black font-body p-2 w-2/3"
                  type="text"
                  name="phone"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <label className="font-title">
                Address
                <br />
                <input
                  className="text-black font-body p-2 w-2/3"
                  type="text"
                  name="address"
                  onChange={handleChange}
                />
              </label>
            </p>
            <div className="flex w-2/3 m-auto justify-around flex-wrap">
              <p className="w-full md:w-2/5">
                <label className="font-title">
                  City*
                  <br />
                  <input
                    required
                    className="text-black font-body p-2 w-full"
                    type="text"
                    name="city"
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p className="md:w-2/5">
                <label className="font-title">
                  State*
                  <br />
                <select 
                  className="text-black font-body p-2 w-full"
                  required
                  name="st"
                  onChange={handleChange}
                >
                  <option value="">---</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">Dist of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="GU">Guam</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                </label>
              </p>
            </div>
            <p>
              <label className="font-title">
                Message*
                <br />
                <textarea
                  required
                  className="text-black font-body p-2 w-2/3 h-40"
                  name="message"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <label className="font-title">
                Are you considering a purchase this year?
                <br />
                <select
                  className="text-black font-body p-2 m-4"
                  name="purchase"
                  onChange={handleChange}
                >
                  <option value="">---</option>
                  <option value="Yes">Yes</option>
                  <option value="Maybe">Maybe</option>
                  <option value="No">No</option>
                </select>
              </label>
            </p>
            <p>
              <button
                type="submit"
                className="p-4 text-xl font-bold font-title uppercase bg-black"
              >
                Submit
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
