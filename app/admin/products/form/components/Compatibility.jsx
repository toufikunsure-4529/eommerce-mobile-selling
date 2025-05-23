import React, { useEffect, useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Compatibility = ({ data, handleData }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Enter compatibility content here...',
      height: 300,
      buttons: [
        'bold',
        'italic',
        'underline',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'table',
        'link',
        '|',
        'align',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'copyformat',
        '|',
        'fullsize',
        'print',
        'about',
      ],
      extraPlugins: ['lists'],
      iframe: true,
      iframeCSSLinks: [],
      style: {
        ul: {
          'list-style-type': 'disc',
          'padding-left': '17px',
          margin: '0 0 20px 0',
        },
        li: {
          'margin-bottom': '10px',
        },
      },
      editorCssClass: 'jodit-custom-list',
    }),
    []
  );

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
      <h1 className="font-semibold">Compatibility</h1>
      {isMounted ? (
        <JoditEditor
          value={data?.compatibility || ''}
          config={config}
          onBlur={(newContent) => handleData('compatibility', newContent)}
          className="w-full border rounded bg-white text-gray-900"
        />
      ) : (
        <div className="p-3 border rounded bg-gray-100 text-gray-500">
          Loading editor...
        </div>
      )}
      <style jsx global>{`
        .jodit-custom-list .jodit-wysiwyg ul {
          list-style-type: disc !important;
          padding-left: 17px !important;
          margin: 0 0 20px 0 !important;
        }
        .jodit-custom-list .jodit-wysiwyg li {
          margin-bottom: 10px !important;
        }
      `}</style>
    </section>
  );
};

export default Compatibility;