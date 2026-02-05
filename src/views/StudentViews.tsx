import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Toast } from '../components/UIComponents';
import { MOCK_COURSES, MOCK_ASSESSMENTS } from '../constants';
import { Course } from '../types';
import { Clock, Star, PlayCircle, Download, CheckCircle, CreditCard, Lock, Award, FileText, AlertCircle, Video } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StudentViewProps {
  view: string;
}

export const StudentViews: React.FC<StudentViewProps> = ({ view }) => {
  const [activeCourses, setActiveCourses] = useState(MOCK_COURSES.slice(0, 2));
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setPaymentModalOpen(true);
  };

  const handlePayment = () => {
    if (selectedCourse) {
      setActiveCourses([...activeCourses, { ...selectedCourse, progress: 0 }]);
      setPaymentModalOpen(false);
      setToastMsg(`Successfully enrolled in ${selectedCourse.title}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleDownload = () => {
    setToastMsg("Certificate downloaded successfully");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAssessmentAction = (action: string) => {
    setToastMsg(`${action} Started`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  // --- Dashboard ---
  if (view === 'dashboard') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] rounded-3xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
          <p className="opacity-90">You have 2 upcoming deadlines this week. Keep up the momentum.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">My Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCourses.map(course => (
              <Card key={course.id} className="flex flex-col h-full">
                <div className="h-32 bg-gray-200 relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                    {course.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-[#86868B] mb-4">{course.instructor}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#34C759] rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">Continue</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card className="p-6">
             <h3 className="font-bold mb-4">Study Activity</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{d:'M', v:2}, {d:'T', v:4}, {d:'W', v:3}, {d:'T', v:6}, {d:'F', v:4}, {d:'S', v:8}, {d:'S', v:5}]}>
                     <XAxis dataKey="d" axisLine={false} tickLine={false} />
                     <YAxis hide />
                     <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                     <Line type="monotone" dataKey="v" stroke="#0071E3" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
           </Card>
           
           <Card className="p-6">
             <h3 className="font-bold mb-4">Upcoming Deadlines</h3>
             <div className="space-y-4">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors">
                   <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                     {10 + i} <br/> <span className="text-[10px]">OCT</span>
                   </div>
                   <div>
                     <p className="font-medium text-sm">Python Assignment {i}</p>
                     <p className="text-xs text-[#86868B]">11:59 PM</p>
                   </div>
                   <div className="ml-auto">
                     <Badge color="yellow">Pending</Badge>
                   </div>
                 </div>
               ))}
             </div>
           </Card>
        </div>
      </div>
    );
  }

  // --- Catalog ---
  if (view === 'catalog') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Course Catalog</h1>
          <div className="flex gap-2">
            <Badge color="blue">All</Badge>
            <Badge color="gray">Design</Badge>
            <Badge color="gray">Development</Badge>
            <Badge color="gray">Business</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COURSES.map(course => (
            <Card key={course.id} className="group">
              <div className="h-40 overflow-hidden relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <Badge color="blue">{course.level}</Badge>
                  <div className="flex items-center text-yellow-500 text-xs font-bold gap-1">
                    <Star size={12} fill="currentColor" /> {course.rating}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-[#86868B] mb-3">{course.instructor}</p>
                <div className="flex items-center gap-3 text-xs text-[#86868B] mb-4">
                  <span className="flex items-center gap-1"><Clock size={12}/> {course.duration}</span>
                  <span>•</span>
                  <span>{course.category}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="font-bold text-lg">{course.price}</span>
                  <Button size="sm" onClick={() => handleEnroll(course)}>Enroll Now</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Modal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} title="Secure Checkout">
           <div className="space-y-6">
             <div className="flex items-center gap-4 bg-[#F5F5F7] p-4 rounded-xl">
               <div className="w-16 h-16 rounded-lg bg-gray-300 overflow-hidden">
                  {selectedCourse && <img src={selectedCourse.image} className="w-full h-full object-cover" />}
               </div>
               <div>
                 <p className="font-bold text-sm">{selectedCourse?.title}</p>
                 <p className="text-sm text-[#86868B]">{selectedCourse?.price}</p>
               </div>
             </div>
             
             <div className="space-y-3">
               <label className="text-sm font-medium text-[#86868B]">Payment Method</label>
               <div className="flex gap-3">
                 <div className="flex-1 border border-[#0071E3] bg-[#0071E3]/5 p-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                    <CreditCard size={18} className="text-[#0071E3]"/> <span className="text-sm font-semibold text-[#0071E3]">Card</span>
                 </div>
                 <div className="flex-1 border border-[#E5E5EA] p-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                    <span className="text-sm font-semibold">PayPal</span>
                 </div>
               </div>
             </div>

             <Button className="w-full" size="lg" onClick={handlePayment}>
               Confirm Payment {selectedCourse?.price}
             </Button>
             <p className="text-xs text-center text-[#86868B] flex items-center justify-center gap-1">
               <Lock size={10} /> Secure 256-bit SSL Encrypted payment
             </p>
           </div>
        </Modal>
        
        <Toast message={toastMsg} show={showToast} />
      </div>
    );
  }

  // --- Assessments & Exams (New) ---
  if (view === 'assessments') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Assessments & Exams</h1>
            <p className="text-[#86868B]">Manage your digital submissions and take online examinations.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Pending List */}
           <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="text-orange-500" size={20}/> Pending Items
              </h3>
              <div className="space-y-4">
                {MOCK_ASSESSMENTS.filter(a => a.status === 'Pending').map(item => (
                  <div key={item.id} className="p-4 border border-[#E5E5EA] rounded-xl hover:bg-gray-50 transition-colors">
                     <div className="flex justify-between items-start mb-2">
                        <Badge color={item.type === 'Exam' ? 'red' : 'blue'}>{item.type}</Badge>
                        <span className="text-xs font-medium text-orange-600">Due {item.due}</span>
                     </div>
                     <h4 className="font-bold text-[#1D1D1F]">{item.title}</h4>
                     <p className="text-sm text-[#86868B] mb-4">{item.course}</p>
                     <Button size="sm" className="w-full" onClick={() => handleAssessmentAction(item.type === 'Exam' ? 'Exam' : 'Assignment Upload')}>
                        {item.type === 'Exam' ? 'Start Exam' : 'Upload Assignment'}
                     </Button>
                  </div>
                ))}
              </div>
           </Card>

           {/* Submitted List */}
           <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20}/> Completed
              </h3>
              <div className="space-y-4">
                {MOCK_ASSESSMENTS.filter(a => a.status === 'Submitted').map(item => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-xl opacity-80">
                     <div className="flex justify-between items-start mb-2">
                        <Badge color="green">Submitted</Badge>
                        <span className="text-xs font-medium text-[#86868B]">{item.due}</span>
                     </div>
                     <h4 className="font-bold text-[#1D1D1F]">{item.title}</h4>
                     <p className="text-sm text-[#86868B] mb-2">{item.course}</p>
                     <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle size={12}/> Graded: A (92%)
                     </div>
                  </div>
                ))}
              </div>
           </Card>
         </div>
         <Toast message={toastMsg} show={showToast} />
      </div>
    );
  }

  // --- Player ---
  if (view === 'course_player') {
    return (
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)] animate-in fade-in duration-500">
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-black rounded-2xl w-full aspect-video flex items-center justify-center relative group overflow-hidden shadow-2xl">
             <img src="https://picsum.photos/800/450" className="absolute inset-0 w-full h-full object-cover opacity-60" />
             <div className="absolute inset-0 flex items-center justify-center gap-4">
                <PlayCircle size={64} className="text-white relative z-10 cursor-pointer hover:scale-110 transition-transform duration-200" />
             </div>
             <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
             </div>
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
               <div className="h-1 bg-gray-600 rounded-full w-full mb-2">
                 <div className="h-full bg-[#0071E3] w-1/3 rounded-full relative">
                   <div className="w-3 h-3 bg-white rounded-full absolute -right-1.5 -top-1 shadow"></div>
                 </div>
               </div>
               <div className="flex justify-between text-white text-xs font-medium">
                 <span>04:20</span>
                 <span>12:45</span>
               </div>
             </div>
          </div>
          
          <Card className="p-6 flex-1">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h2 className="text-2xl font-bold">Introduction to React Hooks</h2>
                  <p className="text-sm text-[#86868B]">Lesson 4 • Dr. Sarah Lee</p>
               </div>
               <Button variant="secondary" size="sm" className="gap-2">
                  <Video size={16} /> Join Live Class
               </Button>
            </div>
            
            <div className="prose text-[#86868B]">
              <p>In this lesson, we will explore the fundamental concepts of React Hooks and how they revolutionize state management in functional components. This session includes a live Q&A at the end.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E5E5EA] flex gap-4">
              <Button variant="outline" className="gap-2">
                <Download size={18}/> Resources
              </Button>
              <Button variant="outline" className="gap-2">
                 Discuss
              </Button>
            </div>
          </Card>
        </div>
        
        <Card className="w-full lg:w-80 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-[#E5E5EA] bg-gray-50">
            <h3 className="font-bold">Course Content</h3>
            <p className="text-xs text-[#86868B]">4/12 Completed</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
             {[1,2,3,4,5,6].map((i) => (
               <div key={i} className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer ${i === 1 ? 'bg-[#0071E3]/10' : 'hover:bg-gray-50'}`}>
                 <div className={`mt-0.5 ${i === 1 ? 'text-[#0071E3]' : 'text-gray-400'}`}>
                   {i < 2 ? <CheckCircle size={16} /> : <PlayCircle size={16} />}
                 </div>
                 <div>
                   <p className={`text-sm font-medium ${i === 1 ? 'text-[#0071E3]' : 'text-[#1D1D1F]'}`}>Lesson {i}: Concept Overview</p>
                   <p className="text-xs text-[#86868B]">12 mins</p>
                 </div>
               </div>
             ))}
          </div>
        </Card>
      </div>
    );
  }

  // --- Profile / Certificates ---
  if (view === 'profile') {
    return (
       <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="flex flex-col md:flex-row gap-8">
           <div className="w-full md:w-1/3 space-y-6">
             <Card className="p-6 text-center">
               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0071E3] to-[#5E5CE6] mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                 S
               </div>
               <h2 className="text-xl font-bold">Student User</h2>
               <p className="text-[#86868B] text-sm mb-4">Computer Science Major</p>
               <Button variant="outline" className="w-full">Edit Profile</Button>
             </Card>
             
             <Card className="p-6">
               <h3 className="font-bold mb-4">Skills</h3>
               <div className="flex flex-wrap gap-2">
                 <Badge color="blue">Python</Badge>
                 <Badge color="green">React</Badge>
                 <Badge color="gray">Design</Badge>
                 <Badge color="blue">Data Science</Badge>
               </div>
             </Card>
           </div>
           
           <div className="flex-1 space-y-6">
             <h2 className="text-2xl font-bold">My Certificates</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[1, 2].map(i => (
                 <Card key={i} className="p-0 overflow-hidden group">
                   <div className="h-48 bg-[#F5F5F7] flex items-center justify-center relative border-b border-[#E5E5EA]">
                     <div className="text-center p-4">
                        <Award size={40} className="mx-auto text-[#0071E3] mb-2" />
                        <h4 className="font-serif font-bold text-[#1D1D1F]">Certificate of Completion</h4>
                        <p className="text-xs text-[#86868B] mt-1">Advanced Python</p>
                     </div>
                     <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="sm" onClick={handleDownload} className="shadow-xl">
                          <Download size={16} className="mr-2"/> Download
                        </Button>
                     </div>
                   </div>
                   <div className="p-4 flex justify-between items-center bg-white">
                      <span className="text-xs text-[#86868B]">Issued: Oct 2023</span>
                      <Badge color="green">Verified</Badge>
                   </div>
                 </Card>
               ))}
             </div>
           </div>
         </div>
         <Toast message={toastMsg} show={showToast} />
       </div>
    );
  }

  return <div>View not found</div>;
};