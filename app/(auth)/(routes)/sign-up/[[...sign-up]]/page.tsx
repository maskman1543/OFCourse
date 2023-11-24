import { SignUp } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
 
export default function Page() {
  return <SignUp
  
  appearance={{
    baseTheme: neobrutalism
  }}
  />;
}