import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState
} from '@ngrx/signals';

import { computed } from '@angular/core';

type ThemeState = {
    isDark: boolean;
};

const THEME_KEY = 'nexusshop_night_mode';

const getStoredTheme = (): boolean => {
    try {
        const value = localStorage.getItem(THEME_KEY);
        return value === 'true';
    } catch {
        return false;
    }
};

const getSystemTheme = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState: ThemeState = {
    isDark: getStoredTheme()
};

export const ThemeStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store) => ({
        isDarkMode: computed(
            () => store.isDark()
        )
    })),
    withMethods((store) => ({
        toggleTheme() {
            const next = !store.isDark();
            patchState(store, { isDark: next });
            localStorage.setItem(THEME_KEY, String(next));
        },
        setTheme(isDark: boolean) {
            patchState(store, { isDark: isDark });
            localStorage.setItem(THEME_KEY, String(isDark));
        },
        initTheme() {
            const stored = getStoredTheme();
            if (stored) {
                patchState(store, { isDark: true });
            }
        }
    }))
);
