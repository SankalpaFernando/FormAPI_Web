
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { getLogin, getRegister } from "@/api/user"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch } from "react-redux"
import { login } from "@/reducer/authSlice"

export default () => {


  const dispatch = useDispatch();

  const [type, setType] = useState("login");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { toast } = useToast()


  const onRegister = ({email,name,password,repassword})=>{
    getRegister(email,name,password).then(res=>{
      toast({
        title: "Account Created Successfully!",
        description: "We've created your account for you.Now you can login.",
      })
      setType("signup")
    })
  }

  const onLogin = ({email,password})=>{
    dispatch(login({email,password}));
  }


  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <a
          href="#"
          onClick={() => {
            setType(type === "login" ? "signup" : "login")
          }}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {
            type === "login" ? "Sign In" : "Sign Up"
          }
        </a>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {
                  type === "login" ? "Create an account"
                    : "Log in to account"
                }
              </h1>
              <p className="text-sm text-muted-foreground">
              {
                  type === "login" ? "Enter your details below to create your account"
                    : "Enter your email and password to sign in"
                }
                
              </p>
            </div>
            <div>

              {
                type === "login" ? (
                  <form onSubmit={handleSubmit(onRegister)}>
                    <Input placeholder="Name" {...register('name')} />
                    <Input className="my-2" placeholder="Email Address" {...register('email')} />
                    <Input className="my-2" placeholder="Password" {...register('password')} />
                    <Input className="my-2" placeholder="Re-enter Password" {...register('repassword')} />
                    <Button className="w-full my-3 font-bold">Sign Up with Email</Button>
                  </form>
                ) : (<form onSubmit={handleSubmit(onLogin)}>
                  <Input placeholder="Email Address" {...register('email')} />
                  <Input className="my-2" placeholder="Password" {...register('password')} />
                  <Button className="w-full my-3 font-bold">Sign In with Email</Button>
                </form>)
              }
              <div className="relative mt-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full font-semibold">
                <GitHubLogoIcon className="mr-2" /> Github
              </Button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}