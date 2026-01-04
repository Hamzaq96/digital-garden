"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MotionCardProps extends React.ComponentProps<typeof Card> {
  index?: number
}

function MotionCard({ className, index = 0, ...props }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className={cn(className)}
    >
      <Card className="h-full" {...props} />
    </motion.div>
  )
}

interface MotionDivProps {
  className?: string
  index?: number
  children?: React.ReactNode
}

function MotionDiv({ className, index = 0, children }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export { MotionCard, MotionDiv }
