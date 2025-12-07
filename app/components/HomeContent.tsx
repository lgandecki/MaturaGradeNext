"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Share2,
  RefreshCcw,
  Copy,
  Check,
  Maximize2,
  ArrowLeft,
  Sparkles,
  ChevronDown,
  PenTool,
  Info,
  User,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import { useToast } from "@/app/hooks/use-toast";
import { cn } from "@/lib/utils";
import { gradeMaturaAction } from "../actions/grade-matura-action";
import { serverGradingToUi } from "../serverGradingToUi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Header } from "./Header";
import { GradingResult } from "../gradingResultSchema";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { STRINGS, Lang } from "@/lib/strings";

export const ErrorCountBox = ({ label, count }: { label: string; count: number }) => {
  const isError = count > 0;
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-1.5 rounded-lg transition-colors min-w-[100px]",
        isError ? "bg-rose-50/80 text-rose-900" : "bg-slate-50/50 text-slate-500"
      )}
    >
      <span className="text-[9px] uppercase tracking-widest opacity-60 font-bold mb-0.5 text-center">{label}</span>
      <span className={cn("text-xl font-serif font-bold leading-none", isError ? "text-rose-600" : "text-slate-400")}>
        {count}
      </span>
    </div>
  );
};

export const GradingRow = ({
  number,
  label,
  score,
  maxScore,
  errorLabel,
  errorCount,
  description,
  children,
}: {
  number: string;
  label: string;
  score: number;
  maxScore: number;
  errorLabel?: string;
  errorCount?: number;
  description?: string;
  children?: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-border/40 rounded-xl mb-3 overflow-hidden transition-all hover:shadow-sm hover:border-border/80">
      <div
        className="flex flex-col md:flex-row md:items-center gap-4 p-4 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4 md:w-1/3">
          <div
            className={cn(
              "w-8 h-8 flex items-center justify-center text-sm font-bold font-serif rounded-md shadow-sm shrink-0 transition-colors",
              isExpanded
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground group-hover:bg-primary/10"
            )}
          >
            {number}
          </div>
          <span className="font-medium text-base leading-tight text-primary/90">{label}</span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 md:gap-8">
          {errorLabel && errorCount !== undefined && <ErrorCountBox label={errorLabel} count={errorCount} />}

          <div className="flex items-baseline gap-1.5 min-w-[70px] justify-end">
            <span className="text-2xl font-bold font-serif text-primary">{score}</span>
            <span className="text-muted-foreground font-light text-lg">/ {maxScore}</span>
          </div>

          <div
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground/40 transition-all duration-300 group-hover:bg-accent/10 group-hover:text-accent",
              isExpanded && "rotate-180 bg-accent/10 text-accent"
            )}
          >
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 pt-0 ml-0 md:ml-16">
              <div className="pt-4 text-sm text-muted-foreground border-t border-dashed border-border/50">
                {description && (
                  <div className="flex gap-2 mb-4 text-primary/70 bg-secondary/30 p-3 rounded-md">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <p className="italic leading-relaxed">{description}</p>
                  </div>
                )}
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Submission type derived from Convex query
// The type includes undefined for when useQuery is loading
export type Submission = FunctionReturnType<typeof api.submissions.get> | undefined;

export interface HomeContentProps {
  submission: Submission;
  sessionId: string | null;
  onSubmissionCreated: (submissionId: Id<"submissions">) => void;
  onReset: () => void;
}

