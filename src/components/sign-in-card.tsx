import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function SignInCard() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Sign in to your account to access this page.</CardDescription>
        </CardHeader>
        <CardFooter>
            <Button className="w-full">Sign In</Button>
        </CardFooter>
    </Card>
  );
}
