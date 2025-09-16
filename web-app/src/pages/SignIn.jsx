import { useState } from "react"
import { signIn } from "../lib/auth-client"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password || isLoading) return
    setIsLoading(true)
    signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          toast.success("Login successful")
          console.log(data)
          navigate("/")
          setIsLoading(false)
        },
        onError: (error) => {
          console.error("Sign-in error:", error)
          toast.error("Failed to sign in: " + error.message)
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Decorative left panel */}
      <div className="relative items-center justify-center hidden lg:flex lg:w-1/2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative z-10 max-w-lg px-10 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl ring-1 ring-white/20">
              <img src={logo} alt="Civic Guardian" className="w-8 h-8" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Civic-Guardian</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Empowering civic leaders with insight and action
          </h1>
          <p className="mt-4 text-white/80">
            Secure access to analytics, issues, and alerts to keep your community informed and protected.
          </p>
        </div>
      </div>

      {/* Right side - Sign In card */}
      <div className="flex items-center justify-center flex-1 p-6">
        <div className="w-full max-w-md">
          <div className="w-full p-6 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl">
            {/* Logo */}
            <div className="flex justify-center w-full">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-50 border border-gray-200 shadow-sm rounded-xl">
                <img src={logo} alt="Logo" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
              <p className="mt-1 text-sm text-gray-500">Sign in to access the admin dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="relative mt-1">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="block w-full pr-10 pl-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    {/* Mail icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16v16H4z" stroke="currentColor" />
                      <path d="m22 6-10 7L2 6" stroke="currentColor" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="block w-full pr-10 pl-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    {/* Lock icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      // Eye-off icon
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3l18 18" />
                        <path d="M10.73 5.08A9.77 9.77 0 0 1 12 5c7 0 10 7 10 7a15.93 15.93 0 0 1-3.95 4.94" />
                        <path d="M6.12 6.11A16 16 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 3.54-.64" />
                        <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                      </svg>
                    ) : (
                      // Eye icon
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors ${
                  isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Footer actions */}
            <div className="mt-4 flex items-center justify-center text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Compact footer brand */}
          <p className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Civic-Guardian. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
