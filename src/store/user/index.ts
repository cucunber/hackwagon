import { AxiosResponse } from "axios";
import { makeAutoObservable, flow, runInAction } from "mobx";
import { FileElement, ISocketFileElement } from "../../domains";
import UserDomain from "../../domains/user";
import { Socket } from "../../services";
import API from "../../services/api";
import AuthService from "../../services/auth";
import InventoryService, {
  GetInventoryResponsePayload,
} from "../../services/inventory";
import dataFormatters from "../../utils/dataFormatters";

class UserStore {
  user: UserDomain;
  inventory: FileElement[] = [];

  authService: AuthService;
  inventoryService: InventoryService;

  private socket: Socket;
  constructor(apiProvider: API, socket: Socket) {
    makeAutoObservable(this);
    this.user = new UserDomain();
    this.socket = socket;
    this.authService = new AuthService(this.user, apiProvider);
    this.inventoryService = new InventoryService(apiProvider);
  }

  getSaved = flow(function* (this: UserStore) {
    try {
      const { data }: AxiosResponse<GetInventoryResponsePayload> =
        yield this.inventoryService.getInventory();
      this.inventory = data.results.map(
        (item) => new FileElement(dataFormatters.camelize(item))
      );
    } catch (err) {
      console.error(err);
    }
  });

  subscribeForChanges(this: UserStore) {
    const socket = new WebSocket("ws://188.72.107.164:8000/ws/main_page/");
    socket.addEventListener("message", (data) => {
      const parsedResult = JSON.parse(data.data);
      if (parsedResult.event === "new file") {
		const newElement = parsedResult.file as ISocketFileElement;
        runInAction(() => {
			if(!this.inventory.find((item) => item.id === newElement.id)){
				this.inventory.push(FileElement.fromSocket(newElement));
			}
		})
      }
    });
  };

  unsubscribeForChanges = flow(function* (this: UserStore) {
    if (this.socket.socket.connected) {
      yield this.socket.disconnect();
    }
  });
}

export default UserStore;
