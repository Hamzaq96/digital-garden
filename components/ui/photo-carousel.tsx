"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Camera, MapPin } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Album {
  slug: string
  place: string
  date: string
  description: string
  location?: string
  photoCount?: number
  coverImage?: string
}

interface AlbumCarouselProps {
  albums: Album[]
}

export function AlbumCarousel({ albums }: AlbumCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

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
    setScrollSnaps(emblaApi.scrollSnapList())
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

  if (albums.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No albums yet. Time to start exploring!</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y items-center">
          {albums.map((album, index) => {
            const isActive = index === selectedIndex
            return (
              <div
                key={album.slug}
                className={cn(
                  "flex-[0_0_85%] min-w-0 sm:flex-[0_0_65%] md:flex-[0_0_50%] lg:flex-[0_0_42%] xl:flex-[0_0_38%]",
                  "px-3 sm:px-4 transition-all duration-500 ease-out",
                  isActive ? "scale-100 opacity-100" : "scale-90 opacity-40 blur-[2px]"
                )}
              >
                <Link
                  href={`/photos/${album.slug}`}
                  className="block bg-card rounded-lg shadow-md border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center overflow-hidden">
                    {album.coverImage ? (
                      <img
                        src={album.coverImage}
                        alt={album.place}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="h-14 w-14 sm:h-16 sm:w-16 text-accent/30" />
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{album.location || "Album"}</span>
                      {album.photoCount && (
                        <>
                          <span>·</span>
                          <span>{album.photoCount} photos</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 hover:text-accent transition-colors">
                      {album.place}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {album.description}
                    </p>
                    <time dateTime={album.date} className="text-xs text-muted-foreground">
                      {new Date(album.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </time>
                  </div>
                </Link>
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

      <div className="flex justify-center gap-2 mt-8">
        {albums.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              index === selectedIndex
                ? "bg-accent w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to album ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
