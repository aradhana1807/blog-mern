import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import { useSelector } from "react-redux";
export default function FooterComp() {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Footer
      container
      className="font-display dark:bg-[#151515] border border-t-8 border-teal-600"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold   dark:text-white"
            >
              <span
                className={`px-2 py-1 bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-emerald-400 to-cyan-400"
                    : "from-emerald-500 to-emerald-900"
                } bg-clip-text text-transparent`}
              >
                ds.
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://my-project-gallery.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Project Gallery
                </Footer.Link>

                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/aradhana1807"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="ds. blog"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon
              href="https://github.com/aradhana1807"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
