import Global, { State } from "./Global";

type QueryParams = Record<string, string | { toString(): string; }>;
export async function api_call<K extends object>(method: "GET", api: string, params?: QueryParams): Promise<K | false>
export async function api_call<K extends object>(method: "POST", api: string, params?: QueryParams, body?: object): Promise<K | false>
export async function api_call<K extends object>(method: "DELETE", api: string, params?: QueryParams, body?: object): Promise<K | false>
export async function api_call<K extends object>(method: string, api: string,  params?: QueryParams, body?: object): Promise<K | boolean> {
	let url = Global.api + "/" + api;

	if (!!params) {
		const urlsearchparams = new URLSearchParams(Object.fromEntries(Object.entries(params).map(([key, value]): [string, string] => {
			if (typeof value !== "string") {
				return [key, value.toString()];
			} else {
				return [key, value];
			}
		})));

		url += "?" + urlsearchparams.toString();
	}

	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
			method,
			body: body !== undefined ? JSON.stringify(body) : undefined
		});

		if (!response.ok) {
			// if the error-code is 401 = unauthorized, go back to the login-view
			if (response.status === 401) {
				Global.state.value = State.Login;
			}

			throw new Error(`Response status: ${response.status}`);
		}

		const content_type = response.headers.get("content-type");

		if (content_type && content_type.indexOf("application/json") !== -1) {
			return response.json();
		} else {
			return true;
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("unknown error");
		}

		return false;
	}
}