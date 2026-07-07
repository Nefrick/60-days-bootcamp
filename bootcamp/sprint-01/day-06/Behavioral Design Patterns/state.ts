class DocumentItem {
  private state: DocumentState; 
  public content: string;

  constructor() {
    this.state = new DraftDocumentState(this);
    this.content = '';
  }

  getState(): string {
    return this.state.name;
  }

  setState(state: DocumentState): void {
    this.state = state;
    //this.state.setContext(this);
  }

  publish(): void {
    this.state.publish();
  }
  deleteDoc(): void {
    this.state.delete();
  }
}

abstract class DocumentState {
  
  public name: string;
  public item: DocumentItem;

  constructor(item: DocumentItem ) {
    this.item = item;
    this.name = '';
  }

  public setContext(item: DocumentItem): void {
    this.item = item;
  }

  public abstract publish(): void;
  public abstract delete(): void;
 
}

class DraftDocumentState extends DocumentState {
  constructor(item: DocumentItem) {
    super(item);
    this.name = 'Draft';
  }

  public publish(): void {
    console.log('Publishing the document...');
    this.item.setState(new PublishedDocumentState(this.item));
  }

    public delete(): void {
        console.log('Deleting the document...');
        
    }
}

class PublishedDocumentState extends DocumentState {
    constructor(item: DocumentItem) {
        super(item);
        this.name = 'Published';
    }

    public publish(): void {
        console.log('The document is already published.');  
    }

    public delete(): void {
        console.log('Deleting the published document...');
        this.item.setState(new DraftDocumentState(this.item));
        
    }
}

const item = new DocumentItem();
item.content = 'This is a sample document.';
console.log(`Current state: ${item.getState()}`); // Output: Current state: Draft 
item.publish(); // Output: Publishing the document...
console.log(`Current state: ${item.getState()}`); // Output: Current state: Published
item.deleteDoc();
console.log(`Current state: ${item.content}`);
console.log(`Current state: ${item.getState()}`); // Output: Current state: Draft

