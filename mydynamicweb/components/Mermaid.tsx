import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
  className?: string
}

export default function Mermaid({ chart, className = '' }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#ff6b35',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#ff6b35',
        lineColor: '#f7c531',
        secondaryColor: '#1a1a1a',
        tertiaryColor: '#2a2a2a',
        background: '#0a0a0a',
        mainBkg: '#1f1f1f',
        secondBkg: '#2a2a2a',
        border1: '#ff6b35',
        border2: '#f7c531',
        arrowheadColor: '#f7c531',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '16px',
        textColor: '#ffffff',
        nodeTextColor: '#ffffff',
        labelTextColor: '#ffffff',
        actorTextColor: '#ffffff',
        signalTextColor: '#ffffff',
        noteBkgColor: '#2a2a2a',
        noteTextColor: '#ffffff',
        activationBkgColor: '#ff6b35',
        sequenceNumberColor: '#ffffff',
      },
      flowchart: {
        curve: 'basis',
        padding: 30,
        nodeSpacing: 50,
        rankSpacing: 60,
        htmlLabels: true,
        useMaxWidth: false,
      },
      sequence: {
        actorMargin: 80,
        boxMargin: 10,
        boxTextMargin: 10,
        noteMargin: 15,
        messageMargin: 40,
        useMaxWidth: false,
      },
    })

    const renderChart = async () => {
      if (containerRef.current) {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
          const { svg } = await mermaid.render(id, chart)
          setSvg(svg)
        } catch (error) {
          console.error('Mermaid rendering error:', error)
        }
      }
    }

    renderChart()
  }, [chart])

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        maxWidth: '100%',
      }}
    />
  )
}
