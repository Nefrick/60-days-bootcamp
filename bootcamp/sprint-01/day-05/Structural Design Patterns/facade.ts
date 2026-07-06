class Notify {
    send(template: string, to: string): void {
        console.log(`Sending ${template} to ${to}`);
    }
}

class Logger {
    logger(message: string): void {
        console.log(`Logging: ${message}`);
    }
}

class Template {
    private templates = [
        {name: 'other', template: '<h1>Other Template</h1>'}
    ];

    getByName(name: string) {        
        return this.templates.find(t => t.name === name)?.template || '';
    }
}


class NotificationFacade {
    private notify: Notify;
    private logger: Logger
    private template: Template;

    constructor() {
        this.notify = new Notify();
        this.logger = new Logger();
        this.template = new Template();
    }


    send(to: string, templateName: string): void {
        const template = this.template.getByName(templateName);
        if (!template) {
            console.log(`Template ${templateName} not found`);
            return;
        }
        this.notify.send(template, to);
        this.logger.logger(`Sent ${templateName} to ${to}`);
    }   
}

const notificationFacade = new NotificationFacade();
notificationFacade.send('user@example.com', 'other');