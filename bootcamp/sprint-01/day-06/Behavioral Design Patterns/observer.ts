interface Observer {
  update(subject: Subject): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class Lead {
    constructor(public name: string, public email: string) {}
}

class NewLeadSubject implements Subject {
  private observers: Observer[] = [];
  public state: Lead | null = null;

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
        this.observers.push(observer);
    }
    return;
  } 
  
  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    console.log(`Detaching observer: ${index !== -1 ? 'Found and removed' : 'Not found'}`);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

class EmailNotificationObserver implements Observer {
  update(subject: Subject): void {
    if (subject instanceof NewLeadSubject && subject.state) {
        console.log(`Sending email notification for new lead: ${subject.state.name} (${subject.state.email})`);
      }
    }
}

class CRMSystemObserver implements Observer {
  update(subject: Subject): void {
    if (subject instanceof NewLeadSubject && subject.state) {
        console.log(`Updating CRM system with new lead: ${subject.state.name} (${subject.state.email})`);
      }
    }
}

const newLeadSubject = new NewLeadSubject();
const emailObserver = new EmailNotificationObserver();
const crmObserver = new CRMSystemObserver();

newLeadSubject.attach(emailObserver);
newLeadSubject.attach(crmObserver);

newLeadSubject.state = new Lead("John Doe", "john.doe@example.com");
newLeadSubject.notify();
newLeadSubject.detach(emailObserver);
