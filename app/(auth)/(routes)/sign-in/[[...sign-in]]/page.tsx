import { SignIn } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
 
export default function Page() {
  return <SignIn 
    appearance={{
      baseTheme: neobrutalism
      
    }}
  />;
}