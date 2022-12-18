import API from "../services/api"
import UserStore from "./user";

const baseURL = process.env.REACT_APP_API_URL || ''

class RootStore {
    private apiInstance: API
    userStore: UserStore
    constructor(){
        this.apiInstance = new API({ baseURL });
        this.userStore = new UserStore(this.apiInstance);
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
