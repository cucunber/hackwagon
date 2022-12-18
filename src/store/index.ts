import { Socket } from "../services";
import API from "../services/api"
import UserStore from "./user";

const baseURL = process.env.REACT_APP_API_URL || ''
const socketURL = process.env.REACT_APP_API_WS || ''

class RootStore {
    private apiInstance: API
    private socketInstance: Socket;
    userStore: UserStore
    constructor(){
        this.apiInstance = new API({ baseURL });
        this.socketInstance = new Socket(socketURL, '/ws/main_page/');
        this.userStore = new UserStore(this.apiInstance, this.socketInstance);
    }
}

type Stores = keyof RootStore

const store = new RootStore();

function useStore(): RootStore;
function useStore<T extends Stores>(storeName: T): RootStore[T];
function useStore<T extends Stores>(storeName?: T)  {
	if(storeName){
		return store[storeName]
	}
	return store
}

export default useStore;
