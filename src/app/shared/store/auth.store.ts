import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState
} from '@ngrx/signals';

import { computed } from '@angular/core';

type AuthState = {
    accessToken: string | null;
    loggedIn: boolean;
};

const TOKEN_KEY = 'nexusshop_access_token';

const getStoredToken = (): string | null => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
};

const initialState: AuthState = {
    accessToken: getStoredToken(),
    loggedIn: !!getStoredToken()
};

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store) => ({
        isAuthenticated: computed(
            () => !!store.accessToken()
        )
    })),

    withMethods((store) => ({
        setToken(token: string) {
            patchState(store, {
                accessToken: token,
                loggedIn: true
            });
            localStorage.setItem(TOKEN_KEY, token);
        },

        logout() {
            patchState(store, {
                accessToken: null,
                loggedIn: false
            });
            localStorage.removeItem(TOKEN_KEY);
        }
    }))
);
