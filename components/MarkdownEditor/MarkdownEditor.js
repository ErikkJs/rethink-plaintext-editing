import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import css from './MarkdownEditor.module.css';
import { useToasts } from 'react-toast-notifications';

import marked from 'marked';

function MarkdownEditor({ file, write }) {
  const [markdownText, setMarkup] = useState('');
  const { addToast } = useToasts();
  useEffect(() => {
    (async () => {
      addToast(`File Loaded : ${path.basename(file.name)}`, {
        appearance: 'info',
        autoDismiss: true
      });
      setMarkup(await file.text());
    })();
  }, [file]);

  let compileMarkdown = value => ({ __html: marked(value) });

  let updateFile = () => {
    const { name, type } = file;
    const newFile = new File([markdownText], name, {
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
    <div className={css.editor}>
      <form
        onSubmit={e => {
          e.preventDefault();
          updateFile();
        }}
      >
          <div className={css.markdownEditor}>
            <div className={css.title}>Editing {path.basename(file.name)} </div>
            <div className={css.editorContent}>
              <textarea
                width={3000}
                height={100}
                palceholder="Enter markdown"
                value={markdownText}
                onChange={e => setMarkup(e.target.value)}
              />
              <button type="submit">Save</button>
            </div>
          </div>

          <div className={css.preview}>
            <div className={css.title}>{path.basename(file.name)}</div>
            <div
              className={css.content}
              dangerouslySetInnerHTML={compileMarkdown(markdownText)}
            ></div>
        </div>
      </form>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
