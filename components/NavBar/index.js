import { LogoBloxberg } from "@/components/LogoBloxberg";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <header className="bg-background-header w-full justify-center flex drop-shadow-lg">
      <div className="w-full flex justify-center">
        <nav className="w-content max-w-[100%] justify-between py-4 bg-background-header">
          <ul className="px-8 flex items-center justify-left text-xl">
            <li className="p-2">
              <LogoBloxberg />
            </li>
            <li className="p-2">
              <Link
                href="/"
                className={
                  (router.pathname == "/"
                    ? "text-link-active"
                    : "text-link-inactive") + " hover:text-link-active ml-2"
                }
              >
                {" "}
                Active Validators{" "}
              </Link>
            </li>
            <li className="p-2">
              <Link
                href="/inactiveValidators"
                className={
                  (router.pathname == "/inactiveValidators"
                    ? "text-link-active"
                    : "text-link-inactive") + " hover:text-link-active ml-2"
                }
              >
                {" "}
                Inactive Validators{" "}
              </Link>
            </li>
            <li className="p-2">
              <Link
                href="/setMetadata"
                className={
                  (router.pathname == "/setMetadata"
                    ? "text-link-active"
                    : "text-link-inactive") + " hover:text-link-active ml-2"
                }
              >
                {" "}
                Set Metadata{" "}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
