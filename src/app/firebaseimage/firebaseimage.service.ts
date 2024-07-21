import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseimageService {
   constructor(private storage: AngularFireStorage) { }

   async uploadImage(image: File, path: string): Promise<any> {
     const storageRef = this.storage.ref(path);
     const uploadTask = this.storage.upload(path, image);
    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL:any) => {
            resolve({ default: downloadURL });
          }, (error:any) => {
            reject(error);
          });
        })
      ).subscribe();
    });
  }

  //  async uploadImage(image: File, path: string) {
  //   const storageRef = this.storage.ref(path);
  //   const uploadTask = this.storage.upload(path, image);
  //   uploadTask
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         storageRef.getDownloadURL().subscribe((downloadURL) => {
  //        console.log(downloadURL);
  //         });
  //       })
  //     )
  //     .subscribe()
  //   }

  async deleteImage(filePath: string) {
    this.storage.ref(filePath).delete().subscribe();
  }
}
