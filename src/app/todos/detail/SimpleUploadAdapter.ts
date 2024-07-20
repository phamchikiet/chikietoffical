export class UploadAdapter {
  private loader;
  constructor(loader: any) {
    this.loader = loader;
  }

  public async upload(): Promise<any> {
    const file = await this.loader.file;
     return this.readThis(file);
  }

  readThis(file: any): Promise<any> {
    console.log(file)
    let imagePromise: Promise<any> = new Promise((resolve, reject) => {
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        console.log(e);
        let image = myReader.result;
        resolve("data:image/png;base64," + image );
      }
      myReader.readAsDataURL(file);
    });
    return imagePromise;
  }
}
