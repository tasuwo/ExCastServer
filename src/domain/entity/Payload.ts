export interface Payload {
  readonly title: string;
  readonly body: string;
  readonly category: string;

  toJSONString: () => string;
}

export class SimplePayload implements Payload {
  public readonly title: string;
  public readonly body: string;
  public readonly category: string;

  public constructor(title: string, body: string, category: string) {
    this.title = title;
    this.body = body;
    this.category = category;
  }

  public toJSONString(): string {
    const payload = {
      aps: {
        category: this.category,
        alert: {
          title: this.title,
          body: this.body
        }
      }
    };
    const json = {
      APNS_SANDBOX: JSON.stringify(payload)
    };
    return JSON.stringify(json);
  }
}

export class LocalizedPayload implements Payload {
  public readonly title: string;
  public readonly body: string;
  public readonly category: string;

  public constructor(title: string, body: string, category: string) {
    this.title = title;
    this.body = body;
    this.category = category;
  }

  public toJSONString(): string {
    const payload = {
      aps: {
        category: this.category,
        alert: {
          "title-loc-key": this.title,
          "loc-key": this.body
        }
      }
    };
    const json = {
      APNS_SANDBOX: JSON.stringify(payload)
    };
    return JSON.stringify(json);
  }
}
