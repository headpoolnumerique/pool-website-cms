export default {
  name: "cours",
  title: "Cours",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the course.",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(100)
          .warning("Title should be between 3 and 100 characters."),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required."),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required().min(1).warning("Content cannot be empty."),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "credits",
              title: "Label / Credits",
              type: "string",
              description: "Optional: add a label or credits for the image",
            },
          ],
          preview: {
            select: {
              media: "image",
              title: "credits",
            },
            prepare({ media, title }) {
              return {
                media: media,
                title: title || "No label",
              };
            },
          },
        },
      ],
      description: "Add one or more images for the course. Each image can have an optional label/credits.",
      validation: (Rule) => Rule.required().min(1).warning("At least one image is recommended."),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description: "The start date of the course.",
      validation: (Rule) =>
        Rule.required().error("A start date must be provided."),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "The end date of the course.",
      validation: (Rule) =>
        Rule.required()
          .error("An end date must be provided.")
          .custom((endDate, context) => {
            const startDate = context.document.startDate;
            if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
              return "End date must be after the start date.";
            }
            return true;
          }),
    },
    {
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.unique().error("Topics must be unique.")
          .min(1)
          .warning("At least one topic should be provided."),
    },
    // New Github keyword field
    {
      name: "githubKeyword",
      title: "GitHub Keyword",
      type: "string",
      description: "Optional: keyword to search for related GitHub repository.",
      validation: (Rule) => Rule.max(50).warning("Keyword should be less than 50 characters."),
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0.image",
      date: "startDate",
    },
    prepare({ title, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : "No date set";
      return {
        title: title || "Untitled",
        media: media,
        subtitle: `Start Date: ${formattedDate}`,
      };
    },
  },
};
