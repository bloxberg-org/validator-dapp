import "tailwindcss/tailwind.css";
import { Navbar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function App({ Component, pageProps }) {
	return (
		<>
		<style global jsx>
		{`
			 html,
			 body,
			 body > div:first-child,
			 div#__next {
				height: 100%;
			 }
		  `}
		</style>
		<style global jsx>
		{`
			 div#__next {
				display: flex;
				flex-direction: column;
			 }
		  `}
		</style>
		<Navbar />
		<div className="bg-background flex flex-col grow items-center">
			<div className="w-content text-background-header max-w-[100%]">
				<Component {...pageProps} />
			</div>
		</div>
		<Footer />
		</>
	);
}
