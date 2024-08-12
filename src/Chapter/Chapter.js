import React, { useState, useEffect } from 'react';
import './Chapter.css';
import NavBar from '../NavBar/NavBar';
import { FaBook, FaTasks, FaCheckCircle, FaLock } from 'react-icons/fa';
import logo5 from './michigan.jpeg';

const Chapter = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [activeTask, setActiveTask] = useState(1); // Set Task 1 as initially active
  const [timers, setTimers] = useState({});
  const [completedTasks, setCompletedTasks] = useState([1]); // Initially only Task 1 is completed
  const [showPopup, setShowPopup] = useState(false);

  const tasks = [
    {
      id: 1,
      title: 'Introduction to Python Programming',
      level: 'Beginner',
      time: '<30 mins',
      videoUrl: 'https://www.youtube.com/embed/6i3EGqOBRiU',
      overview: {
        learn: [
          'Basic Python syntax and structure',
          'How to write and execute Python code'
        ],
        do: [
          'Complete introductory exercises',
          'Answer quiz questions on Python basics'
        ]
      }
    },
    {
      id: 2,
      title: 'Data Structures in Python',
      level: 'Intermediate',
      time: '<45 mins',
      videoUrl: 'https://www.youtube.com/embed/DInMru2Eq6E',
      overview: {
        learn: [
          'Lists, tuples, and dictionaries in Python',
          'How to manipulate and use these data structures'
        ],
        do: [
          'Complete practice problems on data structures',
          'Work on a small project using these structures'
        ]
      }
    },
    {
      id: 3,
      title: 'Working with Databases in Python',
      level: 'Intermediate',
      time: '<50 mins',
      videoUrl: 'https://www.youtube.com/embed/1UzSDMJRh8c',
      overview: {
        learn: [
          'Connecting to databases using Python',
          'Performing CRUD operations'
        ],
        do: [
          'Build a small application that interacts with a database',
          'Answer questions about database operations'
        ]
      }
    },
    {
      id: 4,
      title: 'Web Scraping with Python',
      level: 'Advanced',
      time: '<60 mins',
      videoUrl: 'https://www.youtube.com/embed/La1BdF_sunw',
      overview: {
        learn: [
          'Techniques for web scraping',
          'Libraries and tools for scraping data'
        ],
        do: [
          'Implement a web scraper for a specific website',
          'Analyze the data collected from scraping'
        ]
      }
    },
    {
      id: 5,
      title: 'Building Web Applications with Flask',
      level: 'Advanced',
      time: '<70 mins',
      videoUrl: 'https://www.youtube.com/embed/La1BdF_sunw',
      overview: {
        learn: [
          'Creating web applications using Flask',
          'Routing and templating in Flask'
        ],
        do: [
          'Develop a simple web application',
          'Deploy the application on a local server'
        ]
      }
    }
  ];

  useEffect(() => {
    let intervalId;

    const startTimer = (taskId) => {
      const endTime = Date.now() + 1 * 60 * 1000; // 5 minutes from now
      setTimers(prevTimers => ({
        ...prevTimers,
        [taskId]: endTime
      }));

      intervalId = setInterval(() => {
        setTimers(prevTimers => {
          const newTimers = { ...prevTimers };
          if (newTimers[taskId] <= Date.now()) {
            clearInterval(intervalId);
            const currentTaskIndex = tasks.findIndex(task => task.id === taskId);
            if (currentTaskIndex < tasks.length - 1) {
              const nextTaskId = tasks[currentTaskIndex + 1].id;
              setCompletedTasks(prevTasks => [...prevTasks, nextTaskId]);
              showPopupMessage(`Task ${taskId} is completed.`);
              setActiveTask(nextTaskId);
              startTimer(nextTaskId);
            }
            return { ...newTimers, [taskId]: 0 };
          }
          return newTimers;
        });
      }, 1000);
    };

    if (activeTask) {
      startTimer(activeTask);
    }

    return () => clearInterval(intervalId);
  }, [activeTask]);

  const showPopupMessage = (message) => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  };

  const handleTaskClick = (taskId) => {
    if (completedTasks.includes(taskId)) {
      setActiveTask(taskId);
      const selectedTask = tasks.find(task => task.id === taskId);
      setVideoSrc(selectedTask.videoUrl);
    }
  };

  const formatTime = (endTime) => {
    const timeLeft = Math.max(endTime - Date.now(), 0);
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const selectedTask = tasks.find(task => task.id === activeTask);

  return (
    <div>
      <NavBar />
      <div className="chapter-container">
        <div className="sidebar">
          <div className="logo-container">
            <img src={logo5} alt="Logo" className="logo" />
          </div>
          {tasks.map(task => (
            <div key={task.id} className={`task-box ${activeTask === task.id ? 'active' : ''}`}>
              <button
                className={`task-button ${completedTasks.includes(task.id) ? 'active' : 'disabled'}`}
                onClick={() => handleTaskClick(task.id)}
                disabled={!completedTasks.includes(task.id)}
                title={!completedTasks.includes(task.id) ? 'Complete the previous task' : ''}
              >
                <div className="task-info">
                  <span className="task-number">{task.id}</span>
                  <div className="task-details">
                    <div className="task-title">{`Task ${task.id}`}</div>
                    <div className="task-description">{task.title}</div>
                    <div className="task-meta">
                      <span className="task-level">{task.level}</span>
                      <span className="task-time">{task.time}</span>
                    </div>
                  </div>
                </div>
                {timers[task.id] !== undefined && timers[task.id] > 0 ? (
                  <div className="task-timer">
                    {formatTime(timers[task.id])}
                  </div>
                ) : (
                  <FaCheckCircle className="task-check-icon" />
                )}
                {!completedTasks.includes(task.id) && <FaLock className="task-lock-icon" />}
              </button>
            </div>
          ))}
          <div className="finish-line">----Finish Line----</div>
        </div>
        <div className="content">
          {selectedTask && (
            <>
              <div className="task-header">
                <h2>{`Task ${selectedTask.id}: ${selectedTask.title}`}</h2>
              </div>
              <div className="task-overview">
                <h3>Task Overview</h3>
                <div className="overview-section">
                  <h4><FaBook /> What you'll learn</h4>
                  <ul>
                    {selectedTask.overview.learn.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="overview-section">
                  <h4><FaTasks /> What you'll do</h4>
                  <ul>
                    {selectedTask.overview.do.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
          <div className="video-container">
            {videoSrc ? (
              <iframe
                id="youtube-player"
                width="100%"
                height="315"
                src={videoSrc}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Player"
              />
            ) : (
              <p>Select a task to start learning.</p>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup-message">
          <FaCheckCircle className="popup-icon" />
          <span className="popup-text">Task {activeTask} is completed.</span>
        </div>
      )}
    </div>
  );
};

export default Chapter;
