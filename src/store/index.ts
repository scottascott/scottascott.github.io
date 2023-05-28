
import { create } from "zustand";
import { combine } from "zustand/middleware";


const useGithubInfoStore = create(
    combine(
        {
            personalContributions:0,
            workContributions:0
        },
        (set) => ({
            setPersonalContributions: (c:number) => set((state) => ({ personalContributions: c })),
            setWorkContributions: (c:number) => set((state) => ({ workContributions: c })),
        })
    )
);

export { useGithubInfoStore };
