import { writable } from "svelte/store";

// Persistent local storage store for JWT.
const createPersistentStore = (key, startValue) => {
    const { subscribe, set, update } = writable(startValue);

    return {
        subscribe,
        set,
        update,
        get: () => {
            const json = localStorage.getItem(key);
            if (json) {
                return JSON.parse(json);
            }
        },
        useLocalStorage: () => {
            const json = localStorage.getItem(key);
            if (json) {
                set(JSON.parse(json));
            }

            subscribe(current => {
                try {
                    localStorage.setItem(key, JSON.stringify(current));
                }
                catch (err) {
                    console.log(err)
                }
            });
        }
    };
};

export const tokenStore = createPersistentStore("tokenStore", {});