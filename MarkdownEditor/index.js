import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';

import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [markupText, setMarkUp] = React.useState("**Hello world!!!**");
  useEffect(() => {
    file.text().then(res => setMarkUp(res));
  });
  return (
    <div className="container">
      <MDEditor value={markupText} onChange={setMarkUp} />

    <MDEditor.Markdown source={markupText} />
  </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
