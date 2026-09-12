import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Copy, 
  Check, 
  Sparkles, 
  Cpu, 
  Sliders, 
  RotateCw, 
  Code, 
  FileText, 
  Image as ImageIcon,
  Flame
} from 'lucide-react';

const PRESET_TEMPLATES = [
  {
    id: "react-card",
    title: "React Glassmorphic Card",
    icon: Code,
    prompt: "Create a modern React component using Tailwind CSS with glassmorphic backdrop blur, hover glow, and a dynamic star rating badge."
  },
  {
    id: "midjourney-prompt",
    title: "Photorealistic Prompt",
    icon: ImageIcon,
    prompt: "Generate an ultra-detailed Midjourney v6.1 prompt for a cyberpunk Japanese tea house in Neo-Tokyo with volumetric neon fog, 8k resolution, cinematic lighting."
  },
  {
    id: "marketing-hook",
    title: "Viral SaaS Hook",
    icon: FileText,
    prompt: "Write 3 high-converting viral LinkedIn & Twitter hooks announcing the launch of an AI-powered developer toolkit."
  },
  {
    id: "python-debug",
    title: "Python Async Scraper",
    icon: Code,
    prompt: "Write an optimized asynchronous Python script using aiohttp and asyncio with exponential backoff retries and error handling."
  }
];

const MODEL_PROFILES = [
  { id: "claude-3-5", name: "Claude 3.5 Sonnet", badge: "Anthropic", color: "#d97706" },
  { id: "gpt-4o", name: "GPT-4o (Omni)", badge: "OpenAI", color: "#10a37f" },
  { id: "gemini-1-5", name: "Gemini 1.5 Pro", badge: "Google", color: "#3b82f6" },
  { id: "deepseek-r1", name: "DeepSeek R1", badge: "Reasoning", color: "#6366f1" }
];

