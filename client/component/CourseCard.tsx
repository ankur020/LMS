import Link from 'next/link';
import React from 'react'

export default function CourseCard({ course }: { course: any }) {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[230px]">
            <Link href={`/courses/${course._id}`}>
                <div className="p-3 flex flex-col gap-2">
                    <p className="truncate text-lg font-semibold text-slate-700">
                        {course.title}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        Description: {course.description}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        Duration: {course.duration}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        Instructior: {course.instructor}
                    </p>
                </div>
            </Link>
        </div>
    );
}
