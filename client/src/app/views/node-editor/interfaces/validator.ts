// validate input
export interface IJNFormValidator { 
  // default false, run async validate or not
  async?: boolean; 

  // default "change", run validate when changed or on save button click
  checkWhen?: 'change' | 'save';
  remote?: { // enabled only when async is true
    url: String, // remote url
    method?: String, // calling method
    headers?: JSON,
    body?: String | JSON
  };
  validator: () => {} | string;
  msg?: String;
}
