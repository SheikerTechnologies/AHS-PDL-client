/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Send, Phone, Mail, CheckCircle, Sparkles } from 'lucide-react';
import { Agent, DevelopmentProject } from '@/lib/types';
import { AGENTS } from '@/lib/data';

interface AgentFormProps {
  selectedProject?: DevelopmentProject | null;
  onClose?: () => void;
}

export default function AgentForm({
  selectedProject,
  onClose,
}: AgentFormProps) {
  // Use key on parent to force remount when selectedProject changes
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Set placeholder message based on selected project
  const getPlaceholder = () => {
    if (selectedProject) {
      const loc = [selectedProject.location.area, selectedProject.location.city].filter(Boolean).join(', ') || selectedProject.location.address;
      return `Hi, I'm interested in learning more about "${selectedProject.title}" in ${loc}. Please share pricing and availability details.`;
    }
    return "Tell us about your property interests and requirements...";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/broker-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          selectedAgent: selectedAgent.name,
          selectedProject: selectedProject?.title,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Broker inquiry error:', err);
      setLoading(false);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-surface-alt rounded-3xl border border-border-main/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row pointer-events-auto">
      {/* Handpicked Dedicated Agents Panel */}
      <div className="bg-navy text-text-on-accent p-6 md:p-8 md:w-5/12 flex flex-col justify-between select-none relative">
        <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-6 z-10">
          <div>
            <div className="flex items-center gap-1.5 text-blue-300 mb-1">
              <Sparkles className="w-4 h-4 fill-blue-400 text-blue-400" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Bangladesh Experts</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight font-sans">
              Meet Our Expert Brokers 
            </h3>
            <p className="text-slate-300 text-xs mt-1 leading-normal">
              Direct access to dedicated consultants with local and legal insights.
            </p>
          </div>

          {/* Core Agents Row */}
          <div className="flex flex-col gap-4">
            {AGENTS.map((agent) => {
              const isSelected = selectedAgent.name === agent.name;
              return (
                <div
                  key={agent.name}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3.5 items-center ${
                    isSelected
                      ? 'bg-white/10 border-white/20 shadow-md ring-1 ring-white/10'
                      : 'border-transparent hover:bg-white/5 opacity-70 hover:opacity-90'
                  }`}
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white leading-none">{agent.name}</span>
                      {isSelected && (
                        <span className="bg-emerald-500/25 text-emerald-300 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Active Broker
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-300 block mt-1">{agent.role}</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5 max-w-[150px] truncate">
                      {agent.specialty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Broker details */}
        <div className="mt-8 pt-4 border-t border-white/10 z-10 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
            <Phone className="w-4 h-4 text-blue-300" />
            <span>{selectedAgent.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
            <Mail className="w-4 h-4 text-blue-300" />
            <span className="truncate">{selectedAgent.email}</span>
          </div>
        </div>
      </div>

      {/* Inquiry Form Form Area */}
      <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-center bg-surface-alt relative">
        {submitted ? (
          <div className="flex flex-col items-center text-center justify-center py-8 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-text-main tracking-tight">
              Inquiry Sent Successfully!
            </h4>
            <p className="text-xs text-text-secondary mt-2 max-w-sm leading-normal">
              Thank you! Your inquiry has been sent to <strong>{selectedAgent.name}</strong>. They will reach out to you within 2 hours with detailed information and scheduling options.
            </p>
            {onClose && (
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2 border border-border-main hover:bg-surface-muted text-xs font-bold rounded-full text-text-secondary transition-colors cursor-pointer"
              >
                Close Inquiry Panel
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <span className="text-xs text-text-muted font-bold uppercase tracking-wider block mb-1">
                Your consultant: <span className="text-text-main">{selectedAgent.name}</span>
              </span>
              <h3 className="text-xl font-bold tracking-tight text-text-main font-sans">
                {selectedProject ? 'Request Details & Pricing' : 'Book a Consultation'}
              </h3>
              {selectedProject && (
                <div className="bg-surface-muted p-2.5 rounded-xl border border-border-light/50 flex gap-2.5 items-center mt-2">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={selectedProject.coverImage || '/assets/ahspdl1.png'}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold text-[#1e2a4a] tracking-widest block uppercase">Selected Project</span>
                    <span className="text-xs font-bold text-slate-800 block truncate">{selectedProject.title}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest pl-0.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mr. Jean Pierre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-border-main text-xs focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest pl-0.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-border-main text-xs focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">                <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest pl-0.5">
                  Phone Number (with country code)
                </label>
                <input
                  type="tel"
                  placeholder="+880 17XX XXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-border-main text-xs focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main"
              />
            </div>

            <div className="flex flex-col gap-1.5">                <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest pl-0.5">
                  Inquiry Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="px-3.5 py-2 rounded-xl border border-border-main text-xs placeholder:text-text-muted focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-text-on-accent hover:bg-accent-hover disabled:opacity-50 text-xs font-bold py-3 pr-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 mt-2 cursor-pointer dark:btn-glow-accent"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Sending...' : 'Send Inquiry'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
