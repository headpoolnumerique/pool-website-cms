import { defineType } from 'sanity'

export default defineType({
  name: 'bookings',
  title: 'Bookings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'Name of the staff member',
      validation: (Rule) => Rule.required().error('Name is required'),
    },
    {
      name: 'booking_page',
      title: 'Booking Page',
      type: 'string',
      description: 'URL of the booking page for this staff member or service',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
      description: 'Optional: Personal or professional website of the staff member',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'A short biography or description of the staff member or service',
    },
    {
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key skills or areas of expertise of the staff member',
    },
    {
      name: 'availabilities',
      title: 'Availabilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Available times or slots for booking (e.g., Monday 10AM-2PM)',
    },
  ],
})
