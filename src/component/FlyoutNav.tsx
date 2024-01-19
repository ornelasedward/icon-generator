import React, { Dispatch, SetStateAction, use, useState, useEffect, useRef } from "react";
import {
  useMotionValueEvent,
  AnimatePresence,
  useScroll,
  motion,
} from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import ShuffleHero from "./ShuffleHero";

const Example = () => {
  return (
    <>
      <FlyoutNav />
      <div
        className="relative min-h-screen"
      >
        <ShuffleHero />
      </div>
    </>
  );
};

const FlyoutNav = () => {

  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 250 ? true : false);
  });

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 text-white 
      transition-all duration-300 ease-out lg:px-12
      ${
        scrolled
          ? "bg-neutral-950 py-3 shadow-xl"
          : "bg-neutral-950/0 py-6 shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <div className="hidden gap-6 lg:flex">
          {/* <Links /> */}
        </div>
        {/* <MobileMenu /> */}
        <CTAs />
      </div>
    </nav>
  );
};

const Logo = ({ color = "white" }: { color?: string }) => {
  // Temp logo from https://logoipsum.com/
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold" style={{ color }}>
      Logo Forge
      </span>
      <svg
        width="50"
        height="39"
        viewBox="0 0 50 39"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        className="w-10"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor={color}
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor={color}
        ></path>
      </svg>
    </div>
  );
};

const CTAs = () => {
    const session = useSession();
    const isLoggedIn = !!session.data;

  return (
    <div className="flex items-center gap-3">
        {!isLoggedIn && (
        <Button onClick={() => {
                
            signIn().catch(console.error)
        }}>Sign Up / Login</Button>
        )}
         {isLoggedIn && (
        <>
            <Button onClick={() => {
                
                signOut().catch(console.error)
            }}>LogOut</Button>
        </>
        )}
    </div>
  );
};

export default Example;