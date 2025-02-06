import LoginForm from "../components/Auth/LoginForm"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import Bg from "../assets/background.webp"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-col flex-1 items-center justify-center gap-10">
          <div className="flex justify-center gap-2 md:justify-center">
            <Link to="/" className="flex items-center gap-2 font-medium">
              <div className="flex w-28 items-center justify-center rounded-md text-primary-foreground">
                <img src={Logo} alt="" />
              </div>
            </Link>
          </div>
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={Bg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}