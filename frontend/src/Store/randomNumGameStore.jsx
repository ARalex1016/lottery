import { create } from "zustand";

const useNumberGame = create((set) => ({
  totalWinners: Number(localStorage.getItem("totalWinners")) || 1,
  totalPlayers: Number(localStorage.getItem("totalPlayers")) || 6,
  playerList: [],
  winnerList: [],
  gameStatus: false,

  resetWinnerList: () => set({ winnerList: [] }),

  setGameStatus: () => set((state) => ({ gameStatus: !state.gameStatus })),

  setWinnerList: (winner) =>
    set((state) => ({ winnerList: [...state.winnerList, winner] })),

  setPlayerList: (nameList) => set({ playerList: nameList }),

  setTotalWinners: (num) => set({ totalWinners: Number(num) }),

  addPlayer: (num) =>
    set((state) => ({
      totalPlayers: state.totalPlayers + num,
    })),

  minusPlayer: (num) =>
    set((state) => ({ totalPlayers: state.totalPlayers - num })),
}));

export default useNumberGame;
