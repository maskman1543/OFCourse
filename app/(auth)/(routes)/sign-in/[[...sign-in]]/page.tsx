import { SignIn } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
 
export default function Page() {
  return <SignIn 
    appearance={{
      baseTheme: neobrutalism,
      elements: {
        formButtonPrimary: "bg-blue-800  hover:bg-blue-900",
        footerActionLink: "text-blue-800 hover:text-blue-900"
      }
      
    }}
  />;
}