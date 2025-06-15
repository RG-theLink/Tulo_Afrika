import React, { useState } from 'react';
import { Target, Plus, Edit, Trash2, CheckCircle, Clock, Star, Calendar, TrendingUp, Award, User, BookOpen, X } from 'lucide-react';

const GoalsPage = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [activeTab, setActiveTab] = useState<'my-goals' | 'tutor-goals'>('my-goals');
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    priority: 'medium',
    milestones: [{ title: '', completed: false }]
  });

  const [myGoals, setMyGoals] = useState([
    {
      id: 1,
      title: 'Complete Algebra 1 Course',
      description: 'Finish all 24 lessons and pass the final exam with at least 85%',
      category: 'Mathematics',
      deadline: '2024-03-15',
      priority: 'high',
      progress: 75,
      status: 'in-progress',
      createdDate: '2024-01-01',
      milestones: [
        { id: 1, title: 'Complete Chapters 1-3', completed: true },
        { id: 2, title: 'Pass Mid-term Exam', completed: true },
        { id: 3, title: 'Complete Chapters 4-6', completed: false },
        { id: 4, title: 'Pass Final Exam', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Improve Writing Skills',
      description: 'Write 10 essays and get feedback from tutor to improve writing quality',
      category: 'Language Arts',
      deadline: '2024-04-01',
      priority: 'medium',
      progress: 40,
      status: 'in-progress',
      createdDate: '2024-01-10',
      milestones: [
        { id: 1, title: 'Write 3 practice essays', completed: true },
        { id: 2, title: 'Get feedback on structure', completed: true },
        { id: 3, title: 'Write 5 more essays', completed: false },
        { id: 4, title: 'Final writing assessment', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Learn Python Basics',
      description: 'Master fundamental Python programming concepts and build 3 projects',
      category: 'Computer Science',
      deadline: '2024-05-01',
      priority: 'medium',
      progress: 20,
      status: 'in-progress',
      createdDate: '2024-01-20',
      milestones: [
        { id: 1, title: 'Learn syntax and variables', completed: true },
        { id: 2, title: 'Master loops and functions', completed: false },
        { id: 3, title: 'Build calculator project', completed: false },
        { id: 4, title: 'Build web scraper project', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Read 12 Classic Books',
      description: 'Read one classic book per month to improve literature knowledge',
      category: 'Literature',
      deadline: '2024-12-31',
      priority: 'low',
      progress: 100,
      status: 'completed',
      createdDate: '2023-12-01',
      milestones: [
        { id: 1, title: 'Read 6 books (Q1-Q2)', completed: true },
        { id: 2, title: 'Write book reports', completed: true },
        { id: 3, title: 'Read 6 more books (Q3-Q4)', completed: true },
        { id: 4, title: 'Final literature assessment', completed: true }
      ]
    }
  ]);

  const tutorGoals = [
    {
      id: 1,
      title: 'Master Quadratic Equations',
      description: 'Focus on understanding and solving quadratic equations using multiple methods',
      category: 'Mathematics',
      assignedBy: 'Dr. Sarah Wilson',
      assignedDate: '2024-01-15',
      deadline: '2024-02-15',
      priority: 'high',
      progress: 60,
      status: 'in-progress',
      resources: [
        'Khan Academy Quadratic Equations',
        'Practice Problem Set #3',
        'Video Tutorial Series'
      ],
      milestones: [
        { id: 1, title: 'Learn factoring method', completed: true },
        { id: 2, title: 'Master completing the square', completed: true },
        { id: 3, title: 'Practice quadratic formula', completed: false },
        { id: 4, title: 'Solve complex word problems', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Improve Essay Structure',
      description: 'Work on creating clear thesis statements and supporting arguments',
      category: 'Language Arts',
      assignedBy: 'Prof. Michael Chen',
      assignedDate: '2024-01-20',
      deadline: '2024-03-01',
      priority: 'medium',
      progress: 80,
      status: 'in-progress',
      resources: [
        'Essay Writing Guide',
        'Thesis Statement Worksheet',
        'Peer Review Examples'
      ],
      milestones: [
        { id: 1, title: 'Study essay structure', completed: true },
        { id: 2, title: 'Write practice thesis statements', completed: true },
        { id: 3, title: 'Complete 2 practice essays', completed: true },
        { id: 4, title: 'Receive final feedback', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Science Fair Project',
      description: 'Design and complete an experiment for the upcoming science fair',
      category: 'Science',
      assignedBy: 'Dr. Emily Rodriguez',
      assignedDate: '2024-02-01',
      deadline: '2024-04-15',
      priority: 'high',
      progress: 25,
      status: 'in-progress',
      resources: [
        'Scientific Method Guide',
        'Lab Equipment Access',
        'Research Database Access'
      ],
      milestones: [
        { id: 1, title: 'Choose research topic', completed: true },
        { id: 2, title: 'Design experiment', completed: false },
        { id: 3, title: 'Conduct experiments', completed: false },
        { id: 4, title: 'Prepare presentation', completed: false }
      ]
    }
  ];

  const categories = ['Mathematics', 'Science', 'Language Arts', 'Computer Science', 'History', 'Literature', 'Art', 'Music'];
  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
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
      id: myGoals.length + 1,
      ...newGoal,
      milestones: filteredMilestones.map((m, index) => ({ id: index + 1, ...m })),
      progress: 0,
      status: 'in-progress',
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    // Add to goals list
    setMyGoals([...myGoals, goal]);
    
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

  const handleAddMilestone = () => {
    setNewGoal(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', completed: false }]
    }));
  };

  const handleRemoveMilestone = (index: number) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const handleMilestoneChange = (index: number, value: string) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.map((m, i) => 
        i === index ? { ...m, title: value } : m
      )
    }));
  };

  const handleToggleMilestone = (goalId: number, milestoneId: number) => {
    setMyGoals(prev => 
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

  const myGoalsStats = {
    total: myGoals.length,
    completed: myGoals.filter(g => g.status === 'completed').length,
    inProgress: myGoals.filter(g => g.status === 'in-progress').length,
    avgProgress: Math.round(myGoals.reduce((acc, g) => acc + g.progress, 0) / myGoals.length)
  };

  const tutorGoalsStats = {
    total: tutorGoals.length,
    completed: tutorGoals.filter(g => g.status === 'completed').length,
    inProgress: tutorGoals.filter(g => g.status === 'in-progress').length,
    avgProgress: Math.round(tutorGoals.reduce((acc, g) => acc + g.progress, 0) / tutorGoals.length)
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <Target className="h-8 w-8 text-purple-600" />
            <span>Learning Goals</span>
          </h1>
          <p className="text-slate-600 mt-2">Set milestones, track progress, and achieve your learning objectives</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-2 shadow-lg">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('my-goals')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'my-goals'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              <User className="h-5 w-5" />
              <span>My Goals</span>
            </button>
            <button
              onClick={() => setActiveTab('tutor-goals')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'tutor-goals'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Tutor Goals</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {activeTab === 'my-goals' ? (
          <>
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-800">{myGoalsStats.total}</div>
                  <div className="text-purple-600 text-sm">Total Goals</div>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-800">{myGoalsStats.inProgress}</div>
                  <div className="text-blue-600 text-sm">In Progress</div>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-800">{myGoalsStats.completed}</div>
                  <div className="text-green-600 text-sm">Completed</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-800">{myGoalsStats.avgProgress}%</div>
                  <div className="text-orange-600 text-sm">Avg Progress</div>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-r from-teal-100 to-teal-200 p-6 rounded-xl border border-teal-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-teal-800">{tutorGoalsStats.total}</div>
                  <div className="text-teal-600 text-sm">Assigned Goals</div>
                </div>
                <BookOpen className="h-8 w-8 text-teal-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-800">{tutorGoalsStats.inProgress}</div>
                  <div className="text-blue-600 text-sm">In Progress</div>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-800">{tutorGoalsStats.completed}</div>
                  <div className="text-green-600 text-sm">Completed</div>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-800">{tutorGoalsStats.avgProgress}%</div>
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
        {(activeTab === 'my-goals' ? myGoals : tutorGoals).map((goal) => (
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
                {activeTab === 'tutor-goals' && 'assignedBy' in goal && (
                  <>
                    <div>
                      <span className="text-slate-500">Assigned by:</span>
                      <span className="ml-2 font-medium text-slate-800">{goal.assignedBy}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Assigned:</span>
                      <span className="ml-2 font-medium text-slate-800">{goal.assignedDate}</span>
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
                  className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full h-3 transition-all duration-500"
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

            {/* Resources (for tutor goals) */}
            {activeTab === 'tutor-goals' && 'resources' in goal && (
              <div className="p-6 border-b border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-3">Recommended Resources</h4>
                <div className="space-y-2">
                  {goal.resources.map((resource, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-slate-600">
                      <BookOpen className="h-4 w-4 text-teal-500" />
                      <span>{resource}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6">
              <div className="flex space-x-3">
                {activeTab === 'my-goals' && (
                  <>
                    <button className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-500 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2">
                      <Edit className="h-4 w-4" />
                      <span>Edit Goal</span>
                    </button>
                    <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors flex items-center justify-center">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
                {activeTab === 'tutor-goals' && (
                  <button className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Work on Goal</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Plus className="h-6 w-6 text-purple-600" />
                  <span>Add New Goal</span>
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    onClick={handleAddMilestone}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center space-x-1"
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
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-200"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;