import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { FormEventHandler, useCallback, useState } from "react";
import { toast } from "react-toastify";
import Dropzone, { IDropzone } from "../../../../components/Dropzone";
import useStore from "../../../../store";
import s from "./styles.module.css";

export const NewFile = observer(() => {
  const userStore = useStore("userStore");
  const [files, setFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);

  const send: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSending(true);
      const sendingFiles = files.map((file) => file)[0];
      const formData = new FormData();
      formData.append("file_name", sendingFiles);
      try {
        await userStore.inventoryService.createInventoryFile(formData);
        toast.success('Отправлено на обработку')
      } catch (err) {
        toast.error('Ошибка')
      }
      setIsSending(false);
    },
    [files, userStore.inventoryService]
  );

  const onDrop: IDropzone["onDrop"] = (acceptedFiles, rejectionFiles) => {
    setFiles(acceptedFiles);
    if (rejectionFiles && rejectionFiles.length !== 0) {
      const errorMessage = rejectionFiles.map(
        ({ file, errors }) =>
          `${file.name}: ${errors.map(({ message }) => message).join()}`
      );
      errorMessage.forEach((error) => toast.error(error));
    }
  };

  const onClear = () => setFiles([]);
  return (
    <section className={s.wrapper}>
      <form onSubmit={send} className={s.container}>
        {files.length ? (
          <div>
            Загружены:
            <ul>
              {files.map((file) => (
                <li key={file.size}>{file.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <Dropzone onDrop={onDrop} />
        )}
        <div className={s.controls}>
          <button
            disabled={files.length === 0 || isSending}
            className="button-red button rounded"
            type="submit"
          >
            Отправить
          </button>
          <button
            disabled={isSending}
            className={clsx("button-red button rounded", s.clear)}
            onClick={onClear}
          >
            Очистить
          </button>
        </div>
      </form>
    </section>
  );
});
