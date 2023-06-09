import React, { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowsidebar] = useState(true);
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded ";
  const userProfile = false;
  return (
    <div>
      <div
        onClick={() => setShowsidebar((prev) => !prev)}
        className="block xl:hidden ml-2 mt-3 text-xl"
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>

      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">helo</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                login to like and comment on videos
              </p>
              <div className="pr-4">
                {/* <GoogleLogin
                  render={(renderProps) => (
                    <button
                    className="bg-white text-lg text-[#f51997] border-[1px] px-3 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#f51997]"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      login
                    </button>
                  )}
                  clientId=""
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_orgin"
                /> */}
              </div>
            </div>
          )}

          <Discover/>
          <SuggestedAccounts/>
          <Footer/>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
