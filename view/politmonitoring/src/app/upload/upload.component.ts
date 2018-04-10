import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

const URL = environment.apiUrl + 'upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  @Output() onUpload = new EventEmitter<boolean>();

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor() { }

  ngOnInit() {
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // overide the onCompleteItem property of the uploader to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('Uploaded: ', item, status, response);
      // if (status === 200) {
        this.onUpload.emit(true);
      // }
    };
  }
  // TODO add excel download for public user
}
