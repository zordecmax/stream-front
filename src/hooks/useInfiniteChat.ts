"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  name: string;
  message: string;
};

type Options = {
  minDelay?: number;
  maxDelay?: number;
};

export function useInfiniteChat(
  messages: ChatMessage[],
  { minDelay = 2000, maxDelay = 3000 }: Options = {}
) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!messages.length) return;

    function loop() {
      setVisibleMessages((prev) => [
        ...prev,
        messages[indexRef.current],
      ]);

      indexRef.current =
        (indexRef.current + 1) % messages.length;

      const delay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) +
        minDelay;

      timeoutRef.current = setTimeout(loop, delay);
    }

    loop();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [messages, minDelay, maxDelay]);

  return visibleMessages;
}
