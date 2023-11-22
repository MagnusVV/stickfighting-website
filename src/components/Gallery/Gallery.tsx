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

    const images = data.map(
      ({ name }) =>
        `${supabaseUrl}/storage/v1/object/public/gallery/galleryimages/${name}`,
    )

    setImages(images)
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <section className={styles.gallerySection}>
      {images.map((url, index) =>
        url ? (
          <div key={index} className={styles.imageContainer}>
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
