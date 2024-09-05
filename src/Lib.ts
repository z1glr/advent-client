import Global, { State } from "./Global";

export enum HTTPStatus {
	Continue = 100,
	SwitchingProtocols = 101,
	EarlyHints = 103,
	OK = 200,
	Created = 201,
	Accepted = 202,
	NonauthoritativeInformation = 203,
	NoContent = 204,
	ResetContent = 205,
	PartialContent = 206,
	MultipleChoices = 300,
	MovedPermanently = 301,
	Found = 302,
	SeeOther = 303,
	NotModified = 304,
	unused = 306,
	TemporaryRedirect = 307,
	Permanent = 308,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	NotAcceptable = 406,
	ProxyAuthenticationRequired = 407,
	RequestTimeout = 408,
	Conflict = 409,
	Gone = 410,
	LengthRequired = 411,
	PreconditionFailed = 412,
	PayloadTooLarge = 413,
	URITooLong = 414,
	UnsupportedMediaType = 415,
	RangeNotSatisfiable = 416,
	ExpectationFailed = 417,
	Imateapot = 418,
	MisdirectedRequest = 421,
	TooEarly = 425,
	UpgradeRequired = 426,
	PreconditionRequired = 428,
	TooManyRequests = 429,
	RequestHeaderFieldsTooLarge = 431,
	UnavailableForLegalReasons = 451,
	InternalServerError = 500,
	NotImplemented = 501,
	BadGateway = 502,
	ServiceUnavailable = 503,
	GatewayTimeout = 504,
	HTTPVersionNotSupported = 505,
	VariantAlsoNegotiates = 506,
	NotExtended = 510,
	NetworkAuthenticationRequired = 511	
}

type QueryParams = Record<string, string | { toString(): string; }>;
type APICallResult<T extends object> = { data: T; status: HTTPStatus; ok: boolean; };
export async function api_call<K extends object>(method: "GET", api: string, params?: QueryParams): Promise<APICallResult<K>>
export async function api_call<K extends object>(method: "POST", api: string, params?: QueryParams, body?: object): Promise<APICallResult<K>>
export async function api_call<K extends object>(method: "DELETE", api: string, params?: QueryParams, body?: object): Promise<APICallResult<K>>
export async function api_call<K extends object>(method: string, api: string,  params?: QueryParams, body?: object): Promise<APICallResult<K>> {
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

	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		credentials: 'include',
		method,
		body: body !== undefined ? JSON.stringify(body) : undefined
	});

	// if the error-code is 401 = unauthorized, go back to the login-view
	if (response.status === HTTPStatus.Unauthorized) {
		Global.state.value = State.Login;
	}

	const content_type = response.headers.get("content-type");

	if (content_type && content_type.indexOf("application/json") !== -1) {
		return { data: await response.json() as K, status: response.status, ok: response.ok };
	} else {
		return { status: response.status, data: undefined as unknown as K, ok: response.ok };
	}
}

export function create_lcg_random(seed: number) {
	let state = seed;
  
	function next() {
	  state = (state * 1103515245 + 12345) % 2**32;
	  return state / 2**32;
	}
  
	return next;
  }