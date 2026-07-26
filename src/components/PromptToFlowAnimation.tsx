import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'

/**
 * Hero left-column animation: "type a prompt → we build the flow."
 *
 * Four phases on a ~9s loop:
 *   1. typing — the prompt types itself character-by-character (mono, blinking cursor)
 *   2. flow   — 5 labelled nodes land left-to-right, connectors draw between them
 *   3. hold   — the finished flow sits still
 *   4. exit   — everything fades, then the next prompt starts
 *
 * Framer Motion drives the node fade-in and the connector draw; CSS keyframes
 * drive the two continuous loops (cursor blink, connector dash-flow) since they
 * run independently of React state.
 *
 * Browser-only — mount it through <ClientOnly> with <PromptToFlowStatic /> as
 * the fallback so the prerender emits the final frame and nothing shifts on
 * hydration. The two render identical markup, so the reserved height matches.
 */

const PROMPTS = [
    'Build me an agent that books dental appointments and follows up on WhatsApp',
    'Create a flow to recover abandoned carts on WhatsApp',
    'Set up an agent to qualify inbound leads and schedule demos',
]

const NODES = ['Trigger', 'Prompt', 'Claude', 'MCP', 'Send']

/** ms per character while typing — ~2s for the longest prompt */
const TYPE_MS = 26
/** pause after the prompt finishes before the flow starts building */
const SETTLE_MS = 350
/** node stagger (0.4s x 5) plus a beat to read the finished flow */
const FLOW_MS = 3500
const HOLD_MS = 2000
/** fade-out plus the gap before the next prompt */
const EXIT_MS = 1600

const NODE_STAGGER = 0.4

type Phase = 'typing' | 'flow' | 'hold' | 'exit'

/**
 * The finished frame, rendered flat with no motion. Used for the prerendered
 * HTML and for visitors who ask for reduced motion.
 */
export function PromptToFlowStatic() {
    return (
        <div className="ptf" aria-hidden="true">
            <div className="ptf__prompt-wrap">
                <span className="ptf__caret">&gt;</span>
                <span className="ptf__prompt">{PROMPTS[0]}</span>
            </div>

            <div className="ptf__flow">
                {NODES.map((label, i) => (
                    <div className="ptf__step" key={label}>
                        {i > 0 && (
                            <div className="ptf__link">
                                <span className="ptf__link-line" />
                            </div>
                        )}
                        <div className="ptf__node">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(onChange: () => void) {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
}

function usePrefersReducedMotion(): boolean {
    return useSyncExternalStore(
        subscribeReducedMotion,
        () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
        () => false,
    )
}

export default function PromptToFlowAnimation() {
    const reducedMotion = usePrefersReducedMotion()

    const [promptIndex, setPromptIndex] = useState(0)
    const [typed, setTyped] = useState('')
    const [phase, setPhase] = useState<Phase>('typing')
    /** bumped every loop so the flow remounts and replays its entry animation */
    const [cycle, setCycle] = useState(0)

    const fullPrompt = PROMPTS[promptIndex]

    // Phase 1 — type the prompt one character at a time.
    useEffect(() => {
        if (reducedMotion || phase !== 'typing') return

        let i = 0
        const id = setInterval(() => {
            i += 1
            setTyped(fullPrompt.slice(0, i))
            if (i >= fullPrompt.length) clearInterval(id)
        }, TYPE_MS)

        return () => clearInterval(id)
    }, [reducedMotion, phase, fullPrompt])

    // Phases 2-4 — advance on a timer once the prompt is fully typed.
    useEffect(() => {
        if (reducedMotion) return

        let id: ReturnType<typeof setTimeout> | undefined

        if (phase === 'typing') {
            if (typed !== fullPrompt) return
            id = setTimeout(() => setPhase('flow'), SETTLE_MS)
        } else if (phase === 'flow') {
            id = setTimeout(() => setPhase('hold'), FLOW_MS)
        } else if (phase === 'hold') {
            id = setTimeout(() => setPhase('exit'), HOLD_MS)
        } else {
            id = setTimeout(() => {
                setPromptIndex((n) => (n + 1) % PROMPTS.length)
                setTyped('')
                setCycle((n) => n + 1)
                setPhase('typing')
            }, EXIT_MS)
        }

        return () => clearTimeout(id)
    }, [reducedMotion, phase, typed, fullPrompt])

    if (reducedMotion) return <PromptToFlowStatic />

    const exiting = phase === 'exit'
    const showFlow = phase === 'flow' || phase === 'hold' || exiting

    return (
        <motion.div
            className="ptf"
            aria-hidden="true"
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: exiting ? 0.6 : 0.3, ease: 'easeInOut' }}
        >
            <div className="ptf__prompt-wrap">
                <span className="ptf__caret">&gt;</span>
                <span className="ptf__prompt">
                    {typed}
                    <span className="ptf__cursor">|</span>
                </span>
            </div>

            <div className="ptf__flow" key={cycle}>
                {NODES.map((label, i) => (
                    <div className="ptf__step" key={label}>
                        {i > 0 && (
                            <div className="ptf__link">
                                <motion.span
                                    className="ptf__link-line"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={
                                        showFlow
                                            ? { scale: 1, opacity: 1 }
                                            : { scale: 0, opacity: 0 }
                                    }
                                    transition={{
                                        duration: 0.35,
                                        delay: showFlow ? i * NODE_STAGGER - 0.2 : 0,
                                        ease: 'easeOut',
                                    }}
                                />
                            </div>
                        )}
                        <motion.div
                            className="ptf__node"
                            initial={{ opacity: 0, y: 8, scale: 0.94 }}
                            animate={
                                showFlow
                                    ? { opacity: 1, y: 0, scale: 1 }
                                    : { opacity: 0, y: 8, scale: 0.94 }
                            }
                            transition={{
                                duration: 0.4,
                                delay: showFlow ? i * NODE_STAGGER : 0,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {label}
                        </motion.div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
