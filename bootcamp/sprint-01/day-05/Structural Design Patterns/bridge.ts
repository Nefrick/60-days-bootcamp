interface IProvider {
  sendMessage(message: string): void;
  connect(config: unknown): void;
  disconnect(): void;
}

class TelegramProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(`Sending message via Telegram: ${message}`);
  }

  connect(config: string): void {
    console.log(`Connecting to Telegram with config: ${JSON.stringify(config)}`);
  }

  disconnect(): void {
    console.log("Disconnecting from Telegram");
  } 

}

class WhatsAppProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(`Sending message via WhatsApp: ${message}`);
  } 

    connect(config: string): void {
    console.log(`Connecting to WhatsApp with config: ${JSON.stringify(config)}`);
    }
    
    disconnect(): void {
        console.log("Disconnecting from WhatsApp");
    }
    
}

class NotificationSender {
  private provider: IProvider;

  constructor(provider: IProvider) {
    this.provider = provider;
  }

  send(message: string): void {
    this.provider.sendMessage(message);
  }

  connect(config: string): void {
    this.provider.connect(config);
  }

  disconnect(): void {
    this.provider.disconnect();
  }
}

class DelayNotificationSender extends NotificationSender {
  private delay: number;

  constructor(provider: IProvider, delay: number) {
    super(provider);
    this.delay = delay;
  }

  send(message: string): void {
    setTimeout(() => {
      super.send(message);
    }, this.delay);
  }
}

const sender = new NotificationSender(new TelegramProvider());
sender.connect("Telegram Config");
sender.send("Hello, this is a notification!");
sender.disconnect();

const delayedSender = new DelayNotificationSender(new WhatsAppProvider(), 2000);
delayedSender.connect("WhatsApp Config");
delayedSender.send("Hello, this is a delayed notification!");
delayedSender.disconnect();