export function HomeContent({ submission, sessionId, onSubmissionCreated, onReset }: HomeContentProps) {
  const { executeAsync } = useAction(gradeMaturaAction);
  const router = useRouter();
  const { isSignedIn, isLoaded: isAuthLoaded } = useUser();
  const lang: Lang = (process.env.NEXT_PUBLIC_DEMO_LANG as Lang) === "en" ? "en" : "pl";

  // Derive isGrading from submission status
  const isGrading = useMemo(() => {
    if (!submission) return false;
    return submission.status === "pending" || submission.status === "processing";
  }, [submission]);

  // Derive initial state from preloaded submission
  const [text, setText] = useState(() => submission?.text ?? "");
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(() => {
    if (submission?.status === "completed" && submission.result) {
      return serverGradingToUi(submission.result);
    }
    return null;
  });
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result as string;
          setText(content);
          toast({
            title: STRINGS.toastLoadedTitle[lang],
            description: `${STRINGS.toastLoadedDesc[lang]} ${file.name}`,
          });
        };
        reader.readAsText(file);
      }
    },
    [toast, lang]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/plain": [".txt"], "application/markdown": [".md"] },
  });

  const handleGrade = async () => {
    if (!text.trim()) {
      toast({
        title: STRINGS.toastEmptyTitle[lang],
        description: STRINGS.toastEmptyDesc[lang],
        variant: "destructive",
      });
      return;
    }

    setIsWritingMode(false);
    setProgress(0);
    setResult(null);
    setIsSubmitting(true);

    // sessionId is optional - server action will create one if needed
    const response = await executeAsync({ text, sessionId: sessionId ?? undefined });
    if (response?.data?.submissionId) {
      // Notify parent about the new submission
      onSubmissionCreated(response.data.submissionId);
    } else {
      setIsSubmitting(false);
      if (response?.serverError) {
        toast({
          title: STRINGS.toastErrorTitle[lang],
          description: STRINGS.toastErrorDesc[lang],
          variant: "destructive",
        });
      }
    }
  };

  // Clear isSubmitting once subscription loads
  useEffect(() => {
    if (submission !== undefined && isSubmitting) {
      setIsSubmitting(false);
    }
  }, [submission, isSubmitting]);

  // Calculate progress from submission createdAt
  useEffect(() => {
    if (!isGrading || !submission?.createdAt) return;

    const duration = 5 * 60 * 1000;
    const eta = new Date(submission.createdAt + duration);
    setEstimatedTime(eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

    const interval = setInterval(() => {
      const elapsed = Date.now() - submission.createdAt;
      let newProgress = 0;

      if (elapsed < 180000) {
        newProgress = (elapsed / 180000) * 80;
      } else {
        newProgress = 80 + ((elapsed - 180000) / 120000) * 20;
      }

      if (newProgress >= 99) {
        newProgress = 99;
        clearInterval(interval);
      }
      setProgress(newProgress);
    }, 100);

    return () => clearInterval(interval);
  }, [isGrading, submission?.createdAt]);

  // Handle submission completion or failure
  useEffect(() => {
    if (!submission) return;

    if (submission.status === "completed" && submission.result) {
      setResult(serverGradingToUi(submission.result));
      setProgress(100);
      if (!text || text.trim() === "") {
        setText(submission.text);
      }
    }

    if (submission.status === "failed") {
      const isInvalidInput = submission.error === "INVALID_INPUT";
      toast({
        title: isInvalidInput ? STRINGS.toastInvalidInputTitle[lang] : STRINGS.toastErrorTitle[lang],
        description: isInvalidInput ? STRINGS.toastInvalidInputDesc[lang] : STRINGS.toastErrorDesc[lang],
        variant: "destructive",
      });
      onReset();
    }
  }, [submission?.status, submission?.result, submission?.error, submission?.text, toast, text, onReset, lang]);

  // Close sign-up tracking when user signs in
  useEffect(() => {
    if (isSignedIn) {
      setIsSignUpOpen(false);
    }
  }, [isSignedIn]);

  const handleReset = () => {
    setText("");
    setResult(null);
    onReset();
  };

  const handleShare = () => {
    setCopied(true);
    const msg = STRINGS.shareMessage[lang]
      .replace("{score}", result?.totalScore.toString() ?? "0")
      .replace("{max}", result?.maxTotalScore.toString() ?? "0");

    navigator.clipboard.writeText(msg);
    toast({
      title: STRINGS.toastCopyTitle[lang],
      description: STRINGS.toastCopyDesc[lang],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const enterWritingMode = () => {
    if (!text) setText(" ");
    setIsWritingMode(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-7xl mx-auto relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-[-1] bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.15),transparent_50%)]" />

      <Dialog open={(isSubmitting || isGrading) && !isSignUpOpen} onOpenChange={() => {}}>
        <DialogContent
          className="sm:max-w-md"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-accent h-5 w-5" />
              {STRINGS.dialogAnalyzingTitle[lang]}
            </DialogTitle>
            <DialogDescription className="pt-2">
              {STRINGS.dialogAnalyzingDesc[lang]}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{STRINGS.dialogProgress[lang]}</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 text-sm text-muted-foreground flex items-start gap-3">
              <Info className="h-5 w-5 shrink-0 text-primary/60 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-primary/80">{STRINGS.dialogEstimatedTime[lang]} {estimatedTime}</p>
                <p className="text-xs">{STRINGS.dialogPatience[lang]}</p>
              </div>
            </div>

            {isAuthLoaded && !isSignedIn && submission && (
              <div className="bg-accent/10 rounded-lg p-4 text-sm flex items-start gap-3 border border-accent/20">
                <User className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <div className="space-y-2">
                  <p className="font-medium text-primary/80">{STRINGS.dialogSignUpTitle[lang]}</p>
                  <p className="text-xs text-muted-foreground">
                    {STRINGS.dialogSignUpDesc[lang]}
                  </p>
                  <SignUpButton
                    mode="modal"
                    forceRedirectUrl={`/submission/${submission._id}`}
                    signInForceRedirectUrl={`/submission/${submission._id}`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-1"
                      onClick={() => setIsSignUpOpen(true)}
                    >
                      {STRINGS.dialogSignUpButton[lang]}
                    </Button>
                  </SignUpButton>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Screen Writing Mode Overlay */}
      <AnimatePresence>
        {isWritingMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center overflow-hidden"
            data-testid="writing-mode-overlay"
          >
            <div className="w-full max-w-6xl px-4 py-4 flex justify-between items-center z-10">
              <Button
                variant="ghost"
                onClick={() => setIsWritingMode(false)}
                className="text-muted-foreground hover:text-primary gap-2 hover:bg-white/50"
              >
                <ArrowLeft size={18} /> {STRINGS.writingBack[lang]}
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground font-serif italic px-4 py-1 bg-white/50 rounded-full backdrop-blur-sm border border-border/20 shadow-sm">
                <PenTool size={14} />
                {STRINGS.writingFocus[lang]}
              </div>

              <Button
                onClick={handleGrade}
                className="bg-primary text-white hover:bg-primary/90 gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles size={16} />
                {STRINGS.writingGrade[lang]}
              </Button>
            </div>

            <div className="flex-1 w-full overflow-y-auto pb-20 px-4 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-3xl bg-white shadow-2xl my-4 min-h-[85vh] relative"
              >
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_23px,#e5e7eb_24px)] bg-[size:100%_24px] opacity-10 mt-12" />
                <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-red-300/30 pointer-events-none hidden md:block" />

                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={STRINGS.writingPlaceholder[lang]}
                  className="w-full h-full min-h-[85vh] resize-none py-12 px-8 md:px-16 text-lg md:text-xl leading-[24px] font-serif bg-transparent border-none focus:ring-0 focus:outline-none text-primary placeholder:text-muted-foreground/30 relative z-10"
                  spellCheck={false}
                  autoFocus
                />
              </motion.div>
            </div>

            <div className="fixed bottom-6 right-6 md:right-12 z-10">
              <div className="bg-white/80 backdrop-blur-md border border-border shadow-lg rounded-full px-4 py-2 text-xs md:text-sm text-muted-foreground flex gap-4 items-center">
                <span>{STRINGS.writingSaved[lang]} {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                <div className="w-px h-3 bg-border" />
                <span className="font-medium text-primary">
                  {text.split(/\s+/).filter((w) => w.length > 0).length} {STRINGS.writingWords[lang]}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "flex flex-col gap-4 relative z-0",
            result && "lg:sticky lg:top-8 lg:self-start lg:h-[calc(100vh-4rem)]"
          )}
        >
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-serif font-medium flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-sans">
                1
              </span>
              {STRINGS.inputTitle[lang]}
            </h2>
            {text && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                data-testid="button-reset"
              >
                <RefreshCcw size={14} className="mr-2" />
                {STRINGS.inputReset[lang]}
              </Button>
            )}
          </div>

          <div className="relative group rounded-xl overflow-hidden shadow-sm transition-shadow hover:shadow-md border border-border/60 bg-white flex-1">
            {!text ? (
              <div
                {...getRootProps()}
                className={`
                  h-[600px] flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300
                  ${isDragActive ? "bg-accent/5" : "hover:bg-gray-50/50"}
                `}
                data-testid="dropzone-input"
              >
                <input {...getInputProps()} data-testid="input-file" />
                <div
                  className={`
                  w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500
                  ${isDragActive ? "bg-accent text-white scale-110" : "bg-secondary text-muted-foreground group-hover:scale-105"}
                `}
                >
                  <Upload size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-3 text-primary">{STRINGS.dropzoneDrop[lang]}</h3>
                <p className="text-muted-foreground max-w-xs text-sm leading-relaxed mb-8">
                  {STRINGS.dropzoneFormats[lang]}
                  <br />
                  {STRINGS.dropzoneManual[lang]}
                </p>
                <Button
                  variant="outline"
                  className="border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary font-medium px-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    enterWritingMode();
                  }}
                  data-testid="button-manual-write"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {STRINGS.buttonManual[lang]}
                </Button>
              </div>
            ) : (
              <div className={cn("relative", result ? "h-full" : "h-[600px]")}>
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary bg-white/50 backdrop-blur-sm"
                    onClick={enterWritingMode}
                    title={STRINGS.writingFocus[lang]}
                    data-testid="button-expand"
                  >
                    <Maximize2 size={18} />
                  </Button>
                </div>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={STRINGS.textareaPlaceholder[lang]}
                  className="h-full resize-none p-8 text-lg leading-relaxed font-serif bg-transparent border-none focus:ring-0 focus:outline-none text-primary/90"
                  spellCheck={false}
                  data-testid="textarea-content"
                />
                <div
                  className="absolute bottom-4 right-4 text-xs font-medium text-muted-foreground/80 bg-secondary/50 px-3 py-1.5 rounded-full backdrop-blur-sm"
                  data-testid="text-word-count"
                >
                  {text.split(/\s+/).filter((w) => w.length > 0).length} {STRINGS.writingWords[lang]}
                </div>
              </div>
            )}
          </div>

          {result ? null : (
            <Button
              size="lg"
              className={`
              w-full text-lg h-14 font-serif mt-4 transition-all duration-300
              ${isSubmitting || isGrading ? "opacity-80 cursor-not-allowed" : "hover:translate-y-[-2px] shadow-lg hover:shadow-xl"}
            `}
              onClick={handleGrade}
              disabled={isSubmitting || isGrading || !text}
              data-testid="button-grade"
            >
              {isSubmitting || isGrading ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
                  {STRINGS.buttonAnalyzing[lang]}
                </span>
              ) : (
                STRINGS.writingGrade[lang]
              )}
            </Button>
          )}
        </motion.div>

        {/* Results Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-0">
          <div className="flex justify-between items-center px-1 mb-4">
            <h2 className="text-xl font-serif font-medium flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-sans">
                2
              </span>
              {STRINGS.resultTitle[lang]}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-[600px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-border rounded-xl bg-white/20"
                data-testid="container-empty-state"
              >
                <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-muted-foreground/40" />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-3 text-muted-foreground/70">{STRINGS.resultEmptyTitle[lang]}</h3>
                <p className="text-muted-foreground/60 max-w-md leading-relaxed">
                  {STRINGS.resultEmptyDesc[lang]}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6 h-full"
                data-testid="container-result"
              >
                <Card className="p-8 bg-white shadow-xl border-none relative overflow-hidden min-h-[600px] flex flex-col">
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex justify-between items-start mb-8 border-b border-border pb-6">
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-2">
                        {STRINGS.resultScoreLabel[lang]}
                      </p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-7xl font-serif font-bold text-primary" data-testid="text-score">
                          {result.totalScore}
                        </span>
                        <span className="text-3xl text-muted-foreground font-light">/ {result.maxTotalScore}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`
                        w-20 h-20 rounded-full border-[3px] flex items-center justify-center rotate-12 shadow-sm
                        ${result.totalScore / result.maxTotalScore > 0.7 ? "border-green-500 text-green-600 bg-green-50" : "border-accent text-accent-foreground bg-accent/10"}
                      `}
                      >
                        <span className="text-2xl font-bold font-serif" data-testid="text-percentage">
                          {Math.round((result.totalScore / result.maxTotalScore) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <GradingRow
                      number="1."
                      label={STRINGS.critFormal[lang]}
                      score={result.criteria.formalRequirements.points}
                      maxScore={1}
                    >
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {[
                          {
                            label: STRINGS.critFormalCardError[lang],
                            active: result.criteria.formalRequirements.reasons.cardinalError,
                          },
                          { label: STRINGS.critFormalMissingRead[lang], active: result.criteria.formalRequirements.reasons.missingReading },
                          {
                            label: STRINGS.critFormalIrrelevant[lang],
                            active: result.criteria.formalRequirements.reasons.irrelevant,
                          },
                          {
                            label: STRINGS.critFormalNoArg[lang],
                            active: result.criteria.formalRequirements.reasons.notArgumentative,
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className={cn(
                              "text-xs p-2 border rounded text-center transition-colors",
                              item.active
                                ? "bg-red-100 border-red-300 text-red-800 font-medium"
                                : "bg-gray-50 border-gray-100 text-gray-400 line-through decoration-gray-300"
                            )}
                          >
                            {item.label}
                          </div>
                        ))}
                      </div>
                    </GradingRow>

                    <GradingRow
                      number="2."
                      label={STRINGS.critLit[lang]}
                      score={result.criteria.literaryCompetencies.points}
                      maxScore={result.criteria.literaryCompetencies.maxPoints}
                      errorLabel={STRINGS.critLitErr[lang]}
                      errorCount={result.criteria.literaryCompetencies.factualErrors}
                      description={STRINGS.critLitDesc[lang]}
                    />

                    <GradingRow
                      number="3a"
                      label={STRINGS.critStruct[lang]}
                      score={result.criteria.structure.points}
                      maxScore={result.criteria.structure.maxPoints}
                      description={STRINGS.critStructDesc[lang]}
                    />

                    <GradingRow
                      number="3b"
                      label={STRINGS.critCohere[lang]}
                      score={result.criteria.coherence.points}
                      maxScore={result.criteria.coherence.maxPoints}
                      errorLabel={STRINGS.critCohereErr[lang]}
                      errorCount={result.criteria.coherence.coherenceErrors}
                      description={STRINGS.critCohereDesc[lang]}
                    />

                    <GradingRow
                      number="3c"
                      label={STRINGS.critStyle[lang]}
                      score={result.criteria.style.points}
                      maxScore={result.criteria.style.maxPoints}
                      description={STRINGS.critStyleDesc[lang]}
                    />

                    <GradingRow
                      number="4a"
                      label={STRINGS.critLang[lang]}
                      score={result.criteria.language.points}
                      maxScore={result.criteria.language.maxPoints}
                      errorLabel={STRINGS.critLangErr[lang]}
                      errorCount={result.criteria.language.languageErrors}
                      description={STRINGS.critLangDesc[lang]}
                    />

                    <GradingRow
                      number="4b"
                      label={STRINGS.critSpell[lang]}
                      score={result.criteria.spelling.points}
                      maxScore={result.criteria.spelling.maxPoints}
                      errorLabel={STRINGS.critSpellErr[lang]}
                      errorCount={result.criteria.spelling.spellingErrors}
                      description={STRINGS.critSpellDesc[lang]}
                    />

                    <GradingRow
                      number="4c"
                      label={STRINGS.critPunct[lang]}
                      score={result.criteria.punctuation.points}
                      maxScore={result.criteria.punctuation.maxPoints}
                      errorLabel={STRINGS.critPunctErr[lang]}
                      errorCount={result.criteria.punctuation.punctuationErrors}
                      description={STRINGS.critPunctDesc[lang]}
                    />
                  </div>

                  <div className="mb-8 border-t border-border/60 pt-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                      <PenTool size={18} className="text-accent" /> {STRINGS.resultFeedbackTitle[lang]}
                    </h4>
                    <p
                      className="text-primary/80 italic leading-relaxed border-l-4 border-accent/40 pl-6 py-2 bg-accent/5 rounded-r-lg"
                      data-testid="text-feedback"
                    >
                      &ldquo;{result.feedback}&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mb-8">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-destructive flex items-center gap-2 text-sm uppercase tracking-wide">
                        <AlertCircle size={16} /> {STRINGS.resultErrorsTitle[lang]}
                      </h4>
                      <ul className="space-y-3" data-testid="list-errors">
                        {result.errors.map((err, i) => (
                          <li
                            key={i}
                            className="text-sm text-primary/80 flex items-start gap-3 bg-red-50/50 p-3 rounded border border-red-100"
                            data-testid={`item-error-${i}`}
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                            {err}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <CheckCircle size={16} /> {STRINGS.resultSuggestionsTitle[lang]}
                      </h4>
                      <ul className="space-y-3" data-testid="list-suggestions">
                        {result.suggestions.map((sugg, i) => (
                          <li
                            key={i}
                            className="text-sm text-primary/80 flex items-start gap-3 bg-green-50/50 p-3 rounded border border-green-100"
                            data-testid={`item-suggestion-${i}`}
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                            {sugg}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-auto pt-6 border-t border-border">
                    <Button
                      className="flex-1 bg-primary text-white hover:bg-primary/90 h-12 text-lg font-serif"
                      onClick={handleShare}
                      data-testid="button-share"
                    >
                      {copied ? <Check className="mr-2 h-5 w-5" /> : <Share2 className="mr-2 h-5 w-5" />}
                      {copied ? STRINGS.buttonCopied[lang] : STRINGS.buttonShare[lang]}
                    </Button>
                    <Button
                      variant="outline"
                      className="px-4 h-12 border-primary/20"
                      onClick={() =>
                        toast({ title: STRINGS.toastFeatureUnavailable[lang], description: STRINGS.toastDownloadSoon[lang] })
                      }
                      data-testid="button-download"
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
