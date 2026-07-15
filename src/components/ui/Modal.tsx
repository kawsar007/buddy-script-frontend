'use client';

import { cn } from '@/src/lib/utils/cn';
import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={cn(
          `
          bg-white dark:bg-neutral-900
          border border-border
          relative z-10
          w-full max-w-lg
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          shadow-2xl
          hide-scrollbar
          animate-in
          fade-in-0
          zoom-in-95
          duration-200
          focus:outline-none
          `,
          className,
        )}
      >
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b px-6 py-5">
          <h2
            id="modal-title"
            className="text-foreground text-xl font-semibold"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="
              text-muted-foreground
              hover:bg-muted
              hover:text-foreground
              rounded-full
              p-2
              transition-all
              duration-200
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:outline-none
            "
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}


// 'use client';

// import { cn } from '@/src/lib/utils/cn';
// import { X } from 'lucide-react';
// import { useEffect, useRef, type ReactNode } from 'react';
// import { createPortal } from 'react-dom';

// export interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: ReactNode;
//   className?: string;
// }

// export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
//   const dialogRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!isOpen) return;

//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose();
//     };
//     document.addEventListener('keydown', onKeyDown);

//     // Prevent background scroll while the modal is open.
//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';

//     dialogRef.current?.focus();

//     return () => {
//       document.removeEventListener('keydown', onKeyDown);
//       document.body.style.overflow = previousOverflow;
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return createPortal(
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       onMouseDown={(e) => {
//         if (e.target === e.currentTarget) onClose();
//       }}
//     >
//       <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
//       <div
//         ref={dialogRef}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="modal-title"
//         tabIndex={-1}
//         className={cn(
//           'border-border bg-card relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border shadow-lg focus:outline-none',
//           className,
//         )}
//       >
//         <div className="border-border flex items-center justify-between border-b p-4">
//           <h2 id="modal-title" className="text-foreground text-lg font-semibold">
//             {title}
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close dialog"
//             className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring rounded-md p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none"
//           >
//             <X className="h-5 w-5" aria-hidden="true" />
//           </button>
//         </div>
//         <div className="p-4">{children}</div>
//       </div>
//     </div>,
//     document.body,
//   );
// }
