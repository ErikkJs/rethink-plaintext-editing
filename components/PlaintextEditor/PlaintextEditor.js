import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './PlaintextEditor.module.css';
import path from 'path';
import CKEditor from 'react-ckeditor-component';
import { useToasts } from 'react-toast-notifications';

function PlaintextEditor({ file, write }) {
  const [fileText, setText] = useState('');
  const { addToast } = useToasts();

  useEffect(() => {
    (async () => {
      addToast(`File Loaded : ${path.basename(file.name)}`, {
        appearance: 'info',
        autoDismiss: true
      });
      setText(await file.text());
    })();
  }, [file]);

  let onChange = ({ editor }) => setText(editor.getData());

  let updateFile = () => {
    const { name, type } = file;
    const newFile = new File([fileText], name, {
      type,
      lastModified: new Date()
    });
    write(newFile);
    addToast('Saved Successfully', {
      appearance: 'success',
      autoDismiss: true
    });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        updateFile();
      }}
    >
      <div className={css.plaintextEditor}>
        <div className={css.title}>Editing {path.basename(file.name)} </div>
        <div className={css.editorContent}>
          <CKEditor
            activeClass="p10"
            content={fileText}
            events={{
              change: onChange
            }}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
