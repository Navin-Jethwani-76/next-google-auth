import { GoogleOAuthProvider } from "@react-oauth/google";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      <main className="flex justify-center items-center h-screen w-full">
        {children}
      </main>
    </GoogleOAuthProvider>
  );
};

export default Layout;
