import React, { useState, useEffect } from 'react'
import CourseCard from './CourseCard';
import Link from 'next/link';

export default function AdminDashboard() {
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [allCourses, setAllCourses] = useState([]);
    const getAllCourses = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json();
            console.log(data)
            if (data.success === false) {
                setLoading(false);
                setError(data.message)
                return;
            }
            setAllCourses(data);
        } catch (error: any) {
            setError(error)
        }
    }
    useEffect(() => {
        getAllCourses();
    }, [])
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData)); // Only parse if data exists
        }
    }, []);
    return (
        <div>
            <div>
                <Link href="/dashboard/add">
                    <button className='bg-gray-300 text-black rounded-sm p-2'>
                        Add New Course
                    </button>
                </Link>
            </div>
            <div className='flex flex-col items-center justify-center gap-10'>
                <h1 className='text-xl font-semibold'>All Courses</h1>
                <div className="flex flex-wrap gap-4">
                    {allCourses?.map((course: any) => (
                        <div key={course._id}>
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
