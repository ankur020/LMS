"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import CourseCard from './component/CourseCard';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const getAllCourses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/course/get", {
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
  return (
    <div className='flex flex-col items-center justify-center gap-10'>
      <h1 className='text-xl font-semibold text-gray-400 mt-5'>Welcome to TechZEE</h1>
      <h1 className='text-xl font-semibold'>All Courses</h1>
      <div className="flex flex-wrap gap-4">
        {
          allCourses?.map((course: any) => (
            <div key={course._id}>
              <CourseCard course={course} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
