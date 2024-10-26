import { create } from "zustand";

const useNumberGame = create((set) => ({
  totalWinners: Number(localStorage.getItem("totalWinners")) || 1,
  totalPlayers: Number(localStorage.getItem("totalPlayers")) || 6,
  playerList: [],
  winnerList: [],
  gameStatus: false,

  resetWinnerList: () => set({ winnerList: [] }),

  setWinnerList: (winner) =>
    set((state) => ({ winnerList: [...state.winnerList, winner] })),
  setGameStatus: () => set((state) => ({ gameStatus: !state.gameStatus })),

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
