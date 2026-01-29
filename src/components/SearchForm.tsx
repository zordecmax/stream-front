'use client'

import { IconSearch } from '@tabler/icons-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchForm() {
    const searchParams = useSearchParams()
    const [value, setValue] = useState('')

    useEffect(() => {
        setValue(searchParams.get('q') ?? '')
    }, [searchParams])

    return (
        <form
            className="grow relative"
            action="/search"
            method="GET"
        >
            <input
                type="text"
                name="q"
                placeholder="Streams, Spiele oder Nutzer suchen"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </form>
    )
}
