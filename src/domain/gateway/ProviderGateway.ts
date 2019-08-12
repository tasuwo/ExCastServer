import { Payload } from "../entity/Payload";

export interface ProviderGateway {
  publishAll(payload: Payload): Promise<void>;
}
