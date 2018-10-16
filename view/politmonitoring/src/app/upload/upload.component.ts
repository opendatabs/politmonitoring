import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import * as $ from 'jquery';


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
  admin: boolean;
  @Output() onUpload = new EventEmitter<boolean>();
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.authService.currentAdminState.subscribe(admin => this.admin = admin);
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with credentials.
    this.uploader.onAfterAddingFile = file => { file.withCredentials = false; };
    // overide the onCompleteItem property of the uploader to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('ImageUpload:uploaded:', item, status, response);
      if (status === 200) {
        this.toastr.success('Neue Daten wurden hochgeladen', 'Upload erfolgreich');
      }
      if (status === 422) {
        this.toastr.error('Daten müssen das Dateiformat .xlsx haben', 'Uploadfehler');
      }
      if (status !== 200 && status !== 422) {
        this.toastr.error('Beim Upload is ein Fehler aufgetreten', 'Uploadfehler');
      }
    };
  }

  // Change displayed path to file according to selected
  changePathValue(event) {
    const fileName = event.target.files[0].name;
    $('#uploadLabel').html(fileName);
  }
}
