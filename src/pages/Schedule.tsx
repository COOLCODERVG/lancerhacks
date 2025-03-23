
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, CheckCircle, AlertCircle, LineChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Schedule = () => {
  const [analyzing, setAnalyzing] = useState(false);
  
  useEffect(() => {
    document.title = 'EmoFlow | Schedule & Planning';
  }, []);
  
  const handleAnalyze = () => {
    setAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalyzing(false);
      toast.success("Schedule analysis complete", {
        description: "We've analyzed your emotional patterns and optimized your schedule."
      });
    }, 2000);
  };

  // Fake schedule data
  const scheduleData = [
    { id: 1, time: "09:00 - 10:30", task: "Creative Brief Development", emotionState: "High Focus", priority: "High", completed: true },
    { id: 2, time: "10:45 - 11:30", task: "Team Standup Meeting", emotionState: "Social Energy", priority: "Medium", completed: true },
    { id: 3, time: "11:30 - 12:30", task: "Client Proposal Review", emotionState: "Critical Thinking", priority: "High", completed: false },
    { id: 4, time: "12:30 - 13:15", task: "Lunch Break + Mindfulness", emotionState: "Rest & Recovery", priority: "Medium", completed: false },
    { id: 5, time: "13:30 - 15:00", task: "Product Development", emotionState: "Deep Work", priority: "High", completed: false },
    { id: 6, time: "15:15 - 16:00", task: "Email & Communication", emotionState: "Administrative", priority: "Medium", completed: false },
    { id: 7, time: "16:00 - 17:30", task: "Strategic Planning Session", emotionState: "Creative Energy", priority: "High", completed: false }
  ];

  // Fake upcoming tasks
  const upcomingTasks = [
    { id: 1, date: "Tomorrow", task: "Quarterly Report Analysis", emotionState: "Deep Focus Required", priority: "Critical" },
    { id: 2, date: "Tomorrow", task: "Team Feedback Sessions", emotionState: "Empathetic Listening", priority: "High" },
    { id: 3, date: "In 2 days", task: "Project Timeline Review", emotionState: "Strategic Thinking", priority: "Medium" },
    { id: 4, date: "In 3 days", task: "Client Presentation", emotionState: "Confident Energy", priority: "High" }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emoflow-purple to-emoflow-purple-dark mb-2">
                Emotion-Optimized Schedule
              </h1>
              <p className="text-gray-600 md:text-lg">
                Your daily plan, adjusted for optimal productivity based on your emotional patterns.
              </p>
            </div>
            <Button 
              onClick={handleAnalyze} 
              className="bg-emoflow-purple hover:bg-emoflow-purple-dark transition-all px-6 py-2.5"
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <LineChart className="mr-2 h-4 w-4" />
                  Analyze Emotions
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-1 shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-emoflow-purple-softest flex items-center justify-center">
                    <Activity className="text-emoflow-purple h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3">Today's Energy</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Emotional State</p>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full purple-gradient w-[75%]"></div>
                    </div>
                    <p className="text-sm font-medium mt-1">High Focus Capacity (75%)</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Creative Energy</p>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full purple-gradient w-[60%]"></div>
                    </div>
                    <p className="text-sm font-medium mt-1">Moderate (60%)</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Stress Level</p>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-[30%]"></div>
                    </div>
                    <p className="text-sm font-medium mt-1">Low (30%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2 shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-emoflow-purple-softest flex items-center justify-center">
                    <Clock className="text-emoflow-purple h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3">Productivity Insights</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-emoflow-purple-softest flex items-center justify-center">
                      <span className="text-xl font-bold text-emoflow-purple">85%</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Productivity Score</h4>
                      <p className="text-sm text-gray-500">Based on your recent task completion and emotional balance</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Peak Focus Time</p>
                      <p className="font-medium">9:30 AM - 11:30 AM</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Suggested Break</p>
                      <p className="font-medium">Every 52 minutes</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Optimal Work Mode</p>
                      <p className="font-medium">Deep Focus Blocks</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="today" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="today" className="text-sm">Today's Schedule</TabsTrigger>
              <TabsTrigger value="upcoming" className="text-sm">Upcoming Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="mt-0">
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Time</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Emotional State</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheduleData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.time}</TableCell>
                          <TableCell>{item.task}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emoflow-purple-softest text-emoflow-purple">
                              {item.emotionState}
                            </span>
                          </TableCell>
                          <TableCell>{item.priority}</TableCell>
                          <TableCell className="text-right">
                            {item.completed ? (
                              <div className="flex items-center justify-end text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Completed
                              </div>
                            ) : (
                              <div className="flex items-center justify-end text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                Pending
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Date</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Required Emotional State</TableHead>
                        <TableHead className="text-right">Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingTasks.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.date}</TableCell>
                          <TableCell>{item.task}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emoflow-purple-softest text-emoflow-purple">
                              {item.emotionState}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.priority === "Critical" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {item.priority}
                              </span>
                            ) : (
                              <span>{item.priority}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center text-gray-500 text-sm">
            <p>Your schedule is continuously optimized based on your emotional state and productivity patterns.</p>
            <p>Click "Analyze Emotions" to update your recommendations.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
