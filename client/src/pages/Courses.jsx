import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../store/slices/courseSlice";

export default function CourseList() {
  const { list, loading, error } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <ul className="space-y-2">
        {list.map((course) => (
          <li
            key={course.id}
            className="border p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold">{course.title}</h3>
            <p className="text-gray-600">{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
