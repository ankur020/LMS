'use client'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';

export default function UserDashboard() {
  const [user, setUser] = useState<any>({});
  const [courseData, setCourseData] = useState<any[]>([]);

  const fetchCourses = async () => {
    try {
      // Ensure `enrolledCourses` exists and is an array before mapping
      if (user?.enrolledCourses && Array.isArray(user.enrolledCourses)) {
        const courses = await Promise.all(
          user.enrolledCourses.map(async (courseId: any) => {
            const course = await fetchCourseData(courseId);
            return course; // Fetch and return the course data
          })
        );
        setCourseData(courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Function to fetch course data (replace with actual API call)
  const fetchCourseData = async (courseId: any) => {
    const response = await fetch(`http://localhost:8080/api/course/get/${courseId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course data for ID: ${courseId}`);
    }
    const data = await response.json();
    return data;
  };

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch courses whenever `user` changes
  useEffect(() => {
    if (user?.enrolledCourses) {
      fetchCourses();
    }
  }, [user]);
  return (
    <div className='flex flex-col items-center justify-center gap-10'>
      <h1 className='text-xl font-semibold'>Enrolled Courses</h1>
      <div className="flex flex-wrap gap-4">
        {
          courseData?.map((course: any) => (
            <div key={course._id}>
              <CourseCard course={course} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
