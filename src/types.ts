export interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  duration: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'LMS' | 'Instructional Design' | 'Corporate' | 'AI EdTech' | 'Academic';
  modules: string[];
  outcomes: string[];
  popular?: boolean;
}

export interface ConsultationType {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  features: string[];
}

export interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  organization: string;
  projectNotes: string;
  consultationId: string;
  consultationTitle: string;
  amount: number;
  paid: boolean;
  status: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled';
  paymentMethod?: string;
  meetLink?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  bookingId?: string;
  courseId?: string;
  billingName: string;
  billingEmail: string;
  organization: string;
  date: string;
  dueDate: string;
  amount: number;
  description: string;
  status: 'paid' | 'unpaid' | 'overdue';
  transactionId?: string;
  paymentMethod?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  sector: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  metrics: { label: string; value: string }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Storyline Courses' | 'eBooks & OER' | 'ID Tools & AI';
  description: string;
  courseUrl?: string;
  processUrl?: string;
  tags: string[];
  image: string;
  achievements: string[];
}

