import { Component } from '@angular/core';
import { FileService } from '../../core/services/file/file.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  folderForm = this.formBuilder.group({
    path: this.fileService.defaultFolder
  })
  constructor(
    private fileService: FileService,
    private formBuilder: FormBuilder
  ) {
  }

  openNewFolder() {
    this.fileService.openNewFolder(this.folderForm.value.path);
  }

  back() {
    this.fileService.back();
  }

}
