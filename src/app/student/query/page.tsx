
"use client"

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const QueryForm = dynamic(() => import('@/components/query-form'), { 
  ssr: false,
  loading: () => (
    <div>
        <header className="mb-8">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
        </header>
        <Skeleton className="h-96 w-full" />
    </div>
  )
})

export default function QueryPage() {
  return <QueryForm />
}
