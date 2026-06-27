import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  login: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  setUser: (user) => set({ user }),
}));

export const useGameStore = create((set) => ({
  balance: 1000,
  gameHistory: [],
  updateBalance: (balance) => set({ balance }),
  addGameResult: (result) => set((state) => ({
    gameHistory: [result, ...state.gameHistory],
  })),
}));
