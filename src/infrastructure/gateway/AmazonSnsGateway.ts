import { notEmpty } from "../../util/notEmpty";
import * as SNS from "aws-sdk/clients/sns";
import { Payload } from "../../domain/entity/Payload";
import { ProviderGateway } from "../../domain/gateway/ProviderGateway";

export class AmazonSnsGateway implements ProviderGateway {
  private readonly snsClient: SNS;
  private readonly platformApplicationArn: string;

  public constructor(snsClient: SNS, platformApplicationArn: string) {
    this.snsClient = snsClient;
    this.platformApplicationArn = platformApplicationArn;
  }

  public async publishAll(payload: Payload): Promise<void> {
    return this.snsClient
      .listEndpointsByPlatformApplication({
        PlatformApplicationArn: this.platformApplicationArn
      })
      .promise()
      .then(response => {
        const endpoints = response.Endpoints;
        if (!notEmpty(endpoints)) {
          // TODO:
          throw new Error();
        }

        const promises = endpoints.map(endpoint =>
          this.snsClient
            .publish({
              Message: payload.toJSONString(),
              MessageStructure: "json",
              TargetArn: endpoint.EndpointArn
            })
            .promise()
        );

        return Promise.all(promises);
      })
      .then(result => {
        // TODO:
        return;
      });
  }
}
