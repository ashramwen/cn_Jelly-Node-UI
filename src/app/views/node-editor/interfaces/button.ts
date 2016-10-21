export interface IJNFormButton{
  "buttonText": String,
  "role?": "cancel" | "submit",
  "callback?": 'cancel' | 'submit' | Function,
  "disabled": String
}