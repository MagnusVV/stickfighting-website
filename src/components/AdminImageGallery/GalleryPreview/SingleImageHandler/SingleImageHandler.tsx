'use client'
import Image from 'next/image'
import { labelButton } from '@/components/Button/assortedButtons'
import Button from '@/components/Button/Button'
import { useState, useEffect } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import styles from './SingleImageHandler.module.css'

// The "bucketImage" refers to if an image that either exists or don't exists in the Supabase bucket. Value is "null" if the image does't exist.
const SingleImageHandler = ({
  suffix,
  bucketImage,
}: {
  suffix: number
  bucketImage: string | null
}) => {
  const [preview, setPreview] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)
  const { supabase } = useSupabaseClient()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  // Creates preview of chosen image -MV ---->
  const handleSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (!imageFile) return

    setImage(imageFile)

    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      setPreview(fileReader.result as string)
    }
    fileReader.readAsDataURL(imageFile)
  }
  // <--- --- --- --- --- --- --- --- --- ---|

  // (Try to) Upload chosen image -MV --- --->
  const uploadImage = async (
    e: React.FormEvent<HTMLFormElement>,
    image: File | null,
    suffix: number,
  ) => {
    e.preventDefault()

    if (!image) {
      alert('Ingen bild vald!')
      return
    }

    await checkImageExists(`image_${suffix.toString()}`)

    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(`galleryimages/image_${suffix.toString()}`, image, {
        upsert: false,
      })
    if (error) {
      console.log(error)
    } else {
      alert('Bild uppladdad!')
      setPreview('')
    }
  }
  // <--- --- --- --- --- --- --- --- --- ---|

  // Check if image of same name exists in the bucket already -MV --->

  const checkImageExists = async (imageName: string) => {
    const removeImage = async (image: string) => {
      const { data, error } = await supabase.storage
        .from('gallery')
        .remove([`galleryimages/${image}`])

      if (error) {
        console.log(error)
        return
      }
    }

    const { data, error } = await supabase.storage
      .from('gallery')
      .list('galleryimages/')

    if (error) {
      console.log(error)
      return
    }
    if (data.length > 0) {
      data.map(image => {
        if (image.name === imageName) {
          removeImage(imageName)
        }
      })
    }
  }

  // <--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---|

  // VERY MUCH TESTING THINGS HERE!!! TODO: Remove this dangerous piece of code -Mv   |||
  const emptyDeleteBucket = async () => {
    const { data, error } = await supabase.storage.emptyBucket('galleryimages')

    if (!error) {
      const { data, error } = await supabase.storage.deleteBucket(
        'galleryimages',
      )
      if (error) {
        console.log(error)
      }
    }

    if (error) {
      console.log(error)
    }
  }
  // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  return (
    <>
      <div>
        {/* TODO: Remove this dangerous button when project is done -MV
        <button type="button" onClick={emptyDeleteBucket}>
          Tempknapp
        </button> */}
        <form
          className={styles.changeImageForm}
          id={`addReplace_${suffix.toString()}`}
          onSubmit={e => {
            uploadImage(e, image, suffix)
          }}
        >
          <label
            className={labelButton}
            htmlFor={`addReplace_${suffix.toString()}_upload`}
          >
            Byt bild{' '}
            <input
              type="file"
              name="uploadImage"
              id={`addReplace_${suffix.toString()}_upload`}
              accept="image/png, image/jpeg"
              // Hides it to conceal English text -MV
              style={{ display: 'none' }}
              onChange={handleSelectedImage}
            />
            {bucketImage && (
              <div className={styles.previewWrapper}>
                <Image
                  src={bucketImage}
                  quality={25}
                  width={100}
                  height={100}
                  alt="Miniatyr av en bild i galleriet"
                  // TODO: Remove this if i doesn't make any difference -MV.
                  placeholder="blur"
                  blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`}
                />
              </div>
            )}
          </label>
          {preview && (
            <>
              <div className={styles.previewWrapper}>
                <Image
                  src={preview}
                  quality={25}
                  fill
                  alt="Förhandsvisning av vald bild"
                />
              </div>
              <Button text="Byt bild" type="submit" />
            </>
          )}
        </form>
      </div>
    </>
  )
}

export default SingleImageHandler
