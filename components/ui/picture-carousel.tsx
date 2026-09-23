"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlbumPhoto {
  path: string
  caption?: string
}

interface PictureCarouselProps {
  albumName: string
  pictureCount: number
  photos?: AlbumPhoto[]
}

export function PictureCarousel({ albumName, pictureCount, photos }: PictureCarouselProps) {
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

  const pictures = photos
    ? photos.map((photo, i) => ({
        id: i + 1,
        path: photo.path,
        caption: photo.caption,
        alt: photo.caption || `${albumName} - Photo ${i + 1}`,
      }))
    : Array.from({ length: pictureCount }, (_, i) => ({
        id: i + 1,
        path: null,
        caption: null,
        alt: `${albumName} - Photo ${i + 1}`,
      }))

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y items-center">
          {pictures.map((picture, index) => {
            const isActive = index === selectedIndex
            return (
              <div
                key={picture.id}
                className={cn(
                  "flex-[0_0_90%] min-w-0 sm:flex-[0_0_75%] md:flex-[0_0_65%] lg:flex-[0_0_55%]",
                  "px-3 sm:px-4 transition-all duration-500 ease-out",
                  isActive ? "scale-100 opacity-100" : "scale-90 opacity-30 blur-sm"
                )}
              >
                <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
                  <div className="relative aspect-[3/2] bg-gradient-to-br from-accent/10 to-accent/5 flex flex-col items-center justify-center overflow-hidden">
                    {picture.path ? (
                      <img
                        src={picture.path}
                        alt={picture.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Camera className="h-16 w-16 sm:h-20 sm:w-20 text-accent/30 mb-3" />
                        <p className="text-xs text-muted-foreground italic">
                          Photo {picture.id} — placeholder
                        </p>
                      </>
                    )}
                  </div>
                  {picture.caption && (
                    <div className="p-4 bg-card">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {picture.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
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

      <div className="flex justify-center gap-2 mt-6">
        {pictures.map((_, index) => (
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
