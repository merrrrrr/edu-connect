import React from 'react';
import { Card, Badge, Button } from '../components/UIComponents';
import { ADMIN_STATS, REVENUE_DATA, CATEGORY_DATA, MOCK_INSTRUCTORS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { MoreHorizontal, Star, Calendar, Clock, MapPin } from 'lucide-react';

interface AdminViewProps {
  view: string;
}

const COLORS = ['#0071E3', '#5E5CE6', '#34C759', '#FF9F0A'];

export const AdminViews: React.FC<AdminViewProps> = ({ view }) => {
  if (view === 'analytics') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Overview</h1>
          <div className="flex gap-2">
            <select className="bg-white border border-[#E5E5EA] rounded-lg px-3 py-1 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Year to Date</option>
            </select>
            <Button size="sm" variant="outline">Export</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(ADMIN_STATS).map(([key, value], idx) => (
            <Card key={key} className="p-6">
               <p className="text-sm text-[#86868B] uppercase font-semibold mb-1">{key.replace('_', ' ')}</p>
               <p className="text-3xl font-bold">{value}</p>
               <p className="text-xs text-green-500 mt-2 font-medium">+12% from last month</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 min-h-[400px]">
            <h3 className="font-bold mb-6">Revenue Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0071E3" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0071E3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#86868B', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#86868B', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}/>
                  <Area type="monotone" dataKey="value" stroke="#0071E3" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 min-h-[400px]">
            <h3 className="font-bold mb-6">Enrollment by Category</h3>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-2xl font-bold">1.2k</span>
                <span className="text-xs text-[#86868B]">Total</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {CATEGORY_DATA.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                     <span className="text-[#1D1D1F]">{entry.name}</span>
                   </div>
                   <span className="text-[#86868B]">{entry.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // --- Instructor Evaluations (New) ---
  if (view === 'evaluations') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <h1 className="text-2xl font-bold">Instructor Evaluations</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_INSTRUCTORS.map(instructor => (
               <Card key={instructor.id} className="p-6">
                 <div className="flex items-start justify-between mb-4">
                   <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                     {instructor.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg text-sm font-bold">
                      <Star size={14} fill="currentColor"/> {instructor.rating}
                   </div>
                 </div>
                 <h3 className="font-bold text-lg">{instructor.name}</h3>
                 <p className="text-sm text-[#86868B] mb-4">{instructor.department}</p>
                 <div className="flex justify-between items-center text-sm border-t border-[#E5E5EA] pt-4">
                    <span className="text-[#86868B]">{instructor.reviews} Reviews</span>
                    <Button size="sm" variant="outline">View Report</Button>
                 </div>
               </Card>
            ))}
         </div>
      </div>
    );
  }

  // --- Class Coordination (New) ---
  if (view === 'coordination') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Class Schedule Coordination</h1>
            <Button className="gap-2"><Calendar size={18} /> Schedule New Class</Button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Mock */}
            <Card className="lg:col-span-2 p-6">
               <h3 className="font-bold mb-4">Weekly Overview</h3>
               <div className="grid grid-cols-7 gap-px bg-[#E5E5EA] border border-[#E5E5EA] rounded-lg overflow-hidden text-center text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                     <div key={d} className="bg-[#F5F5F7] py-2 font-semibold text-[#86868B]">{d}</div>
                  ))}
                  {Array.from({length: 35}).map((_, i) => {
                     const day = i - 2; // Offset for mock date
                     const isToday = day === 24;
                     return (
                       <div key={i} className={`bg-white h-24 p-2 relative hover:bg-gray-50 transition-colors ${day <= 0 ? 'text-gray-300' : ''}`}>
                          <span className={`block w-6 h-6 rounded-full flex items-center justify-center text-xs ${isToday ? 'bg-[#0071E3] text-white' : ''}`}>
                            {day > 0 ? day : 30 + day}
                          </span>
                          {/* Mock Events */}
                          {day === 24 && <div className="mt-1 text-[10px] bg-blue-100 text-blue-700 p-1 rounded truncate text-left">Python 101</div>}
                          {day === 25 && <div className="mt-1 text-[10px] bg-purple-100 text-purple-700 p-1 rounded truncate text-left">UX Design Lab</div>}
                       </div>
                     )
                  })}
               </div>
            </Card>

            {/* Upcoming Classes List */}
            <Card className="p-6">
               <h3 className="font-bold mb-4">Upcoming Sessions</h3>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors border-l-4 border-[#0071E3]">
                        <div className="bg-gray-100 p-2 rounded-lg text-center min-w-[3rem]">
                           <span className="block text-xs font-bold text-[#86868B]">OCT</span>
                           <span className="block text-lg font-bold text-[#1D1D1F]">{24+i}</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-sm">Introduction to AI</h4>
                           <div className="flex items-center gap-3 text-xs text-[#86868B] mt-1">
                              <span className="flex items-center gap-1"><Clock size={12}/> 10:00 AM</span>
                              <span className="flex items-center gap-1"><MapPin size={12}/> Room A</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    );
  }

  if (view === 'users') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management</h1>
          <div className="flex gap-2">
            <input placeholder="Search users..." className="border border-[#E5E5EA] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" />
            <Button>Add User</Button>
          </div>
        </div>
        <Card className="overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-[#F5F5F7] text-[#86868B] text-xs uppercase font-semibold">
               <tr>
                 <th className="px-6 py-4">User</th>
                 <th className="px-6 py-4">Role</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Joined</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-[#E5E5EA]">
               {[1, 2, 3, 4, 5].map(i => (
                 <tr key={i} className="hover:bg-gray-50">
                   <td className="px-6 py-4 flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-200" />
                     <div className="font-medium text-sm">User {i}</div>
                   </td>
                   <td className="px-6 py-4 text-sm text-[#86868B]">
                     {i === 1 ? 'Admin' : i === 2 ? 'Instructor' : 'Student'}
                   </td>
                   <td className="px-6 py-4">
                     <Badge color="green">Active</Badge>
                   </td>
                   <td className="px-6 py-4 text-sm text-[#86868B]">Oct 24, 2023</td>
                   <td className="px-6 py-4 text-right">
                     <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20}/></button>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-96 text-[#86868B]">
      Settings Panel Placeholder
    </div>
  );
};