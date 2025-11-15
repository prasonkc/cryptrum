import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm bg-gray-900 shadow-2xl shadow-gray-700 outline-blue-400 outline-1">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardAction>
            <Button variant="link" className="cursor-pointer">
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            variant={"ghost"}
          >
            Login
          </Button>
          <Button className="w-full cursor-pointer" variant={"outline"}>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
