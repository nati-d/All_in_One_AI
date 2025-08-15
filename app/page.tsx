"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  Rocket,
  Shield,
  ChevronDown,
  Play,
  Star,
  Globe,
  Code,
  Palette,
  BarChart3,
  MessageSquare,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Floating particles animation
function FloatingParticles() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Interactive AI Brain visualization
function AIBrainVisualization() {
  const [nodes] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      connections: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
        Math.floor(Math.random() * 12)
      ).filter(c => c !== i),
    }))
  );

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
      <svg className="w-full h-full">
        {/* Connections */}
        {nodes.map(node =>
          node.connections.map(targetId => {
            const target = nodes[targetId];
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke="url(#gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, delay: Math.random() * 2 }}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="4"
            fill="currentColor"
            className="text-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: node.id * 0.1 }}
            whileHover={{ scale: 1.5 }}
          />
        ))}

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Brain className="w-8 h-8 mx-auto text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Neural Processing</p>
        </motion.div>
      </div>
    </div>
  );
}

// Morphing logo component
function MorphingLogo() {
  const [currentShape, setCurrentShape] = useState(0);
  const shapes = ["circle", "square", "triangle", "hexagon"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl"
      animate={{
        borderRadius: currentShape === 0 ? "50%" : currentShape === 1 ? "0%" : currentShape === 2 ? "0%" : "25%",
        rotate: currentShape * 90,
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      AI
    </motion.div>
  );
}

// Sticky navigation
function StickyNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <MorphingLogo />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              All-in-One AI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#demo" className="text-muted-foreground hover:text-primary transition-colors">Demo</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Tool Orchestration Visualization
function ToolOrchestrationDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const tools = [
    { name: "Design", icon: Palette, color: "from-pink-500 to-rose-500", position: { x: 80, y: 60 } },
    { name: "Research", icon: Globe, color: "from-blue-500 to-cyan-500", position: { x: 320, y: 60 } },
    { name: "Legal", icon: Shield, color: "from-green-500 to-emerald-500", position: { x: 80, y: 180 } },
    { name: "Finance", icon: BarChart3, color: "from-yellow-500 to-orange-500", position: { x: 320, y: 180 } },
    { name: "Code", icon: Code, color: "from-purple-500 to-indigo-500", position: { x: 80, y: 300 } },
    { name: "Analytics", icon: Brain, color: "from-teal-500 to-blue-500", position: { x: 320, y: 300 } },
  ];

  const demoSteps = [
    {
      query: "Create a café promotion campaign",
      activeTool: 0,
      result: "Designing promotional flyer...",
      description: "AI detects design intent and routes to Design tool"
    },
    {
      query: "Analyze customer reviews",
      activeTool: 1,
      result: "Researching sentiment patterns...",
      description: "Switches to Research tool for data analysis"
    },
    {
      query: "Check food safety compliance",
      activeTool: 2,
      result: "Reviewing legal requirements...",
      description: "Routes to Legal tool for compliance check"
    },
    {
      query: "Update monthly budget",
      activeTool: 3,
      result: "Processing financial data...",
      description: "Engages Finance tool for budget management"
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % demoSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length]);

  return (
    <div className="relative w-full bg-gradient-to-br from-background/80 to-primary/5 rounded-2xl border border-primary/20 p-8">
      {/* Central AI Brain */}
      <div className="text-center mb-8">
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>
        <h4 className="font-semibold text-lg mb-2">AI Orchestrator</h4>
        <p className="text-sm text-muted-foreground">Intelligently routes your requests</p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            className={`flex flex-col items-center p-4 rounded-xl bg-background/60 border transition-all duration-500 ${activeStep < demoSteps.length && demoSteps[activeStep].activeTool === i
              ? 'border-primary bg-primary/10 shadow-lg'
              : 'border-border/50'
              }`}
            animate={{
              scale: activeStep < demoSteps.length && demoSteps[activeStep].activeTool === i ? 1.05 : 1,
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-md mb-3`}>
              <tool.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium">{tool.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Demo Query Display */}
      <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="text-sm text-muted-foreground mb-1">User Query:</div>
            <div className="font-medium mb-2">"{demoSteps[activeStep]?.query}"</div>
            <div className="text-xs text-primary">{demoSteps[activeStep]?.description}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Play/Pause Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/20 hover:bg-primary/10 transition-colors"
      >
        {isPlaying ? (
          <div className="w-3 h-3 bg-primary rounded-sm" />
        ) : (
          <Play className="w-4 h-4 text-primary ml-0.5" />
        )}
      </button>
    </div>
  );
}

// Magnificent Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <FloatingParticles />

      {/* Magnificent Dynamic Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/10" />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.1)_100%)]" />
      </div>

      {/* Content Container with better spacing */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Spacer to push content down from nav */}
        <div className="h-20 md:h-32"></div>

        <motion.div
          className="flex-1 flex flex-col justify-center text-center max-w-7xl mx-auto px-4 pb-20"
          style={{ y, opacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <Badge variant="outline" className="px-4 py-2 text-sm bg-gradient-to-r from-primary/20 to-purple-500/20 border-primary/40 backdrop-blur-md">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Tool Orchestrator
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.span
              className="block bg-gradient-to-r from-white via-primary to-purple-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              One Chat.
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Every Tool.
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Stop switching between apps. Just describe what you need, and watch our AI
            <span className="text-primary font-semibold"> intelligently orchestrate </span>
            the perfect tool for every task.
          </motion.p>

          {/* Animated Process Diagram */}
          <motion.div
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-2xl p-8 border border-primary/20 backdrop-blur-sm">
              {/* Process Flow */}
              <div className="flex items-center justify-between relative px-4">
                {/* Step 1: User Input */}
                <motion.div
                  className="flex flex-col items-center z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-base mb-2">You Ask</div>
                    <div className="text-sm text-muted-foreground max-w-24">
                      "Create a café campaign"
                    </div>
                  </div>
                </motion.div>

                {/* Animated Arrow 1 */}
                <motion.div
                  className="flex-1 flex items-center justify-center mx-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  <motion.div
                    className="flex items-center"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
                      <div className="w-0 h-0 border-l-[8px] border-l-primary border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Step 2: AI Processing */}
                <motion.div
                  className="flex flex-col items-center z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-primary to-purple-500 rounded-3xl flex items-center justify-center mb-4 shadow-xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="text-center">
                    <div className="font-semibold text-base mb-2">AI Routes</div>
                    <div className="text-sm text-muted-foreground max-w-24">
                      Selects best tools
                    </div>
                  </div>
                </motion.div>

                {/* Animated Arrow 2 */}
                <motion.div
                  className="flex-1 flex items-center justify-center mx-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <motion.div
                    className="flex items-center"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
                      <div className="w-0 h-0 border-l-[8px] border-l-primary border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Step 3: Multiple Tools */}
                <motion.div
                  className="flex flex-col items-center z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  <div className="relative mb-4">
                    {/* Tool Icons */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-background/60 rounded-2xl border border-primary/20">
                      {[
                        { icon: Palette, color: "from-pink-500 to-rose-500" },
                        { icon: Globe, color: "from-blue-500 to-cyan-500" },
                        { icon: BarChart3, color: "from-yellow-500 to-orange-500" },
                        { icon: Shield, color: "from-green-500 to-emerald-500" }
                      ].map((tool, i) => (
                        <motion.div
                          key={i}
                          className={`w-8 h-8 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center shadow-md`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.9 + i * 0.1, duration: 0.3 }}
                        >
                          <tool.icon className="w-4 h-4 text-white" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-base mb-2">Tools Work</div>
                    <div className="text-sm text-muted-foreground max-w-24">
                      Design, research, analyze
                    </div>
                  </div>
                </motion.div>

                {/* Animated Arrow 3 */}
                <motion.div
                  className="flex-1 flex items-center justify-center mx-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                >
                  <motion.div
                    className="flex items-center"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
                      <div className="w-0 h-0 border-l-[8px] border-l-primary border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Step 4: Results */}
                <motion.div
                  className="flex flex-col items-center z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-base mb-2">You Get Results</div>
                    <div className="text-sm text-muted-foreground max-w-24">
                      Complete campaign ready
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Label */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                  <Sparkles className="w-3 h-3 mr-1" />
                  All in one conversation
                </Badge>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Buttons - Normal Size */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="px-8 py-3 text-base bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transform hover:scale-105 transition-all duration-200 shadow-lg"
              asChild
            >
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-base border-primary/30 hover:bg-primary/10 transform hover:scale-105 transition-all duration-200 backdrop-blur-sm"
            >
              <Play className="mr-2 w-4 h-4" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Live Demo */}
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                See It Live
              </h3>
              <p className="text-muted-foreground">
                Watch AI intelligently route your requests to the right tools
              </p>
            </div>

            <Card className="bg-background/30 backdrop-blur-md border-primary/30 overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <ToolOrchestrationDemo />
              </CardContent>
            </Card>
          </motion.div>

          {/* Visual Example */}
          <motion.div
            className="max-w-4xl mx-auto mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <div className="text-center mb-8">
              <h4 className="text-xl font-semibold mb-2">Real Example: Café Owner</h4>
              <p className="text-muted-foreground text-sm">Watch one conversation handle multiple tasks</p>
            </div>

            {/* Visual Flow */}
            <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">One Chat Session</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                <div className="flex gap-2">
                  {[
                    { icon: Palette, color: "from-pink-500 to-rose-500" },
                    { icon: Globe, color: "from-blue-500 to-cyan-500" },
                    { icon: BarChart3, color: "from-yellow-500 to-orange-500" },
                    { icon: Shield, color: "from-green-500 to-emerald-500" }
                  ].map((tool, i) => (
                    <motion.div
                      key={i}
                      className={`w-8 h-8 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2 + i * 0.2, duration: 0.3 }}
                    >
                      <tool.icon className="w-4 h-4 text-white" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-background/60 rounded-lg p-3 text-center">
                  <Palette className="w-4 h-4 mx-auto mb-1 text-pink-500" />
                  <div className="font-medium">Flyer Design</div>
                </div>
                <div className="bg-background/60 rounded-lg p-3 text-center">
                  <Globe className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                  <div className="font-medium">Review Analysis</div>
                </div>
                <div className="bg-background/60 rounded-lg p-3 text-center">
                  <BarChart3 className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
                  <div className="font-medium">Budget Update</div>
                </div>
                <div className="bg-background/60 rounded-lg p-3 text-center">
                  <Shield className="w-4 h-4 mx-auto mb-1 text-green-500" />
                  <div className="font-medium">Compliance Check</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <ChevronDown className="w-10 h-10 text-muted-foreground/60" />
      </motion.div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StickyNav />
      <HeroSection />

      {/* Features section */}
      <section id="features" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Beyond Imagination
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience AI capabilities that redefine what's possible. Every feature designed to amplify human potential.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Quantum Speed",
                desc: "Process complex requests in nanoseconds with our quantum-inspired architecture",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: Brain,
                title: "Neural Fusion",
                desc: "Advanced multi-modal AI that thinks, reasons, and creates like never before",
                gradient: "from-purple-400 to-pink-500"
              },
              {
                icon: Shield,
                title: "Fort Knox Security",
                desc: "Military-grade encryption with zero-knowledge architecture",
                gradient: "from-green-400 to-blue-500"
              },
              {
                icon: Globe,
                title: "Universal Access",
                desc: "Available in 100+ languages with cultural context awareness",
                gradient: "from-blue-400 to-cyan-500"
              },
              {
                icon: Code,
                title: "Code Whisperer",
                desc: "Generate, debug, and optimize code in any programming language",
                gradient: "from-red-400 to-pink-500"
              },
              {
                icon: Palette,
                title: "Creative Genius",
                desc: "Design, art, and creative content that rivals human imagination",
                gradient: "from-indigo-400 to-purple-500"
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -10, rotateX: 5 }}
                className="group perspective-1000"
              >
                <Card className="h-full bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 transform-gpu hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-24 px-4 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch as our AI transforms ideas into reality in real-time
            </p>
          </motion.div>

          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Card className="overflow-hidden bg-background/80 backdrop-blur-md border-primary/30">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Chat Interface Preview */}
                  <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground ml-4">All-in-One AI Chat</span>
                    </div>

                    <div className="space-y-4">
                      <motion.div
                        className="bg-background/60 rounded-lg p-4 ml-auto max-w-md"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-sm">I need a promotional campaign for my café's summer menu</p>
                      </motion.div>

                      <motion.div
                        className="bg-primary/20 rounded-lg p-4 mr-auto max-w-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">AI Orchestrator</span>
                        </div>
                        <p className="text-sm mb-3">I'll handle this campaign across multiple tools:</p>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Palette className="w-3 h-3 text-pink-400" />
                            <span>Design Tool: Creating summer menu flyer...</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-3 h-3 text-blue-400" />
                            <span>Research Tool: Analyzing seasonal trends...</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-3 h-3 text-yellow-400" />
                            <span>Finance Tool: Calculating promotion budget...</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {["Auto-Routed", "Multi-Tool", "One Conversation"].map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-primary/10">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                      asChild
                    >
                      <Link href="/signup">
                        Try It Now
                        <ArrowUpRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our core AI capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Individual",
                price: "$50",
                period: "/month",
                description: "Perfect for freelancers and solo professionals",
                features: [
                  "All AI tools included",
                  "Unlimited tool orchestration",
                  "Task history & analytics",
                  "Email support",
                  "Standard processing speed"
                ],
                popular: false
              },
              {
                name: "Business",
                price: "$200",
                period: "/month",
                description: "Ideal for teams and growing businesses",
                features: [
                  "Everything in Individual",
                  "Team collaboration",
                  "Advanced analytics",
                  "Priority support",
                  "Custom workflows",
                  "Up to 10 users"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large organizations with specific needs",
                features: [
                  "Everything in Business",
                  "Unlimited users",
                  "Custom AI models",
                  "Dedicated support",
                  "On-premise deployment",
                  "SLA guarantee"
                ],
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card className={`h-full ${plan.popular ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-purple-500/5' : 'border-border'} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}>
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90' : ''}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/signup">
                        {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Loved by Creators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what professionals are saying about their All-in-One AI experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Product Designer",
                company: "TechCorp",
                content: "This AI has completely transformed my design workflow. What used to take hours now takes minutes. The creative suggestions are mind-blowing!",
                avatar: "SC"
              },
              {
                name: "Marcus Rodriguez",
                role: "Software Engineer",
                company: "StartupXYZ",
                content: "I've never seen an AI that understands context this well. It's like having a senior developer pair programming with me 24/7.",
                avatar: "MR"
              },
              {
                name: "Emily Watson",
                role: "Marketing Director",
                company: "GrowthCo",
                content: "The marketing campaigns this AI helps create are incredible. Our conversion rates have increased by 300% since we started using it.",
                avatar: "EW"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <Card className="h-full bg-gradient-to-br from-background/80 to-primary/5 border-primary/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of professionals who have already revolutionized their productivity with All-in-One AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="px-12 py-4 text-lg bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/signup">
                  Start Free Trial
                  <Rocket className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-12 py-4 text-lg border-primary/20 hover:bg-primary/10 transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/login">
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <MorphingLogo />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  All-in-One AI
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The future of AI interaction is here. Transform your workflow with intelligent automation and creative assistance.
              </p>
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">Trusted by 10,000+ users</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#demo" className="hover:text-primary transition-colors">Demo</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 All-in-One AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
