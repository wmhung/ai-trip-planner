'use client';
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react';
import { IconX } from '@tabler/icons-react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import Image, { ImageProps } from 'next/image';
import { useOutsideClick } from '@/hooks/use-outside-click';

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type CardType = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleCardClose = (index: number) => {
    setCurrentIndex(index);
  };

  const isMobile = () => window && window.innerWidth < 768;

  // --- Drag handlers ---
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    if (carouselRef.current) setScrollStart(carouselRef.current.scrollLeft);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const delta = startX - pageX;
    carouselRef.current.scrollLeft = scrollStart + delta;
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className='relative w-full group'>
        {/* Carousel scroll container */}
        <div
          className='flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20'
          ref={carouselRef}
          onScroll={checkScrollability}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            className={cn(
              'absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l'
            )}
          ></div>

          <div
            className={cn(
              'flex flex-row justify-start gap-4 pl-4',
              'mx-auto max-w-7xl'
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: 'easeOut',
                    once: true,
                  },
                }}
                key={'card' + index}
                className='rounded-3xl last:pr-[5%] md:last:pr-[33%]'
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Left scroll button */}
        <button
          className={cn(
            'absolute left-2 top-1/2 z-40 -translate-y-1/2',
            'hidden md:flex h-16 w-16 items-center justify-center',
            'rounded-full bg-gray-100 shadow-md hover:scale-105 active:scale-95 transition-transform duration-200',
            'transition-opacity duration-300',
            'md:opacity-0 md:group-hover:opacity-100',
            'disabled:opacity-40',
            'md:left-4'
          )}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IoIosArrowBack className='h-12 w-12 text-gray-500' />
        </button>

        {/* Right scroll button */}
        <button
          className={cn(
            'absolute right-2 top-1/2 z-40 -translate-y-1/2',
            'hidden md:flex h-16 w-16 items-center justify-center',
            'rounded-full bg-gray-100 shadow-md hover:scale-105 active:scale-95 transition-transform duration-200',
            'transition-opacity duration-300',
            'md:opacity-0 md:group-hover:opacity-100',
            'disabled:opacity-40',
            'md:right-4'
          )}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IoIosArrowForward className='h-12 w-12 text-gray-500' />
        </button>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardType;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    document.body.style.overflow = open ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className='fixed inset-0 z-50 h-screen overflow-auto'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg'
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className='relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900'
            >
              <button
                className='sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white'
                onClick={handleClose}
              >
                <IconX className='h-6 w-6 text-neutral-100 dark:text-neutral-900' />
              </button>

              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className='text-base font-medium text-black dark:text-white'
              >
                {card.category}
              </motion.p>

              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className='mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white'
              >
                {card.title}
              </motion.p>

              <div className='py-10'>{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className='relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900'
      >
        <div className='pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent' />

        <div className='relative z-40 p-8'>
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className='text-left font-sans text-sm font-medium text-white md:text-base'
          >
            {card.category}
          </motion.p>

          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className='mt-2 max-w-xs text-left font-sans text-xl font-semibold text-white md:text-3xl'
          >
            {card.title}
          </motion.p>
        </div>

        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className='absolute inset-0 z-10 object-cover'
        />
      </motion.button>
    </>
  );
};

/* -----------------------------------------------------------
   FIXED BlurImage – prevents invalid props from reaching <img>
----------------------------------------------------------- */
export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  const { blurDataURL, placeholder, ...safeRest } = rest;

  return (
    <Image
      className={cn(
        'h-full w-full transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      alt={alt ?? 'Background image'}
      loading='lazy'
      decoding='async'
      placeholder='blur'
      blurDataURL={typeof src === 'string' ? (blurDataURL ?? src) : undefined}
      {...safeRest}
    />
  );
};
