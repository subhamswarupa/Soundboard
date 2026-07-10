import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { categories } from '@/utils/sounds'

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat.id)}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
            selected === cat.id
              ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
              : 'bg-white/70 dark:bg-white/10 text-gray-600 dark:text-gray-300 border-gray-200/60 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/20 backdrop-blur-sm shadow-sm'
          )}
          aria-label={`Filter by ${cat.name}`}
          aria-pressed={selected === cat.id}
        >
          <span>{cat.emoji}</span>
          <span>{cat.name}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}
