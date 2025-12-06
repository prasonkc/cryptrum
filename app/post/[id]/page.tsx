
"use client"

import React from 'react'
import { usePathname } from 'next/navigation';

const Post = () => {
    const pathname = usePathname();
    const id = pathname.split("/").pop();
  return (
    <div>
      Hello  {id}
    </div>
  )
}

export default Post
