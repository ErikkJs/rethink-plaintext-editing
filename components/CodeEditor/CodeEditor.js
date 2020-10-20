import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import Prism from 'prismjs';
import css from './codeEditor.module.css';
import path from 'path';

function CodeEditor({ file, write }) {
  const [code, setCode] = useState('');
  const { addToast } = useToasts();

  useEffect(() => {
    (async () => {
      addToast(`File Loaded : ${path.basename(file.name)}`, {
        appearance: 'info',
        autoDismiss: true
      });
      setCode(await file.text());
      Prism.highlightAll();
    })();
  }, [file]);

  const handleKeyDown = evt => {
    let value = code,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-space indent on
    if (evt.key === 'Tab') {
      value =
        value.substring(0, selStartPos) +
        '    ' +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();
      setCode(value);
    }
  };
  let updateFile = () => {
    const { name, type } = file;
    const newFile = new File([code], name, {
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
      <div className={css.codeEditor}>
        <div className={css.title}>Editing {path.basename(file.name)} </div>
        <div className={css.editorContent}>
          <textarea
            className="code-input"
            value={code}
            onChange={evt => setCode(evt.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

CodeEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default CodeEditor;
