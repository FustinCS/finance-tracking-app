import { TriangleAlert } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function NotSignedInAlert() {
  return (
    <div className="flex justify-center md:justify-start">
      <Card className="w-fit my-4 mx-8 md:mx-0">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TriangleAlert className="w-6 h-6 text-yellow-600" />
            <div>
              <CardTitle>Not Signed In!</CardTitle>
              <CardDescription>
                In order for your data to persist when exiting the app, you need to be signed in!
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
