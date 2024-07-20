import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseimageService {
  constructor(private storage: AngularFireStorage) { }

  uploadImage(image: File, path: string): Promise<string> {
    const uploadTask = this.storage.ref(path).put(image);

    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          uploadTask.task.getSnapshot().ref.getDownloadURL().subscribe(downloadURL => {
            resolve(downloadURL);
          }, error => {
            reject(error);
          });
        })
      ).subscribe();
    });
  }

  deleteImage(filePath: string) {
    this.storage.ref(filePath).delete().subscribe();
  }
}
