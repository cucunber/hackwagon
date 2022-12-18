import clsx from "clsx";
import { FileRejection, useDropzone } from "react-dropzone";
import s from "./styles.module.css";

export interface IDropzone {
  onDrop: (acceptedFiles: File[], fileRejection?: FileRejection[]) => void;
  className?: string;
}

function Dropzone({ onDrop, className }: IDropzone) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/wav": [".wav"] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps({
        className: clsx(
          s.wrapper,
          "center",
          { [s.drag]: isDragActive },
          className
        ),
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p className={s.drop}>Отпустите</p> : <p>Перетащите файл формата WAV</p>}
    </div>
  );
}

export default Dropzone;
