import { create } from "zustand";

interface UserStoreType {
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    credits: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  isLoading: boolean;
  getUser: () => Promise<void>;
}

const useUser = create<UserStoreType>((set) => ({
  isLoading: false,
  user: null,

  getUser: async () => {
    if (!localStorage.getItem("access-token")) {
      return;
    }
    set({
      isLoading: true,
    });
    try {
      const res = await fetch("/api/v1/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access-token"),
        } as HeadersInit,
      });

      const user = await res.json();

      if (user.success) {
        set({
          user: user.data,
        });
      }
    } catch (error) {
      set({
        user: null,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));

export { useUser };
