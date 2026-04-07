const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  getCourses: async () => {
    const response = await fetch(`${API_BASE_URL}/courses`);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch courses');
    }
    return response.json();
  },

  getCourseById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch course');
    }
    return response.json();
  },

  enrollCourse: async (courseId, userId) => {
    const response = await fetch(`${API_BASE_URL}/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, userId }),
    });
    if (!response.ok) throw new Error('Failed to enroll');
    return response.json();
  },

  getUserEnrollments: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/enrollments`);
    if (!response.ok) throw new Error('Failed to fetch enrollments');
    return response.json();
  },
};