const MOCK_RESPONSES = {
  "react-card": {
    "claude-3-5": `// GlassmorphicCard.jsx - Generated with Claude 3.5 Sonnet
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export function GlassmorphicCard({ title, description, rating = 4.9 }) {
  return (
    <div className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          PRO FEATURE
        </span>
        <div className="flex items-center gap-1 text-amber-400 text-sm font-medium">
          <Star className="w-4 h-4 fill-amber-400" />
          <span>{rating}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
      <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
        Explore Component <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}`,
    "gpt-4o": `import React from 'react';

export const FeatureGlassCard = () => (
  <div className="max-w-sm rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-6 backdrop-blur-2xl border border-slate-700/50 shadow-2xl hover:border-cyan-500/40 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
      ⚡
    </div>
    <h4 className="text-lg font-bold text-white mb-2">Autonomous Workflow</h4>
    <p className="text-slate-400 text-sm">Deploy resilient agentic pipelines with sub-second feedback loops.</p>
  </div>
);`,
    "deepseek-r1": `<think>
1. Analyzing UI requirements: React JSX, Tailwind CSS, backdrop-filter, border gradient glow.
2. Formulating clean accessible component architecture.
3. Adding smooth spring transition tokens for hover state.
</think>

export default function DeepCard() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40">
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
      <span className="text-xs font-mono text-emerald-400">01 // REASONING ENGINE</span>
      <h3 className="mt-2 text-xl font-semibold text-white">Neural Verification</h3>
      <p className="mt-2 text-sm text-slate-400">Formal verification on algorithmic boundaries with mathematical certainty.</p>
    </div>
  );
}`
  },
  "midjourney-prompt": {
    "claude-3-5": `/imagine prompt: Cinematic medium-shot of a traditional Japanese tea house nestled between towering neo-Tokyo skyscrapers, ambient purple and cyan neon rain reflections on wet asphalt, steam rising from ceramic matcha bowl, soft volumetric atmospheric fog, photorealistic octane render, 35mm photography, f/1.8 lens bokeh, hyper-detailed textures --ar 16:9 --style raw --v 6.1 --stylize 250`,
    "gpt-4o": `/imagine prompt: Ultra-realistic futuristic Japanese tea pavilion in year 2088 Neo-Shinjuku, glowing holograms floating above ancient bonsai trees, bioluminescent lanterns, reflections on rain puddles, high dynamic range, Hasselblad H6D-100c medium format photography, 8k resolution --ar 21:9 --v 6.1`,
    "deepseek-r1": `<think>
Key elements to balance: Cyberpunk architectural contrast (traditional cedar wood vs neon chrome), atmospheric lighting (volumetric mist, neon diffusion), camera specs (35mm f/1.4, medium format).
</think>

/imagine prompt: A tranquil traditional tea room floating in a cyberpunk high-rise atrium, bamboo screens illuminated by magenta neon billboards, rainy windowpane with realistic water droplets, film grain, cinematic depth of field, photorealism --ar 16:9 --v 6.1`
  },
  "marketing-hook": {
    "claude-3-5": `🚀 Hook 1 (Contrarian):
"90% of developers are using AI code tools completely wrong. They ask for full files. Here is the 3-second prompt formula that 10x'd our velocity:"

⚡ Hook 2 (Curiosity & FOMO):
"We tested 15 AI developer agents on a 50,000-line legacy codebase. Only 2 finished without breaking tests. Here's what we learned:"

🔥 Hook 3 (Direct Value):
"Stop writing boilerplate CRUD endpoints by hand. We open-sourced the exact prompt sandbox we used to ship 4 MVPs in 14 days 🧵👇"`,
    "gpt-4o": `1. "The software engineering landscape changed today. Meet the first autonomous tool that doesn't just autocomplete code—it tests and deploys it."
2. "How 1 engineer built what usually takes a team of 6 (and the exact stack used)."
3. "If you are still writing manual unit tests in 2026, you are throwing away 4 hours a day."`,
    "deepseek-r1": `<think>
Target audience: Founders, technical leads, and indie hackers.
Core drivers: Time savings, competitive advantage, engineering proof.
</think>

Option 1: "AI didn't take developer jobs. It made single-person billion dollar software companies mathematically viable. Here is the blueprint:"
Option 2: "We benchmarked 4 frontier models on refactoring a messy SQL schema. The results will shock senior DBAs:"`
  },
  "python-debug": {
    "claude-3-5": `import asyncio
import aiohttp
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("AsyncScraper")

async def fetch_with_backoff(session: aiohttp.ClientSession, url: str, max_retries: int = 3) -> dict:
    for attempt in range(1, max_retries + 1):
        try:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as response:
                if response.status == 200:
                    return await response.json()
                logger.warning(f"Attempt {attempt}: Received status {response.status} from {url}")
        except Exception as e:
            logger.error(f"Attempt {attempt} failed for {url}: {e}")
            if attempt == max_retries:
                raise
            # Exponential backoff
            await asyncio.sleep(2 ** attempt)
    return {}

async def main():
    urls = ["https://api.github.com/repos/facebook/react", "https://api.github.com/repos/vercel/next.js"]
    async with aiohttp.ClientSession(headers={"User-Agent": "NeuroVault-Bot"}) as session:
        tasks = [fetch_with_backoff(session, url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        print("Scraped payloads:", len(results))

if __name__ == "__main__":
    asyncio.run(main())`,
    "gpt-4o": `import asyncio, aiohttp

async def resilient_fetch(session, url, retries=3):
    for i in range(retries):
        try:
            async with session.get(url) as resp:
                return await resp.text()
        except aiohttp.ClientError:
            await asyncio.sleep(2 ** i)
    return None`,
    "deepseek-r1": `<think>
Optimizing concurrency with Semaphore to avoid connection pool exhaustion and adhering to PEP-8 standards.
</think>

import asyncio
import aiohttp

sem = asyncio.Semaphore(10)

async def bounded_fetch(session, url):
    async with sem:
        async with session.get(url) as response:
            return await response.json()`
  }
};

