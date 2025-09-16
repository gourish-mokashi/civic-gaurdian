import { useState } from "react"
import { signIn } from "../lib/auth-client"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn.email({
        email,
        password
    },{
    onSuccess: (data) => {
      toast.success("login Successful")
            console.log(data);
            // api call to check if user is admin
            navigate("/");
        },
        onError: (error) => {
            console.error("Sign-in error:", error);
            toast.error("Failed to sign in: " + error.message)
        }
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center border-r border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 max-w-sm leading-tight">
          Civic-Guardian <span className="text-Blue-500">Admin Portal</span>
        </h1>
      </div>

      {/* Right side - Sign In form */}
      <div className="flex flex-1 items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Logo holder */}
          <div className="w-full flex justify-center">
            <div className="h-16 w-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm">
              <img src={logo} alt="Logo"/>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white font-medium shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>

          {/* Extra - Forgot password */}
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
