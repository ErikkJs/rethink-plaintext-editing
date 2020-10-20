import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './PlaintextEditor.module.css';
import path from 'path';
import CKEditor from 'react-ckeditor-component';

function PlaintextEditor({ file, write }) {
  const [fileText, setText] = useState('');
  useEffect(() => {
    file.text().then(res => setText(res));
  });
  let onChange = (evt) => {
    console.log("onChange fired with event info: ", evt);
    const newContent = evt.editor.getData();
    console.log(newContent)
    write(file,newContent)
  }
  return (
    <div className={css.editor}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <CKEditor
        activeClass="p10"
        content={fileText}
        events={{
          "change": onChange
        }}
      />
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
