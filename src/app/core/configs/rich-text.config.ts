import { AngularEditorConfig } from "@kolkov/angular-editor";

// https://github.com/kolkov/angular-editor
export const eventEditorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  customClasses: [
    {
      name: 'Título 2',
      class: 'page__h2',
      tag: 'h2',
    },
    {
      name: 'Título 3',
      class: 'page__h3',
      tag: 'h3',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: false,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'undo',
      'redo',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'heading',
      'fontName',
      'fontSize'
    ],
    [
      'insertImage',
      'insertVideo',
    ]
  ]
};
