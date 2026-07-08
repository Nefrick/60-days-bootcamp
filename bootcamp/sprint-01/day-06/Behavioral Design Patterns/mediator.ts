interface Mediator {
  notify(sender: object, event: string): void;
}

abstract class Mediated {
  protected mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Notifications {
    send(){
        console.log("Notification sent");
    }
}

class Logger {
    log(){
        console.log("Log entry created");
    }
}

class EventHandler extends Mediated {
  handleEvent(event: string): void {
    console.log(`Handling event: ${event}`);
    this.mediator.notify(this, event);
  }
}

class NotificationMediator implements Mediator {
  public notifications: Notifications;
  public logger: Logger;

  constructor(notifications: Notifications, logger: Logger) {
    this.notifications = notifications;
    this.logger = logger;
  }

  notify(sender: object, event: string): void {
    switch (event) {
      case 'eventA':
        this.notifications.send();
        break;
      case 'eventB':
        this.logger.log();
        break;
        default:
        console.log(`No action defined for event: ${event}`);
     }
    }
}

const notifications = new Notifications();
const logger = new Logger();
const mediator = new NotificationMediator(notifications, logger);
const eventHandler = new EventHandler(mediator);

console.log("Triggering eventA:");
eventHandler.handleEvent('eventA');
console.log("\nTriggering eventB:");
eventHandler.handleEvent('eventB');
console.log("\nTriggering eventC:");
eventHandler.handleEvent('eventC');
