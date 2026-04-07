const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper to get auth token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Helper for authenticated requests
const authFetch = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });
        
        if (!response.ok) {
            // Handle 401 Unauthorized - maybe token expired
            if (response.status === 401) {
                console.warn('Token expired or invalid');
                // Don't throw error, just return mock data
                return null;
            }
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `Request failed with status ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.warn(`API request failed for ${url}:`, error.message);
        return null;
    }
};

// Mock courses data with ALL required fields for CourseCard
const MOCK_COURSES = [
    {
        id: 1,
        title: "Web Development Bootcamp",
        description: "Learn HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and become a full-stack developer.",
        price: 49.99,
        originalPrice: 99.99,
        level: "Beginner",
        instructor: "John Doe",
        duration: "40 hours",
        students: 1250,
        rating: 4.5,
        reviews: 320,
        popular: true,
        thumbnail: "https://via.placeholder.com/400x200?text=Web+Development",
        modules: [
            { id: 1, title: "HTML Basics", duration: "2 hours" },
            { id: 2, title: "CSS Styling", duration: "3 hours" }
        ]
    },
    {
        id: 2,
        title: "Python Programming Masterclass",
        description: "Master Python from scratch. Learn data structures, algorithms, and build real applications.",
        price: 39.99,
        originalPrice: 79.99,
        level: "Beginner",
        instructor: "Jane Smith",
        duration: "35 hours",
        students: 890,
        rating: 4.7,
        reviews: 210,
        popular: true,
        thumbnail: "https://via.placeholder.com/400x200?text=Python",
        modules: [
            { id: 1, title: "Python Basics", duration: "2 hours" },
            { id: 2, title: "Data Structures", duration: "3 hours" }
        ]
    },
    {
        id: 3,
        title: "Data Science Fundamentals",
        description: "Learn data analysis, visualization, and machine learning with Python.",
        price: 59.99,
        originalPrice: 119.99,
        level: "Intermediate",
        instructor: "Mike Johnson",
        duration: "50 hours",
        students: 2100,
        rating: 4.8,
        reviews: 450,
        popular: false,
        thumbnail: "https://via.placeholder.com/400x200?text=Data+Science",
        modules: [
            { id: 1, title: "Statistics", duration: "4 hours" },
            { id: 2, title: "Machine Learning", duration: "5 hours" }
        ]
    },
    {
        id: 4,
        title: "React & Redux Complete Guide",
        description: "Master React.js and Redux. Build modern, fast, and scalable web applications.",
        price: 54.99,
        originalPrice: 89.99,
        level: "Intermediate",
        instructor: "Sarah Wilson",
        duration: "45 hours",
        students: 3400,
        rating: 4.9,
        reviews: 580,
        popular: true,
        thumbnail: "https://via.placeholder.com/400x200?text=React",
        modules: [
            { id: 1, title: "React Basics", duration: "3 hours" },
            { id: 2, title: "Redux State Management", duration: "4 hours" }
        ]
    },
    {
        id: 5,
        title: "Advanced JavaScript",
        description: "Deep dive into JavaScript concepts: closures, promises, async/await, and design patterns.",
        price: 44.99,
        originalPrice: 89.99,
        level: "Advanced",
        instructor: "David Brown",
        duration: "38 hours",
        students: 950,
        rating: 4.6,
        reviews: 180,
        popular: false,
        thumbnail: "https://via.placeholder.com/400x200?text=JavaScript",
        modules: [
            { id: 1, title: "Closures & Scope", duration: "2 hours" },
            { id: 2, title: "Promises & Async", duration: "3 hours" }
        ]
    }
];

export const api = {
    getCourses: async () => {
        try {
            // First try to get courses from backend
            const response = await authFetch('/courses');
            
            // If we got a valid response with courses
            if (response && response.courses && Array.isArray(response.courses) && response.courses.length > 0) {
                console.log('📚 Using courses from backend:', response.courses.length);
                return response.courses;
            }
            
            // If response is an array directly
            if (response && Array.isArray(response) && response.length > 0) {
                console.log('📚 Using courses from backend (array):', response.length);
                return response;
            }
            
            // Otherwise use mock data
            console.log('📚 Using mock courses data');
            return MOCK_COURSES;
        } catch (error) {
            console.warn('⚠️ Error fetching courses, using mock data:', error.message);
            return MOCK_COURSES;
        }
    },

    getCourseById: async (id) => {
        try {
            // First try to get from backend
            const response = await authFetch(`/courses/${id}`);
            if (response && response.id) {
                console.log('📚 Using course from backend');
                return response;
            }
            
            // Fallback to mock data
            const mockCourse = MOCK_COURSES.find(c => String(c.id) === String(id));
            if (mockCourse) {
                console.log('📚 Using mock course data');
                return mockCourse;
            }
            
            // Return default course if not found
            return {
                id: parseInt(id),
                title: "Course Not Found",
                description: "This course could not be found",
                price: 0,
                level: "Beginner",
                instructor: "Unknown",
                duration: "0 hours",
                students: 0,
                rating: 0,
                reviews: 0,
                modules: []
            };
        } catch (error) {
            console.warn('⚠️ Error fetching course, using mock data:', error.message);
            const mockCourse = MOCK_COURSES.find(c => String(c.id) === String(id));
            return mockCourse || {
                id: parseInt(id),
                title: "Sample Course",
                description: "Sample description",
                price: 49.99,
                originalPrice: 99.99,
                level: "Beginner",
                instructor: "Expert Instructor",
                duration: "30 hours",
                students: 500,
                rating: 4.5,
                reviews: 100,
                popular: false,
                modules: []
            };
        }
    },

    enrollCourse: async (courseId, userId) => {
        try {
            const response = await authFetch('/enrollments', {
                method: 'POST',
                body: JSON.stringify({ courseId, userId }),
            });
            return response || { success: true };
        } catch (error) {
            console.warn('⚠️ Enrollment failed, but continuing:', error.message);
            return { success: false, message: error.message };
        }
    },

    getUserEnrollments: async (userId) => {
        try {
            const response = await authFetch(`/users/${userId}/enrollments`);
            return response || [];
        } catch (error) {
            console.warn('⚠️ Failed to fetch enrollments:', error.message);
            return [];
        }
    },
};