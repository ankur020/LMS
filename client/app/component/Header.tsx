"use client"
import Link from 'next/link';
import React, { useDeferredValue, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Header() {
    const [user, setUser] = useState({});
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("user")
        router.push("/")
        router.refresh(); // Automatically revalidate/reload (if using App Router)
        setTimeout(() => {
            window.location.reload(); // Force a browser reload
        }, 1000);
    }
    useEffect(() => {
        setUser(() => localStorage.getItem("user"))
    }, [])

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link href="/">
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-slate-500">Tech</span>
                        <span className="text-slate-700">Zee</span>
                    </h1>
                </Link>

                <ul className="flex gap-4">
                    <Link href="/">
                        <li className="hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer">
                            Home
                        </li>
                    </Link>

                    {
                        user ? (<Link href="/dashboard">
                            <li className="hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer">
                                Dashboard
                            </li>
                        </Link>) : (<Link href="/signin">
                            <li className="hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer">
                                SignIn
                            </li>
                        </Link>)
                    }
                    {
                        user ? (
                            <li className="hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer" onClick={handleLogout}>
                                Logout
                            </li>
                        ) : (<></>)
                    }


                    {/* {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-7 w-7 object-cover"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-slate-700 hover:underline hover:cursor-pointer">
                Sign In
              </li>
            </Link>
          )} */}
                </ul>
            </div>
        </header>
    );
}
