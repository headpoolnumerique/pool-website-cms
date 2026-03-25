import { defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the event.',
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(100)
          .warning('Title should be between 3 and 100 characters.'),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'The start date of the event.',
      validation: (Rule) =>
        Rule.required().error('A start date must be provided.'),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'The end date of the event.',
      validation: (Rule) =>
        Rule.required()
          .error('An end date must be provided.')
          .custom((endDate, context) => {
            const startDate = context.document.startDate;
            if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
              return 'End date must be after the start date.';
            }
            return true;
          }),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required().min(1).warning('Content cannot be empty.'),
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) =>
        Rule.unique().error('Topics must be unique.')
          .min(1)
          .warning('At least one topic should be provided.'),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'credits',
              title: 'Label / Credits',
              type: 'string',
              description: 'Optional: add a label or credits for the image',
            },
          ],
          preview: {
            select: {
              media: 'image',
              title: 'credits',
            },
            prepare({ media, title }) {
              return {
                media: media,
                title: title || 'No label',
              };
            },
          },
        },
      ],
      description: 'Add one or more images for the event. Each image can have an optional label/credits.',
      validation: (Rule) => Rule.min(1).warning('At least one image is recommended.'),
    },
    {
      name: 'collaboration',
      title: 'Collaboration with',
      type: 'string',
      description: 'Optional: Mention collaborators or partners for this event',
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Optional: Add a link to an external page for this event',
    },
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'images.0.image',
    },
    prepare({ title, startDate, endDate, media }) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedStartDate = startDate
        ? new Date(startDate).toLocaleDateString('en-GB', options)
        : 'No start date';
      const formattedEndDate = endDate
        ? new Date(endDate).toLocaleDateString('en-GB', options)
        : 'No end date';
      return {
        title: title || 'Untitled',
        media: media,
        subtitle: `From: ${formattedStartDate} To: ${formattedEndDate}`,
      };
    },
  },
});
