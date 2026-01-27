'use client';

import { IconSend2, IconSettings, IconArrowBarToRight } from '@tabler/icons-react';
import Button from '../Button';
import { Message, ChatMessages } from './Message';

interface StreamChatProps {
  messages: ChatMessages[];
}

export default function StreamChat({ messages }: StreamChatProps) {
  return (
    <aside className="md:basis-96 p-4 space-y-8 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-bold text-white">
          Stream-Chat
        </h3>
        <IconArrowBarToRight className="w-6 h-6" />
      </div>
      <div className="space-y-4 grow">
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

      <div className="flex flex-col gap-2">
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
  );
}
