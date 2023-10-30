export interface fetchObj {
  title?: string
  body_text: string
}

export interface InstructorParams {
  id: number
  name: string
  body_text: string
}

export type InstructorCollection = InstructorParams[]
