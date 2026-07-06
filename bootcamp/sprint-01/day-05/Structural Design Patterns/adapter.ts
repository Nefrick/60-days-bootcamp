class KVDatabase {
  private db: Map<string, any> = new Map();

  save(key: string, value: string): void {
    this.db.set(key, value);
  }

  get(key: string): string | undefined {
    return this.db.get(key);
  }
}

class PersistentDB {
    savePersistent(data: object): void {
        console.log('Saving data to persistent storage:', data);
    }
}

class PersistentDBAdapter extends KVDatabase {
   

    constructor(public database: PersistentDB) {
        super();
        this.database = database;
    }

    save(key: string, value: string): void {
        this.database.savePersistent({ [key]: value });
    }
}

function run(base: KVDatabase) {
    base.save('key', 'value');
}

run(new PersistentDBAdapter(new PersistentDB()));