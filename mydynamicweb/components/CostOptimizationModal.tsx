import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/Landing.module.css'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface CostOptimizationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CostOptimizationModal({ isOpen, onClose }: CostOptimizationModalProps) {
  // Conceptual Data Points (High -> Implementation -> Low)
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Infrastructure Cost',
        data: [100, 95, 80, 60, 40, 35, 30, 28], // Conceptual Drop
        borderColor: '#ff6b35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ff6b35',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.raw > 80) return 'High Spend (Inefficient Allocation)'
            if (context.raw > 40) return 'Optimization In Progress'
            return 'Optimized State (Multi-Million Savings)'
          }
        }
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 90,
            yMax: 90,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          }
        }
      }
    },
    scales: {
      y: {
        display: false, // Hide Y axis numbers to keep it conceptual
        min: 0,
        max: 120
      },
      x: {
        grid: { display: false },
        ticks: { color: '#666' }
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeModalBtn} onClick={onClose}>
              ×
            </button>

            <div className={styles.modalHeader}>
              <h3>AWS Cost Optimization Strategy</h3>
              <p>How we achieved multi-million dollar annual savings while improving reliability.</p>
            </div>

            <div className={styles.chartContainer}>
              <Line data={data} options={options} />
              
              {/* Annotations overlay */}
              <div className={styles.chartOverlay}>
                <div className={`${styles.annotation} ${styles.annoStart}`}>
                  <span>🚀 Project Start</span>
                </div>
                <div className={`${styles.annotation} ${styles.annoMid}`}>
                  <span>⚙️ Spot Instance Integration</span>
                </div>
                <div className={`${styles.annotation} ${styles.annoEnd}`}>
                  <span>✅ Multi-Million Saved</span>
                </div>
              </div>
            </div>

            <div className={styles.strategyGrid}>
              <div className={styles.strategyItem}>
                <h4>Spot Instance Orchestration</h4>
                <p>Migrated fault-tolerant training workloads to Spot Instances, leveraging up to 70% discounts.</p>
              </div>
              <div className={styles.strategyItem}>
                <h4>Resource Reaping</h4>
                <p>Implemented automated cron jobs to identify and terminate idle development instances after hours.</p>
              </div>
              <div className={styles.strategyItem}>
                <h4>Rightsizing Policy</h4>
                <p>Used CloudWatch metrics to identify over-provisioned EC2 instances and enforce rightsizing.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}