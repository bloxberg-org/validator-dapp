import Image from 'next/image'
import logoBloxberg from './logo.png'

export const LogoBloxberg = () => {
	return (
		<Image
			src={logoBloxberg}
			alt="BloxbergLogo"
			className="block w-40"
		/>
	)
}
