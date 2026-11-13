import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, CornerDownLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo, projects, skillCategories, experiences } from '../data/portfolioData';

export default function InteractiveTerminal({ isOpen, onClose, darkMode, setDarkMode, onShowToast }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Ankit Kumar\'s Interactive Terminal Shell [v2.4.0]' },
    { type: 'system', text: 'Type "help" to see available commands or "sudo hire" to initiate contact.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to command history
    setCmdHistory(prev => [...prev, trimmed]);
    setCmdHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    const newLogs = [...history, { type: 'user', text: `$ ${trimmed}` }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `Available commands:
  help            - List all available commands
  about / bio     - Read engineer biography & background
  github / repo   - Open Ankit's GitHub profile (Ankit372004)
  skills          - Display technical competencies
  projects        - List top featured projects
  experience      - View work history and career timeline
  contact         - Get direct contact details
  theme [light|dark] - Switch portfolio interface theme
  time / date     - Check current local IST timestamp
  sudo hire       - Fast-track hiring process (instant celebration)
  clear           - Clear terminal screen
  exit            - Close terminal shell`
        });
        break;

      case 'about':
      case 'bio':
        newLogs.push({
          type: 'output',
          text: `${personalInfo.name} - ${personalInfo.title}\nLocation: ${personalInfo.location}\nBio: ${personalInfo.bio}`
        });
        break;

      case 'github':
      case 'repo':
        newLogs.push({
          type: 'output',
          text: `GitHub Profile: ${personalInfo.socials.github}\nOpening in a new tab...`
        });
        window.open(personalInfo.socials.github, '_blank');
        break;

      case 'skills':
        const skillsSummary = skillCategories.map(cat => 
          `[${cat.category}]\n  ${cat.skills.map(s => s.name).join(', ')}`
        ).join('\n\n');
        newLogs.push({ type: 'output', text: skillsSummary });
        break;

      case 'projects':
        const projectList = projects.map(p => 
          `• ${p.title} (${p.category.toUpperCase()}): ${p.subtitle}\n  Stack: ${p.tags.join(', ')}`
        ).join('\n\n');
        newLogs.push({ type: 'output', text: projectList });
        break;

      case 'experience':
        const expList = experiences.map(e => 
          `• ${e.role} at ${e.company} [${e.period}]\n  ${e.description}`
        ).join('\n\n');
        newLogs.push({ type: 'output', text: expList });
        break;

      case 'contact':
        newLogs.push({
          type: 'output',
          text: `Email:    ${personalInfo.email}\nPhone:    ${personalInfo.phone}\nLocation: ${personalInfo.location}\nGitHub:   ${personalInfo.socials.github}\nLinkedIn: ${personalInfo.socials.linkedin}\nLeetCode: ${personalInfo.socials.leetcode}\nCodolio:  ${personalInfo.socials.codolio}`
        });
        break;

      case 'time':
      case 'date':
        const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        newLogs.push({ type: 'output', text: `Current Local IST: ${now}` });
        break;

      case 'theme':
        if (arg === 'dark') {
          setDarkMode(true);
          newLogs.push({ type: 'output', text: 'Theme switched to Dark Mode.' });
          onShowToast?.({ type: 'info', message: 'Switched to Dark Mode' });
        } else if (arg === 'light') {
          setDarkMode(false);
          newLogs.push({ type: 'output', text: 'Theme switched to Light Mode.' });
          onShowToast?.({ type: 'info', message: 'Switched to Light Mode' });
        } else {
          newLogs.push({ type: 'error', text: 'Usage: theme light OR theme dark' });
        }
        break;

      case 'sudo':
        if (arg === 'hire') {
          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
          } catch (e) {}
          newLogs.push({
            type: 'success',
            text: `PERMISSION GRANTED!\n\nCandidate status: HIGHLY RECOMMENDED.\nRedirecting invitation signal to ${personalInfo.email}...\nCheck your inbox or reach out directly at: ${personalInfo.email}`
          });
          onShowToast?.({ type: 'success', message: 'Hiring easter egg unlocked! 🎉' });
        } else {
          newLogs.push({ type: 'error', text: 'sudo: command not found. Try "sudo hire".' });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newLogs.push({
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdHistoryIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIdx - 1);
        setCmdHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistoryIdx !== -1) {
        const nextIdx = cmdHistoryIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setCmdHistoryIdx(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setCmdHistoryIdx(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 font-mono shadow-2xl ${
      isMaximized 
        ? 'inset-4 rounded-2xl' 
        : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-full max-w-xl h-[460px] rounded-2xl'
    } bg-slate-950 text-slate-100 border border-slate-800 flex flex-col overflow-hidden`}>
      
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={onClose} 
              className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity" 
              title="Close terminal"
              aria-label="Close terminal"
            />
            <button 
              onClick={() => setIsMaximized(!isMaximized)} 
              className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity"
              title="Toggle maximize"
              aria-label="Maximize terminal"
            />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs text-slate-400 font-medium ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            ankit@portfolio:~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title={isMaximized ? "Restore window" : "Maximize window"}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 p-4 overflow-y-auto text-xs space-y-2 select-text">
        {history.map((log, idx) => {
          let colorClass = 'text-slate-300';
          if (log.type === 'system') colorClass = 'text-slate-400';
          if (log.type === 'user') colorClass = 'text-sky-400 font-semibold';
          if (log.type === 'error') colorClass = 'text-rose-400';
          if (log.type === 'success') colorClass = 'text-emerald-400 font-bold';

          return (
            <div key={idx} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
              {log.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-xs select-none">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help' or 'sudo hire'..."
          className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="Execute command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

