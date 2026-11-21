/**
 * Minimal external store persisted in `localStorage`, consumed through
 * `useSyncExternalStore`. Server render and hydration always use the
 * fallback snapshot, so there is never a hydration mismatch; the persisted
 * value is applied right after hydration.
 */

type Listener = () => void;

export interface PersistentStore<T> {
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  subscribe: (listener: Listener) => () => void;
  update: (updater: (current: T) => T) => void;
}

interface PersistentStoreOptions<T> {
  key: string;
  fallback: T;
  /** Validates untrusted persisted data; must never throw. */
  parse: (raw: unknown) => T;
}

function readStorage(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as unknown);
  } catch {
    // Corrupted JSON or storage disabled (private mode, quota): start fresh.
    return null;
  }
}

function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: state keeps working in memory for this tab.
  }
}

export function createPersistentStore<T>({
  key,
  fallback,
  parse,
}: PersistentStoreOptions<T>): PersistentStore<T> {
  let state: T = fallback;
  let isLoaded = false;
  const listeners = new Set<Listener>();

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  const ensureLoaded = () => {
    if (isLoaded || typeof window === "undefined") {
      return;
    }
    isLoaded = true;
    state = parse(readStorage(key));
  };

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key !== key) {
      return;
    }
    state = parse(readStorage(key));
    emit();
  };

  return {
    getSnapshot: () => {
      ensureLoaded();
      return state;
    },
    getServerSnapshot: () => fallback,
    subscribe: (listener) => {
      listeners.add(listener);
      if (listeners.size === 1) {
        window.addEventListener("storage", handleStorageEvent);
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          window.removeEventListener("storage", handleStorageEvent);
        }
      };
    },
    update: (updater) => {
      ensureLoaded();
      const next = updater(state);
      if (Object.is(next, state)) {
        return;
      }
      state = next;
      writeStorage(key, next);
      emit();
    },
  };
}
