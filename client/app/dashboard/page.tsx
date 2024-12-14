"use client"
import React, { useEffect, useState } from 'react'
import Courses from '../component/Courses'
import AdminDashboard from '../component/AdminDashboard'
import UserDashboard from '../component/UserDashboard';

export default function Dashboard() {

    const [user, setUser] = useState<any>({});

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])


    return (
        <div>
            {
                user?.admin ? (
                    <AdminDashboard />
                ) : (
                    <UserDashboard />
                )
            }
        </div>
    )
}
