export interface User {
	Name: string;
	Followers: number;
	ReposNum: number;
}

export const defaultUser: User = {
	Name: 'Loading...',
	Followers: -1,
	ReposNum: -1,
}

export interface fontData {
	name: string;
	url: string;
}

const baseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/';
export const fonts = {
	roboto: {
		name: 'Roboto',
		url: baseUrl+'Roboto/Roboto-Regular.ttf',
	},
}