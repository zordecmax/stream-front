'use client';

import { IconSend2, IconSettings, IconArrowBarToRight } from '@tabler/icons-react';
import Button from '../ui/Button';
import { Message, ChatMessages } from './Message';
import { useLayout } from "@/context/LayoutContext";

interface StreamChatProps {
  messages: ChatMessages[];
}

export default function StreamChat({ messages }: StreamChatProps) {
  const { rightSidebarCollapsed, toggleRightSidebar, isMobile } = useLayout();
  return (
    <>
      <Button
        variant="secondary"
        className={` 
          ${rightSidebarCollapsed ? "fixed top-[var(--navbar-height)] mt-2  right-4" : "!hidden"}
          ${isMobile ? "!hidden" : ""}
        `}
        onClick={toggleRightSidebar}
        disabled={isMobile}
      >
        <IconArrowBarToRight className="w-6 h-6 rotate-180" />
        <span className='ms-2'>Chat</span>
      </Button>

      <aside
        className={`
          bg-[var(--background)]
          transition-all duration-300 ease-in-out
          fixed
          lg:top-[var(--navbar-height)]
          right-0
          bottom-0
          max-h-[calc(100dvh-var(--navbar-height))]
          w-[var(--sidebar-width-right)]
          lg:p-4
          flex flex-col gap-4
          ${isMobile ? "relative w-full max-h-none" : ""}
          ${rightSidebarCollapsed ? "lg:!hidden" : ""}
        `}
      >
        <div className=" shrink-0 flex justify-between gap-6 items-center">
          <h3 className="text-lg md:text-xl font-bold">
            Stream-Chat
          </h3>
          <button
            onClick={() => toggleRightSidebar()}
            disabled={isMobile}
            className={`w-6 h-6 hidden lg:block cursor-pointer`}
          >
            <IconArrowBarToRight className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto scroll-macos">

          {messages.map((msg, index) => {
            const colors = [
              'text-red-400',
              'text-green-400',
              'text-lime-400',
              'text-purple-400',
              'text-orange-400',
              'text-yellow-400',
              'text-blue-400',
            ];
            const color = colors[index % colors.length];

            return (
              <Message
                key={index}
                name={msg.name}
                message={msg.message}
                color={color}
              />
            );
          })}

          {messages.map((msg, index) => {
            const colors = [
              'text-red-400',
              'text-green-400',
              'text-lime-400',
              'text-purple-400',
              'text-orange-400',
              'text-yellow-400',
              'text-blue-400',
            ];
            const color = colors[index % colors.length];

            return (
              <Message
                key={index}
                name={msg.name}
                message={msg.message}
                color={color}
              />
            );
          })}
        </div>

        <div className=" shrink-0 flex flex-col gap-2">
          <form className="relative" action="/send" method="GET">
            <input
              type="text"
              name="q"
              placeholder="Nachricht senden"
              className="w-full text-white placeholder-gray-500 px-4 py-2 pr-10 rounded-lg border border-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <IconSend2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
          </form>

          <div className="flex gap-2 justify-end">
            <Button type="button" size="sm" variant='secondary'>
              <IconSettings className="w-5 h-5" />
            </Button>
            <Button type="button" size="sm">
              Chat
            </Button>
          </div>
        </div>

      </aside>
    </>
  );
}
