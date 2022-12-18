interface IFileElement {
  fileName: string;
  file: File;
  status: string;
  insertDate: DateString;
  user: string;
}

export class FileElement implements IFileElement {
  fileName: IFileElement["fileName"];
  file: IFileElement["file"];
  status: IFileElement["status"];
  insertDate: IFileElement["insertDate"];
  user: IFileElement["user"];

  constructor(file: FileElement) {
    this.file = file.file;
    this.fileName = file.fileName;
    this.status = file.status;
    this.insertDate = file.insertDate;
    this.user = file.user;
  }

  getObj(keys?: (keyof IFileElement)[]) {
    const requiredKeys = keys || [
      "file",
      "fileName",
      "insertDate",
      "status",
      "user",
    ];
    return requiredKeys.reduce((acc, val) => ({ ...acc, [val]: this[val] }), {}) as IFileElement;
  }
}
