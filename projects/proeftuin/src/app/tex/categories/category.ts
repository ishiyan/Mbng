import { Sample } from '../samples/sample';

/** Contains the title of a category and a collection of its samples. */
export class Category {
  /** Will be displayed in the sidebar as the title of a category. */
  public name!: string;

  /** The route used by this category. */
  public route!: string;

  /** An array of samples for this category. */
  public samples!: Sample[];
}
