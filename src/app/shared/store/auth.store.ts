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

const initialState: AuthState = {
    accessToken: null,
    loggedIn: false
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
        },

        logout() {
            patchState(store, {
                accessToken: null,
                loggedIn: false
            });
        }
    }))
);
