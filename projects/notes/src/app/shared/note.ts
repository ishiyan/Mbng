/** Contains a description of a note. */
export interface Note {
  /** Will be displayed as the title of a note. */
  title!: string;

  /** The route used by this note. */
  route!: string;

  /** The date this note was created. */
  created!: string;

  /** An array of tags this note is tagged with. */
  tags: string[];
}
