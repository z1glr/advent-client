import { ref } from "vue";

export enum State {
	INIT,
	Login,
	Home,
	Posts,
	Comments,
	Users
};

export interface Post {
	pid: number;
	title: string;
	content: string;
	date: string;
}

export interface Comment {
	cid: number;
	pid: number;
	uid: number;
	text: string;
	answer?: string;
}

export interface User {
	name: string;
	uid: number;
	admin: boolean;
	loggedIn: boolean;
}

export interface Login extends User {
	token: string;
}

class Globals {
	user = ref<User>({ uid: 0, name: "", admin: false, loggedIn: false });
	api: string = window.origin + "/api";
	state = ref<State>(State.INIT);
}

const Global = new Globals();

export default Global;