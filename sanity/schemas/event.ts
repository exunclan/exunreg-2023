import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "classes",
      title: "Classes",
      type: "string",
      description: "The classes for which the event is open for. Ex: IX-XII",
    }),
    defineField({
      name: "teams",
      title: "Max. number of teams",
      type: "number",
    }),
    defineField({
      name: "participants",
      title: "Max. Participants per team",
      type: "number",
    }),
    defineField({
      name: "independent",
      title: "Independent registrations",
      type: "boolean",
    }),
    defineField({
      name: "registrations",
      title: "Registrations Open",
      type: "boolean",
    }),
    defineField({
      name: "mode",
      title: "Event Mode",
      type: "string",
      options: {
        list: [
          { title: "Online", value: "Online" },
          { title: "Offline", value: "Offline" },
          { title: "Hybrid", value: "Hybrid" },
        ],
      },
    }),
    defineField({
      name: "summary",
      title: "Summary of the event",
      description: "To be shown in the ",
      type: "text",
    }),
    defineField({
      name: "description",
      title: "Description of the event",
      description: "Put each bullet point in new text box",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "group",
      title: "Event Group",
      type: "string",
      options: {
        list: [
          { title: "Build", value: "build" },
          { title: "DomainSquare+", value: "ds" },
          { title: "RoboKnights", value: "rk" },
          { title: "CubXL", value: "cubxl" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
