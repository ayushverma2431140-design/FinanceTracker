import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/Card';
import { MessageSquare, Mail, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQS = [
  {
    question: "How do I create a new budget?",
    answer: "Navigate to the Budgets tab and click on the 'Create Budget' button. Select a category, set the amount, and choose your period."
  },
  {
    question: "Can I export my transactions?",
    answer: "Yes. Go to the Settings tab, under the 'Danger Zone' section, you can click on 'Export Data' to download your transactions as a CSV file."
  },
  {
    question: "How does budget rollover work?",
    answer: "When enabled, any unspent amount in a category at the end of the month will be added to the budget for that category in the following month."
  },
  {
    question: "How do I change my currency?",
    answer: "Go to Settings > Profile Settings and use the 'Currency' dropdown to select your preferred local currency."
  }
];

export function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 w-full max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#fafafa] uppercase tracking-tight">Help & Support</h2>
        <p className="text-[#a1a1aa] mt-1 text-sm font-medium tracking-wide">Find answers to your questions or get in touch.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-md transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#fafafa] mb-2">Documentation</h3>
          <p className="text-sm text-[#a1a1aa] mb-4">Detailed guides and tutorials on how to use FinTrack effectively.</p>
          <button className="text-sm font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wide">Read Docs</button>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-md transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#fafafa] mb-2">Email Support</h3>
          <p className="text-sm text-[#a1a1aa] mb-4">Send us an email. We typically reply within 24 hours.</p>
          <button className="text-sm font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wide">Contact Us</button>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-md transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#fafafa] mb-2">Live Chat</h3>
          <p className="text-sm text-[#a1a1aa] mb-4">Chat directly with our support team in real-time.</p>
          <button className="text-sm font-bold text-purple-400 hover:text-purple-300 uppercase tracking-wide">Start Chat</button>
        </div>
      </div>

      <Card className="border-[#27272a] shadow-xl bg-[#18181b] mt-8">
        <CardHeader className="border-b border-[#27272a] pb-4">
          <CardTitle className="text-[#fafafa]">Frequently Asked Questions</CardTitle>
          <CardDescription>Common queries and solutions.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-[#27272a] rounded-xl bg-[#09090b] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                >
                  <span className="font-medium text-[#fafafa]">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#a1a1aa]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#a1a1aa]" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 pt-0 text-sm text-[#71717a] border-t border-[#27272a]/50 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-[#27272a] shadow-xl bg-[#18181b] mt-8">
        <CardHeader className="border-b border-[#27272a] pb-4">
          <CardTitle className="text-[#fafafa]">Contact Form</CardTitle>
          <CardDescription>Send us a direct message concerning an issue.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Subject</label>
            <input type="text" placeholder="Explain your issue..." className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Message</label>
            <textarea rows={4} placeholder="More details here..." className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner resize-none"></textarea>
          </div>
          <div className="flex justify-end pt-2">
            <button className="px-6 py-3 bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
              Submit Request
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
