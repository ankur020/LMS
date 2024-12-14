"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const { id } = use(params);
  const router = useRouter();

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
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

  const handleEnroll = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/user/enroll/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "_id": user._id }),
      })
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setError(error);
        return;
      }
      localStorage.setItem("user", JSON.stringify(data));
      setTimeout(() => {
        window.location.reload(); // Force a browser reload
      }, 1000);
    } catch (error) {

    }
  }
  const getCourse = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/get/${id}`);
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setCourse(data);
      setLoading(false);
    } catch (error: any) {
      setError(error)
    }
  }
  useEffect(() => {
    getCourse(id);
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData)); // Only parse if data exists
    }
  }, [])
  console.log(user)
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center text-red-700 my-7 text-2xl">
          Something Went Wrong!!
        </p>
      )}
      {course && !loading && !error && (
        <>
          <div className="mt-5 p-3 flex flex-col gap-4 max-w-4xl mx-auto">
            <p className="font-semibold text-xl">
              {course.title}
            </p>
            <p>
              <span className="font-semibold text-black">Description - </span>
              {course.description}
            </p>
            <p>
              <span className="font-semibold text-black">Duration - </span>
              {course.duration}
            </p>
            <p>
              <span className="font-semibold text-black">Instructor - </span>
              {course.instructor}
            </p>
            {
              user.admin ? (<div className='flex gap-5 items-center'>
                <span>
                  <Link href={`/dashboard/add/${id}`} className='bg-gray-300 text-black rounded-sm p-2'>
                    <button>Update</button>
                  </Link>
                </span>
                <span>
                  <button onClick={() => handleDelete(id)} className='bg-red-600 text-white rounded-sm p-2'>
                    Delete
                  </button>
                </span>
              </div>) :
                user?.enrolledCourses?.includes(id) ? (<span>
                  <button className='bg-gray-300 text-black rounded-sm p-2' disabled>
                    Enrolled!!
                  </button>
                </span>) : (
                  <span>
                    <button onClick={handleEnroll} className='bg-gray-300 text-black rounded-sm p-2 hover:bg-gray-400'>
                      Enroll
                    </button>
                  </span>
                )
            }
            {
              !user &&
              <>
                <span>
                  <Link href="/signin" className='bg-gray-300 text-black rounded-sm p-2 hover:bg-gray-400'>
                    Sign In to Enroll
                  </Link>
                </span>
              </>
            }
          </div>
        </>
      )}
    </main>
  );
}

export default Page
