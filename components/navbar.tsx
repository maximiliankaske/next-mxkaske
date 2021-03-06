import React, { useEffect } from "react";
import Link from "next/link";
import { FiTwitter, FiGithub, FiSun, FiMoon } from "react-icons/fi";
import { motion, useAnimation, Variants } from "framer-motion";
import Container from "./container";
import { useDisplayHeader } from "../hooks";
import { useTheme } from "next-themes";

const NavBar = () => {
  const displayHeader = useDisplayHeader();
  const controls = useAnimation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    controls.start("visible");
  }, []);

  useEffect(
    () =>
      displayHeader.onChange((e) => {
        if (e) controls.start("visible");
        else controls.start("hidden");
      }),
    [displayHeader]
  );

  const container: Variants = {
    visible: { y: 0 },
    hidden: { y: -60 },
  };

  return (
    <motion.header
      className="w-full bg-primary-600 fixed top-0 z-10"
      variants={container}
      animate={controls}
      initial="hidden"
      transition={{
        type: "tween",
      }}
    >
      <Container className="flex justify-between items-center">
        <Link href="/">
          <h3 className="text-white mb-0 cursor-pointer hover:text-secondary-300">
            mxkaske
          </h3>
        </Link>
        <div className="flex">
          <button
            className="text-white mr-4"
            onClick={() => window.open("https://twitter.com/mxkaske", "_blank")}
            aria-label="twitter"
          >
            <FiTwitter />
          </button>
          <button
            onClick={() =>
              window.open(
                "https://github.com/maximiliankaske/next-mxkaske",
                "_blank"
              )
            }
            className="text-white mr-4"
            aria-label="github"
          >
            <FiGithub />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white"
            aria-label="github"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </Container>
    </motion.header>
  );
};

export default NavBar;
