import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search sounds..."
        className="pl-9 pr-8 h-9 text-sm rounded-full bg-white/70 dark:bg-white/10 border-white/50 dark:border-white/20 backdrop-blur-sm w-full md:w-56"
        aria-label="Search sounds"
      />
      {value && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} className="text-gray-400" />
        </motion.button>
      )}
    </motion.div>
  )
}
