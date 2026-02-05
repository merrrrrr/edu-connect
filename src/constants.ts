import { Course, Notification } from './types';
import { LayoutDashboard, BookOpen, Settings, BarChart, Users, Award, PlayCircle, FileText, PenTool, MessageSquare, Star, Calendar } from 'lucide-react';

export const APP_NAME = "EduConnect";

export const MOCK_COURSES: Course[] = [
  { 
    id: 'c1', 
    title: "Advanced Python for Data Science", 
    instructor: "Dr. Sarah Lee", 
    progress: 75, 
    rating: 4.8, 
    category: "Data Science", 
    image: "https://picsum.photos/400/250?random=1",
    price: "RM 199",
    duration: "12 Weeks",
    level: "Advanced"
  },
  { 
    id: 'c2', 
    title: "Digital Marketing Mastery", 
    instructor: "Mark Johnson", 
    progress: 10, 
    rating: 4.5, 
    category: "Marketing", 
    image: "https://picsum.photos/400/250?random=2",
    price: "RM 149",
    duration: "8 Weeks",
    level: "Beginner"
  },
  { 
    id: 'c3', 
    title: "Financial Accounting Basics", 
    instructor: "EduConnect Partner", 
    progress: 0, 
    rating: 4.2, 
    category: "Finance", 
    image: "https://picsum.photos/400/250?random=3",
    price: "RM 99",
    duration: "4 Weeks",
    level: "Intermediate"
  },
  { 
    id: 'c4', 
    title: "UI/UX Design Principles", 
    instructor: "Jane Doe", 
    progress: 0, 
    rating: 4.9, 
    category: "Design", 
    image: "https://picsum.photos/400/250?random=4",
    price: "RM 120",
    duration: "6 Weeks",
    level: "Beginner"
  },
  { 
    id: 'c5', 
    title: "Machine Learning A-Z", 
    instructor: "Dr. Alan Turing", 
    progress: 0, 
    rating: 4.7, 
    category: "Data Science", 
    image: "https://picsum.photos/400/250?random=5",
    price: "RM 299",
    duration: "16 Weeks",
    level: "Advanced"
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', text: "Your assignment for Python 101 has been graded.", time: "2 hours ago", read: false },
  { id: 'n2', text: "New course material available in Digital Marketing.", time: "1 day ago", read: true },
  { id: 'n3', text: "Upcoming maintenance scheduled for Sunday.", time: "2 days ago", read: true }
];

export const ADMIN_STATS = {
  revenue: "RM 45,200",
  active_students: "1,240",
  completion_rate: "92%"
};

// Admin Chart Data
export const REVENUE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 7500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 9000 },
];

export const CATEGORY_DATA = [
  { name: 'Tech', value: 400 },
  { name: 'Business', value: 300 },
  { name: 'Art', value: 300 },
  { name: 'Health', value: 200 },
];

export const NAV_ITEMS = {
  student: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog', label: 'Course Catalog', icon: BookOpen },
    { id: 'course_player', label: 'My Learning', icon: PlayCircle },
    { id: 'assessments', label: 'Exams & Tasks', icon: PenTool }, // New
    { id: 'profile', label: 'Certificates', icon: Award },
  ],
  instructor: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'course_management', label: 'My Courses', icon: BookOpen },
    { id: 'grading', label: 'Grading Portal', icon: FileText },
    { id: 'communications', label: 'Messages', icon: MessageSquare }, // New
  ],
  admin: [
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'coordination', label: 'Class Schedule', icon: Calendar }, // New
    { id: 'evaluations', label: 'Evaluations', icon: Star }, // New
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]
};

// --- Mock Data for New Views ---

export const MOCK_ASSESSMENTS = [
  { id: 1, title: 'Python Final Exam', course: 'Advanced Python', type: 'Exam', due: 'Oct 28, 2023', status: 'Pending' },
  { id: 2, title: 'UX Research Paper', course: 'UI/UX Design', type: 'Assignment', due: 'Oct 30, 2023', status: 'Pending' },
  { id: 3, title: 'Financial Report Analysis', course: 'Accounting Basics', type: 'Assignment', due: 'Oct 20, 2023', status: 'Submitted' },
];

export const MOCK_MESSAGES = [
  { id: 1, student: 'Alice Smith', message: 'Hi Professor, I had a question about module 3.', time: '10:30 AM', unread: true },
  { id: 2, student: 'John Doe', message: 'Thanks for the feedback!', time: 'Yesterday', unread: false },
  { id: 3, student: 'Emma Wilson', message: 'When is the next live session?', time: 'Oct 22', unread: false },
];

export const MOCK_INSTRUCTORS = [
  { id: 1, name: 'Dr. Sarah Lee', department: 'Computer Science', rating: 4.8, reviews: 124 },
  { id: 2, name: 'Mark Johnson', department: 'Marketing', rating: 4.5, reviews: 89 },
  { id: 3, name: 'Jane Doe', department: 'Design', rating: 4.9, reviews: 210 },
];