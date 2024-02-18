import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor() {
    const editorRef = useRef(null);
    const getData = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Editor
                tinymceScriptSrc={process.env.PUBLIC_URL + '/plugins/tinymce/tinymce.min.js'}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""
                init={{
                    height: 500,
                    menubar: false,
                    directionality: "rtl",
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'directionality'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | ltr rtl | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={getData}>Log editor content</button>
        </>
    )
}