export default function AIPlayground() {
  const [selectedModel, setSelectedModel] = useState("claude-3-5");
  const [promptInput, setPromptInput] = useState(PRESET_TEMPLATES[0].prompt);
  const [activeTemplate, setActiveTemplate] = useState("react-card");
  const [temperature, setTemperature] = useState(0.7);
  const [output, setOutput] = useState(MOCK_RESPONSES["react-card"]["claude-3-5"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (template) => {
    setActiveTemplate(template.id);
    setPromptInput(template.prompt);
    const resp = MOCK_RESPONSES[template.id]?.[selectedModel] || "Prompt response prepared.";
    setOutput(resp);
  };

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    const resp = MOCK_RESPONSES[activeTemplate]?.[modelId] || MOCK_RESPONSES[activeTemplate]?.["claude-3-5"] || "Response simulated.";
    setOutput(resp);
  };

  const handleRunPrompt = () => {
    setIsGenerating(true);
    setOutput("");

    const fullResponse = MOCK_RESPONSES[activeTemplate]?.[selectedModel] || 
      `// Simulated response for ${MODEL_PROFILES.find(m => m.id === selectedModel)?.name}\n\nTask: "${promptInput.substring(0, 40)}..."\n\nGenerated comprehensive output with optimal accuracy and temperature ${temperature}.`;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 12;
      setOutput(fullResponse.substring(0, currentIndex));
      if (currentIndex >= fullResponse.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="playground" className="playground-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="hero-badge" style={{ marginBottom: '14px' }}>
            <Cpu size={14} />
            <span>Interactive Model Sandbox</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
            Live <span className="gradient-text">AI Prompt Playground</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Test realistic prompt templates across leading frontier AI models in real time.
          </p>
        </div>

        {/* Playground Container */}
        <div className="playground-box">
          {/* Top Control Bar */}
          <div className="playground-top-bar">
            {/* Model Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Model:
              </span>
              {MODEL_PROFILES.map(model => (
                <button
                  key={model.id}
                  onClick={() => handleModelChange(model.id)}
                  className="btn btn-sm"
                  style={{
                    background: selectedModel === model.id ? 'var(--bg-card-hover)' : 'var(--bg-primary)',
                    border: `1px solid ${selectedModel === model.id ? model.color : 'var(--border-subtle)'}`,
                    color: selectedModel === model.id ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: model.color }} />
                  <span>{model.name}</span>
                </button>
              ))}
            </div>

            {/* Temperature Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders size={14} color="var(--text-muted)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Temp: <strong style={{ color: 'var(--text-primary)' }}>{temperature}</strong>
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                style={{ accentColor: 'var(--accent-primary)', width: '80px', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div style={{ padding: '14px 24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Quick Templates:
            </span>
            {PRESET_TEMPLATES.map(tmpl => {
              const Icon = tmpl.icon;
              const isActive = activeTemplate === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`tag-filter-chip ${isActive ? 'active' : ''}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                >
                  <Icon size={12} />
                  <span>{tmpl.title}</span>
                </button>
              );
            })}
          </div>

          {/* Editor & Output Split Grid */}
          <div className="playground-grid">
            {/* Left Prompt Input Pane */}
            <div className="playground-pane playground-pane-left">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  User Prompt Input
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {promptInput.length} chars
                </span>
              </div>

              <textarea
                className="prompt-textarea"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Type your prompt here..."
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <button
                  onClick={handleRunPrompt}
                  disabled={isGenerating || !promptInput.trim()}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {isGenerating ? (
                    <>
                      <RotateCw size={15} className="animate-spin" />
                      <span>Simulating Stream...</span>
                    </>
                  ) : (
                    <>
                      <Play size={15} fill="currentColor" />
                      <span>Run Prompt on {MODEL_PROFILES.find(m => m.id === selectedModel)?.name}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Output Stream Pane */}
            <div className="playground-pane">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--accent-primary)" />
                  Simulated Model Response
                </span>

                <button
                  onClick={handleCopy}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                >
                  {copied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy Output"}</span>
                </button>
              </div>

              <div className="output-container">
                {output || (
                  <span style={{ color: 'var(--text-muted)' }}>
                    Click "Run Prompt" to stream output...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
