import Button from '@/components/Button/Button'
import { labelButton } from '@/components/Button/assortedButtons'
import useSupabaseClient from '@/lib/supabaseClient'
import { useState } from 'react'

const VideoHandler: React.FC = () => {
  const { supabase } = useSupabaseClient()
  const [video, setVideo] = useState<File | null>(null)
  const [waitingForUpload, setWaitingForUpload] = useState<boolean>(false)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  // (Try to) Upload chosen video -MV --- --->
  const uploadVideo = async (
    e: React.FormEvent<HTMLFormElement>,
    video: File | null,
  ) => {
    e.preventDefault()

    if (!video) {
      alert('Ingen bild vald!')
      return
    }

    await checkVideoExists(`welcome_video`)

    const { data, error } = await supabase.storage
      .from('video')
      .upload(`welcome/welcome_video`, video, {
        upsert: false,
      })
    if (error) {
      console.log(error)
    } else {
      alert('Video uppladdad!')
    }
  }
  // <--- --- --- --- --- --- --- --- --- ---|

  // Check if video of same name exists in the bucket already -MV --->

  const checkVideoExists = async (videoName: string) => {
    const removeVideo = async (video: string) => {
      const { data, error } = await supabase.storage
        .from('video')
        .remove([`welcome/${video}`])

      if (error) {
        console.log(error)
        return
      }
    }

    const { data, error } = await supabase.storage
      .from('video')
      .list('welcome/')

    if (error) {
      console.log(error)
      return
    }
    if (data.length > 0) {
      removeVideo(videoName)
    }
  }

  return (
    <>
      <div>
        <form
          //   className={styles.changeImageForm}
          id={`video_upload`}
          onSubmit={e => {
            uploadVideo(e, video)
          }}
        >
          <label className={labelButton} htmlFor={`video_upload_picker`}>
            Byt Video?{' '}
            <input
              type="file"
              name="VideoImage"
              id={`video_upload_picker`}
              accept="image/png, image/jpeg"
              // Hides it to conceal English text -MV
              style={{ display: 'none' }}
              onChange={() => {
                waitingForUpload
                  ? setWaitingForUpload(true)
                  : setWaitingForUpload(false)
              }}
            />
          </label>
          <Button text="Byt välkomstvideo" type="submit" />
        </form>
      </div>
    </>
  )
}

export default VideoHandler
