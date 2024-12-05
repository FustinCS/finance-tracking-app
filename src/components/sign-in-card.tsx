import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { auth } from "@/firebase";

export default function SignInCard() {
  const handleSignIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Sign in to your account to access this page.</CardDescription>
        </CardHeader>
        <CardFooter>
            <Button className="w-full" onClick={handleSignIn}>Sign In</Button>
        </CardFooter>
    </Card>
  );
}
