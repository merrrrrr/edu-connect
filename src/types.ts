export type Role = 'student' | 'instructor' | 'admin' | null;

export type ViewState = 
  | 'dashboard'
  | 'catalog'
  | 'course_player'
  | 'assessments' // New: For "Submit digital assessments" & "Participate online examinations"
  | 'profile'
  | 'course_management'
  | 'grading'
  | 'communications' // New: For "Communicate with students"
  | 'analytics'
  | 'users'
  | 'evaluations' // New: For "Evaluate instructors"
  | 'coordination' // New: For "Coordinate classes"
  | 'settings';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  rating: number;
  category: string;
  image: string;
  price: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Notification {
  id: string;
  text: string;
  time: string;
  read: boolean;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
}