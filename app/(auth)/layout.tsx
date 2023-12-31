const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full flex items-center justify-center"
    style={{
      backgroundImage: `url('/OFCourse-Signin-page.png')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}  
    >
      {children}
    </div>
   );
}
 
export default AuthLayout;