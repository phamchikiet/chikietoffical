import { Component, OnInit } from '@angular/core';
import { FirebaseimageService } from './firebaseimage.service';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-firebaseimage',
  standalone:true,
  imports: [
    CommonModule,
    AngularFireStorageModule,
  ],
  templateUrl: './firebaseimage.component.html',
  styleUrls: ['./firebaseimage.component.scss']
})
export class FirebaseimageComponent implements OnInit {
  selectedImage: File | null = null;
  previewUrl: string | null = null;
  uploadedImagePath: string | null = null;

  constructor(private imageService: FirebaseimageService) { }

  ngOnInit() { }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      this.previewUrl = URL.createObjectURL(this.selectedImage);
    } else {
      this.previewUrl = null;
    }
  }

  uploadImage() {
    if (!this.selectedImage) {
      return;
    }

    const path = `chikietv1/${this.selectedImage.name}`; // Adjust path as needed
    this.imageService.uploadImage(this.selectedImage, path).then(() => {
      this.uploadedImagePath = path;
      this.selectedImage = null;
      this.previewUrl = null;
    });
  }

  deleteImage() {
    if (this.uploadedImagePath) {
      this.imageService.deleteImage(this.uploadedImagePath).then(() => {
        this.uploadedImagePath = null;
      });
    }
  }
}
