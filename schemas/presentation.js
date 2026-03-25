import { defineType } from 'sanity'

export default defineType({
  name: 'presentation',
  title: 'Presentation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true, // allows for selecting a focal point
      },
      description: 'Upload a logo to display for this presentation',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
})
