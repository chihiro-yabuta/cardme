export interface User {
	Name: string;
	Followers: number;
	ReposNum: number;
}

export interface container {
	children?: JSX.Element | JSX.Element[];
	width: number;
	height: number;
}

interface base {
	x?: number;
	y?: number;
	className? :string;
}

export interface outer extends container, base {
}

export interface rect extends outer {
	rx?: number;
	ry?: number;
}

export interface circle extends outer {
	r: number;
}

export interface text extends base {
	children: string;
}

export interface line extends base {
	x2: number;
	y2: number;
}