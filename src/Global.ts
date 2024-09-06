import { ref } from "vue";

export enum State {
	INIT,
	Datenschutz,
	Impressum,
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
	uid: number;
	admin: boolean;
	logged_in: boolean;
}

export interface Login extends User {
	token: string;
}

class Globals {
	user = ref<User>({ uid: 0, admin: false, logged_in: false });
	api: string = window.origin + "/api";
	state = ref<State>(State.INIT);
}

const Global = new Globals();

export default Global;