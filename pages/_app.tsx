import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSr] = useState(true);
  useEffect(() => {
    setIsSSr(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId='80320399580-er3hbnqijjkap3kmhouhrnhvctkv9sk0.apps.googleusercontent.com'>
      <Navbar/>
      <div className="flex gap-6 md:gap-20 border border-red-500">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto border border-red-500">
          <Sidebar/>
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 border border-red-500">
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
