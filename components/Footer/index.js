import moment from 'moment'
import { LogoBloxberg } from '@/components/LogoBloxberg'
import { IconGithub } from '@/components/IconGithub'
// import { SocialIcons } from '@/components/SocialIcons'

export const Footer = () => {
	//<SocialIcons networkBranch={networkBranch} />
	return (
		<footer className="bg-background-header w-full justify-center flex shadow-2xl">
			<nav className="w-content max-w-[100%] py-4 bg-background-header">
					<ul className="px-8 flex items-center justify-between text-xl">
						<li className="p-2">
							<LogoBloxberg />
						</li>
						<li className="text-white text-xs p-2">
							<p>{moment().format('YYYY')} bloxberg. All rights reserved.</p>
						</li>
						<li>
							<IconGithub url='https://github.com/bloxberg-org'/>
						</li>
					</ul>
			</nav>
		</footer>
	)
}
