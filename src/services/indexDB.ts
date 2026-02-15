import type { Trip } from "../Types/TripTypes";

const dbName = "memoryMap";
const storeName = "trip";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
    request.onblocked = () => {
      console.warn(
        "Database upgrade blocked by another tab. Please close other tabs.",
      );
    };
  });
}

export async function saveTrip(data: Trip): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    // .put() handles both adding and modifying
    const request = store.put(data);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Error saving data");
  });
}

export async function getAllTrips(): Promise<Trip[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    // getAll() is the most efficient way to grab the entire collection
    const request: IDBRequest<Trip[]> = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
