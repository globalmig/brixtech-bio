'use client';

import 'quill/dist/quill.snow.css';

import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import ImageResize from 'resize-quill-image';

import { uploadViaSignedUrl } from '@/lib/admin/upload';

Quill.register('modules/imageResize', ImageResize);

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  folder?: string;
}

/**
 * Quill 기반 리치 텍스트 에디터. 툴바의 이미지 버튼으로 본문 중간에 자유롭게
 * 사진을 삽입할 수 있고(서명 URL로 Storage에 직접 업로드), 결과 HTML은 hidden
 * input(name)에 담겨 폼 제출 시 함께 전송됩니다.
 */
export default function RichTextEditor({
  name,
  defaultValue = '',
  placeholder = '내용을 입력하세요',
  folder = 'news',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: {
          container: [
            [{ header: [2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
          handlers: {
            image: () => {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute(
                'accept',
                'image/png,image/jpeg,image/webp,image/gif'
              );
              input.click();

              input.onchange = async () => {
                const file = input.files?.[0];
                if (!file) return;

                setError('');
                const range = quill.getSelection(true);

                try {
                  const url = await uploadViaSignedUrl(file, folder, file.name);
                  quill.insertEmbed(range.index, 'image', url, 'user');
                  quill.setSelection(range.index + 1, 0);
                } catch (uploadError) {
                  setError(
                    uploadError instanceof Error
                      ? uploadError.message
                      : '이미지 업로드에 실패했습니다.'
                  );
                }
              };
            },
          },
        },
        imageResize: {},
      },
    });

    if (defaultValue) {
      quill.clipboard.dangerouslyPasteHTML(defaultValue);
    }

    const syncHiddenInput = () => {
      if (!hiddenInputRef.current) return;
      const html = quill.root.innerHTML;
      hiddenInputRef.current.value = html === '<p><br></p>' ? '' : html;
    };

    syncHiddenInput();
    quill.on('text-change', syncHiddenInput);
    quillRef.current = quill;

    return () => {
      const imageResizeModule = quill.getModule('imageResize') as {
        destroy?: () => void;
      } | null;
      imageResizeModule?.destroy?.();
      quill.off('text-change', syncHiddenInput);

      const toolbarModule = quill.getModule('toolbar') as {
        container?: HTMLElement;
      } | null;
      toolbarModule?.container?.remove();

      if (editorRef.current) {
        editorRef.current.innerHTML = '';
        editorRef.current.classList.remove('ql-container', 'ql-snow');
      }

      quillRef.current = null;
    };
    // 최초 1회만 초기화합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <input ref={hiddenInputRef} type="hidden" name={name} />
      <div className="rounded-lg border border-gray-350 bg-white [&_.ql-container]:min-h-60 [&_.ql-container]:rounded-b-lg [&_.ql-container]:border-gray-350 [&_.ql-toolbar]:rounded-t-lg [&_.ql-toolbar]:border-gray-350">
        <div ref={editorRef} />
      </div>
      {error && <p className="mt-2 text-system-alert">{error}</p>}
    </div>
  );
}
