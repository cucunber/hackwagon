interface IFileElement {
  id: number;
  fileName: string;
  file: File;
  status: string;
  insertDate: DateString;
  user: string;
}

export interface ISocketFileElement {
  file: IFileElement["file"];
  id: IFileElement["id"];
  name: IFileElement["fileName"];
  status: IFileElement["status"];
  user: IFileElement["user"];
}

export class FileElement implements IFileElement {
  id: IFileElement["id"];
  fileName: IFileElement["fileName"];
  file: IFileElement["file"];
  status: IFileElement["status"];
  insertDate: IFileElement["insertDate"];
  user: IFileElement["user"];

  constructor(file: IFileElement) {
    this.file = file.file;
    this.fileName = file.fileName;
    this.status = file.status;
    this.insertDate = file.insertDate;
    this.id = file.id;
    this.user = file.user;
  }

  static fromSocket(file: ISocketFileElement) {
    return new FileElement({
      id: file.id,
      file: file.file,
      fileName: file.name,
      status: file.status,
      insertDate: new Date().toString(),
      user: file.user,
    });
  }

  getObj(keys?: (keyof IFileElement)[]) {
    const requiredKeys = keys || [
      "file",
      "fileName",
      "insertDate",
      "status",
      "user",
    ];
    return requiredKeys.reduce(
      (acc, val) => ({ ...acc, [val]: this[val] }),
      {}
    ) as IFileElement;
  }
}
