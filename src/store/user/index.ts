import { AxiosResponse } from "axios";
import { makeAutoObservable, flow } from "mobx";
import { FileElement } from "../../domains";
import UserDomain from "../../domains/user";
import API from "../../services/api";
import AuthService from "../../services/auth";
import InventoryService, { GetInventoryResponsePayload } from "../../services/inventory";
import dataFormatters from "../../utils/dataFormatters";

class UserStore {
  user: UserDomain;
  inventory: FileElement[] = [];

  authService: AuthService;
  inventoryService: InventoryService;
  constructor(apiProvider: API) {
    makeAutoObservable(this);
    this.user = new UserDomain();
    this.authService = new AuthService(this.user, apiProvider);
    this.inventoryService = new InventoryService(apiProvider);
  }

  getSaved = flow(function* (this: UserStore) {
    try {
      const { data }: AxiosResponse<GetInventoryResponsePayload> = yield this.inventoryService.getInventory();
      this.inventory = data.results.map(
        (item) => new FileElement(dataFormatters.camelize(item))
      );
    } catch (err) {
      console.error(err);
    }
  }) 
}

export default UserStore;
