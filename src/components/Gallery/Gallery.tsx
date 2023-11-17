import useSupabaseClient from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import Image from 'next/image'

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
    <div>
      {images.map((url, index) =>
        url ? (
          <Image
            key={index}
            src={url}
            quality={75}
            alt="Träningsträff"
            width={500}
            height={300}
          />
        ) : null,
      )}
    </div>
  )
}

export default Gallery
