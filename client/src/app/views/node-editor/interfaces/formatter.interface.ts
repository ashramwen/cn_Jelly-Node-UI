export interface IJNEditorFormFormatter { // parse modal data to view data
  async?: boolean; // default false, run async parser or not
  format?: () => {} | string;
}
