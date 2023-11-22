import useSupabaseClient from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Gallery.module.css'

const Gallery = () => {
  const { supabase } = useSupabaseClient()
  const [images, setImages] = useState<string[]>([])

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  // Fetches a list of all files (images) in the Supabase bucket -MV
  const getImages = async () => {
    const { data, error } = await supabase.storage
      .from('gallery')
      .list('galleryimages/')

    if (error) {
      console.log('Error fetching images', error)
      alert('Bildhämtning misslyckades!')
      return
    }

    // Shuffle the fetched images using Fisher-Yates algorithm (chat-GPT-help) -MV
    const shuffledImages = data.map(
      ({ name }) =>
        `${supabaseUrl}/storage/v1/object/public/gallery/galleryimages/${name}`,
    )
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledImages[i], shuffledImages[j]] = [
        shuffledImages[j],
        shuffledImages[i],
      ]
    }

    setImages(shuffledImages)
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <section className={styles.gallerySection}>
      {images.map((url, index) =>
        url ? (
          <div
            key={index}
            className={`${styles.imageContainer} ${getClassForIndex(
              index,
              images.length,
              5,
            )}`}
          >
            <Image
              src={url}
              quality={75}
              alt="Träningsträff"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : null,
      )}
    </section>
  )
}

export default Gallery

// Adds conditional classes by checking row lengths in grid (chat-GPT-help) -MV
const getClassForIndex = (
  index: number,
  totalImages: number,
  itemsPerRow: number,
) => {
  const lastIndex = totalImages - 1
  const rowStart = index % itemsPerRow === 0
  const rowEnd = index % itemsPerRow === itemsPerRow - 1

  if (index === lastIndex) {
    // Last image, can have any class including empty space
    return styles.imageLargeHighRectangle
  }

  if (rowStart) {
    // Class for the start of each row
    return styles.imageWideRectangle
  }

  if (rowEnd) {
    // Class for the end of each row
    return styles.imageLargeWideRectangle
  }

  switch (index % 8) {
    case 0:
      return styles.imageSamllSquare
    case 1:
    case 2:
      return styles.imageSquare
    case 3:
      return styles.imageBox
    case 4:
    case 5:
      return styles.imageLargeBox
    case 6:
      return styles.imageWideRectangle
    case 7:
      return styles.imageLargeWideRectangle
    default:
      return styles.imageHighRectangle
  }
}
