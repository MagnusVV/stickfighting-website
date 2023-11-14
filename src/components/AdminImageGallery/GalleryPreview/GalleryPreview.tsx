import SingleImageHandler from './SingleImageHandler/SingleImageHandler'
import styles from './GalleryPreview.module.css'

const GalleryPreview = () => {
  const maxImages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <>
      <h2>GalleryPreview</h2>
      <ul className={styles.galleryList}>
        {maxImages.map((imageSuffix: number) => (
          <li key={imageSuffix}>
            <SingleImageHandler suffix={imageSuffix} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default GalleryPreview
