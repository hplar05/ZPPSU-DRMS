"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    firstname: z.string().min(1, "First name is required"),
    middlename: z.string().optional(),
    lastname: z.string().min(1, "Last name is required"),
    mobileNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      mobileNumber: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        middlename: values.middlename,
        mobileNumber: values.mobileNumber,
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    if (response.ok) {
      toast.success("Successfully registered!");
      router.push("/login");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="border rounded-md">
      <h1 className="text-center mt-6 text-2xl font-bold">REGISTER</h1>
      <div className="px-14 py-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middlename"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middlename</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your middle name (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your mobile number (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Sign up
            </Button>
          </form>
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
          <p className="text-center text-sm text-gray-600 mt-2">
            If you don&apos;t have an account, please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/login">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
