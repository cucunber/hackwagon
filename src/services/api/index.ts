import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";

type APIInstance = AxiosInstance

type TInterceptor = {
    type: 'response' | 'request';
    interceptorId: number;
}

class API {
	instance: APIInstance;

    private interceptors: TInterceptor[] = [];

	constructor(config: CreateAxiosDefaults){
		this.instance = axios.create(config)
	}

    resetInterceptors () {
        this.interceptors.forEach(({ type, interceptorId }) => this.instance.interceptors[type].eject(interceptorId));
    }
	setRequestInterceptor(success?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>, error?: (err: any) => any){
        const interceptorId = this.instance.interceptors.request.use(success, error)
        this.interceptors.push({type: 'request', interceptorId});
		return interceptorId
	}
	setResponseInterceptor(success?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>, error?: (err: any) => any){
        const interceptorId = this.instance.interceptors.response.use(success, error);
        this.interceptors.push({type: 'response', interceptorId});
		return interceptorId;
	}
	setResponseEject(id: number) {
		this.instance.interceptors.response.eject(id);
	}
	get<T = any>(url: string, config?: AxiosRequestConfig){
		return this.instance.get<T>(url, config)
	}
	post<T = any>(url: string, data?: any, config?: AxiosRequestConfig){
		return this.instance.post<T>(url, data, config);
	}
}

export default API;