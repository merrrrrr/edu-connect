import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Toast } from '../components/UIComponents';
import { Plus, UploadCloud, Users, FileText, CheckCircle, Send, MessageSquare } from 'lucide-react';
import { Course } from '../types';
import { MOCK_COURSES, MOCK_MESSAGES } from '../constants';

interface InstructorViewProps {
  view: string;
}

export const InstructorViews: React.FC<InstructorViewProps> = ({ view }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  
  const handleCreateCourse = () => {
    setCreateModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSendMessage = () => {
    if(!messageInput.trim()) return;
    setMessageInput('');
    // Mock send logic
  };

  if (view === 'dashboard') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0071E3] flex items-center justify-center">
               <Users size={24}/>
             </div>
             <div>
               <p className="text-sm text-[#86868B]">Total Students</p>
               <p className="text-2xl font-bold">1,245</p>
             </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
               <FileText size={24}/>
             </div>
             <div>
               <p className="text-sm text-[#86868B]">Pending Grades</p>
               <p className="text-2xl font-bold">14</p>
             </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
               <CheckCircle size={24}/>
             </div>
             <div>
               <p className="text-sm text-[#86868B]">Courses Active</p>
               <p className="text-2xl font-bold">4</p>
             </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Assignments to Grade</h3>
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 border border-[#E5E5EA] rounded-xl">
                  <div>
                    <p className="font-medium text-sm">Final Project - Student #{i}</p>
                    <p className="text-xs text-[#86868B]">Submitted 2h ago</p>
                  </div>
                  <Button size="sm" variant="outline">Grade</Button>
                </div>
              ))}
            </div>
          </Card>
          
           <Card className="p-6 bg-gradient-to-br from-[#1D1D1F] to-[#424245] text-white">
             <h3 className="font-bold mb-2">Live Class Schedule</h3>
             <p className="opacity-70 text-sm mb-6">Your next session starts in 45 minutes.</p>
             <div className="p-4 bg-white/10 backdrop-blur rounded-xl border border-white/10">
               <p className="font-bold">Advanced Python Q&A</p>
               <p className="text-sm opacity-80">10:00 AM - 11:30 AM</p>
             </div>
             <Button className="mt-6 w-full bg-white text-black hover:bg-gray-200">Start Session</Button>
           </Card>
        </div>
      </div>
    );
  }

  // --- Communications / Messaging (New) ---
  if (view === 'communications') {
    return (
      <div className="h-[calc(100vh-8rem)] flex gap-6 animate-in fade-in duration-500">
        {/* Contact List */}
        <Card className="w-full md:w-80 flex flex-col overflow-hidden">
           <div className="p-4 border-b border-[#E5E5EA]">
             <h2 className="font-bold text-lg">Messages</h2>
           </div>
           <div className="flex-1 overflow-y-auto">
             {MOCK_MESSAGES.map(msg => (
               <div key={msg.id} className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-[#E5E5EA] ${msg.id === 1 ? 'bg-blue-50/50' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                     <span className="font-bold text-sm">{msg.student}</span>
                     <span className="text-xs text-[#86868B]">{msg.time}</span>
                  </div>
                  <p className="text-sm text-[#86868B] line-clamp-1">{msg.message}</p>
                  {msg.unread && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>}
               </div>
             ))}
           </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col overflow-hidden hidden md:flex">
           <div className="p-4 border-b border-[#E5E5EA] flex justify-between items-center bg-[#F5F5F7]/50">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">AS</div>
               <div>
                 <h3 className="font-bold">Alice Smith</h3>
                 <p className="text-xs text-[#86868B]">Online</p>
               </div>
             </div>
           </div>
           
           <div className="flex-1 bg-[#F5F5F7]/30 p-6 space-y-4 overflow-y-auto">
              <div className="flex justify-end">
                <div className="bg-[#0071E3] text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-sm text-sm">
                  Hello Alice, how are you finding the course material?
                </div>
              </div>
              <div className="flex justify-start">
                 <div className="bg-white border border-[#E5E5EA] text-[#1D1D1F] px-4 py-2 rounded-2xl rounded-tl-sm max-w-sm text-sm shadow-sm">
                    Hi Professor, I had a question about module 3. Specifically about the array methods.
                 </div>
              </div>
           </div>

           <div className="p-4 border-t border-[#E5E5EA] flex gap-2">
             <input 
               type="text" 
               className="flex-1 bg-[#F5F5F7] rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20"
               placeholder="Type a message..."
               value={messageInput}
               onChange={(e) => setMessageInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
             />
             <Button className="rounded-full w-10 h-10 p-0 flex items-center justify-center" onClick={handleSendMessage}>
               <Send size={18} className="ml-0.5 mt-0.5" />
             </Button>
           </div>
        </Card>
      </div>
    );
  }

  if (view === 'course_management') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
            <Plus size={18} /> Create New
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MOCK_COURSES.slice(0, 3).map(course => (
            <Card key={course.id} className="p-4 flex flex-col md:flex-row gap-4 items-center">
              <img src={course.image} className="w-full md:w-32 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{course.title}</h3>
                <div className="flex gap-4 text-xs text-[#86868B] mt-1">
                  <span>{course.category}</span>
                  <span>{course.price}</span>
                  <span>{course.rating} Rating</span>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm" className="flex-1 md:flex-none">Edit</Button>
                <Button variant="outline" size="sm" className="flex-1 md:flex-none">Analytics</Button>
              </div>
            </Card>
          ))}
        </div>

        <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Course">
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium mb-1">Course Title</label>
               <input type="text" className="w-full p-2 rounded-lg border border-[#E5E5EA] focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="e.g. Intro to AI" />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Category</label>
               <select className="w-full p-2 rounded-lg border border-[#E5E5EA]">
                 <option>Data Science</option>
                 <option>Design</option>
                 <option>Marketing</option>
               </select>
             </div>
             
             <div className="border-2 border-dashed border-[#E5E5EA] rounded-xl p-8 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
               <UploadCloud className="mx-auto text-gray-400 mb-2" size={32} />
               <p className="text-sm font-medium text-gray-600">Drag and drop course content here</p>
               <p className="text-xs text-gray-400">Video, PDF, or Slides</p>
             </div>

             <Button className="w-full" onClick={handleCreateCourse}>Publish Course</Button>
           </div>
        </Modal>

        <Toast message="Course Created Successfully" show={showToast} />
      </div>
    );
  }

  if (view === 'grading') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <h1 className="text-2xl font-bold">Grading Portal</h1>
         <Card className="overflow-hidden">
           <table className="w-full text-left">
             <thead className="bg-[#F5F5F7] text-[#86868B] text-xs uppercase font-semibold">
               <tr>
                 <th className="px-6 py-4">Student</th>
                 <th className="px-6 py-4">Assignment</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Action</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-[#E5E5EA]">
               {[1, 2, 3, 4].map(i => (
                 <tr key={i} className="hover:bg-gray-50">
                   <td className="px-6 py-4 font-medium text-sm">Student Name #{i}</td>
                   <td className="px-6 py-4 text-sm text-[#86868B]">Module 3 Assessment</td>
                   <td className="px-6 py-4">
                     <Badge color={i % 2 === 0 ? "green" : "yellow"}>{i % 2 === 0 ? "Graded" : "Pending"}</Badge>
                   </td>
                   <td className="px-6 py-4">
                     <Button size="sm" variant="ghost">Open</Button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </Card>
      </div>
    );
  }

  return <div>View Not Found</div>;
};