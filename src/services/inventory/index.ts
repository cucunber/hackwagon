import { FileElement } from "../../domains";
import API from "../api";

export type GetInventoryResponsePayload = PaginatedResponse<FileElement>;

export type CreateInventoryFileRequestPayload = FormData;

const endpoints = {
  getInventory: "/inventory/file/",
  createInventoryFile: "/inventory/file",
};

class InventoryService {
  private apiInstance: API;
  constructor(apiInstance: API) {
    this.apiInstance = apiInstance;
  }

  async getInventory() {
    const inventoryFiles =
      await this.apiInstance.get<GetInventoryResponsePayload>(
        endpoints.getInventory
      );
    return inventoryFiles;
  }

  async createInventoryFile(payload: CreateInventoryFileRequestPayload) {
    await this.apiInstance.post(endpoints.createInventoryFile, payload);
  }
}

export default InventoryService;
