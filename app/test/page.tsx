"use client";
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function TestPage() {
    const session = useSession();
    console.log(session);
    
  return (
    <div>Page</div>
  )
}
