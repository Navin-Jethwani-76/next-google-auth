"use client";

import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  return null;
};

export default function useUser() {
  const { data, error, isLoading, mutate } = useSWR("/api/auth", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    isLoading,
    error,
    isLoggedIn: data ? true : false,
    user: data && data.user,
    mutate,
  };
}
