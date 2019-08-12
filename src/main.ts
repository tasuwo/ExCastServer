import fetch from "node-fetch";
(global as any)["fetch"] = fetch;

import * as AWS from "aws-sdk";
import { AmazonSnsGateway } from "./infrastructure/gateway/AmazonSnsGateway";
import { SimplePayload } from "./domain/entity/Payload";
import { SNS } from "aws-sdk";
import { notEmpty } from "./util/notEmpty";
import {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  AMAZON_SNS_APPLICATION_PLATFORM_ARN
} from "./util/config";

if (notEmpty(ACCESS_KEY_ID) && notEmpty(SECRET_ACCESS_KEY)) {
  AWS.config.region = "ap-northeast-1";
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  });
}

if (notEmpty(AMAZON_SNS_APPLICATION_PLATFORM_ARN)) {
  const gateway = new AmazonSnsGateway(
    new SNS(),
    AMAZON_SNS_APPLICATION_PLATFORM_ARN
  );

  const payload = new SimplePayload(
    "test title",
    "test message",
    "test category"
  );

  gateway
    .publishAll(payload)
    .then(() => {
      console.log("success");
    })
    .catch(err => {
      console.log("fail: " + err);
    });
}
