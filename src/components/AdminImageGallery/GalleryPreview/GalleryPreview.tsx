'use client'
import SingleImageHandler from './SingleImageHandler/SingleImageHandler'
import styles from './GalleryPreview.module.css'
import useSupabaseClient from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

const GalleryPreview = () => {
  // Controls maximum number of images in the gallery -MV
  const maxImages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const { supabase } = useSupabaseClient()
  const [images, setImages] = useState<{ [key: number]: string | null }>({})

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  useEffect(() => {
    // Fetch links to images already present in the Supabase bucket, so they can be passed down to child components. -MV
    const fetchImages = async () => {
      const fetchedImages: { [key: number]: string | null } = {}
      for (const imageSuffix of maxImages) {
        const { data, error } = await supabase.storage
          .from('gallery')
          .list('galleryimages/')
        if (error) {
          console.log(error)
        } else {
          const imageFile = data.find(
            file => file.name === `image_${imageSuffix.toString()}`,
          )
          if (imageFile) {
            const imageUrl = `${supabaseUrl}/storage/v1/object/public/gallery/galleryimages/${imageFile.name}`
            fetchedImages[imageSuffix] = imageUrl
          }
        }
      }
      setImages(fetchedImages)
    }
    fetchImages()
  }, [])

  return (
    <div className={styles.wrapper}>
      <h2>Bildgalleri</h2>
      <p>Klicka på bild för att välja ny</p>
      <ul className={styles.galleryList}>
        {maxImages.map((imageSuffix: number) => (
          <li key={imageSuffix}>
            <SingleImageHandler
              suffix={imageSuffix}
              // The "bucketImage" refers to if an image that either exists or don't exists in the Supabase bucket. Value is "null" if the image does't exist. -MV
              bucketImage={images[imageSuffix]}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GalleryPreview
