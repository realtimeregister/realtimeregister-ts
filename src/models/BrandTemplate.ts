export interface IBrandTemplateMedia {
  name: string
  mimetype: string
  size: number
  url: string
}

export interface IBrandTemplate {
  name: string
  subject?: string
  text?: string
  html?: string
  contexts: string[]
  media?: Map<string, IBrandTemplateMedia>
}

export type BrandTemplateField = keyof IBrandTemplate
export type BrandTemplateFilterField = Exclude<BrandTemplateField, 'contexts' | 'media'>


export class BrandTemplateMedia implements IBrandTemplateMedia {
  name: string
  mimetype: string
  size: number
  url: string

  constructor (brandTemplateMedia: BrandTemplateMedia) {
    this.name = brandTemplateMedia.name
    this.mimetype = brandTemplateMedia.mimetype
    this.size = brandTemplateMedia.size
    this.url = brandTemplateMedia.url
  }
}

export default class BrandTemplate implements IBrandTemplate {
  name: string
  subject?: string
  text?: string
  html?: string
  contexts: string[]
  media?: Map<string, IBrandTemplateMedia>

  constructor (brandTemplate: IBrandTemplate) {
    this.name = brandTemplate.name
    this.subject = brandTemplate.subject
    this.text = brandTemplate.text
    this.html = brandTemplate.html
    this.contexts = brandTemplate.contexts
    this.media = brandTemplate.media
    if (brandTemplate.media) {
      this.media = new Map()
      for (const k in brandTemplate.media) {
        this.media.set(k, new BrandTemplateMedia(brandTemplate.media.get(k) as IBrandTemplateMedia))
      }
    }
  }
}
