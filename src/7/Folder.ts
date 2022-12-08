import File from './File';

class Folder {
  name: string;
  parentDirectory?: Folder;
  private files: File[];
  private subFolders: { [key: string]: Folder };

  constructor(name: string, parentDirectory?: Folder) {
    this.name = name;
    this.files = [];
    this.subFolders = {};
    this.parentDirectory = parentDirectory;
  }

  addFile(file: File) {
    this.files.push(file);
  }

  addSubFolder(subFolder: Folder) {
    this.subFolders[subFolder.name] = subFolder;
  }

  getSubFolder(name: string): Folder | undefined {
    return this.subFolders[name];
  }

  getAllSubFolders(): Folder[] {
    const allSubFolders = Object.values(this.subFolders);
    for (const subFolder of Object.values(this.subFolders)) {
      allSubFolders.push(...subFolder.getAllSubFolders());
    }
    return allSubFolders;
  }

  getSize(): number {
    let total = 0;
    for (const file of this.files) {
      total += file.size;
    }
    for (const subFolderName in this.subFolders) {
      total += this.subFolders[subFolderName].getSize();
    }
    return total;
  }
}

export default Folder;
