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