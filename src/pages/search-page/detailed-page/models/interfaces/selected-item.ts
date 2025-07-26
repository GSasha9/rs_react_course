export interface SelectedItem {
  [category: string]: {
    [key: string]: string | boolean | unknown[] | undefined;
  };
}
