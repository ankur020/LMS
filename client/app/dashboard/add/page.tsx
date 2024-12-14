"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Add() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({});
    const router = useRouter();
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/add`, {
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
            router.push("/dashboard")

        } catch (error: any) {
            setError(error)
        }
    }
    return (
        <div className='mt-10 flex flex-col items-center justify-center gap-5'>
            <h1 className='text-xl font-bold underline'>Add New Course</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-5'>
                        <input type="text" placeholder='Title' id="title"
                            onChange={handleChange} className="border p-3 rounded-lg outline-none" />
                        <input type="text" placeholder='Description' id="description"
                            onChange={handleChange} className="border p-3 rounded-lg outline-none" />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <input type="text" placeholder='Duration in hours' id="duration"
                            onChange={handleChange} className="border p-3 rounded-lg outline-none" />
                        <input type="text" placeholder='Instructor' id="instructor"
                            onChange={handleChange} className="border p-3 rounded-lg outline-none" />
                    </div>
                </div>
                <button type='submit' className='bg-gray-300 text-black rounded-sm p-2 hover:bg-gray-500'>Add</button>
            </form>
        </div>
    )
}
