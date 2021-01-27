export type Trip = {
  title: string
  eid: string
  url?: string
  description?: string
  shortContent?: string
  photos: string[]
  tags: string[]
}

export function transformTrip(data: any): Trip {
  return {
    title: data.title,
    eid: data.eid,
    url: data.url,
    description: data.description,
    shortContent: data.shortContent,
    photos: data.photos,
    tags: data.tags,
  }
}
