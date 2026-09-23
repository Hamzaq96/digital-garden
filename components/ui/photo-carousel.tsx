"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type PhotoStage = "seedling" | "budding" | "evergreen"

interface Photo {
  slug: string
  title: string
  date: string
  caption: string
  tags?: string[]
  stage: PhotoStage
  location?: string
}

interface PhotoCarouselProps {
  photos: Photo[]
}

function getStageEmoji(stage: PhotoStage): string {
  switch (stage) {
    case "seedling":
      return "🌱"
    case "budding":
      return "🌿"
    case "evergreen":
      return "🌳"
  }
}

function getStageLabel(stage: PhotoStage): string {
  switch (stage) {
    case "seedling":
      return "Seedling"
    case "budding":
      return "Budding"
    case "evergreen":
      return "Evergreen"
  }
}

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollPrev()
      } else if (e.key === "ArrowRight") {
        scrollNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [scrollPrev, scrollNext])

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No photos yet. Time to start capturing moments!</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {photos.map((photo, index) => (
            <div
              key={photo.slug}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_60%] pl-4 sm:pl-6"
            >
              <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link href={`/photos/${photo.slug}`} className="block">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <Camera className="h-16 w-16 sm:h-20 sm:w-20 text-accent/30" />
                  </div>
                </Link>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Camera className="h-4 w-4" />
                    <span>Photos</span>
                    <span className="text-xs">·</span>
                    <span>{getStageEmoji(photo.stage)}</span>
                    <span>{getStageLabel(photo.stage)}</span>
                  </div>
                  <Link href={`/photos/${photo.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 hover:text-accent transition-colors">
                      {photo.title}
                    </h2>
                  </Link>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                    {photo.caption}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={photo.date}>
                      {new Date(photo.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {photo.location && (
                      <>
                        <span>·</span>
                        <span>{photo.location}</span>
                      </>
                    )}
                  </div>
                  {photo.tags && photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {photo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-accent/10 text-accent-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={cn(
          "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10",
          "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
          "bg-card/90 backdrop-blur-sm border border-border",
          "flex items-center justify-center",
          "hover:bg-accent/20 transition-all duration-200",
          "disabled:opacity-0 disabled:cursor-not-allowed",
          "shadow-lg hover:shadow-xl"
        )}
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={cn(
          "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10",
          "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
          "bg-card/90 backdrop-blur-sm border border-border",
          "flex items-center justify-center",
          "hover:bg-accent/20 transition-all duration-200",
          "disabled:opacity-0 disabled:cursor-not-allowed",
          "shadow-lg hover:shadow-xl"
        )}
        aria-label="Next photo"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              index === selectedIndex
                ? "bg-accent w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
