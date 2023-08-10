import { extendTheme } from '@chakra-ui/react';

import Button from '../components/Button';

const theme = extendTheme({
	colors: {
		pink1: 'rgb(255,241,247)',
		pink_neon: 'rgb(255,11,229)',
		purple1: 'rgb(248,247,254)',
		purple2: 'rgb(242,240,253)',
		purple_neon: 'rgb(137,32,254)',
		green1: 'rgb(240,251,248)',
		green2: 'rgb(228,248,242)',
		green_neon: 'rgb(104,238,190)',
		violet1: 'rgb(245,238,252)',
		violet2: 'rgb(241,230,251)',
		yellow1: 'rgb(255,250,230)',
		yellow_neon: 'rgb(255,200,1)',
		blue1: 'rgb(237,250,254)',
		blue2: 'rgb(73,248,249)',
		blue_neon: 'rgb(73,204,249)',
		customLink: {
			50: '#f5f9fd',
			100: 'rgb(104,238,190)',
			200: '#c0def7',
			300: '#95c8f3',
		},
	},
	fonts: {
		heading: 'Axiforma, sans-serif',
		body: 'Montserrat, sans-serif',
	},
	components: {
		Button,
	},
	styles: {
		global: (props: { colorMode: string }) => ({
			body: {
				// bg: props.colorMode === "light" ? "rgb(240,251,248)" : "#EBD4D4",
				// color: props.colorMode === "light" ? "black" : "white",
			},
			a: {
				color: props.colorMode === 'dark' ? '#FFF0F0' : 'blue',
			},
		}),
	},
});

export default theme;
