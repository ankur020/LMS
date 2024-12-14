"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { use } from "react";

export default function Update({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        instructor: ""
    });
    const [course, setCourse] = useState<any>({});
    const router = useRouter();
    const getCourse = async (id: string) => {
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:8080/api/course/get/${id}`);
            const data = await res.json();
            if (data.success == false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setFormData({
                title: data.title,
                description: data.description,
                duration: data.duration,
                instructor: data.instructor
            });
            setLoading(false);
        } catch (error: any) {
            setError(error)
        }
    }
    useEffect(() => {
        getCourse(id);
    }, [])
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/update/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (data.success == false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError("");
            router.push(`/courses/${id}`)

        } catch (error: any) {
            setError(error)
        }
    }
    return (
        <div className='mt-10 flex flex-col items-center justify-center gap-5'>
            <h1 className='text-xl font-bold underline'>Update Course</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-5'>
                        <input type="text" value={formData.title} placeholder='Title' id="title"
                            onChange={handleChange} className="border p-3 rounded-lg outline-none" />
                        <input type="text" placeholder='Description' id="description" value={formData.description}
                            onChange={handleChange} className="border p-3 rounded-lg outline-none" />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <input type="text" placeholder='Duration in hours' id="duration"
                            onChange={handleChange} value={formData.duration} className="border p-3 rounded-lg outline-none" />
                        <input type="text" placeholder='Instructor' id="instructor"
                            onChange={handleChange} value={formData.instructor} className="border p-3 rounded-lg outline-none" />
                    </div>
                </div>
                <button type='submit' className='bg-gray-300 text-black rounded-sm p-2 hover:bg-gray-500'>Update</button>
            </form>
        </div>
    )
}
