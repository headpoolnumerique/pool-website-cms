export default {
  name: "iframelinks",
  title: "iFrame Links",
  type: "document",
  description: "Add the iframe links of students here. Each entry should be a URL to embed.",

  fields: [
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "iframeItem",
          fields: [
            {
              name: "url",
              title: "URL",
              type: "url",
              description: "Enter the URL to embed",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      firstUrl: "links.0.url",
    },
    prepare({ firstUrl }) {
      return {
        title: firstUrl || "No URL added",
      };
    },
  },
};
