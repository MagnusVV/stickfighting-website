import Button from '@/components/Button/Button'
import { labelButton } from '@/components/Button/assortedButtons'
import useSupabaseClient from '@/lib/supabaseClient'
import { useState } from 'react'

const VideoHandler: React.FC = () => {
  const { supabase } = useSupabaseClient()
  const [video, setVideo] = useState<File | null>(null)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  // (Try to) Upload chosen video -MV --- --->
  const uploadVideo = async (
    e: React.FormEvent<HTMLFormElement>,
    video: File | null,
  ) => {
    e.preventDefault()

    if (!video) {
      alert('Ingen fil vald!')
      return
    }

    await checkVideoExists(`welcome_video`)

    const { data, error } = await supabase.storage
      .from('video')
      .upload('welcome/welcome_video', video, {
        upsert: false,
      })
    if (error) {
      console.log(error)
    } else {
      alert('Video uppladdad!')
      setVideo(null)
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

  // <--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---|

  return (
    <>
      <div>
        <form
          //   className={styles.changeImageForm}
          id="video_upload"
          onSubmit={e => {
            uploadVideo(e, video)
          }}
        >
          <label className={labelButton} htmlFor="video_upload_picker">
            Byt välkomstvideo{' '}
            <input
              type="file"
              name="Video"
              id="video_upload_picker"
              accept="video/*"
              // Hides it to conceal English text -MV
              style={{ display: 'none' }}
              onChange={e => {
                setVideo(e.target.files ? e.target.files[0] : null)
              }}
            />
          </label>
          {video !== null && <Button text="Ladda upp" type="submit" />}
        </form>
      </div>
    </>
  )
}

export default VideoHandler
