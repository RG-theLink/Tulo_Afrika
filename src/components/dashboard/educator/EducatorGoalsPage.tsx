import React, { useState } from 'react';
import { Target, Plus, Edit, Trash2, CheckCircle, Clock, Star, Calendar, TrendingUp, Award, User, BookOpen, X } from 'lucide-react';

const EducatorGoalsPage = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAssignGoal, setShowAssignGoal] = useState(false);
  const [activeTab, setActiveTab] = useState<'my-goals' | 'student-goals'>('my-goals');
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    priority: 'medium',
    milestones: [{ title: '', completed: false }]
  });

  const [assignGoal, setAssignGoal] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    priority: 'medium',
    targetStudents: [] as string[],
    targetGroup: '',
    milestones: [{ title: '', completed: false }]
  });

  const [educatorGoals, setEducatorGoals] = useState([
    {
      id: 1,
      title: 'Complete Curriculum Planning',
      description: 'Finalize all lesson plans and materials for the semester',
      category: 'Planning',
      deadline: '2024-02-15',
      priority: 'high',
      progress: 60,
      status: 'in-progress',
      createdDate: '2024-01-01',
      milestones: [
        { id: 1, title: 'Outline course objectives', completed: true },
        { id: 2, title: 'Create assessment schedule', completed: true },
        { id: 3, title: 'Develop lesson materials', completed: false },
        { id: 4, title: 'Review and finalize', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Professional Development',
      description: 'Complete advanced certification in mathematics education',
      category: 'Professional Growth',
      deadline: '2024-05-01',
      priority: 'medium',
      progress: 40,
      status: 'in-progress',
      createdDate: '2024-01-10',
      milestones: [
        { id: 1, title: 'Complete online modules', completed: true },
        { id: 2, title: 'Submit mid-term assessment', completed: true },
        { id: 3, title: 'Attend workshop sessions', completed: false },
        { id: 4, title: 'Final certification exam', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Research Project',
      description: 'Conduct research on effective teaching methods for algebra',
      category: 'Research',
      deadline: '2024-06-30',
      priority: 'medium',
      progress: 25,
      status: 'in-progress',
      createdDate: '2024-01-15',
      milestones: [
        { id: 1, title: 'Literature review', completed: true },
        { id: 2, title: 'Develop methodology', completed: false },
        { id: 3, title: 'Collect data', completed: false },
        { id: 4, title: 'Analyze and report findings', completed: false }
      ]
    }
  ]);

  const studentGoals = [
    {
      id: 1,
      title: 'Master Quadratic Equations',
      description: 'Focus on understanding and solving quadratic equations using multiple methods',
      category: 'Mathematics',
      assignedTo: 'Grade 10 Mathematics',
      studentCount: 24,
      completedCount: 8,
      deadline: '2024-02-15',
      priority: 'high',
      progress: 33,
      status: 'in-progress',
      createdDate: '2024-01-15',
      milestones: [
        { id: 1, title: 'Learn factoring method', completed: true },
        { id: 2, title: 'Master completing the square', completed: true },
        { id: 3, title: 'Practice quadratic formula', completed: false },
        { id: 4, title: 'Solve complex word problems', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Physics Lab Reports',
      description: 'Improve scientific writing and data analysis in lab reports',
      category: 'Physics',
      assignedTo: 'Physics Grade 11',
      studentCount: 18,
      completedCount: 12,
      deadline: '2024-03-01',
      priority: 'medium',
      progress: 67,
      status: 'in-progress',
      createdDate: '2024-01-20',
      milestones: [
        { id: 1, title: 'Learn proper formatting', completed: true },
        { id: 2, title: 'Practice data visualization', completed: true },
        { id: 3, title: 'Develop analysis skills', completed: true },
        { id: 4, title: 'Complete final assessment', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Chemistry Fundamentals',
      description: 'Master basic chemistry concepts and nomenclature',
      category: 'Chemistry',
      assignedTo: 'Chemistry Lab',
      studentCount: 12,
      completedCount: 3,
      deadline: '2024-04-15',
      priority: 'high',
      progress: 25,
      status: 'in-progress',
      createdDate: '2024-02-01',
      milestones: [
        { id: 1, title: 'Learn periodic table basics', completed: true },
        { id: 2, title: 'Master chemical formulas', completed: false },
        { id: 3, title: 'Practice balancing equations', completed: false },
        { id: 4, title: 'Complete lab experiments', completed: false }
      ]
    }
  ];

  const categories = [
    'Mathematics', 'Physics', 'Chemistry', 'Planning', 'Professional Growth', 
    'Research', 'Assessment', 'Curriculum Development'
  ];
  
  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  const groups = [
    { id: 'math10', name: 'Mathematics Grade 10', count: 24 },
    { id: 'physics11', name: 'Physics Grade 11', count: 18 },
    { id: 'chemlab', name: 'Chemistry Lab', count: 12 }
  ];

  const students = [
    { id: 'student1', name: 'Alex Johnson', group: 'Mathematics Grade 10' },
    { id: 'student2', name: 'Emma Davis', group: 'Mathematics Grade 10' },
    { id: 'student3', name: 'Mike Chen', group: 'Physics Grade 11' },
    { id: 'student4', name: 'Sarah Wilson', group: 'Chemistry Lab' },
    { id: 'student5', name: 'James Thompson', group: 'Physics Grade 11' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : 'bg-gray-100 text-gray-800';
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty milestones
    const filteredMilestones = newGoal.milestones.filter(m => m.title.trim() !== '');
    
    // Create new goal
    const goal = {
      id: educatorGoals.length + 1,
      ...newGoal,
      milestones: filteredMilestones.map((m, index) => ({ id: index + 1, ...m })),
      progress: 0,
      status: 'in-progress',
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    // Add to goals list
    setEducatorGoals([...educatorGoals, goal]);
    
    // Reset form
    setShowAddGoal(false);
    setNewGoal({ 
      title: '', 
      description: '', 
      category: '', 
      deadline: '', 
      priority: 'medium',
      milestones: [{ title: '', completed: false }]
    });
  };

  const handleAssignGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty milestones
    const filteredMilestones = assignGoal.milestones.filter(m => m.title.trim() !== '');
    
    console.log('Assigning goal:', {
      ...assignGoal,
      milestones: filteredMilestones
    });
    
    // Reset form
    setShowAssignGoal(false);
    setAssignGoal({ 
      title: '', 
      description: '', 
      category: '', 
      deadline: '', 
      priority: 'medium',
      targetStudents: [],
      targetGroup: '',
      milestones: [{ title: '', completed: false }]
    });
  };

  const handleAddMilestone = (isAssignGoal = false) => {
    if (isAssignGoal) {
      setAssignGoal(prev => ({
        ...prev,
        milestones: [...prev.milestones, { title: '', completed: false }]
      }));
    } else {
      setNewGoal(prev => ({
        ...prev,
        milestones: [...prev.milestones, { title: '', completed: false }]
      }));
    }
  };

  const handleRemoveMilestone = (index: number, isAssignGoal = false) => {
    if (isAssignGoal) {
      setAssignGoal(prev => ({
        ...prev,
        milestones: prev.milestones.filter((_, i) => i !== index)
      }));
    } else {
      setNewGoal(prev => ({
        ...prev,
        milestones: prev.milestones.filter((_, i) => i !== index)
      }));
    }
  };

  const handleMilestoneChange = (index: number, value: string, isAssignGoal = false) => {
    if (isAssignGoal) {
      setAssignGoal(prev => ({
        ...prev,
        milestones: prev.milestones.map((m, i) => 
          i === index ? { ...m, title: value } : m
        )
      }));
    } else {
      setNewGoal(prev => ({
        ...prev,
        milestones: prev.milestones.map((m, i) => 
          i === index ? { ...m, title: value } : m
        )
      }));
    }
  };

  const handleToggleMilestone = (goalId: number, milestoneId: number) => {
    setEducatorGoals(prev => 
      prev.map(goal => {
        if (goal.id === goalId) {
          // Toggle the milestone
          const updatedMilestones = goal.milestones.map(milestone => 
            milestone.id === milestoneId 
              ? { ...milestone, completed: !milestone.completed } 
              : milestone
          );
          
          // Calculate new progress
          const completedCount = updatedMilestones.filter(m => m.completed).length;
          const totalCount = updatedMilestones.length;
          const newProgress = Math.round((completedCount / totalCount) * 100);
          
          // Update status if all milestones are completed
          const newStatus = completedCount === totalCount ? 'completed' : 'in-progress';
          
          return {
            ...goal,
            milestones: updatedMilestones,
            progress: newProgress,
            status: newStatus
          };
        }
        return goal;
      })
    );
  };

  const handleStudentToggle = (studentId: string) => {
    setAssignGoal(prev => ({
      ...prev,
      targetStudents: prev.targetStudents.includes(studentId)
        ? prev.targetStudents.filter(id => id !== studentId)
        : [...prev.targetStudents, studentId]
    }));
  };

  const educatorGoalsStats = {
    total: educatorGoals.length,
    completed: educatorGoals.filter(g => g.status === 'completed').length,
    inProgress: educatorGoals.filter(g => g.status === 'in-progress').length,
    avgProgress: Math.round(educatorGoals.reduce((acc, g) => acc + g.progress, 0) / educatorGoals.length)
  };

  const studentGoalsStats = {
    total: studentGoals.length,
    totalStudents: studentGoals.reduce((acc, g) => acc + g.studentCount, 0),
    avgProgress: Math.round(studentGoals.reduce((acc, g) => acc + g.progress, 0) / studentGoals.length),
    completed: studentGoals.reduce((acc, g) => acc + g.completedCount, 0)
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <Target className="h-8 w-8 text-teal-600" />
            <span>Educational Goals</span>
          </h1>
          <p className="text-slate-600 mt-2">Create and manage goals for yourself and your students</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddGoal(true)}
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Personal Goal</span>
          </button>
          <button
            onClick={() => setShowAssignGoal(true)}
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
          >
            <User className="h-5 w-5" />
            <span>Assign Student Goal</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-2 shadow-lg">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('my-goals')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'my-goals'
                  ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              <User className="h-5 w-5" />
              <span>My Goals</span>
            </button>
            <button
              onClick={() => setActiveTab('student-goals')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'student-goals'
                  ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Student Goals</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {activeTab === 'my-goals' ? (
          <>
            <div className="bg-gradient-to-r from-teal-100 to-teal-200 p-6 rounded-xl border border-teal-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-teal-800">{educatorGoalsStats.total}</div>
                  <div className="text-teal-600 text-sm">Total Goals</div>
                </div>
                <Target className="h-8 w-8 text-teal-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-800">{educatorGoalsStats.inProgress}</div>
                  <div className="text-blue-600 text-sm">In Progress</div>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-800">{educatorGoalsStats.completed}</div>
                  <div className="text-green-600 text-sm">Completed</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-800">{educatorGoalsStats.avgProgress}%</div>
                  <div className="text-orange-600 text-sm">Avg Progress</div>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-800">{studentGoalsStats.total}</div>
                  <div className="text-purple-600 text-sm">Assigned Goals</div>
                </div>
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-800">{studentGoalsStats.totalStudents}</div>
                  <div className="text-blue-600 text-sm">Students</div>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-800">{studentGoalsStats.completed}</div>
                  <div className="text-green-600 text-sm">Completions</div>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-800">{studentGoalsStats.avgProgress}%</div>
                  <div className="text-orange-600 text-sm">Avg Progress</div>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(activeTab === 'my-goals' ? educatorGoals : studentGoals).map((goal) => (
          <div
            key={goal.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Goal Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{goal.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{goal.description}</p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority}
                  </span>
                </div>
              </div>

              {/* Goal Meta Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Category:</span>
                  <span className="ml-2 font-medium text-slate-800">{goal.category}</span>
                </div>
                <div>
                  <span className="text-slate-500">Deadline:</span>
                  <span className="ml-2 font-medium text-slate-800">{goal.deadline}</span>
                </div>
                {activeTab === 'student-goals' && 'assignedTo' in goal && (
                  <>
                    <div>
                      <span className="text-slate-500">Assigned to:</span>
                      <span className="ml-2 font-medium text-slate-800">{goal.assignedTo}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Students:</span>
                      <span className="ml-2 font-medium text-slate-800">{goal.studentCount}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Progress Section */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">Overall Progress</span>
                <span className="text-slate-600">{goal.progress}%</span>
              </div>
              <div className="bg-slate-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full h-3 transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>

              {/* Milestones */}
              <h4 className="font-semibold text-slate-800 mb-3">Milestones</h4>
              <div className="space-y-2">
                {goal.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center space-x-3">
                    {activeTab === 'my-goals' ? (
                      <button 
                        onClick={() => handleToggleMilestone(goal.id, milestone.id)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-500' : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                      >
                        {milestone.completed && <CheckCircle className="h-3 w-3 text-white" />}
                      </button>
                    ) : (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        milestone.completed ? 'bg-green-500' : 'bg-slate-300'
                      }`}>
                        {milestone.completed && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                    )}
                    <span className={`text-sm ${
                      milestone.completed ? 'text-slate-800 line-through' : 'text-slate-600'
                    }`}>
                      {milestone.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Progress (for student goals) */}
            {activeTab === 'student-goals' && 'completedCount' in goal && (
              <div className="p-6 border-b border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-3">Student Progress</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">
                    {goal.completedCount} of {goal.studentCount} students completed
                  </span>
                  <span className="text-sm font-medium text-teal-600">
                    {Math.round((goal.completedCount / goal.studentCount) * 100)}%
                  </span>
                </div>
                <div className="bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${(goal.completedCount / goal.studentCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6">
              <div className="flex space-x-3">
                {activeTab === 'my-goals' && (
                  <>
                    <button className="flex-1 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                      <Edit className="h-4 w-4" />
                      <span>Edit Goal</span>
                    </button>
                    <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors flex items-center justify-center">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
                {activeTab === 'student-goals' && (
                  <>
                    <button className="flex-1 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>View Student Progress</span>
                    </button>
                    <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                      <Edit className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Personal Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Plus className="h-6 w-6 text-teal-600" />
                  <span>Add Personal Goal</span>
                </h3>
                <button 
                  onClick={() => setShowAddGoal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddGoal} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your goal title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Describe your goal and what you want to achieve..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {/* Milestones */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">Milestones</label>
                  <button
                    type="button"
                    onClick={() => handleAddMilestone()}
                    className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Milestone</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {newGoal.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => handleMilestoneChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={`Milestone ${index + 1}`}
                        required={index === 0}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMilestone(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-200"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Student Goal Modal */}
      {showAssignGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  <span>Assign Goal to Students</span>
                </h3>
                <button 
                  onClick={() => setShowAssignGoal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAssignGoal} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={assignGoal.title}
                  onChange={(e) => setAssignGoal(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter goal title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={assignGoal.description}
                  onChange={(e) => setAssignGoal(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the goal and what students should achieve..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select
                    value={assignGoal.category}
                    onChange={(e) => setAssignGoal(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                  <select
                    value={assignGoal.priority}
                    onChange={(e) => setAssignGoal(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Deadline</label>
                <input
                  type="date"
                  value={assignGoal.deadline}
                  onChange={(e) => setAssignGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {/* Target Group/Students */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Assign to Group</label>
                <select
                  value={assignGoal.targetGroup}
                  onChange={(e) => setAssignGoal(prev => ({ ...prev, targetGroup: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a group</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name} ({group.count} students)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Or Select Specific Students</label>
                <div className="max-h-60 overflow-y-auto space-y-2 bg-slate-50 p-4 rounded-xl">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={student.id}
                        checked={assignGoal.targetStudents.includes(student.id)}
                        onChange={() => handleStudentToggle(student.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={student.id} className="flex-1 flex items-center justify-between">
                        <span className="text-slate-700">{student.name}</span>
                        <span className="text-xs text-slate-500">{student.group}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">Milestones</label>
                  <button
                    type="button"
                    onClick={() => handleAddMilestone(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Milestone</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {assignGoal.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => handleMilestoneChange(index, e.target.value, true)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Milestone ${index + 1}`}
                        required={index === 0}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMilestone(index, true)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAssignGoal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-200"
                >
                  Assign Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducatorGoalsPage;