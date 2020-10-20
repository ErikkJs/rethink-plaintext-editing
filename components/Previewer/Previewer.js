import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import css from './Previewer.module.css';

export default function Previewer({ file }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};
